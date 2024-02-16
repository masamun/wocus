import { Prisma } from "@prisma/client/edge";
import type { Context } from "../../context";
import { type SummaryInfo, type QueryResolvers } from "../../resolvers-types";

/**
 * 全体工数を取得する
 * @param taskIds
 * @param context
 * @returns
 */
const getTotalPV = async (taskIds: string[], context: Context) => {
  return await context.prisma.taskActivity.aggregate({
    _sum: {
      pv: true,
    },
    where: {
      taskId: {
        in: taskIds,
      },
    },
  });
};

/**
 * サマリーの計算に必要な情報を返す
 * @param milestoneId
 * @param context
 * @returns
 */
const getSummaryInfo = async (milestoneId: string, context: Context, date_at: Date) => {
  return (
    (await context.prisma.$queryRaw`
    SELECT
      COALESCE(sum(act.pv), 0) as "totalPv",
      sum(case when act.date_at < ${date_at} then act.pv else 0 end) as "beforePeriodPv",
      sum(case when act.date_at < ${date_at} then act.ac else 0 end) as "beforePeriodAc",
      sum(case when act.date_at < ${date_at} then act.ev else 0 end) as "beforePeriodEv"
    from "Milestone" as m
      join "Task" as t on t."milestoneId" = m.id
        and m.id = ${milestoneId}
      join "TaskActivity" as act on t.id = act."taskId";
  `) as SummaryInfo[]
  )[0];
};

/**
 * 当日の数値を取得する
 * @param taskIds
 * @param context
 * @returns
 */
const getDateValue = async (taskIds: string[], context: Context, date_at: Date) => {
  return await context.prisma.taskActivity.aggregate({
    _sum: {
      pv: true,
      ac: true,
      ev: true,
    },
    where: {
      taskId: {
        in: taskIds,
      },
      date_at,
    },
  });
};

/**
 * 指定された期間の実績サマリを取得する
 * @param milestoneId
 * @param context
 * @param date_start_at
 * @param date_end_at
 * @returns
 */
const getDatesValue = async (milestoneId: string, context: Context, date_start_at: Date, date_end_at: Date) => {
  const st_date_string = date_start_at.toISOString().split("T")[0];
  const ed_date_string = date_end_at.toISOString().split("T")[0];

  return await context.prisma.$queryRaw`
    select
      s.daily as date_at,
      COALESCE(sum(t.pv), 0) as pv,
      COALESCE(sum(t.ac), 0) as ac,
      COALESCE(sum(t.ev), 0) as ev
    from
      (SELECT generate_series AS daily from generate_series(${st_date_string}::date, ${ed_date_string}::date, '1 day')) as s
    left join
      (SELECT act.date_at, act.pv, act.ac, act.ev
        from "Milestone" as m
          join "Task" as t on t."milestoneId" = m.id
            and m.id = ${milestoneId}
          join "TaskActivity" as act on t.id = act."taskId"
      ) as t
    on t.date_at = s.daily
    group by s.daily
    order by s.daily
  `;
};

export const dateSummary: QueryResolvers["dateSummary"] = async (_, _args, context: Context) => {
  const start_at = _args.param.start_at < _args.param.end_at ? _args.param.start_at : _args.param.end_at;
  const end_at = _args.param.start_at < _args.param.end_at ? _args.param.end_at : _args.param.start_at;

  console.debug(`query dateSummary ${_args.param.milestoneId} ${start_at} ${end_at}`);

  /*
    date: # 月日
    prv:  # 予定残工数 　　　　　 -> 全体工数 - PV
    erv:  # 実績残工数 　　　　　 -> prv - ev
    pv:   # 予定　　　　　　　　　-> 当日までのPV合計
    ev:   # 進捗　　　　　　　　　-> 当日までのEV合計
    sv:   # スケジュール差異　　　-> EV - PV
    ac:   # コスト　　　　　　　　-> 当日までのAC合計
    cv:   # コスト差異　　　　　　-> EV - AC
    spi:  # スケジュール効率　　  -> EV / PV
    cpi:  # コスト効率　　　　　  -> EV / AC
    dpv:  # 当日計画　　　　　　  -> 当日のPV合計
    dev:  # 当日進捗　　　　　　  -> 当日のEV合計
    dac:  # 当日コスト　　　　　  -> 当日のAC合計
    dsv:  # 当日スケジュール差異  -> dev - dpv
    dcv:  # 当日コスト差異　　　  -> DEV - DAC
  */

  // 表示期間外
  const info = await getSummaryInfo(_args.param.milestoneId, context, start_at);
  // 表示期間中
  const summaries = await getDatesValue(_args.param.milestoneId, context, start_at, end_at);

  const dates = Object.values(summaries as object).map((dateSummary) => {
    const datePv = dateSummary.pv;
    const dateAc = dateSummary.ac;
    const dateEv = dateSummary.ev;

    // 予定残工数 -> 全体工数 - 当日までのPV
    //const prv = totalPv.sub(summaryPv);
    // 実績残工数 -> prv - ev
    //const erv = totalPv.sub(summaryEv);
    // SV -> EV - PV
    //const sv = summaryEv.sub(summaryPv);
    // CV -> EV - AC
    //const cv = summaryEv.sub(summaryAc);
    // SPI -> EV / PV
    //const spi = summaryEv.mod(summaryPv);
    // CPI -> EV / AC
    //const cpi = summaryEv.mod(summaryAc);
    // DSV -> DEV / DPV
    //const dsv = dateEv.sub(datePv);
    // DCV -> DEV / DAC
    //const dcv = dateEv.sub(dateAc);

    return {
      date: dateSummary.date_at,
      prv: new Prisma.Decimal(0.0),
      erv: new Prisma.Decimal(0.0),
      pv: datePv,
      ev: dateEv,
      sv: new Prisma.Decimal(0.0),
      ac: dateAc,
      cv: new Prisma.Decimal(0.0),
      spi: new Prisma.Decimal(0.0),
      cpi: new Prisma.Decimal(0.0),
      dpv: datePv,
      dev: dateEv,
      dac: dateAc,
      dsv: new Prisma.Decimal(0.0),
      dcv: new Prisma.Decimal(0.0),
    };
  });

  return {
    info,
    dates,
  };
};
