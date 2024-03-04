import "@/composables/util/date";
import type { MilestoneFragmentFragment } from "../graphql/codegen/graphql";

/**
 * フィールドのキーを生成する
 * @param milestoneId
 * @param type
 * @returns
 */
const getKey = (milestoneId: string, field: MilestoneField | string) => {
  if (typeof field === "string") {
    return `${milestoneId}_${field}`;
  } else {
    return `${milestoneId}_${field.type}`;
  }
};

/**
 * マイルストーンのフィールド情報を保持するストア
 */
export const useMilestoneFieldStore = defineStore("milestoneField", () => {
  const wbsStore = useWbsStore();

  const { milestoneId } = storeToRefs(wbsStore);
  const _fieldMap = reactive(new Map<string, MilestoneField>());

  /**
   * フィールド情報を追加する
   * @param field
   * @returns
   */
  const add = (field: MilestoneField) => {
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
   * フィールドの表示幅を更新する
   * @param type
   * @param width
   * @param boolean
   * @returns
   */
  const update = async (type: string, width: number, visible: boolean) => {
    if (milestoneId.value === undefined) {
      return;
    }
    const variables: MutationUpdateMilestoneFieldArgs = {
      param: {
        milestoneId: milestoneId.value,
        values: [
          {
            type,
            width,
            visible,
          },
        ],
      },
    };

    const { mutate } = useMutation(UpdateMilestoneFieldDocument);
    const data = await mutate(variables);
    const newMilestone = data?.data?.updateMilestoneField as MilestoneFragmentFragment | undefined;
    if (newMilestone) {
      newMilestone.fields?.forEach((field) => {
        if (milestoneId.value === undefined) {
          return;
        }
        const key = getKey(milestoneId.value, field.type);
        _fieldMap.set(key, field);
      });
    }
  };

  /**
   * フィールドのサイズを変更する
   * @param type
   * @param width
   * @returns
   */
  const movementWidth = async (type: string, width: number) => {
    // logger.debug(`movementFieldWidth ${width}`);
    if (milestoneId.value === undefined) {
      return;
    }
    const key = getKey(milestoneId.value, type);
    const field = _fieldMap.get(key);

    if (field !== undefined && field.width + width > 19) {
      field.width += width;
    }
  };

  const changeVisible = async (type: string, visible: boolean) => {
    logger.debug(`changeVisible ${type} ${visible}`);
    if (milestoneId.value === undefined) {
      return;
    }
    const key = getKey(milestoneId.value, type);
    const field = _fieldMap.get(key);

    if (field !== undefined) {
      field.visible = visible;
    }
  };

  /**
   * フィールド情報を表示中のマイルストーンに更新する
   */
  const refresh = () => {
    clear();
    const milestone = wbsStore.milestone;

    if (milestone !== undefined) {
      wbsStore.milestone?.fields?.forEach((field) => {
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

  const fieldsWidth = computed(() => {
    return fields.value.filter((p) => p.visible).reduce((prev, current) => prev + current.width, 0);
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
    movementWidth,
    changeVisible,
    field,
    fields,
    fieldsWidth,
    allFields,
    clear,
  };
});
