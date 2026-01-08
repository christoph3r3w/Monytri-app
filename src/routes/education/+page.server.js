import {databases} from '$lib/appwrite';
import { Query } from 'appwrite';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const databaseId = '68d64fa40019a32f0f67';
	const blogPostId = '6924e2a10003574f80bd';
	const podcastId = '6925a7f8002b0f3c133c';
	const videoBlogsId = '6925c66800147b460e8f';

	let posts = null;
	let podcasts = null;
	let videoBlogs = null;
	

	try {
		posts = await databases.listDocuments(databaseId,blogPostId,[
			Query.equal('isPublished', true),
			Query.orderDesc('$createdAt'),
			Query.limit(10),
			Query.select(['title','subtitle','link','bannerImage.*','author.*','category.*','isPublished'])
		]);
		
		podcasts = await databases.listDocuments(databaseId,podcastId,[
			Query.orderDesc('releaseDate'),
			Query.limit(6),
			Query.select(['title','episodeNumber','link','bannerImage.*','host.*','category.*','guest'])
		]);

		videoBlogs = await databases.listDocuments(databaseId,videoBlogsId,[
			Query.orderAsc('uploadDate'),
			Query.limit(5),
			Query.select(['title','link','bannerImage.*','host.*','category.*','description','episodeNumber'])
		]);	

	} catch (err) {
		console.error('Appwrite client error:', err);
	}
	
	return {
		data: {
			blogs: posts.documents ?? [], 
			podcasts: podcasts.documents ?? [],
			videos: videoBlogs.documents ?? []
		}
	};
}

