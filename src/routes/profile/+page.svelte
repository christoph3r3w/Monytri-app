<script>
	import {current} from '$lib/store.js';
	import {InProgress_S} from '$lib';
	import {user, isAuthenticated} from '$lib/user';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let userName = $derived($user?.name || $user?.email || 'Guest')
	const logout = async () => {
		await user.logout();
	};
</script>

{#if !$user}
	<InProgress_S />
{:else}
<section class="profile-container">
	<img src="generic.png" alt="generic." width="50" height="50">
	<h1>Profile of {userName}</h1>
	<p>This page is under construction. Please check back later.</p>
	<button onclick={goto('/')}>Go home</button>
	<button onclick={logout}>Logout</button>

</section>
 {/if}

<style>
	.profile-container {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		height: calc(100cqh - var(--header-height) + 10px);
		max-height: calc(100dvh - var(--footer-height) ); ;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background:var(--primary-lightgreen-500) ;
	}

	.profile-container h1 {
		font-size: 2em;
		margin-bottom: 10px;
	}

	.profile-container p {
		font-size: 1.2em;
	}

	.profile-container button {
		font-size: 1.5em;
		padding: 10px 20px;
		background-color: var(--primary-purple-400);
		color: var(--general-text-color);
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>