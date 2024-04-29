<template>
  <div
    ref="target"
    class="border-b border-r border-t [writing-mode:vertical-rl] [text-orientation:upright] min-w-[20px] flex-col flex justify-center items-center relative p-1"
    :style="{ width: field.width + 'px' }"
  >
    <div>{{ props.field.title }}</div>
    <!-- 幅の変更用 -->
    <div
      class="w-[4px] h-full absolute top-0 bottom-0 right-[-2px] cursor-e-resize z-auto hover:bg-slate-200 rounded"
      @mousedown.left="handleMouseDown"
      @dblclick="handleDoubleClick"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import type { MilestoneField } from "~/client/graphql/types/graphql";

interface Props {
  field: MilestoneField;
}

const props = defineProps<Props>();
const target = ref<HTMLDivElement | null>(null);
const milestonesFieldStore = useMilestoneStore().fields;
const wbsStore = useWbsStore();
let timeoutID: ReturnType<typeof setTimeout> | null = null;
let buttonNo = -1;

const handleMouseDown = (e: MouseEvent) => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  console.info(`button ${e.button}`);
  buttonNo = e.button;
};

const handleMouseUp = () => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  buttonNo = -1;
};

const handleMouseMove = (e: MouseEvent) => {
  const milestoneId = wbsStore.milestoneId;

  if (timeoutID !== null) {
    clearTimeout(timeoutID);
    timeoutID = null;
  }
  if (e.button !== buttonNo) {
    handleMouseUp();
    return;
  }
  // サーバー情報の設定に反映する
  timeoutID = setTimeout(async () => {
    if (milestoneId !== undefined) {
      milestonesFieldStore.update(props.field.type, props.field.width, props.field.visible);
    }
  }, 1000);

  // 画面に先行して反映する
  if (milestoneId !== undefined) {
    milestonesFieldStore.movementWidth(props.field.type, e.movementX);
  }
};

const handleDoubleClick = () => {
  const milestoneId = wbsStore.milestoneId;
  const elements = document.querySelectorAll(`[data-field-type="${props.field.type}"]`);

  let width = 0;
  elements.forEach((element) => {
    if (element.firstElementChild == null || element.firstChild == null) {
      return;
    }
    const span = document.createElement("span");
    span.textContent = element.textContent;

    // ボーダーと切り上げのサイズを加える
    document.body.appendChild(span);
    const elementWidth = span.getBoundingClientRect().width + 4;
    if (elementWidth > width) {
      width = elementWidth;
    }
    span.remove();
  });
  if (width < 20) {
    width = 20;
  }
  if (milestoneId !== undefined) {
    milestonesFieldStore.update(props.field.type, Math.ceil(width), props.field.visible);
  }
};
</script>
