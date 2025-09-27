<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,PageStepContainer,Logo} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {user,isAuthenticated} from '$lib/user';
	import {device} from '$lib/Device.js';
    let {formData,nextStep,previousStep,stepValidation} = $props();
	
	let toggleRegister = $state(false);
	let errorMessage = $state('');
	let isLoading = $state(false);

	async function login(e) {
		e.preventDefault();
		isLoading = true;
		errorMessage = '';
		
		try {
			const formData = new FormData(e.target);
			// Replace raw phone value with fully-qualified E.164 number if plugin initialized
			if (phoneInput && typeof phoneInput.getNumber === 'function') {
				const fullNumber = phoneInput.getNumber();
				// Validate number using plugin utilities when available
				if (phoneInput.isValidNumber && !phoneInput.isValidNumber()) {
					errorMessage = 'Please enter a valid phone number.';
					isLoading = false;
					return;
				}
				if (fullNumber) formData.set('phone', fullNumber);
			}
			await user.login(formData.get('email'), formData.get('password'));
		} catch (error) {
			console.error('Login error:', error);
			if (error.code === 429 || error.message?.includes('Rate limit')) {
				errorMessage = 'Too many requests. Please wait a moment and try again.';
			} else if (error.code === 401) {
				errorMessage = 'Invalid email or password.';
			} else {
				errorMessage = error.message || 'Login failed. Please try again.';
			}
		} finally {
			isLoading = false;
		}
	};

	async function logout() {
        await $user.logout();
	};
	
	let form = $state()
	async function submitTrigger() {
		if (form && !isLoading) {
			if (form.requestSubmit) form.requestSubmit();
			else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
		}
	}

	let phoneInputField = $state(); // DOM ref for the <input>
	let phoneInput; // intl-tel-input instance

	onMount(async () => {
		// this works 
		// if ($isAuthenticated) {
		// 	login();
		// 	goto('/');
		// }else {
		// 	$user.logout();
		// }
		if ($user) {
			goto('/');
		}else {
			$user.deleteAllSessions();
			$user.login();
		}

		if (typeof window === 'undefined') return;
		const factory = window.intlTelInput;
		if (!phoneInputField || typeof factory !== 'function') {
			console.warn('intlTelInput not available yet.');
			return;
		}
		phoneInput = factory(phoneInputField, {
			allowDropdown: true,
			initialCountry: 'auto',
			separateDialCode: true,
			nationalMode: false,
			autoPlaceholder: 'polite',
			formatOnDisplay: true,
			preferredCountries: ['us','gb','nl','de','fr'],
			utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
			geoIpLookup: async (cb) => {
				try {
					const res = await fetch('https://ipapi.co/json/');
					const data = await res.json();
					cb(data?.country_code || 'US');
				} catch {
					cb('US');
				}
			}
		});

		// Keep input formatted as user types (blur for final format)
		phoneInputField.addEventListener('blur', () => {
			if (phoneInput && phoneInput.isValidNumber && phoneInput.isValidNumber()) {
				// Format the number internationally for display
				const formatted = phoneInput.getNumber();
				if (formatted) phoneInputField.value = formatted; // display full number
			} else if (phoneInput && !phoneInput.isValidNumber()) {
				errorMessage = 'Invalid phone number';
			}
		});

		
	});


</script>

<svelte:head>
	<link
     rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css"
   />
   <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
</svelte:head>

{#snippet pageHeader()}
	<Logo name={true}/>
{/snippet}

{#snippet loginForm()}
	{#if errorMessage}
		<div class="error-message">
			{errorMessage}
		</div>
	{/if}

	<article class="form-container">
		<h2>Log in to Monytri</h2>
		<p class="subtext">Enter your registered mobile number to log in.</p>

		<form class="login-form" onsubmit={login} bind:this={form}>
			<label for="email">Email</label>
			<input name="email" type="email" placeholder="Email" id="email" required autocomplete="email" disabled={isLoading} />
			<label for="phone">Phone</label>
			<input 
				id="phone"
				type="tel"
				bind:this={phoneInputField}
				name="phone"
				placeholder="Enter phone number"
				autocomplete="tel"
				required
				disabled={isLoading}
				value="+31623984571"
			/>
			<label for="validate">Password</label>
			<input 
				name="password" 
				type="password" 
				placeholder="Password" 
				id="validate" 
				required 
				autocomplete="current-password" 
				disabled={isLoading} 
				value="monytriapp" 
			/>		
		</form>
		<a class="forgot-p" href="/">forgot password</a>
	</article>
	<article class="to-register">
		<p>Don't have an account ? </p>
		<p>Create one <a href="/register">here</a></p>
	</article>
{/snippet}

{#snippet loginButtons()}
	{#if !$isAuthenticated}
	<button
		type="button"
		disabled={isLoading}
		onclick={submitTrigger}
	>
		{isLoading ? 'Logging in...' : 'Login'}
	</button>

	{:else}
		{@render logout1()}
	{/if}
	<!-- {@render logout1()} -->

	{#if $isMobile && $device.platform === 'Android' }
		<button disabled>android fingerprint</button>
	{/if }
	{#if $isMobile && $device.platform === 'iOS' }
		<button disabled>face id auth</button>
	{/if }

{/snippet}

{#snippet registerButton()}
    <button 
        onclick={() =>{toggleRegister = !toggleRegister;goto('/register')}} 
        disabled={isLoading}>
		Register
	</button>
{/snippet}

{#snippet logout1()}
    <button onclick={logout}>Logout</button>  
{/snippet}

<PageStepContainer
    {formData}
    subtext=""
	currentStep={1}
	{nextStep}
	{previousStep}
	{stepValidation}
    showLeftContent={true}
	showRightContent={true}
	showContinueButton={false}
	leftContent={pageHeader}
    rightContent={loginForm}
    customButton={loginButtons}
/>
    
<style>

	:global(body:has(.login-form) .step-header :is(.back-button,.blank))  {
		display: none !important;	
	}

	:global(body:has(.login-form) .page-container .logo){
		display: flex;
		align-items: center;
		justify-content: center;
		height: 6rem;
		container-type: inline-size;
		margin-block: calc(var(--header-height) - 20px) 30px;
		user-select: none;
		cursor:default;
		pointer-events: none;
	}

	:global(body:has(.login-form) .page-container .logo picture img){
		height: clamp(40px, 15vw, 60px);
		width: auto;
		aspect-ratio: 1 / 1;
	}

	:global(body:has(.login-form) .page-container .logo .logo-name){
		font-size: clamp(1rem, 4rem, 400px);
		width: 100%;
		letter-spacing: -2px;
	}

	.form-container {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		padding-inline: 1px;
	}

	.form-container h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 600;
		margin-bottom: 8px;
	}

	.form-container .subtext {
		font-size: clamp(0.8rem, 2vw, 1rem);
		color: var(--general-text-color-secondary);
		margin-bottom: 20px;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		margin-top: clamp(20px, 5vw, 32px);
	}
	
	.login-form label {
		padding-bottom: clamp(2px, 5vw, 8px);
		font-weight: 400;
	}
	
	.login-form input{
		padding: 10px;
		margin-bottom: 1rem !important ;
		width: 100%;
		max-width: 400px;
		padding:clamp(1%,5%,3%) clamp(1%,2%,3%);
		color: var(--general-text-color-secondary);
		border: solid 1px;
		border-radius: 8px;
		border-color: var(--neutral-grey);
		background-color: var(--white);
		/* outline: solid red; */
	}
	
	.login-form input::placeholder {
		color: var(--neutral-grey);
		font-size: 1rem;
	}

	:global(.login-form .iti){
		position: relative;
		margin-bottom: 1rem  ;
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	:global( .login-form .iti > :nth-child(n)){
		border: solid 1px;
		border-radius: 8px;
		border-color: var(--general-text-color-secondary);
	}
	
	:global(.login-form [role="combobox"]) {
		width: 100%;
		border-radius: 8px;
		background-color: transparent !important;
	}

	:global(.login-form .iti input[type="tel"]) {
		margin-left: 5rem;
		width: 100%;
		max-width: 320px;
		padding-left: 3% !important;
	}

	/* Overrides specific to the phone dropdown so user can choose country code */
	:global(.iti__country-container) { z-index: 20; }
	:global(.iti__country-list) { z-index: 9999; max-height: 240px; overflow-y: auto; }
	/* Improve flag button affordance */
	:global(.iti__flag-container) { cursor: pointer; }


	a.forgot-p {
		font-size: clamp(0.8rem, 2vw, 12px);
		color: var(--primary-green-500);
	}

	:global(body:has(.login-form):has(.button-container.custom) .button-container.custom)  {
		/* outline: solid red; */
		align-items: start;
		justify-content: start;
		gap: 20px;

	}

	.to-register {
		/* outline: solid red; */
		flex: 1 1 1cqh;
		max-width:400px ;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		gap: 10px;
		margin: 20px;
		font-size: clamp(0.8rem, 2vw, 1rem);
	}

	.to-register p {
		color: var(--general-text-color-secondary);
	}

	a[href="/register"]{
		color: var(--primary-green-500);
		text-decoration: underline;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--neutral-grey);
	}

	.error-message {
		background-color: #fee;
		color: var(--primary-red-500);
		padding: 10px;
		border: 1px solid #fcc;
		border-radius: 4px;
		margin-bottom: 10px;
		text-align: center;
	}

	@media (width <= 930px) {
		:global(body:has(.login-form) .page-container > :nth-child(2))  {
			align-items: center;
		}

		:global(body:has(.login-form):has(.button-container.custom) .button-container.custom)  {
			/* flex: 0 1 auto; */
			gap: 20px;
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			justify-content: end;
		}
		
		:global(body:has(.login-form):has(.button-container.custom) .button-container.custom >:nth-child(n))  {
			/* outline: solid red; */
			/* flex-basis: 100% !important; */
			max-width: 300px;
		}


	}

</style>