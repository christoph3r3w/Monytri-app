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
						formData.Purpose = null;
						break;
					case 4: // Card Design step
						formData.cardDesign = 'default';
						formData.message = '';
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
		<p class="subtext">Please select your recipient to send to.</p>
		{@render searchComponent('Search Recipients')}
		{@render errorMessage(formData.errors?.[currentStep])}
	{:else if stepType === 'purpose'}
		<p class="subtext">Personalise your gift card by selecting an occasion</p>
		{@render searchComponent('Search purpose')}
		{@render errorMessage(formData.errors?.[currentStep])}
	{:else if stepType === 'amount'}
		<!-- Amount step typically doesn't need left content -->
		 <p></p>
	{:else if stepType === 'card-design'}
		<p class="subtext">Choose a design for your gift card</p>
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

	:global(.left-step) {
		position: relative;
		grid-column: left ;
		grid-row: 1 / -1;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: clip;
		overflow-x: visible;
		flex-wrap: wrap;
		padding-block: 3rem;
		padding-inline: 3rem;
		border-radius: 10px;
	}


	:global(.step-header) {
		display: flex;
		align-items: center;
		height: clamp(fit-content,1vh ,4rem);
		margin-bottom: clamp(1rem,1vh ,4rem);
		width: 100%;
	}

	:global(.left-step p.subtext) {
		font-size: clamp(1rem,3vw,1.9rem);
		font-weight: 300;
		max-width: 50ch;
		margin-bottom: 1.813rem;
	}

	:global(.step-header h2) {
		flex: 2 1 20%;
		height: 100%;
		width: 100%;
		font-size: clamp(1.5rem,5cqw ,2.5rem);
		text-wrap:nowrap; 
	}

	/* needs to be refactored to work universaly */
	/* the icon should alway be in the middle  */
	/* the search should match the figma icon */
	:global(label:has([type="search"])) {
		position: relative;
		display: flex;
		justify-self: center;
		align-items: center;
		width: 100%;
		height: fit-content;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);

		& .search-icon{
			position: absolute;
			top: 16%;
			left: 1rem;
			scale: clamp(0.2,0.85,0.89);
		}
			
		&:focus-within .search-icon {
			display: none;
		}
	}

	:global(input[type="search"]) {
		border: none;
		background-color: var(--white);
		width: 100%;
		font-size: clamp(1rem,1.1rem,2.5rem);
		padding: 1.5rem;
		padding-block: clamp(1%,.8rem,1rem);
		border-radius: 6rem;
		transition: 0.8s ease;
		box-shadow: inset 0 0 20px -17px #4b7a5b;
		
		&:focus,:focus-within {
			outline: none;
			background-color: #4b7a5b2a;
			box-shadow: inset 0 0 20px -15px #717e7580;
		}
	}

	:global(input[type="search"])::placeholder {
		padding-left: 2rem;
		transition: 120ms ease-out;
	}

	:global(input[type="search"]:is(:focus,:focus-within))::placeholder {
		padding: 0; 
	}

	/* right side */
	:global(.right-step) {
		flex: 1 1 100%;
		position: relative;
		grid-column: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding-inline: 1%;
		padding-top: 3rem;
	}

	/* buttons */
	:global(.step-header button) {
		flex: 0 1 20%;
		align-items: baseline;
	}

	:global(.step-header .back-button)  {
		/* border-radius: 50%; */
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
			fill: var(--black) ;
		}	
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

	}

	:global(.right-step .button-container .submit-button)  {
		flex: 0 1 60%;
		min-width: 50%;
		height: fit-content;
	}	

	.error-message {
		color: var(--error-red, #d32f2f);
		font-size: 0.875rem;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: var(--error-bg, #ffebee);
		border-radius: 4px;
		border-left: 4px solid var(--error-red, #d32f2f);
	}
	 
	/* Mobile responsive */
	@media (max-width: 768px) {
		.step-container {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		
		.step-header h2 {
			font-size: clamp(1.25rem, 5vw, 2rem);
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

	@media 
	(-webkit-min-device-pixel-ratio: 3),
	screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (height <= 900px) and  (orientation: landscape)
	{

		:global(.step-container) {
			grid-column: 1 / -1 !important;
			grid-row: 2 / -1;
		}
		:global(.left-step) {
			grid-column: 1 / -1 !important;
			grid-row: 1 / span 1;
			padding: 0 !important;
		}

		:global(.step-header) {
			flex-direction: row;
		}

		:global(.step-header h2) {
			display: flex;
			align-items: center;
			justify-content: center;
			text-wrap:nowrap;
			font-size: clamp(1rem,5vw,2rem);
			padding-inline: 0;
		}

		:global(.step-header + p) {
			margin-left: 4%;
		}

		:global(.step-header .back-button) {
			position: relative !important;
			aspect-ratio:none;
			flex: 0 1 20%;
			height: 100%;
			width: 100%;
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

		:global(.right-step .button-container) {
			position: relative;
			grid-column: 1/-1;
			display: flex;
			flex-direction: column;
			width: 100%;
			flex: 0 1 fit-content;
			flex-direction: column-reverse;
			align-self: self-end;
		}

		:global(.right-step .button-container .skip-button) {
			margin-bottom: 0;
		}
		
		:global(.step-container .button-container button) {
			position: relative;
			width: 100%;
			right: 0;
			bottom: auto;
			align-items: end;
		}
		
	}
</style>