<template>
  <div class="lang-radio">
    <label for="source" class="lang-radio__button lang-radio__button--orange">
      <input
        hidden
        type="radio"
        id="source"
        :value="true"
        v-model="value"
      /><span>Source language</span>
    </label>
    <label for="target" class="lang-radio__button lang-radio__button--teal">
      <input
        hidden
        type="radio"
        id="target"
        :value="false"
        v-model="value"
      /><span>Target languages</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
.lang-radio {
  display: flex;
  gap: 1rem;
  align-items: center;

  &__button {
    text-align: center;

    & input + span {
      padding: 0.5rem 1rem;
      display: block;
      border-radius: 2rem;
    }

    & input:checked + span {
      border: 2px solid var(--black);
    }

    &--orange span {
      background-color: var(--orange);
    }

    &--teal span {
      background-color: var(--teal);
    }
  }
}
</style>
