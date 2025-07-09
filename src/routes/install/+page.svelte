<script>
    import {current} from '$lib/store.js';
    let deferredPrompt = null;
    let showInstall = false;

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);

    if (typeof window !== 'undefined' && isAndroid) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstall = true;
        });
    }

    async function installApp() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('App installed');
            }
            deferredPrompt = null;
            showInstall = false;
        }
    }
</script>

<svelte:head>
    <title>Install</title>
</svelte:head>

<div class="container">

	<figure class="banner" style="background: url('./shared-assests/banner-deco.png')">
		<img src="./shared-assests/Monytri-01.png" alt="">
	</figure>

    <article class="install-container">
        <h2>How to install</h2>
        {#if isAndroid}
            {#if showInstall}
                <button onclick={installApp}>
                    Install Monytri App
                </button>
            {:else}
                <p>
                    To install: Tap the <b>three dots menu</b> <span style="font-size:1.2em;">&#x22EE;</span> in Chrome and select <b>"Install app"</b>.
                </p>
            {/if}
        {:else if isIOS}
            <div class="ios-instructions">
                <p>
                    To install: Tap <span style="font-size:1.2em;">&#x1f5d2;</span> (Share), then "Add to Home Screen".
                </p>
            </div>
        {:else}
            <p>
                To install: Use your browser's menu to "Install" or "Add to Home Screen", or bookmark this page.<br>
                <strong>Press Ctrl+D (Windows) or Cmd+D (Mac)</strong>
            </p>
        {/if}
    </article>

</div>

<style>

	:global(html:has(.ios-instructions) ) {
		--ios-instructions-bg: #f9f9f9;
	}

	:global(html:has(.install-container) header ) {
		display: none;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		margin-bottom: 5rem;
	}

	h2{
		font-size: clamp(1rem,8vw,1.1rem);
		position: relative;
		margin-block:  1% 5%;
		width: 100%;

		&::after{
			content: '';
			position: absolute;
			inset-inline: 0;
			top:auto;
			bottom: -40%;
			display: block;
			width: 100%;
			height: 1px;
			border-radius: 8px;
			background-color: var(--grey-400);
		}
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

	figure.banner{
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

	.install-container {
		background: var(--white);
		border-radius: 8px;
		padding: 1rem;
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	.ios-instructions {
		background: #f9f9f9;
		border: 1px solid #eee;
		padding: 1rem;
		border-radius: 8px;
		margin-top: 1rem;
	}
	button {
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		background-color: var(--primary-green-500);
		color: var(--white);
		font-size: 1rem;
		cursor: pointer;
	}
</style>
