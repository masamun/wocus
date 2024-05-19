<template>
  <div class="pl-24 flex w-full">
    <div class="h-9 field flex items-center justify-start relative mr-8">
      <drop-down-menu>
        <drop-down-sub-menu label="タスク情報">
          <drop-down-menu-check-item
            v-for="(item, index) in milestoneField"
            :key="index"
            :checked="item.visible"
            @click="handleFieldChanged(item)"
          >
            {{ item.title }}
          </drop-down-menu-check-item>
        </drop-down-sub-menu>
        <drop-down-sub-menu label="サマリー">
          <drop-down-menu-check-item
            v-for="(item, index) in milestoneSummaryStore.allFields"
            :key="index"
            :checked="item.visible"
            @click="handleSummaryChanged(item)"
          >
            {{ item.title }}
          </drop-down-menu-check-item>
        </drop-down-sub-menu>
      </drop-down-menu>
    </div>
    <div :class="`sticky h-9 left-0 w-[calc(100%-${fieldWidth})] flex items-center justify-end`">
      <div class="w-96 left-0 flex flex-row items-center text-gray-400">
        <chevron-left-icon
          class="h-7 w-7 mr-2 p-1 hover:text-gray-600 hover:bg-gray-200 rounded cursor-pointer"
          @click="handlePrevDate"
        />
        <month-calendar
          v-model="startShowDate"
          class="bg-transparent h-7 pl-2 hover:bg-gray-200 text-gray-600 rounded cursor-pointer"
        />
        <chevron-right-icon
          class="h-7 w-7 ml-2 p-1 hover:text-gray-600 hover:bg-gray-200 rounded cursor-pointer"
          @click="handleNextDate"
        />
        <select
          v-model="showRange"
          name="show-range"
          title="表示期間"
          class="ml-3 bg-transparent h-8 p-1 text-gray-600 rounded cursor-pointer"
        >
          <option
            disabled
            value=""
          >
            表示期間
          </option>
          <option
            class="hover:shadow-transparent"
            value="1"
          >
            1か月分
          </option>
          <option
            class="hover:shadow-transparent"
            value="2"
          >
            2か月分
          </option>
          <option
            class="hover:shadow-transparent"
            value="3"
          >
            3か月分
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { MilestoneField, MilestoneSummary } from "~/client/graphql/types/graphql";

const wbsStore = useWbsStore();
const milestoneFieldStore = useMilestoneStore().fields;
const milestoneSummaryStore = useMilestoneStore().summary;
const { showRange: wbsShowRange } = storeToRefs(wbsStore);

const fieldWidth = computed(() => {
  return `${milestoneFieldStore.fieldsWidth}px`;
});

const startShowDate = computed({
  get: () => wbsStore.startShowDate,
  set: v => wbsStore.setCurrentDate(v),
});

const showRange = computed({
  get: () => wbsShowRange.value,
  set: v => wbsStore.setShowRange(v),
});

const milestoneField = computed(() => {
  return milestoneFieldStore.allFields;
});

const handlePrevDate = () => {
  wbsStore.prevCurrentDate();
};

const handleNextDate = () => {
  wbsStore.nextCurrentDate();
};
const handleFieldChanged = (item: MilestoneField) => {
  // console.info(value);
  milestoneFieldStore.update(item.type, item.width, !item.visible);
};
const handleSummaryChanged = (item: MilestoneSummary) => {
  milestoneSummaryStore.update(item.type, !item.visible);
};
</script>

<style scoped>
.field {
  width: v-bind(fieldWidth);
}
.fieldWidth {
  margin-left: v-bind(fieldWidth);
}
</style>
