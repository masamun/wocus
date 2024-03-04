import type { WocusContext } from "~/server/graphql/context";
import type { MutationResolvers } from "./../../../types.generated";

export const createTask: NonNullable<MutationResolvers['createTask']> = async (_parent, _arg, _ctx: WocusContext) => {
  const milestoneId = _arg?.param?.milestoneId;

  const count = await _ctx.prisma.task.count({
    where: {
      milestoneId: milestoneId,
    },
  });

  // TODO
  if (count >= 1000) {
    throw new Error("タスクはこれ以上作れません");
  }

  // 表示順
  const order =
    _arg.param.order ??
    ((
      await _ctx.prisma.taskOrder.aggregate({
        _max: {
          order: true,
        },
        where: {
          milestoneId: milestoneId,
        },
      })
    )._max.order ?? 0) + 1.0;

  console.info(`create tasks ${_arg.param.milestoneId} ${order}`);

  return await _ctx.prisma.task.create({
    include: {
      order: true,
    },
    data: {
      milestone: { connect: { id: milestoneId } },
      order: {
        create: {
          milestoneId: milestoneId,
          order: order,
        },
      },
    },
  });
};
