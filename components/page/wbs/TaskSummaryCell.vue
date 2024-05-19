<template>
  <div class="flex">
    <span class="w-full">{{ showActivityType }}</span>
    <InputFixedNumber
      :value="activityValue"
      :editable="false"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  /**
   * タスクID
   */
  taskId: string;

  /**
   * 入力する数値の種類
   */
  activityType: ActivityType;
}

const props = defineProps<Props>();
const task = {
  pv: 0,
  ac: 0,
  ev: 0,
};

const showActivityType = computed(() => {
  return props.activityType.toUpperCase();
});

/**
 * 活動の数値
 */
const activityValue = computed(() => {
  switch (props.activityType) {
    case "pv":
      return task?.pv || 0.0;
    case "ac":
      return task?.ac || 0.0;
    case "ev":
      return task?.ev || 0.0;
    default:
      return 0.0;
  }
});

/**
 * セルのスタイルシートを生成する
 * @param cell 対象のセル
 * @returns スタイルシート
 */
/*
const toStyleSheet = (cell: vCell): { [key: string]: string } => {
  const keys = Object.keys(cell.colStyle)
  const styles = [
    cell.colStyle,
    cell.rowStyle,
    cell.style
  ]

  // 各スタイルでticksが一番大きい(後から設定された)スタイルを採用する
  return keys.map(k => {
    return {
      [k]: styles.map(v => v[k as keyof vStyle]).reduce((x, y) => x.ticks > y.ticks ? x : y).value
    }
  }).reduce((acc, value) => {
    return {...acc, ...value }
  })
}

const stylesheet = computed(() => {
  return toStyleSheet(props.cell)
})
*/
</script>
