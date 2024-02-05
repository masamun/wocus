import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";
import { getTaskFields } from "../../util/milestoneTypes";

// #TODO ページング
export const tasks: QueryResolvers["tasks"] = async (_, _args, context: Context) => {
  console.info(`query tasks ${_args?.param?.milestoneId}`);
  if (_args?.param?.milestoneId === undefined) {
    console.info(`query tasks undefined milestoneId`);
    return [];
  }
  // タスクの一覧
  const resultTasks = await context.prisma.task.findMany({
    include: {
      fields: true,
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

  const date_at = _args.param.date_at || new Date();

  return resultTasks.map(async (task: Task) => {
    return {
      ...task,
      ...(await getTaskFields(task, context, date_at)),
    };
  });
};
