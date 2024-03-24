// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  sourcemap: {
    client: true,
    server: false,
  },
  devServer: {
    port: 3001,
  },
  ssr: false,
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["composables/**/*.ts"],
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
    build: {
      sourcemap: false,
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  nitro: {
    preset: "node-server",
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },
  future: {
    typescriptBundlerResolution: true,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "/api/graphql",
        browserHttpEndpoint: "/api/graphql",
      },
    },
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  },
});
