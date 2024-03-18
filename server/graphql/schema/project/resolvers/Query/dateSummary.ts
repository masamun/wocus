import type { DateSummary, QueryResolvers, SummaryInfo } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

/**
 * サマリーの計算に必要な情報を返す
 * @param milestoneId
 * @param context
 * @returns
 */
const getSummaryInfo = async (milestoneId: string, context: WocusContext, date_at: Date) => {
  return (
    (await context.prisma.$queryRaw`
    SELECT
      COALESCE(sum(act.pv), 0) as "totalPv",
      COALESCE(sum(case when act.date_at < ${date_at} then act.pv else 0 end), 0) as "beforePeriodPv",
      COALESCE(sum(case when act.date_at < ${date_at} then act.ac else 0 end), 0) as "beforePeriodAc",
      COALESCE(sum(case when act.date_at < ${date_at} then act.ev else 0 end), 0) as "beforePeriodEv"
    from "Milestone" as m
      join "Task" as t on t."milestoneId" = m.id
        and m.id = ${milestoneId}
      join "TaskActivity" as act on t.id = act."taskId";
  `) as SummaryInfo[]
  )[0];
};

/**
 * 指定された期間の実績サマリを取得する
 * @param milestoneId
 * @param context
 * @param date_start_at
 * @param date_end_at
 * @returns
 */
const getDatesValue = async (
  milestoneId: string,
  context: WocusContext,
  date_start_at: Date,
  date_end_at: Date
): Promise<DateSummary[]> => {
  const st_date_string = date_start_at.toISOString().split("T")[0];
  const ed_date_string = date_end_at.toISOString().split("T")[0];

  return await context.prisma.$queryRaw`
    WITH base AS ( 
      SELECT
        t.date_at
        , COALESCE(sum(t.pv), 0) AS pv
        , COALESCE(sum(t.ac), 0) AS ac
        , COALESCE(sum(t.ev), 0) AS ev 
      FROM
        ( 
          SELECT
            COALESCE(act.date_at, s.date_at) AS date_at
            , act.pv
            , act.ev
            , act.ac 
          FROM
            "Milestone" AS m 
            JOIN "Task" AS t 
              ON t."milestoneId" = m.id 
              AND m.id = ${milestoneId} 
            JOIN "TaskActivity" AS act 
              ON t.id = act."taskId" 
            -- 表示期間中のカレンダーを補完するため完全外部結合する
            FULL OUTER JOIN ( 
              SELECT
                CAST(generate_series AS DATE) AS date_at 
              FROM
                generate_series( 
                  ${st_date_string}::DATE
                  , ${ed_date_string}::DATE
                  , '1 day'
                )
            ) AS s 
              ON act.date_at = s.date_at
        ) AS t 
      GROUP BY
        t.date_at
    ) 
    SELECT
      base_evm.date_at as "date"
      , base_evm.total - base_evm.pv AS prv -- 予定残工数
      , base_evm.total - base_evm.ev AS erv -- 実績残工数
      , base_evm.pv as pv
      , base_evm.ac as ac
      , base_evm.ev as ev
      , base_evm.ev - base_evm.pv AS sv
      , base_evm.ev - base_evm.ac AS cv
      , ( 
        CASE 
          WHEN base_evm.pv != 0 
            THEN ROUND(base_evm.ev / base_evm.pv, 2) 
          ELSE 0 
          END
      ) AS spi
      , ( 
        CASE 
          WHEN base_evm.ac != 0 
            THEN ROUND(base_evm.ev / base_evm.ac, 2) 
          ELSE 0 
          END
      ) AS cpi
      , base_evm.dpv as dpv
      , base_evm.dac as dac
      , base_evm.dev as dev
      , base_evm.dev - base_evm.dpv AS dsv
      , base_evm.dev - base_evm.dac AS dcv 
    FROM
      ( 
        SELECT
          t1.date_at
          , (SELECT sum(pv) FROM base) AS total
          , t1.pv AS dpv -- 当日のPV
          , t1.ev AS dev -- 当日のEV
          , t1.ac AS dac -- 当日のAC
          , sum(t2.pv) AS pv -- 当日までの累計PV
          , sum(t2.ev) AS ev -- 当日までの累計EV
          , sum(t2.ac) AS ac -- 当日までの累計AC
        FROM
          base AS t1
          , base AS t2 
        WHERE
          t1.date_at >= t2.date_at 
        GROUP BY
          t1.date_at
          , t1.pv
          , t1.ev
          , t1.ac
      ) AS base_evm
    WHERE
      base_evm.date_at >= ${st_date_string}::DATE
      AND base_evm.date_at <= ${ed_date_string}::DATE
    ORDER BY
      base_evm.date_at;
`;
};

export const dateSummary: NonNullable<QueryResolvers['dateSummary']> = async (_parent, _arg, _ctx: WocusContext) => {
  const start_at = _arg.param.start_at < _arg.param.end_at ? _arg.param.start_at : _arg.param.end_at;
  const end_at = _arg.param.start_at < _arg.param.end_at ? _arg.param.end_at : _arg.param.start_at;

  console.debug(
    `query dateSummary ${_arg.param.milestoneId} ${start_at.toLocaleDateString()} ${end_at.toLocaleDateString()}`
  );

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
  const info = await getSummaryInfo(_arg.param.milestoneId, _ctx, start_at);
  // 表示期間中
  const dates = await getDatesValue(_arg.param.milestoneId, _ctx, start_at, end_at);

  return {
    info,
    dates,
  };
};
