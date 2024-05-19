<template>
  <div class="pl-24 pr-8 relative">
    <!-- ドロップライン上表示 -->
    <div
      v-if="taskDragStore.dragging && taskDragStore.draggingIndex === 0"
      class="absolute top-0 -mt-1.5 h-2 left-0 right-0 bg-cyan-200 opacity-30"
    />
    <!-- タスク -->
    <div
      v-for="(task, index) in taskStore.tasks"
      :key="index"
      class="-ml-24 pl-24 group flex relative"
      :draggable="taskDragStore.draggableTask === task.id"
      @dragstart="handleDragStart($event, task.id, index)"
      @dragend="handleDragEnd"
    >
      <!-- タスク操作 -->
      <task-operator
        :task="task"
        class="group-hover:flex hidden"
      />
      <!-- メタ情報 -->
      <task-field-row :task="task" />
      <!-- タスク情報サマリ -->
      <div class="border-l border-r min-w-28 max-w-36 align-middle flex items-stretch">
        <div class="w-full">
          <task-summary-cell
            :task-id="task.id"
            :activity-type="'pv'"
            class="h-8 text-center border-b"
          />
          <task-summary-cell
            :task-id="task.id"
            :activity-type="'ac'"
            class="h-8 text-center border-b"
          />
          <task-summary-cell
            :task-id="task.id"
            :activity-type="'ev'"
            class="h-8 text-center border-b"
          />
        </div>
      </div>
      <!-- 実績情報 -->
      <div
        v-for="(dateInfo, pi2) in wbsStore.range"
        :key="pi2"
        class="border-b border-r w-80 min-w-[80px] max-w-[80px] align-middle"
        :class="{
          'bg-blue-50': dateInfo.isSaturday,
          'bg-red-50': dateInfo.isSunday,
          'bg-yellow-50': dateInfo.isToday,
        }"
      >
        <div class="flex flex-col">
          <task-activity-cell
            :task-id="task.id"
            :date="dateInfo.date"
            :activity-type="'pv'"
            class="h-8 border-b"
          />
          <task-activity-cell
            :task-id="task.id"
            :date="dateInfo.date"
            :activity-type="'ac'"
            class="h-8 border-b"
          />
          <task-activity-cell
            :task-id="task.id"
            :date="dateInfo.date"
            :activity-type="'ev'"
            class="h-8"
          />
        </div>
      </div>
      <!-- ドロップライン表示 -->
      <div
        v-if="taskDragStore.dragging && taskDragStore.draggingIndex === index + 1"
        class="absolute top-full -mt-1.5 h-2 left-0 right-0 bg-cyan-200 opacity-30"
      />
      <!-- ドロップエリア上 -->
      <div
        v-if="taskDragStore.dragging"
        class="absolute top-0 bottom-1/2 left-0 right-0 opacity-10"
        @dragover="handleDragOver($event, index)"
        @dragleave="handleDragLeave($event)"
        @drop="handleDrop($event, index - 1)"
      />
      <!-- ドロップエリア下 -->
      <div
        v-if="taskDragStore.dragging"
        class="absolute top-1/2 bottom-0 left-0 right-0 opacity-10"
        @dragover="handleDragOver($event, index + 1)"
        @dragleave="handleDragLeave($event)"
        @drop="handleDrop($event, index)"
      />
    </div>
    <!-- タスクの追加 -->
    <task-field-add-row class="-ml-24 pl-24" />
  </div>
</template>

<script lang="ts" setup>
const taskStore = useMilestoneStore().taskStore;
const taskDragStore = useTaskDragStore();
const wbsStore = useWbsStore();

const handleDragStart = (payload: DragEvent, taskId: string, index: number) => {
  taskDragStore.dragStart(payload, taskId, index);
};
const handleDragEnd = (payload: DragEvent) => {
  taskDragStore.dragEnd(payload);
};
const handleDragOver = (payload: DragEvent, index: number) => {
  taskDragStore.dragOver(payload, index);
};
const handleDragLeave = (payload: DragEvent) => {
  taskDragStore.dragLeave(payload);
};
const handleDrop = (payload: DragEvent, index: number) => {
  taskDragStore.drop(payload, index);
};
</script>
