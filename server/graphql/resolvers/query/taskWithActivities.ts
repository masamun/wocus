import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";
import { getTaskFields } from "../../util/milestoneTypes";

// #TODO ページング
export const taskWithActivities: QueryResolvers["taskWithActivities"] = async (_, _args, context: Context) => {
  console.info(`query taskWithActivities ${_args?.param?.milestoneId}`);
  if (_args?.param?.milestoneId === undefined) {
    console.warn(`query tasks undefined milestoneId`);
    return [];
  }
  // タスクの一覧
  const resultTasks = await context.prisma.task.findMany({
    include: {
      activity: {
        where: {
          date_at: {
            gte: _args.param.start_at,
            lte: _args.param.end_at,
          },
        },
      },
      order: true,
    },
    where: {
      milestoneId: _args.param?.milestoneId,
    },
    orderBy: {
      order: {
        order: "asc",
      },
    },
  });

  //resultTasks = resultTasks.filter((p) => p.activity.length > 0);

  //console.info(resultTasks);
  const date_at = _args.param.date_at || new Date();

  return resultTasks.map(async (task: TaskWithActivity) => {
    const fields = await getTaskFields(task, context, date_at);
    return {
      ...task,
      fields,
    };
  });
};
