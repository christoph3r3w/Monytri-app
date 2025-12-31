import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true,
			edge: false,
        }),
		files: {
			appTemplate: 'src/index.html', 
		},
		prerender: {
			 handleUnseenRoutes: 'warn' 
		},
		

	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'alt-x',
			showToggleButton: 'always',
			holdMode: false,
		}
	}

};

export default config;