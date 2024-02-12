/**
 * graphql-codegen用のプラグイン
 *
 * schema.graphqlからschema.tsファイルを生成する
 * schema.tsファイルはtypescriptが解釈可能なtypeDefsを定義する
 * Apollo ServerへimportしてtypeDefsを渡すのに使用する
 */
const graphqlUtils = require("@graphql-tools/utils");

const print = function (schema) {
  var escapedSchema = schema.replace(/\\`/g, "\\\\`").replace(/`/g, "\\`");
  return `export const typeDefs = \`${escapedSchema}\``;
};

module.exports = {
  plugin: function (schema) {
    const one = graphqlUtils.printSchemaWithDirectives(schema);
    return print(one);
  },
};
