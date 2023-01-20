import type { IProject } from "@/models/project.interface";
import type { IProjectSort } from "@/models/projectSort.Inteface";
import { type Ref, ref } from "vue";

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
    if (appliedSort.value.orderAsc) {
      projects?.sort((x, y) =>
        x[appliedSort.value.property] < y[appliedSort.value.property] ? -1 : 1
      );
    } else {
      projects?.sort((x, y) =>
        x[appliedSort.value.property] > y[appliedSort.value.property] ? -1 : 1
      );
    }
  };

  return { appliedSort, sortBy, sortProjects };
};
