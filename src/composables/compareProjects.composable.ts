import type { IProject } from "@/models/project.interface";
export const useCompareProjects = () => {
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

  return { projectsEquals };
};
