<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,PageStepContainer} from '$lib'
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

{#snippet loginForm()}
    <form class="login-form" onsubmit={login}>
		<label>
			Email
			<input type="email" placeholder="Email" name="email" required disabled={isLoading} />
		</label>
		<label>
			Password:
			<input type="password" placeholder="Password" value="monytriapp" name="password" required disabled={isLoading} />
		</label>
		{@render loginButton()}
       
	</form>
{/snippet}

{#snippet loginButton()}
   <button type="submit" disabled={isLoading}>
			{isLoading ? 'Logging in...' : 'Login'}
	</button> 
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
	headerName="Login or register"
    subtext="Please login or register to continue"
	currentStep={1}
	{nextStep}
	{previousStep}
	{stepValidation}
    showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
    rightContent={loginForm}
    customButton={loginButton}
/>
    
<style>
	/* .login-container {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		height: calc(100cqh - var(--header-height) + 10px);
		max-height: calc(100dvh - var(--footer-height)); ;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	h1:has(+ .login-form) {
		margin-bottom: 20px;
	} */

	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

        background-color: blue !important;
	}

	.login-form label {
		display: flex;
		flex-direction: column;
	}

	.login-form input {
		padding: 10px;
		width: 200px;
	}

	button {
		padding: 10px;
		width: 100px;
		background-color: var(--primary-purple-400);
	}

	.login-form button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
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