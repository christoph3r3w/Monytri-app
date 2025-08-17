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
	} from '$lib';
	import {goto} from '$app/navigation';
	import {fade,fly} from 'svelte/transition';
	import {onMount} from 'svelte';	
  
	// State management
	let currentStep = $state(1);
	let totalSteps = $derived(Object.keys(stepValidation).length);
	
	
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

	// Callback to handle search query updates from child components
	function updateSearchQuery(newQuery) {
		formData.searchQuery = newQuery;
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

	// Callback to handle purpose selection from child components
	function selectPurpose(purposeValue) {
		formData.Purpose = purposeValue;
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

	// Callback to handle payment method selection from child components
	function selectPaymentMethod(paymentMethod) {
		formData.PaymentMethod = paymentMethod;
	}

	// Skip step callbacks
	function skipPurpose() {
		formData.Purpose = null;
	}

	function skipCardDesign() {
		formData.cardDesign = 'default';
		formData.message = '';
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

{#snippet progressBar()}
	<div class="progress-bar">
		<div class="progress" style="width: {progressPercentage}%"></div>
	</div>	
{/snippet}

<article class="transfer-wizard" in:fly={{ y: 50, duration: 500,opacity:0 }} out:fly={{ y: 30000, duration: 200, opacity: 0 }}>
	<!-- Progress indicator -->
	{@render progressBar()}
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
				onSearchQueryUpdate={updateSearchQuery}
				onPurposeSelect={selectPurpose}
				onSkipPurpose={skipPurpose}
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
				onPaymentMethodSelect={selectPaymentMethod}
			/>
		{/if}
	{:else if $isMobile}
		<!-- Step 1: Choose Recipient -->
		{#if currentStep === 1}
			<Recipient_M
				recipients={recipients} 
				{formData}
				selected={selectRecipient}
				{nextStep}
				{previousStep}
				{stepValidation}
				onSearchQueryUpdate={updateSearchQuery}
			/>
		<!-- Step 2: Enter Amount -->
		{:else if currentStep === 2}
			<EnterAmount_M
				{formData}
				{validateAmount}
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
				{nextStep}
				{previousStep}
				{stepValidation}
				onSearchQueryUpdate={updateSearchQuery}
				onPurposeSelect={selectPurpose}
				onSkipPurpose={skipPurpose}
			/>
		<!-- Step 4: Choose Card Design -->
		{:else if currentStep === 4}
			<CardDesign_M
				{formData}
				{validateCardDesign}
				{nextStep}
				{previousStep}
				{stepValidation}
			/>			
		<!-- Step 5: Review and Confirm -->
		{:else if currentStep === 5}
			<GiftReview_M
				{formData}
				{validatePayment}
				{nextStep}
				{previousStep}
				{stepValidation}
				{submitForm}
				onPaymentMethodSelect={selectPaymentMethod}
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

		.step-header .back-button{
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

		.progress {
			position: relative;
			height: 100%;
			border-radius: 0 5px 5px 0;
			transition: width 0.5s ease-out;
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


	}

</style>
