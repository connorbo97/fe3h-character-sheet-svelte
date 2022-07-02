import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$constants: resolve('./src/constants'),
					$root: resolve('./src'),
					src: resolve('./src'),
				}
			}
		}
	}
};

export default config;
