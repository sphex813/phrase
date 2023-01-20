<template>
  <div>
    <span>Name </span>
    <input type="text" v-model="value" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value: string) {
      emit("update:modelValue", value);
    },
  });
</script>

<style lang="scss" scoped></style>
