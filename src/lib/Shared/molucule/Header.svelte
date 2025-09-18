<script>
	import {goto} from '$app/navigation';
	import {Logo,Balance_M} from '$lib'
	import {current,isMobile,menuOpen} from '$lib/store.js'
	import {isAuthenticated} from '$lib/user';

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let notOnLogin = $state(false);
	$effect(() => {
		notOnLogin = $current == 'login'? false : true;
	});
	
	function iconTask (){
        if ($current === 'home') {
            // On homepage, activate search functionality
			// console.log('Activating search');
        } else if ($current === 'gift' || $current === 'gift-success') {
            history.back();
		} else {
            history.back();
		}
	}

	function toggleMenu(){
		menuOpen.set(!$menuOpen);
		// console.log('menu open is',$menuOpen);
	}
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
	<nav class="menu" style="{!$isAuthenticated ? 'display: none;' : ''}" >
		<menu>
			{@render desktopRoutes()}
		</menu>
	</nav>
	<nav class="profile">
		<button onclick={toggleMenu}><img src="/generic.png" alt="generic person"></button>
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
					<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="m19.53 18.47-3.841-3.841A8.705 8.705 0 0 0 17.75 9C17.75 4.175 13.825.25 9 .25S.25 4.175.25 9 4.175 17.75 9 17.75a8.705 8.705 0 0 0 5.629-2.061l3.841 3.841a.748.748 0 0 0 1.06 0 .749.749 0 0 0 0-1.06ZM1.75 9c0-3.998 3.252-7.25 7.25-7.25S16.25 5.002 16.25 9 12.998 16.25 9 16.25 1.75 12.998 1.75 9Z" fill="white"/>
					</svg>
				{:else}
					<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
				<a href="/profile"><img src="/generic.png" alt="generic person"></a>
			</nav>
		{/if}
	</section>
{/snippet}

<div class="header">
	{#if $isMobile == true || $isMobile == 1 || $isMobile == '1'|| $isMobile == 'true'}
		{@render mobileHeadNav()}
	{:else}
		{@render desktopNav()}
	{/if}
</div>
{#if $current === 'home' && $isMobile}
	<section class="home-intro-section">
		<Balance_M/>
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

		@container style(--not-on-login:1) {
			outline: solid red;
		}
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
			display: flex;
			flex-wrap: nowrap;
			padding-inline: 1.5vw;
		}

		& li :is(a,button){
			font-size: 1.5rem;
			text-transform: capitalize;
			color: var(--primary-green-500);
			text-wrap-mode: nowrap;
			word-wrap: normal;
			width: 100%;
		}

		& li:hover :is(a,button){
			text-decoration: underline !important ;
		}
	}

	.profile a{
		border-radius: 50%;
		width: 32px;
		height: 32px;
	}

	.profile img{
		width: clamp(100%, 100%, 65px);
		aspect-ratio: 1;
	}

	@media 
		(-moz-min-device-pixel-ratio: 3),	
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{

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
				--_background-cut-off: 85%;
				content: '';
				position: absolute;
				top: 0;
				inset-inline: 0;
				min-height: calc(var(--header-intro-height) + var(--header-height));
				background: 
				url('/home-page/homepage-intro-deco.png') no-repeat center clamp(-12vh,-3vh,0px) / contain,
				linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off))
				;
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
				min-height: var(--header-intro-height);
				z-index: 10;
				text-align: center;
			}
		
			.button-container{
				position: relative;
				display:flex;
				flex-direction: row;
				align-items: center;
				width: clamp(50%,68.4%,248px);
				min-width: fit-content;
				height: 84px;
				justify-self: baseline;
				border-radius: 8px;
				background-color: white;
				background-color: var(--general-background-color);
				box-shadow: 0px 4px 10px 0px #5858581A ;
			}

			/* check if this is needed */
			/* .button-container::before{
				content: '';
				width: 1px;
				height: auto;
				position: absolute;
				inset-block: 30%;
				left: 50%;
				z-index: 1;
				border-radius: inherit;
				background-color: var(--neutral-grey);
				outline: solid 1px red;
			} */

			.button-container button{
				flex: 1 1 60%;
				display: flex;
				height: 100%;
				flex-direction: column;
				align-items: center;
				justify-content:center;
				color: var(--general-text-color);
				border-radius: 8px;
				padding: 1% 2%;

				svg{
					width: 2.5rem;
					height: 2.5rem;
					margin-bottom: 1%;
				}
			}
		}
		

	}
</style>
	