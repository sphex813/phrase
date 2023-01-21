<template>
  <div>
    {{ status }}
    <span class="highlight">{{ projectsCountByStatus(status) }}</span
    >/{{ totalProjects }}
  </div>
</template>

<script setup lang="ts">
import type { ProjectStatus } from "@/models/projectStatus.enum";
import { useProjectsStore } from "@/stores/projects.store";
import { storeToRefs } from "pinia";
defineProps<{ status: ProjectStatus }>();

const projectsStore = useProjectsStore();
const { totalProjects } = storeToRefs(projectsStore);
const { projectsCountByStatus } = projectsStore;
</script>

<style lang="scss" scoped>
.highlight {
  color: var(--teal);
}
</style>
