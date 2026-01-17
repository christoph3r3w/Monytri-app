import { createAdminClient } from '$lib/server/appwrite';
import { Query } from 'node-appwrite';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const { databases } = createAdminClient();
    const databaseId = '68d64fa40019a32f0f67';
    const blogPostId = '6924e2a10003574f80bd';
    const podcastId = '6925a7f8002b0f3c133c';
    const videoBlogsId = '6925c66800147b460e8f';

    let posts = null;
    let podcasts = null;
    let videoBlogs = null;

    try {
        posts = async () => {
            return await databases.listDocuments(databaseId,blogPostId,[
                Query.equal('isPublished', true),
                Query.orderAsc('$createdAt'),
                Query.limit(3),
                Query.select(['title','subtitle','link','bannerImage.*','author.*','category.*','isPublished'])
            ]);
        }
        
        podcasts = async () =>{ 
            return await databases.listDocuments(databaseId,podcastId,[
            Query.orderDesc('releaseDate'),
            Query.limit(3),
            Query.select(['title','episodeNumber','link','bannerImage.*','host.*','category.*','guest'])
        ]);
        }

    } catch (err) {
        console.error('Appwrite client error:', err);
    }
    
    return {
        blogs: (await posts()).documents ?? [], 
        podcasts: (await podcasts()).documents ?? [],
    };
}

