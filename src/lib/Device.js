// Device detection store for mobile/desktop and platform identification
// Provides reactive device information with proper cleanup and efficient updates
import { readable } from 'svelte/store';

// Cached platform detection to avoid repeated user agent parsing
let cachedPlatform = null;

// Media query for mobile-like screens - optimized for better device detection
const mobileQuery = window.matchMedia(
	'(max-width: 768px), ' +
	'(pointer: coarse) and (hover: none), ' +
	'(-webkit-min-device-pixel-ratio: 2) and (max-width: 1024px), ' +
	'(orientation: portrait) and (max-device-width: 900px)'
);

// Efficient platform detection with caching
function detectPlatform() {
	if (cachedPlatform) return cachedPlatform;
	
	const ua = navigator.userAgent;
	const platform = navigator.platform;

	// iOS detection (including iPadOS treated as desktop)
	if (/iPhone|iPod/.test(ua) || 
	    (/iPad/.test(ua) && 'ontouchend' in document)) {
		cachedPlatform = 'iOS';
	}
	// iPad with desktop Safari (iPadOS 13+)
	else if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
		cachedPlatform = 'iOS';
	}
	// Android
	else if (/Android/.test(ua)) {
		cachedPlatform = 'Android';
	}
	// Windows
	else if (/Win/.test(platform)) {
		cachedPlatform = 'Windows';
	}
	// macOS
	else if (/Mac/.test(platform)) {
		cachedPlatform = 'macOS';
	}
	// Linux
	else if (/Linux/.test(platform)) {
		cachedPlatform = 'Linux';
	}
	else {
		cachedPlatform = 'Unknown';
	}

	return cachedPlatform;
}

// Main device store with efficient updates
export const device = readable(
	{ 
		isMobile: mobileQuery.matches, 
		platform: detectPlatform(),
		isApple: false,
		isAndroid: false
	},
	(set) => {
		const platform = detectPlatform();
		const isApple = platform === 'iOS' || platform === 'macOS';
		const isAndroid = platform === 'Android';

		// Optimized update function - only updates when necessary
		const update = () => {
			const isMobile = mobileQuery.matches;
			set({
				isMobile,
				platform,
				isApple,
				isAndroid
			});
		};

		// Initial set
		update();

		// Listen for media query changes
		mobileQuery.addEventListener('change', update);

		// Cleanup function - ensures proper unsubscription
		return () => {
			mobileQuery.removeEventListener('change', update);
		};
	}
);

// Development-only subscription with proper cleanup
let devUnsubscribe = null;

if (import.meta.env.DEV) {
	devUnsubscribe = device.subscribe(({ isMobile, platform, isApple, isAndroid }) => {
		console.log('Device Info:', { isMobile, platform, isApple, isAndroid });
		
		// Efficiently manage CSS classes
		document.body.classList.toggle('isMobile', isMobile);
		document.body.classList.toggle('desktop-device', !isMobile);
		document.body.classList.toggle('apple-device', isApple);
		document.body.classList.toggle('android-device', isAndroid);
		document.body.classList.toggle(`${platform.toLowerCase()}-device`, true);
	});
}

// Global cleanup function for session end
export function cleanupDevice() {
	if (devUnsubscribe) {
		devUnsubscribe();
		devUnsubscribe = null;
	}
	// Clear cached platform for potential re-initialization
	cachedPlatform = null;
}

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
	window.addEventListener('beforeunload', cleanupDevice);
	
	// Also cleanup on page visibility change (when tab becomes hidden)
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') {
			cleanupDevice();
		}
	});
}
