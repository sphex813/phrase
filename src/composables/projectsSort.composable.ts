import type { IProject } from "@/models/project.interface";
import type { IProjectSort } from "@/models/projectSort.Inteface";
import { ref, type Ref } from "vue";

export const useProjectsSort = () => {
  const appliedSort: Ref<IProjectSort> = ref({
    property: "id" as keyof IProject,
    orderAsc: true,
  });

  const sortBy = (prop: keyof IProject) => {
    if (
      appliedSort.value.property === prop &&
      appliedSort.value.orderAsc === true
    ) {
      appliedSort.value.orderAsc = false;
    } else {
      appliedSort.value.orderAsc = true;
    }
    appliedSort.value.property = prop;
  };

  const sortProjects = (projects: IProject[]) => {
    const sortProp = appliedSort.value.property;
    if (appliedSort.value.orderAsc) {
      projects?.sort((x, y) =>
        valueToSort(x[sortProp]) < valueToSort(y[sortProp]) ? -1 : 1
      );
    } else {
      projects?.sort((x, y) =>
        valueToSort(x[sortProp]) > valueToSort(y[sortProp]) ? -1 : 1
      );
    }
  };

  const valueToSort = (projectValue: string | number | string[] | Date) => {
    if (typeof projectValue === "string") {
      return projectValue.toLowerCase();
    }
    return projectValue;
  };

  return { appliedSort, sortBy, sortProjects };
};
