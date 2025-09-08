// Device detection store for mobile/desktop and platform identification
// Provides reactive device information with proper cleanup and accurate updates
import { readable } from 'svelte/store';

// Guard for SSR (SvelteKit) environments
const hasWindow = typeof window !== 'undefined';

// Media query identifying "mobile-like" environments
const mobileQuery = hasWindow
	? window.matchMedia(
			[
				'(max-width: 768px)',
				'(pointer: coarse) and (hover: none)',
				'(-webkit-min-device-pixel-ratio: 2) and (max-width: 1024px)',
				'(orientation: portrait) and (max-device-width: 900px)'
			].join(', ')
		)
	: { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

// Normalised detection returning canonical platform name
function detectPlatform() {
	if (!hasWindow) return 'Unknown';
	const ua = navigator.userAgent || '';
	const platform = navigator.platform || '';
	
	const isIPad = (/iPad/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1));
	const isIPhoneOrIPod = /iPhone|iPod/.test(ua);
	const isIOS = isIPad || isIPhoneOrIPod;
	const isAndroid = /Android|Adr/.test(ua);

	if (isIOS) return 'iOS';
	if (isAndroid) return 'Android';
	if (/Win/.test(platform)) return 'Windows';
	if (/Mac/.test(platform)) return 'macOS';
	if (/Linux/.test(platform)) return 'Linux';
	return 'Unknown';
}

function computeState() {
	const platform = detectPlatform();
	const isMobile = mobileQuery.matches || (/iOS|Android/.test(platform));
	const isApple = platform === 'iOS' || platform === 'macOS';
	const isAndroid = platform === 'Android';

	return { isMobile, platform, isApple, isAndroid };
}

// Known platform
const PLATFORM_CLASSES = [
	'ios-device',
	'android-device',
	'windows-device',
	'macos-device',
	'linux-device',
	'unknown-device'
];

function applyBodyClasses(state) {
	if (!hasWindow || !document?.body) return;
	const { isMobile, platform, isApple, isAndroid } = state;

	// First remove any previous platform classes to avoid accumulation (esp. during HMR / UA emulation)
	PLATFORM_CLASSES.forEach(c => document.body.classList.remove(c));

	document.body.classList.toggle('isMobile', isMobile);
	document.body.classList.toggle('desktop-device', !isMobile);
	document.body.classList.toggle('apple-device', isApple);
	document.body.classList.toggle('android-device', isAndroid);
	document.body.classList.add(`${platform.toLowerCase()}-device`);
}

// Eager initial application so classes exist before Svelte mounts (prevents flash / hesitation)
let initialApplied = false;
if (hasWindow) {
	const initial = computeState();
	applyBodyClasses(initial);
	initialApplied = true;
}

// Main device store with dynamic updates
export const device = readable(computeState(), (set) => {
	if (!hasWindow) return () => {};

	let current = computeState();
	set(current);
	if (!initialApplied) {
		applyBodyClasses(current);
		initialApplied = true;
	}

	const update = () => {
		const next = computeState();
		// Only emit & mutate DOM when something actually changed
		if (
			next.isMobile !== current.isMobile ||
			next.platform !== current.platform ||
			next.isApple !== current.isApple ||
			next.isAndroid !== current.isAndroid
		) {
			current = next;
			set(current);
			applyBodyClasses(current);
			if (import.meta.env.DEV) console.debug('Device Info:', current);
		}
	};

	// Event listeners that can influence device characteristics
	mobileQuery.addEventListener('change', update);
	window.addEventListener('resize', update, { passive: true });
	window.addEventListener('orientationchange', update, { passive: true });
	// Some browsers may update userAgentData after visibility changes
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') update();
	});

	// UA Client Hints (if available) for more accurate platform (async)
	if (navigator.userAgentData?.getHighEntropyValues) {
		navigator.userAgentData
			.getHighEntropyValues(['platform'])
			.then(() => update())
			.catch(() => {});
	}

	return () => {
		mobileQuery.removeEventListener('change', update);
		window.removeEventListener('resize', update);
		window.removeEventListener('orientationchange', update);
	};
});

export function cleanupDevice() {
	if (!hasWindow || !document?.body) return;
	// Remove managed classes
	document.body.classList.remove(
		'isMobile',
		'desktop-device',
		'apple-device',
		'android-device',
		...PLATFORM_CLASSES
	);
}

if (hasWindow) {
	window.addEventListener('beforeunload', cleanupDevice);
}
