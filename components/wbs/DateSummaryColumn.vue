<template>
  <div class="border-b last:border-b-0 text-right pr-2 h-7" @click="handleRefreshDateSummary(date)">
    {{ date.toStringMD() }}
  </div>
  <div
    class="border-b last:border-b-0 text-right pr-2 h-7"
    v-for="(item, index) in milestoneSummaryStore.fields"
    :key="index"
  >
    {{ value(item) }}
  </div>
</template>

<script lang="ts" setup>
import { useDateSummaryStore } from "~/stores/wbs/dateSummaryStore";

interface Props {
  /**
   * 日付
   */
  date: Date;
}

const props = defineProps<Props>();
const dateSummaryStore = useDateSummaryStore();
const dateSummary = dateSummaryStore.dateSummary(props.date);
const milestoneSummaryStore = useMilestoneSummaryStore();

/**
 * タスクを作成する
 */
const handleRefreshDateSummary = async (date: Date) => {
  logger.info(`refresh date summary" ${date}`);
  await dateSummaryStore.refreshDateSummery(date);
};

/**
 * 数値を表す文字列を、桁数をそろえた文字列に変換する
 * @param value
 */
const toNumString = (value: string | undefined) => {
  if (value === undefined) {
    return "-";
  } else {
    const numValue = Number(value);
    return isNaN(numValue) ? "-" : numValue.toFixed(2);
  }
};

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
const prv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.prv);
});
const erv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.erv);
});
const pv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.pv);
});
const ev = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.ev);
});
const ac = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.ac);
});
const sv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.sv);
});
const cv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.cv);
});
const spi = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.spi);
});
const cpi = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.cpi);
});
const dpv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.dpv);
});
const dev = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.dev);
});
const dac = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.dac);
});
const dsv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.dsv);
});
const dcv = computed(() => {
  return toNumString(dateSummary.dateSummary.value?.dcv);
});

watch(props, () => {
  console.info("watch props date");
  dateSummary.setDate(props.date);
});
</script>
