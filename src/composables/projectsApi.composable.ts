import type { IProject } from "./../models/project.interface";
import type { AxiosInstance, AxiosResponse } from "axios";

export const useProjectsApi = (axios: AxiosInstance) => {
  const baseUrl = "/projects";

  const getProjects = async (): Promise<IProject[]> => {
    const response = await axios.get(baseUrl);

    return response.data._embedded.projects;
  };

  const createProject = async (project: IProject) => {
    const result = await axios.post(baseUrl, project);
    console.log("create", result);
  };

  const getProject = async (projectId: number) => {
    const result = await axios.get(`${baseUrl}/${projectId}`);
    console.log("project", projectId, result);
  };

  const updateProject = async (project: IProject) => {
    const result = await axios.put(`${baseUrl}/${project.id}`, project);
    console.log("project", project.id, result);
  };

  const deleteProject = async (projectId: number) => {
    const result = await axios.put(`${baseUrl}/${projectId}`);
    console.log("delete project", projectId, result);
  };

  return {
    getProject,
    getProjects,
    updateProject,
    createProject,
    deleteProject,
  };
};
