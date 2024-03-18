import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { createContext, type WocusContext } from "../graphql/context";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { resolvers as scalarResolcers } from "graphql-scalars";
import { typeDefs } from "../graphql/schema/typeDefs.generated";
import { resolvers } from "../graphql/schema/resolvers.generated";

const apollo = new ApolloServer<WocusContext>({
  typeDefs: [typeDefs, scalarTypeDefs],
  resolvers: [resolvers, scalarResolcers],
});

export default startServerAndCreateH3Handler(apollo, {
  context: createContext,
});
