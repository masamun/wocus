<template>
  <div
    class="flex items-center h-8 hover:text-gray-600 hover:bg-gray-200 rounded pr-2 pl-2 cursor-pointer"
    @click="handleClick"
  >
    <label class="flex items-center w-full cursor-pointer h-6 pr-2">
      <input
        type="checkbox"
        class="mr-2 h-4 w-4 cursor-pointer"
        :checked="props.checked ?? false"
      >
      <slot />
    </label>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string;
  disabled?: boolean;
  checked?: boolean;
}
interface Emits {
  (e: "click"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

/**
 * セルをクリック
 * @param e
 */
const handleClick = () => {
  emits("click");
};
</script>
