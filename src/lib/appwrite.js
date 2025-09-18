import { Client, Account, Databases } from 'appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';

// Create Appwrite client-side configuration
// This file only contains public information safe to use in the browser
const client = new Client();

client
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';