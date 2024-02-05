/**
 * タスクのドラッグ操作を管理するストア
 */
export const useTaskDragStore = defineStore("taskDrag", () => {
  const taskStore = useTaskStore();
  const { calcTaskOrderByIndex, changeTaskOrder } = useTaskOrder();
  // ドラッグ中のタスクID
  const draggingTask = ref<string | undefined>();
  // ドラッグ先の表示位置
  const dragStartIndex = ref(0);
  // ドラッグ先の表示位置
  const draggingIndex = ref(0);
  const draggableTask = ref<string | undefined>();

  /**
   * ドラッグ用の要素に入った
   *   タスクの行がドラッグ可能としてマークするための設定を行う
   * @param taskId
   */
  const mouseEnter = (taskId: string) => {
    // タスクが1個以下の場合はドラッグできないようにする
    if (taskStore.tasks.length > 1) {
      console.info(`mouseEnter ${taskId}`);
      draggableTask.value = taskId;
    }
  };

  /**
   * ドラッグ用の要素から出た
   */
  const mouseLeave = () => {
    console.info(`mouseLeave`);
    // ドラッグ中はdraggingが有効なままになるようにする
    if (!dragging.value) {
      draggableTask.value = undefined;
    }
  };

  /**
   * タスクをドラッグ開始
   */
  const dragStart = (_: DragEvent, taskId: string, index: number) => {
    console.info(`dragStart ${taskId} ${index}`);
    draggingTask.value = taskId;
    draggingIndex.value = index;
    dragStartIndex.value = index;
  };

  /**
   * タスクのドラッグ終了
   */
  const dragEnd = (_: DragEvent) => {
    console.info(`dragEnd`);
    draggingTask.value = undefined;
    draggableTask.value = undefined;
  };

  /**
   * ドロップ対象の上から外れた
   */
  const dragLeave = (_: DragEvent) => {
    draggingIndex.value = -1;
  };

  /**
   * ドロップ対象の上を通過
   */
  const dragOver = (payload: DragEvent, index: number) => {
    console.info(`dragOver ${index}`);
    // ドロップできるように既定の動作を停止
    payload.preventDefault();

    if (draggingIndex.value !== index) {
      draggingIndex.value = index;
    }
  };

  /**
   * タスクをドロップ
   */
  const drop = async (payload: DragEvent, index: number) => {
    // 既定の動作（一部の要素でリンクとして開く）を行わないようにする。
    payload.preventDefault();

    const taskId = draggableTask.value;
    const { order, refresh } = calcTaskOrderByIndex(index);
    const change = ![index, index + 1].includes(dragStartIndex.value);

    if (change && taskId !== undefined) {
      await changeTaskOrder(taskId, order, refresh);
    }

    console.info(`drop ${dragStartIndex.value} -> ${index} ${order}, ${change}`);
  };

  const dragging = computed(() => {
    return draggingTask.value !== undefined;
  });

  return {
    draggableTask: readonly(draggableTask),
    draggingIndex: readonly(draggingIndex),
    dragStartIndex: readonly(dragStartIndex),
    dragging,
    mouseEnter,
    mouseLeave,
    dragStart,
    dragEnd,
    dragOver,
    dragLeave,
    drop,
  };
});
