<template>
  <basic-dialog
    v-model="visible"
    :title="props.title"
    :disabled="disabled"
    @ok="emits('ok', model)"
    @cancel="emits('cancel')"
  >
    <div>
      <input
        v-model="model"
        type="text"
        class="p-2 border"
      >
    </div>
  </basic-dialog>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  text: string;
}
interface Emits {
  (e: "cancel"): void;
  (e: "ok", value: string): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const visible = ref(false);
const model = ref(props.text);
const disabled = computed(() => model.value.length === 0);

onMounted(() => {
  visible.value = true;
});
</script>
