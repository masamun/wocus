<template>
  <div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="w-full p-2 border-[1px] block"
      v-html="preview"
    />
  </div>
</template>

<script lang="ts" setup>
const { preview } = storeToRefs(useMarkdownStore());
</script>
