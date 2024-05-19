<template>
  <div class="flex justify-end items-center pr-2">
    <div
      v-show="!editing"
      class="w-full h-full"
      @click="handleClick"
      @dblclick="handleDoubleClick"
    >
      {{ value }}
    </div>
    <!-- <div :style="stylesheet"> -->
    <input
      v-show="editing"
      ref="editor"
      v-model="input"
      type="text"
      class="w-full h-full"
      @keypress.enter="handleEnter"
      @blur="handleInput"
    >
  </div>
</template>

<script lang="ts" setup>
/**
 * 数値を入力するセル
 */
interface Props {
  value: string;
}
interface Emits {
  (e: "input", value: string): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const input = ref<string>(props.value);
const editing = ref<boolean>(false);
const editor = ref<HTMLInputElement | null>(null);

/**
 * Enterキーで確定イベント
 */
const handleEnter = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement)?.blur();
};

/**
 * 入力イベント
 */
const handleInput = () => {
  try {
    emits("input", input.value);
  }
  finally {
    editing.value = false;
  }
};

/**
 * セルをクリック
 * @param e
 */
const handleClick = () => {};

/**
 * セルをダブルクリックで編集状態に移行する
 * @param e
 */
const handleDoubleClick = () => {
  editing.value = true;

  nextTick(() => {
    editor.value?.focus();
  });
};
</script>
