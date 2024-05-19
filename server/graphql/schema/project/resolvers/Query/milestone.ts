import type { QueryResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const milestone: NonNullable<QueryResolvers["milestone"]> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`query milestone ${_arg.param.pageId}`);

  return await _ctx.prisma.milestone.findUniqueOrThrow({
    select: {
      id: true,
      projectId: true,
      name: true,
      start_at: true,
      end_at: true,
      created_at: true,
      updated_at: true,
      fields: true,
      summaries: true,
    },
    where: {
      id: _arg.param.pageId,
    },
  });
};
