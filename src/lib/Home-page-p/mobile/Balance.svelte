<script>
	let balance = $state(1500);

	let balanceString = $derived(
		new Intl.NumberFormat('nl-NL', {
			style: 'currency',
			currency: 'EUR',
		}).format(balance)
	);

	const maxLength = 10;
	let isLong = $derived(balanceString.length > maxLength);
	let displayBalance = $derived(isLong ? balanceString.slice(0, maxLength) + '…' : balanceString);
</script>

<div class="balance-section">
	<div class="balance-info">
		<h1 title={isLong ? balanceString : undefined}>{displayBalance}</h1>
		<p>Available Balance to Spend</p>
	</div>
	<a href="/" class="add-money-link">
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.83333 7.33333C6.83333 8.52667 7.80667 9.5 9 9.5H12V10C12 11.3333 11.3333 12 10 12H2C0.666667 12 0 11.3333 0 10V1.33333C0 2.06667 0.6 2.66667 1.33333 2.66667H10C11.3333 2.66667 12 3.33333 12 4.66667V5.16667H9C7.80667 5.16667 6.83333 6.14 6.83333 7.33333ZM9 6.16667C8.36 6.16667 7.83333 6.69333 7.83333 7.33333C7.83333 7.97333 8.36 8.5 9 8.5H12V6.16667H9ZM9.34668 8C8.98001 8 8.67334 7.7 8.67334 7.33333C8.67334 6.96667 8.97334 6.66667 9.34001 6.66667H9.34668C9.71335 6.66667 10.0133 6.96667 10.0133 7.33333C10.0133 7.7 9.71335 8 9.34668 8ZM8 0H1.83333C1.37333 0 1 0.373333 1 0.833333C1 1.29333 1.37333 1.66667 1.83333 1.66667H9.97998C9.87998 0.553333 9.22 0 8 0Z" fill="white"/>
		</svg>
  		Add Money
	</a>
</div>

<style>
	.balance-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		color: var(--white);
		margin-top: -2rem;
	}

	.balance-section h1{
		font-size: clamp(1rem,36px,2.5rem);
		margin-bottom: 2% ;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 10ch;
	}
	
	.balance-info{
		font-size: clamp(10px,12px,12px);	
	}

	.add-money-link{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4%;
		border: solid var(--white) 2px;
		border-radius: 82px;
		padding: 9% 2%;
	}

	.add-money-link svg{
		width: 13px;
		height: 13px;
	}

</style>