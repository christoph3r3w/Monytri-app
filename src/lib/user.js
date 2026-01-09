import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { account, ID } from '$lib/appwrite';
import { RateLimitHandler } from '$lib/rateLimitHandler';

// Avoid auth calls in server-side, so that a user is not shared between requests
const isBrowser = typeof window !== 'undefined';

const SESSION_FLAG_KEY = 'monytri-session-active'; // simple local session hint

const createUser = () => {
	const store = writable(null);
	let lastCheckTime = 0;
	let initInFlight = false;
	const CACHE_DURATION = 30000; // 30 seconds cache

	async function init(forceRefresh = false) {
		if (!isBrowser) return;
		if (initInFlight) return; // prevent concurrent init calls
		initInFlight = true;
		
		// Use cache if available and not forcing refresh
		const now = Date.now();
		if (!forceRefresh && (now - lastCheckTime) < CACHE_DURATION) {
			initInFlight = false;
			authReady.set(true);
			return;
		}

		try {
			const userData = await RateLimitHandler.withRetry(() => account.get());
			store.set(userData);
			lastCheckTime = now;
			if (isBrowser) {
				localStorage.setItem(SESSION_FLAG_KEY, '1');
			}
		} catch (e) {
			// Expected path when unauthenticated; suppress noisy error
			if (e?.code === 401 || (typeof e?.message === 'string' && e.message.includes('missing scope'))) {
				console.debug('No active session (guest user).');
			} else {
				console.error('Failed to get user data:', e);
			}
			store.set(null);
			if (isBrowser) {
				localStorage.removeItem(SESSION_FLAG_KEY);
			}
		} finally {
			initInFlight = false;
			authReady.set(true);
		}
	}

	init();

	async function register(email, password, name) {
		if (!isBrowser) return;
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
			await RateLimitHandler.withRetry(() => account.createEmailPasswordSession(email, password));
			await init(true); // Force refresh after login
			localStorage.setItem(SESSION_FLAG_KEY, '1');
			goto('/'); // Redirect to home page after login
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		}
	}

	async function logout() {
		try {
			await RateLimitHandler.withRetry(() => account.deleteSession('current'));
			store.set(null);
		} catch (error) {
			console.error('Logout failed:', error);
			// Still set store to null even if logout fails
			store.set(null);
		}
		if (isBrowser) {
			localStorage.removeItem(SESSION_FLAG_KEY);
		}
	}

	// Session management helpers
	async function listSessions() {
		if (!isBrowser) return [];
		try {
			const sessions = await RateLimitHandler.withRetry(() => account.listSessions());
			return sessions.sessions || [];
		} catch (error) {
			console.error('Failed to list sessions:', error);
			return [];
		}
	}

	async function deleteOtherSessions() {
		if (!isBrowser) return;
		try {
			const sessions = await listSessions();
			const deletePromises = sessions
				.filter(session => !session.current)
				.map(session => RateLimitHandler.withRetry(() => account.deleteSession(session.$id)));
			
			await Promise.all(deletePromises);
			console.log(`Deleted ${deletePromises.length} other sessions`);
		} catch (error) {
			console.error('Failed to delete other sessions:', error);
		}
	}

	async function deleteAllSessions() {
		if (!isBrowser) return;
		try {
			await RateLimitHandler.withRetry(() => account.deleteSessions());
			store.set(null);
			console.log('Deleted all sessions');
		} catch (error) {
			console.error('Failed to delete all sessions:', error);
			store.set(null);
		}
	}

	// Debounced version of init for frequent calls
	const debouncedInit = RateLimitHandler.debounce(init, 1000);

	return {
		// Exposes the store's value with $user
		subscribe: store.subscribe,
		register,
		login,
		logout,
		init,
		checkUser: debouncedInit,
		// Session management
		listSessions,
		deleteOtherSessions,
		deleteAllSessions,
		hasLocalSession: () => isBrowser && !!localStorage.getItem(SESSION_FLAG_KEY)
	};
};



export const user = createUser();
export const isAuthenticated = writable(false);
export const authReady = writable(false); // becomes true after first init attempt

// Automatically update isAuthenticated based on user state
if (isBrowser) {
	user.subscribe((value) => {
		// console.log(value);// checking for changes , need to remove later

	
		isAuthenticated.set(value !== null);
		authReady.set(true); // Ensure authReady is true after user state changes
	});
}
