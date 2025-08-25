# Per-Tab Authentication Proxy

This proxy enables multiple users to be logged in simultaneously in different browser tabs, bypassing Appwrite's single-session-per-domain limitation.

## How it works

1. Each browser tab gets a unique token stored in `sessionStorage`
2. The proxy server maintains separate Appwrite client instances per tab token
3. Login/logout requests are routed through the proxy with the tab token
4. Each tab maintains its own isolated session

## Setup

### 1. Install proxy dependencies

```bash
cd auth-proxy
npm install
```

### 2. Start the proxy server

```bash
cd auth-proxy
npm run dev
```

The proxy will run on `http://localhost:3001`

### 3. Update your Svelte app to use proxy mode

Replace imports in your components:

```javascript
// Instead of:
import { user, isAuthenticated } from '$lib/user';

// Use:
import { proxyUser as user, isAuthenticated } from '$lib/userProxy';
```

## Usage Examples

### Basic login/logout (same API)
```javascript
import { proxyUser as user, isAuthenticated } from '$lib/userProxy';

// Login (creates new session for this tab)
await user.login('email@example.com', 'password');

// Logout (only affects this tab)
await user.logout();

// Check if authenticated
if ($isAuthenticated) {
  console.log('Current user:', $user);
}
```

### Tab isolation
```javascript
// Each tab has its own token
console.log('Tab token:', user.getTabToken());

// Login different users in different tabs - they won't interfere
```

## API Endpoints

### POST /auth/login
- Body: `{ email, password }`
- Headers: `X-Tab-Token: your-tab-token` (optional, generated if not provided)
- Returns: `{ success: true, user, tabToken, sessionId }`

### POST /auth/logout
- Headers: `X-Tab-Token: your-tab-token`
- Returns: `{ success: true }`

### GET /auth/user
- Headers: `X-Tab-Token: your-tab-token`
- Returns: `{ success: true, user }`

### GET /health
- Returns: `{ status: 'healthy', activeSessions: number }`

## Limitations

- Registration still uses direct Appwrite (not proxied)
- Session management functions (`listSessions`, etc.) not implemented in proxy mode
- Requires running a separate Node.js server
- CORS configured for localhost - update for production

## Production Deployment

1. Deploy the proxy server to your hosting platform
2. Update `PROXY_BASE_URL` in `userProxy.js`
3. Configure CORS for your production domain
4. Add proper error handling and logging
5. Consider adding authentication to the proxy itself

## Migration

To switch between regular and proxy mode:

```javascript
// Regular mode (single session per domain)
import { user, isAuthenticated } from '$lib/user';

// Proxy mode (multiple sessions per tab)
import { proxyUser as user, isAuthenticated } from '$lib/userProxy';
```

The API is identical, so no other code changes needed.
