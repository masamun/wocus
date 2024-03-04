import type { MilestoneFragmentFragment } from "../graphql/codegen/graphql";

export const useMilestonesStore = defineStore("milestones", () => {
  const wbsStore = useWbsStore();
  const { projectName } = storeToRefs(wbsStore);
  const _milestones = ref<Milestone[]>([]);

  /**
   * マイルストーンの情報を全て取得する
   */
  const fetchAll = async () => {
    await fetchMilestones();
  };

  /**
   * プロジェクトに属するマイルストーン一覧を取得する
   */
  const fetchMilestones = async () => {
    if (projectName.value === undefined) {
      _milestones.value = [];
      return;
    }
    const variables: QueryMilestonesArgs = {
      param: {
        projectName: projectName.value,
      },
    };
    const { data } = await useAsyncQuery({
      query: GetMilestonesDocument,
      variables: variables,
      cache: false,
    });
    _milestones.value = (data.value.milestones as MilestoneFragmentFragment[] | undefined) ?? [];
  };

  /**
   * マイルストーンを作成する
   * @param projectName
   */
  const createMilestone = async (milestoneName: string) => {
    if (projectName.value === undefined) {
      console.info("createMilestone projectName undefined");
      return;
    }
    if (milestoneName.length === 0) {
      console.info("createMilestone milestoneName empty");
      return;
    }
    const variables: MutationCreateMilestoneArgs = {
      param: {
        project: projectName.value,
        name: milestoneName,
      },
    };

    const { mutate } = useMutation(CreateMilestoneDocument);
    const data = await mutate(variables);
    const createdMilestone = data?.data?.createMilestone as MilestoneFragmentFragment | undefined;
    if (createdMilestone) {
      _milestones.value = [..._milestones.value, ...[createdMilestone]];
    }
  };

  /**
   * マイルストーンの名前を変更する
   * @param projectName
   */
  const renameMilestone = async (milestoneId: string, milestoneName: string) => {
    if (milestoneName.length === 0) {
      console.info("renameMilestone milestoneName empty");
      return;
    }
    const variables: RenameMilestoneMutationVariables = {
      param: {
        milestoneId: milestoneId,
        name: milestoneName,
      },
    };

    const { mutate } = useMutation(RenameMilestoneDocument);
    const data = await mutate(variables);
    const renamedMilestone = data?.data?.renameMilestone as MilestoneFragmentFragment | undefined;
    if (renamedMilestone != null) {
      const id = renamedMilestone.id;
      const filtered = _milestones.value.filter((p) => p.id !== id);
      _milestones.value = [...filtered, ...[renamedMilestone]];
    }
  };

  /**
   * マイルストーンを削除する
   * @param projectName
   */
  const deleteMilestone = async (milestoneId: string) => {
    const variables: DeleteMilestoneMutationVariables = {
      param: {
        milestoneId: milestoneId,
      },
    };

    const { mutate } = useMutation(DeleteMilestoneDocument);
    const data = await mutate(variables);
    if (data?.data?.deleteMilestone === true) {
      _milestones.value = _milestones.value.filter((p) => p.id !== milestoneId);
    }
  };

  const milestones = computed(() => {
    return readonly(_milestones.value);
  });

  watch(
    projectName,
    () => {
      //console.info(`milestonesStore watch projectName ${projectName.value ?? "unknown"}`);
      fetchAll();
    },
    {
      immediate: true,
    }
  );

  return {
    fetchAll,
    createMilestone,
    renameMilestone,
    deleteMilestone,
    milestones,
  };
});
