<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,PageStepContainer,Logo} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {user,isAuthenticated} from '$lib/user';
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
        await user.logout();
	};

</script>


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
			<label for="validate">Password:</label>
			<input name="password" type="password" placeholder="Password" id="validate" value="monytriapp" required autocomplete="current-password" disabled={isLoading} />		
		</form>
		<a class="forgot-p" href="/">forgot password</a>
	</article>
	<article class="to-register">
		<p>Don't have an account ? </p>
		<p>Create one <a href="/register">here</a></p>
	</article>
{/snippet}

{#snippet loginButtons()}
	<button
		type="button"
		disabled={isLoading}
		onclick={submitTrigger}
	>
		{isLoading ? 'Logging in...' : 'Login'}
	</button>

	<button disabled>ios face id</button>
	{@render logout1()}

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

<!-- <section class="login-container">
	<h1>Login or register</h1>

	{#if errorMessage}
		<div class="error-message">
			{errorMessage}
		</div>
	{/if}

    {@render loginForm()}

	{@render registerButton()}

	{@render logout1()}

</section> -->

<PageStepContainer
    {formData}
    subtext="Please login or register to continue"
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
		padding: 4% 3%;
		color: var(--general-text-color-secondary);
		border: solid 1px;
		border-radius: 8px;
		border-color: var(--neutral-grey);
		background-color: var(--white);
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



	a.forgot-p {
		font-size: clamp(0.8rem, 2vw, 12px);
		color: var(--primary-green-500);
	}

	.to-register {
		flex: 1 1 1cqh;
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

</style>