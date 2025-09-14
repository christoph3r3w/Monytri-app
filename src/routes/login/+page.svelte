<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,LoginStep} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {user,isAuthenticated} from '$lib/user';
	
	let toggleRegister = $state(false);
	let errorMessage = $state('');
	let isLoading = $state(false);

	let formData = $state({
		email: '',
		password: '',
		name: ''
	});
	
	let stepValidation = $state(createStepValidation(3));
	let currentStep = $state(1);
	let totalSteps = $derived(Object.keys(stepValidation).length);
	
	function createStepValidation(totalSteps) {
		let steps = {};
		for (let i = 1; i <= totalSteps; i++) {
			steps[i] = i === totalSteps; 
		}
		return steps;
	}
	
	
	function nextStep() {
		if (stepValidation[currentStep] && currentStep < totalSteps) {
			currentStep++;
		}
	}
	
	function previousStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}
</script>

<section class="login-step-container">
	<LoginStep 
		{formData}
		{nextStep}
		{previousStep}
		{stepValidation}
	/>
</section>

<style>
	.login-step-container {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 
		subgrid 
		[left-start] repeat(5,[mid-left]) [left-end right-start] repeat(5,[mid-right]) [right-end];
		grid-template-rows: minmax(min-content,4px) 1fr 1fr 3fr;
		height: calc(100cqh - var(--header-height) + var(--progressbar-height) + 10px);
		max-height: calc(100dvh - var(--footer-height) + var(--progressbar-height)); 

		container-type:normal;
		container-name: transfer-wizard;

	}

	@media (width <= 930px) {
		.login-sep-container {
			height: calc(100dvh - var(--footer-height));
			background-color: var(--white);	
		}

	}


	/* .login-container h1 {
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