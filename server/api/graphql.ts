import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { typeDefs as scalarTypeDefs, resolvers as scalarResolcers } from "graphql-scalars";

import { createContext, type WocusContext } from "../graphql/context";
import { typeDefs } from "../graphql/schema/typeDefs.generated";
import { resolvers } from "../graphql/schema/resolvers.generated";

const apollo = new ApolloServer<WocusContext>({
  typeDefs: [typeDefs, scalarTypeDefs],
  resolvers: [resolvers, scalarResolcers],
});

export default startServerAndCreateH3Handler(apollo, {
  context: await createContext,
});
