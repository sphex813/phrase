import { useProjectsApi } from "@/composables/projectsApi.composable";
import type { IProject } from "@/models/project.interface";
import type { ProjectStatus } from "@/models/projectStatus.enum";
import { useNow } from "@vueuse/core";
import dayjs from "dayjs";
import { defineStore, getActivePinia } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
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

  const getProjects = async (): Promise<boolean> => {
    try {
      const projectsResponse = await getProjectsApi();
      projects.value = projectsResponse;
      return true;
    } catch (err) {
      alert("Error while loading the projects!");
      return false;
    }
  };

  const updateProject = async (project: IProject): Promise<boolean> => {
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

  const createProject = async (project: IProject): Promise<boolean> => {
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

  const totalProjects: ComputedRef<number> = computed(() => {
    return projects.value?.length ?? 0;
  });

  const pastDueDate: ComputedRef<number> = computed(() => {
    return (
      projects.value?.filter((project) => project.dateDue < now.value).length ??
      0
    );
  });

  const mostProminentLang: ComputedRef<string> = computed(() => {
    return (
      mostFrequent(projects.value?.map((project) => project.sourceLanguage)) ??
      "not known"
    );
  });

  const projectsCountByStatus = (status: ProjectStatus): number => {
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
