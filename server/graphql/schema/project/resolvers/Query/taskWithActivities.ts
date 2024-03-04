import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";
import { TaskSummary } from "../TaskSummary";

export const taskWithActivities: NonNullable<QueryResolvers["taskWithActivities"]> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  const milestoneId = _arg.param.milestoneId;
  console.info(`query taskWithActivities ${milestoneId}`);

  // タスクの一覧
  const tasks = await _ctx.prisma.task.findMany({
    include: {
      activity: {
        where: {
          date_at: {
            gte: _arg.param.start_at ?? undefined,
            lte: _arg.param.end_at ?? undefined,
          },
        },
      },
      order: true,
      fields: true,
    },
    where: {
      milestoneId,
    },
    orderBy: {
      order: {
        order: "asc",
      },
    },
  });

  return tasks.map((task) => {
    return {
      ...task,
    };
  });

  /*
  const date_at = _arg.param.date_at || new Date();

  const summary = await getTaskSummary(context, milestoneId, date_at);
  return resultTasks.map(async (task) => {
    return {
      ...task,
      summary: summary.find((p) => p.taskId === task.id),
    };
  });
  */
};
/*
export const taskWithActivities: QueryResolvers["taskWithActivities"] = async (_, _arg, context: Context) => {
  const milestoneId = _arg.param.milestoneId;
  console.info(`query taskWithActivities ${milestoneId}`);

  // タスクの一覧
  const resultTasks = await context.prisma.task.findMany({
    include: {
      activity: {
        where: {
          date_at: {
            gte: _arg.param.start_at,
            lte: _arg.param.end_at,
          },
        },
      },
      order: true,
      fields: true,
    },
    where: {
      milestoneId,
    },
    orderBy: {
      order: {
        order: "asc",
      },
    },
  });

  const date_at = _arg.param.date_at || new Date();

  const summary = await getTaskSummary(context, milestoneId, date_at);
  return resultTasks.map(async (task) => {
    return {
      ...task,
      summary: summary.find((p) => p.taskId === task.id),
    };
  });
  */
