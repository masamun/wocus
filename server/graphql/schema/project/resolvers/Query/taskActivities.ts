import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";

export const taskActivities: NonNullable<QueryResolvers['taskActivities']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  if (_arg.param?.taskIds === undefined) {
    console.info(`query tasks undefined milestoneId`);
    return [];
  }
  return await _ctx.prisma.taskActivity.findMany({
    where: {
      taskId: {
        in: _arg.param.taskIds,
      },
      date_at: {
        gte: _arg.param.start_at,
        lte: _arg.param.end_at,
      },
    },
  });
};
