import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "./server/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  debug: true,
  verbose: true,
  watch: true,
  generates: {
    "./server/graphql/schema": {
      ...defineConfig({
        typesPluginsConfig: {
          contextType: "@/server/graphql/context/#WocusContext",
          useTypeImports: true,
        },
        scalarsOverrides: {
          Date: {
            type: "DateString",
          },
          DateTime: {
            type: "Date",
          },
          ID: {
            type: "string",
          },
        },
      }),
      hooks: { afterOneFileWrite: ["eslint --fix"] },
    },
    /* クライアント用 */
    "./client/graphql/types/": {
      preset: "client",
      documents: "./client/graphql/schema/**/*.{graphql,js,ts,jsx,tsx}",
      config: {
        useTypeImports: true,
        scalars: {
          Date: "Date",
          DateTime: "Date",
          Decimal: "string",
        },
      },
      hooks: { afterOneFileWrite: ["eslint --fix"] },
    },
  },
};
export default config;
