import adapter from '@sveltejs/adapter-auto';
import { kitDocsPlugin } from '@svelteness/kit-docs/node';
import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    prerender: {
      default: true,
    },

    vite: {
      plugins: [
        Icons({ compiler: 'svelte' }),
        kitDocsPlugin({
          markdown: {
            shiki: {
              theme: 'vitesse-dark',
            },
          },
        }),
      ],
    },
  },
};

export default config;
