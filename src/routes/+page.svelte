<script>
	import {Balance_M,HomeArticles_M,Logo } from '$lib'
	import {current,isMobile,firstVisit} from '$lib/store.js';
	import { goto } from '$app/navigation';
	import { onMount,tick } from 'svelte';

	let {data} = $props();
	let {blogs,podcasts,user,device,isAuthenticated,dev} = $derived(data);	
	let popup;

	onMount(() => {
		if (device.isMobile === false) {
			if ($firstVisit !== true) return;
			if (dev) return;
				setTimeout(() => {
					popup.showModal();
					firstVisit.set(false);
			}, 2000);
		}
	});

	$effect(() => {
		if ($isMobile) {
			popup?.close();
		};
	});
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>

<section class="home-wrapper">

	{#key $isMobile}
		{#if $isMobile}	
			{#await blogs then blogs}
				<HomeArticles_M {blogs} {podcasts}/>	
			{:catch error}
				<p>Error loading blogs: {error.message}</p>
			{/await}
		{:else}
			<div class="button-conatiner-dev">
			</div>
			<div class="button-conatiner-dev">
				{#if !isAuthenticated }
					<button onclick={() => goto("/education")}>education</button>
					<button onclick={() => goto("/share")}>share</button>
					<button onclick={() => goto("/install")}>install app</button>
				{:else}
					<button command="show-modal" commandfor="popup">Mobile app</button>
					<button onclick={() => goto("/education")}>education</button>
					<button onclick={() => goto("/stock-overview")}>Stock overview</button>
					<button onclick={() => goto("/gift")}>send a gift</button>
					<button onclick={() => goto("/transactions")}>Transactions</button>
					<button data='util' onclick={() => goto("/install")}>install app</button>
					<button data='util' onclick={() => goto("/share")}>share</button>
					{#if dev}
						<button data='util' onclick={() => goto("/request")}>request</button>
						<button data='util' onclick={() => goto("/settings")}>settings</button>
						<button data='util' onclick={() => goto("/inbox")}>inbox</button>
						<button data='util' onclick={() => goto("/learn-more")}>learn more</button>
						<button data='util' onclick={() => goto("/gift-success")}>Gift success</button>
					{/if}
					<form action="/logout" method="post" >
						<button type="submit">Logout</button>
					</form>
				{/if}

			</div>
			<Logo name={false} />
		{/if}
	{/key}

	<div class="analitycs" style="display: {dev ? 'block' : 'none'}">
		<p>
		Platform: {device.platform}<br>
		Device: { device.isMobile ? 'Mobile' : 'Desktop' }
		</p>
	
		{#if device.platform === 'iOS' && device.isMobile}
			<p>This is an iPhone or iPad.</p>
		{:else if device.platform === 'Android' && device.isMobile}
			<p>This is an Android phone or tablet.</p>
		{/if}
		<p>Current user: {user?.email || 'No user logged in'}</p>
	</div>

	<dialog  id="popup" class="popup" bind:this={popup}>
		<p>For the best experience, view this MVP on a mobile device.</p>
		<div class="button-conatiner-dev">
			<button class="share-btn" onclick={() => goto("/share")}>scan QR code</button>
			<button id="dismiss-btn" commandfor="popup" command="close">Continue on {device.platform}</button>
		</div>
	</dialog>
</section>

<style>

	.home-wrapper{
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		min-height: calc(100cqh - var(--header-height));
		max-height: calc(120dvh - var(--footer-height)) ;
		padding-bottom: calc(var(--footer-height) + env(safe-area-inset-bottom));
		z-index: 2;
	}

	.button-conatiner-dev{
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		width: fit-content;
		height: fit-content;
		margin-block: 2rem 2rem;
		margin-inline: auto;

		&:nth-of-type(1){
			flex-flow: column nowrap;
			margin-top: 15%;
		}

		&:nth-last-of-type(1){
			flex-flow: row wrap;
			margin-bottom: 5rem;
		}
	}
	
	.button-conatiner-dev button {
		font-size: 2rem;
		border: solid 2px var(--primary-purple-400) ;
		border-radius: 50px;
		padding: 1rem 2rem;
		transition: background-color 0.3s ease-out, color 0.2s ease-in-out;
		backdrop-filter: blur(5px);

		&::first-letter {
			text-transform: capitalize;
		}

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: var(--primary-purple-500,var(--general-text-color));
			color: var(--general-text-color-invert);
		}
	}

	[action="/logout"] button {
		--_c: var(--primary-red-500);
		transition: all 0.2s ease;
		&:is(:hover,:focus-within,:active) {
			border-color: var(--_c);
			background-color: transparent;
			color: var(--_c,var(--general-text-color));
		}
	}

	button[data='util'] {
		--_c: var(--primary-darkgreen-550);
		transition: all 0.2s ease;
		&:is(:hover,:focus-within,:active) {
			border-color: var(--_c);
			background-color: transparent;
			color: color-mix(in srgb, var(--_c) 50%, var(--general-text-color));
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
	}

	:global(.home-wrapper .button-conatiner-dev + .logo img){
		width: clamp(1rem,5rem,3rem);
		height: auto;
		aspect-ratio: 1/1;
	}

	.analitycs{
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 1rem;
		font-size: 0.75rem;
		background-color: var(--general-background-color-secondary);
		color: var(--general-text-color-secondary);
		border-top-right-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		z-index: 100;
	}

	#popup{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 2rem;
		height: 300px;
		gap: 2rem;
		min-width: fit-content;
		background-color: var(--primary-green-500);
		border-radius: clamp(8px,3vw,15px);
		border: solid 2px var(--general-background-color-secondary);
		&[open]{
			display: flex;
			flex-flow: column nowrap;
		}

		&::backdrop{
			background-color: color-mix(in srgb, var(--primary-green-500) 20%, transparent);
			backdrop-filter: blur(5px);
		}
	}

	#popup p{
		font-size: clamp(1.25rem, 2.5vw, 1.5rem);
		text-align: center;
		width: 40ch;
		height: fit-content;
		line-height: 1.4;
		align-self: center;
	}

	#popup .button-conatiner-dev{
		flex-flow: row wrap;
		justify-content: space-around;
		align-items: center;
		height: 100%;
		width: 100%;
		gap: .5rem;
		margin:0;
	}

	#popup .button-conatiner-dev button{
		font-size: clamp(1rem, 2.5vw, 1.4rem);
	}

	#popup .button-conatiner-dev button.share-btn{
		background-color:var(--general-background-color-secondary);
		color: var(--general-text-color);
		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: var(--general-text-color-invert);
		}
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
				min-height: calc(101cqh - var(--header-height));
				max-height: unset;
				padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom));
			}

			:global(header){
				--body-padding: 5% ;
				padding-inline: var(--body-padding) ;
				z-index: 10;
				overflow: visible;
				height: var(--header-intro-height);
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
			
			.button-conatiner-dev,.analitycs,:global(.home-wrapper .button-conatiner-dev + .logo) {
			display: none;
			}
		}	
	}

	@media 
		(-webkit-min-device-pixel-ratio: 3) and (display-mode: standalone),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) and (display-mode: standalone),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) 
		{
			:global(body:has(.home-wrapper) main){
				contain:content layout strict;
				overscroll-behavior: contain;
			}
		}

</style>