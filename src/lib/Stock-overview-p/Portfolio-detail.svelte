<script>
	let {portfolio,averageBalance,formatCurrency,style} = $props();
</script>

<section class="portfolio-overview">
	<article class="portfolio {style === 2 ? 'portfolio-style-2' : 'portfolio-style-1'}">
		<span>
			<h2>Total Portfolio Value 
				<span>
					<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.28738 0.308103C8.37938 0.346103 8.46227 0.400968 8.53127 0.469968L15.5313 7.46997C15.6773 7.61597 15.7512 7.808 15.7512 8C15.7512 8.192 15.6783 8.38403 15.5313 8.53003C15.2383 8.82303 14.7632 8.82303 14.4702 8.53003L8.75027 2.81006L8.75027 19C8.75027 19.414 8.41427 19.75 8.00027 19.75C7.58627 19.75 7.25027 19.414 7.25027 19L7.25027 2.81103L1.5303 8.531C1.2373 8.824 0.762261 8.824 0.469261 8.531C0.176261 8.238 0.176261 7.76297 0.469261 7.46997L7.46926 0.469968C7.53826 0.400968 7.62116 0.346103 7.71316 0.308103C7.89716 0.232103 8.10338 0.232103 8.28738 0.308103Z" fill="#98C455"/>
					</svg>
				</span>
			</h2>
			<p class="value main">{formatCurrency( portfolio.value || '0') }</p>
		</span>
		{#if style == 2}
			<span class="portfolio-average">
				<h2>Portfolio Average</h2>
				<p class="value">{formatCurrency(averageBalance)}</p>
			</span>
		{/if}
	</article>

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

<style>
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
	container: portfolio-overview / inline-size;
}

/* top rows */
.portfolio-style-2{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
	min-height: 100px;
	padding: 1rem 2rem;
	margin-bottom: 1rem;
	border-radius: .5rem;
	box-shadow: rgba(236, 236, 236, 0.199) 0px 0px 15px 0px;
	background-color: var(--general-background-color-secondary);
	box-shadow: 0 6px 35px -20px #89888840;

	container-type: inline-size;

	@container (width < 450px) {
		flex-direction: column;
	}
}

.portfolio-style-2 > span {
	position: relative;
}

.portfolio span:has(svg) h2 span {
	animation-name: jump ;
	animation-duration: 1s ;
	animation-timing-function: ease-in-out ;
	animation-delay: 3s ;
	animation-fill-mode: forwards ;
	animation-iteration-count: 3, 0, 2 ;
}

@keyframes jump {
	0%, 100% {transform: translateY(0);}
	30% {	transform: translateY(5%);	}
	50% {	transform: translateY(-10%);}
}

.portfolio span {
	color: var(--general-text-color);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1%;
	text-wrap:nowrap ;
}

.portfolio span h2{
	color: var(--general-text-color);
	font-weight: 500;
	line-height: 25px;
	margin-bottom: 1%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}

.portfolio-average .value{
	font-size: 1.3rem;
	font-weight: 500;
	line-height: 120%;
	text-align: center;
	text-decoration: underline 5% ;
	color: var(--general-text-color);
}

.portfolio .value.main{
	font-size: clamp(1rem, 2rem - .2dvw , 3rem);
	font-weight: 500;
	line-height: 120%;
	text-align: center;
	text-decoration: underline 5% ;
	color: var(--primary-darkgreen-550);
	margin-bottom: 3%;
}

/* lower row */
.portfolio-details{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1rem;
	margin-block: 1rem 1rem;
}

.portfolio-details span{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	width: auto;
	height: 100%;
	gap: 0.5rem;
}

.portfolio-details span ~ span {
	align-items: center;
}

.portfolio-details span p:first-child{
	font-weight: 500;
	line-height: 120%;
}

.portfolio-details span:last-child {
	align-items: end;
}

.portfolio-details span p:last-child{
	font-size: .825rem;
	font-weight: 500;
	line-height: 120%;
}

@media (-webkit-min-device-pixel-ratio: 3), 
screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait), 
screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {

	.portfolio-style-2{
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		margin-bottom: 0;
		gap: 1.5rem;
		background-color: rgba(255, 255, 255, 0.6);
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