<script>
	import { fade } from 'svelte/transition';
	import {StepContainer} from '$lib';
	let { formData, recipients, selected, button,nextStep,stepValidation,previousStep } = $props();

	let filteredRecipients = $derived(
		formData.searchQuery 
		? recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
			recipient.email.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: recipients
	);
</script>

{#snippet recipientsList1()}
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

{#snippet recipientsList2()}
	<!-- check if recent title is needed  -->
	<h3 class="section-title">Most Recent</h3>
	<ul class="recipients-list">
		{#each filteredRecipients as recipient,i}
			<li class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
				onclick={() => selected(recipient)}
			>
				<article class="recipient-info">
				<div class="recipient-details">
					{#if recipient.profilePic.length > 0 || recipient.profilePic !== ''}
						<img src={recipient.profilePic} alt={''||recipient.name} class="profile-pic" />
					{:else}
					<div class="profile-letter">{recipient.name[0].toUpperCase()}</div>
					{/if}
					<span>
						<h3>{recipient.name}</h3>
						<p class="mail">{recipient.email}</p>
						<button class="more-options">...</button> 
						<!-- Here needs to come a component that when you click on a specific recipient's button, more option buttons will appear. You should get the possibility to:
						- Remove them from this list
						- Other options -->
					</span>
					</div>
					<p class="last-sent">Last sent: {recipient.lastSent}</p>
				</article>
			</li>
			<hr/>
		{/each}
	</ul>
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

	:root {
		--moveRight: 2rem;
		--size : clamp(50px, 50px + 1vw, 70px);
	}

	.section-title{
		position: relative;
		margin-bottom: 3%;
		font-size: clamp(1rem,10vw ,1.3rem);
		margin-left: calc(var(--moveRight) + 0.125rem);
		/* display: none; */
	}


	.recipients-list{ 
		flex: 1 1 70%;
		display: flex;
		flex-direction: column;
		align-self: end;
		min-width: 35dvw;
		width: calc(100% - var(--moveRight));
		overflow-y: scroll;
		background-color: light-dark(var(--white),var(--general-text-color-secondary));
		background-color: var(--general-background-color-secondary);
		gap: 1rem;
		margin-bottom: 1rem;
		padding-block: 2rem;
		padding-inline: 2rem;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		transform-origin: left;

		scrollbar-width:auto;
		overflow-y: scroll;
		overscroll-behavior: contain;
		
		.recipient-item {
			display: flex;
			width: 95%;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,2%);
			cursor: pointer;
			background-color: light-dark(var(--general-background-color), color-mix(in srgb, var(--general-text-color-secondary), var(--grey-400)));
			background-color: var(--general-background-color-secondary);
			border-radius: 10px;
		}
		
		.recipient-item:where(.selected) {
			outline: solid 2px var(--primary-darkgreen-550);	

			.recipient-details p {
				color: var(--primary-darkgreen-550);
			}
		}
		
		.recipient-info {
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 1rem;
			width: 100%;
			padding: min(2%,0.5rem);
		}

		.recipient-details {
			display: flex;
			width: 100%;
		}
		
		.profile-pic,.profile-letter {
			width: var(--size);
			height: var(--size);
			aspect-ratio: 1/1;
			border-radius: 50%;
			margin-right: 1rem;
			background-color: var(--primary-darkgreen-550);
		}

		.profile-letter {		
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
		}
		
		.recipient-details span {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content:center ;
			gap: 0.5rem;
			width: 100%;
		}
		
		.recipient-details span h3 {
			margin: 0;
			font-size: 1.25rem;
		}
		
		.recipient-details span p {
			margin: 0;
			font-size: clamp(0.8rem, 1vw, 1rem);
			font-weight: 500;
			color: var(--general-text-color-secondary);
		}

		.recipient-details span button {
			position: absolute;
			top: 0;
			right: 0;
			background-color: transparent;
			border: none;
			font-size: 1.5rem;
			cursor: pointer;
			letter-spacing: 3px;

			&:is(:hover,:focus) {
				color: var(--primary-darkgreen-550);
			}
		}
	}

	.last-sent {
		font-size: .9rem;
		font-weight: 600;
		color: var(--general-text-color-secondary);
	}

	hr:nth-last-of-type(1) {
		display: none !important;
	}

	@media (width <= 900px) {
		:root{
			--size :	90px;
		}

		.recipients-list {
			flex: 1 1 100%;
			align-self: center;
			min-width: 100%;
			margin-inline: 0;
			padding-block: 0;
		}
	}

</style>
