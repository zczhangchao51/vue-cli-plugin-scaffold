const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
module.exports = (api, projectOptions) => {
  const pluginOptions = projectOptions.pluginOptions['b-end-scaffold']
  const {
    compress,
    svg,
    prerender,
    skeleton,
    runtime = 'runtime'
  } = pluginOptions

  //把runtime提取出来
  api.chainWebpack(config => {
    config.optimization.runtimeChunk({
      name: runtime
    })
    // preload不生成runtimeChunk
    config.plugin('preload').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || [/\.map$/]
      options[0].fileBlacklist.push(/runtime(\.[^.]+)?\.js$/)
      return options
    })
    config
      .plugin('manifest')
      .use(InlineManifestWebpackPlugin, [runtime])
      .after('html')
  })

  // 添加压缩gzip插件，这是一个先行压缩的方案
  // https://github.com/webpack-contrib/compression-webpack-plugin
  if (process.env.NODE_ENV === 'production' && compress) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    api.chainWebpack(config => {
      config.plugin('compress').use(CompressionWebpackPlugin, [compress])
    })
  }

  // 使用vue-svg-loader的方式加载部分svg图片
  // https://github.com/visualfanatic/vue-svg-loader
  if (svg) {
    api.chainWebpack(config => {
      config.module.rule('svg').exclude.add(svg.dir)
      config.module
        .rule('vue-svg')
        .include.add(svg.dir)
        .end()
        .test(/\.(svg)(\?.*)?$/)
        .use('vue-svg-loader')
        .loader('vue-svg-loader')
        .options(svg)
    })
  }

  // 添加预渲染方案
  // https://github.com/chrisvfritz/prerender-spa-plugin
  if (process.env.NODE_ENV === 'production' && prerender) {
    const PrerenderSPAPlugin = require('prerender-spa-plugin')
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
    api.chainWebpack(config => {
      config
        .plugin('prerender')
        .use(PrerenderSPAPlugin, [
          typeof prerender === 'function' ? prerender(Renderer) : Renderer
        ])
    })
  }

  // 添加骨架屏方案
  // https://github.com/lavas-project/vue-skeleton-webpack-plugin
  if (skeleton) {
    const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
    api.chainWebpack(config => {
      config.plugin('skeleton').use(SkeletonWebpackPlugin, [skeleton])
    })
  }
}
