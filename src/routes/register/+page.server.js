import { SESSION_COOKIE, createAdminClient } from "$lib/server/appwrite.js";
import { redirect } from "@sveltejs/kit";
import { ID, OAuthProvider } from "node-appwrite";

let error = null;
let isLoading = false;

/** @type {import('./$types').PageServerLoad} */
export const actions = {
    default: async ({ request,cookies }) => {
        const form = await request.formData();
        
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
      

        const {account} = createAdminClient();

        try {
            isLoading = true;
            error = null;

            const user = await account.create({
                userId: ID.unique(),
                email,
                password,
                name
            })
            
            const session = await account.createEmailPasswordSession({
                email,
                password
            });

            cookies.set(SESSION_COOKIE, session.secret, {
                sameSite: "strict",
                expires: new Date(session.expire),
                secure: true,
                path: "/",
            });
        } catch (error) {
            console.error("Registration failes:", error);
            error = error?.message || 'Registration failed. Please try again.';
            return fail(400, { error: 'Registration failed. Please try again.' });
        } finally {
            isLoading = false;
        }

        // Redirect to the account page.
        throw redirect(302, "/login");
    }   
};

/** @type {import('./$types').PageServerLoad} */
export async function load()  {

    return {
        isLoading: isLoading,
        // error: error,
    };
}