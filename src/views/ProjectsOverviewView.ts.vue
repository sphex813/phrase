<template>
  <div class="projects-overview">
    <table class="projects-table">
      <tr class="projects-table__header" :key="componentKey">
        <th
          @click="sortBy('id')"
          :class="[sortedClass('id')]"
          class="projects-table__header-cell projects-table__header-cell--sortable"
        >
          ID
        </th>
        <th
          @click="sortBy('name')"
          :class="[sortedClass('name')]"
          class="projects-table__header-cell projects-table__header-cell--sortable"
        >
          Name
        </th>
        <th class="projects-table__header-cell">Source Language</th>
        <th
          @click="sortBy('status')"
          :class="[sortedClass('status')]"
          class="projects-table__header-cell projects-table__header-cell--sortable"
        >
          Status
        </th>
        <th class="projects-table__header-cell">Target Languages</th>
        <th class="projects-table__header-cell">Date Created</th>
        <th
          @click="sortBy('dateDue')"
          :class="[sortedClass('dateDue')]"
          class="projects-table__header-cell projects-table__header-cell--sortable"
        >
          Date Due
        </th>
        <th class="projects-table__header-cell">Date Updated</th>
      </tr>
      <tr
        v-for="project in filteredData"
        :key="project.id"
        class="projects-table__content"
      >
        <td class="projects-table__cell">{{ project.id }}</td>
        <td class="projects-table__cell">{{ project.name }}</td>
        <td class="projects-table__cell projects-table__cell--center">
          {{ project.sourceLanguage }}
        </td>
        <td class="projects-table__cell projects-table__cell--center">
          {{ project.status }}
        </td>
        <td class="projects-table__cell projects-table__cell--center">
          {{ formatArray(project.targetLanguages) }}
        </td>
        <td class="projects-table__cell projects-table__cell--end">
          {{ formatDate(project.dateCreated) }}
        </td>
        <td class="projects-table__cell projects-table__cell--end">
          {{ formatDate(project.dateDue) }}
        </td>
        <td class="projects-table__cell projects-table__cell--end">
          {{ formatDate(project.dateUpdated) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { useFormatArray } from "@/composables/formatArray.composable";
  import { useFormatDate } from "@/composables/formatDate.composable";
  import type { IProject } from "@/models/project.interface";
  import { ProjectStatus } from "@/models/projectStatus.enum";
  import { useProjectsStore } from "@/stores/projects.store";
  import { computed, onMounted, ref, type Ref } from "vue";
  const { projects } = useProjectsStore();
  const { formatDate } = useFormatDate();
  const { formatArray } = useFormatArray();
  let filteredData: Ref<IProject[]> = ref([]);
  let sortedAsc = true;
  let sortedBy: keyof IProject = "id";

  const componentKey = ref(0);

  const forceRerender = () => {
    componentKey.value += 1;
  };

  const sortsedClass = computed((prop: keyof IProject) => ({
    "projects-table__header-cell--ascending": false,
    "projects-table__header-cell--descending": false,
  }));

  onMounted(() => {
    filteredData.value = projects ?? [];
  });

  const sortBy = (prop: keyof IProject) => {
    if (sortedBy === prop && sortedAsc === true) {
      sortedAsc = false;
      sortedBy = prop;
      filteredData.value.sort((x, y) => (x[prop] > y[prop] ? -1 : 1));
      forceRerender();
    } else {
      sortedAsc = true;
      sortedBy = prop;
      filteredData.value.sort((x, y) => (x[prop] < y[prop] ? -1 : 1));
      forceRerender();
    }
  };

  const sortedClass = (prop: keyof IProject) => {
    return {
      "projects-table__header-cell--ascending":
        prop === sortedBy && sortedAsc === true,
      "projects-table__header-cell--descending":
        prop === sortedBy && sortedAsc === false,
    };
  };
</script>

<style lang="scss" scoped>
  .projects-overview {
    display: flex;
    overflow: auto;
  }
  .projects-table {
    flex: 1;

    &__header {
      background-color: var(--black);
      color: var(--white);
    }

    &__header-cell {
      padding: 0.5rem 0;

      &--sortable {
        text-decoration: underline;
        cursor: pointer;
      }

      &--ascending {
        &::after {
          content: "ASC";
        }
      }

      &--descending {
        &::after {
          content: "DSC";
        }
      }
    }

    &__content {
      &:nth-child(odd) {
        background-color: var(--light-gray);
      }

      &:hover {
        background-color: var(--teal);
      }
    }

    &__cell {
      white-space: nowrap;
      padding: 0.5rem;

      &--center {
        text-align: center;
      }

      &--end {
        text-align: end;
      }
    }
  }
</style>
