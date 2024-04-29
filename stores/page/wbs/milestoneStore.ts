import {
  DeleteMilestoneDocument,
  RenameMilestoneDocument,
  type MilestoneFragmentFragment,
  type DeleteMilestoneMutationVariables,
  type Milestone,
  type RenameMilestoneMutationVariables,
  type QueryMilestoneArgs,
  GetMilestoneDocument,
} from "@/client/graphql/types/graphql";
import type { RangeDate } from "./wbsStore";
import { tasks } from "~/server/graphql/schema/project/resolvers/Query/tasks";

export const useMilestoneStore = defineStore("milestone", () => {
  const milestoneFieldStore = ref(useMilestoneFieldStore());
  const milestoneSummaryStore = ref(useMilestoneSummaryStore());
  const taskStore = ref(useTaskStore());

  const dateSummaryStore = ref(useDateSummaryStore());
  const milestone = ref<Milestone | undefined>();
  const milestoneId = ref<string | undefined>();

  /**
   * マイルストーンの情報を全て取得する
   */
  const fetchAll = async (id: string, range: RangeDate[]) => {
    clear();

    milestoneId.value = id;
    fetchMilestone();
    fetchTask(range);
  };

  /**
   * プロジェクトに属するマイルストーン一覧を取得する
   */
  const fetchMilestone = async () => {
    if (milestoneId.value === undefined) {
      milestone.value = undefined;
      return;
    }
    const variables: QueryMilestoneArgs = {
      param: {
        pageId: milestoneId.value,
      },
    };
    const { data } = await useAsyncQuery({
      query: GetMilestoneDocument,
      variables: variables,
      cache: false,
    });
    milestone.value = data.value?.milestone as MilestoneFragmentFragment;

    updateMetaInfo(milestoneId.value);
  };

  /**
   * マイルストーンに付属する情報を設定する
   */
  const updateMetaInfo = (id: string) => {
    milestoneFieldStore.value.setMilestoneId(id);
    milestoneSummaryStore.value.setMilestoneId(id);

    milestone.value?.fields?.forEach((v) => {
      milestoneFieldStore.value.add(v);
    });
    milestone.value?.summaries?.forEach((v) => {
      milestoneSummaryStore.value.add(v);
    });
  };

  /**
   * タスクの情報を取得する
   * @param range
   * @returns
   */
  const fetchTask = (range: RangeDate[]) => {
    if (milestoneId.value === undefined) {
      return;
    }
    const start_at = range[0].date;
    const end_at = range.at(-1)?.date ?? start_at;
    taskStore.value.fetchAll(milestoneId.value, start_at, end_at);
    dateSummaryStore.value.fetchAll(milestoneId.value, start_at, end_at);
  };

  /**
   * マイルストーンを作成する
   * @param projectName
   */
  const createMilestone = async (milestoneName: string) => {
    if (milestoneId.value === undefined) {
      console.info("createMilestone projectName undefined");
      return;
    }
    if (milestoneName.length === 0) {
      console.info("createMilestone milestoneName empty");
      return;
    }
    /*
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
    */
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
      //const filtered = _milestones.value.filter((p) => p.id !== id);
      //_milestones.value = [...filtered, ...[renamedMilestone]];
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
      //_milestones.value = _milestones.value.filter((p) => p.id !== milestoneId);
    }
  };

  const clear = () => {
    milestoneId.value = undefined;
    milestone.value = undefined;
    milestoneFieldStore.value.clear();
    milestoneSummaryStore.value.clear();
    taskStore.value.clear();
    dateSummaryStore.value.clear();
  };

  const fields = computed(() => {
    return milestoneFieldStore.value;
  });

  const summary = computed(() => {
    return milestoneSummaryStore.value;
  });

  return {
    fetchAll,
    fetchTask,
    clear,
    fields,
    summary,
    taskStore,
    taskFieldStore: taskStore.value.taskFieldStore,
    taskActivityStore: taskStore.value.taskActivityStore,
    dateSummaryStore,
    createMilestone,
    renameMilestone,
    deleteMilestone,
  };
});
