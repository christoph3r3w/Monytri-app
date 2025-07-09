	<section class="home-articles">
		<article class="invest-tips">
			<h2>Grow your investing skills!<span><img src="./home-page/arrow-right.png" alt=""></span></h2>
			<ul>
				<li>
					<a href="/how-it-works"></a>
					<figure>
						<img src="./home-page/homescreen-piggybank.png" alt="homescreen piggybank" width="177px" height="177px">
						
						<figcaption>Ep.1</figcaption>
					</figure>
					<p>Ep.1: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
				<li>
					<a href="/how-it-works"></a>
					<figure>
						<img src="./home-page/homescreen-cash.png" alt="cash" width="177px" height="177px">
						<figcaption>Ep.2</figcaption>
					</figure>
					<p>Ep.2: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
				<li>
					<a href="/how-it-works"></a>
					<figure>
						<img src="./home-page/homescreen-cash.png" alt="cash" width="177px" height="177px">
						<figcaption>Ep.3</figcaption>
					</figure>
					<p>Ep.3: Why Monytri?</p>
					<p>With Chiara & David</p>
				</li>
			</ul>
		</article>
		<article class="recent-blogs">
			<h2>Recent Blogs<span><img src="./home-page/arrow-right.png" alt=""></span></h2>
			<div class="blog-container">
				<a href="/blog"></a>
				<img src="./home-page/homescreen-team.png" alt="" width="177px" height="177px">
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
			</div>
		</article>
	</section>

	<style>
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

			.invest-tips{
				margin-bottom: 3vh;
			}

			.invest-tips h2{
				font-size: 1.2rem;
				color: var(--black);
				font-weight: 400;
				line-height: 25px;
				margin-bottom: 2%;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.invest-tips ul{
				overflow-x: auto;
				overflow-y: hidden;
				display: grid;
				grid-auto-flow:column;
				grid-auto-columns: 50%;
				gap: var(--body-padding);
			}

			.invest-tips ul li{
				position: relative;
				width: 90%;
				display: flex;
				flex-direction: column;
			}

			.invest-tips ul li a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.invest-tips ul li figure{
				position: relative;
				width: 100%;
				height: 100%;
				margin-bottom: 3%;
			}

			.invest-tips ul li figure img{
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px;
			}

			.invest-tips ul li figure figcaption{
				position: absolute;
				top: 7px;
				left: 7px;
				background-color: #f9f7f4d6;
				color: var(--black);
				font-size: 1rem;
				padding: 0.5rem ;
				border-radius: 8px;
			}

			.invest-tips ul li p{
				font-size: 14px;
				color: var(--black);
				font-weight: 400;
				line-height: 120%;
			}

			.invest-tips ul li p:nth-of-type(2){
				font-size: 12px;
				color: var(--grey-500);
				font-weight: 400;
			}

			.recent-blogs{
				margin-bottom: 3rem;
			}

			.recent-blogs h2{
				font-size: 1.2rem;
				color: var(--black);
				font-weight: 400;
				line-height: 25px;
				margin-bottom: 2%;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.recent-blogs .blog-container{
				position: relative;
				display: flex;
				flex-direction: row;
				width: 100%;
				height: clamp(fit-content, 177px, 177px);
				height: 177px;
				container-type: inline-size;
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
				background-color: var(--white);
				border-radius: 0 10px 10px 0;
			}

			.recent-blogs .blog-text .date{
				font-size: 12px;
				color: var(--grey-400);
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
		

	</style>