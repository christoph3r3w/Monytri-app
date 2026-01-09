import { Client, Account, Databases } from 'node-appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID,PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';
import { APPWRITE_API_KEY } from '$env/static/private';

export const SESSION_COOKIE = `a_session_${PUBLIC_APPWRITE_PROJECT_ID}`;


function assertPublicConfig() {
    if (!PUBLIC_APPWRITE_ENDPOINT || !PUBLIC_APPWRITE_PROJECT_ID) {
        throw new Error(
            'Missing Appwrite config. Set PUBLIC_APPWRITE_ENDPOINT and PUBLIC_APPWRITE_PROJECT_ID (for local dev, add a .env file)'
        );
    }
}


export function createAdminClient() {
    assertPublicConfig();
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID

    // API key is optional in dev if you're only accessing public collections.
    // Only set it when provided to avoid sending an invalid auth header.
    if (APPWRITE_API_KEY) {
        client.setKey(APPWRITE_API_KEY);
    }

        return {
            get account() {
                return new Account(client);
            },
            get databases() {
                return new Databases(client);
            }
        }
}

export function createSessionClient(event){
	assertPublicConfig();
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID}
    
    const session = event.cookies.get(SESSION_COOKIE);

    if (!session) {
        throw new Error('No session');
    }

    client.setSession(session);

    return {
        get account() {
            return new Account(client);
        },

        get databases() {
            return new Databases(client);
        }
    }

}




// export const account = new Account(client);
// export const databases = new Databases(client);
// export { ID } from 'appwrite';
// export account;
// export databases;
export { ID } from 'node-appwrite';
