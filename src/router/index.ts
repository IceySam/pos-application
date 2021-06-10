import { createRouter, createWebHistory } from "vue-router";
import Login from "../Views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Workspace",
    component: () => import("../Views/Workspace/Workspace.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
