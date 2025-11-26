<script>

let {blogs,podcasts,videos} = $props();

let investTips = podcasts || [
	{
		ep: '1',
		title: 'Why Monytri?',
		subtitle: 'With Chiara & David',
		bannerImage:{imageUrl:'/home-page/homescreen-piggybank.png', altText:'homescreen piggybank'},
		link:'/how-it-works'
	},
	{
		ep: '2',
		title: 'Why Monytri?',
		subtitle: 'With Chiara & David',
		bannerImage:{imageUrl:'/home-page/homescreen-cash.png', altText:'homescreen cash'},
		link:'/how-it-works'
	},
	{
		ep: '3',
		title: 'Why Monytri?',
		subtitle: 'With Chiara & David',
		bannerImage:{imageUrl:'/home-page/138ff1cc36a27c844ea44dbdc2a89797589052cb.png', altText:'homescreen cash'},
		link:'/how-it-works'
	}
];

let videoBlogs = videos || [
	{
		ep: '1',
		link:'/blog',
		bannerImage:{imageUrl:'/shared-assests/edu-video-img.png', altText:''},
		publishedAt:'date',
		title:'Investing 101',
		subtitle:'In this episode Chiara is braking down the ins and outs of investing and where to start as a beginner.',
		host :{profileImg:'', name:'Chiara'}
	},
	{
		ep: '2',
		link:'/blog',
		bannerImage:{imageUrl:'/shared-assests/edu-video-img.png', altText:''},
		publishedAt:'date',
		title:'Are you saving enough?',
		subtitle:'Discover how your finances stack up in the Netherlands!',
		host :{profileImg:'', name:'Chiara'}
	},
	{
		ep: '3',
		link:'/blog',
		bannerImage:{imageUrl:'/shared-assests/edu-video-img.png', altText:''},
		publishedAt:'date',
		title:'Are you saving enough?',
		subtitle:'Discover how your finances stack up in the Netherlands!',
		host :{profileImg:'', name:'Chiara'}
	}
];

let recentBlog = blogs || [
	{
		link:'/blog',
		bannerImage:{imageUrl:'/home-page/homescreen-team.png', altText:''},
		publishedAt:'date',
		title:'Are you saving enough?',
		subtitle:'Discover how your finances stack up in the Netherlands!',
		author :{profileImg:'', name:'Chiara'}
	},
	{
		link:'/blog',
		bannerImage:{imageUrl:'/home-page/homescreen-team.png', altText:''},
		publishedAt:'date',
		title:'Are you saving enough?',
		subtitle:'Discover how your finances stack up in the Netherlands!',
		author :{profileImg:'', name:'Chiara'}
	},
	{
		link:'/blog',
		bannerImage:{imageUrl:'/home-page/homescreen-team.png', altText:''},
		publishedAt:'date',
		title:'Are you saving enough?',
		subtitle:'Discover how your finances stack up in the Netherlands!',
		author :{profileImg:'', name:'Chiara'}
	}
]

</script>
<section class="edu-articles">
		<article class="invest-tips article-container">
			<h2>Listen in!
				<span class="arrow-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
					</svg>
				</span>
			</h2>
			<ul class="invest-tips-list">
			{#each investTips as article}
				<li>
					<a href={article.link} aria-label="article"></a>
					<figure>
						<img src={article.bannerImage?.imageUrl} alt={article.bannerImage?.altText} width="177px" height="177px">
						
						<figcaption>Ep.{article.episodeNumber}</figcaption>
					</figure>
					<p>Ep.{article.episodeNumber}: {article.title} {#if article.guest} with {article.guest} {/if}</p>
					<p>
						{#if article.subtitle}
							{article.subtitle}
						{:else if article.host?.length}
							with {article.host[0].name}
							{#each article.host.slice(1) as host}
								& {host.name}
							{/each}
						{/if}
					</p>
				</li>
			{/each}
			</ul>
		</article>

		<article class="article-container video-blogs">
				<h2>Watch & Learn!
				<span class="arrow-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.6919 12.2869C21.6539 12.3789 21.599 12.4618 21.53 12.5308L14.53 19.5308C14.384 19.6768 14.192 19.7508 14 19.7508C13.808 19.7508 13.616 19.6778 13.47 19.5308C13.177 19.2378 13.177 18.7628 13.47 18.4698L19.1899 12.7498H3C2.586 12.7498 2.25 12.4138 2.25 11.9998C2.25 11.5858 2.586 11.2498 3 11.2498H19.189L13.469 5.52981C13.176 5.23681 13.176 4.76177 13.469 4.46877C13.762 4.17577 14.237 4.17577 14.53 4.46877L21.53 11.4688C21.599 11.5378 21.6539 11.6207 21.6919 11.7127C21.7679 11.8967 21.7679 12.1029 21.6919 12.2869Z" fill="#313131"/>
					</svg>
				</span>
			</h2>
			<ul class="video-blogs-list">
			{#each videoBlogs as article}
				<li class="blog-container">
					<a href={article.link} aria-label="article"></a>
					<figure>
						<img src={article.bannerImage?.imageUrl} alt={article.bannerImage?.altText} width="177px" height="177px">
						{#if article.episodeNumber}
							<figcaption>Ep.{article.episodeNumber}</figcaption>
						{/if}
					</figure>

					<div class="blog-text">
						<div class="blog-text-content">
							<h3>Ep.{article.episodeNumber}: {article.title}</h3>
							<p>{article.description || article.subtitle}</p>
						</div>
						<span>
							{#if article.host.profileImg}
								<img src={article.host.profileImg} alt={article.host.name} width="10px" height="10px">
							{/if}
						
							<p>
								{#if article.host?.length}
										with {article.host[0].name}
									{#each article.host.slice(1) as host}
										& {host.name}
									{/each}
								{/if}
							</p>
						</span>
					</div>
				</li>
			{/each}
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
			{#each recentBlog as blog}
			<li class="blog-container">
				<a href={blog.link || '/blog'} aria-label="blog"></a>
				<img src={blog.bannerImage?.imageUrl} alt={blog.bannerImage?.altText} width="177px" height="177px">
				<div class="blog-text">
					<p class="date">{blog.publishedAt || 'date'}</p>
					<div class="blog-text-content">
						<p>{blog.title}</p>
						<p>{blog.subtitle}</p>
					</div>
					<span>
						{#if blog.author.profileImg}
							<img src={blog.author.profileImg} alt={blog.author.name} width="10px" height="10px">
						{/if}
						<p>by {blog.author.name}</p>
					</span>
				</div>
			</li>
			{/each}
			</ul>
		</article>
	</section>

	<style>

		.article-container ul{
			display: grid;
			grid-auto-columns:min-content;
			gap: 1rem;

			overflow: hidden;
		}

		.edu-articles{
			overflow-x: hidden;
			overflow-y: auto;
		}

		.edu-articles article{
			margin-bottom: 1.5dvh;
		}
		
	/* @media 
		(-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) { */

			.edu-articles{
				--body-padding: 5%;
				position: relative;
				display: flex;
				flex-direction: column;
				width: 100%;

				justify-content: space-between;
				height: fit-content;
				overflow-y: auto;
			}

			.invest-tips{
				container-name:invest-tips; 
			}

			.article-container h2{
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

			.article-container ul{
				overflow-x: auto;
				overflow-y: hidden;
				display: grid;
				grid-auto-flow:column;
				grid-auto-columns: clamp(50%, 50%, 300px);
				gap: 1rem;
				min-height: 30% ;
			}

			.article-container ul li{
				position: relative;
				width: 90%;
				height: auto;
				aspect-ratio: 1;
				display: flex;
				flex-direction: column;
			}

			.article-container li a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.article-container figure{
				position: relative;
				width: 100%;
				height: 100%;
				margin-bottom: 3%;
			}

			.article-container figure img{
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px;
			}

			.article-container ul li figure figcaption{
				position: absolute;
				top: 7px;
				left: 7px;
				background-color: #f9f7f4d6;
				color: var(--black);
				font-size: 1rem;
				padding: 0.5rem ;
				border-radius: 8px;
			}

			.article-container li p{
				font-size: 14px;
				color: var(--general-text-color);
				font-weight: 400;
				line-height: 120%;
			}

			.article-container li p:nth-of-type(2){
				font-size: 12px;
				color: var(--general-text-color-secondary);
				font-weight: 400;
			}

			ul.video-blogs-list{
				overflow-x: auto;
				overflow-y: hidden;
				display: grid;
				grid-auto-flow:column;
				grid-auto-columns: clamp(50%, 100cqw, 350px)!important;
				gap: 1rem;
				min-height: 30% ;
				
			}

			.video-blogs-list li.blog-container {
				position: relative;
				display: flex;
				flex-direction: row;
				width: 100%;
				max-width:400px ;
				height: 177px;
				container-type: inline-size;
				overflow: visible;
			}

			.video-blogs-list .blog-container a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.video-blogs-list .blog-container figure{
				min-width: 200px;
				width: 75%;
				height: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px 0 0 10px;
			}

			.video-blogs-list .blog-container .blog-text{
				width: 100%;
			}

			.recent-blogs{
				margin-bottom: 3rem;
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
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
				gap: 1rem;
				height: 100%;
			}

			.blog-container{
				position: relative;
				display: flex;
				flex-direction: row;
				width: 100%;
				max-width:400px ;
				height: 177px;
				container-type: inline-size;
				margin-bottom: 3%;
			}

			.blog-container a{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.blog-container img{
				width: 50%;
				height: 100%;
				aspect-ratio: 1;
				object-fit: cover;
				object-position: center center;
				border-radius: 10px 0 0 10px;
			}

			.blog-container .blog-text{
				display: flex;
				flex-direction: column;
				justify-content:safe;
				padding: 11px 3%;
				width: 50%;
				height: 100%;
				background-color: color-mix(in srgb, var(--white), var(--general-background-color) 50%);
				border-radius: 0 10px 10px 0;
			}

			.blog-container .blog-text .date{
				font-size: 12px;
				color: var(--general-text-color-secondary);
				font-weight: 400;
				line-height: 120%;
			}
			
			.blog-container .blog-text .blog-text-content{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-top: 3%;
			}

			.blog-container .blog-text-content h3{
				font-weight: 500;
				margin-bottom: 4%;
			}

			.blog-container .blog-text .blog-text-content p:not(.date){
				font-size: 14px;
				color: var(--black);
				font-weight: 400;
				line-height: 120%;
			}

			/* author blog name */
			.blog-container .blog-text span{
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 2%;
			}

			.blog-container .blog-text span img{
				width: 20px;
				height: 20px;
				aspect-ratio: 1;
				object-fit: cover;
				object-position:left center;
				border-radius: 50%;
				outline: solid 1px;
			}

			.blog-container .blog-text span p{
				font-size: 12px;
				color: var(--grey-400);
				font-weight: 400;
				line-height: 120%;
			}


	/* } */
	

	@media (width >= 600px) {
		.article-container ul{
			grid-auto-flow: column;
		}
	}
		
	@media (prefers-color-scheme: dark){
		* img{
			filter: brightness(.9);
		}
	}
</style>