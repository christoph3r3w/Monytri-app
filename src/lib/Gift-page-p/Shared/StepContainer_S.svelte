<script>
	let { 
		// Core data
		formData, 
		
		// Step configuration
		headerName, 
		stepType = 'default', // 'recipient', 'amount', 'purpose', 'card-design', 'payment', 'review'
		currentStep = 1,
		
		// Navigation functions
		nextStep,
		previousStep,
		submitForm,
		
		// Validation
		stepValidation = {},
		
		// Component-specific props
		recipients = [],
		selected = null,
		min = 1,
		max = 150,
		validateAmount = null,
		validatePurpose = null,
		validatePayment = null,
		
		// Layout configuration
		showLeftContent = true,
		showRightContent = true,
		showContinueButton = true,
		showSkipButton = false,
		
		// Snippet props
		leftContent,
		rightContent,
		customButton = null
	} = $props();
	
	import { current, isMobile } from '$lib/store.js';
	import { fade } from 'svelte/transition';

</script>

<!-- Button rendering snippet -->
{#snippet buttonType(type, step)}
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
			onclick={() => {
				console.log('continue clicked');
				nextStep();
			}}
			>
			Continue
		</button>
	{:else if type === 'skip'}
		<button
			class="skip-button"
			onclick={() => {
				// Clear data for the current step based on stepType
				switch(stepType) {
					case 'purpose':
						formData.Purpose = null;
						break;
					case 'card-design':
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
			onclick={() => {submitForm()}}
			>
			Confirm & pay €{formData.amount}
		</button>
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

<!-- Step header snippet -->
{#snippet stepHeader()}
	<section class="step-header" transition:fade>
		{@render buttonType('back')}
		<h2>{headerName}</h2>
	</section>
{/snippet}

{#snippet leftSection()}
	{@render stepHeader()}
				
	<!-- Render custom left content or default based on step type -->
	{#if leftContent}
		{@render leftContent()}
	{:else if stepType === 'recipient'}
		<p>Please select your recipient to send to.</p>
		{@render searchComponent('Search Recipients')}
		{@render errorMessage(formData.errors?.[currentStep])}
	{:else if stepType === 'purpose'}
		<p>Personalise your gift card by selecting an occasion</p>
		{@render searchComponent('Search purpose')}
		{@render errorMessage(formData.errors?.[currentStep])}
	{:else if stepType === 'amount'}
		<!-- Amount step typically doesn't need left content -->
		 <p></p>
	{:else if stepType === 'card-design'}
		<p>Choose a design for your gift card</p>
		{@render errorMessage(formData.errors?.[currentStep])}
	{:else if stepType === 'payment'}
		<!-- Payment step content is usually in right side -->
	{/if}
{/snippet}

{#snippet rightSection()}
	<!-- Render custom right content -->
	{@render rightContent()}
			
	<!-- Button container -->
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
				{@render buttonType('skip')}
			{/if}
		{/if}
	</div>
{/snippet}

<section class="step-container">
	<!-- left grid section -->
	{#if showLeftContent && !$isMobile}
		<article class="left-step">
			{@render leftSection()}
		</article>
	{:else}
			{@render leftSection()}
	{/if}
	<!-- right grid section -->
	{#if showRightContent && !$isMobile}
		<article class="right-step" transition:fade>
			{@render rightSection()}
		</article>
	{:else}
		{@render rightSection()}
	{/if}
</section>

<style>

:global(.step-container){
		position: relative;
		grid-column: left / right;
		grid-row: 2 / -1;
		display: grid;
		grid-template-columns: subgrid;
		gap: 1rem;
		padding: 1rem;
		height: 100%;
		width: 100%;
		background-color: var(--general-background-color);

		& h3.section-title{
			position: relative;
			margin-bottom: 1%;
			font-size: clamp(1rem,10vw ,1.3rem);
		}
	}



	.left-step {
		position: relative;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}

	:global(.step-header) {
		/* outline: #d32f2f solid; */
		display: flex;
		align-items: center;
		height: clamp(fit-content,1vh ,4rem);
		margin-bottom: clamp(1rem,1vh ,4rem);
		width: 100%;
	}

	:global(.step-header h2) {
		flex: 2 1 20%;
		height: 100%;
		width: 100%;
		font-size: clamp(1.5rem,5cqw ,2.5rem);
		text-wrap:nowrap; 
		outline: cornflowerblue;
			
		/* @container style(--mobile:1) {
			display: flex;
			align-items: center;
			text-wrap:nowrap;
			font-size: clamp(1rem,5vw ,2rem);
			padding-inline: 0;
		} */
	}

	/* .step-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		min-height: 70vh;
		padding: 1rem;
	} */

	
	.right-step {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1 1 100%;
	}
	
	/* .step-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	} */

	/* .step-header h2 {
		font-size: clamp(1rem, 4vw, 2.5rem);
		margin: 0;
	}
	
	.search-container {
		position: relative;
		margin-bottom: 1rem;
	}
	
	.search-label {
		position: relative;
		display: block;
		width: 100%;
	}
	
	.search-input {
		width: 100%;
		padding: 1rem 3rem 1rem 1rem;
		border: 2px solid #ccc;
		border-radius: 8px;
		font-size: 1rem;
		background-color: var(--white, #fff);
	}
	
	.search-icon {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
	} */
	
	.error-message {
		color: var(--error-red, #d32f2f);
		font-size: 0.875rem;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: var(--error-bg, #ffebee);
		border-radius: 4px;
		border-left: 4px solid var(--error-red, #d32f2f);
	}
	
	/* .button-container {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		align-items: center;
	} */
	
	
	
	/* .continue-button {
		padding: 1rem 2rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	 */
	/* .continue-button.active {
		background-color: var(--primary-green, #4caf50);
		color: white;
	}
	
	.continue-button.disabled {
		background-color: var(--grey-300, #ccc);
		color: var(--grey-500, #999);
		cursor: not-allowed;
	} */
	
	/* .skip-button {
		background: none;
		border: 2px solid var(--grey-400, #999);
		color: var(--grey-600, #666);
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.skip-button:hover {
		background-color: var(--grey-100, #f5f5f5);
	} */
	
	/* .submit-button {
		background-color: var(--primary-green, #4caf50);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	
	.submit-button:hover {
		background-color: var(--primary-green-dark, #45a049);
	} */

	/* new */
	:global(.step-header button) {
		flex: 0 1 20%;
		align-items: baseline;
	}

	:global(.step-header .back-button)  {
		/* border-radius: 50%; */
		/* aspect-ratio: 1/1; */
		/* outline: blue solid; */
		height: clamp(1rem,5vh,4rem) ;
		position: absolute;
		top: .5rem;
		left:-1.5rem ;
		background: none;
		border: none;
		display: flex;
		cursor: pointer;
		padding-left: 4%;
		cursor: pointer;
		z-index: 5;
		transition: background-color 0.2s ease;
		
		svg{
			height: fit-content;
			width: fit-content;
		}

		svg path{
			fill: var(--black);
		}	
	}

	.back-button:hover {
		/* background-color: var(--grey-100, #f5f5f5); */
	}

	:global(.right-step .button-container)  {
		position: relative;
		grid-column: 1/-1;
		display: flex;
		flex-direction: row-reverse;
		width: 100%;
		height: fit-content;
		margin-bottom:5%;
		margin-top: min(2dvh,3rem);
		
		container-type: inline-size;
		
		@container style(--mobile:1) {
			position: relative;
			grid-column: 1/-1;
			display: flex;
			flex-direction: column;
			width: 100%;
			flex: 0 1 fit-content;
			flex-direction: column-reverse;
			align-self: self-end;
		}
	}

	:global(.step-container .button-container button) {
		position: relative;
		bottom: var(--body-padding);
		right:0;
		width:50%;
		padding: clamp(1rem,1vw,1rem);
		background-color: #4B7A5B;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;

		@container style(--mobile:1) {
			position: relative;
			width: 100%;
			right: 0;
			bottom: auto;
			align-items: end;
		}
	}
	
	:global(.button-container .continue-button)  {
		flex: 0 1 50%;
		min-width: 50%;
		height: fit-content;
		transition: all 0.2s ease;
	}

	:global(.button-container .continue-button.disabled)  {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	:global(.right-step .button-container .skip-button)  {
		flex: 0 1 20%;
		width: 100%;
		height: fit-content;
	}

	:global(.right-step .button-container .skip-button)  {
		display: flex;
		justify-content: center;
		background: none;
		color: var(--primary-darkgreen-550);
		text-decoration: underline;

		@container style(--mobile:1) {
			margin-bottom: 0;
		}
	}

	:global(.right-step .button-container .submit-button)  {
		flex: 0 1 60%;
		min-width: 50%;
		height: fit-content;
	}	

	:global(.skip-button,.back-button) {
		
		@container style(--mobile:1) {
			position: relative;
			width: 100%;
			padding: 0;
			height: fit-content;

			svg path{
				stroke: var(--black);
				fill: var(--black);
			}
		}
	}	
	 
	/* Mobile responsive */
	 @media (max-width: 768px) {
		.step-container {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.step-header h2 {
			/* font-size: clamp(1.25rem, 5vw, 2rem); */
		}
		
		.button-container {
			justify-content: center;
		}
	} 

	@media (width <= 930px) {

		:global(.left-step) {
			grid-column: 1 / -1 !important;
			grid-row: 1 / span 1;
			padding: 0 !important;
		}

		:global(.step-header) {
			flex-direction: row;
		}

		:global(.step-header + p) {
			margin-left: 4%;
		}

		:global(.step-header .back-button) {
			position: relative !important;
			aspect-ratio:none;
			flex: 0 1 20%;
			/* height: 100%; */
			/* width: 100%; */
			font-size: clamp(1rem,5cqw ,2.5rem);
			text-wrap:nowrap; 
			top: 0;
			left: 0;
		}

		:global(.right-step) {
			grid-column: 1 / -1 !important;
			grid-row: 2 / span 1;
			padding: 0 !important;
		}
		:global(.step-container) {
			grid-column: 1 / -1 !important;
			grid-row: 2 / -1;
		}
	}

</style>