<script lang="ts">
	let { 
		// Core data
		formData, 
		
		// Step configuration
		headerName, 
		stepType = 'default', // 'recipient', 'amount', 'payment', 'review'
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
		// validateAmount = null,
		// validatePurpose = null,
		// validatePayment = null,
		
		// Layout configuration
		showLeftContent = true,
		showRightContent = true,
		SubmitButton = '' as string | null,
		showContinueButton = true,
		showSkipButton = false,
		subtext = '' as string | null,
		searchQuery = '' as string | null,
		searchValue = '' as string | null,
		
		// Snippet props
		leftContent,
		rightContent,
		customButton = null,
		
		// Search query callback
		onSearchQueryUpdate = null,
	} = $props();
	
	import {isMobile} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {fade} from 'svelte/transition';

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
			onclick={() => {nextStep();}}>
			Skip
		</button>
	{:else if type === 'submit'}
		<button 
			class="submit-button"
			onclick={() => submitForm()}
			>
			Confirm & pay €{formData?.amount}
		</button>
	{:else if type === 'skip-to'}
		<button 
			class="skip-to-button"
			onclick={() => {
				switch(step) {
					case 1: currentStep = 1;
						break;
					case 2: currentStep = 2;
						break;
					case 3: currentStep = 3;
						break;
					case 4: currentStep = 4;
						break;
				}
			}}>
			Edit
		</button>
	{:else if type === 'blank'}
		<span class="blank"></span>
	{/if}
{/snippet}

{#snippet buttonContainer()}

	<div class="button-container {customButton? 'custom': ''}">
		{#if customButton && stepType == '' }
			{@render customButton()}
		{:else if stepType == '' || stepType === null || stepType === undefined }
			{@render buttonType('blank',0)}
		{:else if stepType === 'default' && !customButton}
			{@render buttonType('submit',currentStep)}
		{:else}
			{#if showContinueButton}
				{@render buttonType('continue', currentStep)}
			{/if}
			{#if !$isMobile && showSkipButton}
				{@render buttonType('skip', currentStep)}
			{/if}
			{#if customButton}
				{@render customButton()}
			{/if}
		{/if}
	</div>		
{/snippet}

<!-- Search component snippet for recipient and purpose steps -->
{#snippet searchComponent(placeholder)}
	<section class="search-container">
		<label for={"search-" + placeholder} class="search-label">
			<input 
				id={"search-" + placeholder}
				type="search" 
				placeholder={placeholder}
				class="search-input"
				value={searchValue}
				oninput={(e: Event) => onSearchQueryUpdate?.((e.target as HTMLInputElement).value)}
			/>
			{#if searchValue === ''}
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
		{@render buttonType('back', currentStep)}
		<h2>{headerName}</h2>
		{#if $isMobile && showSkipButton == false || showSkipButton === undefined || showSkipButton === null}
			{@render buttonType('blank', currentStep)}
		{:else if showSkipButton && $isMobile}
			{@render buttonType('skip', currentStep)}
		{/if}
	</section>
{/snippet}

{#snippet leftSection()}
	{#if headerName || stepType !== ''}
		{@render stepHeader()}		
	{/if}

	<!-- Render custom left content or default based on step type -->
	{#if leftContent}
		{#if subtext}<p class="subtext">{subtext}</p>{/if}
		{#if searchQuery}{@render searchComponent(`Search ${searchQuery}`)}{/if}
		{@render leftContent()}
	{:else }
		{#if subtext}<p class="subtext">{subtext}</p>{/if}
		{#if searchQuery}{@render searchComponent(`Search ${searchQuery}`)}{/if}
	{/if}
	{@render errorMessage(formData?.errors?.[currentStep])}
{/snippet}

{#snippet rightSection()}
	<!-- Render custom right content -->
	{#if rightContent}
		{@render rightContent()}
	{/if}	
	<!-- Button container -->
	{@render buttonContainer()}
{/snippet}

<section class="page-container" id={$device.isMobile ? 'Mobile' : 'Desktop' } transition:fade >
	{#if !$isMobile}
		<!-- left grid section -->
		{#if showLeftContent }
			<article class="left-step">
				{@render leftSection()}
			</article>
		{/if}
		
		<!-- right grid section -->
		{#if showRightContent }
			<article class="right-step" transition:fade>
				{@render rightSection()}
			</article>
		{/if}
	{:else if $isMobile}
		<article class="mobile-step">
			{#if showLeftContent}{@render leftSection()}{/if}
			{#if rightContent}{@render rightContent()}{/if}
		</article>
		{@render buttonContainer()}
	{/if}
</section>

<style>

	.page-container {
		grid-column: content !important;
		grid-row: 1 / -1;
		position: relative;
		display: grid;
		grid-template-columns: subgrid;
		width: 100%;
		height: calc(100cqh - var(--header-height) + 10px) ;
		max-height: calc(100dvh - var(--footer-height)); 
		background-color: var(--general-background-color);
		overflow: hidden ;
		padding: 1rem;
	}

	.left-step {
		position: relative;
		grid-column: left ;
		grid-row: 1 / -1;
		display: flex;
		flex-direction: column;
		height: fit-content;
		width: 100%;
		overflow: clip;
		flex-wrap: wrap;
		padding-block: 3rem;
		padding-inline: 3rem;
		border-radius: 10px;
	}

	.step-header {
		display: flex;
		align-items: center;
		height: clamp(fit-content,1vh ,4rem);
		margin-bottom: clamp(1rem,1vh ,4rem);
		width: 100%;
	}

	.left-step p.subtext {
		font-size: clamp(1rem,3vw,1.7rem);
		font-weight: 300;
		max-width: 40ch;
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
		justify-self: start;
		align-items: center;
		width: 100%;
		max-width: 600px;
		height: fit-content;
		margin-bottom: 2dvh;		

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
		background-color: var(--white);
		width: 100%;
		font-size: clamp(1rem,1.1rem,2.5rem);
		padding: 1.5rem;
		padding-block: clamp(1%,.8rem,1rem);
		border-radius: 6rem;
		transition: 0.8s ease;
		box-shadow: inset 0 0 20px -17px #4b7a5b;
		border: none;
		outline: solid var(--primary-darkgreen-200) 1px;
		outline-color:var(--primary-darkgreen-200);
		
		&:focus,:focus-within {
			outline-color: var(--primary-darkgreen-200);
			background-color: #4b7a5b2a;
			box-shadow: inset 0 0 20px -15px #717e7580;
			box-shadow: inset 0 0 20px -15px var(--primary-darkgreen-200);
		}
	}

	:global(input[type="search"])::placeholder {
		padding-left: 2rem;
		transition: 120ms ease-out;
	}

	:global(input[type="search"]:is(:focus,:focus-within))::placeholder {
		padding: 0; 
		color: rgba(0, 0, 0, 0.486);
	}

	/* right side */
	:global(body:has(.left-step) .right-step) {
		grid-column: right;
	}

	.right-step {
		flex: 1 1 100%;
		position: relative;
		grid-column: right;
		grid-row: 1 / -1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding-inline: 1%;
		padding-top: 3rem;
		border-radius: 10px;
	}

	/* buttons */
	.step-header button {
		flex: 0 1 20%;
		align-items: baseline;
	}

	:global(.step-header .back-button)  {
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
			fill: var(--general-text-color) ;
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

	:global(.page-container .button-container button) {
		position: relative;
		bottom: var(--body-padding);
		right:0;
		width:50%;
		padding: clamp(1rem,1vw,1rem);
		background-color: var(--primary-green-500);
		color: var(--white);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;

		&.disabled {
			background-color: var(--white);
			color: var(--general-text-color);
			border-color: var(--primary-green-500);
			cursor: not-allowed;
		}
	}
	
	:global(.button-container .continue-button)  {
		flex: 0 1 50%;
		min-width: 50%;
		height: fit-content;
		transition: all 0.2s ease;

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
		.page-container {
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

		.left-step {
			grid-column: 1 / -1 !important;
			grid-row: 1 / span 1;
			padding: 0 !important;
		}

		.step-header {
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

		.right-step {
			grid-column: 1 / -1 !important;
			grid-row: 2 / span 1;
			padding: 0 !important;
		}

		:global(.page-container) {
			grid-column: 1 / -1 !important;
			grid-row: 2 / -1;
		}

		:global(label:has([type="search"])){
			justify-self: center;}
	}

	@media 
	(-webkit-min-device-pixel-ratio: 3),
	screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (height <= 900px) and  (orientation: landscape)
	{

		.page-container {
			grid-column: 1 / -1 !important;
			grid-row: 2 / -1;
		
			display: flex !important;
			flex-direction: column;
			width: 100%;
			height: 100dvh;
			max-height: 100dvh;
			gap: 1cqh;
			padding: 0 ;
			color: var(--general-text-color) !important;
		}

		.page-container > *{
			padding-inline: var(--body-padding) !important;
		}

		.mobile-step {
			flex: 0 2 fit-content;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding-top: 3%;
			overflow: hidden;
			overflow-y: auto;
		}

		.step-header {
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

		:global(.step-header .blank) {
			flex: 0 1 20%;
			align-items: baseline;
		}

		/* Needs to be refactored. */
		.skip-button,.back-button {
			position: relative;
			width: 100%;
			height: unset !important;
			padding-block: 5%;

			svg path{
				stroke: var(--general-text-color);
				fill: var(--general-text-color);
			}
		}	

		section:has(label) label input {
			background-color: var(--off-white);
			margin-bottom: 3%;
			box-shadow: 0 2px 8px -7px var(--grey-400);		
		}

		:global(label:has([type="search"])) {
			position: relative;
			display: flex;
			justify-self: center;
			align-items: center;
			width: 100%;
			height: fit-content;
			outline-color: var(--primary-darkgreen-200);

			& .search-icon{
				position: absolute;
				inset-block: 13%;
				left: 1rem;
				scale: clamp(0.2,0.70,0.80);
				fill: var(--black);
				stroke:var(--black);
				stroke-width: 1%;
			}
				
			&:focus-within .search-icon {
				display: none;
			}
		}

		.button-container {
			position: relative;
			grid-column: 1/-1;
			grid-row: 2 / -1;
			display: flex;
			width: 100%;
			flex: 0 1 fit-content;
			flex-direction: column-reverse;
			align-self: flex-end;
		}

		:global(.button-container .skip-button) {
			margin-bottom: 0;
		}
		
		:global(.page-container .button-container button) {
			position: relative;
			width: 100%;
			right: 0;
			bottom: auto;
			align-items: end;
		}

		:global(.button-container.custom) {
			flex: 1 1 auto;
			--gap:10px;
			display: flex;
			flex-direction: row ;
			flex-wrap: wrap;
			align-items: flex-end;
			justify-content: center;
			gap: var(--gap);
		}

		:global(.button-container.custom:has(:nth-child(4):last-child) > :nth-child(n)) {
			flex: 1 1 auto;
			& >:nth-child(1) {flex-basis:100%;}
			& >:nth-child(2) {flex-basis:calc(50% - var(--gap));}
			& >:nth-child(3) {flex-basis:calc(30% - var(--gap));}
			& >:nth-child(4) {flex-basis:calc(20% - var(--gap));}
		}
		:global(.button-container.custom:has(>:nth-child(3):last-child) > :nth-child(n)) {
			flex: 1 1 auto;
			& >:nth-child(1) {flex-basis:100%;}
			& >:nth-child(2) {flex-basis:calc(50% - var(--gap));}
			& >:nth-child(3) {flex-basis:calc(30% - var(--gap));}
		}
		:global(.button-container.custom:has(>:nth-child(2):last-child):nth-child(n)) {
			flex: 0 1 ;
			& >:nth-child(1) {flex-basis:calc(70% - var(--gap));}
			& >:nth-child(2) {flex-basis:calc(30% - var(--gap)); }
		}
		
		.error-message {
			background-color: #fee;
			color: #c00;
			padding: 0.5rem 1rem;
			border-radius: 4px;
			margin-bottom: 1rem;
			text-align: center;
		}		
	}

</style>