import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const updateMilestoneSummary: MutationResolvers["updateMilestoneSummary"] = async (
  _,
  _args,
  context: Context
) => {
  const milestoneId = _args.param.milestoneId;
  // TODO transaction
  await Promise.all(
    _args.param.values.map(async (param, index) => {
      if (!param) {
        console.warn(`updateMilestoneSummary undefined ${index} param`);
        return;
      }
      console.debug(`updateMilestoneSummary milestone: ${milestoneId} ${param.type} ${param.visible}`);

      const type = param.type;
      const visible = param.visible;

      return context.prisma.milestoneSummary.update({
        data: {
          visible,
        },
        where: {
          milestoneId_type: {
            milestoneId,
            type,
          },
        },
      });
    })
  );

  return await context.prisma.milestone.findUniqueOrThrow({
    include: {
      fields: true,
      summaries: true,
    },
    where: {
      id: milestoneId,
    },
  });
};
