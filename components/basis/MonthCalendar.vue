<template>
  <input
    v-model="input"
    type="month"
    name="month-calendar"
  >
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

const input = computed({
  get: () => {
    return `${fullYear.value}-${month.value}`;
  },
  set: (v: string) => {
    const [year, month] = v.split("-").map(p => Number(p));
    emits("update:modelValue", new Date(year, month - 1, 1));
  },
});
const fullYear = computed(() => props.modelValue?.getFullYear());
const month = computed(() => ("0" + (props.modelValue.getMonth() + 1)).slice(-2));
</script>
