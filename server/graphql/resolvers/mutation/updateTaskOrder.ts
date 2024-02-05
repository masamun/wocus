import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";
import { refresh } from "../../util/taskSort";

export const updateTaskOrder: MutationResolvers["updateTaskOrder"] = async (_, _args, context: Context) => {
  console.info(`updateTaskOrder ${_args.param.taskId} ${_args.param.order} ${_args.param.refresh}`);
  try {
    const ret = await context.prisma.task.update({
      include: {
        order: true,
      },
      data: {
        order: {
          update: {
            order: _args.param.order,
          },
        },
      },
      where: {
        id: _args.param.taskId,
      },
    });

    if (_args.param.refresh) {
      return await refresh(context, _args.param.taskId);
    } else {
      return [ret];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};
