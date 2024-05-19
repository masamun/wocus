<template>
  <div @click="handleClick">
    <div class="flex flex-row items-center cursor-pointer gap-1 p-1 ml hover:bg-gray-600 text-gray-200 rounded group">
      <plus-icon class="w-4 h-4" />
      <span>ページを追加</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

interface Emits {
  (e: "select-template", parentMenuId?: string): void;
}
const emits = defineEmits<Emits>();

const handleClick = () => {
  emits("select-template");
};
</script>
