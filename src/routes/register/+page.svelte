<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S} from '$lib'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let {data} = $props();
	
	let form = $state();
	let toggleRegister = $state(false);
	let errorMessage = $state('');
	let isLoading = $state(data?.isLoading ?? false	);

</script>

<section class="login-container">
	<h1>Login or register</h1>

	{#if errorMessage}
		<div class="error-message">
			{errorMessage}
		</div>
	{/if}
	
		<form action="/register" method="post" id="register-form" bind:this={form} >
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
			<button 
				type="submit" 
				disabled={isLoading} 
				onclick={() => {
				document.getElementById('register-form').requestSubmit()
			}}>
				{isLoading ? 'Creating account...' : 'Register'}
			</button>
		</form>	
		<button onclick={() => goto('/login')}>Sign in</button>
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