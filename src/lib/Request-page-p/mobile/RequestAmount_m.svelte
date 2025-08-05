<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { StepContainer } from '$lib';
	let { formData,selected,button,validateAmount,nextStep,previousStep,stepValidation } = $props();
	
	let selectedAmount = $state('');

	onMount(() => {
		selectedAmount = '';
	});

	function handleRadioInput(value) {
		const event = {
			target: {
				type: 'radio',
				id: value,
				value: value
			}
		};
		validateAmount(event);
	}

	function handleNumberInput(e) {
		const event = {
			target: {
				type: 'number',
				value: e.target.value
			}
		};
		validateAmount(event);
	}
</script>

{#snippet amountOption()}
		<form onsubmit={nextStep}>
		<fieldset class="amount-input-container" in:fly={{ x: -200, duration: 300 }}>
			<label for='fixedAmount1'><input type="radio" id='fixedAmount1' name="fixedAmount" oninput={() => handleRadioInput('€25')} value="€25">&euro; 25</label>
			<label for='fixedAmount2'><input type="radio" id='fixedAmount2' name="fixedAmount" oninput={() => handleRadioInput('€50')} value="€50">&euro; 50</label>
			<label for='fixedAmount3'><input type="radio" id='fixedAmount3' name="fixedAmount" oninput={() => handleRadioInput('€100')} value="€100">&euro; 100</label>
			<label for='fixedAmount4'><input type="radio" id='fixedAmount4' name="fixedAmount" oninput={() => handleRadioInput('€150')} value="€150">&euro; 150</label>
		</fieldset>
		<fieldset class="amount-input-container custom-amount-fieldset" >
			<!-- <label for="amount">Or enter a custom amount</label> -->
			<input 
			type="number" 
			id="amount" 
			oninput={handleNumberInput}
			placeholder="Enter amount"
			min="0.11"
			max="150"
			step="0.10" 
			aria-required="true"
			/>
		</fieldset>
	</form>

{/snippet}

<StepContainer
	{formData}
	headerName="Request amount"
	stepType="amount"
	currentStep={2}
	{nextStep}
	{previousStep}
	{stepValidation}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	rightContent={amountOption}
/>

<style>
	form:has(.amount-input-container){
		display: flex;
		flex-direction: column-reverse;
		flex: 1 1 100%;
		gap: 0;

		/* background-image: url('./shared-assests/banner-deco2.png'); */
		/* background-image: url('./shared-assests/Vector 6.png'); */
		background-position:top center;
		background-repeat: no-repeat;
		/* background-size: cover; */
	}
	
	form .amount-input-container{
		position: relative;
		align-items: center;
		justify-content: center;
		padding-block: 5%;
	}
	
	form .amount-input-container:nth-of-type(1){
		flex: 1 1 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 45rem;
		align-self: center;
		align-items: flex-start;
		gap: clamp(1vw,1.2rem,10cqh);
		overflow: auto;
		/* outline: solid yellow; */
	}

	form .amount-input-container:nth-of-type(1) label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: clamp(1rem, 40%, 7rem);
		min-width: clamp(10%, 40%, 100%);
		padding: 1rem 2rem;
		font-size: clamp(1rem,1.6rem,1.6rem);
		font-weight: 700;
		text-wrap-mode: nowrap;
		border-radius: 8px;
		background-color: var(--primary-darkgreen-200);
		color: var(--primary-darkgreen-550);
		cursor: pointer;
		
		transition: background-color 0.2s ease, border-color 0.2s ease;

	}
	
	form .amount-input-container:nth-of-type(1) label:is(:hover, :focus-within,:checked) {
		position: relative;
		background-color: var(--primary-darkgreen-550);
		color: white;
		outline: none;
	}
	
	.amount-input-container:nth-of-type(1) input {
		position: absolute;
		inset: 10px;
		padding: 0.75rem;
		border-radius: 4px;
		appearance: none;
	}

	form .amount-input-container:nth-of-type(2){
		flex: 1 1 30%;
		display: flex;
		flex-direction: column;
		max-width: 40rem;
		width: 100%;
		align-self: center;

		/* outline: solid red; */
	}

	form .amount-input-container:nth-of-type(2) label {
		font-size: .9rem;
		width: 100%;
		color: var(--black);
		font-weight: 400;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	form .amount-input-container:nth-of-type(2) input[type="number"] {
		font-size: 1.6rem;
		border-bottom: 2px solid #ccc;
		padding: 3%;
		width: 60%;
		background-color: transparent;
		text-align: center;
		border-color: var(--primary-purple-500);
	}

	form .amount-input-container:nth-of-type(2) input[type="number"]:is(:focus,:focus-within) {
		outline: none;
		background-color: #4b7a5b2a;
		box-shadow: inset 0 0 20px -15px #717e7580;
	}
</style>