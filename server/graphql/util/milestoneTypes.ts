import { Prisma } from "@/prisma";
import type { WocusContext } from "../context";

type InitialField = Omit<
  Prisma.MilestoneFieldCreateManyInput,
  "id" | "milestone" | "milestoneId" | "created_at" | "updated_at"
>;

type InitialSummary = Omit<
  Prisma.MilestoneSummaryCreateManyInput,
  "id" | "milestone" | "milestoneId" | "created_at" | "updated_at"
>;

const fieldType = [
  "order",
  "category_1",
  "category_2",
  "category_3",
  "task",
  "note",
  "pic",
  "plan_start_date",
  "plan_end_date",
  "actual_start_date",
  "actual_end_date",
  "pv",
  "ev",
  "sv",
  "ac",
  "cv",
  "spi",
  "cpi",
] as const;
export type FieldType = (typeof fieldType)[number];

const summaryType = [
  "prv",
  "erv",
  "pv",
  "ev",
  "sv",
  "ac",
  "cv",
  "spi",
  "cpi",
  "dpv",
  "dev",
  "dac",
  "dsv",
  "dcv",
] as const;
export type SummaryType = (typeof summaryType)[number];

// マイルストーンのフィールド定義
export const DEFAULT_MILESTONE_FILEDS: InitialField[] = [
  {
    order: 1,
    type: "order",
    title: "No",
    group: "",
    editable: false,
    deletable: false,
    visible: true,
    width: 32,
  },
  {
    order: 1,
    type: "category_1",
    title: "大項目",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 64,
  },
  {
    order: 1,
    type: "category_2",
    title: "中項目",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 64,
  },
  {
    order: 1,
    type: "category_3",
    title: "小項目",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 64,
  },
  {
    order: 1,
    type: "task",
    title: "タスク名",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 32,
  },
  {
    order: 1,
    type: "note",
    title: "備考",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 32,
  },
  {
    order: 1,
    type: "pic",
    title: "担当者",
    group: "",
    editable: true,
    deletable: false,
    visible: true,
    width: 32,
  },
  {
    order: 1,
    type: "plan_start_date",
    title: "開始日時",
    group: "予定",
    editable: false,
    deletable: false,
    visible: true,
    width: 86,
  },
  {
    order: 1,
    type: "plan_end_date",
    title: "終了日時",
    group: "予定",
    editable: false,
    deletable: false,
    visible: true,
    width: 86,
  },
  {
    order: 1,
    type: "actual_start_date",
    title: "開始日時",
    group: "実績",
    editable: false,
    deletable: false,
    visible: true,
    width: 86,
  },
  {
    order: 1,
    type: "actual_end_date",
    title: "終了日時",
    group: "実績",
    editable: false,
    deletable: false,
    visible: true,
    width: 86,
  },
  {
    order: 1,
    type: "sv",
    title: "SV",
    group: "EVM",
    editable: false,
    deletable: false,
    visible: true,
    width: 56,
  },
  {
    order: 1,
    type: "cv",
    title: "CV",
    group: "EVM",
    editable: false,
    deletable: false,
    visible: true,
    width: 56,
  },
  {
    order: 1,
    type: "spi",
    title: "SPI",
    group: "EVM",
    editable: false,
    deletable: false,
    visible: true,
    width: 36,
  },
  {
    order: 1,
    type: "cpi",
    title: "CPI",
    group: "EVM",
    editable: false,
    deletable: false,
    visible: true,
    width: 36,
  },
].map((value, index) => {
  if (!fieldType.some((p) => p === value.type)) {
    throw Error("フィールド定義ミス");
  }
  // 定義された順番でorderを上書き設定する
  return {
    ...value,
    order: index,
  };
});

// マイルストーンのサマリー定義
export const DEFAULT_MILESTONE_SUMMARIES: InitialSummary[] = [
  {
    order: 1,
    type: "prv",
    title: "予定残工数",
    visible: true,
  },
  {
    order: 1,
    type: "erv",
    title: "実績残工数",
    visible: true,
  },
  {
    order: 1,
    type: "pv",
    title: "PV",
    visible: true,
  },
  {
    order: 1,
    type: "ev",
    title: "EV",
    visible: true,
  },
  {
    order: 1,
    type: "ac",
    title: "AC",
    visible: true,
  },
  {
    order: 1,
    type: "sv",
    title: "SV",
    visible: true,
  },
  {
    order: 1,
    type: "cv",
    title: "CV",
    visible: true,
  },
  {
    order: 1,
    type: "spi",
    title: "SPI",
    visible: true,
  },
  {
    order: 1,
    type: "cpi",
    title: "CPI",
    visible: true,
  },
  {
    order: 1,
    type: "dpv",
    title: "当日PV",
    visible: true,
  },
  {
    order: 1,
    type: "dev",
    title: "当日EV",
    visible: true,
  },
  {
    order: 1,
    type: "dac",
    title: "当日AC",
    visible: true,
  },
  {
    order: 1,
    type: "dsv",
    title: "当日SV",
    visible: true,
  },
  {
    order: 1,
    type: "dcv",
    title: "当日CV",
    visible: true,
  },
].map((value, index) => {
  if (!summaryType.some((p) => p === value.type)) {
    throw Error("サマリー定義ミス");
  }
  // 定義された順番でorderを上書き設定する
  return {
    ...value,
    order: index,
  };
});

/**
 * TaskFieldの型定義
 */
type TaskFieldScalars = Prisma.$TaskFieldPayload["scalars"];

const getPlan = async (taskId: string, context: WocusContext): Promise<TaskFieldScalars[]> => {
  // PVが入力開始 -> 計画上の開始日時
  // PVが入力終了 -> 計画上の終了日時
  const plan = await context.prisma.taskActivity.aggregate({
    _max: {
      date_at: true,
    },
    _min: {
      date_at: true,
    },
    where: {
      NOT: {
        pv: null,
      },
      taskId: taskId,
    },
  });
  // ACが入力開始 -> 実績上の開始日時
  // ACが入力終了 -> 実績上の終了日時
  const actual = await context.prisma.taskActivity.aggregate({
    _max: {
      date_at: true,
    },
    _min: {
      date_at: true,
    },
    where: {
      NOT: {
        ac: null,
      },
      taskId: taskId,
    },
  });

  const now = new Date();
  const template: Pick<TaskFieldScalars, "taskId" | "created_at" | "updated_at"> = {
    taskId,
    created_at: now,
    updated_at: now,
  };

  return [
    {
      ...template,
      id: `${taskId}_plan_start_date`,
      type: "plan_start_date",
      value: plan._min.date_at?.toISOString() ?? "",
    },
    {
      ...template,
      id: `${taskId}_plan_end_date`,
      type: "plan_end_date",
      value: plan._max.date_at?.toISOString() ?? "",
    },
    {
      ...template,
      id: `${taskId}_actual_start_date`,
      type: "actual_start_date",
      value: actual._min.date_at?.toISOString() ?? "",
    },
    {
      ...template,
      id: `${taskId}_actual_end_date`,
      type: "actual_end_date",
      value: actual._max.date_at?.toISOString() ?? "",
    },
  ];
};

const getEvm = async (taskId: string, context: WocusContext, date_at: Date): Promise<TaskFieldScalars[]> => {
  const summaryValue = await context.prisma.taskActivity.aggregate({
    _sum: {
      pv: true,
      ac: true,
      ev: true,
    },
    where: {
      taskId: taskId,
      date_at: {
        lte: date_at,
      },
    },
  });
  const summaryPv = summaryValue._sum.pv ?? new Prisma.Decimal(0.0);
  const summaryAc = summaryValue._sum.ac ?? new Prisma.Decimal(0.0);
  const summaryEv = summaryValue._sum.ev ?? new Prisma.Decimal(0.0);

  // SV -> EV - PV
  const sv = summaryEv.sub(summaryPv);
  // CV -> EV - AC
  const cv = summaryEv.sub(summaryAc);
  // SPI -> EV / PV
  const spi = summaryEv.mod(summaryPv);
  // CPI -> EV / AC
  const cpi = summaryEv.mod(summaryAc);

  const now = new Date();
  const template: Pick<TaskFieldScalars, "taskId" | "created_at" | "updated_at"> = {
    taskId,
    created_at: now,
    updated_at: now,
  };

  return [
    {
      ...template,
      id: `${taskId}_pv`,
      type: "pv",
      value: summaryPv.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_ac`,
      type: "ac",
      value: summaryAc.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_ev`,
      type: "ev",
      value: summaryEv.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_sv`,
      type: "sv",
      value: sv.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_cv`,
      type: "cv",
      value: cv.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_spi`,
      type: "spi",
      value: spi.toFixed(2),
    },
    {
      ...template,
      id: `${taskId}_cpi`,
      type: "cpi",
      value: cpi.toFixed(2),
    },
  ];
};

const getRecords = async (taskId: string, context: WocusContext): Promise<TaskFieldScalars[]> => {
  return await context.prisma.taskField.findMany({
    select: {
      taskId: true,
      id: true,
      value: true,
      type: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      taskId: taskId,
    },
  });
};

/**
 * タスクの情報を返す
 * "order"              taskテーブルから取得
 * "category_1"         taskFieldテーブルから取得
 * "category_2"         taskFieldテーブルから取得
 * "category_3"         taskFieldテーブルから取得
 * "task"               taskFieldテーブルから取得
 * "note"               taskFieldテーブルから取得
 * "pic"                taskFieldテーブルから取得
 * "plan_start_date"    taskActivityテーブルから計算
 * "plan_end_date"      taskActivityテーブルから計算
 * "actual_start_date"  taskActivityテーブルから計算
 * "actual_end_date"    taskActivityテーブルから計算
 * "pv"                 taskActivityテーブルから計算
 * "ev"                 taskActivityテーブルから計算
 * "ac"                 taskActivityテーブルから計算
 * "sv"                 EV - PV
 * "cv"                 EV - AC
 * "spi"                EV / PV
 * "cpi"                EV / AC
 * @param taskId
 * @param context
 */
export const getTaskFields = async (
  task: Omit<Task, "fields" | "order">,
  context: WocusContext,
  date_at: Date
): Promise<TaskFieldScalars[]> => {
  const now = new Date();
  return [
    //...(await getRecords(task.id, context)),
    ...(await getPlan(task.id, context)),
    ...(await getEvm(task.id, context, date_at)),
  ];
};

export const getTaskSummary = async (context: WocusContext, milestoneId: string, date_at: Date) => {
  return (await context.prisma.$queryRaw`
    with base as (
      SELECT
        t.id as "taskId",
        COALESCE(min(case when act.pv is not NULL then act.date_at else NULL end), NULL) as plan_start_date,
        COALESCE(max(case when act.pv is not NULL then act.date_at else NULL end), NULL) as plan_end_date,
        COALESCE(min(case when act.ac is not NULL then act.date_at else NULL end), NULL) as actual_start_date,
        COALESCE(max(case when act.ac is not NULL then act.date_at else NULL end), NULL) as actual_end_date,
        COALESCE(sum(case when act.date_at <= ${date_at} then act.pv else 0 end), 0) as pv,
        COALESCE(sum(case when act.date_at <= ${date_at} then act.ac else 0 end), 0) as ac,
        COALESCE(sum(case when act.date_at <= ${date_at} then act.ev else 0 end), 0) as ev
      from "Milestone" as m
        join "Task" as t on t."milestoneId" = m.id
          and m.id = ${milestoneId}
        left join "TaskActivity" as act on t.id = act."taskId"
      group by t.id
    )
    select
      *,
      ${date_at} as date_lt,
      (base.ev - base.pv) as sv,
      (base.ev - base.ac) as cv,
      case when base.pv > 0 then (base.ev / base.pv) else 0 end as spi,
      case when base.ac > 0 then (base.ev / base.ac) else 0 end as cpi
    from base;
  `) as TaskSummary[];
};
