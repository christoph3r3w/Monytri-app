<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {StepContainer} from '$lib';

	
	let { formData, validatePurpose,button,nextStep,stepValidation,previousStep } = $props();

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
	currentStep={3}
	{nextStep}
	{previousStep}
	{stepValidation}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	showSkipButton={true}
	rightContent={purposeOptions}
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


		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width:auto;  

		container-type: inline-size;

		&::-webkit-scrollbar {
			width: 12px;
			background-color: #f1f1f1;
		}
		
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 4px;
			margin-block: 0.5rem;
		}
		
		&::-webkit-scrollbar-thumb {
			background: var(--primary-darkgreen-550);
			border-radius: 4px;
			min-height: 40px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: var(--primary-darkgreen-550);
			opacity: 0.8;
		}
	}
	
	.purpose-option{
		position: relative;
		display: flex;
		background-color: var(--general-background-color);
		max-width: 300px;
		flex: 1 1 40cqw;
		aspect-ratio: 1;
		border-radius: clamp(5px, 11cqw, 10px);
		overflow: clip;
	}

	.purpose-option label{
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-radius: clamp(5px, 11cqw, 10px);
		overflow: clip;
		padding-top: 5%;
	
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.purpose-option:has(img) p{
		width: fit-content;
		height: fit-content;
		padding: 2%;
		margin-inline: 5%;
		align-self:start;
		border-radius: clamp(5px, 11cqw, 5px);
		background-color: var(--white);
	}

	.purpose-option .purpose-icon-container{
		flex: 1 2 auto;
		width: 100%;
		height: 90%;
		display: flex;
		justify-content: center;
		aspect-ratio: 1;
		border-radius: clamp(5px, 11cqw, 10px);
		padding: 10%;
	}

	.purpose-option .purpose-icon{
		object-fit: contain;
		object-position: center;
	}

	.purpose-option:has(input:checked) {
		outline: solid var(--primary-darkgreen-550);
	}

	.purpose-option input {
		display: none;
		width: clamp(100px, 20cqw, 200px);
		aspect-ratio: 1;
	}

	
</style>
