import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), sentry({
      dsn: "https://f7358c6bd68d9fcf222f023f9a1fedc1@o444924.ingest.sentry.io/4506639903096832",
      sourceMapsUploadOptions: {
        project: "playlist-ed",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    })],
  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true,
  }),
  prefetch: true,
  vite: {
    ssr: {
      external: ['@sentry/core', '@sentry/node', '@sentry/utils', '@sentry/browser', ],
    }
  }
});
