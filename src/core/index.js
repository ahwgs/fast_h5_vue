/**
 * @Description: 导入功能
 * @author ahwgs
 * @date 2019/11/8
 */
import Vue from "vue";
import FastClick from "fastclick";
import "../registerServiceWorker";
import defaultSettings from "../setting";
import * as filters from "@/filters"; // global filters
const { NODE_ENV } = process.env;
import "@/core/component_use";
import "@/icons";
import SvgIcon from "@/components/SvgIcon"; // 引入svgIcon组件
import "@/assets/less/common.less";

import "@/utils/permission"; // 权限校验

// 注册svgIcon组件
Vue.component("svg-icon", SvgIcon);

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 解决移动端点击300ms延时
FastClick.attach(document.body);

if (NODE_ENV === "development" && defaultSettings.showVconsole) {
  const VConsole = require("vconsole");
  console.log("我执行了");
  // eslint-disable-next-line
  const v_console = new VConsole();
}
