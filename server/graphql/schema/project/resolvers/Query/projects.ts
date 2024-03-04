import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";

export const projects: NonNullable<QueryResolvers['projects']> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info("query projects");
  return await _ctx.prisma.project.findMany({});
};
