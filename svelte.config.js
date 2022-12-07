import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

// eslint-disable-next-line camelcase
// const dev = 'production' === 'development';
// console.log(dev);
// throw new Error(dev);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			strict: false,
			pages: 'docs',
			assets: 'docs'
		}),
		paths: {
			base: '/fe3h-character-sheet-svelte'
		}
	}
};

export default config;
