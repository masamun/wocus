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
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
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
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3001/api/graphql",
      },
    },
  },
});
