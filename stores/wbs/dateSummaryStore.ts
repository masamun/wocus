import { type DateSummary, type QueryDateSummaryArgs, GetDateSummeryDocument } from "~/client/graphql/types/graphql";

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
    (newValue, oldValue) => {
      dateSummary.value = newValue;

      //const value = (newValue ?? oldValue)?.date;
      //const logDate = value !== undefined ? new Date(value).toStringYMD() : "-";
      //console.info(`updateDateSummary ${key} Date: ${logDate} ${JSON.stringify(newValue)}`);
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
export const useDateSummaryStore = defineStore("dateSummary", () => {
  const wbsStore = useWbsStore();
  const { milestoneId, startShowDate, endShowDate } = storeToRefs(wbsStore);

  // 日付ごとの活動サマリー
  const _summaryMap = reactive(new Map<string, DateSummary>());

  const fetchAll = async () => {
    if (milestoneId.value !== undefined) {
      await fetchDateSummery();
    } else {
      logger.debug(`useDateSummaryStore FeatchAll milestoneId undefined`);
    }
  };

  /**
   * 指定された日のサマリーを取得する
   * @param date
   */
  const fetchDateSummery = async () => {
    if (milestoneId.value === undefined) {
      return;
    }
    logger.debug("call fetchDateSummery");
    const variables: QueryDateSummaryArgs = {
      param: {
        start_at: startShowDate.value.toDateWithTimezone(),
        end_at: endShowDate.value.toDateWithTimezone(),
        milestoneId: milestoneId.value,
      },
    };

    const { data, error } = await useAsyncQuery({
      query: GetDateSummeryDocument,
      variables: variables,
      cache: false,
    });

    if (!error.value) {
      data.value.dateSummary.dates.forEach((ds) => {
        const key = new Date(ds.date).toStringYMD();
        _summaryMap.set(key, ds);
      });
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
      data.value.dateSummary.dates.forEach((ds) => {
        logger.debug(`refreshDateSummery set ${new Date(ds.date).toStringYMD()}`);
        _summaryMap.set(new Date(ds.date).toStringYMD(), ds);
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

  /**
   * マイルストーンが変わった際は読み込みしなおす
   */
  watch(
    milestoneId,
    async () => {
      logger.info(`dateSummaryStore watch milestoneId ${milestoneId.value}`);
      _summaryMap.clear();
      fetchAll();
    },
    {
      immediate: true,
    }
  );

  /**
   * 表示する日時が変わった場合は、サマリーを取得しなおす
   */
  watch(
    () => wbsStore.range,
    () => {
      fetchAll();
    }
  );

  return {
    fetchAll,
    refreshDateSummery,
    dateSummary,
  };
});
