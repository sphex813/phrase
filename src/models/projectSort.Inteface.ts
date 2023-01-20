import type { IProject } from "./project.interface";

export interface IProjectSort {
  property: keyof IProject;
  orderAsc: boolean;
}
