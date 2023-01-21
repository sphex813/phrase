<template>
  <div class="projects-overview">
    <div class="projects-overview__filters">
      <NameFilterComponent v-model="filters.name" />
      <StatusFilterComponent v-model="filters.status" />
    </div>
    <ProjectsTableComponent :filters="filters" />
    <CustomButtonComponentVue
      @click="newProject()"
      class="projects-overview__create-btn"
      >New project</CustomButtonComponentVue
    >
    <OverviewComponent />
  </div>
</template>

<script setup lang="ts">
import CustomButtonComponentVue from "@/components/CustomButtonComponent.vue";
import NameFilterComponent from "@/components/NameFilterComponent.vue";
import OverviewComponent from "@/components/OverviewComponent.vue";
import ProjectsTableComponent from "@/components/ProjectsTableComponent.vue";
import StatusFilterComponent from "@/components/StatusFilterComponent.vue";
import router from "@/router";
import { ref } from "vue";
const filters = ref({
  name: "",
  status: null,
});

const newProject = () => {
  router.push({ name: "projectNew" });
};
</script>

<style lang="scss" scoped>
.projects-overview {
  display: flex;
  flex-direction: column;

  &__filters {
    color: var(--white);
    margin-left: auto;
    padding: 0.5rem;
    background-color: var(--black);
    gap: 0.5rem;
    display: flex;
  }

  &__create-btn {
    margin-top: 1rem;
    margin-left: auto;
  }
}
</style>
