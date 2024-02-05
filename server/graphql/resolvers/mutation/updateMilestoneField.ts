import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const updateMilestoneField: MutationResolvers["updateMilestoneField"] = async (_, _args, context: Context) => {
  const milestoneId = _args.param.milestoneId;
  // TODO transaction
  await Promise.all(
    _args.param.values.map(async (param, index) => {
      if (!param) {
        console.warn(`updateMilestoneField undefined ${index} param`);
        return;
      }
      console.debug(`updateMilestoneField milestone: ${milestoneId} ${param.type} ${param.width} ${param.visible}`);

      const type = param.type;
      const width = param.width;
      const visible = param.visible;

      return context.prisma.milestoneField.update({
        data: {
          width,
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
