import { useProjectsApi } from "@/composables/projectsApi.composable";
import type { IProject } from "@/models/project.interface";
import type { ProjectStatus } from "@/models/projectStatus.enum";
import { useNow } from "@vueuse/core";
import dayjs from "dayjs";
import { defineStore, getActivePinia } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useMostFrequent } from "./../composables/mostFrequent.composable";

export const useProjectsStore = defineStore("projectsStore", () => {
  const now = useNow({ interval: 60000 }); //refresh after 1 minuts
  const { mostFrequent } = useMostFrequent();
  const axios = getActivePinia()?.axios!;
  const {
    getProjects: getProjectsApi,
    createProject: createProjectApi,
    updateProject: updateProjectApi,
  } = useProjectsApi(axios);

  const projects: Ref<IProject[] | null> = ref(null);

  const getProjects = async () => {
    try {
      const projectsResponse = await getProjectsApi();
      projects.value = projectsResponse;
    } catch (err) {
      alert("Error while loading the projects!");
      return false;
    }
  };

  const updateProject = async (project: IProject) => {
    try {
      project.dateUpdated = dayjs().toDate();
      const projectResponse = await updateProjectApi(project);
      var index = projects.value?.findIndex(
        (project) => project.id === projectResponse.id
      );
      if (index != null && index !== -1 && projects.value) {
        projects.value[index] = projectResponse;
      }

      alert("Project was updated!");
      return true;
    } catch (err) {
      alert("Error while updating the project!");
      return false;
    }
  };

  const createProject = async (project: IProject) => {
    try {
      const projectResponse = await createProjectApi(project);
      projects.value?.push(projectResponse);

      alert("Project was created!");
      return true;
    } catch (err) {
      alert("Error while creating the project!");
      return false;
    }
  };

  const totalProjects = computed(() => {
    return projects.value?.length ?? 0;
  });

  const pastDueDate = computed(() => {
    return (
      projects.value?.filter((project) => project.dateDue < now.value).length ??
      0
    );
  });

  const mostProminentLang = computed(() => {
    return mostFrequent(
      projects.value?.map((project) => project.sourceLanguage)
    );
  });

  const projectsCountByStatus = (status: ProjectStatus) => {
    return (
      projects.value?.filter((project) => project.status === status).length ?? 0
    );
  };

  return {
    projects,
    totalProjects,
    pastDueDate,
    mostProminentLang,
    getProjects,
    updateProject,
    createProject,
    projectsCountByStatus,
  };
});
