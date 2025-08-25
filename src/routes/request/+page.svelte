<script>
	import {current,isMobile} from '$lib/store.js';
	import { onMount } from 'svelte';
	import {Logo,Benefactor_M,RequestAmount_M,Request_success,RequestReview_M} from '$lib';
	import { fade,fly } from 'svelte/transition';



	// Progress bar logic
		// State management
	let currentStep = $state(1);
	let totalSteps = $derived(Object.keys(stepValidation).length);
	
	// Form data structure
	let formData = $state({
		benefactor: null,
		requestId: null,
		cardDesign: 'default',
		Purpose: null,
		DeliveryDate: null,
		requestMethod: null,
		amount: null,
		message: 'check if needed',
		searchQuery: '',
		errors: {},
		isLoading: false,
		date: new Date(),
		get currentDate() {	return this.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });},
		expiresAt: null,
		shareUrl: null,
		token: null
	});
	
	// Step validation state
	function createStepValidation(totalSteps) {
		let steps = {};
		for (let i = 1; i <= totalSteps; i++) {
			steps[i] = i === totalSteps; 
		}
		return steps;
	}
	let stepValidation = $state(createStepValidation(3));
	
	// Use provided benefactors or fallback to defaults
	let benefactors = $state([
		{
		id: 999,
		name: 'Open request',
		profilePic: './shared-assests/banner-deco2.png'
		},
		{
		id: 1,
		name: 'David Dick',
		email: 'david.dick@artgallery.com',
		lastSent: '2 days ago',
		profilePic: './generic.png'
		},
		{
		id: 2,
		name: 'Chiara Liqui Lung',
		email: 'chiara.chef@culinaryarts.it',
		lastSent: '1 week ago',
		profilePic: '/generic 2.png'
		},
		{
		id: 3,
		name: 'Christopher Willems',
		email: 'chris.crypto@blockchain.tech',
		lastSent: '3 days ago',
		profilePic: ''
		},
		{
		id: 4,
		name: 'Jamila Jones',
		email: 'jamila.books@literature.org',
		lastSent: '5 days ago',
		profilePic: '/generic.png'
		},
		{
		id: 5,
		name: 'Karnis Jansen',
		email: 'karnis.music@symphony.nl',
		lastSent: '2 weeks ago',
		profilePic: ''
		},
		{
		id: 7,
		name: 'Maria Martina',
		email: 'maria.fitness@healthclub.es',
		lastSent: '1 day ago',
		profilePic: '/generic 2.png'
		},
		{
		id: 8,
		name: 'Amy Frost',
		email: 'amy.travel@wanderlust.com',
		lastSent: '15 Aug 2024',
		profilePic: '/generic 2.png'
		},
		{
		id: 9,
		name: 'Jeremy Clarkson',
		email: 'jeremy.cars@topgear.uk',
		lastSent: '15 Aug 2024',
		profilePic: '/generic 2.png'
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

	// Search benefactor functionality
	function searchBenefactors(query) {
		formData.searchQuery = query;
		return benefactors.filter(benefactor => 
			benefactor.name.toLowerCase().includes(query.toLowerCase()) ||
			benefactor.email.toLowerCase().includes(query.toLowerCase())
		);
	}

	// Callback to handle search query updates from child components
	function updateSearchQuery(newQuery) {
		formData.searchQuery = newQuery;
	}
	
	// Enhanced validation functions
	function selectBenefactor(benefactor) {
		if (!benefactor) {
			handleError(1, 'Please select a benefactor');
			return;
		}
		formData.benefactor = benefactor;
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
		
		if (finalAmount < formData.benefactor.amountMin  || isNaN(finalAmount) || finalAmount > formData.benefactor.amountMax) {
			handleError(2, 'Please enter an amount between €10 and €100');
			finalAmount = 0;
			stepValidation[2] = false;
			formData.amount = null;
			return;
		}
		
		formData.amount = finalAmount;
		stepValidation[2] = true;
	}

	function validaterequest(e) {
		stepValidation[5] = e.target.value && formData.requestMethod !== null;
	}
	
	// It needs to be checked and connected so that it sends proper form data to the back-end.
	// Function to handle form submission - made with ai 
	async function submitForm() {
		formData.isLoading = true;

		try {
			if (!formData.benefactor) {
				alert('Please select a benefactor');
				throw new Error('Please select a benefactor');
			}
			if (!formData.amount) {
				handleError(2, 'Please enter a valid amount');
				throw new Error('Invalid amount');
			}

			// Helpers
			const toBase64Url = (bytes) => {
				let binary = '';
				for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
				return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
			};
			const generateRequestId = () => {
				const bytes = new Uint8Array(16);
				crypto.getRandomValues(bytes);
				return `req_${toBase64Url(bytes)}`; // 22-char base64url + prefix
			};

			// 1) Create request ID
			const requestId = generateRequestId();

			// 2) Create expiration (default 7 days)
			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

			// 3) Create a token that can be decoded (rid + exp), and a shareable URL
			const payload = { rid: requestId, exp: expiresAt };
			const token = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
			const origin = typeof window !== 'undefined' ? window.location.origin : '';
			const shareUrl = `${origin}/request/${requestId}?token=${token}`;

			// Attach to form data
			formData.requestId = requestId;
			formData.expiresAt = expiresAt;
			formData.shareUrl = shareUrl;
			formData.token = token;

			currentProgress = 100;

			// Simulate network
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Persist items needed for sharing/QR and backend handoff
			localStorage.setItem('requestId', requestId);
			localStorage.setItem('requestToken', token);
			localStorage.setItem('requestShareUrl', shareUrl);
			// Optionally store the full payload for preview/debug
			// localStorage.setItem('requestFormData', JSON.stringify(formData));

			// console.log('Prepared request:', { requestId, expiresAt, shareUrl },formData);

			// Move to success step
			currentStep = 3;
		} catch (error) {
			handleError(currentStep, error.message ?? String(error));
		} finally {
			formData.isLoading = false;
		}
	}

	$effect(() => {
		// Reset form data when the component is destroyed
		return () => {
			formData.benefactor = null;
			formData.amount = null;
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

<article class="transfer-wizard " in:fly={{y:50,duration:500,opacity:0.5}} out:fly={{ y: 30000, duration: 200, opacity: 0 }}>
	<!-- Progress indicator -->
	{@render progressBar()}
	{#if $isMobile}
		<!-- Step 1: Choose benefactor -->
		{#if currentStep === 1}
			<Benefactor_M 
				{formData} 
				{benefactors}
				{nextStep} 
				{previousStep} 
				{stepValidation} 
				selected={selectBenefactor}
				onSearchQueryUpdate={updateSearchQuery}
			/>
		<!-- Step 2: Enter Amount -->
		{:else if currentStep === 2}
			<RequestAmount_M 
				{formData} 
				{nextStep} 
				{previousStep} 
				{stepValidation} 
				{validateAmount}
				{submitForm}
			/>
		<!-- Step 3: Review and Send -->
		{:else if currentStep === 3}
			<RequestReview_M
				{formData}
				{validaterequest}
				{nextStep}
				{previousStep}
				{stepValidation}
				{submitForm}
				{currentProgress}
			/>
		<!-- step 4 success -->
		{:else if currentStep === 4}
			<Request_success 
				{formData} 	
				{stepValidation} 
			/>
		{/if}
	{:else}
		<!-- Fallback content for unsupported devices -->
		<div class="unsupported-device">
			<p>Your device is not supported for this feature.</p>
			<p>Please use a desktop or mobile device.</p>
		</div>
	{/if}
</article>

<style>
	/* .container{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-bottom: 5rem;
	} */

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
		height: 100%;
		background-color: var(--primary-darkgreen-550);
		border-radius: 5px;
		transition: width 0.3s ease;
	}


/* Needs to be checked and refactored.*/
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
/* Needs to be checked and refactored. */
/* //////////////////////////////////// */


		@media (width <= 930px) {
		:global(.transfer-wizard) {
			height: calc(100dvh - var(--footer-height));
			background-color: var(--white);	
		}

		.left-step {
			grid-column: 1 / -1 !important;
			grid-row: 1 / span 1;
			padding: 0 !important;
		}

		.step-header .back-button{
			position: relative !important;
			top: 0;
			left: 0;
		}

		.right-step {
			grid-column: 1 / -1 !important;
			grid-row: 2 / span 1;
			padding: 0 !important;
		}
		.step-container {
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