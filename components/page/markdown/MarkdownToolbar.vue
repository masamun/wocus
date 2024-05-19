<template>
  <div>
    <div class="flex justify-center">
      <div
        class="p-1 w-12 border-l-2 border-t-2 border-b-2 flex justify-center rounded-l-md cursor-pointer"
        :class="{ 'bg-gray-400': showEditor === 'text' }"
        @click="handleClick('text')"
      >
        <pencil-square-icon class="w-6 h-6" />
      </div>
      <div
        class="p-1 w-10 border-2 cursor-pointer"
        :class="{ 'bg-gray-400': showEditor === 'preview' }"
        @click="handleClick('preview')"
      >
        <eye-icon class="w-6 h-6" />
      </div>
      <div
        class="p-1 w-12 border-r-2 border-t-2 border-b-2 flex justify-center rounded-r-md cursor-pointer"
        :class="{ 'bg-gray-400': showEditor === 'both' }"
        @click="handleClick('both')"
      >
        <book-open-icon class="w-6 h-6" />
      </div>
    </div>
    <div />
  </div>
</template>

<script lang="ts" setup>
import { PencilSquareIcon, EyeIcon, BookOpenIcon } from "@heroicons/vue/24/outline";
import type { MarkdownShowEditor } from "~/stores/page/markdown/markdownStore";

const { showEditor } = storeToRefs(useMarkdownStore());

const handleClick = (type: MarkdownShowEditor) => {
  showEditor.value = type;
};
</script>
