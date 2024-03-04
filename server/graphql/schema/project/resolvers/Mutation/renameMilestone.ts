import type { WocusContext } from "~/server/graphql/context";
import type { MutationResolvers } from "./../../../types.generated";

export const renameMilestone: NonNullable<MutationResolvers['renameMilestone']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  console.info(`renameMilestone ${_arg.param.name}`);

  return await _ctx.prisma.milestone.update({
    include: {
      fields: true,
      summaries: true,
    },
    data: {
      name: _arg.param.name,
    },
    where: {
      id: _arg.param.milestoneId,
    },
  });
};
