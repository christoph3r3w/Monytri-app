<script>
	import {InProgress_S} from '$lib';
	import {current} from '$lib/store.js';
	import { onMount } from 'svelte';
	onMount(() => {
		window.open(
			'https://monytri.com/#howitworks',
			'_blank',
			'noopener,noreferrer'
		);
	});
</script>

<InProgress_S />
