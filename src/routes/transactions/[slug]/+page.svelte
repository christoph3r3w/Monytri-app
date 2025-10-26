<script>
	import {current} from '$lib/store.js';
	import {device} from '$lib/Device.js';
	import {InProgress_S,PageStepContainer} from '$lib';
	import {goto} from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	// Or you can get it from the data passed by the load function
	let { data, aList } = $props();
	let {TDU, formData} = $state(data.slug)

	function formatCurrency(value) {
		const number = typeof value === 'string' ? parseFloat(value) : value;
		return new Intl.NumberFormat('en-IE', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(number);
	}

	onMount(() => {
		current.set('transactions History');
	});

</script>

{#snippet a(a)}
	{#if a.transactionType == 'sent' || a.transactionType == 'received'}
		<section class="transaction-Details">
			<h2>Transaction Details</h2>
			<ul>
				<li>
					Transfer amount
					{#if a.transactionType == 'sent'}
					<span style="text-decoration: underline var(--primary-red-500)">- {formatCurrency(a.amount)}</span>
					{:else}
					<span style="text-decoration: underline var(--primary-green-500)">{formatCurrency(a.amount)}</span>
					{/if}
				</li>
				<li>Transfer ID<span>#{a.id}</span></li>
				<li>Transaction Typet<span>{a.transactionType}</span></li>
				<li>Date<span>{a.date}</span></li>
			</ul>
		</section>
	{/if}
{/snippet}

{#snippet b(b)}
	{#if b.transactionType == 'sent'}
		<section class="user-details">
			<h2>Recipient Details</h2>
			<ul>
				<li>Account number<span>{b.account}</span></li>
				<li>Recipient Name<span>{b.user.name} {b.user.surname}</span></li>
			</ul>
		</section>
	{:else if b.transactionType == 'received'}
		<section class="user-details">
			<h2>Sender Details</h2>
			<ul>
				<li>Account number<span>{b.account}</span></li>
				<li>Sender Name<span>{b.user.name} {b.user.surname}</span></li>
			</ul>
		</section>
	{:else}
		<button onclick={goto('/transactions')}>back to transactions</button>
	{/if}
{/snippet}

{#snippet c()}
	{#if TDU && TDU.status !== 'failed' }
		<section class="instance">
			{#if TDU.transactionType == 'sent'}
				<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="42" height="42" rx="21" fill="#EDF2EE"/>
					<path d="M35.04 11.04C34.8453 11.2347 34.5893 11.3333 34.3333 11.3333C34.0773 11.3333 33.8213 11.236 33.6266 11.04L32.6666 10.0801V14.3333C32.6666 14.8853 32.2186 15.3333 31.6666 15.3333C31.1146 15.3333 30.6666 14.8853 30.6666 14.3333V10.0814L29.7066 11.0413C29.316 11.432 28.6826 11.432 28.292 11.0413C27.9013 10.6507 27.9013 10.0173 28.292 9.62662L30.9586 6.95995C31.0506 6.86795 31.1613 6.79464 31.284 6.74397C31.528 6.64264 31.804 6.64264 32.048 6.74397C32.1706 6.79464 32.2813 6.86795 32.3733 6.95995L35.04 9.62662C35.4306 10.0173 35.4306 10.6494 35.04 11.04ZM34.3333 21C34.3333 28.4867 28.1533 34.5386 20.62 34.328C13.664 34.1346 7.86663 28.336 7.67196 21.38C7.4613 13.8467 13.5133 7.66666 21 7.66666C22.7693 7.66666 24.4586 8.0067 25.996 8.64403C26.2093 8.73203 26.292 8.98399 26.1973 9.19465C25.7026 10.2907 25.5173 11.5787 25.7973 12.9307C26.3146 15.4333 28.4853 17.3786 31.028 17.6346C31.8533 17.7173 32.6546 17.6387 33.4013 17.416C33.6213 17.3507 33.856 17.464 33.9133 17.6854C34.1866 18.74 34.3333 19.8547 34.3333 21ZM24.9626 23.6893C24.9626 22.0866 23.876 20.692 22.3146 20.2974L20.1706 19.7653C19.84 19.6826 19.5586 19.4974 19.3466 19.2267C19.1466 18.9734 19.036 18.648 19.036 18.3133C19.036 17.488 19.7066 16.8174 20.532 16.8174H21.4653C22.228 16.8174 22.8666 17.3907 22.9533 18.1507C23.0146 18.7 23.5093 19.1 24.0586 19.0334C24.608 18.972 25.0026 18.4774 24.9413 17.9281C24.7613 16.3254 23.5213 15.0893 21.9693 14.8639V14.3333C21.9693 13.7813 21.5213 13.3333 20.9693 13.3333C20.4173 13.3333 19.9693 13.7813 19.9693 14.3333V14.8721C18.3093 15.1441 17.036 16.576 17.036 18.3107C17.036 19.0934 17.2986 19.8587 17.772 20.456C18.2466 21.068 18.924 21.5106 19.684 21.7026L21.828 22.2347C22.496 22.404 22.9626 23.0013 22.9626 23.6867C22.9626 24.084 22.8066 24.4587 22.5226 24.7427C22.2386 25.0267 21.864 25.1826 21.4666 25.1826H20.5333C19.7706 25.1826 19.132 24.6093 19.0453 23.8493C18.984 23.2999 18.488 22.8973 17.94 22.9666C17.3906 23.028 16.996 23.5226 17.0573 24.0719C17.2346 25.6546 18.4453 26.8827 19.9693 27.1294V27.6667C19.9693 28.2187 20.4173 28.6667 20.9693 28.6667C21.5213 28.6667 21.9693 28.2187 21.9693 27.6667V27.1361C22.7093 27.0281 23.396 26.7 23.936 26.16C24.5986 25.4973 24.9626 24.6199 24.9626 23.6893Z" fill="#497951"/>
				</svg>
				<p>Sent to {TDU.user.name}</p>
			{:else if TDU.transactionType == 'received'}
				<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="42" height="42" rx="21" fill="#EFEEFB"/>
					<path d="M33.912 17.6854C33.8546 17.4627 33.62 17.3493 33.4 17.416C32.6546 17.6387 31.852 17.7186 31.0266 17.6346C28.484 17.3786 26.3146 15.4333 25.796 12.9307C25.516 11.5787 25.7013 10.2907 26.196 9.19465C26.2906 8.98398 26.208 8.73203 25.9946 8.64403C24.4573 8.0067 22.7666 7.66666 20.9986 7.66666C13.5119 7.66666 7.45995 13.8467 7.67062 21.38C7.86395 28.336 13.6626 34.1333 20.6186 34.328C28.152 34.5386 34.3319 28.4867 34.3319 21C34.3333 19.8547 34.1866 18.74 33.912 17.6854ZM23.9373 26.1587C23.3973 26.6987 22.7106 27.0279 21.9706 27.1346V27.6667C21.9706 28.2187 21.5226 28.6667 20.9706 28.6667C20.4186 28.6667 19.9706 28.2187 19.9706 27.6667V27.132C18.4466 26.884 17.2373 25.656 17.0586 24.0747C16.9973 23.5254 17.3919 23.0307 17.9413 22.9694C18.4906 22.9001 18.984 23.3027 19.0466 23.852C19.132 24.612 19.772 25.1854 20.5346 25.1854H21.468C21.8653 25.1854 22.24 25.0293 22.524 24.7453C22.808 24.4613 22.964 24.0866 22.964 23.6893C22.964 23.0026 22.4973 22.4066 21.8293 22.2373L19.6853 21.7054C18.9253 21.5121 18.248 21.0706 17.7733 20.4586C17.3013 19.8613 17.0373 19.096 17.0373 18.3133C17.0373 16.5786 18.3106 15.1453 19.9706 14.8747V14.3333C19.9706 13.7813 20.4186 13.3333 20.9706 13.3333C21.5226 13.3333 21.9706 13.7813 21.9706 14.3333V14.8613C23.5226 15.0867 24.7626 16.3226 24.9426 17.9253C25.004 18.4746 24.6093 18.9693 24.06 19.0306C23.512 19.0973 23.016 18.6973 22.9546 18.1479C22.8693 17.3879 22.2293 16.8146 21.4666 16.8146H20.5333C19.7079 16.8146 19.0373 17.4854 19.0373 18.3107C19.0373 18.6454 19.148 18.9706 19.348 19.2239C19.5586 19.4959 19.8413 19.68 20.172 19.7627L22.316 20.2946C23.876 20.6893 24.964 22.084 24.964 23.6867C24.9626 24.62 24.5986 25.4973 23.9373 26.1587ZM35.04 12.3734L32.3733 15.04C32.2813 15.132 32.1706 15.2053 32.048 15.256C31.9253 15.3067 31.7959 15.3333 31.6653 15.3333C31.5346 15.3333 31.4053 15.3067 31.2826 15.256C31.16 15.2053 31.0493 15.132 30.9573 15.04L28.2906 12.3734C27.9 11.9827 27.9 11.3493 28.2906 10.9586C28.6813 10.568 29.3146 10.568 29.7053 10.9586L30.6653 11.9186V7.66666C30.6653 7.11466 31.1133 6.66666 31.6653 6.66666C32.2173 6.66666 32.6653 7.11466 32.6653 7.66666V11.9186L33.6253 10.9586C34.0159 10.568 34.6493 10.568 35.04 10.9586C35.4306 11.3493 35.4306 11.9827 35.04 12.3734Z" fill="#6057DB"/>
				</svg>

				<p>Received from {TDU.user.name}</p>
			{:else}
				<p>error</p>
			{/if}
		</section>
		{@render a(TDU)}
		{@render b(TDU)}
	{:else}
		<p>transaction {TDU.status}</p>
		<button onclick={goto('/transactions')}>back to transactions</button>
	{/if}
{/snippet}

{#snippet d()}
	{#if TDU.transactionType == 'sent' }
	<button class="redo-button gift" onclick={goto('/gift')}>redo transaction</button>	
	{:else if TDU.transactionType == 'received'}
	<button class="redo-button request"onclick={goto('/request')}>redo transaction</button>	
	{/if}
	<button onclick={goto('/transactions')}>back to transactions</button>
{/snippet}

{#snippet e()}
	{@render aList()}
{/snippet}

<article class="transaction-instance-container">	
	<PageStepContainer
	stepType=''
	headerName={$device.isMobile? '' :' '}
   subtext=""
   showLeftContent={true}
	showRightContent={true}
	showContinueButton={false}
	leftContent={''}
	rightContent={c}
	customButton={d}
	/>
</article>

<style>

:global(body:has(:not(.left-step)) .transaction-instance-container .right-step) {
	grid-column: 1/-1;
	grid-row: 1 / span 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.transaction-instance-container{
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
	
	container-type:normal;
	container-name: instance-container;
}

.instance{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-block: 1rem;
}

.instance svg{
	width: 60px;
	height: auto;
}

.instance p{
	font-size: 1.4rem;
	font-weight: 400;
	color: var(--text-color-primary);
}

section:is(.transaction-Details, .user-details){
	border-radius: .5rem;
	width: 100%;
	max-width: 400px;
	margin-bottom:clamp(1svh,2svh,1rem); 
}

h2{
	margin-bottom: clamp(10px, 12px, 1.5rem);
	font-size: 1rem;
	font-weight: 400;
	color: var(--text-color-primary);
}

ul {
	display: flex;
	flex-direction: column;
	gap: clamp(1px, 5dvh .5rem);
	padding: clamp(1%,3svh,1rem);
	padding-bottom: 1svh;
	border-radius: .5rem;
	background-color: var(--general-background-color-secondary);
	box-shadow: rgba(236, 236, 236, 0.199) 0px 0px 15px 0px;
}

li{
	height: fit-content;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-bottom: clamp(10px, 12px, 1.5rem);
	font-size: .9rem;
	font-weight: 300;
	color: var(--text-color-primary);
}

li > span{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
	flex-wrap: nowrap;
	font-weight: 500;
	color: var(--text-color-primary);
	text-transform: capitalize;
}

:global(.button-container):has(.redo-button){
	flex-direction: column;
	align-items: center;
	justify-items: center;
	gap: clamp(1svh, 5svh, 1rem);
}

:global(.button-container) button{
	width: 300px;
	align-self: center;
	justify-self: center;
	transition: background-color 0.3s ease;
}

@media (height < 620px){
	.user-details{
		height: 0;
		opacity: 0;
	}
}

</style>
