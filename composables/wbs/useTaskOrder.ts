import { UpdateTaskOrderDocument, type MutationUpdateTaskOrderArgs } from "~/client/graphql/types/graphql";

export function useTaskOrder() {
  const taskStore = useTaskStore();

  const calcPrevOrder = (index: number, length: number) => {
    if (index >= 0) {
      if (index + 1 < length) {
        return taskStore.tasks[index].order?.order;
      } else {
        return taskStore.tasks[length - 1].order?.order;
      }
    } else {
      return 0.0;
    }
  };

  const calcNextOrder = (index: number, length: number) => {
    // 先頭に追加するパターン
    if (index >= 0) {
      if (index + 1 < length) {
        return taskStore.tasks[index + 1].order?.order;
      } else {
        return (taskStore.tasks[length - 1].order?.order ?? 0.0) + 1.0;
      }
    } else {
      return taskStore.tasks[0].order?.order;
    }
  };

  const calcTaskOrderByIndex = (index: number) => {
    const length = taskStore.tasks.length;
    if (length === 0) {
      return {
        prevOrder: 0.0,
        nextOrder: 0.0,
        order: 1.0,
        refresh: false,
      };
    }
    const prevOrder = calcPrevOrder(index, length) ?? 0;
    const nextOrder = calcNextOrder(index, length) ?? 0;
    const order = (prevOrder + nextOrder) / 2;
    const refresh = nextOrder - prevOrder < 0.000001;
    return {
      prevOrder,
      nextOrder,
      order,
      refresh,
    };
  };

  const calcTaskOrder = (taskId: string | undefined) => {
    const index = taskStore.tasks.findIndex((p) => p.id === taskId) - 1;

    return calcTaskOrderByIndex(index);
  };

  /**
   * タスクを追加する場合の表示順を取得する
   * @returns
   */
  const calcTaskLastOrder = () => {
    return (taskStore.tasks.at(-1)?.order?.order ?? 0.0) + 1.0;
  };

  /**
   * タスクの表示順を変更する
   * @param taskId
   * @param order
   * @param refresh
   * @returns
   */
  const changeTaskOrder = async (taskId: string, order: number, refresh: boolean) => {
    const variables: MutationUpdateTaskOrderArgs = {
      param: {
        taskId,
        order,
        refresh,
      },
    };
    const { mutate } = useMutation(UpdateTaskOrderDocument);
    const data = await mutate(variables);
    if (data?.data?.updateTaskOrder === undefined) {
      console.warn("update task order failed");
      return;
    }
    data.data.updateTaskOrder.forEach((response) => {
      const taskIndex = taskStore.tasks.findIndex((p) => p.id === response.id);
      const taskOrder = taskStore.tasks[taskIndex];
      if (taskIndex > -1 && taskOrder != undefined && taskOrder.order != undefined) {
        taskOrder.order.order = response.order?.order ?? 0;
      }
    });
  };
  return {
    calcTaskOrder,
    calcTaskOrderByIndex,
    calcTaskLastOrder,
    changeTaskOrder,
  };
}
