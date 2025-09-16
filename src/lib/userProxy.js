/**
 * Per-tab User Store using Auth Proxy
 * Enables multiple users in different tabs simultaneously
 */

import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { RateLimitHandler } from '$lib/rateLimitHandler';

const isBrowser = typeof window !== 'undefined';
const PROXY_BASE_URL = 'http://localhost:3003' || 'https://main--monytri-alpha.netlify.app/' || 'https://deploy-preview-24--monytri-alpha.netlify.app/';

// Generate or get existing tab token from sessionStorage
function getTabToken() {
    if (!isBrowser) return null;
    
    let tabToken = sessionStorage.getItem('monytri-tab-token');
    if (!tabToken) {
        tabToken = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('monytri-tab-token', tabToken);
    }
    return tabToken;
}

// Proxy API client
class ProxyClient {
    constructor() {
        this.tabToken = getTabToken();
    }

    async request(endpoint, options = {}) {
        const url = `${PROXY_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-Tab-Token': this.tabToken,
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include'
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Request failed');
        }
        
        return data;
    }

    async login(email, password) {
        const result = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        // Update tab token if server provided a new one
        if (result.tabToken && result.tabToken !== this.tabToken) {
            this.tabToken = result.tabToken;
            sessionStorage.setItem('monytri-tab-token', this.tabToken);
        }
        
        return result;
    }

    async logout() {
        await this.request('/auth/logout', {
            method: 'POST'
        });
        
        // Clear tab token
        sessionStorage.removeItem('monytri-tab-token');
    }

    async getUser() {
        const result = await this.request('/auth/user');
        return result.user;
    }
}

const createProxyUser = () => {
    const store = writable(null);
    const client = new ProxyClient();
    let lastCheckTime = 0;
    let initInFlight = false;
    const CACHE_DURATION = 30000; // 30 seconds cache

    async function init(forceRefresh = false) {
        if (!isBrowser) return;
        if (initInFlight) return;
        initInFlight = true;
        
        const now = Date.now();
        if (!forceRefresh && (now - lastCheckTime) < CACHE_DURATION) {
            initInFlight = false;
            authReady.set(true);
            return;
        }

        try {
            const userData = await RateLimitHandler.withRetry(() => client.getUser());
            store.set(userData);
            lastCheckTime = now;
        } catch (e) {
            // Expected when not authenticated
            store.set(null);
        } finally {
            initInFlight = false;
            authReady.set(true);
        }
    }

    init();

    async function register(email, password, name) {
        if (!isBrowser) return;
        
        // For registration, we still need to use direct Appwrite
        // since the proxy doesn't implement registration yet
        const { account, ID } = await import('$lib/appwrite');
        
        try {
            await RateLimitHandler.withRetry(() => account.create(ID.unique(), email, password, name));
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    async function login(email, password) {
        if (!isBrowser) return;
        try {
            const result = await RateLimitHandler.withRetry(() => client.login(email, password));
            store.set(result.user);
            goto('/');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async function logout() {
        try {
            await RateLimitHandler.withRetry(() => client.logout());
            store.set(null);
        } catch (error) {
            console.error('Logout failed:', error);
            store.set(null);
        }
    }

    // Legacy session management (works with current tab only)
    async function listSessions() {
        // This would need to be implemented in the proxy
        console.warn('listSessions not implemented for proxy mode');
        return [];
    }

    async function deleteOtherSessions() {
        console.warn('deleteOtherSessions not implemented for proxy mode');
    }

    async function deleteAllSessions() {
        console.warn('deleteAllSessions not implemented for proxy mode');
    }

    const debouncedInit = RateLimitHandler.debounce(init, 1000);

    return {
        subscribe: store.subscribe,
        register,
        login,
        logout,
        init,
        checkUser: debouncedInit,
        // Session management (limited in proxy mode)
        listSessions,
        deleteOtherSessions,
        deleteAllSessions,
        // Proxy-specific
        getTabToken: () => client.tabToken
    };
};

export const proxyUser = createProxyUser();
export const authReady = writable(false);

// Auto-update isAuthenticated
export const isAuthenticated = writable(false);

if (isBrowser) {
    proxyUser.subscribe((value) => {
        isAuthenticated.set(value !== null);
    });
}
