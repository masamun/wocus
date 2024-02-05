/**
 * フィールドのキーを生成する
 * @param milestoneId
 * @param type
 * @returns
 */
const getKey = (milestoneId: string, field: MilestoneSummary | string) => {
  if (typeof field === "string") {
    return `${milestoneId}_${field}`;
  } else {
    return `${milestoneId}_${field.type}`;
  }
};

/**
 * マイルストーンのフィールド情報を保持するストア
 */
export const useMilestoneSummaryStore = defineStore("milestoneSummary", () => {
  const wbsStore = useWbsStore();

  const { milestoneId } = storeToRefs(wbsStore);
  const _fieldMap = reactive(new Map<string, MilestoneSummary>());

  /**
   * フィールド情報を追加する
   * @param field
   * @returns
   */
  const add = (field: MilestoneSummary) => {
    if (milestoneId.value === undefined) {
      return;
    }
    const key = getKey(milestoneId.value, field);
    _fieldMap.set(key, { ...field });
  };

  /**
   * フィールド情報を取得する
   * @param milestoneId
   * @param date
   * @returns
   */
  const field = (type: string) => {
    if (milestoneId.value === undefined) {
      return undefined;
    }
    const key = getKey(milestoneId.value, type);
    return _fieldMap.get(key);
  };

  /**
   * フィールドの情報を更新する
   * @param type
   * @param boolean
   * @returns
   */
  const update = async (type: string, visible: boolean) => {
    if (milestoneId.value === undefined) {
      return;
    }
    const variables: MutationUpdateMilestoneSummaryArgs = {
      param: {
        milestoneId: milestoneId.value,
        values: [
          {
            type,
            visible,
          },
        ],
      },
    };

    const { mutate } = useMutation(updateMilestoneSummary);
    const data = await mutate(variables);
    const newMilestone = data?.data?.updateMilestoneSummary;
    if (newMilestone) {
      newMilestone.summaries?.forEach((field) => {
        if (milestoneId.value === undefined) {
          return;
        }
        const key = getKey(milestoneId.value, field.type);
        _fieldMap.set(key, field);
      });
    }
  };

  /**
   * フィールド情報を表示中のマイルストーンに更新する
   */
  const refresh = () => {
    clear();
    const milestone = wbsStore.milestone;

    if (milestone !== undefined) {
      wbsStore.milestone?.summaries?.forEach((field) => {
        add(field);
      });
    }
  };

  const clear = () => {
    _fieldMap.clear();
  };

  /**
   * 表示対象のマイルストーンフィールド情報を取得する
   */
  const fields = computed(() => {
    return [..._fieldMap.values()].filter((p) => p.visible).toSorted((a, b) => a.order - b.order);
  });

  /**
   * 表示対象のマイルストーンフィールド情報を取得する
   */
  const allFields = computed(() => {
    return [..._fieldMap.values()].toSorted((a, b) => a.order - b.order);
  });

  /**
   * フィールド情報の更新
   */
  watch(
    () => milestoneId.value,
    () => {
      refresh();
    }
  );

  return {
    add,
    update,
    field,
    fields,
    allFields,
    clear,
  };
});
