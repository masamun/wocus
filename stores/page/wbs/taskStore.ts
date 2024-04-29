import { GetTasksDocument, CreateTaskDocument, DeleteTaskDocument } from "@/client/graphql/types/graphql";
import type {
  GetTasksQueryVariables,
  MutationCreateTaskArgs,
  MutationDeleteTaskArgs,
  QueryTasksArgs,
  Task,
} from "@/client/graphql/types/graphql";
import "~/composables/util/date";

/**
 * タスク情報を保持するストア
 */
export const useTaskStore = () => {
  const taskActivityStore = ref(useTaskActivityStore());
  const taskFieldStore = ref(useTaskFieldStore());
  const milestoneId = ref<string | undefined>("");

  // タスク一覧
  const _tasks = ref<Task[]>([]);

  /**
   * タスクの一覧を取得する
   */
  const fetchAll = async (_milestoneId: string, start_at: Date, end_at: Date) => {
    clear();
    milestoneId.value = _milestoneId;

    const variables: GetTasksQueryVariables = {
      param: {
        milestoneId: milestoneId.value,
        start_at,
        end_at,
      },
      range: {
        start_at,
        end_at,
      },
    };
    useAsyncQuery({
      query: GetTasksDocument,
      variables: variables,
      cache: false,
    }).then((response) => {
      if (response.data.value?.tasks != null) {
        task2Model(response.data.value.tasks as Task[]);
      }
    });
  };

  /**
   * タスクの情報を分解する
   * @param tasks
   */
  const task2Model = (tasks: Task[]) => {
    _tasks.value.push(...tasks);

    tasks.forEach((task) => {
      // activityは表示日付分すべて入っているわけではない
      task.activity?.forEach((activity) => {
        taskActivityStore.value.add(task.id, activity);
      });

      task.fields?.forEach((field) => {
        taskFieldStore.value.add(task.id, field);
      });
      if (task.summary) {
        taskFieldStore.value.mergeSummary(task.id, task.summary);
      }
    });
  };

  /**
   * タスクを作成する
   * @param order
   * @returns
   */
  const mutateTask = async (order?: number) => {
    if (milestoneId.value == undefined) {
      return;
    }
    const variables: MutationCreateTaskArgs = {
      param: {
        milestoneId: milestoneId.value,
        order,
      },
    };

    const { mutate } = useMutation(CreateTaskDocument);
    const data = await mutate(variables);
    if (data?.data?.createTask) {
      task2Model([data.data.createTask as Task]);
    }
  };

  /**
   * タスクを挿入する
   * @returns
   */
  const insertTask = async (insertTaskId: string | undefined) => {
    if (milestoneId.value == undefined) {
      return;
    }
    const { order } = useTaskOrder().calcTaskOrder(insertTaskId);
    return mutateTask(order);
  };

  /**
   * タスクを作成する
   * @returns
   */
  const createTask = async () => {
    if (milestoneId.value == undefined) {
      return;
    }
    return mutateTask();
  };

  /**
   * タスクを削除する
   * @param taskId
   */
  const deleteTask = async (taskId: string) => {
    const variables: MutationDeleteTaskArgs = {
      param: {
        taskId,
      },
    };

    const { mutate } = useMutation(DeleteTaskDocument);
    const data = await mutate(variables);
    if (data?.data?.deleteTask === true) {
      _tasks.value = tasks.value.filter((p) => p.id !== taskId);

      taskActivityStore.value.deleteTask(taskId);
      taskFieldStore.value.deleteTask(taskId);
    }
  };

  /**
   * タスクを取得する
   */
  const tasks = computed(() => {
    const result = _tasks.value.toSorted((a, b) => (a.order?.order ?? 0) - (b.order?.order ?? 0));
    logger.debug(`tasks length ${result.length}`);
    return result;
  });

  const clear = () => {
    _tasks.value = [];
    milestoneId.value = undefined;
    taskFieldStore.value.clear();
    taskActivityStore.value.clear();
  };

  return {
    fetchAll,
    clear,
    createTask,
    deleteTask,
    insertTask,
    tasks,
    taskActivityStore,
    taskFieldStore,
  };
};
