const config = {
  schema: ["server/graphql/schema/baseschema.graphql", "server/graphql/schema/project/schema.graphql"],
  documents: "stores/graphql/query/**/*.{graphql,js,ts,jsx,tsx}",
};
export default config;
