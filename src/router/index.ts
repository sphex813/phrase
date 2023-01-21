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
      path: "/project",
      name: "projectNew",
      component: () => import("../views/ProjectDetailView.vue"),
    },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ProjectDetailView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "projects" },
    },
  ],
});

export default router;
