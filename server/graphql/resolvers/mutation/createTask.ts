import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";
import { getTaskFields } from "../../util/milestoneTypes";

export const createTask: MutationResolvers["createTask"] = async (_, _args, context: Context) => {
  const milestoneId = _args?.param?.milestoneId;

  const count = await context.prisma.task.count({
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
    _args.param.order ??
    ((
      await context.prisma.taskOrder.aggregate({
        _max: {
          order: true,
        },
        where: {
          milestoneId: milestoneId,
        },
      })
    )._max.order ?? 0) + 1.0;

  console.info(`create tasks ${_args.param.milestoneId} ${order}`);

  const task = await context.prisma.task.create({
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

  return {
    ...task,
    fields: await getTaskFields(task, context, new Date()),
  };
};
