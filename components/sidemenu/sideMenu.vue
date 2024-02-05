<script setup lang="ts">
const { appPages } = useProjectMenus();

const handleCreateMenuClick = (arg: SideMenuItem) => {
  console.info("handleCreateMenuClick");
  arg?.createContext?.(arg);
};

const handleCustomMenuClick = (arg: SideMenuItem, index: number) => {
  console.info("handleCustomMenuClick");
  arg?.customContext?.[index]?.handler?.(arg);
};
</script>

<template>
  <side-menu-item
    v-for="(menuItem, index) in appPages"
    :key="index"
    :menu-item="menuItem"
    :depth="1"
    class="p-1"
    @create="handleCreateMenuClick"
    @custom="handleCustomMenuClick"
  />
</template>
