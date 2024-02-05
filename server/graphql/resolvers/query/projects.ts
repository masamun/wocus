import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

export const projects: QueryResolvers["projects"] = async (_, _args, context: Context) => {
  return await context.prisma.project.findMany({});
};
