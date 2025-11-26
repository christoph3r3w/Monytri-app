	<script >
	import {current} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {PageStepContainer,Brokers,Calculator,PortfolioDetail} from '$lib';
	import {goto} from '$app/navigation';
	import {onMount} from 'svelte';
	import {user} from '$lib/user.js';

	let {data} = $props();
	let {portfolio,usersBrokers,totalBalance,averageBalance} = data?.data;	

	function formatCurrency(value) {
		const number = typeof value === 'string' ? parseFloat(value) : value;
		return new Intl.NumberFormat('en-IE', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(number);
	}
</script>

{#snippet a()}
	<PortfolioDetail {portfolio} {averageBalance} {formatCurrency} style={2}/>
	
	{#if !$device.isMobile}{@render b()}{/if}
{/snippet}

{#snippet b()}
	<section class="current-brokers">
		<h2>Current Brokers</h2>		
		<Brokers {formatCurrency} {usersBrokers}/>
	</section>
{/snippet}

{#snippet c()}
	<section class="calculator-section">
		<h2>calculate investments growth</h2>
		<Calculator currentPortfolioValue={portfolio?.value} />
	</section>
{/snippet}

{#snippet d()}
	{@render a()}
	{@render c()}
{/snippet}

<!-- You can use this calculator to simulate investments. -->
<article class="calculator-container">	
	<PageStepContainer
	stepType=''
	headerName={$device.isMobile? '' :' '}
	subtext=""
	showLeftContent={true}
	showRightContent={true}
	leftContent={$device.isMobile? d : a}
	rightContent={$device.isMobile? b : c}
	/>
</article>

<style>

/* Fix the overflow between the page container and the stock overview container. */
:global(.calculator-container > .page-container){
	--gap:10%;
	overflow-y: auto !important;
	max-height: unset !important;
	height: unset !important;
	height: fit-content;
}

:global(.calculator-container > .page-container .right-step){
	overflow-y:auto ;
	height: calc(100cqh - var(--footer-height) - var(--header-height) );
}

.calculator-container {
	position: relative;
	grid-column: 1 / -1;
	grid-row: 1 / span 1;
	width: 100%;
	display: grid;
	grid-template-columns: 
	subgrid 
	[left-start] repeat(5,[mid-left]) [left-end right-start] repeat(5,[mid-right]) [right-end];
	grid-template-rows: minmax(min-content,4px) 1fr 1fr 3fr;
	height: calc(100cqh - var(--header-height) + var(--progressbar-height) + 10px);
	max-height: calc(100lvh + var(--footer-height) + var(--progressbar-height)); 
	max-height: 300lvh ;
	background-color: var(--general-background-color);
	overflow: clip;

	container-type:normal;
	container-name: calculator-container;
}

/* calculator section */

.calculator-section{
	width: 100% ;
	height: calc( 100% -  var(--footer-height));
} 

.calculator-section h2{
	color: var(--general-text-color);
	font-weight: 500;
	line-height: 25px;
	margin-bottom: 2%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	text-transform: capitalize;
}

/* brokers list  */
section:is(.current-brokers){
	grid-column: right;
	grid-row: 1 / span 3;
	
	display: flex;
	flex-direction: column;
	color: var(--general-text-color);
	margin-bottom: 1.5rem;
}

section:is(.current-brokers) h2{
	color: var(--general-text-color);
	line-height: 125%;
	margin-bottom: 3%;
	font-size: 1.25rem;
}

.current-brokers h2{
	font-weight: 400;
	text-align: center;
}
	
@media (-webkit-min-device-pixel-ratio: 3), 
screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait), 
screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
	:global(.calculator-container > .page-container){
		overflow: hidden !important;
		max-height: unset !important;
		height: unset !important;
	}

	:global(.calculator-container .mobile-step){
		max-height: fit-content ;
		height: 200vh ;
		overflow: auto;
	}

	:global(.calculator-container > .page-container .right-step){
		overflow-y:visible ;
		height: 100%;
	}

	.calculator-section{
		width: 100% ;
		height: auto;
	} 
}

</style>

