import type { ProjectStatus } from "./projectStatus.enum";

export interface IProject {
  id: number;
  name: string;
  sourceLanguage: string;
  status: ProjectStatus;
  targetLanguages: string[];
  dateCreated: Date;
  dateUpdated: Date;
  dateDue: Date;
}
