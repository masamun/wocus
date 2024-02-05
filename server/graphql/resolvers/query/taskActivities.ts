import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

export const taskActivities: QueryResolvers["taskActivities"] = async (_, _args, context: Context) => {
  if (_args.param?.taskIds === undefined) {
    console.info(`query tasks undefined milestoneId`);
    return [];
  }
  return await context.prisma.taskActivity.findMany({
    where: {
      taskId: {
        in: _args.param.taskIds,
      },
      date_at: {
        gte: _args.param.start_at,
        lte: _args.param.end_at,
      },
    },
  });
};
