import type { AxiosInstance } from "axios";
import dayjs from "dayjs";
import type { IProject } from "./../models/project.interface";

export const useProjectsApi = (axios: AxiosInstance) => {
  const baseUrl = "/projects";

  const getProjects = async (): Promise<IProject[]> => {
    const response = await axios.get(baseUrl);

    return (response.data._embedded.projects as IProject[]).map(mapProject);
  };

  const createProject = async (project: IProject) => {
    const result = await axios.post(baseUrl, project);

    return mapProject(result.data as IProject);
  };

  const updateProject = async (project: IProject) => {
    const result = await axios.put(`${baseUrl}/${project.id}`, project);

    return mapProject(result.data as IProject);
  };

  const mapProject = (project: IProject) => {
    return {
      ...project,
      dateCreated: dayjs(project.dateCreated).toDate(),
      dateDue: dayjs(project.dateDue).toDate(),
      dateUpdated: dayjs(project.dateUpdated).toDate(),
    };
  };

  return {
    getProjects,
    updateProject,
    createProject,
  };
};
