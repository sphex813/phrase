import { useMostFrequent } from "./../composables/mostFrequent.composable";
import { useProjectsApi } from "@/composables/projectsApi.composable";
import type { IProject } from "@/models/project.interface";
import { defineStore, getActivePinia } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useNow } from "@vueuse/core";
import type { ProjectStatus } from "@/models/projectStatus.enum";

export const useProjectsStore = defineStore("projectsStore", () => {
  const now = useNow({ interval: 60000 }); //refresh after 1 minuts
  const { mostFrequent } = useMostFrequent();
  const axios = getActivePinia()?.axios!;
  const {
    getProjects: getProjectsApi,
    getProject: getProjectApi,
    createProject: createProjectApi,
    updateProject: updateProjectApi,
    deleteProject: deleteProjectApi,
  } = useProjectsApi(axios);

  const projects: Ref<IProject[] | null> = ref(null);

  const getProjects = async () => {
    //todo handle errors
    const projectsResponse = await getProjectsApi();
    projects.value = projectsResponse;
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
    getProjects,
    totalProjects,
    pastDueDate,
    mostProminentLang,
    projectsCountByStatus,
  };
});
