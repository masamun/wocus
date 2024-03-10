import { Prisma } from "@prisma/client";
import type { QueryResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const taskSummary: NonNullable<QueryResolvers['taskSummary']> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`query taskSummary ${_arg?.param?.taskId} ${_arg?.param?.date_lt}`);

  const aggregated = await _ctx.prisma.taskActivity.aggregate({
    _sum: {
      pv: true,
      ac: true,
      etc: true,
    },
    where: {
      taskId: _arg.param?.taskId,
      date_at: {
        lte: _arg.param.date_lt,
      },
    },
  });

  return {
    taskId: _arg?.param?.taskId,
    date_lt: _arg?.param?.date_lt,
    pv: aggregated._sum.pv ?? new Prisma.Decimal(0),
    ac: aggregated._sum.ac ?? new Prisma.Decimal(0),
    ev: aggregated._sum.etc ?? new Prisma.Decimal(0),
    sv: new Prisma.Decimal(0),
    spi: new Prisma.Decimal(0),
    cpi: new Prisma.Decimal(0),
  };
};
