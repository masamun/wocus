<template>
  <div class="border-b last:border-b-0 text-right pr-2">
    {{ activityValue }}
  </div>
</template>

<script lang="ts" setup>
import type { DateSummary } from "~/client/graphql/types/graphql";

interface Props {
  /**
   * 日付
   */
  date: Date;

  /**
   * 入力する数値の種類
   */
  activityType: keyof DateSummary;
}

const props = defineProps<Props>();
const dateSummaryStore = useMilestoneStore().dateSummaryStore;

/**
 * 活動の数値
 */
const activityValue = computed((): string => {
  const dateSummary = dateSummaryStore.dateSummary(props.date);
  const value = dateSummary.dateSummary.value?.[props.activityType] ?? "-";

  if (value instanceof Date) {
    return value.toStringMD();
  }
  const num = Number(value);

  return isNaN(num) ? "-" : num.toFixed(2);
});
</script>
