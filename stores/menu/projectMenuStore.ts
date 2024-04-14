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
export const useProjectMenuStore = defineStore("menu", () => {
  const { projectId } = storeToRefs(useRouteStore());
  const _menus = ref<Menu[]>([]);

  /**
   * メニューを取得する
   * @returns
   */
  const fetchAll = async () => {
    _menus.value.splice(0);
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
   * メニューの最後のオーダーを計算する
   * @returns
   */
  const calcLastOrder = () => {
    const lastMenu = _menus.value
      .filter((v) => v.parentId === undefined)
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
    if (prevMenu === undefined) {
      return calcLastOrder();
    }
    // 親メニュー内の一番最後
    if (nextMenu === undefined) {
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
    } catch {
      // Nothing
    }
  };

  /**
   * メニューを削除する
   * @param menuId
   * @param recursive
   */
  const deleteMenu = async (menuId: string, recursive: boolean) => {
    const variables: DeleteMenuMutationVariables = {
      param: {
        menuId,
        recursive,
      },
    };
    try {
      const result = await useAsyncQuery(DeleteMenuDocument, variables);

      if (result.data.value?.deleteMenu) {
        if (recursive) {
          fetchAll();
        } else {
          _menus.value = _menus.value.filter((v) => v.id !== menuId);
        }
      }
    } catch {
      // Nothing
    }
  };

  /**
   * メニューの名前を変更する
   * @param arg
   */
  const renameMenu = async (menuId: string, name: string) => {
    const variables: RenameMenuMutationVariables = {
      param: {
        menuId,
        name,
      },
    };
    try {
      const result = await useAsyncQuery(RenameMenuDocument, variables);

      if (result.data.value?.renameMenu) {
        const menu = _menus.value.find((v) => v.id !== menuId);

        if (menu !== undefined) {
          menu.name = name;
        }
      } else {
        // TODO alert
      }
    } catch {
      // Nothing
    }
  };

  /**
   * 指定されたメニューIDのtypeを返す
   * @param id
   * @returns
   */
  const menuType = (pageId: string) => {
    return _menus.value.find((v) => v.id === pageId)?.type;
  };

  watch(
    projectId,
    () => {
      console.debug("menu store fetchAll");
      fetchAll();
    },
    {
      immediate: true,
    }
  );

  return {
    createMenu,
    renameMenu,
    deleteMenu,
    calcOrder,
    menus: readonly(_menus),
    menuType,
  };
});
