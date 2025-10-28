// import { dev } from '$app/environment';
// export const ssr = dev;
export const ssr = true;
export const prerender = true
import { isAuthenticated, user, authReady } from '$lib/user';
import { device } from '$lib/Device.js';

function balanceString(balance) {
	const formatted = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
	}).format(balance);
	const maxLength = 10;
	return formatted.length > maxLength ? formatted.slice(0, maxLength) + '…' : formatted;
}	


// /**
//  * Client-side load function that syncs server-side auth state with the client stores.
//  * This keeps the Svelte stores in sync with the server's authentication check.
//  */
export const load = async ({ data }) => {
//     // Set the client-side stores based on server data
//     if (data) {
//         console.log('Auth state from server:', data.authenticated);
//         console.log(data);
        
//         // IMPORTANT: First set authReady so components know authentication checking is complete
//         authReady.set(true);
        
//         // Force isAuthenticated to match server-side auth state
//         isAuthenticated.set(!!data.authenticated);
//     }

//     // Initialize user data if we're authenticated but don't have user data yet
//     if (data?.authenticated) {
//         console.log('User init called from layout load');
        
//         try {
//             // Make sure user data is loaded immediately
//             await user.init(true); // Force refresh user data
//         } catch (e) {
//             console.error('Failed to initialize user data:', e);
//             // If user data fails to load but server says we're authenticated,
//             // we should still keep isAuthenticated true to prevent redirect loops
//             isAuthenticated.set(true);
//         }
//     }

    let investedRaw = 1500.88;
	let giftedRaw = 501.25;

    return {
        data:{
                    Invested: balanceString(investedRaw),
                    Gifted: balanceString(giftedRaw),
            },
        device,
        user,
        // isAuthenticated,
        authenticated: !!data?.authenticated,
        authReady
        // Re-export the current auth state for components that don't use the store
    };
};


