<script>
	import { fade } from 'svelte/transition';
	let { formData, recipients, selected, button } = $props();

	let filteredRecipients = $derived(
		formData.searchQuery 
		? recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
			recipient.email.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: recipients
	);

</script>

<section class="step-container" >
	<div class="left-step"  >
		<section class="step-header"  transition:fade>
			{@render button('back')}
			<h2>Choose Recipient</h2>
		</section>
		
		<p>Please select your recipient to send to.</p>
		
		<section class="search-container">
			<label for="search" class="search-label">
				<input 
				type="search" 
				placeholder="Search Recipients" 
				class="search-input"
				bind:value={formData.searchQuery}
				/>
				{#if formData.searchQuery.length < 1}
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" class="search-icon">
						<path fill="#A0A0A0" d="M29.295 27.705l-5.762-5.761a13.058 13.058 0 0 0 3.092-8.444C26.625 6.263 20.738.375 13.5.375c-7.238 0-13.125 5.888-13.125 13.125s5.888 13.125 13.125 13.125c3.215 0 6.159-1.166 8.444-3.091l5.761 5.761a1.122 1.122 0 0 0 1.59 0c.44-.438.44-1.15 0-1.59ZM2.625 13.5c0-5.997 4.878-10.875 10.875-10.875S24.375 7.503 24.375 13.5s-4.878 10.875-10.875 10.875S2.625 19.497 2.625 13.5Z"/>
					</svg>
				{/if}
			</label>
		</section>
		{#if formData.errors[1]}
			<div class="error-message" transition:fade>
					{formData.errors[1]}
			</div>
		{/if}
	</div>
	
	<div class="right-step"  transition:fade>
		<ul class="recipients-list">
			{#each filteredRecipients as recipient}
				<li 
					class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
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
				<hr>
			{/each}
		</ul>
		
		<div class="button-container">
			{@render button('continue',1)}
		</div>
	</div>
</section>

<style>

	.left-step {
		position: relative;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}

	.step-header {
		display: flex;
		align-items: end;
		margin-bottom: 1rem;
		width: 100%;
	}

	.recipients-list{ 
		flex: 1 1 70%;
		display: flex;
		flex-direction: column;
		min-width: 35dvw;
		overflow-y: scroll;
		background-color: var(--white);
		gap: 1rem;
		margin-bottom: 1rem;
		padding-block: 2rem;
		padding-inline: 2rem;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);
		border-radius: 10px;

		scrollbar-width:auto;
		overflow-y: scroll;
		overscroll-behavior: contain;
		
		.recipient-item {
			display: flex;
			width: 95%;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,3%);
			cursor: pointer;
		}
		
		.recipient-item:where(.selected) {
			outline: solid 2px var(--primary-darkgreen-550);	
			border-radius: 10px;

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
		
		.profile-pic {
			width: clamp(50px, 10vw, 70px);
			aspect-ratio: 1;
			border-radius: 50%;
			margin-right: 1rem;
		}

		.profile-letter {	
			width: clamp(50px, 10vw, 70px);
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
		
		.recipient-details span {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 100%;
		}
		
		.recipient-details span h3 {
			margin: 0;
			font-size: 1rem;
		}
		
		.recipient-details span p {
			margin: 0;
			font-size: clamp(0.8rem, 1vw, 1rem);
			color: #666;
		}

		.recipient-details span button {
			position: absolute;
			top: -30%;
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
		font-size: 0.8rem;
		color: #666;
	}

	hr:nth-last-of-type(1) {
		display: none !important;
	}

	@media (width <= 900px) {
		.recipients-list {
			flex: 1 1 100%;
			align-self: center;
			min-width: 100%;
			margin-inline: 0;
			padding-block: 0;
		}
	}

</style>
