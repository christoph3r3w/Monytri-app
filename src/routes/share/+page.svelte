<script>
	import { onMount } from 'svelte';
	import {Logo} from '$lib';
	import QRCode from 'qrcode';
	import { goto } from '$app/navigation';

	const homeUrl = window.location.origin
	const installUrl = `${homeUrl}/install`;
	let qrDataUrl = '';
	let canShare = false;

	onMount(() => {
		canShare = !!navigator.share;
	});

	async function generateQR() {
		try {
			qrDataUrl = await QRCode.toDataURL(installUrl, {
				width: 300,
				margin: 1,
				color: {
					dark: '#000000',
					light: '#ffffff00'
				}
			});
		} catch (err) {
			console.error(err);
		}
	}

	function nativeShare() {

		if (!canShare) {
			alert('Web Share API is not supported in your browser.');
			return;
		} else if (canShare) {
			navigator.share({
				title: 'Monytri',
				text: 'Check out Monytri!',
				url: installUrl
			});
		} else {
			console.error('Share failed:', err);
		}
	}

	function copyURL() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(homeUrl)
				.then(() => {
					alert('URL copied to clipboard!');
				})
				.catch(err => {
					console.error('Failed to copy URL:', err);
				});
		} else {
			alert('Clipboard API is not supported in your browser.');
		}
	}
</script>


<div class="container">
		
	<figure class="banner" style="	background: url('./shared-assests/banner-deco.png')">
		<img src="./shared-assests/Monytri-01.png" alt="">
	</figure>

	<article class="share-container">
		<h2>
			Share Monytri with your friends and family.
		</h2>

		<figure class="qr-container">
			{#if qrDataUrl.length > 0}
			<img src={qrDataUrl} alt="QR Code" width="300" height="300" onclick={qrDataUrl = ''} />
			<p>Scan the QR code to share Monytri</p>
			{/if}
			{#if qrDataUrl.length <= 0}
				<button onclick={generateQR}>
					generate QR code
				</button>
			{/if}
		</figure>

		<div class="share-button-container">
			{#if canShare}
				<button onclick={nativeShare}>
					share
				</button>
			{:else}
				<button onclick={copyURL}>
					copy to clipboard
				</button>
			{/if}
		
			<button onclick={goto('/install')}>
				install web app
			</button>
		</div>
	</article>

	<!-- add socials here -->
	<section class='socials-container'>
		<h2>Follow us on</h2>
		<div class="socials">
			<a href="https://www.instagram.com/monytri.fintech/">
				<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 5C0.5 2.239 2.739 0 5.5 0H13.5C16.261 0 18.5 2.239 18.5 5V13C18.5 15.761 16.261 18 13.5 18H5.5C2.739 18 0.5 15.761 0.5 13V5ZM16.5 3C16.5 2.448 16.052 2 15.5 2C14.948 2 14.5 2.448 14.5 3C14.5 3.552 14.948 4 15.5 4C16.052 4 16.5 3.552 16.5 3ZM9.5 4C12.261 4 14.5 6.239 14.5 9C14.5 11.761 12.261 14 9.5 14C6.739 14 4.5 11.761 4.5 9C4.5 6.239 6.739 4 9.5 4ZM6.5 9C6.5 7.34315 7.84315 6 9.5 6C11.1569 6 12.5 7.34315 12.5 9C12.5 10.6569 11.1569 12 9.5 12C7.84315 12 6.5 10.6569 6.5 9Z" fill="#212121"/>
				</svg>
			</a>
			<a href="https://www.youtube.com/watch?v=gWXvQtw05QI&t=210s&ab_channel=BOTSCapital">
				<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16.66 0.50998C12.5681 -0.169993 8.39194 -0.169993 4.3 0.50998C1.96 0.99998 0.5 2.50998 0.5 4.47998V11.48C0.5 13.48 1.96 14.97 4.34 15.48C6.37551 15.8227 8.43585 15.9966 10.5 16C12.5705 15.9995 14.6374 15.8289 16.68 15.49C19 15.05 20.5 13.49 20.5 11.49V4.48998C20.5 2.49998 19 0.93998 16.66 0.50998ZM13.76 8.44998L8.76 11.45C8.68179 11.4976 8.59157 11.5219 8.5 11.52C8.41318 11.5193 8.32768 11.4988 8.25 11.46C8.17137 11.4123 8.1068 11.3445 8.06289 11.2637C8.01897 11.1829 7.99727 11.0919 8 11V4.99998C8.00075 4.91142 8.02411 4.82452 8.06786 4.74752C8.11161 4.67051 8.17431 4.60596 8.25 4.55998C8.32843 4.51796 8.41603 4.49598 8.505 4.49598C8.59398 4.49598 8.68157 4.51796 8.76 4.55998L13.76 7.55998C13.8323 7.60607 13.8918 7.66962 13.933 7.74478C13.9742 7.81994 13.9958 7.90427 13.9958 7.98998C13.9958 8.07569 13.9742 8.16002 13.933 8.23518C13.8918 8.31034 13.8323 8.37389 13.76 8.41998V8.44998Z" fill="#212121"/>
				</svg>
			</a>
			<a href="https://www.linkedin.com/company/monytri/">
				<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 0H16.5C17.605 0 18.5 0.895 18.5 2V16C18.5 17.105 17.605 18 16.5 18H2.5C1.395 18 0.5 17.105 0.5 16V2C0.5 0.895 1.395 0 2.5 0ZM3.977 14H6.5V7H3.977V14ZM5.19396 5.71738C4.42296 5.71738 3.90796 5.20338 3.90796 4.51738C3.90796 3.83138 4.42196 3.31738 5.27896 3.31738C6.04996 3.31738 6.56496 3.83138 6.56496 4.51738C6.56496 5.20338 6.05096 5.71738 5.19396 5.71738ZM13.058 14H15.5V10.174C15.5 7.977 14.523 7 13.302 7C12.081 7 11.43 7.407 11.105 7.977V7H8.582V14H11.105V10.174C11.105 9.035 11.919 8.872 12.163 8.872C12.407 8.872 13.058 9.116 13.058 10.174V14Z" fill="#212121"/>
				</svg>
			</a>
		</div>
	</section>
	

	<figure class="bottom-logo">
		<Logo name={false}/>
	</figure>
</div>

<style>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-bottom: 5rem;
		padding-top: 3%;
	}

	article,figure{
		border-radius: 8px;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		background-color: white;
	}

	h2{
		font-size: clamp(1rem,8vw,1.1rem);
	}

	.container > h2{
		position: relative;
		margin-block: 3% 1rem;
		width: 100%;

		&::after{
			content: '';
			position: absolute;
			inset-inline: 0;
			top:auto;
			bottom: -80%;
			display: block;
			width: 100%;
			height: 1px;
			border-radius: 8px;
			background-color: var(--grey-400);
		}
	}	

	figure.banner {
		width: 100%;
		aspect-ratio: 30/9;
		background-color: var(--white);
		background-size: cover;
		display: grid;
		place-items: center;
	}

	.banner img{
		width: 60%;
		height: auto;
	}

	.share-container{
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: var(--primary-darkgreen-200);
	}

	.qr-container{
		min-height: fit-content;
		max-width: 400px;
		gap: 1rem;
		margin-block: 6%;
	}

	.qr-container p{
		font-size: 12px;
		margin-bottom: 1%;
	}

	.qr-container img{
		width: 60%;
		height: auto;
		padding-block: 2%;
	}

	.share-button-container {
		flex: 1 1 20%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1svh;
		justify-content: end;
	}

	:is(.share-button-container,.qr-container) button {
		width: 100%;
		padding: clamp(10px, .9rem, 1vw) clamp(10px, .9rem, 1vw);
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		width: 100%;
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		background-color: var(--white);
		
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
			color: var(--white);
		}
		
		&:nth-of-type(2n) {
			color: var(--primary-green-500);
		}
	}

	.socials-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.socials{
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-block: 2rem;
	}



	.bottom-logo{
		background-color: unset;
		margin-bottom: 2rem;
	}
</style>