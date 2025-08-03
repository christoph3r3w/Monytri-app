<script>
	import {goto} from '$app/navigation';
	import {Logo,Balance_M} from '$lib'
	import {current,isMobile,menuOpen} from '$lib/store.js'

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let is_mobile = $derived($isMobile);

	function iconTask (){
        if ($current === 'home') {
            // On homepage, activate search functionality
            console.log('Activating search');
        } else if ($current === 'gift' || $current === 'gift-success') {
            history.back();
		} else {
            history.back();
		}
	}

	function toggleMenu(){
		menuOpen.set(!$menuOpen);
		console.log('menu open is',$menuOpen);
	}

	$effect(() => {
		console.log('is mobile',is_mobile);
	});

</script>

{#snippet routes()}
	<li><a href="/">home</a></li>
	<li><a href="/gift" rel="noopener">Gift</a></li>
	<li><a href="/how-it-works">how it works</a></li>
	<li><a href="/learn-more">learn more</a></li>
{/snippet}

{#snippet desktopNav()}
	<nav class="logo">
		<Logo name={true}/>
	</nav>
	<nav class="menu">
		<menu>
			{@render routes()}
		</menu>
	</nav>
	<nav class="profile">
		<button onclick={toggleMenu}><img src="generic.png" alt="generic person"></button>
	</nav>
{/snippet}

{#snippet mobileHeadNav()}
<section class="mobile-header">
	<!-- goback and search button -->
	 {#if $current === 'gift' || $current === 'gift-success'  }
	 <nav class="goBack">
		<button onclick={iconTask}>
			<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
			</svg>
		</button>
	</nav>
	{:else}
	<nav class="goBack othr">
		<button onclick={iconTask}>
			
		{#if $current === 'home'}
			<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="m19.53 18.47-3.841-3.841A8.705 8.705 0 0 0 17.75 9C17.75 4.175 13.825.25 9 .25S.25 4.175.25 9 4.175 17.75 9 17.75a8.705 8.705 0 0 0 5.629-2.061l3.841 3.841a.748.748 0 0 0 1.06 0 .749.749 0 0 0 0-1.06ZM1.75 9c0-3.998 3.252-7.25 7.25-7.25S16.25 5.002 16.25 9 12.998 16.25 9 16.25 1.75 12.998 1.75 9Z" fill="white"/>
			</svg>
		{:else}
			<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
			  </svg>
		{/if}
		</button>
	</nav>
	<!-- page title -->
	<nav class="pageTitle">
		{#if $current !== 'home'}
			<h2>
				{$current}
			</h2>
		{/if}
	</nav>
	<!-- profile menu -->
	<nav class="profile">
		<a href="/profile"><img src="generic.png" alt="generic person"></a>
	</nav>
	{/if}
	</section>
	{#if $current === 'home'}
	<section class="home-intro-section">
		<Balance_M/>

		<nav class="button-container">
			<button onclick={goto("/gift")}>
				<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M30.5398 6.04003C30.3452 6.2347 30.0892 6.33332 29.8332 6.33332C29.5772 6.33332 29.3212 6.23603 29.1265 6.04003L28.1665 5.08007V9.33332C28.1665 9.88532 27.7185 10.3333 27.1665 10.3333C26.6145 10.3333 26.1665 9.88532 26.1665 9.33332V5.08137L25.2065 6.04133C24.8158 6.432 24.1825 6.432 23.7918 6.04133C23.4012 5.65067 23.4012 5.01729 23.7918 4.62662L26.4585 1.95995C26.5505 1.86795 26.6612 1.79464 26.7838 1.74397C27.0278 1.64264 27.3038 1.64264 27.5478 1.74397C27.6705 1.79464 27.7812 1.86795 27.8732 1.95995L30.5398 4.62662C30.9305 5.01729 30.9305 5.64936 30.5398 6.04003ZM29.8332 16C29.8332 23.4867 23.6532 29.5386 16.1198 29.328C9.16384 29.1346 3.36651 23.336 3.17184 16.38C2.96118 8.8467 9.01318 2.66666 16.4998 2.66666C18.2692 2.66666 19.9585 3.0067 21.4958 3.64403C21.7092 3.73203 21.7918 3.98399 21.6972 4.19465C21.2025 5.29065 21.0172 6.57866 21.2972 7.93066C21.8145 10.4333 23.9852 12.3786 26.5278 12.6346C27.3532 12.7173 28.1545 12.6387 28.9012 12.416C29.1212 12.3507 29.3558 12.464 29.4132 12.6854C29.6865 13.74 29.8332 14.8547 29.8332 16ZM20.4625 18.6893C20.4625 17.0866 19.3758 15.692 17.8145 15.2974L15.6705 14.7653C15.3399 14.6826 15.0585 14.4974 14.8465 14.2267C14.6465 13.9734 14.5358 13.648 14.5358 13.3133C14.5358 12.488 15.2065 11.8174 16.0318 11.8174H16.9652C17.7278 11.8174 18.3665 12.3907 18.4532 13.1507C18.5145 13.7 19.0092 14.1 19.5585 14.0334C20.1079 13.972 20.5025 13.4774 20.4412 12.9281C20.2612 11.3254 19.0212 10.0893 17.4692 9.86392V9.33332C17.4692 8.78132 17.0212 8.33332 16.4692 8.33332C15.9172 8.33332 15.4692 8.78132 15.4692 9.33332V9.87206C13.8092 10.1441 12.5358 11.576 12.5358 13.3107C12.5358 14.0934 12.7985 14.8587 13.2718 15.456C13.7465 16.068 14.4238 16.5106 15.1838 16.7026L17.3278 17.2347C17.9958 17.404 18.4625 18.0013 18.4625 18.6867C18.4625 19.084 18.3065 19.4587 18.0225 19.7427C17.7385 20.0267 17.3639 20.1826 16.9665 20.1826H16.0332C15.2705 20.1826 14.6318 19.6093 14.5452 18.8493C14.4838 18.2999 13.9878 17.8973 13.4398 17.9666C12.8905 18.028 12.4958 18.5226 12.5572 19.0719C12.7345 20.6546 13.9452 21.8827 15.4692 22.1294V22.6667C15.4692 23.2187 15.9172 23.6667 16.4692 23.6667C17.0212 23.6667 17.4692 23.2187 17.4692 22.6667V22.1361C18.2092 22.0281 18.8958 21.7 19.4358 21.16C20.0985 20.4973 20.4625 19.6199 20.4625 18.6893Z" fill="#497951"/>
				</svg>

				send
			</button>
			
			<button onclick={goto("/request")}>
				<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M29.4122 12.6852C29.3549 12.4626 29.1202 12.3492 28.9002 12.4159C28.1549 12.6385 27.3522 12.7184 26.5269 12.6344C23.9842 12.3784 21.8149 10.4332 21.2962 7.9305C21.0162 6.5785 21.2015 5.2905 21.6962 4.1945C21.7909 3.98383 21.7082 3.73188 21.4949 3.64388C19.9575 3.00655 18.2669 2.6665 16.4989 2.6665C9.01219 2.6665 2.9602 8.84655 3.17087 16.3799C3.3642 23.3359 9.16287 29.1331 16.1189 29.3278C23.6522 29.5385 29.8322 23.4865 29.8322 15.9998C29.8335 14.8545 29.6869 13.7399 29.4122 12.6852ZM19.4375 21.1585C18.8975 21.6985 18.2109 22.0278 17.4709 22.1344V22.6665C17.4709 23.2185 17.0229 23.6665 16.4709 23.6665C15.9189 23.6665 15.4709 23.2185 15.4709 22.6665V22.1318C13.9469 21.8838 12.7375 20.6559 12.5589 19.0745C12.4975 18.5252 12.8922 18.0306 13.4415 17.9692C13.9909 17.8999 14.4842 18.3026 14.5469 18.8519C14.6322 19.6119 15.2722 20.1852 16.0349 20.1852H16.9682C17.3655 20.1852 17.7402 20.0291 18.0242 19.7451C18.3082 19.4611 18.4642 19.0865 18.4642 18.6891C18.4642 18.0025 17.9975 17.4065 17.3295 17.2371L15.1855 16.7052C14.4255 16.5119 13.7482 16.0705 13.2735 15.4585C12.8015 14.8612 12.5375 14.0958 12.5375 13.3132C12.5375 11.5785 13.8109 10.1452 15.4709 9.87451V9.33317C15.4709 8.78117 15.9189 8.33317 16.4709 8.33317C17.0229 8.33317 17.4709 8.78117 17.4709 9.33317V9.86117C19.0229 10.0865 20.2629 11.3225 20.4429 12.9251C20.5042 13.4745 20.1095 13.9691 19.5602 14.0304C19.0122 14.0971 18.5162 13.6971 18.4549 13.1478C18.3695 12.3878 17.7295 11.8145 16.9669 11.8145H16.0335C15.2082 11.8145 14.5375 12.4852 14.5375 13.3105C14.5375 13.6452 14.6482 13.9705 14.8482 14.2238C15.0589 14.4958 15.3415 14.6799 15.6722 14.7625L17.8162 15.2944C19.3762 15.6891 20.4642 17.0839 20.4642 18.6865C20.4629 19.6199 20.0989 20.4972 19.4375 21.1585ZM30.5402 7.37321L27.8735 10.0399C27.7815 10.1319 27.6709 10.2052 27.5482 10.2559C27.4255 10.3065 27.2962 10.3332 27.1655 10.3332C27.0349 10.3332 26.9055 10.3065 26.7829 10.2559C26.6602 10.2052 26.5495 10.1319 26.4575 10.0399L23.7909 7.37321C23.4002 6.98254 23.4002 6.34916 23.7909 5.9585C24.1815 5.56783 24.8149 5.56783 25.2055 5.9585L26.1655 6.91846V2.6665C26.1655 2.1145 26.6135 1.6665 27.1655 1.6665C27.7175 1.6665 28.1655 2.1145 28.1655 2.6665V6.91846L29.1255 5.9585C29.5162 5.56783 30.1495 5.56783 30.5402 5.9585C30.9309 6.34916 30.9309 6.98254 30.5402 7.37321Z" fill="#6057DB"/>
				</svg>
				request
			</button>
			<!-- <button onclick={goto("/share")}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18 15.0001C16.933 15.0001 16.001 15.5621 15.47 16.4011L8.7959 13.0641C8.9229 12.7321 9 12.3761 9 11.9991C9 11.6231 8.9229 11.2661 8.7959 10.9341L15.47 7.59705C16.002 8.43705 16.933 8.99805 18 8.99805C19.657 8.99805 21 7.65505 21 5.99805C21 4.34105 19.657 2.99805 18 2.99805C16.343 2.99805 15 4.34105 15 5.99805C15 6.04905 15.0129 6.09706 15.0149 6.14706L7.90796 9.70007C7.38796 9.26807 6.729 8.99707 6 8.99707C4.343 8.99707 3 10.3401 3 11.9971C3 13.6541 4.343 14.9971 6 14.9971C6.729 14.9971 7.38796 14.7271 7.90796 14.2941L15.0149 17.847C15.0129 17.897 15 17.9451 15 17.9961C15 19.6531 16.343 20.9961 18 20.9961C19.657 20.9961 21 19.6531 21 17.9961C21 16.3391 19.657 15.0001 18 15.0001Z" fill="#6057DB"/>
				</svg>
				share
			</button> -->
		</nav>
	</section>
	
	{/if}
{/snippet}

<div class="header">
	{#if is_mobile == true || is_mobile == 1 || is_mobile == '1'|| is_mobile == 'true'}
		{@render mobileHeadNav()}
	{:else}
		{@render desktopNav()}
	{/if}
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		gap: 1%;
		border-bottom: solid 2px color-mix(in hsl, var(--grey-400), white 80%);
		padding-inline: var(--body-padding);
	}

	nav {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 1rem;
	}

	nav.logo{
		flex: 0 1 fit-content;
	}

	/* desktop navigation */
	nav:nth-of-type(2){
		flex: 1 1 fit-content ;
		justify-content: end;

		@container (width < 730px){
			display: none;
		}
	}

	nav menu {
		display: inline-flex;
		min-width: fit-content;
		height: fit-content;
		
		li{
			display: flex;
			flex-wrap: nowrap;
			padding-inline: 1.5vw;
		}

		& li :is(a,button){
			font-size: 1.5rem;
			text-transform: capitalize;
			color: var(--primary-green-500);
			text-wrap-mode: nowrap;
			word-wrap: normal;
			width: 100%;
		}

		& li:hover :is(a,button){
			text-decoration: underline !important ;
		}
	}

	.profile a{
		border-radius: 50%;
		width: 32px;
		height: 32px;
	}

	.profile img{
		width: clamp(100%, 100%, 65px);
		aspect-ratio: 1;
	}

	@media 
		(-moz-min-device-pixel-ratio: 3),	
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{

		.header{
			grid-column: 1/-1;
			grid-row: 1/-1 ;
			border: none;
			outline: none;
		}

		.header .mobile-header{
			display: grid;
			grid-template-columns: 1fr 5fr 1fr;
			grid-template-rows: 1fr;
			width: 100%;
			height: 100%;
			border-bottom: none;
		}

		.goBack{
			display: flex;
			align-items: center;
			justify-content: start;
			padding-inline: 1rem;
			z-index: 11;
		}
		
		.goBack button{
			display: grid;
			place-content: start;
			background: transparent;			
			border: none;
			border-radius: 8px;
			cursor: pointer;

			svg path{
				stroke: var(--off-white);
				fill: var(--off-white);
			}
		}

		nav:nth-of-type(2).pageTitle{
			display: flex;
			align-items: center;
			justify-content:center;
		}

		.pageTitle h2{
			font-size: clamp(1.4rem, 1vw, 1.8rem);
			font-weight: 300;
			text-transform: capitalize;
			color: var(--off-white);
			text-align: center;
			line-height: 120%;
			width: 100%;
			height: auto;
			word-wrap: none;
			text-wrap:none ;
			text-wrap-mode:nowrap ;
		}

		.profile{
			display: flex;
			align-items: center;
			justify-content: end;
			padding-inline: 1rem;
			z-index: 11;
		}

		:global(html:has(.home-wrapper) ){
			--body-padding: 0;
			.header{
				padding-inline: 0;
			}
			 /* Background Swirly Image decoration */
			:global(header::after){
				--_background-cut-off: 85%;
				content: '';
				position: absolute;
				top: 0;
				inset-inline: 0;
				min-height: calc(var(--header-intro-height) + var(--header-height));
				background: 
				url('/home-page/homepage-intro-deco.png') no-repeat center clamp(-12vh,-3vh,0px) / contain,
				linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off));
				mask-image:
				linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off)) ;
				background-repeat: no-repeat;
				background-size: cover;
				overflow: clip;
				mix-blend-mode:normal;
			}

			.home-intro-section{
				position: fixed;
				top: calc(var(--header-height));
				inset-inline: 0;
				
				display: flex;
				flex-direction: column;
				align-items: center;
				align-self: center;
				justify-content: space-between;
				min-height: var(--header-intro-height);
				z-index: 10;
				text-align: center;
			}
		
			.button-container{
				position: relative;
				display:flex;
				flex-direction: row;
				align-items: center;
				width: clamp(50%,68.4%,248px);
				min-width: fit-content;
				height: 84px;
				justify-self: baseline;
				border-radius: 8px;
				background-color: white;
				background-color: var(--general-background-color);
				box-shadow: 0px 4px 10px 0px #5858581A ;
			}

			.button-container::before{
				content: '';
				width: 1px;
				height: auto;
				position: absolute;
				inset-block: 30%;
				left: 50%;
				z-index: 1;
				border-radius: inherit;
				background-color: var(--neutral-grey);
			}

			.button-container button{
				flex: 1 1 60%;
				display: flex;
				height: 100%;
				flex-direction: column;
				align-items: center;
				justify-content:center;
				color: var(--general-text-color);
				border-radius: 8px;
				padding: 1% 2%;

				svg{
					width: 2.5rem;
					height: 2.5rem;
					margin-bottom: 1%;
				}
			}
		}
		

	}
</style>
	