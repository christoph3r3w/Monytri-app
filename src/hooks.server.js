import { createSessionClient, SESSION_COOKIE } from '$lib/server/appwrite';
import { Account } from 'node-appwrite';

export async function handle({ event, resolve }) {

const session = event.cookies.get(SESSION_COOKIE);

event.locals.user = null;

if (session) {
  try {
    // Use our helper function to create the Appwrite client.
    const { account } = createSessionClient(event);
    // Store the current logged in user in locals,
    // for easy access in our other routes.
    event.locals.user = await account.get();
  } catch {
    event.cookies.delete(SESSION_COOKIE,{path: '/'});
  }
}
  // Continue with the request.
  return resolve(event);
}
