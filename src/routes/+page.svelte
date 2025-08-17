<script>
	import { onMount } from 'svelte';
	import {Balance_M,HomeArticles_M } from '$lib'
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

<div class="home-wrapper">
	<!-- Top section of the home page on mobile. -->
	<HomeArticles_M/>	
	<div class="button-conatiner-dev">
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
			color: var(--general-text-color);
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
			
			div.button-conatiner-dev {
				position: relative;
				margin-inline: 5%;
				
				button:nth-last-of-type(n + 3){
					display: none;
				}
			}
		}
	}	



</style>