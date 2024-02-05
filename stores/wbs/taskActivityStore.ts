import "@/composables/util/date";

type ActivityMap = Map<string, TaskActivity>;

/**
 * 活動のキーを生成する
 * @param taskId
 * @param type
 * @returns
 */
const getKey = (_taskId: string, _date: DateString | Date) => {
  return `${_taskId}_${new Date(_date).toStringYMD()}`;
};

/**
 * 活動情報のプロクシ
 * @param srcMap
 * @param taskId
 * @param date
 * @returns
 */
export const useActivityProxy = (srcMap: ActivityMap, taskId: string, date: Date) => {
  const key = getKey(taskId, date);
  const dateString = date.toStringYMD();
  const activity = ref<TaskActivity | undefined>();
  const dateSummaryStore = useDateSummaryStore();

  /**
   * 更新用の引数テンプレートを作成する
   * @returns
   */
  const updateTemplate = () => {
    return {
      taskId: taskId,
      date_at: date.toDateWithTimezone(),
      pv: activity?.value?.pv?.toString(),
      ac: activity?.value?.ac?.toString(),
      ev: activity?.value?.ev?.toString(),
    };
  };

  const updateActivity = async (value: number | undefined, key: "pv" | "ac" | "ev") => {
    const variables: MutationUpdateTaskActivityArgs = {
      param: [
        {
          ...updateTemplate(),
          [key]: value?.toFixed(2),
        },
      ],
    };
    const { mutate, error } = useMutation(updateTaskActivity, () => ({
      variables: variables,
    }));
    const data = await mutate();
    if (data?.data == null || data.data?.updateTaskActivity === null) {
      console.info(`updateActivity return null`);
      return;
    }

    if (!error.value) {
      // 更新されたデータを反映する(I/F上は複数更新可能)
      data.data.updateTaskActivity.forEach((activity, index) => {
        const _key = getKey(activity.taskId, activity.date_at);
        srcMap.set(_key, activity);

        console.info(`updateActivity ${dateString} ${index} PV: ${activity.pv} AC: ${activity.ac} EV: ${activity.ev}`);
      });
      dateSummaryStore.fetchAll();
    }
  };

  const updatePv = async (value: number | undefined) => {
    await updateActivity(value, "pv");
  };

  const updateAc = async (value: number | undefined) => {
    await updateActivity(value, "ac");
  };

  const updateEv = async (value: number | undefined) => {
    await updateActivity(value, "ev");
  };

  watch(
    () => srcMap.get(key),
    () => {
      activity.value = srcMap.get(key);

      //logger.debug(`watch activityProxy ${taskId} ${dateString} ${activity.value}`);
    },
    {
      immediate: true,
      deep: true,
    }
  );

  return {
    activity,
    updatePv,
    updateAc,
    updateEv,
  };
};

/**
 * タスク情報を保持するストア
 */
export const useTaskActivityStore = defineStore("taskActivity", () => {
  const wbsStore = useWbsStore();
  const { milestoneId } = storeToRefs(wbsStore);

  // TaskID: <DateString, TaskActivity>
  // タスクIDとフィールドタイプからフィールドを参照するテーブル
  // キーはタスクID+日付文字列
  const _activityMap = reactive(new Map<string, TaskActivity>());

  // タスクIDに紐づくactivityのキーマップ
  const _taskMap = reactive(new Map<string, string[]>());

  /**
   * 活動を追加する
   * @param taskId
   * @param activity
   */
  const add = (taskId: string, activity: TaskActivity) => {
    const key = getKey(taskId, activity.date_at);
    _activityMap.set(key, activity);

    if (!_taskMap.has(taskId)) {
      _taskMap.set(taskId, []);
    }
    _taskMap.get(taskId)?.push(key);
  };

  /**
   * タスクに紐づく活動を全て削除する
   * @param taskId
   */
  const deleteTask = (taskId: string) => {
    const keys = _taskMap.get(taskId) ?? [];

    keys.forEach((key) => {
      _activityMap.delete(key);
    });
    _taskMap.delete(taskId);
  };

  /**
   * 活動を取得する
   * @param taskId
   * @param date
   * @returns
   */
  const activity = (taskId: string, date: Date) => {
    return useActivityProxy(_activityMap, taskId, date);
  };

  const clear = () => {
    _activityMap.clear();
    _taskMap.clear();
  };

  watch(
    milestoneId,
    async () => {
      console.info(`useTaskActivityStore watch milestoneId ${milestoneId.value}`);
      clear();
    },
    {
      immediate: true,
    }
  );

  return {
    add,
    deleteTask,
    clear,
    activity,
  };
});
