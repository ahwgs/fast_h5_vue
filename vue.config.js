const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
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
const { cdnUrl, title, outputDir } = defaultSetting

function resolve(dir) {
    return path.join(__dirname, dir)
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

module.exports = {
    // 打包后静态资源地址
    publicPath: IS_DEV ? '/' : cdnUrl,

    // 打包的文件夹名
    outputDir,

    assetsDir: 'static',
    productionSourceMap: IS_DEV,
    devServer,

    configureWebpack: {
        name: title,
        resolve: {
            alias
        }
    },

    chainWebpack(config) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

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
            .when(IS_DEV, config => config.devtool('cheap-source-map'))

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
        sourceMap: IS_DEV,
        loaderOptions: {
            less: {}
        }
    }
}
