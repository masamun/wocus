<template>
  <div class="flex flex-wrap flex-row content-start items-start w-full gap-4 p-8">
    <div class="basis-full border-b-2 border-gray-300 text-xl pb-1 flex">
      <p>Projects</p>
      <button
        type="button"
        title="CreateProject"
        class="border text-gray-600 border-gray-300 rounded mt-1 hover:bg-gray-300 cursor-pointer ml-4"
        @click="handleShowCreateProjectDialog"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
    </div>
    <NuxtLink
      v-for="(project, index) in projects"
      :key="index"
      :to="projectLink(project.name)"
      class="w-36 h-24 border-slate-400 bg-gray-200 rounded hover:bg-gray-300 p-2 cursor-pointer"
    >
      {{ project.name }}
    </NuxtLink>
    <basic-dialog
      v-model="visible"
      title="プロジェクト作成"
      @ok="createProject"
    >
      <div>
        <label>
          <input
            v-model="projectName"
            type="text"
            class="p-2 border"
          >
        </label>
      </div>
    </basic-dialog>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

const projectName = ref("default");
const visible = ref(false);
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const projectLink = (name: string) => {
  return `/project/${name}`;
};

const handleShowCreateProjectDialog = async () => {
  visible.value = true;
};

const createProject = async () => {
  await projectStore.createProject(projectName.value);
};

onMounted(async () => {
  await projectStore.fetchAll();
  console.debug(projects.value);
});
</script>
