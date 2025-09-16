<script>
	import { base } from '$app/paths';
	let {} = $props();

	let announcements = [
		{
			img: {src:`/announcment-c/Announcement money.png`,bgColor:"#FFF3E0",bgPosition:"contain"},
			date: "1 Sep 2025",
			title: "Sign up with BUX and get €100 free for you to invest!",
			partner: "Bux",
			link: "/blog"
		},
		{
			img: {src:`/announcment-c/Teamwork-5--Streamline-Brooklyn (Traced) .png`,bgColor:"#f2eade",bgPosition:"contain"},
			date: "29 Aug 2024",
			title: "Refer a friend and get €20 EACH when they sign up!",
			partner: "Avatrade",
			link: "/blog"
		},
		{
			img: {src:`/announcment-c/Announcement Orange.png`,bgColor:"#ff6d3a",bgPosition:"contain"},
			date: "23 Aug 2024",
			title: "Investor Today has some new stocks for you!",
			partner: "Investor Today",
			link: "/blog"
		},
		{
			img: {src:`/home-page/homescreen-team.png`,bgColor:"white",bgPosition:"cover"},
			date: "Aug 20, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		},
		{
			img: {src:`/home-page/homescreen-team.png`,bgColor:"#E3F2FD",bgPosition:"cover"},
			date: "Aug 20, 2023",
			title: "Are you saving enough?",
			partner: "Monytri",
			link: "/blog"
		}
	];
</script>

	<ul class="announcements-list">
		{#each announcements as {img, date, title, partner, link} }
		<li class="announcements-contain blog-container" style="--bg-color:{img.bgColor}; --bg-position:{img.bgPosition}">
			<a href={link || "/blog"} aria-label="blog"></a>
			<img src={img.src || `/home-page/homescreen-team.png`} alt="" width="177px" height="177px">
			<!-- <img src={img.src || `${base}/home-page/homescreen-team.png`} alt="" width="177px" height="177px"> -->
			<div class="blog-text">
				<p class="date">{date}</p>
				<div class="blog-text-content">
					<p>{title}</p>
				</div>
				<span>
					<p>from {partner || 'partner'}</p>
				</span>
			</div>
		</li>
		{/each}
	</ul>

<style>


.announcements-list{
	position: relative;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	max-height:fit-content;
	min-height: 100%;
	max-width: 100%;
	width: 100%;
	gap: calc(var(--gap)/ 2);
	border-radius: .5rem;
	box-shadow: rgba(236, 236, 236, 0.199) 0px 0px 15px 0px;
}

.announcements-list li{
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	width: 100%;
	max-width: 100%;
	height: 110px;
	min-height: 2rem;
	border-radius: 10px;
	background-color: var(--bg-color ,var(--general-background-color-secondary));
	
	container-type: inline-size;	
}

.announcements-list li a{
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
}
	
.announcements-list .blog-container img{
	max-width: 50%;
	height: auto;
	object-fit: var(--bg-position);
	object-position: center;
	border-radius: 10px 0 0 10px;
	margin: 2%;
}
	
.announcements-list .blog-text{
	display: flex;
	flex-direction: column;
	justify-content:safe;
	padding: 11px 3%;
	width: clamp(50%,50%,60%);
	height: 100%;
	border-radius: 0 10px 10px 0;
}
	
.announcements-list .blog-text .date{
	font-size: 12px;
	font-weight: 400;
	line-height: 120%;
	color: var(--general-text-color-secondary);
}
	
.announcements-list .blog-text .blog-text-content{
	flex: 1;
	display: flex;
	flex-direction: column;
	padding-top: 3%;
}
	
.announcements-list .blog-text .blog-text-content p:not(.date){
	color: var(--general-text-color);
	font-size: 14px;
	font-weight: 400;
	line-height: 120%;
}
	
/* author blog name */
.announcements-list .blog-text span{
	flex-direction: row;
	align-items: end;
	gap: 2%;
	display: flex;
	margin-top: 5%;
}
	
.announcements-list .blog-text span p{
	color: var(--general-text-color-secondary);
	font-size: 12px;
	font-weight: 400;
	line-height: 120%;
}	
</style>