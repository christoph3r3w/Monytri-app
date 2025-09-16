	<script >
	import {current} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {PageStepContainer,Brokers,Calculator} from '$lib';
	import {goto} from '$app/navigation';
	import {onMount} from 'svelte';
	import {user} from '$lib/user.js';

	let {data} = $props();
	let {portfolio,usersBrokers,brokers,totalBalance,averageBalance} = data.data	

	const numberFormatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	function formatCurrency(value) {
		const num = Number(value);
		const safe = isNaN(num) ? 0 : num;
		return '€' + numberFormatter.format(safe);
	}	
</script>

{#snippet a()}
	<section class="portfolio-overview">
		<h2>Total Portfolio Value 
			<span>
				<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.28738 0.308103C8.37938 0.346103 8.46227 0.400968 8.53127 0.469968L15.5313 7.46997C15.6773 7.61597 15.7512 7.808 15.7512 8C15.7512 8.192 15.6783 8.38403 15.5313 8.53003C15.2383 8.82303 14.7632 8.82303 14.4702 8.53003L8.75027 2.81006L8.75027 19C8.75027 19.414 8.41427 19.75 8.00027 19.75C7.58627 19.75 7.25027 19.414 7.25027 19L7.25027 2.81103L1.5303 8.531C1.2373 8.824 0.762261 8.824 0.469261 8.531C0.176261 8.238 0.176261 7.76297 0.469261 7.46997L7.46926 0.469968C7.53826 0.400968 7.62116 0.346103 7.71316 0.308103C7.89716 0.232103 8.10338 0.232103 8.28738 0.308103Z" fill="#98C455"/>
				</svg>
			</span>
		</h2>
		<p class="portfolio-balance">{formatCurrency( portfolio.value || '0') }</p>
		<div class="portfolio-details">
			<span>
				<p>Profit/Loss</p>
				<p>{portfolio.profitLossPercentage}%</p>
			</span>
			<span>
				<p>Profit/Loss Value</p>
				<p>{formatCurrency(portfolio.profitLoss)}</p>
			</span>
		</div>
	</section>
	
	{#if !$device.isMobile}{@render b()}{/if}
{/snippet}

{#snippet b()}
	<section class="current-brokers">
		<h2>Current Brokers</h2>		
		<Brokers {formatCurrency} {usersBrokers} {brokers}/>
	</section>
{/snippet}

{#snippet c()}
	<section class="calculator-section">
		<h2>calculate investments growth</h2>
		<Calculator currentPortfolioValue={portfolio.value} />
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

.portfolio-overview{
	grid-column: left;
	grid-row: 1 / span 1;

	display: flex;
	flex-direction: column;
	align-self: center;
	width: 100%;
	min-height: 200px;
	border-radius: .5rem;
	padding-block: 3rem 2rem;
	padding-inline:3rem;
	margin-bottom: 5%;
	font-size: 1.25rem;

	background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 90% );
}

.portfolio-overview h2{
	color: var(--general-text-color);
	font-weight: 500;
	line-height: 25px;
	margin-bottom: 2%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}

.portfolio-balance{
	font-size: 2rem;
	font-weight: 500;
	line-height: 120%;
	text-align: center;
	text-decoration: underline 5% ;
	color: var(--black);
	margin-bottom: 3%;
}

.portfolio-details{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1rem;
	margin-block: 1rem 2rem;
}

.portfolio-details span{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	width: auto;
	height: 100%;
	gap: 0.5rem;
}

.portfolio-details span:nth-child(2) {
	align-items: end;
}

.portfolio-details span p{
	text-wrap:nowrap ;
}

.portfolio-details span p:first-child{
	font-weight: 500;
	line-height: 120%;
}

.portfolio-details span p:last-child{
	font-size: .825rem;
	font-weight: 500;
	line-height: 120%;
}

/* calculator section */

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

	.portfolio-overview{
		padding-block: 5%;
		padding-inline: 0;
		width: 100%;
		background-color: transparent;
		margin-bottom: 0;
		min-height: fit-content;
	}
	
}

</style>

