<script>
	import { goto } from '$app/navigation';
	import {fade} from 'svelte/transition';
	import { observe } from '../Shared/useViewportAction.js';
	let { formData, validateCardDesign,button } = $props();
	let cardContainer;
	let currentCardIndex = $state(0);
	let observer;
	
	let cardDesigns = $state([
		{ id: 'design1', name: 'Design 1',cardBackground: './gift-page-assets/Gift card 1.png',cardbackgroundMessage:'./gift-page-assets/Message Card.png' ,primaryColor:'#AFABED'},
		{ id: 'design2', name: 'Design 2',cardBackground: './gift-page-assets/Gift card 6.png',cardbackgroundMessage:'./gift-page-assets/Message Card6.png' ,primaryColor:'#82A6C5'},
		{ id: 'design3', name: 'Design 3',cardBackground: './gift-page-assets/Gift card 2.png',cardbackgroundMessage:'./gift-page-assets/Message Card2.png' ,primaryColor:'#5AB1AA'},
		{ id: 'design4', name: 'Design 4',cardBackground: './gift-page-assets/Gift card 3.png',cardbackgroundMessage:'./gift-page-assets/Message Card3.png' ,primaryColor:'#F2A550'},
		{ id: 'design5', name: 'Design 5',cardBackground: './gift-page-assets/Gift card 5.png',cardbackgroundMessage:'./gift-page-assets/Message Card5.png' ,primaryColor:'#AFABED'},
		{ id: 'design6', name: 'Design 6',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'purple'},
		{ id: 'design7', name: 'Design 7',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'orange'},
		{ id: 'design8', name: 'Design 8',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'red'}
	]);

	function selectCard(index) {
		const cards = cardContainer.querySelectorAll('.card-option');
		if (cards[index]) {
			cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			validateCardDesign(cardDesigns[index].id);
		}
	}

	function handleCardVisibility(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const index = cardDesigns.findIndex(card => card.id === entry.target.id);
				if (index !== -1) {
					currentCardIndex = index;
					validateCardDesign(cardDesigns[index].id);
				}
			}
		});
	}

	$effect(() => {
		if (cardContainer) {
			const observer = new IntersectionObserver(handleCardVisibility, {
				threshold: 0.8,
				root: cardContainer
			});

			cardContainer.querySelectorAll('.card-option').forEach(card => {
				observer.observe(card);
			});

			return () => observer.disconnect();
		}
	});

</script>

<section class="step-container" transition:fade>
	<section class="step-header">
		{@render button('back')}
		<h2>Select a gift card</h2>
		{@render button('skip',4)}

	</section>
	<p>Choose a card and write a message</p>
	<span class="option-select">
		{#each cardDesigns as cardDesign, index}
		<input type="radio" id={cardDesign.id} name="cardDesign" value={cardDesign.id}
		checked={currentCardIndex === index}
		onclick={() => selectCard(index)}>
		{/each}
	</span>
	<article class="card-designs-container" bind:this={cardContainer}>
		<ul class="card-design-options">
			{#each cardDesigns as cardDesign, index}
			<li 
			id="{cardDesign.id}"
			class="card-option {currentCardIndex === index ? 'selected' : ''}" 
			style="--card-color:{cardDesign.primaryColor};--card-background:{cardDesign.cardBackground};--card-background-message:{cardDesign.cardbackgroundMessage};">
				<label for="{cardDesign.id}">
				<section class="card simple-card" 
					  style="background-image: url('{encodeURI(cardDesign.cardBackground)}');"
					>
					  <h3>{'Monytri'|| cardDesign.name}</h3>
					  <p>Stock gift card</p>
					  <span>€{formData.amount}</span>
				</section>
				<p>Tap the card below to customise your message </p>
				<section class="card message-input" 
					  style="background-image: url('{encodeURI(cardDesign.cardbackgroundMessage)}');"
					>
					  <h4>Monytri</h4>
					<p>{formData.currentDate || ''}</p>
					<label for="message"> 
						<textarea 
						id="message" 
						bind:value={formData.message}
						rows="3"
						maxlength="150"
						placeholder="Create a custom message"
						tabindex="{currentCardIndex === index ? 0 : -1}"
							></textarea>
					</label>
					<span>€{formData.amount}</span>
				</section>
				</label>
			</li>
		{/each}
		</ul>
		
	</article>

<div class="button-container">
	{@render button('continue',4)}
</div>
</section>

<style>

	/* check boxes */
	.option-select{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3%;
		margin-block: 1% 2%;
	}

	.option-select input[type="radio"] {
		position: relative;
		background-color: var(--white);
	}

	.option-select input[type="radio"]::before {
		content: '';
		position: absolute;
		inset: 0;
		display: block;
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--primary-darkgreen-550) 40% ,white);
	}

	.option-select input[type="radio"]:checked::before {
		background-color: var(--primary-darkgreen-550);
	}

	/* main container */
	.card-designs-container {
		flex: 2 1 100%;
		position: relative;
		overflow-y: auto;
	}

	/* card list */
	.card-design-options {
		position: relative;
		display: flex;
		gap: 1rem;
		width: 100%;
		height: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		
		container-type: inline-size;
	}
	
	.card-option {
		position: relative;
		height: 100%;
		flex: 0 0 100cqw;
		display: flex;
		border: solid transparent;
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}

	/* Court Color Shadows  */
	.card-option.selected {
		border-radius: 14px;
		box-shadow: inset 0px 0px 55px -48px color-mix(in srgb, var(--general-background-color) 10%, var(--card-color,var(--grey-400)));
	}

	.card-option.selected section {
		border-radius: 14px;
		box-shadow: 0px 2px 10px -1px color-mix(in srgb, var(--general-background-color) 10%, var(--card-color,var(--grey-400) 90%));
	}

	.card-option > label{
		position: relative;
		height: 100%;
		min-width: clamp(200px, 100cqw, 300px);
		flex: 1 0 99cqw;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border-radius: 14px;
	}

	.card-option label > p{
		margin-top: 1rem;
	}

	.card-option .card{
		--_inline-padding:1.6rem;
		--_block-padding:1.6rem;
		position: relative;
		height: 27cqh;
		aspect-ratio: 14/9.5;
		max-width: 424px;
		margin-inline: clamp(10px,50%,1rem);
		user-select: none;
		
		display: grid;
		grid-template-areas: a;
		place-content: center;
		border-radius: 9px;
		box-shadow: 0px 0px 23px -15px #dddddd;
		
		background-color: var(--general-background-color);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.card > *{
		position: absolute;
	}

	/* general card */
	/* middle logo */
	.simple-card h3{
		position: relative;
		font-size: min(10vw, 2.5rem);
		font-weight: 600;
	}

	/* card text */
	.simple-card p{
		font-size: .9rem;
		bottom: var(--_block-padding);
		left: calc(var(--_inline-padding) - 2cqb);
		width: 15cqw ;
	}

	/* gift-amount */
	.simple-card span{
		bottom: var(--_block-padding);
		right: var(--_inline-padding);
		font-size: 1.5rem;
		background-color: var(--off-white);
		color: var(--primary-darkgreen-550);
		border-radius: 8px;
		padding: 1%;
	}

	/* message card */
	.message-input{
		z-index: 3;
		transition: .5s ease-in-out 1ms;
		transition-property: translate;
	}

	/* logo name */
	.message-input h4{
		font-size: 1.2rem;
		font-weight: 600;
		left: calc(var(--_inline-padding) - 2cqb);
		top: calc(var(--_block-padding) - 1cqh);
		width: fit-content;
	}

	/* card date */
	.message-input p{
		font-size: 11.2px;
		top: calc(var(--_block-padding) - 1cqh);
		right: var(--_inline-padding);
		min-width: fit-content ;
		/* min-width: 15cqw ; */
	}

	/* message input */
	.message-input label {
		display: flex;
		flex-direction: column;
		inset-block: calc(var(--_inline-padding) + 3cqh) calc(var(--_block-padding) + 5cqh);
		right: var(--_inline-padding);
		z-index: 4;
	}

	.message-input label textarea {
		flex: 1 1 auto;
		text-align: right;
		width: 25cqh;
		height: fit-content;
		padding: 0.75rem;
		border-bottom: 1px solid var(--card-color,#e0e0e0);
		resize:none;
		background-color: transparent;

		&::placeholder {
			color: var(--grey-400);
			font-size: 1.1rem;
			text-wrap: no-wrap;
			width: 100%;
			height: fit-content;
		}
	}

	.message-input textarea:focus-within {
		width: clamp(300px,400px,50vw);	
		transition: 200ms ease-out;
	}

	/* gift-amount */
	.message-input span{
		bottom: var(--_block-padding);
		right: var(--_inline-padding);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--black);
		border-radius: 8px;
		padding: 1%;
		
	}


	/* .card-option.selected:has(.message-input:focus-within) .message-input{
		translate:0 -90%;
		box-shadow: 0px 0px 23px -7px #dddddd;

	} */

</style>