<template>
  <basic-dialog
    v-model="visible"
    title="ページを追加"
    class="min-w-[400px] outline-none"
  >
    <div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="mb-4"
      >
        <div class="flex items-center">
          <puzzle-piece-icon class="w-4 h-4 mr-2" />{{ category.category }}
        </div>
        <div
          v-if="category.category !== ''"
          class="border-b-[1px] mb-2"
        />
        <div
          v-for="(type, index2) in category.types"
          :key="index2"
          class="flex gap-4"
          @click="handleSelect(type.type)"
        >
          <div
            class="flex w-full flex-row items-center min-w-32 h-6 text-gray-600 hover:bg-gray-200 cursor-pointer rounded p-4"
          >
            <component
              :is="type.icon"
              class="h-6 w-6 mr-1"
            />
            <span>{{ type.displayName }}</span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div />
    </template>
  </basic-dialog>
</template>

<script setup lang="ts">
import { PuzzlePieceIcon } from "@heroicons/vue/24/outline";
import { useTemplate } from "~/composables/template/useTemplate";

interface Props {
  parentMenuId?: string;
}
const props = defineProps<Props>();
const visible = defineModel<boolean>({ default: false });
const templates = useTemplate();

const categories = computed(() => {
  return templates.templates.value.toSorted((a, b) => a.order - b.order);
});

onMounted(() => {
  visible.value = false;
  templates.fetch();
});
/**
 * ページ種別を選択する
 * @param type
 */
const handleSelect = (type: string) => {
  templates.create(type, props.parentMenuId);
  visible.value = false;
};
</script>
