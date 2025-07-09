<script>
	import {current} from '$lib/store.js';
	import {InProgress_S} from '$lib';
	import {onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// external redirect on mount in new window
		window.open(
			'https://monytri.com/are-you-saving-enough-discover-how-your-finances-stack-up-in-the-netherlands/',
			'_blank',
			'noopener,noreferrer'
		);
		});
</script>

<svelte:head>
	<title>blog</title>
</svelte:head>

<InProgress_S />