<script>
	import {current,isMobile} from '$lib/store.js';

	let { 
		// Core data
		formData, 
		
		// Step configuration
		stepType = 'default', // 'recipient', 'amount', 'purpose', 'card-design', 'payment', 'review'
		currentStep = 1,
		
		// Navigation functions
		nextStep,
		previousStep,
		submitForm,
		
		// Validation
		stepValidation = {},
		
		// Component-specific props
		selected = null,
		validateAmount = null,
		validatePurpose = null,
		validatePayment = null,
		
		// Skip callbacks
		onSkipPurpose = null,
		onSkipCardDesign = null,
				
	} = $props();
</script>

{#snippet buttonType(type,step)}
	{#if type === 'back'}
		<button class="back-button" onclick={currentStep > 1 ? previousStep : () => history.back()}>
			{#if !$isMobile}
				<svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M30.9986 11.3326H6.68859L15.5103 2.51096L13.1536 0.154297L0.308594 12.9993L13.1536 25.8443L15.5103 23.4876L6.68859 14.666H30.9986V11.3326Z" fill="black"/>
				</svg>
			{:else}
				<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
				</svg>
			{/if}
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
						onSkipPurpose?.();
						break;
					case 4: // Card Design step
						onSkipCardDesign?.();
						break;
				}
				currentStep++;
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
