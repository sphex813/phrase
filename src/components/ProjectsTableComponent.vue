<template>
  <div class="table-container">
    <table class="projects-table">
      <tr class="projects-table__header">
        <TableHeaderCellComponent
          sortByProperty="id"
          :appliedSort="appliedSort"
          @on-click="sortBy"
          >ID</TableHeaderCellComponent
        >
        <TableHeaderCellComponent
          sortByProperty="name"
          :appliedSort="appliedSort"
          @on-click="sortBy"
          >Name</TableHeaderCellComponent
        >
        <TableHeaderCellComponent>Source Language</TableHeaderCellComponent>
        <TableHeaderCellComponent
          sortByProperty="status"
          :appliedSort="appliedSort"
          @on-click="sortBy"
          >Status</TableHeaderCellComponent
        >
        <TableHeaderCellComponent>Target Language</TableHeaderCellComponent>
        <TableHeaderCellComponent>Date Created</TableHeaderCellComponent>
        <TableHeaderCellComponent
          sortByProperty="dateDue"
          :appliedSort="appliedSort"
          @on-click="sortBy"
          >Date Due</TableHeaderCellComponent
        >
        <TableHeaderCellComponent>Date Updated</TableHeaderCellComponent>
        <TableHeaderCellComponent>Action</TableHeaderCellComponent>
      </tr>
      <tr
        v-for="project in filteredData"
        :key="project.id"
        class="projects-table__content"
      >
        <TableContentCellComponent>{{ project.id }}</TableContentCellComponent>
        <TableContentCellComponent>{{
          project.name
        }}</TableContentCellComponent>
        <TableContentCellComponent position="CENTER">{{
          project.sourceLanguage
        }}</TableContentCellComponent>
        <TableContentCellComponent position="CENTER">{{
          project.status
        }}</TableContentCellComponent>
        <TableContentCellComponent position="CENTER">
          {{ formatArray(project.targetLanguages) }}</TableContentCellComponent
        >
        <TableContentCellComponent position="END">
          {{ formatDate(project.dateCreated) }}</TableContentCellComponent
        >
        <TableContentCellComponent position="END">
          {{ formatDate(project.dateDue) }}</TableContentCellComponent
        >
        <TableContentCellComponent position="END">
          {{ formatDate(project.dateUpdated) }}</TableContentCellComponent
        >
        <TableContentCellComponent
          v-if="project.status !== 'COMPLETED'"
          class="projects-table__edit-button"
          position="END"
          @click="editProject(project)"
        >
          EDIT</TableContentCellComponent
        >
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
  import TableHeaderCellComponent from "@/components/TableHeaderCellComponent.vue";
  import { useFormatArray } from "@/composables/formatArray.composable";
  import { useFormatDate } from "@/composables/formatDate.composable";
  import { useProjectsSort } from "@/composables/projectsSort.composable";
  import type { IProject } from "@/models/project.interface";
  import type { ProjectStatus } from "@/models/projectStatus.enum";
  import router from "@/router";
  import { useProjectsStore } from "@/stores/projects.store";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";
  import TableContentCellComponent from "./TableContentCellComponent.vue";
  const { projects } = storeToRefs(useProjectsStore());
  const { formatDate } = useFormatDate();
  const { formatArray } = useFormatArray();
  const { sortBy, appliedSort, sortProjects } = useProjectsSort();
  const props = defineProps<{
    filters: { name: string; status: ProjectStatus | null };
  }>();

  const filteredData = computed(() => {
    const allProjects: IProject[] = projects.value ?? [];
    sortProjects(allProjects);

    return allProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(props.filters.name.toLowerCase()) &&
        (!props.filters.status || project.status === props.filters.status)
    );
  });

  const editProject = (project: IProject) => {
    router.push({ name: "project", params: { id: project.id } });
  };
</script>

<style lang="scss" scoped>
  .table-container {
    overflow: auto;
    display: flex;
  }
  .projects-table {
    flex: 1;

    & tbody {
      display: table;
      width: 100%;
    }

    &__header {
      background-color: var(--black);
      color: var(--white);
    }

    &__content {
      &:nth-child(odd) {
        background-color: var(--light-gray);
      }

      &:hover {
        background-color: var(--teal);
      }
    }

    &__edit-button {
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
