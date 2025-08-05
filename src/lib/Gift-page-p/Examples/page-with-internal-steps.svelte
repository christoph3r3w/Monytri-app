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
  
	// State management - now managed by StepContainer
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
	
	// Step validation state - now managed by StepContainer
	let stepValidation = $state({
		1: false,
		2: false,
		3: false,
		4: false,
		5: true, // Review step is always valid
	});

	// Recipients data
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
		// ... rest of recipients
	]);
	
	// Progress tracking
	let currentProgress = $state(0);
	let progressPercentage = $derived(currentProgress > 0 ? currentProgress : ((currentStep / totalSteps) - (1 / totalSteps)) * 100);

	// Error handling function
	function handleError(step, error) {
		formData.errors[step] = error;
		setTimeout(() => {
			delete formData.errors[step];
		}, 3000);
	}

	// Validation functions
	function selectRecipient(recipient) {
		if (!recipient) {
			handleError(1, 'Please select a recipient');
			return;
		}
		formData.recipient = recipient;
		stepValidation[1] = true;
	}
	
	function validateAmount(e) {
		let finalAmount;
		
		if (e.target.type === 'radio') {
			const customAmountInput = document.getElementById('amount');
			if (customAmountInput) {
			customAmountInput.value = '';
			}
			formData.amount = e.target.id;
			finalAmount = parseFloat(e.target.value.replace('€', ''));
		} else if (e.target.type === 'number') {
			const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
			radioButtons.forEach((radio) => (radio.checked = false));
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
	
	// Step change handler
	function handleStepChange(newStep, previousStep) {
		console.log(`Step changed from ${previousStep} to ${newStep}`);
		// Add any additional logic when steps change
	}
	
	// Submit handler
	async function handleSubmit(data) {
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
			localStorage.setItem('giftFormData', 'hi');
				
			await goto('/gift-success');

		} catch (error) {
			handleError(5, error.message);
		} finally {
			formData.isLoading = false;
		}
	}

	$effect(() => {
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

{#snippet progressBar()}
	<div class="progress-bar">
		<div class="progress" style="width: {progressPercentage}%"></div>
	</div>	
{/snippet}

<article class="transfer-wizard" transition:fade>
	<!-- Progress indicator -->
	{@render progressBar()}
	
	{#if !$isMobile}
		<!-- Step 1: Choose Recipient -->
		{#if currentStep === 1}
			<Recipient_D
				recipients={recipients} 
				{formData}
				selected={selectRecipient}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onStepChange={handleStepChange}
			/>
		<!-- Step 2: Enter Amount -->
		{:else if currentStep === 2}
			<EnterAmount_D
				{formData}
				max={formData.recipient?.amountMax} 
                min={formData.recipient?.amountMin}
				{validateAmount}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onStepChange={handleStepChange}
			/>	

		<!-- step 3 choose proposal -->
		{:else if currentStep === 3}
			<Purpose_D
				{formData}
				{validatePurpose}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onStepChange={handleStepChange}
				showSkipButton={true}
			/>
		<!-- Step 4: Choose Card Design -->
		{:else if currentStep === 4}
			<CardDesign_D
				{formData}
				{validateCardDesign}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onStepChange={handleStepChange}
				showSkipButton={true}
			/>
		<!-- Step 5: Review and Confirm -->
		{:else if currentStep === 5}
			<GiftReview_D
				{formData}
				{validatePayment}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onSubmit={handleSubmit}
			/>
		{/if}
	{:else if $isMobile}
		<!-- Mobile versions with same pattern -->
		{#if currentStep === 1}
			<Recipient_M
				recipients={recipients} 
				{formData}
				selected={selectRecipient}
				bind:currentStep
				bind:stepValidation
				{totalSteps}
				onStepChange={handleStepChange}
			/>
		<!-- Add other mobile steps similarly -->
		{/if}
	{/if}
</article>

<style>
	/* Same styles as before */
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
		max-height: calc(100dvh - var(--footer-height) + var(--progressbar-height));
		container-type:normal;
		container-name: transfer-wizard;
	}
	
	.progress-bar {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / 2;
		height: var(--progressbar-height);
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
</style>
