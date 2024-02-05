<template>
  <basic-dialog :title="props.title" v-model="visible" @ok="emits('ok', true)" @cancel="emits('ok', false)">
    {{ props.text }}
  </basic-dialog>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  title: string;
}
interface Emits {
  (e: "cancel"): void;
  (e: "ok", value: boolean): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const visible = ref(false);

onMounted(() => {
  visible.value = true;
});
</script>
