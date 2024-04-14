<template>
  <div
    class="flex w-full h-full items-center justify-between p-1"
    :data-field-type="field.type"
    @dblclick="handleDoubleClick"
  >
    <label v-if="field.editable && editing" class="h-full">
      <input
        ref="editor"
        type="text"
        class="w-full h-full"
        v-model="input"
        @keypress.enter="handleEnter"
        @blur="handleBlur"
      />
    </label>
    <span v-else>
      {{ value }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { MilestoneField } from "~/client/graphql/types/graphql";

/**
 * 基準値を表示するセル
 */
interface Props {
  /**
   * タスク情報
   */
  taskId: string;

  /**
   * カラム情報
   */
  field: MilestoneField;
}

const props = defineProps<Props>();
const input = ref<string>("");
const editing = ref<boolean>(false);
const editor = ref<HTMLInputElement | null>(null);
const taskFieldStore = useTaskFieldStore();

const taskStore = useTaskStore();

/**
 * 編集モードに移行する
 */
const handleDoubleClick = () => {
  editing.value = true;

  nextTick(() => {
    editor.value?.focus();
  });
};

const handleEnter = () => {
  editor.value?.blur();
};

/**
 * 入力イベント
 */
const handleBlur = () => {
  try {
    if (initialValue.value !== input.value) {
      taskFieldStore.update(props.taskId, props.field.type, input.value);
    }
  } finally {
    editing.value = false;
  }
};

/**
 * 初期表示
 */
const initialValue = computed(() => {
  return taskFieldStore.field(props.taskId, props.field.type)?.value ?? "";
});

const value = computed(() => {
  if (props.field.type === "order") {
    return "" + (taskStore.tasks.find((p) => p.id === props.taskId)?.order?.order ?? "-");
  }
  // 日付が設定されている項目かどうか
  if (props.field.type.includes("date")) {
    const now = new Date();
    const dateValue = new Date(initialValue.value);
    if (Number.isNaN(dateValue.getTime())) {
      return "";
    } else {
      if (now.getFullYear() !== dateValue.getFullYear()) {
        return dateValue.toStringYMD();
      } else {
        return dateValue.toStringMD();
      }
    }
  }
  return initialValue.value;
});

onMounted(() => {
  input.value = value.value;
});
</script>
