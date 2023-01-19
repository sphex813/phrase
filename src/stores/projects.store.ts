import { useProjectsApi } from "@/composables/projectsApi.composable";
import type { IProject } from "@/models/project.interface";
import { defineStore, getActivePinia } from "pinia";
import { ref, type Ref } from "vue";
export const useProjectsStore = defineStore("projectsStore", () => {
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
    const projectsResponse = await getProjectsApi();
    projects.value = projectsResponse;
  };

  return { projects, getProjects };
});
