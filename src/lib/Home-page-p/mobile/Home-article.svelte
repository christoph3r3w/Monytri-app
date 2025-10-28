	<section class="home-articles">
		<article class="invest-tips-container">
			<h2>Grow your investing skills!
				<span class="arrow-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
					</svg>
				</span>
			</h2>
			<ul class="invest-tips-list">
				<li>
					<a href="/how-it-works" aria-label="article"></a>
					<figure>
						<img src="/home-page/homescreen-piggybank.png" alt="homescreen piggybank" width="177px" height="177px">
						
						<figcaption>Ep.1</figcaption>
					</figure>
					<p>Ep.1: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
				<li>
					<a href="/how-it-works" aria-label="article"></a>
					<figure>
						<img src="/home-page/homescreen-cash.png" alt="cash" width="177px" height="177px">
						<figcaption>Ep.2</figcaption>
					</figure>
					<p>Ep.2: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
				<li>
					<a href="/how-it-works" aria-label="article"></a>
					<figure>
						<img src="/home-page/138ff1cc36a27c844ea44dbdc2a89797589052cb.png" alt="cash" width="177px" height="177px">
						<figcaption>Ep.3</figcaption>
					</figure>
					<p>Ep.3: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
			</ul>
		</article>
		<article class="recent-blogs">
			<h2>Recent Blogs
				<span class="arrow-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
					</svg>
				</span>
			</h2>

			<ul class="recent-blogs-list">
			{#each {length:3}}
			<li class="blog-container">
				<a href="/blog" aria-label="blog"></a>
				<img src="/home-page/homescreen-team.png" alt="" width="177px" height="177px">
				<div class="blog-text">
					<p class="date">date</p>
					<div class="blog-text-content">
						<p>Are you saving enough? </p>
						<p>Discover how your finances stack up in the Netherlands!</p>
					</div>
					<span>
						<img src="./" alt="chiara" width="10px" height="10px">
						<p>by Chiara</p>
					</span>
				</div>
			</li>
			{/each}
			</ul>
		</article>
	</section>

	<style>

		.invest-tips-container ul{
			overflow-x: auto;
			overflow-y: hidden;
			display: grid;
			grid-auto-columns:min-content;
			gap: 1rem;
		}

		:global(html:has(.home-wrapper) ) {
		@media (-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
			.home-articles{
				--body-padding: 5%;
				position: relative;
				display: flex;
				flex-direction: column;
				width: 100%;
				justify-content: space-between;
				height: fit-content;
				padding-top: 1rem;
				padding-inline: var(--body-padding);
			}

			.invest-tips-container{
				margin-bottom: 3vh;
				container-name:invest-tips-container; 
			}

			.invest-tips-container h2{
				font-size: 1.2rem;
				color: var(--general-text-color);
				font-weight: 400;
				line-height: 25px;
				margin-bottom: 2%;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.arrow-icon svg path{
				fill: var(--general-text-color);
			}

			.invest-tips-container ul{
				overflow-x: auto;
				overflow-y: hidden;
				display: grid;
				grid-auto-flow:column;
				grid-auto-columns: clamp(50%, 50%, 300px);
				gap: 1rem;
				height: 30% ;
				max-height: fit-content;
			}

			.invest-tips-container ul li{
				position: relative;
				width: 90%;
				height: auto;
				aspect-ratio: 1;
				display: flex;
				flex-direction: column;
			}

			.invest-tips-container ul li a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.invest-tips-container ul li figure{
				position: relative;
				width: 100%;
				height: 100%;
				margin-bottom: 3%;
			}

			.invest-tips-container ul li figure img{
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px;
			}

			.invest-tips-container ul li figure figcaption{
				position: absolute;
				top: 7px;
				left: 7px;
				background-color: #f9f7f4d6;
				color: var(--black);
				font-size: 1rem;
				padding: 0.5rem ;
				border-radius: 8px;
			}

			.invest-tips-container ul li p{
				font-size: 14px;
				color: var(--general-text-color);
				font-weight: 400;
				line-height: 120%;
			}

			.invest-tips-container ul li p:nth-of-type(2){
				font-size: 12px;
				color: var(--general-text-color-secondary);
				font-weight: 400;
			}

			.recent-blogs{
				margin-bottom: var(--footer-height,3rem);
				display: flex;
				flex-direction: column;
			}
			
			.recent-blogs h2{
				font-size: 1.2rem;
				color: var(--general-text-color);
				font-weight: 400;
				line-height: 25px;
				margin-bottom: 2%;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.recent-blogs .recent-blogs-list{
				box-sizing: content-box;
				display: grid;
				height: fit-content;
				grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
				gap: 1rem;

			}

			.recent-blogs .blog-container{
				position: relative;
				display: flex;
				flex-direction: row;
				width: 100%;
				max-width:400px ;
				height: 177px;
				container-type: inline-size;
				margin-bottom: 3%;
			}

			.recent-blogs .blog-container a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.recent-blogs .blog-container img{
				width: 50%;
				height: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px 0 0 10px;
			}

			.recent-blogs .blog-text{
				display: flex;
				flex-direction: column;
				justify-content:safe;
				padding: 11px 3%;
				width: 50%;
				height: 100%;
				background-color: color-mix(in srgb, var(--white), var(--general-background-color) 50%);
				border-radius: 0 10px 10px 0;
			}

			.recent-blogs .blog-text .date{
				font-size: 12px;
				color: var(--general-text-color-secondary);
				font-weight: 400;
				line-height: 120%;
			}
			
			.recent-blogs .blog-text .blog-text-content{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-top: 3%;
			}

			.recent-blogs .blog-text .blog-text-content p:not(.date){
				font-size: 14px;
				color: var(--black);
				font-weight: 400;
				line-height: 120%;
			}

			/* author blog name */
			.recent-blogs .blog-text span{
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 2%;
			}

			.recent-blogs .blog-text span img{
				width: 20px;
				height: 20px;
				aspect-ratio: 1;
				object-fit: cover;
				object-position:left center;
				border-radius: 50%;
				outline: solid 1px;
			}

			.recent-blogs .blog-text span p{
				font-size: 12px;
				color: var(--grey-400);
				font-weight: 400;
				line-height: 120%;
			}
		}
	}

	@media (width >= 600px) {
		.invest-tips-container ul{
			grid-auto-flow: column;
			grid-auto-columns: 200px !important;
		}
	}
		
	@media (prefers-color-scheme: dark){
		* img{
			filter: brightness(.9);
		}
	}

	</style>