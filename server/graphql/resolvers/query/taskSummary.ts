import { Prisma } from "@prisma/client";
import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

/**
 * タスクのサマリを返す
 * 指定された日までのPV、AC、EVの合算値
 * @param _
 * @param _args
 * @param context
 * @returns
 */
export const taskSummary: QueryResolvers["taskSummary"] = async (_, _args, context: Context) => {
  if (_args?.param?.taskId === undefined) {
    console.warn(`query taskSummary undefined taskId`);
    throw Error();
  }

  console.info(`query taskSummary ${_args?.param?.taskId} ${_args?.param?.date_lt}`);
  const aggregated = await context.prisma.taskActivity.aggregate({
    _sum: {
      pv: true,
      ac: true,
      etc: true,
    },
    where: {
      taskId: _args.param?.taskId,
      date_at: {
        lte: _args.param.date_lt,
      },
    },
  });

  return {
    taskId: _args?.param?.taskId,
    date_lt: _args?.param?.date_lt,
    pv: aggregated._sum.pv ?? new Prisma.Decimal(0),
    ac: aggregated._sum.ac ?? new Prisma.Decimal(0),
    ev: aggregated._sum.etc ?? new Prisma.Decimal(0),
  };
};
