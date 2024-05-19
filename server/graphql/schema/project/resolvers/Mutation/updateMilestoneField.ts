import type { MutationResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const updateMilestoneField: NonNullable<MutationResolvers["updateMilestoneField"]> = async (
  _parent,
  _arg,
  _ctx: WocusContext,
) => {
  const milestoneId = _arg.param.milestoneId;
  // TODO transaction
  await Promise.all(
    _arg.param.values.map(async (param, index) => {
      if (!param) {
        console.warn(`updateMilestoneField undefined ${index} param`);
        return;
      }
      console.debug(`updateMilestoneField milestone: ${milestoneId} ${param.type} ${param.width} ${param.visible}`);

      const type = param.type;
      const width = param.width ?? undefined;
      const visible = param.visible ?? undefined;

      return _ctx.prisma.milestoneField.update({
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
    }),
  );

  return await _ctx.prisma.milestone.findUniqueOrThrow({
    include: {
      fields: true,
      summaries: true,
    },
    where: {
      id: milestoneId,
    },
  });
};
