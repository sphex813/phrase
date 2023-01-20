<template>
  <td
    class="content-cell"
    :class="{
      'content-cell--center': position === 'CENTER',
      'content-cell--end': position === 'END',
    }"
  >
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
  defineProps<{
    position?: "CENTER" | "END";
  }>();
</script>

<style lang="scss" scoped>
  .content-cell {
    white-space: nowrap;
    padding: 0.5rem;

    &--center {
      text-align: center;
    }

    &--end {
      text-align: end;
    }
  }
</style>
