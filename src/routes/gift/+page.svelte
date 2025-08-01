<script>
	import {current,isMobile} from '$lib/store.js';
	import {
		Recipient_D, 
		Recipient_M,
		EnterAmount_D,
		EnterAmount_M,
		Purpose_D,
		Purpose_M,
		CardDesign_D,
		CardDesign_M,
		GiftReview_D,
		GiftReview_M,
		Process_success_S,
		EnterAmount_E,
		Purpose_E,
		Recipient_E
	} from '$lib';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
  
	// State management
	let currentStep = $state(1);
	let totalSteps = $state(5);
	
	// Form data structure
	let formData = $state({
		recipient: null,
		cardDesign: 'default',
		Purpose: null,
		DeliveryDate: null,
		PaymentMethod: null,
		amount: null,
		message: '',
		searchQuery: '',
		errors: {},
		isLoading: false,
		date: new Date(),
				get currentDate() {
			return this.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
		}

	});
	
	// Step validation state
	let stepValidation = $state({
		1: false,
		2: false,
		3: false,
		4: false,
		5: true, // Review step is always valid
	});

	// Use provided recipients or fallback to defaults
	let recipients = $state([
		{
		id: 1,
		name: 'David Dick',
		email: 'david.dick@artgallery.com',
		lastSent: '2 days ago',
		profilePic: './generic.png',
		linkedCard: 'artlover-card',
		amountMax: 500,
		amountMin: 25,
		},
		{
		id: 2,
		name: 'Chiara Liqui Lung',
		email: 'chiara.chef@culinaryarts.it',
		lastSent: '1 week ago',
		profilePic: '/generic 2.png',
		linkedCard: 'chef-premium',
		amountMax: 300,
		amountMin: 15,
		},
		{
		id: 3,
		name: 'Christopher Willems',
		email: 'chris.crypto@blockchain.tech',
		lastSent: '3 days ago',
		profilePic: '',
		linkedCard: null,
		amountMax: 10000,
		amountMin: 100,
		},
		{
		id: 4,
		name: 'Jamila Jones',
		email: 'jamila.books@literature.org',
		lastSent: '5 days ago',
		profilePic: '/generic.png',
		linkedCard: 'bookworm-card',
		amountMax: 200,
		amountMin: 10,
		},
		{
		id: 5,
		name: 'Karnis Jansen',
		email: 'karnis.music@symphony.nl',
		lastSent: '2 weeks ago',
		profilePic: '',
		linkedCard: 'musician-pro',
		amountMax: 750,
		amountMin: 20,
		},
		{
		id: 7,
		name: 'Maria Martina',
		email: 'maria.fitness@healthclub.es',
		lastSent: '1 day ago',
		profilePic: '/generic 2.png',
		linkedCard: null,
		amountMax: 150,
		amountMin: 5,
		},
		{
		id: 8,
		name: 'Amy Frost',
		email: 'amy.travel@wanderlust.com',
		lastSent: '15 Aug 2024',
		profilePic: '/generic 2.png',
		linkedCard: null,
		amountMax: 2000,
		amountMin: 50,
		},
		{
		id: 9,
		name: 'Jeremy Clarkson',
		email: 'jeremy.cars@topgear.uk',
		lastSent: '15 Aug 2024',
		profilePic: '/generic 2.png',
		linkedCard: null,
		amountMax: 5000,
		amountMin: 100,
		}
	]);
	
	// Progress tracking
	let currentProgress = $state(0);
	let progressPercentage = $derived(currentProgress > 0 ? currentProgress : ((currentStep / totalSteps) - (1 / totalSteps)) * 100);

	// Error handling function
	function handleError(step, error) {
		formData.errors[step] = error;
		setTimeout(() => {
			delete formData.errors[step];
		}, 3000); // Clear error after 3 seconds
	}

	// Search recipient functionality
	function searchRecipients(query) {
		formData.searchQuery = query;
		return recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(query.toLowerCase()) ||
			recipient.email.toLowerCase().includes(query.toLowerCase())
		);
	}
	
	// Enhanced validation functions
	function selectRecipient(recipient) {
		if (!recipient) {
			handleError(1, 'Please select a recipient');
			return;
		}
		formData.recipient = recipient;
		stepValidation[1] = true;
		
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
	
	function validateAmount(e) {
		let finalAmount;
		
		if (e.target.type === 'radio') {
			const customAmountInput = document.getElementById('amount');
			if (customAmountInput) {
			customAmountInput.value = ''; // Clear custom input when radio is selected
			}
			formData.amount = e.target.id;
			finalAmount = parseFloat(e.target.value.replace('€', ''));
		} else if (e.target.type === 'number') {
			const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
			radioButtons.forEach((radio) => (radio.checked = false)); // Clear radio selections
			formData.amount = 'amount';
			finalAmount = parseFloat(e.target.value);
		} else {
			formData.amount = 'amount';
			finalAmount = parseFloat(e.target.value);
			
			const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
			radioButtons.forEach((radio) => (radio.checked = false));
		}
		
		if (finalAmount < formData.recipient.amountMin  || isNaN(finalAmount) || finalAmount > formData.recipient.amountMax) {
			handleError(2, 'Please enter an amount between €10 and €100');
			finalAmount = 0;
			stepValidation[2] = false;
			formData.amount = null;
			return;
		}
		
		formData.amount = finalAmount;
		stepValidation[2] = true;
	}
	
	function validatePurpose() {
		if (!formData.Purpose) {
			handleError(3, 'Please select a purpose');
			return;
		}
		stepValidation[3] = true;
	}

	//search pupose functionality
	function searchPurpose(query) {
		formData.searchQuery = query;
		return formData.Purpose.filter(purpose => 
			purpose.toLowerCase().includes(query.toLowerCase())
		);
	}
	
	function validateCardDesign(cardDesignId) {
		if (!cardDesignId || cardDesignId === 'default') {
			handleError(4, 'Please select a card design');
			return;
		}
		formData.cardDesign = cardDesignId;
		stepValidation[4] = true;
	}

	function validatePayment(e) {
		stepValidation[5] = e.target.value && formData.PaymentMethod !== null;
	}
	
	async function submitForm() {
		formData.isLoading = true;
		
		try {
			if (!formData.PaymentMethod) {
				alert('Please select a payment method')
				throw new Error('Please select a payment method');
			}

			if (!formData.recipient) {
				alert('Please select a recipient')
				throw new Error('Please select a recipient');
			}

			currentProgress = 100;
			
			await new Promise(resolve => setTimeout(resolve, 1000));
			// alertDialog.remove();
			// Store form data in localStorage before redirecting
			// localStorage.setItem('giftFormData', JSON.stringify(formData));
			localStorage.setItem('giftFormData', 'hi');
				
			await goto('/gift-success');

		} catch (error) {
			handleError(5, error.message);
		} finally {
			formData.isLoading = false;
		}
	}

	$effect(() => {
		// Reset form data when the component is destroyed
		return () => {
			formData.recipient = null;
			formData.amount = null;
			formData.cardDesign = 'default';
			formData.Purpose = null;
			formData.DeliveryDate = null;
			formData.amount = null;
			formData.message = '';
		};
	});
</script>

<svelte:head>
	<title>{$current}</title>	
</svelte:head>

<!-- button types  -->
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

<article class="transfer-wizard" transition:fade>
	<!-- Progress indicator -->
	<div class="progress-bar">
		<div class="progress" style="width: {progressPercentage}%"></div>
	</div>
	{#if !$isMobile}
		<!-- Step 1: Choose Recipient -->
		{#if currentStep === 1}
			<Recipient_D
				recipients={recipients} 
				{formData}
				selected={selectRecipient}
				{nextStep}
				{previousStep}
				{stepValidation}				
			/>
		<!-- Step 2: Enter Amount -->
		{:else if currentStep === 2}
			<EnterAmount_D
				{formData}
				max={formData.recipient?.amountMax} 
                min={formData.recipient?.amountMin}
				{validateAmount}
				{nextStep}
				{previousStep}
				{stepValidation}
			/>	

		<!-- step 3 choose proposal -->
		{:else if currentStep === 3}
			<Purpose_D
				{formData}
				{validatePurpose}
				{nextStep}
				{previousStep}
				{stepValidation}
			/>
		<!-- Step 4: Choose Card Design -->
		{:else if currentStep === 4}
			<CardDesign_D
				{formData}
				{validateCardDesign}
				{nextStep}
				{previousStep}
				{stepValidation}
			/>
		<!-- Step 5: Review and Confirm -->
		{:else if currentStep === 5}
			<GiftReview_D
				{formData}
				{validatePayment}
				{nextStep}
				{previousStep}
				{stepValidation}
				submitForm={submitForm}
			/>
		{/if}
	{:else if $isMobile}
		<!-- Step 1: Choose Recipient -->
		{#if currentStep === 1}
			<Recipient_M
				recipients={recipients} 
				{formData}
				selected={selectRecipient}
				button={buttonType}
				{nextStep}
				{previousStep}
				{stepValidation}
			/>
		<!-- Step 2: Enter Amount -->
		{:else if currentStep === 2}
			<EnterAmount_M
				{formData}
				{validateAmount}
				button={buttonType}
				{nextStep} 
				{previousStep}
				{stepValidation}
				min={formData.recipient?.amountMin}
				max={formData.recipient?.amountMax}
			/>	
		<!-- Step 3: Choose Purpose -->
		{:else if currentStep === 3}
			<Purpose_M
				{formData}
				{validatePurpose}
				button={buttonType}
			/>
		<!-- Step 4: Choose Card Design -->
		{:else if currentStep === 4}
			<CardDesign_M
				{formData}
				{validateCardDesign}
				button={buttonType}
			/>			
		<!-- Step 5: Review and Confirm -->
		{:else if currentStep === 5}
			<GiftReview_M
				{formData}
				{validatePayment}
				button={buttonType}
			/>
		{/if}
		<!-- Step 6: Transfer Success -->

	{:else}
		<!-- Fallback content for unsupported devices -->
		<div class="unsupported-device">
			<p>Your device is not supported for this feature.</p>
			<p>Please use a desktop or mobile device.</p>
		</div>
	{/if}
</article>

<style>
	:root {
		--progressbar-height: 4px;
	}

	.transfer-wizard {
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
		max-height: calc(100dvh - var(--footer-height) + var(--progressbar-height)); ;

		container-type:normal;
		container-name: transfer-wizard;
	}
	
	.progress-bar {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / 2;
		height: var(--progressbar-height) ;
		background-color: var(--general-background-color);
		border-radius: 5px;
	}

	.progress {
		position: relative;
		height: 120%;
		background-color: var(--primary-darkgreen-550);
		border-radius: 5px;
		transition: width 0.3s ease;
	}

	:global(.amount-number-input-container ){
		display: flex;
		flex-direction: column;
		margin-bottom:10% ;
	}

	:global(.skip-button,.back-button) {
		position: relative;
		width: 100%;
		padding: 0;
		height: fit-content;
		svg path{
			stroke: var(--black);
			fill: var(--black);
		}		
	}	

	@media (width <= 930px) {
		:global(.transfer-wizard) {
			height: calc(100dvh - var(--footer-height));
			background-color: var(--white);	
		}

		:global(.left-step) {
			grid-column: 1 / -1 !important;
			grid-row: 1 / span 1;
			padding: 0 !important;
		}

		:global(.step-header) .back-button{
			position: relative !important;
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
			display: flex ;
			flex-direction: column;
			width: 100%;
			gap: 1cqh;
			padding: 0 ;
			padding-top: 3% ;
			padding-inline: var(--body-padding) !important;
			background-color: var(--white) !important;
		}

		:global(.skip-button,.back-button) {
			position: relative;
			width: 100%;
			height: unset !important;
			padding-block: 5%;

			svg path{
				stroke: var(--black);
				fill: var(--black);
			}
		}	

		:global(.step-header .blank) {
			flex: 0 1 20%;
			align-items: baseline;
		}

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


	}

</style>
