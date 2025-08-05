<script>
	let { 
		// Core data
		formData, 
		
		// Step configuration
		headerName, 
		stepType = 'default', // 'recipient', 'amount', 'purpose', 'card-design', 'payment', 'review'
		
		// Step management (can be managed internally or externally)
		currentStep = $bindable(1),
		totalSteps = 5,
		
		// Optional external navigation functions (for backward compatibility)
		nextStep: externalNextStep = null,
		previousStep: externalPreviousStep = null,
		submitForm: externalSubmitForm = null,
		
		// Validation
		stepValidation = $bindable({}),
		
		// Component-specific props
		recipients = [],
		selected = null,
		min = 1,
		max = 150,
		validateAmount = null,
		validatePurpose = null,
		validatePayment = null,
		
		// Layout configuration
		showContinueButton = true,
		showSkipButton = false,
		
		// Snippet props
		mobileContent,
		customButton = null,
		
		// Navigation callbacks (optional)
		onStepChange = null,
		onSubmit = null
	} = $props();
	
	import { fade } from 'svelte/transition';

	// Internal navigation functions
	function nextStep() {
		if (externalNextStep) {
			// Use external function if provided (backward compatibility)
			externalNextStep();
		} else {
			// Internal step management
			if (stepValidation[currentStep] && currentStep < totalSteps) {
				const previousStep = currentStep;
				currentStep++;
				onStepChange?.(currentStep, previousStep);
			}
		}
	}
	
	function previousStep() {
		if (externalPreviousStep) {
			// Use external function if provided (backward compatibility)
			externalPreviousStep();
		} else {
			// Internal step management
			if (currentStep > 1) {
				const previousStepNum = currentStep;
				currentStep--;
				onStepChange?.(currentStep, previousStepNum);
			}
		}
	}
	
	function submitForm() {
		if (externalSubmitForm) {
			// Use external function if provided (backward compatibility)
			externalSubmitForm();
		} else if (onSubmit) {
			// Use callback if provided
			onSubmit(formData);
		}
	}
</script>

<!-- Button rendering snippet -->
{#snippet buttonType(type,step)}
	{#if type === 'back'}
		<button class="back-button" aria-label="Go back" onclick={currentStep > 1 ? previousStep : () => history.back()}>
			<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
			</svg>
		</button>
	{:else if type === 'continue'}
		<button 
			class="continue-button {stepValidation[step] ? 'active' : 'disabled'}"
			disabled={!stepValidation[step]}
			onclick={nextStep}
			>
			Continue
		</button>
	{:else if type === 'skip'}
		<button
			class="skip-button"
			onclick={() => {
				// Clear data for the current step
				switch(step) {
					case 3: // Purpose step
						formData.Purpose = null;
						break;
					case 4: // Card Design step
						formData.cardDesign = 'default';
						formData.message = '';
						break;
				}
				nextStep();
			}}>
			Skip
		</button>
	{:else if type === 'submit'}
		<button 
			class="submit-button"
			onclick={() => submitForm()}
			>
			Confirm & pay €{formData.amount}
		</button>
	{:else if type === 'skip-to'}
		<button 
			class="skip-to-button"
			onclick={() => {
				switch(step) {
					case 1: 
						currentStep = 1;
						break;
					case 2: 
						currentStep = 2;
						break;
					case 3: 
						currentStep = 3;
						break;
					case 4: 
						currentStep = 4;
						break;
				}
			}}>
			Edit
		</button>
	{:else if type === 'blank'}
		<span class="blank"></span>
	{/if}
{/snippet}

<!-- Search component snippet for recipient and purpose steps -->
{#snippet searchComponent(placeholder)}
	<section class="search-container">
		<label for="search" class="search-label">
			<input 
				type="search" 
				placeholder={placeholder}
				class="search-input"
				bind:value={formData.searchQuery}
			/>
			{#if formData.searchQuery.length < 1}
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" class="search-icon">
					<path fill="#A0A0A0" d="M29.295 27.705l-5.762-5.761a13.058 13.058 0 0 0 3.092-8.444C26.625 6.263 20.738.375 13.5.375c-7.238 0-13.125 5.888-13.125 13.125s5.888 13.125 13.125 13.125c3.215 0 6.159-1.166 8.444-3.091l5.761 5.761a1.122 1.122 0 0 0 1.59 0c.44-.438.44-1.15 0-1.59ZM2.625 13.5c0-5.997 4.878-10.875 10.875-10.875S24.375 7.503 24.375 13.5s-4.878 10.875-10.875 10.875S2.625 19.497 2.625 13.5Z"/>
				</svg>
			{/if}
		</label>
	</section>
{/snippet}

<!-- Error message snippet -->
{#snippet errorMessage(error)}
	{#if error}
		<div class="error-message" transition:fade>
			{error}
		</div>
	{/if}
{/snippet}

<!-- Mobile step container structure -->
<section class="step-container" transition:fade>
	<!-- Step header following mobile pattern -->
	<section class="step-header">
		{@render buttonType('back')}
		<h2>{headerName}</h2>
		{@render buttonType('blank')}
	</section>

	<!-- Main content area -->
	<div class="content-area">
		{#if mobileContent}
			<!-- Render custom mobile content -->
			{@render mobileContent()}
		{:else}
			<!-- Default content based on step type -->
			{#if stepType === 'recipient'}
				<p class="subtext">Please select your recipient to send to.</p>
				{@render searchComponent('Search Recipients')}
				{@render errorMessage(formData.errors?.[currentStep])}
			{:else if stepType === 'purpose'}
				<p class="subtext">Personalise your gift card by selecting an occasion</p>
				{@render searchComponent('Search purpose')}
				{@render errorMessage(formData.errors?.[currentStep])}
			{:else if stepType === 'amount'}
				<p class="subtext">Enter the amount for your gift card</p>
			{:else if stepType === 'card-design'}
				<p class="subtext">Choose a design for your gift card</p>
				{@render errorMessage(formData.errors?.[currentStep])}
			{:else if stepType === 'payment'}
				<p class="subtext">Review and confirm your payment</p>
			{/if}
		{/if}
	</div>

	<!-- Button container at bottom -->
	<div class="button-container">
		{#if customButton}
			{@render customButton()}
		{:else if stepType === 'payment' || stepType === 'review'}
			{@render buttonType('submit')}
		{:else}
			{#if showContinueButton}
				{@render buttonType('continue', currentStep)}
			{/if}
			{#if showSkipButton}
				{@render buttonType('skip', currentStep)}
			{/if}
		{/if}
	</div>
</section>

<style>
	.step-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		padding: 1rem;
		background-color: var(--general-background-color, #fff);
	}

	.step-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
		margin-bottom: 1rem;
	}

	.step-header h2 {
		flex: 1;
		text-align: center;
		font-size: clamp(1.25rem, 5vw, 2rem);
		font-weight: 600;
		margin: 0;
	}

	.back-button {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-button svg path {
		fill: var(--black, #000);
	}

	.blank {
		width: 32px; /* Same width as back button to center title */
		height: 32px;
	}

	.content-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
		padding: 0 0.5rem;
	}

	.subtext {
		font-size: 1rem;
		font-weight: 300;
		color: var(--text-secondary, #666);
		margin-bottom: 1rem;
		text-align: center;
	}

	.search-container {
		width: 100%;
		margin-bottom: 1rem;
	}

	.search-label {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1rem 1rem 3rem;
		border: 1px solid #ddd;
		border-radius: 2rem;
		font-size: 1rem;
		background-color: var(--white, #fff);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary-darkgreen-550, #4b7a5b);
		box-shadow: 0 0 0 2px rgba(75, 122, 91, 0.2);
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		pointer-events: none;
		scale: 0.8;
	}

	.search-input:focus + .search-icon,
	.search-input:not(:placeholder-shown) + .search-icon {
		display: none;
	}

	.button-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 0;
		margin-top: auto;
	}

	.continue-button,
	.submit-button {
		width: 100%;
		padding: 1rem;
		background-color: var(--primary-darkgreen-550, #4b7a5b);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.continue-button:hover:not(.disabled),
	.submit-button:hover {
		background-color: var(--primary-darkgreen-600, #3d6249);
	}

	.continue-button.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.skip-button {
		background: none;
		border: none;
		color: var(--primary-darkgreen-550, #4b7a5b);
		text-decoration: underline;
		font-size: 1rem;
		padding: 0.5rem;
		cursor: pointer;
		text-align: center;
	}

	.error-message {
		color: var(--error-red, #d32f2f);
		font-size: 0.875rem;
		padding: 0.75rem;
		background-color: var(--error-bg, #ffebee);
		border-radius: 8px;
		border-left: 4px solid var(--error-red, #d32f2f);
		margin-top: 0.5rem;
	}

	/* Responsive adjustments */
	@media (max-height: 600px) {
		.step-container {
			height: 100vh;
		}
		
		.content-area {
			overflow-y: auto;
		}
	}

	@media (min-height: 800px) {
		.content-area {
			justify-content: center;
		}
	}
</style>
