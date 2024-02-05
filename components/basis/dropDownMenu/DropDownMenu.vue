<template>
  <!-- -->
  <div>
    <span @click.stop="handleShowMenu">
      <slot name="button">
        <Cog6ToothIcon class="h-7 w-7 p-1 text-gray-600 hover:text-gray-600 hover:bg-gray-200 rounded cursor-pointer" />
      </slot>
    </span>
    <div class="relative">
      <div
        class="absolute top-full left-1/2 rounded border bg-slate-50 border-gray-600 text-nowrap z-50"
        v-show="visible"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";

// ドロップダウンを識別するハッシュ
const hash = Math.random().toString(36).slice(-8);
const dropDownMenu = useDropDownMenu();

/**
 * ドロップダウンメニューを開く
 */
const handleShowMenu = () => {
  dropDownMenu.show(hash);
};

const visible = computed(() => {
  return dropDownMenu.current.value === hash;
});
</script>
