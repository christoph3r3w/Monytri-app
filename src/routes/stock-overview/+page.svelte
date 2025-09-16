	<script >
	import {current} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {PageStepContainer,Brokers,Announcements} from '$lib';
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
	<div class="button-container-calculator">
		<button onclick={goto('stock-overview/calculator')}>
			{#if $device.isMobile}
				<!-- <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M22.2432 14.269C22.2422 12.279 19.7102 10.746 16.2432 10.552V5.98999C16.2422 3.40699 12.8532 2.25 9.49316 2.25C6.13316 2.25 2.74416 3.40599 2.74316 5.98999V17.01C2.74316 19.593 6.13316 20.75 9.49316 20.75C9.84016 20.75 10.1962 20.718 10.5502 20.683C11.8442 21.406 13.6712 21.75 15.4932 21.75C18.8522 21.75 22.2432 20.593 22.2432 18.01V14.269C22.2432 14.27 22.2432 14.27 22.2432 14.269ZM20.7432 14.271C20.7432 15.329 18.4982 16.512 15.4932 16.512C12.4882 16.512 10.2432 15.329 10.2432 14.271C10.2432 13.883 10.5502 13.479 11.0812 13.122C11.0992 13.112 11.1132 13.098 11.1302 13.087C12.0542 12.487 13.6262 12.03 15.4932 12.03C18.4982 12.03 20.7432 13.213 20.7432 14.271ZM14.7432 9.53003C14.7432 9.98103 14.3472 10.358 13.9702 10.621C12.5792 10.786 11.3782 11.175 10.4772 11.723C10.1572 11.75 9.83514 11.77 9.49414 11.77C6.66614 11.77 4.24414 10.538 4.24414 9.53003V8.47803C5.54514 9.33003 7.52214 9.73199 9.49414 9.73199C11.4661 9.73199 13.4431 9.33003 14.7441 8.47803V9.53003H14.7432ZM4.24316 11.849C5.44616 12.663 7.21718 13.172 8.98218 13.256C8.83018 13.577 8.74316 13.915 8.74316 14.27C8.74316 14.27 8.74316 14.27 8.74316 14.271V15.479C6.25116 15.288 4.24316 14.189 4.24316 13.271V11.849ZM9.49316 3.75C12.0742 3.75 14.7432 4.58803 14.7432 5.99103C14.7432 7.44703 12.0382 8.23199 9.49316 8.23199C6.94816 8.23199 4.24316 7.44703 4.24316 5.99103C4.24316 4.58803 6.91216 3.75 9.49316 3.75ZM4.24316 17.01V15.589C5.39216 16.366 7.05716 16.865 8.74316 16.981V18.01C8.74316 18.465 8.85317 18.873 9.04517 19.241C6.61217 19.15 4.24316 18.331 4.24316 17.01ZM15.4932 20.25C13.8742 20.25 12.2212 19.92 11.2142 19.328C10.6152 18.976 10.2441 18.532 10.2441 18.01V16.676C11.4621 17.502 13.3281 18.012 15.4941 18.012C17.6601 18.012 19.5261 17.502 20.7441 16.676V18.01C20.7431 19.412 18.0742 20.25 15.4932 20.25Z" fill="#121212"/>
				</svg> -->

				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 3.25C3.932 3.25 2.25 4.932 2.25 7C2.25 9.068 3.932 10.75 6 10.75C8.068 10.75 9.75 9.068 9.75 7C9.75 4.932 8.068 3.25 6 3.25ZM6 9.25C4.759 9.25 3.75 8.241 3.75 7C3.75 5.759 4.759 4.75 6 4.75C7.241 4.75 8.25 5.759 8.25 7C8.25 8.241 7.241 9.25 6 9.25ZM18 13.25C15.932 13.25 14.25 14.932 14.25 17C14.25 19.068 15.932 20.75 18 20.75C20.068 20.75 21.75 19.068 21.75 17C21.75 14.932 20.068 13.25 18 13.25ZM18 19.25C16.759 19.25 15.75 18.241 15.75 17C15.75 15.759 16.759 14.75 18 14.75C19.241 14.75 20.25 15.759 20.25 17C20.25 18.241 19.241 19.25 18 19.25ZM15 7.75H21C21.414 7.75 21.75 7.414 21.75 7C21.75 6.586 21.414 6.25 21 6.25H15C14.586 6.25 14.25 6.586 14.25 7C14.25 7.414 14.586 7.75 15 7.75ZM9 16.25H3C2.586 16.25 2.25 16.586 2.25 17C2.25 17.414 2.586 17.75 3 17.75H9C9.414 17.75 9.75 17.414 9.75 17C9.75 16.586 9.414 16.25 9 16.25Z" fill="#121212"/>
				</svg>

			{:else}
				Open Stock Calculator
			{/if}
		</button>
	</div>
{/snippet}

{#snippet b()}
	<section class="current-brokers">
		<h2>Current Brokers</h2>
		
		<Brokers {formatCurrency} {usersBrokers} {brokers}/>
	</section>
{/snippet}

{#snippet c()}
	<section class="announcements recent-blogs">
		<h2>Announcements from our partners
			<span class="arrow-icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
				</svg>
			</span>
		</h2>

		<Announcements />
	</section>
{/snippet}

{#snippet d()}
	{@render b()}
	{@render c()}
{/snippet}
<article class="stockOverview-container">	
	<PageStepContainer
	stepType=''
	headerName={$device.isMobile? '' :'stock overview'}
	subtext=""
	showLeftContent={true}
	showRightContent={true}
	leftContent={a}
	rightContent={d}
	/>
</article>

<style>

/* Fix the overflow between the page container and the stock overview container. */
:global(.stockOverview-container > .page-container){
	--gap:10%;
	overflow-y: auto !important;
	max-height: unset !important;
	height: unset !important;
	height: fit-content;
}

:global(.stockOverview-container > .page-container .right-step){
	overflow-y:auto ;
}

.stockOverview-container {
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
	overflow: auto;

	container-type:normal;
	container-name: stockOverview-container;
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

.button-container-calculator{
	position: relative;
	grid-column: 1/-1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 3rem;
	height: 3rem;
	margin-bottom: 3%;
	
	container-type: inline-size;
}

.button-container-calculator button{
	position: relative;
	bottom: var(--body-padding);
	right:0;
	width:100%;
	padding: clamp(1rem,1vw,1rem);
	background-color: var(--primary-green-500);
	background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 50% );
	
	color: var(--white);
	color: var(--general-text-color);

	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 500;

		&:disabled {
			background-color: var(--white);
			color: var(--general-text-color);
			border-color: var(--primary-green-500);
			cursor: not-allowed;
		}

		&:is(:hover, :focus,:focus-within){
			background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 50% );
			background-color: var(--primary-green-500);

			transition: background-color 0.3s ease;
			color: var(--general-text-color);
			color: var(--white);

		}
}

/* brokers list  */

section:is(.current-brokers, .announcements){
	grid-column: right;
	grid-row: 1 / span 3;
	
	display: flex;
	flex-direction: column;
	color: var(--general-text-color);
	margin-bottom: 1.5rem;
}

section:is(.current-brokers, .announcements) h2{
	color: var(--general-text-color);
	line-height: 125%;
	margin-bottom: 3%;
	font-size: 1.25rem;
}

.current-brokers h2{
	font-weight: 400;
	text-align: center;
}

.announcements h2{
	font-weight: 400;
	text-wrap: nowrap;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: nowrap;
}

	
@media (-webkit-min-device-pixel-ratio: 3), 
screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait), 
screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
	:global(.stockOverview-container > .page-container){
		overflow: hidden !important;
		max-height: unset !important;
		height: unset !important;
	}

	:global(.stockOverview-container .mobile-step){
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

	.button-container-calculator {
		position: fixed;
		right: var(--body-padding);
		bottom: var(--footer-height);
		/* background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 30% ); */
		/* padding:1rem;
		min-height: 3rem;
		align-items: end;
		justify-content: start; */
		z-index: 10;
		width: 15vw;
	}
	.button-container-calculator button{
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		aspect-ratio: 1;
		padding: clamp(1rem,1vw,1rem);
		background-color: var(--primary-green-500);
		background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 30% );
		
		color: var(--general-text-color);
		color: var(--white);

		border: none;
		border-radius: 50%;
		cursor: pointer;
		font-weight: 500;

			svg path{
				fill: var(--white);
				/* stroke: var(--white); */
			}

			&:disabled {
				background-color: var(--white);
				color: var(--general-text-color);
				border-color: var(--primary-green-500);
				cursor: not-allowed;
			}

			&:is(:hover, :focus,:focus-within){
				background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 50% );
				background-color: var(--primary-green-500);

				transition: background-color 0.3s ease;
				color: var(--general-text-color);
				color: var(--white);

			}
	}


	.announcements h2{
		font-size: .91rem;
	}
}
</style>

