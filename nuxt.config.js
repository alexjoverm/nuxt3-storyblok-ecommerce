import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    apiToken: process.env.API_TOKEN,
  },
  meta: {
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
      },
    ],
  },

  buildModules: [
    [
      "~/modules/nuxt-storyblok",
      { accessToken: process.env.API_TOKEN, cacheProvider: "memory" },
    ],
  ],
});
