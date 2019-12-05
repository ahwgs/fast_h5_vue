# vue-h5

vue+vuex+vant+vue-router+vue-cli3+axios 搭建h5模板

## 如何使用

- 开发
```$xslt
npm run serve
```

- 打包
```$xslt
npm run build
```

- 分析打包
```$xslt
npm run analyze
```

- 代码lint
```$xslt
npm run lint
```
## 目录结构

具体参见`tree.txt`

## 主要功能

### `rem`适配
#### `html meta`修改
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
``` 
#### 安装`postcss-pxtorem` `lib-flexible`
- 引入
```javascript
// main.js
import "lib-flexible";
```
- `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
```

### 移动端点击`300ms`延时
- 安装`fastclick`
```cmd
yarn add fastclick
```
- 使用
```javascript
import FastClick from "fastclick";
// 解决移动端点击300ms延时
FastClick.attach(document.body);
```

### 顶部加载条
- 安装`nprogress`
```cmd
yarn add nprogress
```
- 使用
```javascript
import NProgress from 'nprogress' // progress bar
import '@/assets/less/nprogress.less'
//... 具体参见util/permission.js
```

### 公共包抽取引入`CDN`
```javascript
// 那些资源加载cdn
const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
}
const cdnMap = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js'
    ]
}
module.exports = {
   chainWebpack(config) {
       config.externals(externals)
       config.plugin('html').tap(args => {
         args[0].cdn = cdnMap
         args[0].minify.minifyCSS = true // 压缩html中的css
         return args
       })
   }
}
```
### 配置`alias`
```javascript
// 别名配置
const alias = {
    '@': resolve('src') // 主目录
}
module.exports = {
  configureWebpack: {
      resolve: {
          alias
      }
  },
}
```
### 全局注入公共`less`文件
```javascript
 // 全局注入theme.less
function addStyleResource (rule) {
    rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
        patterns: [
            path.resolve(__dirname, './src/assets/less/theme.less'),
        ],
    })
}
const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    
```

### `svg-icon`组件

-  `webpack`配置
```javascript
module.exports = { 
    chainWebpack(config) {
      config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
      config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })
      .end()
    }
}
```
- 具体参见`components/SvgIcon`代码

- 导入`icon`文件
```javascript
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

// register globally
Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

```

- 使用

```javascript
import "@/icons";
import SvgIcon from "@/components/SvgIcon"; // 引入svgIcon组件
```
```html
<h3>测试SVG Icon</h3>
<svg-icon icon-class="ali-pay" class="icon" />
```

### 开启GZIP压缩
```javascript
module.exports = { 
    chainWebpack(config) {
       config
       .plugin('compression')
       .use(CompressionWebpackPlugin)
       .tap(() => [
           {
               test: /\.js$|\.html$|\.css/, // 匹配文件名
               threshold: 10240, // 超过10k进行压缩
               deleteOriginalAssets: false // 是否删除源文件
           }
       ]) 
    }
}
```

### splitChunks拆包
```javascript
module.exports = { 
  chainWebpack(config) {
   config.optimization.splitChunks({
       chunks: 'all',
       cacheGroups: {
           libs: {
               name: 'chunk-libs',
               test: /[\\/]node_modules[\\/]/,
               priority: 10,
               chunks: 'initial' // only package third parties that are initially dependent
           },
           vantUI: {
               name: 'chunk-vantUI', // split vantUI into a single package
               priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
               test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
           },
           commons: {
               name: 'chunk-commons',
               test: resolve('src/components'), // can customize your rules
               minChunks: 3, //  minimum common number
               priority: 5,
               reuseExistingChunk: true
           }
       }
   }) 
  }
}
```
### `request.js`请求工具封装
- 具体参见`src/util/request.js`

### 基本`layout`封装

基于layout可自定义全局弹窗、全局消息等功能

### 按需引用`vant`
- babel.config.js文件
```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
```
- component_use.js文件
1. 引入
```javascript
// 全局vant的组件在这里添加
import Vue from 'vue'
// eslint-disable-next-line prettier/prettier
import { Toast, Dialog, Notify, ImagePreview } from "vant";

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify
Vue.prototype.$imagePreview = ImagePreview
```

2. 使用
```javascript
this.$toast('测试')
```
