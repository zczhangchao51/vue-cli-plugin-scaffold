const path = require('path')
const loadEnv = require('@kitten-team/env-inject').loadEnv
const envConfig = loadEnv({
  mode: process.env.npm_config_env,
  dir: path.resolve(__dirname, './env'),
  extname: 'yaml'
})
const {
  PORT,
  HOST,
  QN_AKEY,
  QN_SKEY,
  QNCDN,
  CHROME_PATH
} = process.env
const isProd = process.env.NODE_ENV === 'production'
const hasQiniuKey = QN_AKEY && QN_SKEY
const useCDN = isProd && hasQiniuKey && QNCDN

module.exports = {
  devServer: {
    port: PORT,
    host: HOST
  },
  chainWebpack(config) {
    // 处理环境变量混合
    config.plugin('html').tap(options => {
      options[0] = options[0] || {}
      options[0].configScript = isProd
        ? ''
        : `<script>window.CONFIG = ${JSON.stringify(envConfig)}</script>`
      return options
    })
  },
  css: {
    extract: false
  },
  pwa: {
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true
    }
  },
  pluginOptions: {
    'scaffold': {
      // 自动gzip静态资源，上七牛的情况下不需要这个
      // https://github.com/webpack-contrib/compression-webpack-plugin
      compress: useCDN
        ? false
        : {
            test: /\.(js|css|jpg|png)$/,
            threshold: 10240
          },
      // 用于引入svg图标到.vue文件
      // https://github.com/nguyenvanduocit/vue-cli-plugin-style-resources-loader
      svg: {
        dir: resolve('src/assets/svg'),
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeUselessStrokeAndFill: true }
          ]
        }
      },
      // 用于预渲染页面
      // https://github.com/chrisvfritz/prerender-spa-plugin
      prerender(Renderer) {
        return {
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: resolve('./dist'),
          // Optional - The path your rendered app should be output to.
          outputDir: resolve('./dist/prerendered'),
          // Required - Routes to render.
          routes: ['/'],
          // 去除runtime生成的异步chunk
          postProcess(context) {
            context.html = context.html.replace(
              /<(script) charset="utf-8"[^>]+><\/\1>/gim,
              ''
            )
            return context
          },
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          renderer: new Renderer({
            // headless: false, //是否开启无头模式，用于测试
            executablePath: CHROME_PATH,
            renderAfterDocumentEvent: 'render-event',
            consoleHandler(route, message) {
              console.log(message)
            }
          })
        }
      },
      // 用于渲染骨架屏
      // https://github.com/lavas-project/vue-skeleton-webpack-plugin
      skeleton: {
        webpackConfig: {
          entry: {
            app: resolve('./src/skeletonEntry.js')
          }
        },
        quiet: true
      }
    },
    // 用于把css预处理器的公共模块自动引入到每个文件中
    // https://github.com/nguyenvanduocit/vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: '<%= rootOptions.cssPreprocessor %>',
      patterns: [
        <%_ if(rootOptions.cssPreprocessor === 'stylus') { _%>
        path.resolve(__dirname, 'src/assets/styles/config.styl'),
        path.resolve(__dirname, 'src/assets/styles/mixins.styl')
        <%_ } else { _%>
        path.resolve(__dirname, 'src/assets/styles/config.scss'),
        path.resolve(__dirname, 'src/assets/styles/mixins.scss')
        <%_ } _%>
      ]
    }
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}
