import type { AxiosInstance } from "axios";
import type { IProject } from "./../models/project.interface";

export const useProjectsApi = (axios: AxiosInstance) => {
  const baseUrl = "/projects";

  const getProjects = async (): Promise<IProject[]> => {
    const response = await axios.get(baseUrl);

    return (response.data._embedded.projects as IProject[]).map(mapProject);
  };

  const createProject = async (project: IProject) => {
    const result = await axios.post(baseUrl, project);
    console.log(result.data);
  };

  const updateProject = async (project: IProject) => {
    const result = await axios.put(`${baseUrl}/${project.id}`, project);

    return mapProject(result.data as IProject);
  };

  const mapProject = (project: IProject) => {
    return {
      ...project,
      dateCreated: new Date(project.dateCreated),
      dateDue: new Date(project.dateDue),
      dateUpdated: new Date(project.dateUpdated),
    };
  };

  return {
    getProjects,
    updateProject,
    createProject,
  };
};
