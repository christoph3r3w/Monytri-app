<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S} from '$lib'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	$effect(() => {
		if ($current && !$isMobile) {
			goto('/error');
		} 	
	});

</script>

<InProgress_S />

<div class='settings-container'>
	<Menu></Menu>
</div>

<style>

	:global(html:has(.message-container) nav.dropdown-menu)  {
		display: none;
	}

	.settings-container {
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		max-height: calc(120dvh - var(--footer-height)) ;
		z-index: 5;
	}
</style>