import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const renameMilestone: MutationResolvers["renameMilestone"] = async (_, _args, context: Context) => {
  console.info(`renameMilestone ${_args.param.name}`);

  return await context.prisma.milestone.update({
    include: {
      fields: true,
      summaries: true,
    },
    data: {
      name: _args.param.name,
    },
    where: {
      id: _args.param.milestoneId,
    },
  });
};
