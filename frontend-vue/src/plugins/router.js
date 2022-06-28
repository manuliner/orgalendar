import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "",

    component: () => import("../layouts/default/Index"),
    children: [
      {
        path: "",
        name: "Start",
        component: () => import("../views/home/Index"),
      },
      {
        path: "/new",
        name: "New",
        component: () => import("../views/new/Index"),
      },
      {
        path: "/:slug",
        name: "Calendar",
        component: () => import("../views/calendar/Index"),
      },
    ],
  },
];

const router = new Router({
  base: process.env.BASE_URL || "/",
  mode: "history",
  routes,
});

export default router;
