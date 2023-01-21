<template>
  <div class="custom-button" :class="{ 'custom-button--disabled': disabled }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 1rem;
  font-weight: bold;
  background: var(--teal);
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.5rem rgb(0 0 0 / 20%);
  cursor: pointer;

  &--disabled {
    pointer-events: none;
  }

  &:hover {
    box-shadow: none;
    background-color: var(--teal-dark);
  }
}
</style>
