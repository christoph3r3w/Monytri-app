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

			<section class="step-container" transition:fade>
				<section class="step-header">
					{@render button('back')}
					<h2>Choose Recipient</h2>
					{@render button('blank')}
				</section>
					
				<p>Please select your recipient to send to.</p>
				
				{#if formData.errors[1]}
				<div class="error-message" transition:fade>
					{formData.errors[1]}
				</div>
				{/if}
				
				<section>
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
					<h3 class="section-title">Most Recent</h3>
					<ul class="recipients-list">
						{#each filteredRecipients as recipient}
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
						{:else}
							<li class="no-results">
								No recipients found
							</li>
						{/each}
					</ul>
				</section>
				<div class="button-container">
					{@render button('continue',1)}
				</div>
			</section>

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
		background-color: var(--white);
		height: fit-content;
		max-height: 50cqh;
		overflow-y: scroll !important;
		padding-inline: 1cqw;
		padding-block: 2%;

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

	section:has(label) {
		flex: 1 1 90%;
		background-color: var(--white);
		border-radius: 12px;
	}

	section:has(label) label input {
		background-color: var(--off-white);
		margin-bottom: 3%;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);		
	}

	.error-message {
		background-color: #fee;
		color: #c00;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		text-align: center;
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
