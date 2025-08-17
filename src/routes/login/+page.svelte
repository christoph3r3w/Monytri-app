<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,LoginStep} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {user,isAuthenticated} from '$lib/user';
	});
</script>

<LoginStep 
	{formData}
	{nextStep}
	{previousStep}
	{stepValidation}
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
		color: var(--primary-red-500);
		padding: 10px;
		border: 1px solid #fcc;
		border-radius: 4px;
		margin-bottom: 10px;
		text-align: center;
	} */
</style>