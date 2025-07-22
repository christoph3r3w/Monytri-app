<script>
	import StepContainer from '../Shared/StepContainer_S.svelte';
	import { onMount } from 'svelte';
	
	let { formData, nextStep, previousStep, stepValidation, min = 1, max = 1000 } = $props();
	
	let selectedAmount = $state('');

	onMount(() => {
		selectedAmount = '';
	});

	function handleRadioInput(value) {
		formData.amount = value;
		validateAmount();
	}

	function handleNumberInput(e) {
		formData.amount = e.target.value;
		validateAmount();
	}
	
	function validateAmount() {
		const amount = parseFloat(formData.amount?.replace('€', '') || 0);
		stepValidation[2] = amount >= min && amount <= max;
	}
</script>

{#snippet amountForm()}
	<form onsubmit={() => {
		preventDefault();
		nextStep
		}}>
		<fieldset class="amount-input-container">
			<label for='fixedAmount1'>
				<input 
					type="radio" 
					id='fixedAmount1' 
					name="fixedAmount" 
					oninput={() => handleRadioInput('€25')} 
					value="€25"
				>
				€25
			</label>
			<label for='fixedAmount2'>
				<input 
					type="radio" 
					id='fixedAmount2' 
					name="fixedAmount" 
					oninput={() => handleRadioInput('€50')} 
					value="€50"
				>
				€50
			</label>
			<label for='fixedAmount3'>
				<input 
					type="radio" 
					id='fixedAmount3' 
					name="fixedAmount" 
					oninput={() => handleRadioInput('€100')} 
					value="€100"
				>
				€100
			</label>
			<label for='fixedAmount4'>
				<input 
					type="radio" 
					id='fixedAmount4' 
					name="fixedAmount" 
					oninput={() => handleRadioInput('€500')} 
					value="€150"
				>
				€150
			</label>
		</fieldset>
		
		<fieldset class="amount-input-container custom-amount-fieldset">
			<label for="amount">Or enter a custom amount</label>
			<input 
				type="number" 
				id="amount" 
				oninput={handleNumberInput}
				placeholder="€"
				min={min} 
				max={max}
				step="0.10" 
				aria-required="true"
			/>
		</fieldset>
	</form>
{/snippet}

<StepContainer 
	{formData}
	headerName="Select your gift amount"
	stepType="amount"
	currentStep={2}
	{nextStep}
	{previousStep}
	{stepValidation}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	rightContent={amountForm}
/>

<style>
	.amount-input-container {
		position: relative;
		align-items: center;
		justify-content: center;
		padding-inline: 10%;
		padding-block: 5%;
		border: none;
	}

	.amount-input-container:nth-of-type(1) {
		flex: 1 1 63%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 65rem;
		width: 100%;
		gap: clamp(1vw, 1.6rem, 10cqh);
		padding-top: 8dvh;
		justify-content: center;
		align-self: center;
	}

	.amount-input-container:nth-of-type(1) label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: clamp(1rem, 40%, 7rem);
		width: clamp(10%, 40%, 16rem);
		padding: 1rem 2rem;
		font-size: 1.6rem;
		font-weight: 700;
		text-wrap-mode: nowrap;
		border-radius: 8px;
		background-color: var(--primary-darkgreen-200);
		color: var(--primary-darkgreen-550);
		cursor: pointer;
		transition: background-color 0.2s ease, border-color 0.2s ease;
	}

	.amount-input-container:nth-of-type(1) label:is(:hover, :focus-within, :has(:checked)) {
		position: relative;
		background-color: var(--primary-darkgreen-550);
		color: white;
		outline: none;
	}

	.amount-input-container:nth-of-type(1) input {
		position: absolute;
		inset: 10px;
		width: 100%;
		padding: 0.75rem;
		border-radius: 4px;
		appearance: none;
	}

	.custom-amount-fieldset {
		flex: 1 1 90%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.custom-amount-fieldset label {
		font-size: 1.2rem;
		color: var(--grey-400);
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	.custom-amount-fieldset input[type="number"] {
		font-size: 1.6rem;
		border: 2px solid #ccc;
		border-radius: 8px;
		padding: 1rem 2rem;
		width: 90%;
		background-color: var(--white);
	}
</style>
