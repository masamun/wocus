import type { WocusContext } from "~/server/graphql/context";
import type { TaskResolvers } from "./../../types.generated";

export const Task: TaskResolvers = {
  summary: async (parent, _arg, _ctx, _info) => {
    console.info("call Task.summary");
    const isDate = Object.prototype.toString.call(_info?.variableValues.date_at) === "[object Date]";
    const date_at = isDate ? (_info.variableValues.date_at as Date) : new Date();

    const calcedSummary = (
      (await _ctx.prisma.$queryRaw`
      with base as (
        SELECT
          act."taskId" as "taskId",
          COALESCE(min(case when act.pv is not NULL then act.date_at else NULL end), NULL) as plan_start_date,
          COALESCE(max(case when act.pv is not NULL then act.date_at else NULL end), NULL) as plan_end_date,
          COALESCE(min(case when act.ac is not NULL then act.date_at else NULL end), NULL) as actual_start_date,
          COALESCE(max(case when act.ac is not NULL then act.date_at else NULL end), NULL) as actual_end_date,
          COALESCE(sum(case when act.date_at <= ${date_at} then act.pv else 0 end), 0) as pv,
          COALESCE(sum(case when act.date_at <= ${date_at} then act.ac else 0 end), 0) as ac,
          COALESCE(sum(case when act.date_at <= ${date_at} then act.ev else 0 end), 0) as ev
        from "TaskActivity" as act
        where act."taskId" = ${parent.id}
        group by act."taskId"
      )
      select
        *,
        ${date_at} as date_lt,
        (base.ev - base.pv) as sv,
        (base.ev - base.ac) as cv,
        case when base.pv > 0 then (base.ev / base.pv) else 0 end as spi,
        case when base.ac > 0 then (base.ev / base.ac) else 0 end as cpi
      from base;
    `) as TaskSummary[]
    ).pop();

    return (
      calcedSummary ?? {
        taskId: String(parent.id),
        ac: 0,
        ev: 0,
        pv: 0,
        sv: 0,
        spi: 0,
        cpi: 0,
        date_lt: date_at,
      }
    );
  },
};
