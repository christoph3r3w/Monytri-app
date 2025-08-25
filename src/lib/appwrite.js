import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('689b931b001bb5a31e22'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
