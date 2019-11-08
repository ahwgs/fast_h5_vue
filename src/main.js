import Vue from "vue";
import "lib-flexible";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import FastClick from "fastclick";
import "./registerServiceWorker";
import defaultSettings from "./setting";
import * as filters from "./filters"; // global filters
const { NODE_ENV } = process.env;

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 解决移动端点击300ms延时
FastClick.attach(document.body);

if (NODE_ENV === "development" && defaultSettings.showVconsole) {
  const VConsole = require("vconsole");
  // eslint-disable-next-line
  const v_console = new VConsole();
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
