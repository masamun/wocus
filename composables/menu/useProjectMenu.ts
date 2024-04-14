type ContextHandler = (arg: SideMenuItem) => void;

type MenuType = "milestone" | "milestoneLink";
interface CustomMenuContext {
  text: string;
  handler: ContextHandler | undefined;
}

export interface SideMenuItem {
  title: string;
  link: string;
  pageId: string;
  hier: number;
  type: MenuType;
  createContext?: ContextHandler;
  customContext?: CustomMenuContext[];
  children: SideMenuItem[];
}
/**
 * サイドメニューの構成
 * @returns
 */
export function useProjectMenus() {
  const wbsStore = useWbsStore();
  const milestonesStore = useMilestonesStore();
  const { milestones } = storeToRefs(milestonesStore);
  //const { projectName } = storeToRefs(wbsStore);
  const appPages = ref([] as SideMenuItem[]);
  const { prompt, confirm } = useMessageBox();

  const update = async () => {
    const milestoneMenu: SideMenuItem = {
      title: "WBS",
      link: "",
      pageId: "",
      hier: 1,
      type: "milestone",
      createContext: (arg) => createMilestone(arg),
      children:
        milestones.value.map((p) => {
          return {
            title: p.name ?? "",
            link: `/project/nothing/${p.name}`,
            pageId: p.id,
            hier: 2,
            type: "milestoneLink",
            customContext: [
              {
                text: "名前の変更",
                handler: (arg) => renameMilestone(arg),
              },
              {
                text: "削除",
                handler: (arg) => deleteMilestone(arg),
              },
            ],
            children: [],
          };
        }) ?? [],
    };

    appPages.value.splice(0);
    appPages.value.push(milestoneMenu);
  };

  const createMilestone = async (arg: SideMenuItem) => {
    try {
      const name = await prompt({
        title: "マイルストーン作成",
        text: "",
      });
      await milestonesStore.createMilestone(name);
      useRouter().push(`./${name}`);
    } catch {
      // Nothing
    }
  };

  const deleteMilestone = async (arg: SideMenuItem) => {
    try {
      const ret = await confirm({
        title: "本当に削除しますか？",
        text: arg.title,
      });
      if (ret) {
        milestonesStore.deleteMilestone(arg.pageId);
      }
    } catch {
      // Nothing
    }
  };

  const renameMilestone = async (arg: SideMenuItem) => {
    try {
      const name = await prompt({
        title: "名前の変更",
        text: arg.title,
      });
      if (arg.title !== name) {
        milestonesStore.renameMilestone(arg.pageId, name);
      }
    } catch {
      // Nothing
    }
  };

  watch(
    () => milestones.value,
    () => {
      console.debug("project menu update");
      update();
    },
    {
      immediate: true,
    }
  );

  return {
    appPages,
  };
}
