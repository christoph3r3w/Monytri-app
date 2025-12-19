import { Client, Account, Databases } from 'node-appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID,PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';
import { APPWRITE_API_KEY } from '$env/static/private';

export const SESSION_COOKIE = `a_session_${PUBLIC_APPWRITE_PROJECT_ID}`;


export function createAdminClient() {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT_ID) // Replace with your project ID
        .setKey(APPWRITE_API_KEY); // Replace with your API key

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
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID}
    
    const session = event.cookies.get(SESSION_COOKIE);

    if (!session){return new Error('No session ');}

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
