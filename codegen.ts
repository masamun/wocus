import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

// mapperの作成を自動化
// https://zenn.dev/shon0/articles/1cd0cb5259523e
import fs from "fs";

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
          contextType: "./server/graphql/context/#WocusContext",
        },
      }),
    },
    /* クライアント用 */
    "./stores/graphql/codegen/": {
      preset: "client",
      documents: "./stores/graphql/query/**/*.{graphql,js,ts,jsx,tsx}",
      config: {
        useTypeImports: true,
        scalars: {
          Date: "Date",
          DateTime: "Date",
          Decimal: "string",
        },
      },
      plugins: [
        {
          // Custom Scalar の branded type 定義
          add: {
            content: [
              'import { Decimal } from "@prisma/client/runtime/library";',
              "export type DateString = string & { __dateStringBrand: any };",
            ],
          },
        },
      ],
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },
  },
};
export default config;
