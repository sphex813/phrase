<template>
  <th
    @click="click()"
    :class="[
      sortedClasses(appliedSort),
      sortByProperty ? 'header-cell--sortable' : '',
    ]"
    class="header-cell"
  >
    <slot></slot>
  </th>
</template>

<script setup lang="ts">
  import type { IProject } from "@/models/project.interface";
  import type { IProjectSort } from "@/models/projectSort.Inteface";
  const props = defineProps<{
    sortByProperty?: keyof IProject;
    appliedSort?: IProjectSort;
  }>();

  const emit = defineEmits<{ (e: "onClick", sortBy: keyof IProject): void }>();

  const click = () => {
    if (props.sortByProperty) {
      emit("onClick", props.sortByProperty);
    }
  };

  const sortedClasses = (appliedSort: IProjectSort | undefined) => {
    if (appliedSort) {
      return {
        "header-cell--ascending":
          props.sortByProperty === appliedSort.property &&
          appliedSort.orderAsc === true,
        "header-cell--descending":
          props.sortByProperty === appliedSort.property &&
          appliedSort.orderAsc === false,
      };
    }
  };
</script>

<style lang="scss" scoped>
  .header-cell {
    padding: 0.5rem 0;

    &--sortable {
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: var(--teal);
      }
    }

    &--ascending {
      &::after {
        content: " ASC";
      }
    }

    &--descending {
      &::after {
        content: " DSC";
      }
    }

    &:first-child {
      padding-left: 0.5rem;
    }

    &:last-child {
      padding-right: 0.5rem;
    }
  }
</style>
