<template>
  <side-menu-item
    v-for="(menu, index) in menus"
    :key="index"
    :menu="menu"
    :depth="1"
    class="p-1"
    @create="handleCreateMenuClick"
    @custom="handleCustomMenuClick"
  />
  <add-page-menu-item class="p-1" @select-template="handleShowSelectTemplateDialog"></add-page-menu-item>
  <select-template-dialog v-model="visibleSelectTemplateDialog" />
</template>

<script setup lang="ts">
const { menus } = storeToRefs(useProjectMenuStore());

const parentMenuId = ref<string | undefined>();
const visibleSelectTemplateDialog = ref(false);

const handleCreateMenuClick = (arg: SideMenuItem | undefined) => {
  console.info("handleCreateMenuClick");
  arg?.createContext?.(arg);
};

const handleCustomMenuClick = (arg: SideMenuItem | undefined, index?: number) => {
  console.info("handleCustomMenuClick");
  arg?.customContext?.[index ?? 0]?.handler?.(arg);
};

/**
 * テンプレート選択ダイアログを表示する
 */
const handleShowSelectTemplateDialog = (_parentMenuId?: string) => {
  parentMenuId.value = _parentMenuId;
  visibleSelectTemplateDialog.value = true;
};
</script>
