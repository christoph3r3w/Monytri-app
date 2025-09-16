<script>
	import {current} from '$lib/store.js';
	import {InProgress_S} from '$lib';
	import {user,isAuthenticated} from '$lib/user';
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {device} from '$lib/Device.js';
	import {Logo} from '$lib';
	
	let userName = $derived($user?.name || $user?.email || 'Guest')
	const logout = async () => {
		await user.logout();
		goto('/login');
	};

</script>

	<section class="profile-container">
		{#if $user}
			<img src="/generic.png" alt="generic." width="50" height="50">
			<h1>Profile of {userName}</h1>
			<p>This page is under construction. Please check back later.</p>
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
		{/if}
		<div class="button-conatiner-dev">
			<button onclick={logout}>Logout</button>
			<button onclick={goto("/share")}>share</button>
			<button onclick={goto("/install")}>install app</button>
			<button onclick={goto('/')}>Go home</button>
			<a href="https://github.com/christoph3r3w/Monytri-dev-pwa-v1/issues/new">report issues </a>
		</div>

		<Logo name={false} />
	</section>



<style>
	.profile-container {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		height: 100%;
		max-height: calc(100dvh - var(--footer-height)); 
		padding-bottom: var(--footer-height);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-inline: var(--body-padding);
	}

	.profile-container img{
		display: inline-block ;
		width: clamp(3rem,30vw,6rem);
		height: auto;
		margin-block: 1rem;
	}

	.profile-container > h1 {
		display: inline-block;
		font-size: 2em;
		margin-bottom: 10px;
	}

	.profile-container > p {
		font-size: 1.2em;
		margin-inline: var(--body-padding);
	}

	.button-conatiner-dev{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
		gap: 2rem;
		width: fit-content;
		height: fit-content;
		margin-block: 2%;
	}
	
	.button-conatiner-dev :is(a,button) {
		width: fit-content;
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

	:global(.profile-container .logo){
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: clamp(5px, fit-content, 2vw);
		height: fit-content;
		margin-inline: auto;
		user-select: none;
		cursor: none;
		pointer-events: none;
		flex: 1 1 fit-content;
	}

	:global(.profile-container .logo picture){
		width: clamp(1rem,5rem,3rem);
		flex: 1 1 fit-content;
		display: flex;
		justify-content: center;
		background-color: transparent;
	}
	
	:global(.profile-container .logo img){
		width: clamp(1rem,5rem,3rem);
		aspect-ratio: 1/1;
		height: fit-content;

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
	

	
</style>