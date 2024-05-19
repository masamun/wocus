<template>
  <div class="flex flex-col items-stretch">
    <div class="flex flex-row flex-nowrap items-stretch">
      <div
        v-for="(field, index) in fieldGroups"
        :key="index"
        :field="field"
        class="border-b border-t min-w-[20px] flex-col flex justify-center items-center relative p-1"
        :class="{ 'border-r': field.border }"
        :style="{ width: field.width + 'px' }"
        :data-group="field.group"
      >
        <span v-if="field.write">
          {{ field.group }}
        </span>
      </div>
    </div>
    <div class="flex flex-row flex-nowrap flex-grow-0 items-stretch h-full">
      <MilestoneFieldCell
        v-for="(field, index) in milestoneFieldStore.fields"
        :key="index"
        :field="field"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const milestoneFieldStore = useMilestoneStore().fields;

const fieldGroups = computed(() => {
  return milestoneFieldStore.fields.map((value, index, array) => {
    if (array.length === 1) {
      return {
        ...value,
        border: true,
        write: true,
      };
    }
    // 最後
    if (index + 1 === array.length) {
      return {
        ...value,
        border: true,
        write: value.group !== array[index - 1].group,
      };
    }
    // 最初
    if (index === 0) {
      return {
        ...value,
        border: value.group !== array[index + 1].group,
        write: true,
      };
    }
    return {
      ...value,
      border: value.group !== array[index + 1].group,
      write: value.group !== array[index - 1].group,
    };
  });
});
</script>
