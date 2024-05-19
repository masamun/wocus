import { usePageStore } from "./page/pageStore";

/**
 * 表示中の情報を決めるストア
 * @returns
 */
export const useRouteStore = defineStore("route", () => {
  const route = useRoute();
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
    return projects.value.find(v => v.name === projectName.value)?.id;
  });

  /**
   * プロジェクト名の変更をウォッチする
   */
  watch(
    () => route.params,
    () => {
      projectName.value = route.params.project as string;
      pageId.value = route.params.page as string;

      usePageStore().setPageId(pageId.value);
    },
    {
      immediate: true,
    },
  );

  /**
   * プロジェクトIDの変更時はページ情報の取得を行う
   */
  watch(
    projectId,
    () => {
      usePageStore().fetchAll(projectId.value);
    },
    {
      immediate: true,
    },
  );

  return {
    projectName,
    projectId,
  };
});
