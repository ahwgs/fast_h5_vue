import Vue from "vue";
import "lib-flexible";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/core"; // 导入核心文件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
