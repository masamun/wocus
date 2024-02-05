import { mutationDeleteTask, mutationTask, queryTaskActivity, queryTaskWithActivity } from "../graphql/query/query";
import type {
  MutationCreateTaskArgs,
  MutationDeleteTaskArgs,
  QueryTasksArgs,
  QueryTaskActivitiesArgs,
  TaskWithActivity,
} from "../graphql/codegen/graphql";
import "@/composables/util/date";
import { useTaskFieldStore } from "./taskFieldStore";
import { useTaskActivityStore } from "./taskActivityStore";

/**
 * タスク情報を保持するストア
 */
export const useTaskStore = defineStore("task", () => {
  const taskActivityStore = useTaskActivityStore();
  const taskFieldStore = useTaskFieldStore();
  const wbsStore = useWbsStore();
  const { milestoneId } = storeToRefs(wbsStore);

  // タスク一覧
  const _tasks = ref<TaskWithActivity[]>([]);

  /**
   * タスクの一覧を取得する
   */
  const fetchAll = async () => {
    if (milestoneId.value !== undefined) {
      await fetchTasks();
    } else {
      console.info(`task FeatchAll milestoneId undefined`);
    }
  };

  /**
   * タスクの一覧を取得する
   */
  const fetchTasks = async () => {
    console.info(`call fetchTasks`);
    if (milestoneId.value === undefined) {
      return;
    }
    taskFieldStore.clear();
    _tasks.value.splice(0);

    const variables: QueryTasksArgs = {
      param: {
        milestoneId: milestoneId.value,
      },
    };
    useAsyncQuery({
      query: queryTaskWithActivity,
      variables: variables,
      cache: false,
    }).then((response) => {
      if (response.data.value.taskWithActivities !== null) {
        task2Model(response.data.value.taskWithActivities as TaskWithActivity[]);
      }
    });
  };

  /**
   * タスクの情報を分解する
   * @param tasks
   */
  const task2Model = (tasks: TaskWithActivity[]) => {
    _tasks.value.push(...tasks);

    tasks.forEach((task) => {
      // activityは表示日付分すべて入っているわけではない
      task.activity?.forEach((activity) => {
        taskActivityStore.add(task.id, activity);
      });

      task.fields?.forEach((field) => {
        taskFieldStore.add(task.id, field);
      });
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

    const { mutate } = useMutation(mutationTask);
    const data = await mutate(variables);
    if (data?.data?.createTask) {
      task2Model([data.data.createTask as TaskWithActivity]);
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

    const { mutate } = useMutation(mutationDeleteTask);
    const data = await mutate(variables);
    if (data?.data?.deleteTask === true) {
      _tasks.value = tasks.value.filter((p) => p.id !== taskId);

      taskActivityStore.deleteTask(taskId);
      taskFieldStore.deleteTask(taskId);
    }
  };

  const refreshActivities = async () => {
    logger.info("refreshActivities");
    taskActivityStore.clear();
    const variables: QueryTaskActivitiesArgs = {
      param: {
        taskIds: _tasks.value.map((p) => p.id),
        start_at: wbsStore.startShowDate,
        end_at: wbsStore.endShowDate,
      },
    };
    useAsyncQuery({
      query: queryTaskActivity,
      variables: variables,
      cache: false,
    }).then((response) => {
      taskActivityStore.clear();
      (response.data.value.taskActivities ?? []).forEach((activity) => {
        taskActivityStore.add(activity.taskId, activity);
      });
    });
  };

  /**
   * タスクを取得する
   */
  const tasks = computed(() => {
    const result = _tasks.value.toSorted((a, b) => a.order.order - b.order.order);
    logger.debug(`tasks length ${result.length}`);
    return result;
  });

  /**
   * 表示するマイルストーンが変わった場合
   */
  watch(
    milestoneId,
    async () => {
      console.info(`taskStore watch milestoneId ${milestoneId.value}`);
      _tasks.value.splice(0);
      fetchAll();
    },
    {
      immediate: true,
    }
  );

  /**
   * 表示する日時が変わった場合は、タスクの活動を取得しなおす
   */
  watch(
    () => wbsStore.range,
    () => {
      refreshActivities();
    }
  );

  return {
    fetchAll,
    fetchTasks,
    createTask,
    deleteTask,
    insertTask,
    tasks,
  };
});
