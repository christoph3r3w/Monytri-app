<script>
	import { onMount } from 'svelte';
	import{ goto } from '$app/navigation'
   import { Logo } from '$lib';
	import { current } from '$lib/store.js';

	let {d} = $props();
	let navSelect = $derived($current);	
	let device = $derived(d);
	let {isMobile,platform,isApple,isAndroid} = $derived(device);
	
</script>

<!-- mobile navigation -->
<!-- add this to a component -->
<nav class="mobile-nav" id="mobile-footer">
	<ul>
		<li >
			<button href="/" class:active={navSelect === 'home'} onclick={() => (goto('/'))} aria-label="Home">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M3 10a2 2 0 0 1 .709-1.529l7-5.999a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 9.998v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/transactions" class:active={navSelect === 'transactions History'} onclick={() => (goto('/transactions'))} aria-label="transactions">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 4.8a7.2 7.2 0 1 1-7.195 6.932.9.9 0 1 0-1.799-.064A9 9 0 1 0 6 5.292V3.9a.9.9 0 0 0-1.8 0v3.6a.9.9 0 0 0 .9.9h3.6a.9.9 0 0 0 0-1.8H7.237A7.176 7.176 0 0 1 12 4.8Zm.6 2.7a.9.9 0 0 0-1.8 0v4.8a.9.9 0 0 0 .9.9h3.6a.9.9 0 1 0 0-1.8h-2.7V7.5Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/stock-overview" class:active={navSelect === 'stock-overview'} onclick={() => (goto('/stock-overview'))} aria-label="stock overview">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 11.75V7.5c0-.417.146-.77.438-1.062A1.451 1.451 0 0 1 9.5 6c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v4.25c0 .417-.146.771-.437 1.063a1.442 1.442 0 0 1-1.063.437c-.417 0-.771-.146-1.062-.437A1.453 1.453 0 0 1 8 11.75Zm5-.225V3.5c0-.417.146-.77.438-1.062A1.451 1.451 0 0 1 14.5 2c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v8.025c0 .5-.154.875-.462 1.125-.308.25-.654.375-1.038.375a1.6 1.6 0 0 1-1.037-.375c-.307-.25-.462-.625-.463-1.125Zm-10 3.45V11.5c0-.417.146-.77.438-1.062A1.452 1.452 0 0 1 4.5 10c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v3.475c0 .5-.154.875-.462 1.125-.308.25-.654.375-1.038.375a1.6 1.6 0 0 1-1.037-.375c-.307-.25-.462-.625-.463-1.125Zm2.4 6.075c-.433 0-.738-.204-.913-.612-.175-.408-.104-.77.213-1.088l4.1-4.1a1 1 0 0 1 .663-.3.894.894 0 0 1 .687.25L13 17.65l5.6-5.6H18a.965.965 0 0 1-.712-.288.973.973 0 0 1-.288-.712c0-.283.095-.52.288-.712A.97.97 0 0 1 18 10.05h3c.283 0 .521.096.713.288.192.192.288.43.287.712v3a.968.968 0 0 1-.288.713.964.964 0 0 1-.712.287.973.973 0 0 1-.712-.288.965.965 0 0 1-.288-.712v-.6l-6.25 6.25a1 1 0 0 1-.663.3.894.894 0 0 1-.687-.25L9.55 17.3 6.1 20.75a1.097 1.097 0 0 1-.312.213.89.89 0 0 1-.388.087Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/education" class:active={navSelect === 'Grow with Monytri'} onclick={() => (goto('/education'))} aria-label="education">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.75 3.773h-5.363c-1.15 0-2.275.33-3.243.954L12 5.461l-1.144-.734a5.982 5.982 0 0 0-3.244-.954H2.25a.75.75 0 0 0-.75.75v13.313c0 .415.335.75.75.75h5.362c1.151 0 2.276.33 3.244.954l1.04.67c.031.019.066.03.102.03.035 0 .07-.009.1-.03l1.041-.67a6.009 6.009 0 0 1 3.248-.954h5.363a.75.75 0 0 0 .75-.75V4.523a.75.75 0 0 0-.75-.75ZM7.613 16.898H3.187V5.461h4.425c.83 0 1.636.237 2.333.684l1.143.734.162.105v10.829a7.67 7.67 0 0 0-3.638-.915Zm13.2 0h-4.425a7.67 7.67 0 0 0-3.638.915V6.983l.162-.105 1.143-.734a4.302 4.302 0 0 1 2.332-.684h4.425v11.437ZM9.303 8.461H4.947c-.092 0-.167.08-.167.176V9.69c0 .096.075.176.167.176H9.3c.091 0 .166-.08.166-.176V8.637a.169.169 0 0 0-.164-.176Zm5.228.176V9.69c0 .096.075.176.167.176h4.352c.091 0 .166-.08.166-.176V8.637c0-.096-.075-.176-.166-.176h-4.352c-.092 0-.167.08-.167.176Zm-5.229 3.105H4.948c-.092 0-.167.08-.167.176v1.055c0 .096.075.175.167.175H9.3c.091 0 .166-.08.166-.175v-1.055a.169.169 0 0 0-.164-.176Zm9.75 0h-4.354c-.092 0-.167.08-.167.176v1.055c0 .096.075.175.167.175h4.352c.091 0 .166-.08.166-.175v-1.055a.169.169 0 0 0-.164-.176Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/inbox" class:active={navSelect === 'inbox'} onclick={() => (goto('/inbox'))} aria-label="inbox">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 3.75H6.912C6.43095 3.75009 5.96259 3.90435 5.57564 4.19015C5.1887 4.47595 4.90354 4.87824 4.762 5.338L2.35 13.177C2.28465 13.3913 2.25096 13.614 2.25 13.838V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H19.5C20.0967 20.25 20.669 20.0129 21.091 19.591C21.5129 19.169 21.75 18.5967 21.75 18V13.838C21.75 13.6127 21.7167 13.3923 21.65 13.177L19.24 5.338C19.0985 4.87824 18.8133 4.47595 18.4264 4.19015C18.0394 3.90435 17.5711 3.75009 17.09 3.75H15M2.25 13.5H6.11C6.5278 13.5001 6.93731 13.6165 7.29267 13.8363C7.64803 14.056 7.9352 14.3703 8.122 14.744L8.378 15.256C8.56488 15.6299 8.8522 15.9443 9.20775 16.164C9.5633 16.3837 9.97303 16.5001 10.391 16.5H13.609C14.027 16.5001 14.4367 16.3837 14.7922 16.164C15.1478 15.9443 15.4351 15.6299 15.622 15.256L15.878 14.744C16.0649 14.3701 16.3522 14.0557 16.7078 13.836C17.0633 13.6163 17.473 13.4999 17.891 13.5H21.75M12 3V11.25M12 11.25L9 8.25M12 11.25L15 8.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			
			</button>
		</li>
	</ul>
</nav>


<style>

	/*///////////////////////////*/
	/* mobile navigation styling */
	/*///////////////////////////*/

	.mobile-nav{
		display: none;
	}
	
   @media 
		(-webkit-min-device-pixel-ratio: 3),
		(-moz-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{
     

		.mobile-nav{
			grid-column: 1/-1;
			position: relative;
			grid-row: 1/2;
			display: grid;
			grid-template-columns: subgrid;	
			grid-template-rows: min(23px, 15%) [content-start] 2fr [content-end] min(0px, 10%);		
			width: 100cqw;
			border-radius:inherit;
			z-index: 100;
			anchor-name: --mobile-footer;
		}
			
		.mobile-nav ul{
			grid-column: content;
			grid-row: content;
			display: flex;
			justify-content: center;
			align-items: safe center;
			width: 100%;
			height: auto;
			gap: clamp(10px, 10cqw, 100px);
		}

		.mobile-nav ul li{
			position: relative;
			padding: 1cqh;
			width: fit-content;
		}
			
		.mobile-nav ul li:is(:hover,:focus-within,:visited),
		.mobile-nav ul li:has(:is(a,button).active){
			background-color: var(--off-white);
			border-radius: 6px;
			user-select: none;
			
			svg path {
				fill: var(--primary-green-500);
			}

			[aria-label="inbox"] svg path{
				fill: var(--white);
				stroke: var(--primary-green-500);
			}
			
		}

		.mobile-nav li:nth-of-type(1):is(:hover,:focus-within,:visited) svg path,
		.mobile-nav ul li:nth-of-type(1):has(:is(a,button).active) svg path{
			fill:none !important;
			stroke:var(--primary-green-500) ;
			user-select: none;
		}
			
		/* selector does not work when i use 'a' instead i need to use :nht-child */
		.mobile-nav li :nth-child(n){
				position: relative;
		}
			
		/* touch area of nav buttons */
		.mobile-nav li :nth-child(n)::before{
				content: '';
				position: absolute;
				inset-inline: -75%;
				inset-block: -35%;
				bottom: -70%;
				z-index: 100;
		}
   }

	@media not all and (display-mode: standalone) {
	 	.mobile-nav{
			grid-template-rows: min(0px, 20%) [content-start] 1fr [content-end] min(0px,20%);
		}

		.mobile-nav ul li {
			padding: 2cqi;
			/* aspect-ratio: 1; */
		}

		.mobile-nav ul li:is(:hover,:focus-within,:visited),
		.mobile-nav ul li:has(:is(a,button).active){
			inset: 0;
			border-radius: 50% ;
		}
	}

		@media not (display-mode: standalone)  {
				
		:global(body:not(.windows-device, .desktop-device, .macos-device)) :global(footer:has(.mobile-nav)) {
			--footer-height: calc(20px + var(--safe-area-inset-bottom));

			position: fixed;
			bottom : 1dvh;
			inset-inline: auto;
			width: 85dvw;
			max-width: 400px;
			align-self: center;
			place-self: center;
			justify-content: center;
			border-radius: 1pc;
			transition:bottom 1s linear(0, -0.004 4.3%, -0.018 8.5%, -0.115 25.2%, -0.116 29.6%, -0.092 33.4%, -0.014 38.3%, 0.119 42.8%, 0.302 46.8%, 0.811 55.5%, 0.958 59.5%, 1.057 63.9%, 1.107 68.5%, 1.118 73.7%, 1.099 78.5%, 1.017 91.7%, 1);

			@starting-style {
				opacity: 0 ;
				position: relative ;
				bottom: 0;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
			}
		}

		:global(body:is(.ios-device,.android-device)) :global(footer:has(.mobile-nav)) {
			--footer-height: calc(50px + var(--safe-area-inset-bottom));
			bottom : calc(env(safe-area-inset-bottom) + 13lvh) !important;
			transition: bottom .7s linear(0, -0.004 4.3%, -0.018 8.5%, -0.115 25.2%, -0.116 29.6%, -0.092 33.4%, -0.014 38.3%, 0.119 42.8%, 0.302 46.8%, 0.811 55.5%, 0.958 59.5%, 1.057 63.9%, 1.107 68.5%, 1.118 73.7%, 1.099 78.5%, 1.017 91.7%, 1);

			@starting-style {
				bottom: 0;
			}
		}
	}

</style>