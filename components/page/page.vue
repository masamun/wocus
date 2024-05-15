<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import Markdown from "./markdown.vue";
import Wbs from "./wbs.vue";

const { pageType } = storeToRefs(usePageStore());

const defaultComponents = {
  milastone: Wbs,
  markdown: Markdown,
};

const component = computed(() => {
  switch (pageType.value) {
    case "milestone":
      return defaultComponents.milastone;
    case "markdown":
    default:
      return defaultComponents.markdown;
  }
});
</script>
