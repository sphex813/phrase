<template>
  <div class="lang-select">
    <label
      class="lang-select__item"
      :class="{ 'lang-select__item--source': lang === sourceLanguage }"
      v-for="lang of languageCodes"
      :key="lang"
    >
      <input
        hidden
        type="checkbox"
        id="langs"
        :value="lang"
        :disabled="isDisabled(lang)"
        :checked="isChecked(lang)"
        @input="check(lang)"
      /><span>{{ lang }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
  import { useLanguageCodes } from "@/composables/languageCodes.composable";
  import { useVModels } from "@vueuse/core";
  const { languageCodes } = useLanguageCodes();

  const props = defineProps<{
    targetLanguages: string[];
    sourceLanguage: string;
    sourceLangSelected: boolean;
  }>();
  const emit = defineEmits(["update:targetLanguages", "update:sourceLanguage"]);
  const { targetLanguages, sourceLanguage } = useVModels(props, emit);

  const isChecked = (lang: string) => {
    return (
      targetLanguages.value.includes(lang) || sourceLanguage.value === lang
    );
  };

  const isDisabled = (lang: string) => {
    if (props.sourceLangSelected) {
      return isChecked(lang);
    } else {
      return lang === sourceLanguage.value;
    }
  };

  const check = (lang: string) => {
    if (props.sourceLangSelected) {
      sourceLanguage.value = lang;
    } else {
      if (!isDisabled(lang)) {
        if (isChecked(lang)) {
          const index = targetLanguages.value.indexOf(lang);
          if (index > -1) {
            targetLanguages.value.splice(index, 1);
          }
        } else {
          targetLanguages.value.push(lang);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .lang-select {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &__item {
      & input + span {
        border-radius: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--black);
        cursor: pointer;
        display: block;
      }

      & input:checked + span {
        background-color: var(--teal);
      }

      &--source {
        & input:checked + span {
          background-color: var(--orange);
        }
      }
    }
  }
</style>
