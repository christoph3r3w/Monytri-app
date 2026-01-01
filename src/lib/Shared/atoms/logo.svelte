<script>
 let {name = false} = $props();
</script>

<a href="/" class="logo">
	<picture>
		<img src={`/Monytri-01-1.png`} alt="logo" width="40px" />	</picture>
	{#if name}
		<span class="logo-name">monytri</span>
	{/if}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		width: clamp(100px, fit-content, 10vw);
		gap: 5px;
		color: var(--general-text-color);
		overflow: hidden;
		transition: padding .8s ease-out;
			/* outline: rgb(25, 0, 255) solid; */

	}
	
	picture {
		flex: 0 0 fit-content;
		width: fit-content;
		height: fit-content;
		transition: .5s ease;
		z-index: 10;
	}

	picture img {
		aspect-ratio: 1 / 1;
		width: 40px;
		overflow: hidden;
		@starting-style{
			width: 40px;
		}
	}
	
	.logo-name {
		flex: 0 0 fit-content;
		font-size: clamp(1rem,2rem,2rem);
		font-weight: 600;
		text-transform: capitalize;
		width: fit-content;
		line-height: 120%;
		overflow: hidden;
		transition: .4s ease-out;

	}

	/* small logo test aniamtion  */
	


</style>