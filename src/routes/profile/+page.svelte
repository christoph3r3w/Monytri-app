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
<section class="profile-container">

