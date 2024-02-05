import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const updateTaskField: MutationResolvers["updateTaskField"] = async (_, _args, context: Context) => {
  // TODO transaction
  // sortも更新できるが今のところチェックしない
  await Promise.all(
    _args.param.map(async (param, index) => {
      if (!param) {
        console.warn(`updateTaskField undefined ${index} param`);
        return;
      }
      console.debug(`updateTaskField task: ${param.taskId} ${param.type} ${param.value}`);

      const taskId = param.taskId;
      const type = param.type;
      const value = param.value;

      return context.prisma.taskField.upsert({
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

  return await context.prisma.task.findMany({
    select: {
      id: true,
      fields: true,
      order: true,
      milestoneId: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      id: {
        in: _args.param.map((p) => p.taskId),
      },
    },
  });
};
