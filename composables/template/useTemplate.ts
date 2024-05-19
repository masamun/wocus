import { ComputerDesktopIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";

/**
 * サイドメニューの構成
 * @returns
 */
export const useTemplate = () => {
  // テンプレート選択ダイアログ
  const templates = ref([
    {
      category: "テキスト",
      order: 2,
      types: [
        {
          order: 1,
          displayName: "Markdown",
          type: "markdown",
          icon: DocumentTextIcon,
        },
      ],
    },
    {
      category: "プロジェクト",
      order: 3,
      types: [
        {
          order: 1,
          displayName: "WBS",
          type: "milestone",
          icon: ComputerDesktopIcon,
        },
      ],
    },
  ]);

  /**
   * テンプレート一覧を取得する
   */
  const fetch = async () => {
    // TODO
  };

  /**
   * ページを作成するハンドラ
   */
  const create = (type: string, parentMenuId?: string) => {
    const pageStore = usePageStore();

    const order = pageStore.calcOrder(parentMenuId);
    pageStore.createMenu(order, type, parentMenuId);
  };

  return {
    fetch,
    templates,
    create,
  };
};
