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
import { usePageBridgeStore } from "./pageBridgeStore";
import { ComputerDesktopIcon, DocumentTextIcon, FaceSmileIcon } from "@heroicons/vue/24/outline";

type ContextHandler = (arg: MenuItem) => void;

interface CustomMenuContext {
  text: string;
  handler: ContextHandler | undefined;
}

/**
 * イベントハンドラを追加したメニュー
 */
export interface MenuItem extends Menu {
  createContext?: ContextHandler;
  customContext?: CustomMenuContext[];
  icon: typeof ComputerDesktopIcon;
}

/**
 * サイドメニューの構成
 * @returns
 */
export const usePageStore = defineStore("page", () => {
  const pageBridgeStore = usePageBridgeStore();
  const projectId = ref<string | undefined>();
  const pageId = ref<string | undefined>();
  const _menus = ref<Menu[]>([]);

  const icons = {
    markdown: DocumentTextIcon,
    milestone: ComputerDesktopIcon,
  };

  const anyIcon = FaceSmileIcon;

  /**
   * メニューを取得する
   * @returns
   */
  const fetchAll = async (currentProjectId: string | undefined) => {
    projectId.value = currentProjectId;
    console.debug("page store fetchAll");

    _menus.value = [];
    if (projectId.value === undefined) {
      return;
    }
    const variables: GetMenusQueryVariables = {
      param: {
        projectId: projectId.value,
      },
    };
    try {
      const result = await useAsyncQuery(GetMenusDocument, variables);

      _menus.value = result.data.value?.menus ?? [];
    } catch {
      _menus.value = [];
    }
  };

  /**
   * ページIDを設定する
   * @param currentPageId
   */
  const setPageId = (currentPageId: string | undefined) => {
    pageId.value = currentPageId;
  };

  /**
   * メニューの最後のオーダーを計算する
   * @returns
   */
  const calcLastOrder = () => {
    const lastMenu = _menus.value
      .filter((v) => v.parentId == undefined)
      .toSorted((a, b) => a.order - b.order)
      .at(-1);

    return (lastMenu?.order ?? 0.0) + 1.0;
  };

  /**
   * メニューを差し込む位置を計算する
   * @param menuId
   * @returns
   */
  const calcMenuOrder = (menuId: string) => {
    const menuIndex = _menus.value.findIndex((v) => v.id === menuId);

    // メニュー内の一番最後
    if (menuIndex === -1) {
      return calcLastOrder();
    }

    const prevMenu = _menus.value.at(menuIndex);
    const nextMenu = _menus.value.at(menuIndex + 1);

    // メニュー内の一番最後
    if (prevMenu == undefined) {
      return calcLastOrder();
    }
    // 親メニュー内の一番最後
    if (nextMenu == undefined) {
      return prevMenu.order + 1.0;
    }
    // 間に差し込む
    return (prevMenu.order + nextMenu.order) / 2.0;
  };

  /**
   * メニューの挿入位置を計算する
   * @param parentMenuId
   * @returns
   */
  const calcOrder = (parentMenuId: string | undefined) => {
    if (parentMenuId === undefined) {
      return calcLastOrder();
    } else {
      return calcMenuOrder(parentMenuId);
    }
  };

  /**
   * メニューを作成する
   * @param order
   * @param type
   * @param parentMenuId
   */
  const createMenu = async (order: number, type: string, parentMenuId: string | undefined) => {
    if (projectId.value === undefined) {
      console.info("createMenu projectId undefined");
      return;
    }
    console.info(`createMenu projectId parent: ${parentMenuId} order: ${order}`);
    try {
      const variables: CreateMenuMutationVariables = {
        param: {
          name: "無題",
          order: order,
          projectId: projectId.value,
          type,
          parentMenuId,
        },
      };
      const result = await useAsyncQuery(CreateMenuDocument, variables);

      if (result.data.value?.createMenu != undefined) {
        _menus.value.push(result.data.value.createMenu);
      }
    } catch {
      // Nothing
    }
  };

  /**
   * メニューを削除する
   * @param menu
   * @param recursive
   */
  const deleteMenu = async (menu: Menu, recursive: boolean) => {
    const variables: DeleteMenuMutationVariables = {
      param: {
        menuId: menu.id,
        recursive,
      },
    };
    try {
      const result = await useAsyncQuery(DeleteMenuDocument, variables);

      if (result.data.value?.deleteMenu) {
        if (recursive) {
          fetchAll(projectId.value);
        } else {
          _menus.value = _menus.value.filter((v) => v.id !== menu.id);
        }
      }
    } catch {
      // Nothing
    }
  };

  /**
   * メニューの名前を変更する
   * @param name 新しい名前
   * @returns
   */
  const showRenameDialog = async (name: string) => {
    const newName = await useMessageBox()
      .prompt({
        title: "名前の変更",
        text: name,
      })
      .catch(() => name);

    if (name !== newName) {
      return newName;
    } else {
      throw new Error("cancel");
    }
  };

  /**
   * メニューの名前を変更する
   * @param arg
   */
  const renameMenu = async (menu: MenuItem) => {
    const name = await showRenameDialog(menu.name).catch(() => menu.name);
    if (name === menu.name) {
      return;
    }

    const variables: RenameMenuMutationVariables = {
      param: {
        menuId: menu.id,
        name,
      },
    };
    try {
      const result = await useAsyncQuery(RenameMenuDocument, variables);

      if (result.data.value?.renameMenu) {
        const oldMenu = _menus.value.find((v) => v.id === menu.id);

        if (oldMenu !== undefined) {
          oldMenu.name = name;
        }
      } else {
        // TODO alert
      }
    } catch {
      // Nothing
    }
  };

  /**
   * 表示中のページタイプを返す
   */
  const pageType = computed(() => {
    return _menus.value.find((v) => v.pageId === pageId.value)?.type ?? "";
  });

  const getMenuIcon = (type: string) => {
    if (Object.keys(icons).includes(type)) {
      return icons[type as keyof typeof icons];
    }
    return anyIcon;
  };

  /**
   * 表示中のメニューを返す
   */
  const menus = computed(() => {
    return _menus.value
      .map((v): MenuItem => {
        return {
          ...v,
          customContext: [
            {
              text: "名前の変更",
              handler: (arg) => renameMenu(arg),
            },
            {
              text: "削除",
              handler: (arg) => deleteMenu(arg, true),
            },
          ],
          icon: getMenuIcon(v.type),
        };
      })
      .toSorted((a, b) => a.order - b.order);
  });

  watch(
    pageType,
    () => {
      pageBridgeStore.pageType = pageType.value;
    },
    {
      immediate: true,
    }
  );

  watch(
    pageId,
    () => {
      pageBridgeStore.pageId = pageId.value;
    },
    {
      immediate: true,
    }
  );

  return {
    fetchAll,
    setPageId,
    createMenu,
    renameMenu,
    deleteMenu,
    calcOrder,
    pageType,
    pageId,
    menus,
  };
});
