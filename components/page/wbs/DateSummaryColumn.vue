<template>
  <div
    class="border-b last:border-b-0 text-right pr-2 h-7"
    @click="handleRefreshDateSummary(date)"
  >
    {{ date.toStringMD() }}
  </div>
  <div
    v-for="(item, index) in fields"
    :key="index"
    class="border-b last:border-b-0 text-right pr-2 h-7"
  >
    {{ value(item) }}
  </div>
</template>

<script lang="ts" setup>
import type { DateSummary, MilestoneSummary } from "~/client/graphql/types/graphql";

interface Props {
  /**
   * 日付
   */
  date: Date;
}

const props = defineProps<Props>();
const dateSummaryStore = useMilestoneStore().dateSummaryStore;
const dateSummary = dateSummaryStore.dateSummary(props.date);
const milestoneSummaryStore = useMilestoneStore().summary;

/**
 * タスクを作成する
 */
const handleRefreshDateSummary = async (date: Date) => {
  console.info(`refresh date summary" ${date}`);
  await dateSummaryStore.refreshDateSummery(date);
};

/**
 * 数値を表す文字列を、桁数をそろえた文字列に変換する
 * @param value
 */
const toNumString = (value: string | undefined) => {
  if (value === undefined) {
    return "-";
  }
  else {
    const numValue = Number(value);
    return isNaN(numValue) ? "-" : numValue.toFixed(2);
  }
};

const fields = computed(() => {
  return milestoneSummaryStore.fields;
});

const value = (item: MilestoneSummary) => {
  const key = item.type as keyof Omit<DateSummary, "date_at">;
  if (dateSummary.dateSummary.value == null) {
    return "";
  }
  if (!(key in dateSummary.dateSummary.value)) {
    return "";
  }
  const ret = dateSummary.dateSummary.value[key];
  return typeof ret === "string" ? toNumString(ret) : ret;
};

watch(
  () => props.date,
  () => {
    console.info("watch props date");
    dateSummary.setDate(props.date);
  },
);
</script>
