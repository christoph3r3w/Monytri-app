<script>
	import { onMount } from 'svelte';
	import {afterNavigate,onNavigate} from '$app/navigation'
	import{ goto } from '$app/navigation'
    import { Logo } from '$lib';
	import { current } from '../../store.js';

	// create a store to keep track of the current page
	// this will be used to set the active class on the mobile navigation
	// and to set the active class on the footer/header navigation
	let navSelect = $derived($current);
	
	afterNavigate(() => {
		console.log('current page is',navSelect,$current);
	});

</script>

{#snippet about()}
    <h2>about us</h2>
    <span class="links"><a href="/">mission</a></span>
    <span class="links"><a href="/">Team</a></span>
    <span class="links"><a href="/">Newsletter</a></span>
{/snippet}

{#snippet social()}
	<h2>social</h2>
    <span class="links"><a href="https://www.instagram.com/monytri.fintech/">Instagram</a></span>
    <span class="links"><a href="https://www.linkedin.com/company/monytri/">linkedin</a></span>
    <span class="links"><a href="https://www.youtube.com/watch?v=gWXvQtw05QI&t=210s">Youtube</a></span>
{/snippet}

{#snippet legal()}
<p>© Monytri 2023&nbsp; |&nbsp;</p>
<p>
	<a href="https://monytri.com/legal-documents/">Legal documents</a>&nbsp; |&nbsp; 
</p>
<p>
	<a href="https://monytri.com/privacy-policy/">Privacy Policy</a>&nbsp; |&nbsp; 
</p>
<p>
	<a href="https://monytri.com/cookie-policy-eu/" target="_blank" rel="noopener">Cookie Policy</a>
</p>
{/snippet}

<!-- desktop footer -->
<div class="footer-one">    
    <section>
        <Logo name={true}/>
    </section>
    <nav>
        <section class="footer-link-list">
            {@render about()}
        </section>
        <section class="footer-link-list">
            {@render social()}
        </section>
    </nav>
</div>

<nav class="footer-two">
    <span class="legal">
        {@render legal()}
    </span>
    <a href="#top">Back to top</a>
</nav>


<!-- mobile navigation -->
<!-- add this to a component -->
<nav class="mobile-nav">
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
			<button href="/transactions" class:active={navSelect === 'transactions'} onclick={() => (goto('/transactions'))} aria-label="transactions">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 4.8a7.2 7.2 0 1 1-7.195 6.932.9.9 0 1 0-1.799-.064A9 9 0 1 0 6 5.292V3.9a.9.9 0 0 0-1.8 0v3.6a.9.9 0 0 0 .9.9h3.6a.9.9 0 0 0 0-1.8H7.237A7.176 7.176 0 0 1 12 4.8Zm.6 2.7a.9.9 0 0 0-1.8 0v4.8a.9.9 0 0 0 .9.9h3.6a.9.9 0 1 0 0-1.8h-2.7V7.5Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/stock-overview" class:active={navSelect === 'stock'} onclick={() => (goto('/stock-overview'))} aria-label="stock overview">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 11.75V7.5c0-.417.146-.77.438-1.062A1.451 1.451 0 0 1 9.5 6c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v4.25c0 .417-.146.771-.437 1.063a1.442 1.442 0 0 1-1.063.437c-.417 0-.771-.146-1.062-.437A1.453 1.453 0 0 1 8 11.75Zm5-.225V3.5c0-.417.146-.77.438-1.062A1.451 1.451 0 0 1 14.5 2c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v8.025c0 .5-.154.875-.462 1.125-.308.25-.654.375-1.038.375a1.6 1.6 0 0 1-1.037-.375c-.307-.25-.462-.625-.463-1.125Zm-10 3.45V11.5c0-.417.146-.77.438-1.062A1.452 1.452 0 0 1 4.5 10c.416 0 .77.145 1.063.438.293.293.438.647.437 1.062v3.475c0 .5-.154.875-.462 1.125-.308.25-.654.375-1.038.375a1.6 1.6 0 0 1-1.037-.375c-.307-.25-.462-.625-.463-1.125Zm2.4 6.075c-.433 0-.738-.204-.913-.612-.175-.408-.104-.77.213-1.088l4.1-4.1a1 1 0 0 1 .663-.3.894.894 0 0 1 .687.25L13 17.65l5.6-5.6H18a.965.965 0 0 1-.712-.288.973.973 0 0 1-.288-.712c0-.283.095-.52.288-.712A.97.97 0 0 1 18 10.05h3c.283 0 .521.096.713.288.192.192.288.43.287.712v3a.968.968 0 0 1-.288.713.964.964 0 0 1-.712.287.973.973 0 0 1-.712-.288.965.965 0 0 1-.288-.712v-.6l-6.25 6.25a1 1 0 0 1-.663.3.894.894 0 0 1-.687-.25L9.55 17.3 6.1 20.75a1.097 1.097 0 0 1-.312.213.89.89 0 0 1-.388.087Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/how-it-works" class:active={navSelect === 'how-it-works'} onclick={() => (goto('/how-it-works'))} aria-label="how it works">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.75 3.773h-5.363c-1.15 0-2.275.33-3.243.954L12 5.461l-1.144-.734a5.982 5.982 0 0 0-3.244-.954H2.25a.75.75 0 0 0-.75.75v13.313c0 .415.335.75.75.75h5.362c1.151 0 2.276.33 3.244.954l1.04.67c.031.019.066.03.102.03.035 0 .07-.009.1-.03l1.041-.67a6.009 6.009 0 0 1 3.248-.954h5.363a.75.75 0 0 0 .75-.75V4.523a.75.75 0 0 0-.75-.75ZM7.613 16.898H3.187V5.461h4.425c.83 0 1.636.237 2.333.684l1.143.734.162.105v10.829a7.67 7.67 0 0 0-3.638-.915Zm13.2 0h-4.425a7.67 7.67 0 0 0-3.638.915V6.983l.162-.105 1.143-.734a4.302 4.302 0 0 1 2.332-.684h4.425v11.437ZM9.303 8.461H4.947c-.092 0-.167.08-.167.176V9.69c0 .096.075.176.167.176H9.3c.091 0 .166-.08.166-.176V8.637a.169.169 0 0 0-.164-.176Zm5.228.176V9.69c0 .096.075.176.167.176h4.352c.091 0 .166-.08.166-.176V8.637c0-.096-.075-.176-.166-.176h-4.352c-.092 0-.167.08-.167.176Zm-5.229 3.105H4.948c-.092 0-.167.08-.167.176v1.055c0 .096.075.175.167.175H9.3c.091 0 .166-.08.166-.175v-1.055a.169.169 0 0 0-.164-.176Zm9.75 0h-4.354c-.092 0-.167.08-.167.176v1.055c0 .096.075.175.167.175h4.352c.091 0 .166-.08.166-.175v-1.055a.169.169 0 0 0-.164-.176Z" fill="white"/>
				</svg>			
			</button>
		</li>
		<li>
			<button href="/settings" class:active={navSelect === 'settings'} onclick={() => (goto('/settings'))} aria-label="settings">
				<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19.9 12.661a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.791a1 1 0 0 0-1 .48l-2 3.46a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32l-1.27 1.44a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1.001 1.001 0 0 0-.12-1.17l-1.35-1.44Zm-1.49 1.34.8.9-1.28 2.22-1.18-.24a3 3 0 0 0-3.45 2l-.38 1.12h-2.56l-.36-1.14a3 3 0 0 0-3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2l.38-1.13h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="white"/>
				</svg>			
			</button>
		</li>
	</ul>
</nav>


<style>
	/*////////////////////////*/
	/* desktop footer styling */
	/*////////////////////////*/

	/* footer uppersection */
	.footer-one{
		position: relative;
		grid-column: 1/-1;
		grid-row: 1/2;
		display: flex;
		flex-direction: row;
		width: 100%;

		@container (width < 600px){
			flex-direction: column;
		}
	}
	
	.footer-one section{
		flex: 0 1 55rem;
		display: flex;
		align-items: center;
		padding: var(--body-padding);

		@container (width < 600px){
			flex-direction: column;
			flex: 0 1 100%;
			align-items:safe start;
			justify-content: center;
		}
	}
	
	.footer-one nav{
		flex: 0 1 30%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3rem;
		min-width: fit-content;
		margin-right: 3%;

		@container (width < 600px){
			padding: var(--body-padding);
		}
	}

	.footer-one nav section{
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: safe center;
		gap: 1rem;
		text-transform: capitalize;

		.links{
			display: inline;
			height: fit-content;
			width: 100%;
		}

		a{
			font-size: 12px;
		}

		h2{
			font-weight: 500;
			font-size: 1rem;
			line-height: 190%;
			text-wrap-mode: nowrap;
			width: 100%;
		}
	}

	/* footer lower section */
	.footer-two{
		position: relative;
		grid-column: 1/-1;
		grid-row: 2/3;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		align-items: center;
		padding-inline: var(--body-padding) ;
	}

	.footer-two .legal{
		display: flex;
		flex-direction: row;
		flex: 1;
		@container (width < 600px){
			align-items: start;
			padding-block: var(--body-padding);
			font-size: 12px;
		}
	}

	.footer-two .legal :nth-child(n){
		display: inline;
		height: fit-content;
		width: fit-content;
	}

	.footer-two .legal p:nth-child(1){
		color: var(--primary-darkgreen-550);
	}
	
	/* devider line */
	:is(.footer-one,.footer-two)::after{
		content: '';
		position: absolute;
		inset-inline: 0;
		top: 0;
		border: 1px solid var(--neutral-grey-footer);
		margin-inline: var(--body-padding);
	}
	
	.footer-one::after{
		margin-inline: 0;
	}
	
	/* links hover state */
	.footer-one a:hover{
		color: var(--primary-green-500);
	}

	.footer-two > a{
		@container (width < 600px){
			text-decoration: none;
			position: absolute;
			right: var(--body-padding);
			bottom: 25vh;
		}
	}

	.footer-two > a:hover{
		text-decoration: underline ;
	}

	/*///////////////////////////*/
	/* mobile navigation styling */
	/*///////////////////////////*/

	.mobile-nav{
		display: none;
	}

	
    @media 
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{
			
        .footer-one,.footer-two{
            display: none;
    	}

		.mobile-nav{
				position: relative;
				grid-column: 1/-1;
				grid-row: 1/2;
				display: grid;
				grid-template-columns: subgrid;	
				grid-template-rows: min(23px, 15%) [content-start] 2fr [content-end] min(30px, 45%);		
				width: 100cqw;
				border-radius:inherit;
				z-index: 100;
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
		}

		.mobile-nav li:nth-of-type(1):is(:hover,:focus-within,:visited) svg path,
		.mobile-nav ul li:nth-of-type(1):has(:is(a,button).active) svg path{
			fill:none !important;
			/* test */
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
</style>