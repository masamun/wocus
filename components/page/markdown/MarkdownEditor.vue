<template>
  <div class="flex flex-row">
    <div class="line-numbers p-2 text-gray-400 overflow-hidden flex flex-col" ref="numberArea">
      <div v-for="(line, index) in lineCounter.textLines.value" :keys="index" class="inline-block" :style="line.style">
        {{ line.lineCount }}
      </div>
    </div>
    <textarea
      class="flex-grow p-2 focus:outline-none bg-gray-200 resize-none"
      v-model="text"
      placeholder="テキスト入力エリア"
      ref="textArea"
      rows="1"
      @scroll="handleScroll"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { useTextAreaLineCounter } from "~/stores/page/markdown/textAreaLineCounter";

const markdownStore = useMarkdownStore();
const { text } = storeToRefs(markdownStore);

const numberArea = ref<HTMLDivElement | null>(null);
const textArea = ref<HTMLTextAreaElement | null>(null);
const lineCounter = useTextAreaLineCounter(textArea, text);

const copyStyles = ["fontFamily", "fontSize", "fontWeight", "letterSpacing", "lineHeight", "padding"];

const handleScroll = () => {
  if (numberArea.value && textArea.value) {
    numberArea.value.scrollTop = textArea.value?.scrollTop;
  }
};

onMounted(() => {
  if (textArea.value == null) {
    return;
  }
  if (numberArea.value == null) {
    return;
  }

  const textareaStyles = window.getComputedStyle(textArea.value);
  copyStyles.forEach((styleName) => {
    numberArea.value!.style.setProperty(styleName, textareaStyles.getPropertyValue(styleName));
  });
});
</script>

<style scoped>
.markers {
  counter-reset: line-number;
}

.markers span {
  display: list-item;
  counter-increment: line-number;
  padding-left: 2rem;
  margin-left: 2rem;
}

.markers span::marker {
  content: counter(line-number);
  color: #aaa;
}
</style>
