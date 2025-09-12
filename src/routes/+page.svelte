<script>
	import { onMount } from 'svelte';
	import {Balance_M,HomeArticles_M,Logo } from '$lib'
	import {current,anAcount} from '$lib/store.js';
	import { device } from '$lib/Device.js';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { user,isAuthenticated } from '$lib/user';

	function checkSignIn() {
		if (!$isAuthenticated) {
			goto('/login');
		}
	}
	onMount(() => {
		checkSignIn()
	});

	$effect(() => {
		checkSignIn()
	});

	const logout = async () => {
		await user.logout();
	};

</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>

<section class="home-wrapper">
	<!-- Top section of the home page on mobile. -->
	<HomeArticles_M/>	
	<div class="button-conatiner-dev">
		<button onclick={goto("/transactions")}>Transactions</button>
		<button onclick={goto("/gift")}>send a gift</button>
		<button onclick={goto("/request")} disabled>request a gift</button>
		<button onclick={goto("/share")}>share</button>
		<button onclick={goto("/install")}>install app</button>
		{#if !$isAuthenticated}
			<button onclick={goto("/login")}>login</button>
		{:else}
			<button onclick={logout}>Logout</button>
		{/if}

		<!-- <p>send feedback or issues here ⬇️</p>
		<a href="https://github.com/christoph3r3w/Monytri-dev-pwa-v1/issues/new">report issues </a> -->
	</div>
	<Logo name={false} />
	<div class="analitycs">
		<p>
		Platform: {$device.platform}<br>
		Device: { $device.isMobile ? 'Mobile' : 'Desktop' }
		</p>
	
		{#if $device.platform === 'iOS' && $device.isMobile}
			<p>This is an iPhone or iPad.</p>
		{:else if $device.platform === 'Android' && $device.isMobile}
			<p>This is an Android phone or tablet.</p>
		{/if}
		<p>Current user: {$user?.email || 'No user logged in'}</p>
	</div>
</section>

<style>
	.home-wrapper{
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		/* The minimum height is a little bit of a magic number because that seems to work for when adjusting the page. */
		min-height: calc(100cqh - var(--header-height));
		max-height: calc(120dvh - var(--footer-height)) ;
		padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom));
	}

	.button-conatiner-dev{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		width: fit-content;
		height: fit-content;
		margin-block: 20% 5rem;
		margin-inline: auto;
	}
	
	.button-conatiner-dev :is(a,button) {
		font-size: 2rem;
		border: solid 2px var(--primary-purple-400) ;
		border-radius: 50px;
		padding: 1rem 2rem;
		transition: background-color 0.3s ease-out, color 0.3s ease-in-out;

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: var(--general-text-color);
		}
	}

	:global(.home-intro-section,.home-articles){
		display: none;
	}

	:global(.home-wrapper .button-conatiner-dev + .logo){
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
		justify-content: center;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-inline: auto;
		user-select: none;
		cursor: none;
		pointer-events: none;
		flex: 1 1 fit-content;
		/* outline: solid 2px var(--primary-purple-400); */
	}

		:global(.home-wrapper .button-conatiner-dev + .logo img){
			width: clamp(1rem,5rem,3rem);
			height: auto;
			aspect-ratio: 1/1;

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

			:global(header){
				--_background-cut-off: 85%;
				--body-padding: 5% ;
				padding-inline: var(--body-padding) ;
				z-index: 10;
				overflow: visible;
				height: var(--header-intro-height);

				/* outline: solid red 5px !important;

				background: 
				url('/home-page/homepage-intro-deco.png') no-repeat center clamp(-12vh,-3vh,0px) / contain,
				linear-gradient(180deg, var(--primary-green-500));
				background-repeat: no-repeat;
				background-size: cover;
				mix-blend-mode:normal; */

			}
	
			:global(.home-wrapper){
				padding-top: var(--header-intro-height);
			}

			.button-conatiner-dev{
				display: flex;
				flex-direction: column;
				align-items: start;
				gap: 2rem;
				width: 100%;
				height: fit-content;
				margin-bottom: 5rem;
				transition: background-color 0.3ms ease-out, color 0.3s ease-in-out;

			}
			
			div.button-conatiner-dev {
				position: relative;
				margin-inline: 5%;
				
				button:nth-last-of-type(n + 3){
					display: none;
				}
			}
		}

		.analitycs{
			display: flex;
			flex-direction: column;
			
			gap: 1rem;
			width: 100%;
			height: fit-content;
			padding-inline: 5%;
			padding-bottom: 5rem;
			font-size: 1.2rem;
			color: var(--general-text-color);
		}
	}	



</style>