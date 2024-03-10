import type { QueryResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const tasks: NonNullable<QueryResolvers['tasks']> = async (_parent, _arg, _ctx: WocusContext) => {
  const milestoneId = _arg.param.milestoneId;
  console.info(`query tasks ${milestoneId}`);

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

  return tasks;
};
