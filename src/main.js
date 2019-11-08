import Vue from "vue";
import "lib-flexible";
import App from "./App.vue";
import router from "@router";
import store from "@store";
import FastClick from "fastclick";
import "./registerServiceWorker";
import defaultSettings from "./setting";

const { NODE_ENV } = process.env;

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
