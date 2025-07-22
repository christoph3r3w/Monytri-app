// This is here to be tested. Apply it when it is needed to be applied. 
// The idea is that it should export a variable called `device` which can be used to detect if it's a mobile or a desktop. 
import { readable } from 'svelte/store';

// Media query for mobile-like screens
const mobileQuery = window.matchMedia(
	'(-webkit-min-device-pixel-ratio: 3), ' +
	'(pointer: coarse) and (hover: none) and (min-resolution: 400dpi), ' +
	'screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait), ' +
	'screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape)'
);

// Detect platform from user agent
function detectPlatform() {
	const ua = navigator.userAgent;

	if (/iPhone|iPad|iPod/.test(ua) || 
	    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
		return 'iOS';
	}
	if (/Android/.test(ua)) return 'Android';
	if (/Win/.test(ua)) return 'Windows';
	if (/Mac/.test(ua)) return 'macOS';
	if (/Linux/.test(ua)) return 'Linux';
	return 'Unknown';
}

export const device = readable(
	{ isMobile: false, platform: detectPlatform() },
	(set) => {
		const update = () => {
			set({
				isMobile: mobileQuery.matches,
				platform: detectPlatform()
			});
		};

		// Initial set
		update();

		// Update on media query change
		mobileQuery.addEventListener('change', update);

		// Cleanup
		return () => mobileQuery.removeEventListener('change', update);
	}
);

if(import.meta.env.DEV){
	device.subscribe(({isMobile}) => {
		console.log('isMobile',isMobile);
		if(isMobile){
			document.body.classList.add('mobile-device');
			document.body.classList.remove('desktop-device');
		}else{
			document.body.classList.add('desktop-device');
			document.body.classList.remove('mobile-device');
		}
	});
}
