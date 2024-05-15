<template>
  <div>
    <div v-html="preview" class="w-full p-2 border-[1px] block" />
  </div>
</template>

<script lang="ts" setup>
const { preview } = storeToRefs(useMarkdownStore());
</script>
