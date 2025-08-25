/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

// const sw = self as unknown as ServiceWorkerGlobalScope;
declare let self: ServiceWorkerGlobalScope;

import {build, files, version} from '$service-worker'


// Create a unique cache name for this project
const PROJECT_NAME = 'Monytri-PWA';
const CACHE = `${PROJECT_NAME}-cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in `static`
];

// Install Service Worker with scope validation
self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});	

// Activate and clean up old caches specific to this project
self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			// Only delete caches that belong to this project
			if (key.startsWith(PROJECT_NAME) && key !== CACHE) {
				await caches.delete(key);
			}
		}
	}

	event.waitUntil(deleteOldCaches());
});

//  listen for fetch event

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
		// if we get to this point, something went wrong

	}

	event.respondWith(respond());
});

self.addEventListener('message', (event) => {
	if(event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
})

// just to check that the service worker is running
// console.log('service worker is running',{build,files,version});


