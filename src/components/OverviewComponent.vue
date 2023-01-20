<template>
  <div class="total-overview">
    <StatusCountComponent :status="ProjectStatus.NEW" />
    <StatusCountComponent :status="ProjectStatus.COMPLETED" />
    <StatusCountComponent :status="ProjectStatus.DELIVERED" />
    <div>
      OVERDUE <span class="total-overview__highlight">{{ pastDueDate }}</span
      >/{{ totalProjects }}
    </div>
    <div>
      Most prominent language is
      <span class="total-overview__highlight">{{ mostProminentLang }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ProjectStatus } from "@/models/projectStatus.enum";
  import { useProjectsStore } from "@/stores/projects.store";
  import { storeToRefs } from "pinia";
  import StatusCountComponent from "./StatusCountComponent.vue";
  const projectsStore = useProjectsStore();
  const { mostProminentLang, pastDueDate, totalProjects } =
    storeToRefs(projectsStore);
</script>

<style lang="scss" scoped>
  .total-overview {
    font-size: 1.5rem;
    display: flex;
    font-size: 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
    font-weight: bold;

    &__highlight {
      color: var(--teal);
    }
  }
</style>
