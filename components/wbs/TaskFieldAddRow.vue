<template>
  <div class="border-r min-h-8 max-h-8 -mt-[1px] align-middle flex items-stretch" v-show="isValid">
    <div class="fieldWidth border-l border-r border-b min-w-28 text-nowrap">
      <span
        class="flex items-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 cursor-grab"
        @click="handleCreateTask"
      >
        <PlusIcon class="h-8 w-8 p-2" />
        新規タスク
      </span>
    </div>
    <div class="border-r border-b flex-1"></div>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/outline";

const milestoneFieldStore = useMilestoneFieldStore();
const taskStore = useTaskStore();
const wbsStore = useWbsStore();

const handleCreateTask = async () => {
  await taskStore.createTask();
};

const fieldWidth = computed(() => {
  return `${milestoneFieldStore.fieldsWidth}px`;
});

const isValid = computed(() => wbsStore.milestoneId !== undefined);
</script>

<style scoped>
.fieldWidth {
  width: v-bind(fieldWidth);
}
</style>
