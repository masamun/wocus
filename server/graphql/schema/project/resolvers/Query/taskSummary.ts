import { Prisma } from "@prisma/client";
import type { QueryResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const taskSummary: NonNullable<QueryResolvers["taskSummary"]> = async (_parent, _arg, _ctx: WocusContext) => {
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

  const pv = aggregated._sum.pv ?? new Prisma.Decimal(0);
  const ev = aggregated._sum.etc ?? new Prisma.Decimal(0);
  const ac = aggregated._sum.ac ?? new Prisma.Decimal(0);

  return {
    taskId: _arg?.param?.taskId,
    date_lt: _arg?.param?.date_lt,
    pv,
    ev,
    ac,
    sv: ev.sub(pv),
    cv: ev.sub(ac),
    spi: new Prisma.Decimal(0),
    cpi: new Prisma.Decimal(0),
  };
};
