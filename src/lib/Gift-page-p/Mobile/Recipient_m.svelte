<script>
	import { fade } from 'svelte/transition';
	import { StepContainer } from '$lib'

	let { formData, recipients, selected, button, nextStep,previousStep,stepValidation, onSearchQueryUpdate } = $props();

	let filteredRecipients = $derived(
		formData.searchQuery 
		? recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
			recipient.email.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: recipients
	);

</script>
{#snippet recipientsList()}			
	<section>
		<h3 class="section-title">Most Recent</h3>
		<ul class="recipients-list">
			{#each filteredRecipients as recipient, i}
				<li 
				class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
				onclick={() => selected(recipient)}
				>
					<article class="recipient-info">
						{#if recipient.profilePic.length > 0 || recipient.profilePic !== ''}
							<img src={recipient.profilePic} alt={''||recipient.name} class="profile-pic" />
						{:else}
							<div class="profile-letter">{recipient.name[0].toUpperCase()}</div>
						{/if}
						<div class="recipient-details">
							<h3>{recipient.name}</h3>
							<p>{recipient.email}</p>
							<p class="last-sent">Last sent: {recipient.lastSent}</p>
						</div>
					</article>
				</li>
				<hr/>
			{:else}
				<li class="no-results">
					No recipients found
				</li>
			{/each}
		</ul>
	</section>

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
	rightContent={recipientsList}
	{onSearchQueryUpdate}
/>

<style>
	
	section:has(.recipients-list){
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1cqh;
		padding: 2%;
		overflow-y: hidden;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);
	}

	.recipients-list{ 
		background-color: var(--general-background-color);
		height: fit-content;
		max-height: 60cqh;
		overflow-y: scroll !important;
		padding-inline: 1cqw;
		padding-block: 2%;
		border-radius: 15px;

		/* background-color: blue; */
		.recipient-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,5%);
			border-radius: 10px;
			cursor: pointer;
			margin-block: 0.5cqh 1dvh;
		}
		
		.recipient-item:where(.selected) {
			outline: solid 2px var(--primary-darkgreen-550);	

			.recipient-details p {
				color: var(--primary-darkgreen-550);
			}
		}
		
		.recipient-info {
			display: flex;
			align-items: center;
		}
		
		.profile-pic {
			width: 40px;
			aspect-ratio: 1;
			border-radius: 50%;
			margin-right: 1rem;
		}

		.profile-letter {	
			width: 40px;
			aspect-ratio: 1;
			border-radius: 50%;
			margin-right: 1rem;
			background-color: var(--primary-darkgreen-550);
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
		}
		
		.recipient-details h3 {
			margin: 0;
			font-size: 1rem;
		}
		
		.recipient-details p {
			margin: 0;
			font-size: 0.875rem;
			color: #666;
		}

		.last-sent {
			display: none;
		}	
	}


	.no-results {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.profile-pic {
		width: 40px;
		aspect-ratio: 1;
		border-radius: 50%;
		margin-right: 1rem;
		background-color: var(--primary-darkgreen-550);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}


</style>
