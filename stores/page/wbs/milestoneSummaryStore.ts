import {
  UpdateMilestoneSummaryDocument,
  type MilestoneFragmentFragment,
  type MilestoneSummary,
  type MutationUpdateMilestoneSummaryArgs,
} from "@/client/graphql/types/graphql";

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
export const useMilestoneSummaryStore = () => {
  const milestoneId = ref<string | undefined>();
  const _fieldMap = reactive(new Map<string, MilestoneSummary>());

  const setMilestoneId = (id: string) => {
    milestoneId.value = id;
  };

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

    const { mutate } = useMutation(UpdateMilestoneSummaryDocument);
    const data = await mutate(variables);
    const newMilestone = data?.data?.updateMilestoneSummary as MilestoneFragmentFragment | undefined;
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
   * サマリー情報をクリアする
   */
  const clear = () => {
    _fieldMap.clear();
    milestoneId.value = undefined;
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

  return {
    setMilestoneId,
    add,
    update,
    field,
    fields,
    allFields,
    clear,
  };
};
