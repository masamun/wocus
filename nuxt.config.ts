// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  sourcemap: {
    client: true,
    server: true,
  },
  devServer: {
    port: 3001,
  },
  ssr: false,
  typescript: {
    shim: false,
  },
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["components/**", "composables/**"],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore", // import { defineStore } from 'pinia'
          ["defineStore", "definePiniaStore", "storeToRefs"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    "@nuxtjs/apollo",
  ],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    build: {
      sourcemap: false,
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3001/api/graphql",
        browserHttpEndpoint: "/api/graphql",
      },
    },
  },
});
