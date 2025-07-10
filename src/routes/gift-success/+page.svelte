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

		@media (-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)  {
			height: 106dvh !important;
			max-height: calc(101dvh - var(--footer-height));
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
</style>
