import { refresh } from "~/server/graphql/util/taskSort";
import type { MutationResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const updateTaskOrder: NonNullable<MutationResolvers['updateTaskOrder']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  console.info(`updateTaskOrder ${_arg.param.taskId} ${_arg.param.order} ${_arg.param.refresh}`);
  try {
    const ret = await _ctx.prisma.task.update({
      include: {
        order: true,
      },
      data: {
        order: {
          update: {
            order: _arg.param.order,
          },
        },
      },
      where: {
        id: _arg.param.taskId,
      },
    });

    if (_arg.param.refresh) {
      return await refresh(_ctx, _arg.param.taskId);
    } else {
      return [ret];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};
