const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  context: path.resolve(__dirname, "./"),
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"), // 主目录
      "@views": resolve("src/views"), // 页面
      "@components": resolve("src/components"), // 组件
      "@services": resolve("src/services"), // 接口文件
      "@utils": resolve("src/utils"), // 通用功能
      "@assets": resolve("src/assets"), // 静态资源
      "@constant": resolve("src/constant"), // 常量
      "@router": resolve("src/router"), // 路由
      "@store": resolve("src/store") // vuex
    }
  }
};
