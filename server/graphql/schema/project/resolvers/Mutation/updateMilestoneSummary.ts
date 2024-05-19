import type { MutationResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const updateMilestoneSummary: NonNullable<MutationResolvers["updateMilestoneSummary"]> = async (
  _parent,
  _arg,
  _ctx: WocusContext,
) => {
  const milestoneId = _arg.param.milestoneId;
  // TODO transaction
  await Promise.all(
    _arg.param.values.map(async (param, index) => {
      if (!param) {
        console.warn(`updateMilestoneSummary undefined ${index} param`);
        return;
      }
      console.debug(`updateMilestoneSummary milestone: ${milestoneId} ${param.type} ${param.visible}`);

      const type = param.type;
      const visible = param.visible ?? undefined;

      return _ctx.prisma.milestoneSummary.update({
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
