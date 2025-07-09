<script>
	export let name = false;
</script>

<a href="/">
	<picture>
		<img src="Monytri-01-1.png" alt="logo" width="40px" />
	</picture>
	{#if name}
		<h1>monytri</h1>
	{/if}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		width: clamp(100px, fit-content, 10vw);
		gap: 5px;
		color: var(--black);
		overflow: hidden;
		transition: padding .8s ease-out;
	}
	
	picture {
		flex: 0 0 fit-content;
		width: fit-content;
		height: fit-content;
		transition: .5s ease;
		z-index: 10;
		background-color: var(--general-background-color);
	}

	picture img {
		aspect-ratio: 1 / 1;
		width: 40px;

		@starting-style{
			width: 40px;
		}
	}
	
	h1 {
		flex: 0 0 fit-content;
		font-size: clamp(1rem,2rem,2rem);
		font-weight: 600;
		text-transform: capitalize;
		width: fit-content;
		overflow: hidden;
		transition: .4s ease-out;
	}

	/* small logo test aniamtion  */
	/* @media screen and (width < 730px){
		a{
			width: 50%;
			padding-left: var(--body-padding);
		}

		image{
			width: 50px;
		}

		h1{
			transform: translateX(-100%);
			cursor: none;
			opacity: 0;
		}
	} */


</style>