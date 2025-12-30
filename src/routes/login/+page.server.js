import { fail, redirect } from '@sveltejs/kit';
import { createAdminClient, SESSION_COOKIE } from '$lib/server/appwrite';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
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
		} catch (error) {
		if (error.code === 409) {
			return fail(409, { error: "User already exists" });
		}

		return fail(500, { error: "Unexpected server error" });
		}

		throw redirect(303, '/');
	}
};
