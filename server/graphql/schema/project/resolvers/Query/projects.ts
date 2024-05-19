import type { QueryResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const projects: NonNullable<QueryResolvers["projects"]> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info("query projects");
  return await _ctx.prisma.project.findMany({});
};
