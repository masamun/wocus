import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";
import { getTaskFields } from "../../util/milestoneTypes";

/*
const getOrder = async (
  context: Context,
  milestoneId: string,
  prevTaskId: string | undefined,
  nextTaskId: string | undefined
) => {
  const prevOrder =
    prevTaskId === undefined
      ? 0.0
      : (
          await context.prisma.taskOrder.findUniqueOrThrow({
            where: {
              taskId: prevTaskId,
            },
          })
        ).order;
  const nextOrder =
    nextTaskId === undefined
      ? (
          await context.prisma.taskOrder.aggregate({
            _max: {
              order: true,
            },
            where: {
              milestoneId: milestoneId,
            },
          })
        )._max.order + 1.0
      : (
          await context.prisma.taskOrder.findUniqueOrThrow({
            where: {
              taskId: nextTaskId,
            },
          })
        ).order;

  let order = (prevOrder + nextOrder) / 2;

  if (order < 0) {
    order = 0.0;
  }
  return order;
};
*/
export const createTask: MutationResolvers["createTask"] = async (_, _args, context: Context) => {
  const milestoneId = _args?.param?.milestoneId;
  //const order = await getOrder(context, _args.param.milestoneId, _args.param.prevTaskId, _args.param.nextTaskId);
  const order =
    _args.param.order ??
    (
      await context.prisma.taskOrder.aggregate({
        _max: {
          order: true,
        },
        where: {
          milestoneId: milestoneId,
        },
      })
    )._max.order + 1.0;

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
