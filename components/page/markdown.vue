<template>
  <div class="flex-col p-2 overflow-hidden">
    <div class="w-full h-9 mb-1">
      <markdown-toolbar />
    </div>
    <div class="flex flex-row flex-grow gap-2 flex-nowrap justify-between overflow-hidden">
      <markdown-editor
        v-show="showText"
        class="flex flex-grow flex-1"
      />
      <markdown-preview
        v-show="showPreview"
        class="flex flex-grow flex-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownShowEditor } from "~/stores/page/markdown/markdownStore";

const { showEditor } = storeToRefs(useMarkdownStore());

const showTextValues: MarkdownShowEditor[] = ["text", "both"];
const showPreviewValues: MarkdownShowEditor[] = ["preview", "both"];

const showText = computed(() => {
  return showTextValues.includes(showEditor.value);
});

const showPreview = computed(() => {
  return showPreviewValues.includes(showEditor.value);
});
</script>
