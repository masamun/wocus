<template>
  <details
    class="left-0 p-1 top-full rounded border-gray-600 z-[1000] bg-slate-50 group relative"
    @mouseleave="handleMouseLeave"
    @click.prevent.stop=""
  >
    <summary
      class="[-webkit-details-marker]:hidden cursor-pointer hover:bg-gray-200 h-8 pl-2 pr-2 rounded group-open:bg-gray-200 flex items-center"
      @mouseenter="handleMouseEnter"
    >
      {{ props.label ?? "" }}
      <ChevronRightIcon class="h-5 w-5 pl-2 ml-auto mt-[2px]" />
    </summary>
    <div class="absolute top-0 left-full rounded border bg-slate-50 border-gray-600 text-nowrap">
      <slot>
        <drop-down-menu-item
          class="text-center"
          :disabled="true"
        >
          項目なし
        </drop-down-menu-item>
      </slot>
    </div>
  </details>
</template>

<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

interface Props {
  icon?: string;
  label?: string;
  action?: string;
  disabled?: boolean;
}

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const props = defineProps<Props>();

/**
 * マウスホバーで子メニューを開ける
 * @param e
 */
const handleMouseEnter = (e: MouseEvent) => {
  const elem = e.target as HTMLElement;
  if (elem) {
    timeoutId = setTimeout(() => {
      elem.parentElement?.setAttribute("open", "");
    }, 300);
  }
};

/**
 * マウスがアイテム外に移動でメニューを閉じる
 * @param e
 */
const handleMouseLeave = (e: MouseEvent) => {
  // マウスが外れた後にメニューの表示はしないようにする
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  const elem = e.target as HTMLElement;
  if (elem) {
    setTimeout(() => {
      elem?.removeAttribute("open");
    }, 100);
  }
};
</script>
