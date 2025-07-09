<script>
	// revisit this to see if props are really needed
	// let {formData, button} = $props()
	import {fade} from 'svelte/transition';
	import {isMobile} from '$lib/store.js';

</script>
<section class="error-container">
	{#if $isMobile}
		<section class="error-message mobile"  transition:fade>
			<div class="error-text">
				<img src="./shared-assests/Empty-State-No-User-Found-1--Streamline-Brooklyn (Traced).png" alt="not found">
				<h2>Page Not Found</h2>
				<p>Oops! It looks like the page you're looking for doesn't exist or has moved. Please try again or go back to the home page.</p>
			</div>
			<div class="error-button-container">
				<a href="/">Back to Homepage</a>
			</div>
		</section>
	{:else}
		
		<section class="error-header"  transition:fade>
			<div class="error-header-text">
				<h2>Page Not Found</h2>
			</div>
		</section>
		
		<section class="error-message"  transition:fade>
			<img src="./shared-assests/Empty-State-No-User-Found-1--Streamline-Brooklyn (Traced).png" alt="becoming rich ">
			<p>Oops! It looks like the page you're looking for doesn't exist or has moved. Please try again or go back to the home page.</p>
			<a href="/">Back to Homepage</a>
		</section>
	{/if}
</section>

<style>

	:global(html:has(.error-container) header)  {
		display: none;
	}
	

	.error-container {
		grid-column: 1/-1 !important;
		grid-row: 1/-1 !important;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100% ;
		gap: 0;
		margin-top: 5% ;
	}
	
	.error-header {
		position: relative;
		flex: 1 1 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		margin-bottom: 0;
		gap: 24px;
	}
	
	.error-header-text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
	}
	
	.error-header h2{
		font-size: clamp(1rem, calc(1rem + 2vw), 2.7rem);
	}
	
	.error-header p{
		flex: 1 1 100%;
		text-align: center;
	}
	
	.error-button-container {
		position: absolute;
		top: 0;
		left: 0;
		width: fit-content;
		display: flex;
		flex-direction: unset;
		align-items: start;
		justify-content: space-between;
		padding:0;
	}
	
	.error-message {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1 80%;	
		width: 50ch;
		gap: 24px;
		padding-top: 3rem;
	}
	
	.error-message > * {
		/* outline: solid pink; */
	}
	
	.error-message img {
		width: fit-content;
		object-position:top center;
		object-fit: cover;
		height: auto;
	}
	
	.error-message p {
		text-align: center;
		font-size: 1.2rem;
		max-width: 50vw;
	}
	
	.error-message a {
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		min-width: 200px;
		width: fit-content;
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
			color: var(--white);
		}
		
		&:nth-of-type(2) {
			color: var(--primary-green-500);
		}
	}

	:global(.error-message.mobile) {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		container-type: inline-size;
		
		.error-text {
			flex: 1 3 80%;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100cqw;
			padding-inline: var(--body-padding);
		}

		.error-text > * {
			width: 100cqw ;
			max-width: 100%;
			margin-bottom: min(1rem,2cqh);
		}

		.error-text img {
			height: clamp(20cqw,25cqh , 30cqh);
			width: auto;
		}

		.error-text h2 {
			font-size: clamp(1.5rem, 3cqh, 4.7rem);
			font-weight: 600;
			text-align: center;
			width: 100%;
		}
	}

	.error-message.mobile .error-button-container {
		flex: 1 1 20%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1rem;
		padding-inline: var(--body-padding);
		justify-content: end;
	}

	.error-message.mobile .error-button-container a {
		width: 100%;
		padding: clamp(10px, .9rem, 1rem) 1rem;
	}


</style>
