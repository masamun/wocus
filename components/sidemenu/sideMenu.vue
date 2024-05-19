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
  <add-page-menu-item
    class="p-1"
    @select-template="handleShowSelectTemplateDialog"
  />
  <select-template-dialog v-model="visibleSelectTemplateDialog" />
</template>

<script setup lang="ts">
const { menus } = storeToRefs(usePageStore());

const parentMenuId = ref<string | undefined>();
const visibleSelectTemplateDialog = ref(false);

const handleCreateMenuClick = (arg: MenuItem | undefined) => {
  console.info("handleCreateMenuClick");
  arg?.createContext?.(arg);
};

const handleCustomMenuClick = (arg: MenuItem | undefined, index?: number) => {
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
