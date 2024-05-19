import {
  UpdateTaskFieldDocument,
  type MutationUpdateTaskFieldArgs,
  type TaskField,
  type TaskSummary,
} from "~/client/graphql/types/graphql";

/**
 * フィールドのキーを生成する
 * @param taskId
 * @param type
 * @returns
 */
const getKey = (taskId: string, field: TaskField | string) => {
  if (typeof field === "string") {
    return `${taskId}_${field}`;
  }
  else {
    return `${taskId}_${field.type}`;
  }
};

/**
 * タスク情報を保持するストア
 */
export const useTaskFieldStore = () => {
  // タスクIDとフィールドタイプからフィールドを参照するテーブル
  const _fieldMap = reactive(new Map<string, TaskField>());
  // タスクIDに紐づくfieldのキーマップ
  const _taskMap = reactive(new Map<string, Set<string>>());

  /**
   * タスクのフィールドを追加する
   * @param taskId
   * @param field
   */
  const add = (taskId: string, field: TaskField) => {
    const key = getKey(taskId, field);
    _fieldMap.set(key, field);

    if (!_taskMap.has(taskId)) {
      _taskMap.set(taskId, new Set<string>());
    }
    _taskMap.get(taskId)?.add(key);
  };

  /**
   * タスクのサマリーをフィールドとしてマージする
   * @param taskId
   * @param summary
   */
  const mergeSummary = (taskId: string, summary: TaskSummary) => {
    Object.keys(summary).forEach((key) => {
      const value = summary[key as keyof typeof summary];

      const field: TaskField = {
        id: "",
        type: key,
        value: value?.toString() ?? "",
      };
      add(taskId, field);
    });
  };

  /**
   * タスクに紐づくフィールドを全て削除する
   * @param taskId
   */
  const deleteTask = (taskId: string) => {
    const keys = _taskMap.get(taskId) ?? new Set<string>();

    [...keys.keys()].forEach((key) => {
      _fieldMap.delete(key);
    });
    _taskMap.delete(taskId);
  };

  /**
   * 活動を取得する
   * @param taskId
   * @param date
   * @returns
   */
  const field = (taskId: string, type: string) => {
    const key = getKey(taskId, type);
    return _fieldMap.get(key);
  };

  /**
   * タスクのフィールドを更新する
   * @param taskId
   * @param type
   * @param input
   */
  const update = async (taskId: string, type: string, value: string) => {
    const variables: MutationUpdateTaskFieldArgs = {
      param: [{ taskId, type, value }],
    };

    console.info(`updateField ${taskId} ${type} ${value}`);

    const { mutate } = useMutation(UpdateTaskFieldDocument);
    const data = await mutate(variables);
    if (data?.data?.updateTaskField == undefined) {
      console.warn("update field response undefined");
      return;
    }
    data.data.updateTaskField.forEach((updatedTask) => {
      updatedTask.fields?.forEach((field) => {
        const key = getKey(updatedTask.id, field);
        _fieldMap.set(key, field);
      });
    });
  };

  const clear = () => {
    _fieldMap.clear();
    _taskMap.clear();
  };

  return {
    add,
    mergeSummary,
    deleteTask,
    update,
    field,
    clear,
  };
};
