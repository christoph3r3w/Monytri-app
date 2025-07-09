<script>
	import {current} from '$lib/store.js';
	import {InProgress_S} from '$lib';
</script>

<svelte:head>
	<title>transactions</title>
</svelte:head>
<h1>
	{$current}
</h1>
<InProgress_S />

<a href="/" style="font-size: 3rem;">go home</a>
<span></span>
<a href="/gift" rel="noopener" style="font-size: 3rem;">send a gift</a>