import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import tailwindcss from 'tailwindcss/vite';

export default defineConfig({
	plugins: [
	sveltekit(),
	],
	server: {
		port: 3003,
		watch: {
			ignored: [
				'**/build/**',
				'**/test-results/**',
				'**/gradle/**',
				'**/ios/**',
				'**/android/**'
			]
		}
	  },
});
