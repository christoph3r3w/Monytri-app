<script>
	import { fade } from 'svelte/transition';
	import { StepContainer,Logo} from '$lib'
	import {onMount} from 'svelte'
	import QRCode from 'qrcode';
	import { goto } from '$app/navigation';
	import { generate } from '@vue/compiler-core';


	//  vercel does not let a user enter an application from the share page you need to start with the hoem page 
	const homeUrl = window.location.origin
	// Later for this, they should go into the server.js
	// It should also pick the important forum data information from the request validation process, hash it, and make it a link to send to the backend.
	const requestUrl = `${homeUrl}/request?data=${encodeURIComponent(JSON.stringify(formData))}`;
	let qrDataUrl = $state('');
	let canShare = $state(false);
	let openRequest = $derived(formData.benefactor.name === 'Open request');

	onMount(() => {
		canShare = !!navigator.share;
		if (openRequest){generateQR();}
	});

	async function generateQR() {
		try {
			qrDataUrl = await QRCode.toDataURL(requestUrl, {
				width: 300,
				margin: 1,
				color: {
					dark: '#000000',
					light: '#ffffff00'
				}
			});
		} catch (err) {
			console.error(err);
		}
	}

	async function nativeShare() {

		if (!canShare) {
			alert('Web Share API is not supported in your browser.');
			return;
		}

		try {
			await navigator.share({
				title: 'Monytri',
				text: 'Check out Monytri!',
				url: requestUrl
			});
		} catch (err) {
			console.error('Share failed:', err);
		}
	}

	function copyURL() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(requestUrl)
				.then(() => {
					alert('URL copied to clipboard!');
				})
				.catch(err => {
					console.error('Failed to copy URL:', err);
				});
		} else {
			alert('Clipboard API is not supported in your browser.');
		}
	}

	function sendEmail() {
		const subject = `Request from ${formData.benefactor.name}`;
		const body = `You have received a request for an amount of €${formData.amount}.\n\nPlease visit the following link to view and respond to the request:\n${requestUrl}`;
		window.location.href = `mailto:${formData.benefactor.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	let {formData,validaterequest,button,nextStep,stepValidation,previousStep,submitForm} = $props();
	let selectedMethod = $state('');
	let selectedBank = $state('');
	let methods = $derived({
		"Linked Credit/Debit Card": "Card ending in **** **** 1234",
		"iDEAL": "Select your bank",
		"EFT request": "Select your bank"
	});
</script>

<!-- Need to check with the client to see which one they would prefer. -->
{#snippet requestOptions()}
	<article class="review-summary">
		<div>
			
			{#if formData.benefactor.name !== 'Open request'}
			<h2>Your request to {formData.benefactor.name}</h2>
			<hr />
			<!-- <p class="review-item">
				<span class="review-label">Benefactor:</span>
				<span class="review-value">{formData.benefactor.name}</span>
			</p> -->
			{/if}
				
			<p class="review-item">
				<span class="review-label">Amount:</span>
				<span class="review-value">&euro;{formData.amount}</span>
			</p>

			<p class="review-item">
				<span class="review-label">Send Date:</span>
				<span class="review-value">{formData.currentDate}</span>
			</p>
				
			{#if formData.message}
			<p class="review-item message">
				<span class="review-label">Message:</span>
				<span class="review-value">{formData.message}</span>
			</p>
			{/if}
	
			
		</div>
	</article>
{/snippet}

{#snippet requestReview()}
	<article class="request-summary review-summary">
		{#if !openRequest}
			{#if formData.benefactor.profilePic.length > 0 || formData.benefactor.profilePic !== ''}
				<img src="{formData.benefactor.profilePic}" alt="{formData.benefactor.name} profile picture" class="benefactor-profile-pic" />
			{:else}
				<p class="benefactor-letter">{formData.benefactor.name[0].toUpperCase()}</p>
			{/if}
			<h2>This is your request to {formData.benefactor.name}</h2>
		{:else}
			<h2>This is your request</h2>
		{/if}
				
			<p class="review-amount">
				<span class="review-value">&euro;{formData.amount}</span>
			</p>

			<p class="review-date">
				<span class="review-label">Send Date:</span>
				<span class="review-value">{formData.currentDate}</span>
			</p>
	</article>
{/snippet}

{#snippet shareOption2()}
	<figure class="qr-container">
		{#if qrDataUrl.length > 0 }
		<img src={qrDataUrl} alt="QR Code" width="300" height="300" onclick={qrDataUrl = ''} />
		<p>Scan the QR code to share </p>
		{/if}
		{#if qrDataUrl.length <= 0}
			<button onclick={generateQR}>
				generate QR code
			</button>
		{/if}
	</figure>
	
	{#if canShare && openRequest}
		<button class="share-button" onclick={nativeShare}>
			share
		</button>
		{:else}
		<button class="share-button" onclick={sendEmail}>
			mail to {formData.benefactor.name}
		</button>
	{/if}
	{#if openRequest}
		<button class="share-button copy" onclick={copyURL}>
			copy to clipboard
		</button>
	{/if}
{/snippet}


<StepContainer 
	{formData}
	headerName="Select a request method"
	stepType="review"
	currentStep={5}
	{nextStep}
	{previousStep}
	{stepValidation}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={false}
	customButton={shareOption2}
	leftContent={requestReview}
/>

<style>

	.review-summary{
		flex: 1 1 108%;
		display: flex;
		flex-direction: column;
		align-items: baseline;
		border-radius: 10px;
		width: 100%;
		height: fit-content;

		@container style(--mobile:1) {
			flex: 0 1 120%;
			place-self: baseline;
			width: 100%;
			overflow-y: auto;
		}
	}
	
	.review-summary div {
		align-self: baseline;
		place-self: baseline;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: fit-content;
		border-radius: 10px;
		padding: clamp(5px, 40px, 2rem);
		margin-bottom: 3rem;
		background-color: var(--general-background-color);
		box-shadow: 0 4px 8px -5px rgba(0, 0, 0, 0.1);

		h2 {
			text-align: start;
			font-size: clamp(1rem,4vw,1.5rem);
			margin-bottom: 10px;
		}
		
		hr {
			margin-bottom: 15px;
			height: 1px;
			background-color: color-mix(in srgb, var(--general-background-color) , var(--grey-400) 30%);
		}

		.review-item {
			display: flex;
			gap: 1rem;
			width: 100%;
			padding-right: 5%;
			margin-top: 3%;
			margin-bottom: 3%;
			font-size:clamp(1rem,2vw,1.2rem);
		}

		.message .review-value {
			max-width: 60ch;
			max-height: 15cqh;
			display: flex;
			-webkit-line-clamp: 4; 
			-webkit-box-orient: vertical;
			overflow: auto;
			text-overflow: ellipsis;
		}

		span {
			position: relative;
			width: 100%;
		}
		
		.review-label {
			font-weight: 300;
			text-wrap: nowrap;
		}
	}

	/* share styling */
	article,figure{
		border-radius: 8px;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		background-color: white;
	}

	h2{
		font-size: clamp(1rem,8vw,1.1rem);
	}

	/* request review */
	.request-summary{
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding-top: 5%;
		color: var(--general-text-color);
	}

	.benefactor-profile-pic {
		width: 80px;
		aspect-ratio: 1;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 1rem;
	}

	.benefactor-letter {	
		width: auto;
		aspect-ratio: 1;
		border-radius: 50%;
		margin-right: 1rem;
		background-color: var(--primary-darkgreen-550);
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		font-weight: bold;
		font-size: clamp(1.5rem, 10vw, 5rem);
		/* Check if they also would like this */
		display: none;
	}

	.request-summary h2 {
		font-size: clamp(1.5rem, 4vw, 1.8rem);
		font-weight: 400;
		text-align: center;
		max-width: 80%;
	}

	.review-amount {
		width: 100%;
		max-width: 80%;
		align-self: center; 
		display: flex;
		justify-content: center;
		/* outline: solid black; */
	}
	
	.request-summary .review-amount span {
		font-size: clamp(1.5rem, 10vw, 2.8rem);
		font-weight: 600;
		border-bottom: 2px solid #ccc;
		padding: 3%;
		width: 60%;
		background-color: transparent;
		text-align: center;
		border-color: var(--primary-purple-500);
	}

	/* ////////////////////////////////// */

	.qr-container{
		min-height: fit-content;
		gap: 1rem;
		margin-block: 6%;
		/* max-width: 400px; */
	}

	.qr-container p{
		font-size: 12px;
		margin-bottom: 1%;
	}

	.qr-container img{
		width: 80%;
		height: auto;
		padding-block: 2%;
	}

	.share-button-container {
		flex: 1 1 20%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1svh;
		justify-content: end;
	}

	:is(.share-button-container,.qr-container) button {
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
		}
		
		&:nth-of-type(2n) {
			color: var(--primary-green-500);
		}
	}

</style>