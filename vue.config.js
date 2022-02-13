const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  // 基本路径  设置的是 BASE_URL 的值
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',　　/*publicPath 作用就是本地打开项目 url 后面拼接的域名*/

  // 将构建好的文件输出到哪里（或者说将编译的文件）  输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist': 'devdist',

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: '',

  // 用于多页配置，默认是 undefined
  pages: {
    index: {
      // 入口文件
      entry: 'src/main.js',　　/*这个是根入口文件*/
      // 模板文件
      template: 'public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      title: 'Index Page'
    },
    // 简写格式
    // 模板文件默认是 `public/subpage.html`
    // 如果不存在，就是 `public/index.html`.
    // 输出文件默认是 `subpage.html`.
    subpage: 'src/main.js'　　　　/*注意这个是*/
  },

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [/* string or regex */],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => {},
 // configureWebpack: (config) => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // config.resolve = {
    //   extension:['.js','.json','.vue'],  // 自动添加文件后缀名
    //   alias: {
    //     '@': path.resolve(__dirname,'./src'),
    //     'public':path.resolve(__dirname,'./public'),
    //     'components': path.resolve(__dirname,'./src/components'),
    //     'common': path.resolve(__dirname,'./src/common'),
    //     'api': path.resolve(__dirname,'./src/api'),
    //     'views': path.resolve(__dirname,'./src/views'),
    //     'data':path.resolve(__dirname,'./src/data')
    //   }
    // }
 // },

 configureWebpack: {
  // provide the app's title in webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  //name: name,
  resolve: {
    alias: {
      '@': resolve('src'),
      '@modules': resolve('src/modules'),
      '@assets': resolve('src/assets'),
      '@vendor': resolve('vendor'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      apis: resolve('src/apis')
    }
  }
},
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        prependData: `
                 @import "@/styles/main.scss";    
             `
           }  // ./src//styles/main.scss  这个路径也可以  注意 node-sass sass-loader 的版本
         // 这里的选项会传递给 css-loader   app.vue 的style 上需要添加lang="scss"
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
  //   proxy: {
  //     '/devApi': {
  //         target: "https://www.web-jshtml.cn/productapi",
  //         changeOrigin: true, // 允许websockets跨域
  //         // ws: true,
  //         pathRewrite: {
  //             '^/devApi': ''
  //         }
  //      }
  //  }, // 代理转发配置，用于调试环境,
   proxy: {
    '/devApi': {
        target: "https://www.rufeike.top",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
            '^/devApi': ''
        }
     }
   },
   before: app => {}
   },
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}