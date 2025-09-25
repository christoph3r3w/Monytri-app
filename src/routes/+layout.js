// import { dev } from '$app/environment';

export const ssr = true;
export const prerender = true
// export const ssr = dev;

import { isAuthenticated, user, authReady } from '$lib/user';

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

    return {
        ...data,
        // Re-export the current auth state for components that don't use the store
        authenticated: !!data?.authenticated
    };
};


