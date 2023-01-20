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
  import { computed } from "vue";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value: ProjectStatus | null) {
      emit("update:modelValue", value);
    },
  });
</script>

<style lang="scss" scoped></style>
