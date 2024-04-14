<template>
  <div>ほげほげ</div>
  <component :is="component" />
</template>

<script setup lang="ts">
import Wbs from "./wbs.vue";

const defaultComponents = {
  wbs: Wbs,
};

const component = computed(() => {
  return defaultComponents.wbs;
});
</script>
