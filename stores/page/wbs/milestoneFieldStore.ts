import {
  UpdateMilestoneFieldDocument,
  type MilestoneFragmentFragment,
  type MilestoneField,
  type MutationUpdateMilestoneFieldArgs,
} from "@/client/graphql/types/graphql";

/**
 * フィールドのキーを生成する
 * @param milestoneId
 * @param type
 * @returns
 */
const getKey = (milestoneId: string, field: MilestoneField | string) => {
  if (typeof field === "string") {
    return `${milestoneId}_${field}`;
  }
  else {
    return `${milestoneId}_${field.type}`;
  }
};

/**
 * マイルストーンのフィールド情報を保持するストア
 */
export const useMilestoneFieldStore = () => {
  const milestoneId = ref<string | undefined>();

  const _fieldMap = reactive(new Map<string, MilestoneField>());

  const setMilestoneId = (id: string) => {
    milestoneId.value = id;
  };

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

  /**
   * フィールドの表示有無を切り替える
   */
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
   * マイルストーンのフィールド情報を削除する
   */
  const clear = () => {
    _fieldMap.clear();
    milestoneId.value = undefined;
  };

  /**
   * 表示対象のマイルストーンフィールド情報を取得する
   */
  const fields = computed(() => {
    return [..._fieldMap.values()].filter(p => p.visible).toSorted((a, b) => a.order - b.order);
  });

  /**
   * 表示対象のマイルストーンフィールド情報を取得する
   */
  const allFields = computed(() => {
    return [..._fieldMap.values()].toSorted((a, b) => a.order - b.order);
  });

  const fieldsWidth = computed(() => {
    return fields.value.filter(p => p.visible).reduce((prev, current) => prev + current.width, 0);
  });

  return {
    setMilestoneId,
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
};
