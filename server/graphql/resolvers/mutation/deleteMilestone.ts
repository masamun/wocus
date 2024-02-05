import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const deleteMilestone: MutationResolvers["deleteMilestone"] = async (_, _args, context: Context) => {
  console.info(`deleteMilestone ${_args.param.milestoneId}`);

  try {
    await context.prisma.milestone.delete({
      where: {
        id: _args.param.milestoneId,
      },
    });
  } catch {
    return false;
  }
  return true;
};
