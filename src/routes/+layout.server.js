// import { redirect } from '@sveltejs/kit';

// /**
//  * Server-side authentication guard that redirects unauthenticated users
//  * to /login unless they're on a public route like /login or /register
//  */
// export const load = async ({ url, cookies, request }) => {
//     // Public routes that don't require authentication
//     const publicRoutes = ['/login', '/register'];
//     const path = url.pathname;
    
//     // Check if we're on a public route
//     if (publicRoutes.some(route => path === route || path.startsWith(route + '/'))) {
//         return {
//             authenticated: false,
//             current: path.split('/').filter(Boolean)[0] || ''
//         };
//     }

//     // Check for authentication
//     // Since we're server-side, we need to rely on cookies or JWT tokens
//     // Appwrite typically stores a session cookie that we can check for
//     const authCookies = request.headers.get('cookie');
//     const hasAppwriteSession = authCookies && (
//         authCookies.includes('a_session_') || 
//         authCookies.includes('appwrite-session-') ||
//         cookies.get('a_session_') ||
//         cookies.get('appwrite-session-')
//     );

//     if (!hasAppwriteSession) {
//         console.log('No Appwrite session found, redirecting to login');
//         // No session cookie found, redirect to login
//         throw redirect(303, '/login');
//     }

//     // Get the current route segment for the client
//     const current = path.split('/').filter(Boolean)[0] || '';
    
//     // Allow the request to continue with the authenticated flag
//     return {
//         authenticated: true,
//         current
//     };
// };

// //     // Allow the request to continue with the authenticated flag
// //     return {
// //         authenticated: true,
// //         current
// //     };
// // };