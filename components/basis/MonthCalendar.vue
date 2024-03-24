<template>
  <input type="month" name="month-calendar" v-model="input" />
</template>

<script lang="ts" setup>
/**
 * v-model
 */
interface Props {
  modelValue: Date;
}
interface Emits {
  (e: "update:modelValue", value: Date): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const editing = ref<boolean>(false);
const editor = ref<HTMLInputElement | null>(null);

const input = computed({
  get: () => {
    return `${fullYear.value}-${month.value}`;
  },
  set: (v: string) => {
    const [year, month] = v.split("-").map((p) => Number(p));
    emits("update:modelValue", new Date(year, month - 1, 1));
  },
});
const fullYear = computed(() => props.modelValue?.getFullYear());
const month = computed(() => ("0" + (props.modelValue.getMonth() + 1)).slice(-2));
/**
 * Enterキーで確定イベント
 */
const handleEnter = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement)?.blur();
};

/**
 * セルをクリック
 * @param e
 */
const handleClick = (e: MouseEvent) => {};

/**
 * セルをダブルクリックで編集状態に移行する
 * @param e
 */
const handleDoubleClick = (e: MouseEvent) => {
  editing.value = true;

  nextTick(() => {
    editor.value?.focus();
  });
};
</script>
