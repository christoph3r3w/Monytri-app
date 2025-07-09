{#snippet routes()}
	<li><a href="/">home</a></li>
	<li><a href="/gift">gift</a></li>
	<li><a href="/how-it-works">how it works</a></li>
	<li><a href="/learn-more">learn more</a></li>
{/snippet}


<nav class="dropdown-menu">
	<section class="header-routes">
		<ul>
			{@render routes()}
		</ul>
	</section>
	<section class="general">
		<h3>General</h3>
		<ul>
			<li>
				<svg></svg>
				<a href="/">Manage account</a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Security & Login</a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Linked Bank Card</a>
			</li>
		</ul>
	</section>
	<section class="session-notification">
		<h3>Session & Notification</h3>
		<ul>
			<li>
				<svg></svg>
				<a href="/">Upcoming sessions </a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Reminders </a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Notifications</a>
			</li>
		</ul>
	</section>
	<section class="help">
		<h3>Help</h3>
		<ul>
			<li>
				<svg></svg>
				<a href="/">Privacy Policy</a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Contact Support</a>
			</li>
			<li>
				<svg></svg>
				<a href="/">Log out</a>
			</li>
		</ul>
	</section>
</nav>

<style>
	nav.dropdown-menu{
		position: absolute;
		top: var(--header-height);
		right: var(--body-padding);
		width: clamp(200px, 50%, 300px);
		background-color: var(--general-background-color);
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		overflow-x: hidden;
		overflow-y: auto;
		padding-inline: 24px;
		padding-block: 1rem;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;		
		z-index: 20;
	}
	
	nav.dropdown-menu section{
		display: flex;
		flex-direction: column;
		margin-bottom: 1.2rem;	
	}
		
	nav.dropdown-menu section h3{
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--black);
		margin-bottom: 1rem;
	}
		
	nav.dropdown-menu section ul{
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		gap: 1px;
	}
		
	nav.dropdown-menu section ul li{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 3%;
		background-color: var(--white);
		
		&:nth-of-type(1){
			border-radius: 8px 8px 0 0;
		}
		
		&:nth-last-of-type(1){
			border-radius: 0 0 8px 8px;
		}
	}
	
	nav.dropdown-menu section ul li a{
		font-size: 14px;
		font-weight: 400;
		color: var(--black);
		width: 100%;
		right: 0;
		left: 0;
		top: var(--header-height);
		bottom: var(--footer-height);
	}
	nav.dropdown-menu section.header-routes{
		display: flex;
		align-items: center;
			
		&:hover{
			text-decoration: underline;
		}
	}
	
	nav.dropdown-menu section ul li svg {
		width: 20px;
		aspect-ratio: 1;
		background-color: var(--primary-green-500);
		margin: 2%;
		border-radius: 50%;
	}
	
	nav.dropdown-menu section.header-routes{
		display: none ;
	}
	
	
	@media screen and (width < 730px){
		nav.dropdown-menu{
			width: 100%;
			right: 0;
			left: 0;
			top: var(--header-height);
			bottom: 20vh;
		}
		
		nav.dropdown-menu section.header-routes{
			display: flex;
		}
		
		nav.dropdown-menu section.header-routes ul {
			gap: 3px;
		}
		
		nav.dropdown-menu section.header-routes li a {
			font-size: 1.5rem;
			color: var(--primary-green-500);
		}
	}

	@media 
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi) ,
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait) , 
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)
		{
			nav.dropdown-menu{
				position: relative;
				z-index: 0 !important;
				top: 0;
				bottom: 0;
				box-shadow: none;
			}

			nav.dropdown-menu section.header-routes{
				display: none;
			}
		}
</style>