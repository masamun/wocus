import {
  CreateProjectDocument,
  GetProjectsDocument,
  type MutationCreateProjectArgs,
  type Project,
} from "~/client/graphql/types/graphql";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<Project[]>([]);

  /**
   * プロジェクトの一覧を取得する
   */
  const fetchAll = async () => {
    const { data } = await useAsyncQuery({
      query: GetProjectsDocument,
      cache: false,
    });
    projects.value.splice(0);
    data.value?.projects?.forEach((p) => {
      console.info(`${p?.id} ${p?.name}`);
      if (p) {
        projects.value.push(p);
      }
    });
  };

  /**
   * プロジェクトを作成する
   * @param projectName
   */
  const createProject = async (projectName: string) => {
    const variables: MutationCreateProjectArgs = {
      param: {
        name: projectName,
      },
    };

    try {
      const { mutate } = useMutation(CreateProjectDocument);
      const data = await mutate(variables);
      if (data?.data?.createProject) {
        projects.value.push(data.data.createProject);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return {
    fetchAll,
    projects,
    createProject,
  };
});
