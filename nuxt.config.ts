export default defineNuxtConfig({
  srcDir: "app/",

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-01-01",

  devtools: {
    enabled: true,
  },

  devServer: {
    host: "0.0.0.0",
    port: import.meta.env.NUXT_PUBLIC_PORT,
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  css: ["~/assets/scss/main.scss"],

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storageKey: "loukdo-color-mode",
  },

  /*** @application head */
  app: {
    head: {
      title: "Loukdo",
      titleTemplate: "%s · Loukdo",

      htmlAttrs: {
        lang: "en",
      },

      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },

        /***
         * @do not put a global canonical url
         * @canonical urls should be generated per page:
         * https://store.loukdo.com/store-name
         */

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },

        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },

        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap",
        },
      ],

      meta: [
        {
          charset: "utf-8",
        },

        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },

        /*** @browser theme color */
        {
          name: "theme-color",
          content: "#0B1220",
        },

        /*** @default description */
        {
          name: "description",
          content:
            "Loukdo is a social commerce workspace that turns conversations into confirmed, paid, and delivered orders.",
        },

        /*** @search engine crawling */
        {
          name: "robots",
          content: "index, follow",
        },

        /*** @open graph */
        {
          property: "og:site_name",
          content: "Loukdo",
        },

        {
          property: "og:type",
          content: "website",
        },

        {
          property: "og:locale",
          content: "en_US",
        },

        {
          property: "og:title",
          content: "Loukdo Store · Social Commerce Workspace",
        },

        {
          property: "og:description",
          content: "Turn conversations into confirmed, paid, and delivered orders with Loukdo.",
        },

        /*** @default homepage url */
        {
          property: "og:url",
          content: `${import.meta.env.NUXT_PUBLIC_SITE_URL}/store-name`,
        },

        /*** @absolute url */
        {
          property: "og:image",
          content: `${import.meta.env.NUXT_PUBLIC_SITE_URL}/og/home-v1.png`,
        },

        {
          property: "og:image:secure_url",
          content: `${import.meta.env.NUXT_PUBLIC_SITE_URL}/og/home-v1.png`,
        },

        {
          property: "og:image:width",
          content: "1200",
        },

        {
          property: "og:image:height",
          content: "630",
        },

        {
          property: "og:image:type",
          content: "image/png",
        },

        /*** @x / twitter */
        {
          name: "twitter:card",
          content: "summary_large_image",
        },

        {
          name: "twitter:title",
          content: "Loukdo · Social Commerce Workspace",
        },

        {
          name: "twitter:description",
          content: "Turn conversations into confirmed, paid, and delivered orders with Loukdo.",
        },

        {
          name: "twitter:image",
          content: `${import.meta.env.NUXT_PUBLIC_SITE_URL}/og/home-v1.png`,
        },

        {
          name: "twitter:image:alt",
          content: "Loukdo social commerce workspace",
        },
      ],
    },
  },

  /*** @typescript check */
  typescript: {
    strict: true,
    typeCheck: false,
  },

  /*** @vite */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    envPrefix: ["VITE_", "NUXT_PUBLIC_"],
  },

  /*** @nitro */
  nitro: {
    compressPublicAssets: false,
  },
});
