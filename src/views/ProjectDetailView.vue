<template>
  <div class="detail-container">
    <div class="detail-container__header">
      <CustomButtonComponent
        @click="navigateBack()"
        class="detail-container__button"
        >Back</CustomButtonComponent
      >
      <h2 v-if="isEdit" class="detail-container__title">
        Edit project with ID {{ projectCopy.id }}
      </h2>
      <h2 v-if="!isEdit" class="detail-container__title">Create new project</h2>
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
import { useValidation } from "@/composables/validateProject.composable";
import type { IProject } from "@/models/project.interface";
import { ProjectStatus } from "@/models/projectStatus.enum";
import router from "@/router";
import { useProjectsStore } from "@/stores/projects.store";
import dayjs from "dayjs";
import cloneDeep from "lodash.clonedeep";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const { projects, updateProject, createProject } = useProjectsStore();
const route = useRoute();
const { validate } = useValidation();
const originalProject = (projects?.find(
  (project) => project.id === Number(route.params.id)
) as IProject) ?? {
  id: 0,
  name: "",
  sourceLanguage: "",
  status: ProjectStatus.NEW,
  targetLanguages: [],
  dateCreated: dayjs(),
  dateUpdated: dayjs(),
  dateDue: dayjs().add(1, "day"),
};

const projectCopy = ref(cloneDeep(originalProject));

const isEdit = computed(() => {
  return projectCopy.value.id !== 0;
});

const navigateBack = () => {
  router.push({ name: "projects" });
};

const save = async () => {
  const valid = validate(originalProject, projectCopy);

  if (valid) {
    if (isEdit.value) {
      await updateProject(projectCopy.value);
    } else {
      await createProject(projectCopy.value);
    }
    navigateBack();
  }
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
