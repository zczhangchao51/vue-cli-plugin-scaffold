module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template')

  // 安装包
  api.extendPackage({
    devDependencies: {
      'compression-webpack-plugin': '^2.0.0',
      'extract-text-webpack-plugin': '^3.0.2',
      'babel-plugin-component': '^1.1.1',
      'vue-skeleton-webpack-plugin': '^1.1.18',
      'inline-manifest-webpack-plugin': '^4.0.2',
      'prerender-spa-plugin': '^3.4.0',
      'postcss-px-to-viewport': '0.0.3',
      'postcss-write-svg': '^3.0.1',
      'webpack-log': '^2.0.0',
      'cross-spawn': '^6.0.5',
      'vue-svg-loader': '^0.9.0'
    },
    dependencies: {
      axios: '^0.18.0',
      koa: '^2.5.2',
      vuelidate: '^0.7.4',
      '@kitten-team/env-inject': '^1.1.0',
      'epic-spinners': '^1.0.2',
      'koa-static': '^5.0.0',
      'vuex-router-sync': '^5.0.0'
    }
  })

  //剔除原始默认文件
  let deleteFiles = [
    'public/favicon.ico',
    'src/components/HelloWorld.vue',
    'src/views/Home.vue',
    'src/views/About.vue',
    'src/router.js',
    'src/assets/logo.png',
    'src/store.js'
  ]
  //删除非对应css预处理器
  if (rootOptions.cssPreprocessor === 'stylus') {
    deleteFiles = deleteFiles.concat([
      'src/assets/styles/config.scss',
      'src/assets/styles/helper.scss',
      'src/assets/styles/index.scss',
      'src/assets/styles/mixins.scss'
    ])
  } else {
    deleteFiles = deleteFiles.concat([
      'src/assets/styles/config.styl',
      'src/assets/styles/helper.styl',
      'src/assets/styles/index.styl',
      'src/assets/styles/mixins.styl'
    ])
  }
  api.postProcessFiles(files => {
    for (const file in files) {
      if (deleteFiles.includes(file)) {
        delete files[file]
      }
    }
  })
}
