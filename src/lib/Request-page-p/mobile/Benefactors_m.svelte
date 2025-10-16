<script>
	import { fade } from 'svelte/transition';
	import { StepContainer } from '$lib';
	let { formData, benefactors, selected,nextStep,previousStep,stepValidation, onSearchQueryUpdate } = $props();

	let filteredbenefactors = $derived.by(() => {
		const list = Array.isArray(benefactors) ? benefactors : [];
		const q = (formData?.searchQuery ?? '').trim().toLowerCase();
		if (!q) return list;

		return list.filter((b) => {
			const name = String(b?.name ?? '').toLowerCase();
			const email = String(b?.email ?? '').toLowerCase();
			return name.includes(q) || email.includes(q);
		});
	});

</script>

{#snippet benefactorList()}
	<section>
		<h3 class="section-title">Most Recent</h3>
		<ul class="benefactors-list">
			{#each filteredbenefactors as benefactor}
				<li 
					class="benefactor-item {formData.benefactor?.id === benefactor.id ? 'selected' : ''}"
					onclick={() => selected(benefactor)}
					>
					<article class="benefactor-info">
						{#if benefactor.profilePic.length > 0 || benefactor.profilePic !== ''}
							<img src={benefactor.profilePic} alt={''||benefactor.name} class="profile-pic" />
						{:else}
							<div class="profile-letter">{benefactor.name[0].toUpperCase()}</div>
						{/if}
						<div class="benefactor-details">
							<h3>{benefactor.name}</h3>
							<p>{benefactor.email}</p>
							<p class="last-sent">Last sent: {benefactor.lastSent}</p>
						</div>
					</article>
				</li>
				<hr/>
			{:else}
				<li class="no-results">
					No benefactors found
				</li>
			{/each}
		</ul>
	</section>

{/snippet}

<StepContainer 
	{formData}
	headerName="Choose a benefactor"
	stepType="benefactor"
	currentStep={1}
	{nextStep}	
	{previousStep}
	{stepValidation}
	{benefactors}
	showLeftContent={true}
	showRightContent={true}
	showContinueButton={true}
	showSkipButton={''}
	rightContent={benefactorList}
	{onSearchQueryUpdate}
/>

<style>
	
	section:has(.benefactors-list){
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1cqh;
		padding: 2%;
		overflow-y: hidden;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);
	}
	
	.benefactors-list{ 
		background-color: var(--general-background-color);
		height: fit-content;
		max-height: 60cqh;
		overflow-y: scroll !important;
		scrollbar-width:auto;
		overscroll-behavior: contain;
		padding-inline: 1cqw;
		padding-block: 2%;
		border-radius: 15px;

		/* background-color: blue; */
		.benefactor-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,5%);
			border-radius: 10px;
			cursor: pointer;
			margin-block: 0.5cqh 1dvh;
		}
		
		.benefactor-item:where(.selected) {
			outline: solid 2px var(--primary-darkgreen-550);	

			.benefactor-details p {
				color: var(--primary-darkgreen-550);
			}
		}
		
		.benefactor-info {
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
		
		.benefactor-details h3 {
			margin: 0;
			font-size: 1rem;
		}
		
		.benefactor-details p {
			margin: 0;
			font-size: 0.875rem;
			color: #666;
		}

		.last-sent {
			display: none;
		}	
	}

	/* needs to be removed */
	/* section:has(label) {
		flex: 1 1 90%;
		background-color: var(--white);
		border-radius: 12px;
		outline: solid 1px red;
	} */

	section:has(label) label input {
		background-color: var(--off-white);
		margin-bottom: 3%;
		box-shadow: 0 4px 8px -7px rgba(0, 0, 0, 0.1);		
	}

	.error-message {
		background-color: #fee;
		color: var(--primary-red-500);
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
