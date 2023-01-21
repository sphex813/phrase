<template>
  <td
    class="content-cell"
    :class="{
      'content-cell--start': position === 'START',
      'content-cell--end': position === 'END',
    }"
  >
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
defineProps<{
  position?: "START" | "END";
}>();
</script>

<style lang="scss" scoped>
.content-cell {
  white-space: nowrap;
  padding: 0.5rem;
  text-align: center;

  &--start {
    text-align: start;
  }

  &--end {
    text-align: end;
  }
}
</style>
