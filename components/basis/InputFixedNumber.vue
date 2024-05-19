<template>
  <div>
    <div
      v-show="!editing || !editable"
      class="w-full h-full text-right flex justify-end items-center pr-2"
      :class="{ 'text-gray-300': isEmptyValue }"
      @click="handleClick"
      @dblclick.prevent="handleDoubleClick"
    >
      {{ showFixedValue }}
    </div>
    <input
      v-if="editing"
      ref="editor"
      v-model="input"
      type="number"
      min="0"
      step="0.25"
      class="w-full h-full text-right outline-none"
      name="fixed-input"
      @keypress.enter="handleEnter"
      @blur="handleBlur"
    >
  </div>
</template>

<script lang="ts" setup>
/**
 * 数値を入力するセル
 */
interface Props {
  value?: number;
  editable?: boolean;
}
interface Emits {
  (e: "input", value: number): void;
}
const props = withDefaults(defineProps<Props>(), {
  editable: true,
});
const emits = defineEmits<Emits>();
const input = ref<string>(props.value?.toFixed(2) || "0.00");
const editing = ref<boolean>(false);
const editor = ref<HTMLInputElement | null>(null);

/**
 * 表示用の文字列を返す
 */
const showFixedValue = computed(() => {
  return props.value?.toFixed(2) || "0.00";
});

/**
 * 空文字の表示かどうか
 */
const isEmptyValue = computed(() => {
  return props.value === undefined && !editing.value;
});

/**
 * Enterキーで確定イベント
 */
const handleEnter = () => {
  editor.value?.blur();
};

/**
 * 入力イベント
 */
const handleBlur = () => {
  try {
    if (props.value !== Number(input.value)) {
      emits("input", Number(input.value));
    }
  }
  finally {
    editing.value = false;
  }
};

/**
 * セルをクリック
 * @param e
 */
const handleClick = () => {
  handleDoubleClick();
};

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
