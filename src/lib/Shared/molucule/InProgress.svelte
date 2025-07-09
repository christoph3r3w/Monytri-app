<article class="message-container">
	<header class="message-header">
		<h2>in progress</h2>
	</header>
	<section class="message-body">
		<img src="./shared-assests/team-brainstorming.png" alt="team-brainstorming">
		<p>Oops! Looks like you've stumbled upon a page that's still under construction. Our team is working hard to bring this content to life. In the meantime, feel free to return to our home page.</p>
		<a href="/" >
			go home
		</a>
	</section>
</article>


<style>

	:global(html:has(.message-container) main)  {
		overflow: hidden;
	}

	*{
		user-select: none;
	}

	.message-container {
		--rad:clamp(5px, 5vw, 10px);
		position: absolute;
		width: 30dvw;
		height: auto;
		inset-inline: 31vw;
		padding-top: 30%;
		z-index: 101;
	}

	.message-header {
		position: relative;
		background-color: var(--primary-green-500);
		color: white;
		padding: 10px;
		border-radius: var(--rad) var(--rad) 0 0;
		width: 100%;
		height: 10%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* display: none; */
	}

	.message-body {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgb(255, 255, 255);
		color: black;
		padding: 20px;
		border-radius: 0 0 var(--rad) var(--rad);
		width: 100%;
		height: 50%;
		text-align: center;
	}

	.message-body img {
		position: relative;
		width: auto;
		height: fit-content;
	}

	.message-body p {
		text-align: center;
		font-size: 1.2rem;
		max-width: 50vw;
	}

	a{
		position: relative;
		bottom: var(--body-padding);
		right:0;
		width:50%;
		padding: clamp(1rem,1vw,1rem);
		background-color: #4B7A5B;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		align-self: center;
		margin-top: auto;
	}

	@media (-webkit-min-device-pixel-ratio: 3),
	(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
	screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
	screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {

		:global(html:has(.message-container) main)::after {
			content: '';
			position: absolute;
			inset: 0 -30dvw;
			background-color: color-mix( in srgb, rgba(243, 243, 243, 0.549), var(--primary-green-500) 20%);
			/* backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px); */
			z-index: 10;
			/* display: none; */
		}

		.message-container {
			position: relative;
			padding: 20px;
			grid-column: content;
			top: 0;
			left: 0;
			height: 99svh;
		}

		.message-header {
			display: none !important;
		}

		.message-body {
			grid-column: 1 / -1;
			width: 100%;
			height: fit-content;
			/* height: calc(100% - clamp(1rem,16dvh,100%)); */
			justify-content: flex-start;
			background-color: unset;
			padding: unset;
		}

		.message-body img {
			width: clamp(10dvh,100%,35dvh);
			height: auto;
		}

		.message-body p {
			width: 100%;
			max-width: 100%;
			margin-bottom: 0;
			font-size: clamp(1rem, 2dvh, 1.2rem);
			margin-bottom: min(10%,10px);
		}

		a {
			position: relative;
			width: 100%;
			right: 0;
			bottom: auto;
			align-self: flex-end;
			margin-top: auto;
			z-index: 0;
		}
	}

</style>