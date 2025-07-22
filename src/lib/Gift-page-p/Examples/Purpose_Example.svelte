<script>
	import StepContainer from '../Shared/StepContainer_S.svelte';
	
	let { formData, nextStep, previousStep, stepValidation } = $props();

	let purposeList = $state([
		{id: 1, name: 'Birthday', value: 'Birthday', img: './purpose-assets/Party-3--Streamline-Brooklyn (Traced)party.png'},
		{id: 2, name: 'Wedding', value: 'Wedding', img: './purpose-assets/Lgbt-Wedding-2--Streamline-Brooklyn (Traced)wedding.png'},
		{id: 3, name: 'Just Because!', value: 'Just Because!', img: './purpose-assets/Investment-Data-2--Streamline-Brooklyn (Traced)justbecause.png'},
		{id: 4, name: 'Anniversary', value: 'Anniversary', img: ''},
		{id: 5, name: 'Thank You', value: 'Thank You', img: ''},
		{id: 6, name: 'Job Promotion', value: 'Job Promotion', img: './purpose-assets/Team-Success-3--Streamline-Brooklyn (Traced)job.png'},
		{id: 7, name: 'New Home', value: 'New Home', img: './purpose-assets/Welcome Streamline Brooklyn 1 (Traced)newhome.png'},
		{id: 8, name: 'New Family Member', value: 'New Family Member', img: './purpose-assets/image 18 (Traced)pregnant.png'},
	]);

	let searchPurpose = $derived(formData.searchQuery 
		? purposeList.filter(purpose => 
			purpose.name.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: purposeList
	);

	function handlePurposeSelect(purpose) {
		formData.Purpose = purpose.value;
		stepValidation[3] = true;
	}
</script>

{#snippet purposeGrid()}
	<div class="purpose-grid">
		{#each searchPurpose as purpose}
			<button
				type="button"
				class="purpose-card {formData.Purpose === purpose.value ? 'selected' : ''}"
				onclick={() => handlePurposeSelect(purpose)}
			>
				{#if purpose.img}
					<div class="purpose-image">
						<img src={purpose.img} alt={purpose.name} />
					</div>
				{:else}
					<div class="purpose-placeholder">
						{purpose.name.charAt(0)}
					</div>
				{/if}
				<h3>{purpose.name}</h3>
				{#if formData.Purpose === purpose.value}
					<div class="selected-indicator">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				{/if}
			</button>
		{/each}
	</div>
	
	{#if searchPurpose.length === 0}
		<div class="no-results">
			<p>No occasions found matching your search.</p>
		</div>
	{/if}
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
	rightContent={purposeGrid}
/>

<style>
	.purpose-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1.5rem;
		padding: 1rem 0;
		max-height: 60vh;
		overflow-y: auto;
	}

	.purpose-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 1rem;
		border: 2px solid var(--grey-200, #e0e0e0);
		border-radius: 12px;
		background-color: var(--white, #fff);
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: center;
		position: relative;
	}

	.purpose-card:hover,
	.purpose-card:focus {
		border-color: var(--primary-green, #4caf50);
		box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
		outline: none;
	}

	.purpose-card.selected {
		border-color: var(--primary-green, #4caf50);
		background-color: var(--primary-green-light, #e8f5e8);
		box-shadow: 0 4px 12px rgba(76, 175, 80, 0.25);
	}

	.purpose-image {
		width: 64px;
		height: 64px;
		margin-bottom: 1rem;
		border-radius: 8px;
		overflow: hidden;
	}

	.purpose-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.purpose-placeholder {
		width: 64px;
		height: 64px;
		margin-bottom: 1rem;
		border-radius: 8px;
		background-color: var(--primary-green, #4caf50);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.purpose-card h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary, #1e1e1e);
		line-height: 1.3;
	}

	.selected-indicator {
		position: absolute;
		top: 10px;
		right: 10px;
		color: var(--primary-green, #4caf50);
		background-color: white;
		border-radius: 50%;
		padding: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.no-results {
		text-align: center;
		padding: 3rem 1rem;
		color: var(--text-secondary, #666);
	}

	.no-results p {
		font-size: 1.1rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.purpose-grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 1rem;
		}

		.purpose-card {
			padding: 1rem 0.75rem;
		}

		.purpose-image,
		.purpose-placeholder {
			width: 48px;
			height: 48px;
		}

		.purpose-placeholder {
			font-size: 1.2rem;
		}

		.purpose-card h3 {
			font-size: 0.9rem;
		}
	}
</style>
