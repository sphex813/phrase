import type { IProjectLinks } from "./projectLinks.interface";
import type { ProjectStatus } from "./projectStatus.enum";

export interface IProject {
  id: number;
  name: string;
  sourceLanguage: string;
  status: ProjectStatus;
  targetLanguages: string[]; //TODO unique
  dateCreated: Date;
  dateUpdated: Date;
  dateDue: Date;
  _links: IProjectLinks;
}
