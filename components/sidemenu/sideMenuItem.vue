<script setup lang="ts">
import { EllipsisHorizontalIcon, PlusIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  menu: MenuItem;
  depth: number;
}>();

interface Emits {
  (e: "custom", menu: MenuItem, index: number): void;
}
defineEmits<Emits>();

const routeStore = useRouteStore();

const visible = ref(true);

const hasChild = computed(() => {
  return false; // (props.menu?.children.length ?? 0) > 0;
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
        <ChevronRightIcon
          v-if="!visible"
          class="h-4 w-4"
          @click="handleClickChevron"
        />
        <ChevronDownIcon
          v-else
          class="h-4 w-4"
          @click="handleClickChevron"
        />
      </template>
      <component
        :is="menu.icon"
        v-else
        class="h-4 w-4 min-w-4 ml-1"
      />
      <NuxtLink
        :to="createLink(menu.pageId)"
        class="w-full text-nowrap text-ellipsis overflow-hidden"
      >
        {{ menu?.name }}
      </NuxtLink>
      <div class="ml-auto items-center justify-end group-hover:flex hidden">
        <!-- 追加ボタン -->
        <plus-icon
          v-if="false"
          class="w-6 h-6 rounded-md hover:bg-gray-500 p-1"
        />

        <!-- カスタムメニュー -->
        <drop-down-menu>
          <template #button>
            <ellipsis-horizontal-icon class="w-6 h-6 rounded-md hover:bg-gray-500 p-1" />
          </template>
          <drop-down-menu-item
            v-for="(item, index) in menu.customContext"
            :key="index"
            @click.stop="$emit('custom', menu, index)"
          >
            {{ item.text }}
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
