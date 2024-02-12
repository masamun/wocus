import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { resolvers } from "../graphql/resolvers";
import { createContext } from "../graphql/context";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { resolvers as scalarResolcers } from "graphql-scalars";
import { typeDefs } from "../graphql/schema";

const apollo = new ApolloServer({
  typeDefs: [typeDefs, scalarTypeDefs],
  resolvers: [resolvers, scalarResolcers],
});

console.info("Apollo Server Start");
export default startServerAndCreateH3Handler(apollo, {
  context: createContext,
});
