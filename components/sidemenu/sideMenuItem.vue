<script setup lang="ts">
import { EllipsisHorizontalIcon, PlusIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  menuItem: SideMenuItem;
  depth: number;
}>();

interface Emits {
  (e: "create", arg: SideMenuItem): void;
  (e: "custom", arg: SideMenuItem, index: number): void;
}

const emits = defineEmits<Emits>();

const visible = ref(true);

const hasChild = computed(() => {
  return props.menuItem.children.length > 0;
});

const handleClickChevron = () => {
  visible.value = !visible.value;
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
      <NuxtLink :to="menuItem.link" v-if="menuItem.type === 'milestoneLink'" class="w-full">
        {{ menuItem.title }}
      </NuxtLink>
      <div v-else>
        {{ props.menuItem.title }}
      </div>
      <div class="ml-auto flex items-center justify-end opacity-0 group-hover:opacity-100">
        <!-- 追加ボタン -->
        <plus-icon
          class="w-6 h-6 rounded-md hover:bg-gray-500 p-1"
          v-if="menuItem.createContext"
          @click.stop="$emit('create', menuItem)"
        ></plus-icon>

        <!-- カスタムメニュー -->
        <drop-down-menu v-if="menuItem.customContext">
          <template #button>
            <ellipsis-horizontal-icon class="w-6 h-6 rounded-md hover:bg-gray-500 p-1"> </ellipsis-horizontal-icon>
          </template>
          <drop-down-menu-item
            v-for="(item, index) in menuItem.customContext"
            :key="index"
            @click.stop="$emit('custom', menuItem, index)"
          >
            {{ item.text }}
          </drop-down-menu-item>
        </drop-down-menu>
      </div>
    </div>
    <div v-show="visible">
      <side-menu-item
        v-for="(child, index) in props.menuItem.children"
        :key="index"
        :menu-item="child"
        :depth="props.depth + 1"
        @create="(arg) => $emit('create', arg)"
        @custom="(arg, index) => $emit('custom', arg, index)"
      >
      </side-menu-item>
    </div>
  </div>
</template>

<style scoped>
.ml {
  padding-left: v-bind(depthStyle);
}
</style>
