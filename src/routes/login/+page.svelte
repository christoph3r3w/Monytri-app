<script>
	import {current,isMobile} from '$lib/store.js';
	import {Menu,InProgress_S,Login_F} from '$lib'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	let { data, form } = $props();
	let isAuthenticated = $derived(data?.isAuthenticated);
		
	let errorMessage = $state('');
	let isLoading = $state(false);

	let formData = $state({
		email: '',
		password: '',
		name: ''
	});
		
</script>

<section class="login-step-container">
	<Login_F 
		{formData}
		data={{ ...data, ...(form ?? {}) }}
	/>
</section>

<style>
	.login-step-container {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 
		subgrid 
		[left-start] repeat(5,[mid-left]) [left-end right-start] repeat(5,[mid-right]) [right-end];
		grid-template-rows: minmax(min-content,4px) 1fr 1fr 3fr;
		height: calc(100cqh - var(--header-height) + var(--progressbar-height) + 10px);
		max-height: calc(100dvh - var(--footer-height) + var(--progressbar-height)); 
		background-color: transparent;
		z-index: 1;

		container-type:normal;
		container-name: transfer-wizard;
	}

	:global(main:has(.login-step-container) .page-container){
		background-color: transparent;
	}

	:global(body main:has(.login-step-container) > svg path){
		fill: color-mix(in srgb, var(--general-background-color) 95%, var(--neutral-grey) );
		filter: blur(3px);
	}

	@media (width <= 930px) {

		:global(body main:has(.login-step-container)){
			padding-bottom: 0;
			padding-top: 0;
		}		
		:global(main:has(.login-step-container) .page-container){
			background-color: var(--general-background-color);
		}
		.login-step-container {
			min-height: 100svh;
			max-width: 100dvh;
			background-color: var(--white);	
		}
	}
</style>