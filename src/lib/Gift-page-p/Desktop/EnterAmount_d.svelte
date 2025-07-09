<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let { selected, button, validateAmount, nextStep, min, max } = $props();
	
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


<section class="step-container" >
	<div class="left-step"  >
		<section class="step-header"  transition:fade>
			{@render button('back')}
			<h2>Select your gift amount</h2>
		</section>
	</div>

	<div class="right-step"  transition:fade>
		<form onsubmit={nextStep}>
			<fieldset class="amount-input-container">
				<label for='fixedAmount1'><input type="radio" id='fixedAmount1' name="fixedAmount" oninput={() => handleRadioInput('€25')} value="€25">&euro; 25</label>
				<label for='fixedAmount2'><input type="radio" id='fixedAmount2' name="fixedAmount" oninput={() => handleRadioInput('€50')} value="€50">&euro; 50</label>
				<label for='fixedAmount3'><input type="radio" id='fixedAmount3' name="fixedAmount" oninput={() => handleRadioInput('€100')} value="€100">&euro; 100</label>
				<label for='fixedAmount4'><input type="radio" id='fixedAmount4' name="fixedAmount" oninput={() => handleRadioInput('€500')} value="€500">&euro; 500</label>
			</fieldset>
			<fieldset class="amount-input-container custom-amount-fieldset">
				<label for="amount">Or enter a custom amount</label>
				<input 
				type="number" 
				id="amount" 
				oninput={handleNumberInput}
				placeholder="&euro;"
				min={min} 
				max={max}
				step="0.10" 
				aria-required="true"
				/>
			</fieldset>
			<div class="button-container">
				{@render button('continue',2)}
			</div>
		</form>
	</div>
</section>

<style>
	.left-step {
		height: fit-content;
	}

	.right-step {
		grid-row: 1 / span 1;
	}
	
	form:has(.amount-input-container){
		display: flex;
		flex-direction: column;
		flex: 1 1 100%;
		gap: 0;
		/* outline: teal solid; */
	}

	form .amount-input-container{
		position: relative;
		align-items: center;
		justify-content: center;
		padding-inline: 10%;
		padding-block: 5%;
	}

	form .amount-input-container:nth-of-type(1){
		flex: 1 1 63%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 65rem;
		width: 100%;
		gap: clamp(1vw,1.6rem,10cqh);
		padding-top: 8dvh;
		/* align-items: center; */
		justify-content: center;
		align-self: center;
	}

	form .amount-input-container:nth-of-type(1) label {
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
	
	form .amount-input-container:nth-of-type(1) label:is(:hover, :focus-within,:has(:checked)) {
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

	form .amount-input-container:nth-of-type(2){
		flex: 1 1 90%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		/* outline: solid rgb(128, 0, 0); */
	}

	form .amount-input-container:nth-of-type(2) label {
		font-size: 1.2rem;
		color: var(--grey-400);
		font-weight: 600;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	form .amount-input-container:nth-of-type(2) input[type="number"] {
		font-size: 1.6rem;
		border: 2px solid #ccc;
		border-radius: 8px;
		padding: 1rem 2rem;
		width: 90%;
		background-color: var(--white);
	}

</style>