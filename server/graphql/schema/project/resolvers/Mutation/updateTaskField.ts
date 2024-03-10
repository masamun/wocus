import type { WocusContext } from "~/server/graphql/context";
import type { MutationResolvers } from "./../../../types.generated";

export const updateTaskField: NonNullable<MutationResolvers['updateTaskField']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  // TODO transaction
  // sortも更新できるが今のところチェックしない
  await Promise.all(
    _arg.param.map(async (param, index) => {
      if (!param) {
        console.warn(`updateTaskField undefined ${index} param`);
        return;
      }
      console.debug(`updateTaskField task: ${param.taskId} ${param.type} ${param.value}`);

      const taskId = param.taskId;
      const type = param.type;
      const value = param.value;

      return _ctx.prisma.taskField.upsert({
        create: {
          task: { connect: { id: taskId } },
          type,
          value,
        },
        update: {
          type,
          value,
        },
        where: {
          taskId_type: {
            taskId,
            type,
          },
        },
      });
    })
  );

  return await _ctx.prisma.task.findMany({
    select: {
      id: true,
      activity: true,
      fields: true,
      order: true,
      milestoneId: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      id: {
        in: _arg.param.map((p) => p.taskId),
      },
    },
  });
};
