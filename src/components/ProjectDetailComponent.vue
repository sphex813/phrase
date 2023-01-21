<template>
  <div class="project-detail">
    <div class="project-detail__label">Name</div>
    <div class="project-detail__input">
      <input maxlength="20" v-model.trim="value.name" />
    </div>
    <div class="project-detail__label">Select languages</div>
    <LangRadioComponent v-model="langSelect" />
    <LangSelectComponent
      class="project-detail--stretch"
      v-model:target-languages="value.targetLanguages"
      v-model:source-language="value.sourceLanguage"
      :source-lang-selected="langSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { IProject } from "@/models/project.interface";
import { useVModel } from "@vueuse/core";
import { ref, type PropType } from "vue";
import LangRadioComponent from "./LangRadioComponent.vue";
import LangSelectComponent from "./LangSelectComponent.vue";
const langSelect = ref(true);
const props = defineProps({
  modelValue: { type: Object as PropType<IProject>, default: {} },
});
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
.project-detail {
  display: flex;
  flex-direction: column;

  grid-template-columns: auto 1fr;
  row-gap: 0.5rem;
  column-gap: 1rem;
  position: relative;
  padding: 1rem 0;

  &__input {
    margin-right: auto;

    & input {
      all: unset;
    }

    border-radius: 2rem;
    border: 2px solid var(--black);
    padding: 0.5rem 1rem;
  }

  &__label {
    padding-top: 1rem;
    font-weight: bold;
  }

  &--stretch {
    grid-column: 1/-1;
  }
}

@media only screen and (max-width: 600px) {
  .project-detail {
    &__input {
      margin: 0;
    }
  }
}
</style>
