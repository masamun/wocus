import {
  type DateSummary,
  type QueryDateSummaryArgs,
  GetDateSummeryDocument,
  type SummaryInfo,
} from "~/client/graphql/types/graphql";

/**
 * タスクのアクティビティに登録する情報
 */
export type ActivityType = "pv" | "ac" | "ev";

type DateSummaryMap = Map<string, DateSummary>;

/**
 * 日別のサマリ情報をプロクシするオブジェクト
 * @param srcMap
 * @param key
 * @returns
 */
export const useDateSummaryProxy = (srcMap: DateSummaryMap, date: Date) => {
  const key = ref<string>(date.toStringYMD());
  const dateSummary = ref<DateSummary | undefined>();

  const setDate = (date: Date) => {
    key.value = date.toStringYMD();
  };

  watch(
    () => srcMap.get(key.value),
    (newValue) => {
      dateSummary.value = newValue;
    },
    {
      deep: true,
    }
  );

  return {
    dateSummary,
    setDate,
  };
};
export type DateSummaryProxyType = ReturnType<typeof useDateSummaryProxy>;

/**
 * タスク情報を保持するストア
 */
export const useDateSummaryStore = () => {
  const milestoneId = ref<string | undefined>();

  // 表示範囲外の活動情報
  const _summaryInfo = ref<SummaryInfo>();

  // 日付ごとの活動サマリー
  const _summaryMap = reactive(new Map<string, DateSummary>());

  const fetchAll = async (milestoneId: string, start_at: Date, end_at: Date) => {
    const variables: QueryDateSummaryArgs = {
      param: {
        //start_at: startShowDate.value.toDateWithTimezone(),
        //end_at: endShowDate.value.toDateWithTimezone(),
        start_at,
        end_at,
        milestoneId,
      },
    };

    const { data, error } = await useAsyncQuery({
      query: GetDateSummeryDocument,
      variables: variables,
      cache: false,
    });

    if (!error.value) {
      _summaryMap.clear();
      data.value?.dateSummary.dates.forEach((ds) => {
        const key = new Date(ds.date).toStringYMD();
        _summaryMap.set(key, ds);
      });
      // _summaryInfo.value = data.value.dateSummary.info;
    } else {
      logger.info(`${error.value.cause}`);
    }
  };

  const refreshDateSummery = async (date: Date) => {
    if (milestoneId.value === undefined) {
      return;
    }
    const variables: QueryDateSummaryArgs = {
      param: {
        start_at: date.toDateWithTimezone(),
        end_at: date.toDateWithTimezone(),
        milestoneId: milestoneId.value,
      },
    };

    const { data, error } = await useAsyncQuery({
      query: GetDateSummeryDocument,
      variables: variables,
      cache: false,
    });

    if (!error.value) {
      data.value?.dateSummary.dates.forEach((ds) => {
        logger.debug(`refreshDateSummery set ${new Date(ds.date).toStringYMD()}`);
        _summaryMap.set(new Date(ds.date).toStringYMD(), ds);
        //_summaryInfo.value = data.value.dateSummary.info;
      });
    } else {
      logger.info(`${error.value.cause}`);
    }
  };

  /**
   * 各日のサマリー用プロクシオブジェクトを返す
   * @param date
   * @returns
   */
  const dateSummary = (date: Date) => {
    return useDateSummaryProxy(_summaryMap, date);
  };

  const clear = () => {
    _summaryMap.clear();
    _summaryInfo.value = undefined;
  };

  return {
    fetchAll,
    refreshDateSummery,
    dateSummary,
    clear,
  };
};
