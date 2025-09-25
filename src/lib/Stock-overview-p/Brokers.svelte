<script>
	import { user } from '$lib/user';
	import { onMount } from 'svelte';

	let {formatCurrency, usersBrokers,brokers} = $props();
	let rand = (currentValue) => currentValue !== undefined ? +(Math.random() * currentValue).toFixed(2) : +(Math.random() * 500).toFixed(2);
	let brokersList = usersBrokers && usersBrokers.length > 0 ? usersBrokers : brokers;
	let totalBalance = brokersList.reduce((acc, broker) => acc + broker.balance, 0);
	let averageBalance = totalBalance / brokersList.length;
	
	let defaultImg = "/brokers/bank.png"
</script>

{#snippet listItem(b)}
	<li title="{b.description}">
		<span>
			<img
				src={b.logo? b.logo : defaultImg}
				alt={b.name + ' logo'}
				width="24"
				height="24"
				
			/>
			<p>{b.name}</p>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.4613 8.19142C14.4359 8.25275 14.3994 8.30801 14.3534 8.35401L9.68669 13.0207C9.58935 13.118 9.46133 13.1673 9.33333 13.1673C9.20533 13.1673 9.07731 13.1187 8.97998 13.0207C8.78465 12.8253 8.78465 12.5087 8.97998 12.3133L12.7933 8.50001H2C1.724 8.50001 1.5 8.27601 1.5 8.00001C1.5 7.72401 1.724 7.50001 2 7.50001H12.7926L8.97933 3.6867C8.784 3.49136 8.784 3.17467 8.97933 2.97934C9.17466 2.78401 9.49135 2.78401 9.68669 2.97934L14.3534 7.64601C14.3994 7.69201 14.4359 7.74727 14.4613 7.8086C14.5119 7.93127 14.5119 8.06875 14.4613 8.19142Z" fill="#212121"/>
			</svg>
		</span>
		{#if formatCurrency}
		<span>{formatCurrency(b.balance)}</span>
		{:else}
		<span>€{b.balance}</span>
		{/if}
	</li>

{/snippet}

<ul class="brokers">
	{#if brokersList && brokersList.length > 0}
		{#each brokersList as broker}
			{@render listItem(broker)}
		{/each}
	{/if}
</ul>

<style>


.brokers {
	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 500px;
	max-width: 100%;
	width: 100%;
	gap: var(--gap);
	border-radius: .5rem;
	box-shadow: rgba(236, 236, 236, 0.199) 0px 0px 15px 0px;

	padding: 1rem;
	background-color: var(--general-background-color-secondary);
	max-height: fit-content;
}

.brokers li{
	position: relative;
	max-width: 100%;
	height: fit-content;
	min-height: 2.5rem;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}

.brokers li:nth-last-of-type(n + 2)::after{
	content: '';
	position: absolute;
	inset-inline: 0;
	bottom:calc(-1 * var(--gap) / 2);
	border: solid 1px var(--off-white);
}

.brokers li > span{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
	flex-wrap: nowrap;
}

.brokers li > span p{
	margin: 0 0.5rem;
	font-weight: 500;
	font-size: clamp(0.875rem, 0.8rem + 0.5vw, 1rem);
}

.brokers :has(img[alt]) img{
	object-fit: contain;
	object-position: center;
	border-radius: 0.25rem;
}

</style>