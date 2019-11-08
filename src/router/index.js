import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

/**
 * 路由自动导入
 */
const routerContext = require.context("./", true, /\.js$/);
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith("./index")) {
    return;
  }
  const routerModule = routerContext(route);
  routes = routes.concat(routerModule.default || routerModule);
});

// 最后插入404 page
routes = routes.concat({
  path: "*",
  redirect: "/404"
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
