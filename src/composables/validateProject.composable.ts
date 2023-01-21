import type { IProject } from "@/models/project.interface";
import type { MaybeRef } from "@vueuse/core";
import { unref } from "vue";
export const useValidation = () => {
  const compareStringArrays = (array1: string[], array2: string[]) => {
    return (
      JSON.stringify([...array1].sort()) === JSON.stringify([...array2].sort())
    );
  };

  const projectsEquals = (project1: IProject, project2: IProject) => {
    if (project1.name !== project2.name) {
      return false;
    }
    if (project1.sourceLanguage !== project2.sourceLanguage) {
      return false;
    }
    if (
      !compareStringArrays(project1.targetLanguages, project2.targetLanguages)
    ) {
      return false;
    }

    return true;
  };

  const validate = (
    oldProject: MaybeRef<IProject>,
    newProject: MaybeRef<IProject>
  ) => {
    const oldProjectRaw = unref(oldProject);
    const newProjectRaw = unref(newProject);

    if (!newProjectRaw.name) {
      alert("Name is required!");
      return false;
    }

    if (!newProjectRaw.sourceLanguage) {
      alert("Source language is requred!");
      return false;
    }

    if (projectsEquals(oldProjectRaw, newProjectRaw)) {
      alert("Project was not changed!");
      return false;
    }

    return true;
  };

  return { validate };
};
