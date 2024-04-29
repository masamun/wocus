/**
 * サイドメニューの構成
 * @returns
 */
export const usePageBridgeStore = defineStore("pageBridge", () => {
  const pageId = ref<string | undefined>("");
  const pageType = ref<string | undefined>("");

  return {
    pageType,
    pageId,
  };
});
