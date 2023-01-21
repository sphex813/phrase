<template>
  <div>
    <span>Name </span>
    <input type="text" v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped></style>
