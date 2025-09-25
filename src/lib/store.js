import { writable } from 'svelte/store';

export const current = writable('home');
export const isMobile = writable(false);
export const menuOpen = writable(false);
export const anAcount = writable(false);

// Update current store based on window.location.pathname
export function updateCurrentFromPath() {
    const currentPath = window.location.pathname;

    switch (currentPath) {
        case '/':
            current.set('home');
            break;
        case '/gift':
        case '/gift-success':
            current.set('gift');
            break;
        case '/request':
        case '/request-success':
            current.set('request');
            break;
        case '/share':
            current.set('share');
            break;
        case '/how-it-works':
            current.set('how-it-works');
            break;
        case '/learn-more':
            current.set('learn-more');
            break;
        case '/transactions':
        case '/transaction-instance':
            current.set('transactions History');
            break;
        case '/stock-overview':
            current.set('stock-overview');
            break;
        case '/settings':
            current.set('settings');
            break;
        case '/profile':
            current.set('profile');
            break;
        case '/blog':
            current.set('blog');
            break;
        case '/login':
            current.set('login');
            break;
        case '/stock-overview/calculator':
            current.set('calculator');
            break;
        default:
            current.set('');
            break;
    }
}