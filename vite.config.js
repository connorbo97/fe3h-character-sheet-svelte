import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$constants: resolve('./src/constants'),
			$root: resolve('./src'),
			src: resolve('./src')
		}
	}
};

export default config;
