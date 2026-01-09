export const ssr = true;
export const prerender = false;

import {load as sd} from '$lib/broker.js';
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

   
    let { stockData: { totalBalance, portfolio } } = await sd();
    let investedRaw = totalBalance || 1507.88;
    let giftedRaw = 501.25 + (Math.abs(portfolio.profitLoss) || 0);

    let u = locals.user;
    let ia = !!locals.user;

	 function balanceString(balance) {
		const formatted = new Intl.NumberFormat('nl-NL', {
			style: 'currency',
			currency: 'EUR',
		}).format(balance);
		const maxLength = 10;
		return formatted.length > maxLength ? formatted.slice(0, maxLength) + '…' : formatted;
	}


    return {
        data: {
            Invested: balanceString(investedRaw),
            Gifted: balanceString(giftedRaw),
        },
        user: u,
        isAuthenticated: ia,

    };
};


