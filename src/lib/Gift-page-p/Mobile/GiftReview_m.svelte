<script>
	import { fade } from 'svelte/transition';
	let { formData, validatePayment, button } = $props();
	let selectedMethod = $state('');
	let methods = $derived({
		"Linked Credit/Debit Card": "Card ending in **** **** 1234",
		"iDEAL": "Select your bank",
		"EFT Payment": "Select your bank"
	});
	let selectedBank = $state('');
</script>

<section class="step-container" transition:fade>
	<section class="step-header">
		{@render button('back')}
		<h2>Select a payment method</h2>
	</section>
	<section class="payment-input-container">
		<!-- {#if formData.recipient.linkedCard !== null }
		<label for='paymentMethod1'>
			<input type="radio" id='paymentMethod1' name="paymentMethod" value="paymentMethod1"
			onclick={() =>{
			formData.PaymentMethod = formData.recipient.linkedCard;
			validatePayment
			}} >
			Linked Credit/Debit Card
		</label>
		{/if} -->

		{#each Object.entries(methods) as [method, info], i}
		<label for='paymentMethod{i}'>
			<input type="radio" id='paymentMethod{i}' name="paymentMethod" 
			bind:group={selectedMethod}
			onclick={() =>{
			formData.PaymentMethod = `${method}${selectedBank}`;
			validatePayment
			}} value="paymentMethod{i}{method}{selectedBank}">
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

	<article class="review-summary">
		<div>
			<h2>Please confirm your payment</h2>
			<hr />
			
			<p class="review-item">
				<span class="review-label">Recipient:</span>
				<span class="review-value">{formData.recipient.name}</span>
			</p>
				
			<p class="review-item">
				<span class="review-label">Gift Amount:</span>
				<span class="review-value">&euro;{formData.amount}</span>
			</p>

			<p class="review-item">
				<span class="review-label">Delivery Date:</span>
				<span class="review-value">{formData.currentDate}</span>
				
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
		</div>
	</article>
		
	<div class="button-container">
		{@render button('submit')}
	</div>
</section>

<style>

	.step-container {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.step-header{
		flex: 0 1 10%;
	}

	.payment-input-container{
		flex: 0 1 20cqh;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 3%;
		font-size: clamp(1rem, 3vw, 1.5rem);
		border-radius: 10px;
	}

	.payment-input-container label {
		display: flex;
		align-items: start;
		gap: 1rem;
	}

	.payment-input-container input[type="radio"] {
		width: 22px;
		color: var(--black);
		aspect-ratio: 1;
	}

	.payment-input-container:has(input[type="radio"]:checked) .payment-info {
		color: var(--primary-darkgreen-550);
	}

	.review-summary{
		flex: 1 1 108%;
		display: flex;
		flex-direction: column;
		align-items: baseline;
		justify-content: flex-end;
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

	.button-container {
		flex: 0 1 10%;
		display: flex;
		justify-content: center;
	}

</style>