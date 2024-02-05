import { Prisma } from "@prisma/client";
import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

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
 * 当日までの数値を取得する
 * @param taskIds
 * @param context
 * @returns
 */
const getSummaryValue = async (taskIds: string[], context: Context, date_at: Date) => {
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
      date_at: {
        lte: date_at,
      },
    },
  });
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

export const dateSummary: QueryResolvers["dateSummary"] = async (_, _args, context: Context) => {
  if (_args?.param?.milestoneId === undefined) {
    console.warn(`query dateSummary undefined milestone`);
    throw Error();
  }
  if (_args?.param?.start_at === undefined) {
    console.warn(`query dateSummary undefined start_at`);
    throw Error();
  }
  if (_args?.param?.end_at === undefined) {
    console.warn(`query dateSummary undefined end_at`);
    throw Error();
  }

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
  // 計算対象のタスクIDリスト
  const taskIds = (
    await context.prisma.task
      .findMany({
        select: {
          id: true,
        },
        where: {
          milestoneId: _args.param.milestoneId,
          activity: {},
        },
      })
      .catch((r) => [])
  ).map((p) => p.id);

  console.info(taskIds);

  // 全体工数
  const totalPv = (await getTotalPV(taskIds, context))._sum.pv ?? new Prisma.Decimal(0.0);

  console.debug(`totalPV: ${totalPv}`);

  // 計算する日付のリスト
  const range: Date[] = [];
  for (let d = new Date(start_at); d <= end_at; d.setDate(d.getDate() + 1)) {
    range.push(new Date(d));
  }
  // 当日の数値
  return await Promise.all(
    range.map(async (date) => {
      //console.debug(date);
      const dateValue = await getDateValue(taskIds, context, date);
      const datePv = dateValue._sum.pv ?? new Prisma.Decimal(0.0);
      const dateAc = dateValue._sum.ac ?? new Prisma.Decimal(0.0);
      const dateEv = dateValue._sum.ev ?? new Prisma.Decimal(0.0);

      // console.debug(datePv);
      // console.debug(dateAc);
      // console.debug(dateEv);

      // 前日までの数値
      const summaryValue = await getSummaryValue(taskIds, context, date);
      const summaryPv = summaryValue._sum.pv ?? new Prisma.Decimal(0.0);
      const summaryAc = summaryValue._sum.ac ?? new Prisma.Decimal(0.0);
      const summaryEv = summaryValue._sum.ev ?? new Prisma.Decimal(0.0);

      // console.debug(summaryPv);
      // console.debug(summaryAc);
      // console.debug(summaryEv);

      // 予定残工数 -> 全体工数 - 当日までのPV
      const prv = totalPv.sub(summaryPv);
      // 実績残工数 -> prv - ev
      const erv = totalPv.sub(summaryEv);
      // SV -> EV - PV
      const sv = summaryEv.sub(summaryPv);
      // CV -> EV - AC
      const cv = summaryEv.sub(summaryAc);
      // SPI -> EV / PV
      const spi = summaryEv.mod(summaryPv);
      // CPI -> EV / AC
      const cpi = summaryEv.mod(summaryAc);
      // DSV -> DEV / DPV
      const dsv = dateEv.sub(datePv);
      // DCV -> DEV / DAC
      const dcv = dateEv.sub(dateAc);

      return {
        date,
        prv,
        erv,
        pv: summaryPv,
        ev: summaryEv,
        sv,
        ac: summaryAc,
        cv,
        spi,
        cpi,
        dpv: datePv,
        dev: dateEv,
        dac: dateAc,
        dsv,
        dcv,
      };
    })
  );
};
