<template>
  <InputFixedNumber :value="activityValue" @input="handleInput" />
</template>

<script lang="ts" setup>
interface Props {
  /**
   * タスクID
   */
  taskId: string;

  /**
   * 活動日
   */
  date: Date;

  /**
   * 入力する数値の種類
   */
  activityType: ActivityType;
}

const props = defineProps<Props>();
const taskActivityStore = useMilestoneStore().taskActivityStore;
const activityProxy = taskActivityStore.activity(props.taskId, props.date);
const activity = activityProxy.activity;

/**
 * 活動の数値
 */
const activityValue = computed(() => {
  const val = (() => {
    switch (props.activityType) {
      case "pv":
        return activity.value?.pv;
      case "ac":
        return activity.value?.ac;
      case "ev":
        return activity.value?.ev;
      default:
        throw new Error();
    }
  })();

  return val != null ? Number(val) : undefined;
});

/**
 * 入力イベント
 */
const handleInput = (value: number) => {
  const current = activityValue.value;
  if (current !== value) {
    switch (props.activityType) {
      case "pv":
        activityProxy.updatePv(value);
        break;
      case "ac":
        activityProxy.updateAc(value);
        break;
      case "ev":
        activityProxy.updateEv(value);
        break;
      default:
        break;
    }
  }
};

/**
 * クリアイベント
 */
const handleClear = () => {
  switch (props.activityType) {
    case "pv":
      activityProxy.updatePv(undefined);
      break;
    case "ac":
      activityProxy.updateAc(undefined);
      break;
    case "ev":
      activityProxy.updateEv(undefined);
      break;
    default:
      break;
  }
};
</script>
