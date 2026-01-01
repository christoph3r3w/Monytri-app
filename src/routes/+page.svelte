<script>
	import {Balance_M,HomeArticles_M,Logo } from '$lib'
	import {current} from '$lib/store.js';
	import { goto } from '$app/navigation';


	let {data} = $props();
	let {blogs,podcasts,user,device,isAuthenticated,dev} = data;
	// console.log(data);
	
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>

<section class="home-wrapper">
	<!-- Top section of the home page on mobile. -->
	<HomeArticles_M {blogs} {podcasts}/>	
	<div class="button-conatiner-dev">
			<button onclick={() => goto("/education")}>education</button>
			<button onclick={() => goto("/share")}>share</button>
			<button onclick={() => goto("/install")}>install app</button>
		{#if !isAuthenticated }
			<button onclick={() => goto("/login")}>login</button>
		{:else}
			<button onclick={() => goto("/transactions")}>Transactions</button>
			<button onclick={() => goto("/stock-overview")}>Stock overview</button>
			<button onclick={() => goto("/gift")}>send a gift</button>
			<form action="/logout" method="post" >
	 		    <button type="submit">Logout</button>
			</form>
		{/if}

	</div>
	<Logo name={false} />
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
	
	.button-conatiner-dev button {
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



</style>