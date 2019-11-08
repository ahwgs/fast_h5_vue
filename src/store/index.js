import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 文件自动导入
const files = require.context("./modules", false, /\.js$/);
const modules = {};
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});
