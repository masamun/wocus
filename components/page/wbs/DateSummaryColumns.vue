<template>
  <div class="border-b border-r border-t min-w-28 max-w-36 align-middle">
    <div class="border-b last:border-b-0 h-7">日付</div>
    <div class="border-b last:border-b-0 h-7" v-for="(item, index) in milestoneSummaryStore.fields.fields" :key="index">
      {{ item.title }}
    </div>
  </div>
  <!--実績情報-->
  <div
    v-for="(dateInfo, index) in wbsStore.range"
    :key="dateInfo.date.getTime()"
    class="border-b border-r border-t min-w-20 max-w-32"
    :class="{
      'bg-blue-100': dateInfo.isSaturday,
      'bg-red-100': dateInfo.isSunday,
      'bg-yellow-100': dateInfo.isToday,
    }"
  >
    <DateSummaryColumn :date="dateInfo.date" />
  </div>
</template>

<script lang="ts" setup>
const wbsStore = useWbsStore();
const milestoneSummaryStore = useMilestoneStore();
</script>
