<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S} from '$lib'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let {data} = $props();
	
	
	let toggleRegister = $state(false);
	let errorMessage = $state('');
	let isLoading = $state(false);

	$effect(() => {
		if(data.user === null){
			isLoading = false;
		}
	});

	// const register = async (e) => {
	// 	e.preventDefault();
	// 	isLoading = true;
	// 	errorMessage = '';
		
	// 	try {
	// 		const formData = new FormData(e.target);
	// 		// await user.register(formData.get('email'), formData.get('password'), formData.get('name'));
	// 		console.warn('Register action disabled during refactor');
	// 	} catch (error) {
	// 		console.error('Registration error:', error);
	// 		if (error.code === 429 || error.message?.includes('Rate limit')) {
	// 			errorMessage = 'Too many requests. Please wait a moment and try again.';
	// 		} else if (error.code === 409) {
	// 			errorMessage = 'An account with this email already exists.';
	// 		} else {
	// 			errorMessage = error.message || 'Registration failed. Please try again.';
	// 		}
	// 	} finally {
	// 		isLoading = false;
	// 		goto('/login');
	// 	}
	// };


</script>

<section class="login-container">
	<h1>Login or register</h1>

	{#if errorMessage}
		<div class="error-message">
			{errorMessage}
		</div>
	{/if}
	
		<form action="/register" method="POST" use:enhance>
			<label>
				Name:
				<input type="text" placeholder="Name" name="name" required disabled={isLoading} />
			</label>
			<label>
				Email:
				<input type="email" placeholder="Email" name="email" required disabled={isLoading} />
			</label>
			<label>
				Password:
				<input type="password" placeholder="Password" name="password" required minlength="8" disabled={isLoading} value="monytriapp" />
			</label>
			<button type="submit" disabled={isLoading} onclick={() => (isLoading=true)}>
				{isLoading ? 'Creating account...' : 'Register'}
			</button>
		</form>	
	<button onclick={() => goto('/login')}>Signin</button>
</section>

<style>
	.login-container {
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

	.login-container h1 {
		margin-bottom: 20px;
	}

	.login-container form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.login-container label {
		display: flex;
		flex-direction: column;
	}

	.login-container input {
		padding: 10px;
		width: 200px;
		background-color: var(--white);
	}

	.login-container button {
		padding: 10px;
		width: 100px;
		background-color: var(--primary-purple-400);
	}

	.login-container button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-message {
		background-color: #fee;
		color: #c00;
		padding: 10px;
		border: 1px solid #fcc;
		border-radius: 4px;
		margin-bottom: 10px;
		text-align: center;
	}
</style>