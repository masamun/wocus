<template>
  <basic-dialog
    :title="props.title"
    v-model="visible"
    @ok="emits('ok', model)"
    @cancel="emits('cancel')"
    :disabled="disabled"
  >
    <div>
      <input type="text" v-model="model" class="p-2 border" />
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
