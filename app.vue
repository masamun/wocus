<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: "w-full h-full",
  },
  bodyAttrs: {
    class: "w-full h-full box-border",
  },
});

onMounted(() => {
  // ストアの機能有効化
  const route = useRouteStore();
  // TODO ログイン機能を作った後は場所を変える
  const projects = useProjectStore();
  nextTick(() => {
    projects.fetchAll();
  });
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
