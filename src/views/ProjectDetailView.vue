<template>
  <div class="detail-container">
    <div class="detail-container__header">
      <CustomButtonComponent
        @click="navigateBack()"
        class="detail-container__button"
        >Back</CustomButtonComponent
      >
      <h2 class="detail-container__title">
        Edit project with ID {{ projectCopy.id }}
      </h2>
    </div>

    <ProjectDetailComponent v-model="projectCopy" />
    <CustomButtonComponent @click="save()" class="detail-container__button"
      >Save project</CustomButtonComponent
    >
  </div>
</template>

<script setup lang="ts">
  import CustomButtonComponent from "@/components/CustomButtonComponent.vue";
  import ProjectDetailComponent from "@/components/ProjectDetailComponent.vue";
  import { useCompareProjects } from "@/composables/compareProjects.composable";
  import type { IProject } from "@/models/project.interface";
  import router from "@/router";
  import { useProjectsStore } from "@/stores/projects.store";
  import cloneDeep from "lodash.clonedeep";
  import { ref, unref } from "vue";
  import { useRoute } from "vue-router";
  const { projects, updateProject } = useProjectsStore();
  const route = useRoute();
  const { projectsEquals } = useCompareProjects();
  const originalProject = projects?.find(
    (project) => project.id === Number(route.params.id)
  ) as IProject;

  const projectCopy = ref(cloneDeep(originalProject));

  const navigateBack = () => {
    router.push({ name: "projects" });
  };

  const save = async () => {
    const valid = validate();

    if (valid) {
      await updateProject(projectCopy.value);
      navigateBack();
    }
  };

  const validate = () => {
    if (!projectCopy.value.name) {
      alert("Name is required!");
      return false;
    }

    if (!projectCopy.value.sourceLanguage) {
      alert("Source language is requred!");
      return false;
    }

    if (projectsEquals(unref(originalProject), unref(projectCopy))) {
      alert("Project was not changed!");
      return false;
    }

    return true;
  };
</script>

<style lang="scss" scoped>
  .detail-container {
    display: flex;
    flex-direction: column;

    &__button {
      align-self: flex-start;
    }

    &__header {
      display: flex;
      align-items: center;
    }

    &__title {
      margin: 0 0 0 2rem;
    }
  }

  @media only screen and (max-width: 600px) {
    .detail-container {
      &__button {
        align-self: stretch;
      }
    }
  }
</style>
