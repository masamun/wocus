<template>
  <div
    class="min-w-24 left-0 top-full rounded border-gray-600 z-[1000] bg-slate-50 group relative text-black p-1"
    @click="handleClick"
    :disabled="props.disabled"
  >
    <label
      class="cursor-pointer hover:bg-gray-200 h-8 pl-1 pr-1 rounded flex items-center"
      :class="{
        'text-gray-600': props.disabled,
        'hover:text-black': !props.disabled,
        'hover:bg-gray-200': !props.disabled,
      }"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string;
  disabled?: boolean;
}
interface Emits {
  (e: "click", event: Event): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

/**
 * セルをクリック
 * @param e
 */
const handleClick = (e: Event) => {
  emits("click", e);
};
</script>
