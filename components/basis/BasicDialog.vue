<template>
  <!-- cancel event代わり -->
  <dialog
    ref="dialog"
    @keydown.esc.stop="handleCancel"
  >
    <div class="min-w-60 p-2">
      <div class="border-b mb-4 pb-1">
        <slot name="title">
          <div class="flex justify-between items-center">
            {{ props.title }}
            <XMarkIcon
              class="w-8 h-8 p-1 rounded text-gray-400 hover:bg-gray-200 cursor-pointer"
              @click.stop="handleCancel"
            />
          </div>
        </slot>
      </div>
      <div class="p-1">
        <slot>
          <div class="h-2" />
        </slot>
      </div>
      <slot name="footer">
        <div class="border-t mt-4 pt-1">
          <div class="flex justify-end pt-2">
            <button
              class="btn-normal"
              title="Cancel"
              @click.stop="handleCancel"
            >
              キャンセル
            </button>
            <button
              title="OK"
              class="ml-4 btn-primary"
              :class="{ 'btn-disabled': disabled }"
              :disabled="props.disabled"
              @click.stop="handleOk"
            >
              OK
            </button>
          </div>
        </div>
      </slot>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
/**
 * v-model
 */
interface Props {
  title: string;
  disabled?: boolean;
}
interface Emits {
  (e: "cancel" | "ok"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const visible = defineModel<boolean>({ required: true });
const dialog = ref<HTMLDialogElement | null>(null);

const handleCancel = () => {
  emits("cancel");
  visible.value = false;
};

const handleOk = () => {
  emits("ok");
  visible.value = false;
};

watch(visible, (value) => {
  if (value) {
    dialog.value?.showModal();
  }
  else {
    dialog.value?.close();
  }
});
</script>
