<script>
	// import {Process_success_S} from '$lib';
	import {current,isMobile} from '$lib/store.js';
	import { Process_success_S } from '$lib';
	import { onMount } from 'svelte';
	import {fade} from 'svelte/transition';
	let formData = $state({
		currentDate: '',
		date: new Date(),
	});

	onMount(() => {
		formData.currentDate = formData.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric',hour12: true });
	});


</script>
{#snippet button()}
		<button class="back-button" onclick={() => history.back()}>
			{#if !$isMobile}
				<svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M30.9986 11.3326H6.68859L15.5103 2.51096L13.1536 0.154297L0.308594 12.9993L13.1536 25.8443L15.5103 23.4876L6.68859 14.666H30.9986V11.3326Z" fill="black"/>
				</svg>
			{:else}
				<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
				</svg>
			{/if}
		</button>
{/snippet}

<article class="success-container" >
{#if Process_success_S && formData}
<Process_success_S/>
{:else}
	<section class="step-container" transition:fade={{ duration: 200 }}>
		<section class="step-header" >
			<div class="step-header-text">
				<h2>Gift Purchase Complete!</h2>
				<p>{formData.currentDate}</p>
			</div>
		</section>
		
		<section class="success-message"  >
			<img src="./gift-page-assets/Becoming-Rich-10--Streamline-Brooklyn (Traced).png" alt="becoming rich ">
			<p>If you need to view any information about any of your transactions, head over to your transaction history.</p>
			<a href="/">Back to Homepage</a>
			<a href="/gift">Send another one</a>
		</section>
	</section>
	{/if}
</article>



<style>
	.success-container{
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		height: calc(100cqh - var(--header-height));
		max-height: calc(100dvh - var(--footer-height)) ;

		container-type:normal;
		container-name: transfer-wizard;

		/* outline: steelblue solid; */

		@container style(--mobile:1) {
			height: calc(100dvh - 4px - var(--footer-height)) !important;
		}

	}

	.step-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100% ;	
		gap: 0;
	}

	.step-header {
		position: relative;
		flex: 1 1 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		margin-bottom: 0;
		gap: 24px;
		/* outline: solid green ; */
	}

	.step-header-text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		/* outline: solid red; */
	}

	.step-header h2{
		font-size: 2.5rem;
	}

	.step-header p{
		flex: 1 1 100%;
		text-align: center;
		/* outline: solid blue; */
	}

	.button-container {
		position: absolute;
		top: 0;
		left: 0;
		width: fit-content;
		display: flex;
		flex-direction: unset;
		align-items: start;
		justify-content: space-between;
		padding:0;
	}

	.success-message {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1 80%;	
		width: 100%;
		gap: 24px;
		padding-top: 3rem;
		/* justify-content: space-around; */
		/* outline: solid rgb(23, 50, 226); */
	}

	.success-message > * {
		/* outline: solid pink; */
	}

	.success-message img {
		width: fit-content;
		object-position: center;
		object-fit: cover;
		height: auto;
	}

	.success-message p {
		text-align: center;
		font-size: 1.2rem;
		max-width: 50%;
	}

	.success-message a {
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		width: 20%;	
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
			color: var(--white);
		}
		
		&:nth-of-type(2) {
			color: var(--primary-green-500);
		}
	}


</style>
