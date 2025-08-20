<script>
	import { fade } from 'svelte/transition';
	import {StepContainer} from '$lib';

	let {formData,validatePayment,button,nextStep,stepValidation,previousStep,submitForm, onPaymentMethodSelect } = $props();
	let selectedMethod = $state('');
	let selectedBank = $state('');
	let methods = $derived({
		"Linked Credit/Debit Card": "Card ending in **** **** 1234",
		"iDEAL": "Select your bank",
		"EFT Payment": "Select your bank",
		"PayPal": "Pay with your PayPal account",
	});
</script>

{#snippet reviewSummary()}
	<article class="review-summary payment-confirmation">
		<h2>Please confirm your payment</h2>
		<hr />
		
		<p class="review-item">
			<span class="review-label">Recipient:</span>
			<span class="review-value">{formData.recipient.name}</span>
		</p>
		
		<p class="review-item">
			<span class="review-label">Gift Amount:</span>
			<span class="review-value">{formData.amount}</span>
		</p>
		
		<p class="review-item">
			<span class="review-label">Card Design:</span>
			<span class="review-value">{formData.cardDesign}</span>
		</p>
		
		{#if formData.message}
		<p class="review-item message">
			<span class="review-label">Message:</span>
			<span class="review-value">{formData.message}</span>
		</p>
		{/if}

		{#if formData.Purpose}
		<p class="review-item">
			<span class="review-label">Occasion:</span>
			<span class="review-value">{formData.Purpose}</span>
		</p>
		{/if}
	</article>
{/snippet}

{#snippet paymentOptions()}
	<section class="amount-input-container payment-input-container">
		{#each Object.entries(methods) as [method, info], i}
		<label for='paymentMethod{i}'>
			<input type="radio" id='paymentMethod{i}' name="paymentMethod" 
			bind:group={selectedMethod}
			onclick={() =>{
				onPaymentMethodSelect?.(`${method}${selectedBank}`);
				validatePayment()
			}} 
			value="paymentMethod{i}{method}{selectedBank}">
			{method} 
		</label>
		{#if selectedMethod === `paymentMethod${i}${method}`}
			<p class="payment-info">{info}</p>
			{#if method === "iDEAL"}
				<select class="payment-info" bind:value={selectedBank}>
					<option value="iDEAL-bank1">Bank 1</option>
					<option value="iDEAL-bank2">Bank 2</option>
					<option value="iDEAL-bank3">Bank 3</option>
				</select>
			{:else if method === "EFT Payment" }
				<select class="payment-info" bind:value={selectedBank}>
					<option value="bank1">Bank 1</option>
					<option value="bank2">Bank 2</option>
					<option value="bank3">Bank 3</option>
				</select>
			{/if}
		{/if}
		{/each}
	</section>
{/snippet}

<StepContainer 
	{formData}
	headerName="Select a payment method"
	stepType="review"
	currentStep={5}
	{nextStep}
	{previousStep}
	{stepValidation}
	showLeftContent={true}
	showRightContent={true}
	rightContent={reviewSummary	}
	leftContent={paymentOptions}
	submitForm={submitForm}
	
/>

<style>
	
	.payment-input-container{
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2vw, 3rem);
		padding-block: 3%;
		padding-inline: 0 20%;
	}
	
	.payment-input-container label {
		font-size: clamp(1rem,2vw,1.3rem);
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.payment-input-container input[type="radio"] {
		height: 100%;
		aspect-ratio: 1;
	}

	.payment-input-container p {
		margin-bottom: 1%;
		font-size: clamp(1rem,2vw,1.2rem);
		color: var(--primary-green-500);
	}
	
	/* .right-step{
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	} */
	
	.review-summary {
		align-self: baseline;
		place-self: center;
		display: flex;
		flex-direction: column;
		background-color: var(--general-background-color-secondary, var(--white));
		border-radius: 10px;
		padding: 40px;
		box-shadow: 0 4px 8px -3px rgba(0, 0, 0, 0.1);
		width: 100%;
		height: auto;
		max-height: max(30dvh,fit-content);
		max-width: 700px;
		color: light-dark(var(--general-text-color), var(--black));
		color: var(--general-text-color);

		
		@container style(--mobile:1) {
			place-self: center;
			width: 100%;
		}

		h2 {
			text-align: start;
			font-size: clamp(1rem,3vw,1.5rem);
			margin-bottom: 10px;
		}
		
		hr {
			margin-bottom: 15px;
			height: 1px;
			background-color: #1e1e1e;
		}

		.review-item {
			display: flex;
			gap: 1rem;
			margin-top: 4%;
			width: 100%;
			padding-right: 3%;
			font-size:clamp(1rem,2vw,1.2rem);
		}

		.message .review-value {
			outline: solid 1px #1e1e1e;
			width: 100%;
			text-wrap:pretty ;
		}

		span {
			position: relative;
			width: 100%;
		}
		
		.review-label {
			font-weight: 500;
			text-wrap: nowrap;
		}
	}

	.button-container {
		display: flex;
		justify-content: end;
	}

</style>