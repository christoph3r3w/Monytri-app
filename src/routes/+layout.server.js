export const ssr = true;
export const prerender = false;

import { getStockData } from '$lib/server/broker.js';
import {redirect} from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals, url }) => {
    // Define public routes
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));
	
	if (!locals.user && !isPublicRoute) {
		throw redirect(303, '/login');
	}	

    if (locals.user && isPublicRoute) {
        throw redirect(303, '/');
    }

    const u = (await locals.user);
    const ia = !!u;
    const safeUser = u ? { email: u.email, name: u.name } : null;
    const dev = u ?.prefs?.dev === 'trueDev' ? true : false;

    let investedRaw = 1507.88;
    let giftedRaw = 501.25;
    if (ia) {
        const cacheKey = u?.$id ?? 'global';
        const { stockData: { totalBalance, portfolio } } = await getStockData({ cacheKey });
        investedRaw = totalBalance ?? investedRaw;
        giftedRaw = 501.25 + (Math.abs(portfolio?.profitLoss) || 0);
    }
    
	function balanceString(balance) {
		const formatted = new Intl.NumberFormat('nl-NL', {
			style: 'currency',
			currency: 'EUR',
		}).format(balance);
		const maxLength = 10;
		return formatted.length > maxLength ? formatted.slice(0, maxLength) + '…' : formatted;
	}

    return {
        data: !ia? null : {
                Invested: balanceString(investedRaw),
                Gifted: balanceString(giftedRaw)
              },
        user: safeUser,
        isAuthenticated: ia,
        ...(dev ? { dev } : {})
    };
};


