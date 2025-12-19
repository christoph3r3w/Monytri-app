import { Account } from 'node-appwrite';
import { createAdminClient, SESSION_COOKIE } from '$lib/server/appwrite';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
  const form = await request.formData();
  const email = form.get('email'); 
  const password  = form.get('password');
  console.log('form data received');

  if (!email || !password) {
    return json({ error: 'Email and password are required' }, { status: 400 });
  }

  const { account } = createAdminClient();

  try {
	const session = await account.createEmailPasswordSession(String(email), String(password));

    cookies.set(SESSION_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: import.meta.env.PROD,
      expires: new Date(session.expire)
    });

	const accept = request.headers.get('accept') ?? '';
	if (accept.includes('text/html')) {
		throw redirect(303, '/');
	}

	return json({ ok: true });
  } catch (err) {
    return json({ error: 'Invalid email or password' }, { status: 401 });
  }
}