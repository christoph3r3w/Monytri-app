<script>
	import { onMount } from 'svelte';
	import {Balance_M,HomeArticles_M } from '$lib'
	import {current} from '$lib/store.js';
	import { device } from '$lib/Device.js';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>

<div class="home-wrapper">
	<!-- Top section of the home page on mobile. -->
	<HomeArticles_M/>	
	<div class="button-conatiner-dev">
		<button onclick={goto("/gift")}>send a gift</button>
		<button onclick={goto("/request")} disabled>request a gift</button>
		<button onclick={goto("/share")}>
				<!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18 15.0001C16.933 15.0001 16.001 15.5621 15.47 16.4011L8.7959 13.0641C8.9229 12.7321 9 12.3761 9 11.9991C9 11.6231 8.9229 11.2661 8.7959 10.9341L15.47 7.59705C16.002 8.43705 16.933 8.99805 18 8.99805C19.657 8.99805 21 7.65505 21 5.99805C21 4.34105 19.657 2.99805 18 2.99805C16.343 2.99805 15 4.34105 15 5.99805C15 6.04905 15.0129 6.09706 15.0149 6.14706L7.90796 9.70007C7.38796 9.26807 6.729 8.99707 6 8.99707C4.343 8.99707 3 10.3401 3 11.9971C3 13.6541 4.343 14.9971 6 14.9971C6.729 14.9971 7.38796 14.7271 7.90796 14.2941L15.0149 17.847C15.0129 17.897 15 17.9451 15 17.9961C15 19.6531 16.343 20.9961 18 20.9961C19.657 20.9961 21 19.6531 21 17.9961C21 16.3391 19.657 15.0001 18 15.0001Z" fill="#6057DB"/>
				</svg> -->
				share
			</button>
		<!-- <p>send feedback or issues here ⬇️</p>
		<a href="https://github.com/christoph3r3w/Monytri-dev-pwa-v1/issues/new">report issues </a> -->
	</div>
	<br>
	<p>
	Platform: {$device.platform}<br>
	Device: { $device.isMobile ? 'Mobile' : 'Desktop' }
	</p>

	{#if $device.platform === 'iOS' && $device.isMobile}
		<p>This is an iPhone or iPad.</p>
	{:else if $device.platform === 'Android' && $device.isMobile}
		<p>This is an Android phone or tablet.</p>
	{/if}
</div>

<style>
	.home-wrapper{
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		/* The minimum height is a little bit of a magic number because that seems to work for when adjusting the page. */
		min-height: calc(101cqh - var(--header-height));
		max-height: calc(120dvh - var(--footer-height)) ;
		padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom));
	}

	.button-conatiner-dev{
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-bottom: 5rem;
	}
	
	.button-conatiner-dev :is(a,button) {
		font-size: 2rem;
		border: solid 2px ;
		border-radius: 8px;
		padding: 1rem 2rem;

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: white;
		}
	}

	:global(.home-intro-section,.home-articles){
		display: none;
	}

	/* for mobile */
	:global(html:has(.home-wrapper)){
		@media (-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
			&{
				--header-intro-height: 27dvh;
				overflow-x: hidden;
			}

			:global(header){
				--body-padding: 5% ;
				padding-inline: var(--body-padding) ;
				z-index: 10;
			}
	
			:global(.home-wrapper){
				padding-top: var(--header-intro-height);
			}
			
			div.button-conatiner-dev {
				position: relative;
				margin-inline: 5%;
				
				button:nth-last-of-type(n + 2){
					display: none;
				}
			}
		}
	}	



</style>