import type { CodegenConfig } from "@graphql-codegen/cli";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";

// mapperの作成を自動化
// https://zenn.dev/shon0/articles/1cd0cb5259523e
import fs from "fs";

// ファイルを読み込み、指定された正規表現を使用してObjectTypeまたはモデル名を抽出
const extractData = (filename: string, regex: RegExp) => {
  const data = fs.readFileSync(filename, "utf-8");
  return Array.from(data.matchAll(regex)).map((m) => m[1] ?? "");
};

// graphqlの型とprismaの型からマッパーを作成
const generatePrismaTypeMappers = () => {
  const graphqlTypes = extractData("./server/graphql/schema.graphql", /type (\w+) ?\{/g);
  const prismaTypes = extractData("prisma/schema.prisma", /model (\w+) ?\{/g);

  return Object.fromEntries(
    graphqlTypes.filter((t) => prismaTypes.includes(t)).map((model) => [model, `@prisma/client/index.d#${model}`])
  );
};

// Client preset と MSW 用の Operation plugin に共通の設定
const operationConfig: TypeScriptDocumentsPluginConfig = {};

console.info(generatePrismaTypeMappers());

const config: CodegenConfig = {
  schema: "./server/graphql/schema.graphql",
  // ignoreNoDocuments: true,
  debug: true,
  verbose: true,
  watch: true,
  generates: {
    "./server/graphql/resolvers-types.ts": {
      config: {
        useIndexSignature: true,
        strictScalar: true,
        scalars: {
          Date: "DateString",
          DateTime: "Date",
          Decimal: "Decimal",
        },
        contextType: "@/server/graphql/context/#Context",
        mapperTypeSuffix: "Model",
        mappers: generatePrismaTypeMappers(),
        inputMaybeValue: "undefined | T",
        useTypeImports: true,
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
        {
          add: {
            content: 'import { Decimal } from "@prisma/client/runtime/library";',
          },
        },
      ],
    },
    "./stores/graphql/codegen/": {
      preset: "client",
      documents: "./stores/graphql/query/**/*.ts",
      config: {
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        scalars: {
          Date: "Date",
          DateTime: "Date",
          Decimal: "string",
        },
        enumsAsTypes: true,
      },
      presetConfig: {
        fragmentMasking: false,
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
