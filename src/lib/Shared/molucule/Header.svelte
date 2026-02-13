<script>
	import {goto} from '$app/navigation';
	import {fade,fly} from 'svelte/transition';

	import {Logo,Balance_M} from '$lib'
	import {current,isMobile,menuOpen} from '$lib/store.js'

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let {data} = $props();	
	let {isAuthenticated,firstLoad} = data;
	// let onMobile = $derived($isMobile == true || $isMobile == 1 || $isMobile == '1'|| $isMobile == 'true');
	let onMobile = $state();
	// let isDesktop = $derived($isMobile == false || $isMobile == 0 || $isMobile == '0'|| $isMobile == 'false');
	let isDesktop = $state();
	let notOnLogin = $state(false);

	function readyCheck(){
		if (document.readyState === 'complete') {
			onMobile = $isMobile == true || $isMobile == 1 || $isMobile == '1'|| $isMobile == 'true';
			isDesktop = $isMobile == false || $isMobile == 0 || $isMobile == '0'|| $isMobile == 'false';
		} else {
			console.info('waiting for pageload');
		}
	}
	
	function iconTask (){
        if ($current === 'home') {
			// Activating search
        } else if ($current === 'gift' || $current === 'gift-success' || $current === 'request' || $current === 'transactions History' ) {
            history.back();
		} else {
            goto('/', { replaceState: true })
		}
	}

	function toggleMenu(){
		menuOpen.set(!$menuOpen);
	}

	$effect(() => {
		notOnLogin = $current == 'login'? false : true;

		readyCheck();
		window.addEventListener('load', readyCheck);
	});

	onMount(() => {
		afterNavigate(() => {
			readyCheck();
		});
	});
	
	
</script>

{#snippet desktopRoutes()}
	<li><a href="/">home</a></li>
	<li><a href="/gift" rel="noopener">Gift</a></li>
	<li><a href="/how-it-works">how it works</a></li>
	<li><a href="/learn-more">learn more</a></li>
{/snippet}

{#snippet desktopNav()}
	<nav class="logo">
		<h1>
			<Logo name={true}/>
		</h1>
	</nav>
	<nav class="menu" style="{!isAuthenticated ? 'display: none;' : ''}" in:fade={isAuthenticated ? { duration: 300, delay: 100 } : null} >
		<menu>
			{@render desktopRoutes()}
		</menu>
	</nav>
	<nav class="profile">
		<button onclick={toggleMenu}>
			<img src="/generic.png" alt="generic person">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M8.00903 6.5C8.00903 4.294 9.80303 2.5 12.009 2.5C14.215 2.5 16.009 4.294 16.009 6.5C16.009 8.706 14.215 10.5 12.009 10.5C9.80303 10.5 8.00903 8.706 8.00903 6.5ZM14 12.5H10C5.94 12.5 4.5 15.473 4.5 18.019C4.5 20.296 5.71105 21.5 8.00305 21.5H15.9969C18.2889 21.5 19.5 20.296 19.5 18.019C19.5 15.473 18.06 12.5 14 12.5Z" fill="#121212"/>
			</svg>
		</button>
	</nav>
{/snippet}

{#snippet mobileHeadNav()}
	<section class="mobile-header" >
		<!-- no header for specific pages -->
		{#if $current === 'gift' || $current === 'gift-success' || $current === 'request' || $current === 'request-success' }
			<nav class="goBack">
				<button onclick={iconTask}>
					<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
					</svg>
				</button>
			</nav>
		{:else}
			<!-- goback and search button -->
			<nav class="goBack othr">
				<button onclick={iconTask}>
				{#if $current === 'home'}
					<svg class="search-icon" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="m19.53 18.47-3.841-3.841A8.705 8.705 0 0 0 17.75 9C17.75 4.175 13.825.25 9 .25S.25 4.175.25 9 4.175 17.75 9 17.75a8.705 8.705 0 0 0 5.629-2.061l3.841 3.841a.748.748 0 0 0 1.06 0 .749.749 0 0 0 0-1.06ZM1.75 9c0-3.998 3.252-7.25 7.25-7.25S16.25 5.002 16.25 9 12.998 16.25 9 16.25 1.75 12.998 1.75 9Z" fill="white"/>
					</svg>
				{:else}
					<svg class="goBack-icon" width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
					</svg>
				{/if}
				</button>
			</nav>
			<!-- page title -->
			<nav class="pageTitle">
				{#if $current !== 'home'}
					<h2>
						{$current}
					</h2>
				{/if}
			</nav>
			<!-- profile menu -->
			<nav class="profile">
				<a href="/profile">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.00903 6.5C8.00903 4.294 9.80303 2.5 12.009 2.5C14.215 2.5 16.009 4.294 16.009 6.5C16.009 8.706 14.215 10.5 12.009 10.5C9.80303 10.5 8.00903 8.706 8.00903 6.5ZM14 12.5H10C5.94 12.5 4.5 15.473 4.5 18.019C4.5 20.296 5.71105 21.5 8.00305 21.5H15.9969C18.2889 21.5 19.5 20.296 19.5 18.019C19.5 15.473 18.06 12.5 14 12.5Z" fill="#121212"/>
					</svg>
				</a>
			</nav>
		{/if}
	</section>
{/snippet}

<div class="header">
	{#if onMobile }
		{@render mobileHeadNav()}
	{/if}
	{#if isDesktop}
		{@render desktopNav()}
	{/if}
</div>

{#if $current === 'home' && $isMobile}
	<section class="home-intro-section" in:fly={firstLoad ? {y:25, duration:500,opacity:0.5} : null}>
		<Balance_M {data}/>
	</section>
{/if}

<style>
	:root{
		--not-on-login: 'true';
		transition-behavior: allow-discrete;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		height: var(--header-height);
		max-height: 150px !important ;
		min-height: 50px;
		width: 100%;
		gap: 1%;
		border-bottom: solid 2px color-mix(in hsl, var(--grey-400), white 80%);
		padding-inline: var(--body-padding);
	}

	nav {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 1rem;
	}

	nav.logo{
		flex: 0 1 fit-content;
	}

	/* desktop navigation */
	nav.menu{
		display: flex;
		flex: 1 1 fit-content ;
		justify-content: end;
		
		@container (width < 730px) or style(--not-on-login: 1) {
			display: none;
		}
	}

	nav menu {
		display: inline-flex;
		min-width: fit-content;
		height: fit-content;
		
		li{
			position: relative;
			display: flex;
			flex-wrap: nowrap;
			padding-inline: 1.5vw;
			transition: all 0.3s ease;
		}

		& li :is(a,button){
			font-size: 1.5rem;
			text-transform: capitalize;
			color: var(--primary-green-500);
			text-wrap-mode: nowrap;
			word-wrap: normal;
			width: 100%;
		}

		& li::after{
			content: '';
			position: absolute;
			inset-inline: 9px;
			bottom: -2px;
			top: auto;
			height: 2px;
			width: 0px;
			background-color: var(--primary-green-500);
		}

		& li:hover::after{
			width: calc(100% - 18px);
			transition: all 0.5s ease;
		}

		& li:not(:hover)::after{
			width: 0px;
			transition: all 0.3s ease;
		}
	}

	.profile a{
		border-radius: 50%;
		width: 32px;
		height: 32px;
	}

	.profile button{
		border-radius: 50%;
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--primary-green-500);
	}

	.profile img{
		width: clamp(100%, 100%, 65px);
		aspect-ratio: 1;
	}

	.profile:has(svg) img{
		display: none;
	}

	.profile:has(svg) :is(a,button){
		width: clamp(29px,5vw,2.2rem);
		height: auto;
		aspect-ratio: 1;
		outline: solid rgb(255, 255, 255);
		outline-width: 2px;
		display: grid;
		place-content: center;
		background-color: var(--primary-darkgreen-550);
		background-color: var(--off-white);
		transition: all 0.2s ease;
	}

	.profile:has(svg) button{
		outline: solid var(--primary-green-500);
		outline-width: 2px;

		&:hover{
			background-color: var(--primary-darkgreen-550);

			svg path{stroke-width: 2px ;}
		}
	}

	:global(body:has(.dropdown-menu)) .profile:has(svg) button{
		background-color: var(--primary-darkgreen-550);

		svg path{
			stroke: var(--primary-darkgreen-550);
			fill: var(--off-white);
		}
	}

	.profile svg{
		width: clamp(20px,4vw,1.5rem);
		height: auto;
		aspect-ratio: 1;

		path{
			/* stroke: var(--primary-darkgreen-550); */
			stroke: var(--off-white);
			fill: var(--off-white);
			fill: var(--primary-darkgreen-550);
		}
	}

	@media 
		(-moz-min-device-pixel-ratio: 3),	
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{
		:root{
			--cut-off-height: 85%;
		}

		.header{
			grid-column: 1/-1;
			grid-row: 1/-1 ;
			border: none;
			outline: none;
		}

		.header .mobile-header{
			display: grid;
			grid-template-columns: 1fr 5fr 1fr;
			grid-template-rows: 1fr;
			width: 100%;
			height: 100%;
			border-bottom: none;
		}

		.goBack{
			display: flex;
			align-items: center;
			justify-content: start;
			padding-inline: 1rem;
			z-index: 11;
		}
		
		.goBack button{
			display: grid;
			place-content: start;
			background: transparent;			
			border: none;
			border-radius: 8px;
			cursor: pointer;

			svg path{
				stroke: var(--off-white);
				fill: var(--off-white);
			}

			.search-icon{
				opacity: 0.3;
			}	
		}

		nav:nth-of-type(2).pageTitle{
			display: flex;
			align-items: center;
			justify-content:center;
		}

		.pageTitle h2{
			font-size: clamp(1.4rem, 1vw, 1.8rem);
			font-weight: 300;
			text-transform: capitalize;
			color: var(--off-white);
			text-align: center;
			line-height: 120%;
			width: 100%;
			height: auto;
			word-wrap: none;
			text-wrap:none ;
			text-wrap-mode:nowrap ;
		}

		.profile{
			display: flex;
			align-items: center;
			justify-content: end;
			padding-inline: 1rem;
			z-index: 11;
		}

		:global(html:has(.home-wrapper) ){
			--body-padding: 0;

			.header{
				padding-inline: 0;
			}
			/* Background Swirly Image decoration */
			:global(header::after){
				--_background-cut-off: var(--cut-off-height);
				content: '';
				position: absolute;
				top: 0;
				inset-inline: 0;
				min-height: calc(var(--header-intro-height) + var(--header-height));
				background: 
				url('/home-page/homepage-intro-deco.png') no-repeat center clamp(-12vh,-3vh,0px) / contain,
				linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off));
				mask-image:
				linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off)) ;
				background-repeat: no-repeat;
				background-size: cover;
				overflow: clip;
			}

			.home-intro-section{
				position: fixed;
				top: calc(var(--header-height));
				inset-inline: 0;
				
				display: flex;
				flex-direction: column;
				align-items: center;
				align-self: center;
				justify-content: space-between;
				height: 100%;
				max-height: calc(var(--header-intro-height) );
				z-index: 10;
				text-align: center;
			}
		}
		

	}
</style>
	