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

	function setupCardObserver() {
		observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const index = cardDesigns.findIndex(card => card.id === entry.target.id);
					if (index !== -1) {
						currentCardIndex = index;
						validateCardDesign(cardDesigns[index].id);
					}
				}
			});
		}, {
			threshold: 0.5,
			root: cardContainer
		});

		// Observe all cards
		cardContainer.querySelectorAll('.card-option').forEach(card => {
			observer.observe(card);
		});
	}

	function selectCard(index) {
		const cards = cardContainer.querySelectorAll('.card-option');
		if (cards[index]) {
			cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			validateCardDesign(cardDesigns[index].id);
		}
	}

	$effect(() => {
		if (cardContainer) {
			setupCardObserver();
		}
	});
</script>
<section class="step-container">
	<div class="left-step" >
		<section class="step-header"  transition:fade>
			{@render button('back')}
			<div class="step-header-text">
				<h2>Select a gift card</h2>
			</div>
		</section>
		<p>Choose a card and write a message </p>
	</div>

	<div class="right-step"  transition:fade>
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
					style="--card-color:{cardDesign.primaryColor};--card-background:{cardDesign.cardBackground};--card-background-message:{cardDesign.cardbackgroundMessage};"
					use:observe={{
						onEnter: () => {
							console.log(`Card ${cardDesign.id} entered view!`);
							// Find and check the radio input
							const radioInput = document.getElementById(cardDesign.id);
							if (cardDesign.id) {
								radioInput.checked = true;
								// Trigger the onclick handler to update formData
								validateCardDesign(cardDesign.id);
							}
						},
						threshold: .8
					}}>
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
			{@render button('skip',4)}
		</div>
	</div>
</section>

<style>

	.right-step{
		height: 100%;
		flex-direction: column;
	}
	
	/* main container */
	.card-designs-container {
		flex: 1 2 90%;
		height: 100%;
		position: relative;
		padding-inline: 1rem;
		display: flex;
		align-items: end;
		justify-content: end;
		overflow: auto;
	}

	@media (max-width: 930px), (max-height: 600px) {
		.card-designs-container {
			flex: 1 1 80%;
			height: clamp(60%,85vh,89%) ;
		}
	}

	/* chard select check boxes */
	.option-select{
		flex: 0 1 5%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3%;
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

	.card-design-options {
		position: relative;
		display: flex;
		gap: 1vw;
		width: 110%;
		max-width: 55rem;
		height: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		
		container-type: inline-size;
		anchor-name: --myAnchor;
		counter-increment: markers;
		scroll-marker-group:after;
	}

	@supports selector(ul::scroll-button(*)){
		.card-design-options::scroll-button(right){
			content: 'next';
			right: 0;
			right: anchor(right);
		}
	
		.card-design-options::scroll-button(left){
			content:'prev';
			left: 0;
			left: anchor(left);
		}

		.card-design-options::scroll-button(*){
			background-color: var(--white);
			padding: 2%;
			position: absolute;
			bottom: 15%;
			position-anchor: --myAnchor;
			border-radius: 10px;
			border: none;
			z-index: 50;
			cursor: pointer;
			background-color: var(--primary-darkgreen-200);
		}

		.card-design-options::scroll-button(*):disabled{
			opacity: 0.5;
		}

		/* needs to be checked or deleted */
		/* .card-design-options::scroll-marke-group{
			position-anchor: --myAnchor;
			display: flex;
			gap: 3%;
			position: absolute;
			bottom: 0;
			bottom: anchor(bottom);
			outline: solid red;
		} */
	}

	.card-option {
		position: relative;
		height: 100%;
		flex: 0 0 100cqw;
		display: flex;
		border: solid transparent;
		scroll-snap-align:start;
		scroll-snap-stop: always;
	}

	/* middle text between cards */
	.card-option label > p {
		width: 100%;
		max-width: 400px;
		text-align: start;
		text-align: center;
		margin-top: 2rem;
	}

	/* container inset border color  */
	.card-option.selected:hover {
		border-radius: 14px;
		box-shadow: inset 0px 0px 55px -37px color-mix(in srgb, var(--general-background-color) 30%, var(--card-color,var(--grey-400)));
		transition: 100ms ease-in-out;
	}

	/* card shadow color */
	.card-option.selected section {
		border-radius: 14px;
		box-shadow: 0px 0px 75px -30px color-mix(in srgb, var(--general-background-color) 10%, var(--card-color,var(--grey-400) 90%));
	}

	.card-option > label{
		position: relative;
		padding: 1rem;
		height: 100%;
		min-width: clamp(3%,300px,100%);
		flex: 0 0 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1cqb;
		align-items: center;
		border-radius: 14px;
	}

	.card-option .card{
		--_inline-padding:1.6rem;
		--_block-padding:1.6rem;
		position: relative;
		width: clamp(200px,420px 30cqw);
		height: clamp(10cqi,50cqi,30cqh);
		aspect-ratio: 14/9;
		background-color: var(--white);
		display: grid;
		grid-template-areas: a;
		place-content: center;
		border-radius: 9px;
		box-shadow: 0px 0px 23px -17px #dddddd;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		user-select: none;
		/* outline: solid rgb(0, 255, 21); */
	}
	
	.card > *{
		position: absolute;
	}

	/* general card styling */

	/* logo in the middle  */
	.simple-card h3{
		position: relative;
		font-size: clamp(1.5rem, 2.5rem, 4rem);
		font-weight: 600;
	}

	/* card text bottom left */
	.simple-card p{
		font-size: .9rem;
		bottom: var(--_block-padding);
		left: calc(var(--_inline-padding) - 2cqw);
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

	.message-input{
		container-type: inline-size;
	}

	/* logo name */
	.message-input h4{
		font-size: 1.2rem;
		font-weight: 600;
		left: calc(var(--_inline-padding) - 2cqw);
		top: calc(var(--_block-padding) - 1cqh);
		width: fit-content;
	}

	/* card date */
	.message-input p{
		font-size: 11.2px;
		top: calc(var(--_block-padding) - 1cqh);
		right: var(--_inline-padding);
		width: fit-content ;
		min-width: 15cqw ;
	}

	/* message input */
	.message-input label {
		display: flex;
		flex-direction: column;
		inset-block: calc(var(--_inline-padding) + 3cqh) calc(var(--_block-padding) + 5cqh);
		right: var(--_inline-padding);
	}

	.message-input label textarea {
		flex: 1 1 auto;
		text-align: right;
		width: 50cqmin;
		height: auto;
		padding: 0.75rem;
		border-bottom: 1px solid var(--card-color,#e0e0e0);
		resize:none;
		background-color: transparent;
		transition: 160ms ease-out;

		&::placeholder {
			font-size: 1.1rem;
			padding-top: 8cqh;
			text-wrap: no-wrap;
			width: 100%;
		}
	}

	.message-input textarea:focus-within {
		width: 90cqw;
	}

	.message-input textarea:hover:not(:focus-within) {
		background-color: color-mix(in srgb,  var(--card-color,#e0e0e0) 30%, var(--white));
		border-radius: 9px;
		&::placeholder {
			color: var(--black);
		}
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

:global(html:has(.mobile-device))
	.card-design-options{
		display: none;
	}

</style>
