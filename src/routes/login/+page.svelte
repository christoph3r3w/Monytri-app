<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,LoginStep} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import {user,isAuthenticated} from '$lib/user';
	});
</script>

<svelte:head>
	<title>profile</title>
</svelte:head>
<h1>
	profile
</h1>

<a href="/" style="font-size: 3rem;">go home</a>