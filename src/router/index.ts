import { useProjectsStore } from "@/stores/projects.store";
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
      name: "project",
      component: () => import("../views/ProjectDetailView.vue"),
      beforeEnter: (to) => {
        //TODO nefunguje refresh
        const { projects } = useProjectsStore();
        if (!projects?.find((project) => project.id === Number(to.params.id))) {
          return { name: "projects" };
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "projects" },
    },
  ],
});

export default router;
