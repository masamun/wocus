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
  logger.debug(projects.value);
});
</script>

<template>
  <div class="flex flex-wrap flex-row content-around gap-4 p-8">
    <div class="basis-full border-b-2 border-gray-300 text-xl pb-1 flex">
      <p>Projects</p>
      <button
        @click="handleShowCreateProjectDialog"
        class="border text-gray-600 border-gray-300 rounded mt-1 hover:bg-gray-300 cursor-pointer ml-4"
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
  </div>
  <basic-dialog title="プロジェクト作成" v-model="visible" @ok="createProject">
    <div>
      l
      <input type="text" v-model="projectName" class="p-2 border" />
    </div>
  </basic-dialog>
</template>
