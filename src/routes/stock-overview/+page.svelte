	<script >
	import {PageStepContainer,Brokers,Announcements,PortfolioDetail} from '$lib';
	import {goto} from '$app/navigation';

	let {data} = $props();
	let {stockData,device} = data;
	let {portfolio,usersBrokers,totalBalance,averageBalance,announcements} = stockData;	
	
	
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
	<PortfolioDetail {portfolio} {averageBalance} {formatCurrency}/>
	
	<div class="button-container-calculator">

		<button onclick={() => goto('/stock-overview/calculator')} aria-label="open calculator" anchor="mobile-footer">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_20_4)">
					<path d="M4 5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3H18C18.5304 3 19.0391 3.21071 19.4142 3.58579C19.7893 3.96086 20 4.46957 20 5V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M8 8C8 7.73478 8.10536 7.48043 8.29289 7.29289C8.48043 7.10536 8.73478 7 9 7H15C15.2652 7 15.5196 7.10536 15.7071 7.29289C15.8946 7.48043 16 7.73478 16 8V9C16 9.26522 15.8946 9.51957 15.7071 9.70711C15.5196 9.89464 15.2652 10 15 10H9C8.73478 10 8.48043 9.89464 8.29289 9.70711C8.10536 9.51957 8 9.26522 8 9V8Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M8 14V14.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M12 14V14.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M16 14V14.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M8 17V17.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M12 17V17.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M16 17V17.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					<defs>
					<clipPath id="clip0_20_4">
					<rect width="24" height="24" fill="white"/>
					</clipPath>
					</defs>
				</svg>
		</button>

		<button onclick={() => goto('/stock-overview/calculator')}>
			Open Calculator
		</button>

	</div>
{/snippet}

{#snippet b()}
	<section class="current-brokers">
		<h2>Current Brokers</h2>
		
		<Brokers {formatCurrency} {usersBrokers}/>
	</section>
{/snippet}

{#snippet c()}
	<section class="announcements">
		<h2>Announcements from our partners
			<span class="arrow-icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
				</svg>
			</span>
		</h2>

		<Announcements {announcements} />
	</section>
{/snippet}

{#snippet d()}
	{@render b()}
	{@render c()}
{/snippet}

<article class="stockOverview-container">	
	<PageStepContainer
	stepType=''
	headerName={device.isMobile? '' :'stock overview'}
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
	grid-row-start:1 ;
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
	background-color: var(--general-background-color);
	overflow-y: auto;

	container-type:normal;
	container-name: stockOverview-container;
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
	background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 50% );
	
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

.button-container-calculator button:has(svg){
	display: none;
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
}

.current-brokers h2{
	font-size: clamp(1rem,1.25rem,20vw);
	font-weight: 400;
	text-align: center;
}

.announcements h2{
	font-size: clamp(1rem,1.25rem,5vw);

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

	.button-container-calculator {
		position: fixed;
		position-anchor: --mobile-footer;
		top:auto;
		right: var(--body-padding);
		bottom: var(--footer-height,anchor(top));
		z-index: 10;
		width: clamp(1rem, 5rem + 5svw , 4rem);
		aspect-ratio: 1;
		transition:bottom .4s linear(0, -0.004 4.3%, -0.018 8.5%, -0.115 25.2%, -0.116 29.6%, -0.092 33.4%, -0.014 38.3%, 0.119 42.8%, 0.302 46.8%, 0.811 55.5%, 0.958 59.5%, 1.057 63.9%, 1.107 68.5%, 1.118 73.7%, 1.099 78.5%, 1.017 91.7%, 1);

	}

	@media not (display-mode: standalone)  {
		:global(body:is(.ios-device,.android-device) .button-container-calculator) {
			bottom: calc(var(--footer-height,0) + var(--safe-area-inset-bottom,0) + 13lvh + env(safe-area-inset-bottom));
			bottom: calc(var(--footer-height) + var(--safe-area-inset-bottom) + 13lvh);
		}

		@media screen and (width > 580px) {
			:global(body:is(.ios-device,.android-device) .button-container-calculator) {
				bottom: calc(var(--footer-height) + var(--safe-area-inset-bottom) + 4.2lvh);
				right: calc(var(--body-padding) + .2lvw ) !important;
			}
		}
	}

	/* calc button */
	.button-container-calculator button{
		position: relative;
		display: grid;
		place-content: center;
		width:auto;
		aspect-ratio: 1;
		padding: clamp(1rem,1vw,1rem);
		background-color: color-mix(in srgb, var(--primary-green-500) , rgba(255, 255, 255, 0.295) 30% );
		
		border: none;
		border-radius: 50%;
		cursor: pointer;
		font-weight: 500;

			svg path{
				fill: var(--white);
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

	.button-container-calculator button:has(svg){
		display: block;
		height: auto;
	}

	.button-container-calculator button svg{
		scale: 1.3;
	}
	.button-container-calculator button svg path{
		fill: var(--primary-darkgreen-550);
		stroke: var(--primary-darkgreen-200);
		stroke: color-mix(in srgb, var(--primary-darkgreen-200) , rgba(251, 255, 180, 0.479) 70% );
		stroke-width: 6%;
	}

	.button-container-calculator button:not(:has(svg)) {
		display: none;
	}
}

	@media not all and (display-mode: standalone), (pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)  {
		
		:global(body.isMobile) :global(.stockOverview-container .mobile-step){
			padding-bottom: calc(3rem + var(--footer-height) + var(--safe-area-inset-bottom)) ;
		}

		:global(body.isMobile.ios-device) :global(.stockOverview-container .mobile-step){
			padding-bottom: calc( var(--footer-height) + var(--safe-area-inset-bottom)) ;
			max-height: calc(100% - var(--footer-height) * 1.5 + var(--safe-area-inset-bottom)) ;
		}

	}
</style>

