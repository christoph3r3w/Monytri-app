import { createAdminClient, SESSION_COOKIE } from '$lib/server/appwrite';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
  cookies.delete(SESSION_COOKIE, { path: '/' });
  throw redirect(303, '/login');
}
