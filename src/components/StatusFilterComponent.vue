<template>
  <div>
    <span>Status </span>
    <select v-model="value">
      <option :value="null">ALL</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="NEW">NEW</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import type { ProjectStatus } from "@/models/projectStatus.enum";
  import { useVModel } from "@vueuse/core";
  const props = defineProps<{ modelValue: ProjectStatus | null }>();
  const emit = defineEmits(["update:modelValue"]);
  const value = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped></style>
