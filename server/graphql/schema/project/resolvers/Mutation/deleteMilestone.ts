import type { WocusContext } from "~/server/graphql/context";
import type { MutationResolvers } from "./../../../types.generated";

export const deleteMilestone: NonNullable<MutationResolvers['deleteMilestone']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  console.info(`deleteMilestone ${_arg.param.milestoneId}`);

  try {
    await _ctx.prisma.milestone.delete({
      where: {
        id: _arg.param.milestoneId,
      },
    });
  } catch {
    return false;
  }
  return true;
};
