import { createKitDocsLoader } from 'stubber-kit-docs';

export const prerender = true;

export const load = createKitDocsLoader({
  sidebar: {
    '/': null,
    '/docs': '/docs',
  },
});
