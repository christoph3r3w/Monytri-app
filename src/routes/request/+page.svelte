<script>
	import { onMount } from 'svelte';
	import {Logo} from '$lib';
	import QRCode from 'qrcode';
	import { goto } from '$app/navigation';

	//  vecel does not let a user enter an application from the share page you need to start with the hoem page 
	const homeUrl = window.location.origin
	const shareUrl = `${homeUrl}/share`;
	let qrDataUrl = '';
	let canShare = false;

	onMount(() => {
		canShare = !!navigator.share;
	});

	async function generateQR() {
		try {
			qrDataUrl = await QRCode.toDataURL(homeUrl, {
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

	async function nativeShare() {

		if (!canShare) {
			alert('Web Share API is not supported in your browser.');
			return;
		}

		try {
			await navigator.share({
				title: 'Monytri',
				text: 'Check out Monytri!',
				url: homeUrl
			});
		} catch (err) {
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
	
	<h2>Request coming soon</h2>
	
	
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
		
			<button onclick={goto('/share')}>
				install web app
			</button>
		</div>
	</article>

	<!-- add socials here -->
	<section class='socials'>
		<a href=""><img src="" alt=""></a>
		<a href=""><img src="" alt=""></a>
		<a href=""><img src="" alt=""></a>
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

	.bottom-logo{
		background-color: unset;
		margin-bottom: 2rem;
	}
</style>