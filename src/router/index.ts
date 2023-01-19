import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "projects",
      component: () => import("../views/ProjectsOverviewView.ts.vue"),
    },
    {
      path: "/project/:id",
      component: () => import("../views/ProjectDetailView.vue"),
      //pouzit navigation guard
    },
  ],
});

export default router;
