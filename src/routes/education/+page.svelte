<script>
	import {current} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {PageStepContainer,EduArticles} from '$lib';
	import {goto} from '$app/navigation';
	import {onMount} from 'svelte';
	import PageStepContainerS from '$lib/Shared/molucule/PageStepContainer_S.svelte';
	
	let search = $state('');
	let {data,onSearchQueryUpdate} = $props();
	let {blogs,podcasts,videos} = data?.data;
	
	function updateSearchQuery(newQuery) {
		search = newQuery;
		formData.searchQuery = newQuery;
	}

</script>	
<!-- Fixed overflow issue in mobile step container. -->
{#snippet a()}
	<EduArticles {blogs} {podcasts} {videos} />
{/snippet}

<article class="edu-container">
	<PageStepContainer
		stepType=''
		headerName={$device.isMobile ? '' : 'Education Articles'}
		subtext={$device.isMobile ? '' : 'Learn more about personal finance, investing, and money management through our curated articles, podcasts, and videos.'}
		showLeftContent={true}
		showRightContent={true}
		rightContent={a}
		leftContent={$device.isMobile? null : null}
		searchQuery="Grow with Monytri"
		searchValue={search}
		onSearchQueryUpdate={updateSearchQuery}
	/>
</article>

<style>
	.edu-container{
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 
		subgrid 
		[left-start] repeat(5,[mid-left]) [left-end right-start] repeat(5,[mid-right]) [right-end];
		height: calc(100cqh - var(--header-height) );
		background-color: var(--general-background-color);
		/* grid-template-rows: minmax(min-content,4px) 1fr 1fr 3fr; */
		/* max-height: calc(100cqh - var(--footer-height));  */

		container-type:normal;
		container-name:edu-articles;
	}

	@media (-webkit-min-device-pixel-ratio: 3), 
		screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait), 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {

		:global(.edu-container > .page-container){
			height : calc(100cqh - var(--header-height) - var(--footer-height) - var(--progressbar-height) - 3rem);
			padding-bottom:var(--progressbar-height);
		}

		:global(.edu-container > .mobile-step){
			height : calc(100cqh - var(--footer-height) - var(--progressbar-height) - 3rem);
		}
	}

</style>