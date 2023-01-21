<script setup lang="ts">
  import { onMounted } from "vue";
  import { RouterView } from "vue-router";
  import { useProjectsStore } from "./stores/projects.store";
  const { getProjects } = useProjectsStore();

  onMounted(() => {
    getProjects();
  });
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
