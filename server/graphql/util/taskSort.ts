import type { WocusContext } from "../context";

/**
 * タスクの表示順を振り直す
 * @param context
 * @param taskId
 * @returns
 */
export const refresh = async (context: WocusContext, taskId: string) => {
  const obj = await context.prisma.taskOrder.findUniqueOrThrow({
    select: {
      milestoneId: true,
    },
    where: {
      taskId: taskId,
    },
  });

  console.info(`updateTaskOrder refresh milestoneId ${obj.milestoneId}`);
  const updated = await context.prisma.$executeRaw`
    UPDATE
      "TaskOrder" as t1
      SET
      "order" = new_order
      from (select 
        CAST(ROW_NUMBER()OVER(order by "order" asc) as float) new_order,
        *
      from "TaskOrder" where "milestoneId" = ${obj.milestoneId}) as t2
      where
      t1.id = t2.id;
  `;
  console.info(`updateTaskOrder refresh ${updated}`);

  return await context.prisma.task.findMany({
    include: {
      activity: true,
      fields: true,
      order: true,
    },
    where: {
      milestoneId: obj.milestoneId,
    },
  });
};
