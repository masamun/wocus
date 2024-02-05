import { Prisma } from "@prisma/client";
import type { Context } from "../../context";
import type { MutationResolvers, TaskActivity } from "../../resolvers-types";

export const updateTaskActivity: MutationResolvers["updateTaskActivity"] = async (_, _args, context: Context) => {
  console.info(`updateTaskActivity tasks ${_args?.param?.length}`);

  if (_args.param === undefined) {
    console.warn(`updateTaskActivity undefined param`);
    throw Error();
  }

  // TODO transaction
  await Promise.all(
    _args.param.map(async (param, index) => {
      if (!param) {
        console.warn(`updateTaskActivity undefined ${index} param`);
        return;
      }
      console.debug(
        `updateTaskActivity task: ${param.taskId} ${param.date_at.toISOString()} ${param.pv} ${param.ac} ${param.ev}`
      );

      const taskId = param?.taskId;

      const pv = param.pv !== undefined ? (param.pv !== null ? new Prisma.Decimal(param.pv) : null) : null;
      const ac = param.ac !== undefined ? (param.ac !== null ? new Prisma.Decimal(param.ac) : null) : null;
      const ev = param.ev !== undefined ? (param.ev !== null ? new Prisma.Decimal(param.ev) : null) : null;

      return context.prisma.taskActivity.upsert({
        create: {
          task: { connect: { id: taskId } },
          date_at: param.date_at,
          pv,
          ac,
          ev,
          etc: new Prisma.Decimal(0),
        },
        update: {
          date_at: param.date_at,
          pv,
          ac,
          ev,
          etc: new Prisma.Decimal(0),
        },
        where: {
          taskId_date_at: {
            taskId: taskId,
            date_at: param.date_at,
          },
        },
      });
    })
  );

  const where: Prisma.TaskActivityWhereInput = {
    OR: _args.param.map((p) => {
      return {
        taskId: p?.taskId,
        date_at: p?.date_at,
      };
    }),
  };

  return await context.prisma.taskActivity.findMany({
    where,
  });
};
