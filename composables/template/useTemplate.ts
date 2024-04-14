import { ComputerDesktopIcon, DocumentTextIcon, FolderIcon } from "@heroicons/vue/24/outline";
import {
  CreateMenuDocument,
  DeleteMenuDocument,
  GetMenusDocument,
  RenameMenuDocument,
  type CreateMenuMutationVariables,
  type DeleteMenuMutationVariables,
  type GetMenusQueryVariables,
  type Menu,
  type RenameMenuMutationVariables,
} from "~/client/graphql/types/graphql";

/**
 * サイドメニューの構成
 * @returns
 */
export const useTemplate = () => {
  // テンプレート選択ダイアログ
  const visible = ref(false);

  // テンプレート選択ダイアログのパラメーター
  const order = ref(1.0);

  const templates = ref([
    {
      category: "その他",
      order: 1,
      types: [
        {
          order: 1,
          displayName: "フォルダ",
          type: "folder",
          icon: FolderIcon,
        },
      ],
    },
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
    const projectMenu = useProjectMenu();

    projectMenu.createMenu(order.value, type, parentMenuId);
    const projectId = "";
  };

  return {
    fetch,
    templates,
    create,
  };
};
