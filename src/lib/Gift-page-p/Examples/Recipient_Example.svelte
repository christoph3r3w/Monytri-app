<script>
	import StepContainer from '../Shared/StepContainer_S.svelte';
	
	let { formData, recipients, nextStep, previousStep, stepValidation } = $props();

	let filteredRecipients = $derived(
		formData.searchQuery 
		? recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
			recipient.email.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: recipients
	);

	function selectRecipient(recipient) {
		formData.recipient = recipient;
		stepValidation[1] = true;
	}
</script>

{#snippet recipientsList()}
	<ul class="recipients-list">
		{#each filteredRecipients as recipient}
			<li class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}">
				<button
					type="button"
					class="recipient-button"
					onclick={() => selectRecipient(recipient)}
				>
					<div class="recipient-avatar">
						{recipient.name.charAt(0).toUpperCase()}
					</div>
					<div class="recipient-info">
						<h3>{recipient.name}</h3>
						<p>{recipient.email}</p>
					</div>
					{#if formData.recipient?.id === recipient.id}
						<div class="selected-indicator">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					{/if}
				</button>
			</li>
		{/each}
	</ul>
	
	{#if filteredRecipients.length === 0}
		<div class="no-results">
			<p>No recipients found matching your search.</p>
		</div>
	{/if}
{/snippet}

<StepContainer 
	{formData}
	headerName="Choose Recipient"
	stepType="recipient"
	currentStep={1}
	{nextStep}
	{previousStep}
	{stepValidation}
	{recipients}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	rightContent={recipientsList2}
/>

<style>
	.recipients-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 60vh;
		overflow-y: auto;
	}

	.recipient-item {
		border: 2px solid var(--grey-200, #e0e0e0);
		border-radius: 8px;
		transition: all 0.2s ease;
		background-color: var(--white, #fff);
	}

	.recipient-button {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		width: 100%;
		border: none;
		background: none;
		cursor: pointer;
		text-align: left;
	}

	.recipient-item:hover,
	.recipient-button:focus {
		border-color: var(--primary-green, #4caf50);
		background-color: var(--grey-50, #fafafa);
		outline: none;
	}

	.recipient-item.selected {
		border-color: var(--primary-green, #4caf50);
		background-color: var(--primary-green-light, #e8f5e8);
	}

	.recipient-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: var(--primary-green, #4caf50);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 1.2rem;
	}

	.recipient-info {
		flex: 1;
	}

	.recipient-info h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary, #1e1e1e);
	}

	.recipient-info p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary, #666);
	}

	.selected-indicator {
		color: var(--primary-green, #4caf50);
		flex-shrink: 0;
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
</style>
