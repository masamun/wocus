<script setup lang="ts">
import { EllipsisHorizontalIcon, PlusIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  menu: MenuItem;
  depth: number;
}>();

interface Emits {
  (e: "create", arg?: MenuItem): void;
  (e: "custom", arg?: MenuItem, index?: number): void;
}

const emits = defineEmits<Emits>();
const routeStore = useRouteStore();

const visible = ref(true);

const hasChild = computed(() => {
  return false; //(props.menu?.children.length ?? 0) > 0;
});

const handleClickChevron = () => {
  visible.value = !visible.value;
};

const createLink = (pageId: string) => {
  return `/project/${routeStore.projectName}/${pageId}`;
};

const depthStyle = computed(() => {
  return `${props.depth - 1}em`;
});
</script>

<template>
  <div class="text-white">
    <div class="flex flex-row items-center cursor-pointer gap-1 p-1 ml hover:bg-gray-600 rounded group">
      <template v-if="hasChild">
        <ChevronRightIcon class="h-4 w-4" @click="handleClickChevron" v-if="!visible"> </ChevronRightIcon>
        <ChevronDownIcon class="h-4 w-4" @click="handleClickChevron" v-else> </ChevronDownIcon>
      </template>
      <div v-else class="h-4 w-2"></div>
      <NuxtLink :to="createLink(menu.pageId)" class="w-full">
        {{ menu?.name }}
      </NuxtLink>
      <div class="ml-auto flex items-center justify-end opacity-0 group-hover:opacity-100">
        <!-- 追加ボタン -->
        <plus-icon class="w-6 h-6 rounded-md hover:bg-gray-500 p-1" v-if="false"></plus-icon>

        <!-- カスタムメニュー -->
        <drop-down-menu>
          <template #button>
            <ellipsis-horizontal-icon class="w-6 h-6 rounded-md hover:bg-gray-500 p-1"> </ellipsis-horizontal-icon>
          </template>
          <drop-down-menu-item
            v-for="(item, index) in menu.customContext"
            :key="index"
            @click.stop="$emit('custom', menu, index)"
            >{{ item.text }}
          </drop-down-menu-item>
        </drop-down-menu>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ml {
  padding-left: v-bind(depthStyle);
}
</style>
