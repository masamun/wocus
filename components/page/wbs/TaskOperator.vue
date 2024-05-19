<template>
  <div class="absolute left-6 top-0 bottom-0 flex items-center">
    <span
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <drop-down-menu>
        <template #button>
          <Bars4Icon
            class="h-8 w-8 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer"
          />
        </template>
        <drop-down-menu-item @click="handleDeleteClick"> 削除 </drop-down-menu-item>
      </drop-down-menu>
    </span>
    <PlusIcon
      class="h-8 w-8 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer"
      @click="handleCreateTask"
    />
    <div class="w-[0.55em]" />
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon, Bars4Icon } from "@heroicons/vue/24/outline";

import type { Task } from "~/client/graphql/types/graphql";

interface Props {
  /**
   * タスク情報
   */
  task: Task;
}

const props = defineProps<Props>();
const taskStore = useMilestoneStore().taskStore;
const taskDragStore = useTaskDragStore();

const handleDeleteClick = async () => {
  await taskStore.deleteTask(props.task.id);
};

const handleCreateTask = async () => {
  console.info(`handleAddTask`);

  await taskStore.insertTask(props.task.id);
};

const handleMouseEnter = () => {
  taskDragStore.mouseEnter(props.task.id);
};
const handleMouseLeave = () => {
  taskDragStore.mouseLeave();
};
</script>
