<template>
  <div
    v-for="(field, index) in fields"
    :key="index"
    class="border-l border-b min-w-[20px] max-h-24 align-middle flex items-stretch"
    :style="{ 'min-width': field.width + 'px' }"
  >
    <TaskFieldCell :task-id="props.task.id" :field="field" class="overflow-hidden break-all" />
  </div>
</template>

<script lang="ts" setup>
import type { Task } from "~/client/graphql/types/graphql";

interface Props {
  /**
   * タスク情報
   */
  task: Task;
}

const props = defineProps<Props>();
const milestoneFieldStore = useMilestoneStore().fields;

const fields = computed(() => {
  return milestoneFieldStore.fields;
});
</script>
