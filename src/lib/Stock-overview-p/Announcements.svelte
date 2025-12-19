<script>
	let {announcements} = $props();	
</script>

	<ul class="announcements-list">
		{#each announcements as {bannerImage, uploadDate, title, partner, link, backgroundColor} }
		<li class="announcements-contain blog-container" style="--bg-color:{backgroundColor || bannerImage?.bgColor}; --bg-position:{bannerImage?.bgPosition || 'contain'};">
			<a href={link || "/blog"} aria-label="blog"></a>
			<img src={bannerImage || '/home-page/homescreen-team.png'} alt="" width="177px" height="177px">
			<div class="blog-text">
				<p class="date">{uploadDate}</p>
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
	grid-template-rows: auto;
	justify-items: end;
	align-items: start;
	height: clamp(2dvh, 40dvh, 800px);
	max-height:fit-content;
	max-width: 100%;
	width: 100%;
	gap: calc(var(--gap)/ 2);
	border-radius: .5rem;
	box-shadow: rgba(236, 236, 236, 0.199) 0px 0px 15px 0px;
	overflow: visible;

	container-type: inline-size;	
	/* debugging */
	/* outline: tomato solid; */
}

.announcements-list li{
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: clamp(0px, 1px + 2%, 2lvw);
	width: 100%;
	max-width: 100%;
	height: 110px;
	min-height: 2rem;
	border-radius: 10px;
	background-color: var(--bg-color ,var(--general-background-color-secondary));

	container-type: inline-size;	
	/* debugging */
	/* outline: yellow solid; */
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

@media 	(-webkit-min-device-pixel-ratio: 3),
	screen and (device-width < 900px) and (width <= 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (height <= 900px) and  (orientation: landscape)
	{
		.announcements-list{
			height: clamp(2dvh, 70dvh, 300vh);
			max-height:fit-content; 
			gap: calc(var(--gap)/ 6);
		}
	}

</style>