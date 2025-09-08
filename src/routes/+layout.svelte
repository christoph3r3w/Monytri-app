<script>
	import {onMount} from 'svelte';
  	import {onNavigate,afterNavigate} from '$app/navigation'
	import {Header,Footer,Menu} from '$lib'
	import {current,isMobile,menuOpen, updateCurrentFromPath} from '$lib/store.js'
	import {isAuthenticated,user} from '$lib/user';
	import { fade } from 'svelte/transition';

	import '../app.css';
  
	let { children } = $props();

	let menu_Open = $derived($menuOpen);

	let noHeaderPage = $derived($current == 'gift' || $current == 'request' || $current == 'login' );
	let noFooterPage = $derived($current == 'login' || $current == 'register' || $current == 'reset-password' || !$isAuthenticated);
	// function to detect and update service worker update
	async function detectSWUpdate(){
		const registration = await navigator.serviceWorker.ready;
		
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('A new version of the app is available. Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
						return
					}
				}
			});
		});
	}

	
	$effect(() => {
		detectSWUpdate();

		// Function to update isMobile store value
		const updateIsMobile = () => {
			isMobile.set(getComputedStyle(document.documentElement).getPropertyValue('--mobile') === '1');
			updateCurrentFromPath();
		};

		// Debounce the updateIsMobile function to prevent it from running too frequently
		const debouncedUpdateIsMobile = debounce(updateIsMobile, 50);

		// Run updateIsMobile immediately on mount
		updateIsMobile();

		// Use ResizeObserver to update isMobile when the viewport size changes
		const resizeObserver = new ResizeObserver(() => {
			debouncedUpdateIsMobile();
		});

		// Listen for page navigation
		window.addEventListener('resize', updateIsMobile);
		window.addEventListener('load', updateIsMobile);
		// window.addEventListener('load', currentPage);

		 // Listen for page navigation
		window.addEventListener('popstate', () => {
			updateCurrentFromPath();
		});

		window.addEventListener('resize', debouncedUpdateIsMobile);
		
		// Handle orientation change explicitly 
		window.addEventListener('orientationchange', debouncedUpdateIsMobile);
		
		// Run when page fully loads (including all resources)
		const handleFullPageLoad = () => {
			// console.log('Page fully loaded with all resources');
			updateIsMobile(); // Update mobile detection after full page load
		};
		
		// Check if page is already loaded
		if (document.readyState === 'complete') {
			handleFullPageLoad();
		} else {
			window.addEventListener('load', handleFullPageLoad);
		}
		
		// debounce function to prevent the updateIsMobile function from running too frequently
		function debounce(func, wait) {
			let timeout;
			return function executedFunction(...args) {
				const later = () => {
					clearTimeout(timeout);
					func(...args);
				};
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		}
		
		// Cleanup function
		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('orientationchange', updateIsMobile);
			window.removeEventListener('load', handleFullPageLoad);
			window.removeEventListener('popstate', updateCurrentFromPath);
		};
	});

	// causes an issue when mobile view is active
	// onNavigate((navigation) => {
    //     if(!document.startViewTransition){return};

    //     return new Promise((resolve) =>{
    //         document.startViewTransition(async ()=>{
    //             resolve();
    //             await navigation.complete;
    //         })
    //     })
    // })

	afterNavigate(() => {
		updateCurrentFromPath();
	});

	// loggoing the current store value
	current.subscribe(value => {
		// console.log('Current store value:', value);
	});

	isMobile.subscribe(value => {
		// console.log('isMobile store value:', value);
	});
	
</script>

<svelte:head>
	<title>Monytri {$current}</title>
</svelte:head>

<!-- main application layout -->
<section class="body-container">
	{#if $isMobile && noHeaderPage}
	{:else}
		<header>
			<Header {current}/>	
		</header>
	{/if}
	{#if menu_Open}
		<Menu/>
	{/if}
		<main class:noHeaderPage={noHeaderPage} class:noFooterPage={noFooterPage}>
			{@render children()}
		</main>
	{#if $isMobile && noFooterPage}
	{:else}
		<footer>
			<Footer {current}/>
		</footer>
	{/if}
</section>


<style >
	:root{
		/* general color scheme */
		color-scheme: light dark;

		/* property that controls the toggle od desktop and mobile */
		--mobile: 0;
		--safe-area-inset-top: env(safe-area-inset-top, 0px);
		--safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
		--safe-area-inset-left: env(safe-area-inset-left, 0px);
		--safe-area-inset-right: env(safe-area-inset-right, 0px);

		/* and other styling properties */
		--body-padding: 2%;
		--header-height: calc(8dvh + var(--safe-area-inset-top));
		--footer-height: calc(60px + var(--safe-area-inset-bottom));

		/* all the elements that will be animated */
		will-change: transform, height, background-color, box-shadow, border-radius,position;
		
		/* application general grid structure */
		--grid--mobile-collums: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
		--grid-collums-gutter: 1rem;
		--grid-collums-rows: [header-start] var(--header-height) [header-end main-start] 2fr [main-end footer-start] minmax(316px,15dvh) [footer-end];
		--grid-collums-rows-gutter: 1rem;

		/* property that controls the toggle od desktop and mobile */
		@property --mobile{
			syntax: "<number>"; 
			initial-value: 0;
			inherits: true;
    	}
	}

	:global(*):is(:focus-visible) {
		outline: 2px solid var(--primary-orange-500);
		outline-offset: 2px;
	}

	:global(html){
		overscroll-behavior-x: contain;
		overscroll-behavior-y: contain;
	}

	:global(body){
		width: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		overflow-y: auto;
		max-height:100svh;
		height: 100svh;
		overscroll-behavior-x: contain;
		overscroll-behavior-y: contain;
		color: var(--general-text-color);
	}
	
	:global(.body-container){
		display: grid;
		grid-template-columns: var(--body-padding) [content-start] repeat(12,1fr) [content-end] var(--body-padding);
		grid-template-rows: [header-start] var(--header-height) [header-end main-start] min(calc(100dvh - var(--header-height)),100%) [main-end footer-start] minmax(316px,15dvh) [footer-end];
		min-height: 100dvh;
		background-color: var(--general-background-color);
		overflow-x: clip;
		/* overflow-y:auto; */
		overscroll-behavior-x: contain;
		overscroll-behavior-y: contain;
	}
	
	:global(header){
		grid-row: header;
		grid-column: 1/-1;
		z-index: 100;
		container-type: inline-size;
		container-name:header;
	}
	
	:global(main) {
		background-color: var(--general-background-color);
		grid-row: main;
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
		overflow-x: hidden;
		overflow-y: visible;
		
		
		container-name: main;

		/* grid positioning for all main content */
		&:nth-of-type(1)  {
			position: relative;
			grid-row: main;
			display: grid;
			grid-template-columns: subgrid;
			align-content: start;
			overflow-x: clip;
			overflow-y: visible;
		}
				
		&:nth-of-type(1) > :is(:global(*)) {
			grid-column: 1/ span 1;
			grid-row: 1/span 1;
		}

		&:nth-of-type(1):has(:global(*) ~ :global(*)) > :nth-child(n)  {
			grid-column: auto;
			grid-row: 1 / span 1;
			height: fit-content;
			text-wrap: nowrap;
			width: 100%;
			/* background-color: rgb(222, 135, 135); */
		}
	}

	:global(footer){
		position: relative;
		grid-row: footer;
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: subgrid;
		
		container-type: inline-size;
		container-name: footer;
	}

	/* media query for mobile view */
	@media (-webkit-min-device-pixel-ratio: 3) and (display-mode: standalone),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) and (display-mode: standalone),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) 
		{

		:root{
			--mobile: 1;
			--body-padding: 5%;
		}

		:global(body){
			overflow: hidden;
			max-height:100svh;
		}

		:global(.body-container){
			/* there is an issue where the layout break in firefox */
			/* the if ismobile is not on the layout should stay a grid but it sometimes becomes a flex layout  */
			display: flex !important;
			flex-direction: column;
			min-height: revert;
			min-height: 100%;
			max-height: 100%;
			overflow: hidden;
		}

		:global(header){
			--body-padding: 5%  !important ;
		
			flex: 0 1 auto;
			display: grid;
			grid-template-columns: var(--grid--mobile-collums);
			grid-template-rows: 1fr;
			align-content: start;
			will-change: transform, height, background-color, box-shadow, border-radius,position;
			background-color: var(--primary-green-500);
			height: clamp(50px, 100%, var(--header-height));
			position: absolute;
			top: 0;
			inset-inline: 0;
			padding-top: env(safe-area-inset-top);
			/* transform: translate3d(0,0,0); */
			z-index: 100;

		}
				
		:global(main){
			flex: 2 1 100svh;
			display: grid;
			grid-template-columns: var(--grid--mobile-collums) !important;
			max-height: 100%;
			overflow-y: scroll;
			padding-top: calc(var(--header-height) );
			margin-bottom: -1rem;
			z-index: 1;
			/* padding-bottom: calc(5rem + env(safe-area-inset-bottom)); */
			/* background-color: rgb(61, 112, 153);
			background-color: rgb(200, 224, 124);
			background-color: rgb(224, 124, 224); */
			
			&.noHeaderPage{
				padding-top: 0 ;
			}

			/* essential cascading layout styling */
			/* needs to be simplified */
			&:nth-child(n) > :is(:global(*)) {
				grid-column: content ;
				grid-row: revert;
				
				min-height: 100% ;
				max-height: fit-content;
				max-height: calc(100svh - var(--header-height) - var(--footer-height) - env(safe-area-inset-bottom));
				height: fit-content;
				
				display: grid;
				grid-template-columns: subgrid;
				grid-template-rows: auto;
				overflow-x: clip;
				z-index: 0;
				/* background-color:  rgb(162, 255, 0); */
			}

			&.noHeaderPage > :is(:global(*)) {max-height: calc(100svh - var(--footer-height) - env(safe-area-inset-bottom));}
			&.noFooterPage > :is(:global(*)) {max-height: calc(100svh + var(--footer-height) );
				height: 100svh ;
			}

			&:has(.noHeaderPage,.noFooterPage) {
				height: 100dvh;
				max-height: 100dvh;
				margin-bottom: 0;
				margin: 0;
			}

			&:nth-of-type(1) {
				grid-column: content ;
				overflow-y: scroll;
				/* background-color:  rgb(55, 0, 255); */
			}

			&:nth-child(n) > .home-wrapper{
				grid-column: content ;
			}
		}
				
		/* footer styling for when the --mobile property is = 1 */
		:global(footer){
			--_nav-radius: clamp(8px,8px,8pc);
			flex: 0 1 auto;
			background-color: var(--primary-green-500);
			grid-template-columns: var(--grid--mobile-collums);
			/* test this one last time in iteration 2 */
			/* grid-template-rows: 1fr .3fr; */

			position: relative;
			bottom: -1px;
			right: 0;
			left: 0;
			width: 100lvw;
			height: clamp(50px, 12dvh, var(--footer-height));
			border-radius: var(--_nav-radius) var(--_nav-radius) 0 0;
			transform: translate3d(0,0,0);
			padding-bottom: env(safe-area-inset-bottom);
			z-index: 100;
		}

		:global(body.android-device){
			--footer-height: calc(65px + var(--safe-area-inset-bottom));
		}
	}
</style>
