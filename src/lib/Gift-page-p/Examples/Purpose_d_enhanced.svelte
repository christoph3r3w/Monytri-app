<script>
	// import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {StepContainer} from '$lib';

	
	let { 
		formData, 
		validatePurpose,
		// New props for internal step management
		currentStep = $bindable(),
		stepValidation = $bindable(),
		totalSteps = 5,
		onStepChange = null,
		
		// Backward compatibility (optional)
		nextStep = null,
		previousStep = null 
	} = $props();

	let PurposeList = $state([
		{id: 1,name: 'Birthday',value: 'Birthday',img:'./purpose-assets/Party-3--Streamline-Brooklyn (Traced)party.png'},
		{id: 2,name: 'Wedding',value: 'Wedding',img:'./purpose-assets/Lgbt-Wedding-2--Streamline-Brooklyn (Traced)wedding.png'},
		{id: 5,name: 'Just Because!',value: 'Just Because!',img:'./purpose-assets/Investment-Data-2--Streamline-Brooklyn (Traced)justbecause.png'},
		{id: 3,name: 'Anniversary',value: 'Anniversary',img:''},
		{id: 4,name: 'Thank You',value: 'Thank You',img:''},
		{id: 6,name: 'Job Promotion',value: 'Job Promotion',img:'./purpose-assets/Team-Success-3--Streamline-Brooklyn (Traced)job.png'},
		{id: 7,name: 'New Home',value: 'New Home',img:'./purpose-assets/Welcome Streamline Brooklyn 1 (Traced)newhome.png'},
		{id: 8,name: 'New Family Member',value: 'New Family Member',img:'./purpose-assets/image 18 (Traced)pregnant.png'},
	])

	let searchPurpose = $derived(formData.searchQuery 
		? PurposeList.filter(purpose => 
			purpose.name.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: PurposeList
	);

	function handlePurposeSelect(purpose) {
		formData.Purpose = purpose.value;
		validatePurpose();
	}
</script>

{#snippet purposeOptions()}
	<article class="purpose-selction">
		<ul class="purpose-options">
			{#each searchPurpose as purpose}
			<li class="purpose-option" tabindex="0" >
				<input 
					type="radio" 
					id="purpose{purpose.id}" 
					name="purpose" 
					value={purpose.value}
					onclick={() => handlePurposeSelect(purpose)}
				/>
				<label for="purpose{purpose.id}">
					{#if purpose.img}
						<p>{purpose.name}</p>
						<div class="purpose-icon-container">
							<img src={purpose.img} alt="{purpose.name} icon" class="purpose-icon" />
						</div>
					{:else}
						<p>{purpose.name}</p>
					{/if}
				</label>
			</li>
			{/each}	
		</ul>
	</article>
{/snippet}

<StepContainer 
	{formData}
	headerName="Choose a purpose"
	stepType="purpose"
	bind:currentStep
	bind:stepValidation
	{totalSteps}
	{onStepChange}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	showSkipButton={true}
	rightContent={purposeOptions}
	
	
	nextStep={nextStep}
	previousStep={previousStep}
/>

<style>
	.purpose-selction {
		position: relative;
		flex: 1 1 10%;
		height: 50vh;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		border-radius: clamp(5px, 11cqw, 10px);
	}
	
	.purpose-options {
		position: relative;
		background-color: var(--white);
		padding-inline: 3.3rem;
		padding-block: 3rem;
		display: flex;
		flex-wrap: wrap;
		align-content: start;
		justify-content: center;
		height: 100%;
		gap: clamp(1rem, 4cqw, 1.5rem);
		border-radius: clamp(5px, 11cqw, 10px);
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);
	}

	.purpose-option {
		display: flex;
		aspect-ratio: 1 / 1;
		min-width: clamp(5rem, 15cqw, 8rem);
		width: clamp(5rem, 15cqw, 8rem);
		height: clamp(5rem, 15cqw, 8rem);
		border-radius: clamp(5px, 11cqw, 10px);
		background-color: var(--off-white);
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
	}

	.purpose-option:hover {
		background-color: var(--general-background-color);
		scale: 1.02;
	}

	.purpose-option input[type="radio"] {
		display: none;
	}

	.purpose-option input[type="radio"]:checked + label {
		background-color: var(--primary-darkgreen-550);
		color: var(--white);
	}

	.purpose-option label {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		text-align: center;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: clamp(5px, 11cqw, 10px);
		transition: background-color 0.2s ease-in-out;
	}

	.purpose-option label p {
		margin: 0;
		font-size: clamp(0.7rem, 2cqw, 1rem);
		font-weight: 500;
		line-height: 1.2;
		text-wrap: balance;
	}

	.purpose-icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 60%;
		margin-top: 0.5rem;
	}

	.purpose-icon {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
