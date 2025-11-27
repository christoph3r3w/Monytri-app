import { user, isAuthenticated, authReady } from '$lib/user';
import { device } from '$lib/Device.js';

/** @type {import('./$types').PageLoad} */
export async function load(data) {
    return {
	 	...data,
      device,
      user,
      isAuthenticated,
      authReady
    };
}