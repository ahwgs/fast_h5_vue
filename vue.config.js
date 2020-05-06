const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const SentryPlugin = require('@sentry/webpack-plugin')
const version = require('./package.json').version

const {
  NODE_ENV,
  port,
  npm_config_port,
  VUE_APP_BASE_API,
  ANALYZE
} = process.env
const IS_DEV = NODE_ENV === 'development'
const startPort = port || npm_config_port || 8080
const defaultSetting = require('./src/setting')
const { cdnUrl, title, outputDir, enableSentry } = defaultSetting

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/assets/less/theme.less'),
        resolve('./src/assets/less/mixin.less')
      ]
    })
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

// 那些资源加载cdn
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}

// 别名配置
const alias = {
  '@': resolve('src') // 主目录
}

// 本地服务
const devServer = {
  port: startPort,
  open: true,
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    [VUE_APP_BASE_API]: {
      target: `http://127.0.0.1:${startPort}/mock`,
      changeOrigin: true,
      pathRewrite: {
        ['^' + VUE_APP_BASE_API]: ''
      }
    }
  },
  after: require('./mock/mock-server.js')
}

// 公共配置
const commonPlugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(version)
  })
]

const commonWebPackConfig = {
  name: title,
  plugins: [...commonPlugins],
  resolve: {
    alias
  }
}

module.exports = {
  // 打包后静态资源地址
  publicPath: IS_DEV ? '/' : cdnUrl,

  // 打包的文件夹名
  outputDir,

  assetsDir: 'static',
  productionSourceMap: !IS_DEV && enableSentry, // 开启sourceMap 注意发布完成之后要删除掉
  devServer,

  configureWebpack: () => {
    if (!IS_DEV && enableSentry) {
      commonWebPackConfig.plugins.push(
        new SentryPlugin({
          release: version, // 发布的版本
          include: path.join(__dirname, `./${outputDir}/js`), // 需要上传到sentry服务器的资源目录,会自动匹配 js 以及 map 文件
          urlPrefix: `~/${outputDir}/js`, // 线上对应的 url 资源的相对路径
          ignore: ['node_modules'] // 忽略文件目录, 当然我们在 inlcude 中制定了文件路径,这个忽略目录可以不加
        })
      )
    }

    return {
      ...commonWebPackConfig
    }
  },

  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 全局注入theme.less
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )

    // set svg-sprite-loader
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

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_DEV, config => config.devtool('cheap-source-map'))

    config.plugin('html').tap(args => {
      args[0].title = title // 应用的名字
      return args
    })
    if (!IS_DEV) {
      if (ANALYZE === 'true') {
        config.plugin('analyzer').use(BundleAnalyzerPlugin)
      }
      config.plugin('html').tap(args => {
        args[0].cdn = cdnMap
        args[0].minify.minifyCSS = true // 压缩html中的css
        return args
      })
      config.externals(externals)
      // 开启gzip 但是Nginx上也要做配置
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
      config.optimization.minimizer = [
        new UglifyjsWebpackPlugin({
          // 生产环境推荐关闭 sourcemap 防止源码泄漏
          // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
          sourceMap: IS_DEV,
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        })
      ]
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use(ScriptExtHtmlWebpackPlugin, [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

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
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !IS_DEV,
    modules: false,
    sourceMap: IS_DEV
  }
}
