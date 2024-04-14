/**
 * 表示中の情報を決めるストア
 * @returns
 */
export const useRouteStore = defineStore("route", () => {
  const route = useRoute();
  const { menus } = storeToRefs(useProjectMenuStore());
  const { projects } = storeToRefs(useProjectStore());

  /**
   * 表示中のプロジェクト名
   */
  const projectName = ref("");

  /**
   * 表示中のページID
   */
  const pageId = ref("");

  /**
   * プロジェクトID
   */
  const projectId = computed(() => {
    return projects.value.find((v) => v.name === projectName.value)?.id;
  });

  /**
   * 表示中のページタイプを返す
   */
  const pageType = computed(() => {
    return menus.value.find((v) => v.pageId === pageId.value)?.type;
  });

  /**
   * プロジェクト名の変更をウォッチする
   */
  watch(
    () => route.params,
    () => {
      projectName.value = route.params.project as string;
      pageId.value = route.params.page as string;
    },
    {
      immediate: true,
    }
  );

  return {
    projectName,
    projectId,
    pageId,
    pageType,
  };
});
