import { createSessionClient, SESSION_COOKIE } from '$lib/server/appwrite';

const USER_CACHE_TTL_MS = 60_000;
const userCache = new Map();

function isAssetRequest(pathname) {
  if (pathname.startsWith('/_app/')) return true;
  if (pathname === '/service-worker.js' || pathname === '/service-worker.mjs') return true;
  if (pathname === '/manifest.json' || pathname === '/favicon.ico') return true;

  // common static asset extensions
  return /\.(?:png|jpe?g|gif|webp|svg|ico|css|js|mjs|map|woff2?|ttf|eot)$/i.test(pathname);
}

export async function handle({ event, resolve }) {
  if (isAssetRequest(event.url.pathname)) {
    return resolve(event);
  }

  const session = event.cookies.get(SESSION_COOKIE);

  event.locals.user = null;

  if (session) {
    const cached = userCache.get(session);
    if (cached && cached.expiresAt > Date.now()) {
      event.locals.user = cached.user;
    } else {
      try {
        const { account } = createSessionClient(event);
        const user = await account.get();
        event.locals.user = user;
        userCache.set(session, { user, expiresAt: Date.now() + USER_CACHE_TTL_MS });
      } catch {
        userCache.delete(session);
        event.cookies.delete(SESSION_COOKIE, { path: '/' });
      }
    }
  }
  // Continue with the request.
  return resolve(event);
}
