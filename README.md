# 项目脚手架

项目初始化前端框架，基于[vue-cli](https://cli.vuejs.org/zh/)

## 前端技术规范

## 提供的功能

- 开箱即用的移动端端开发环境

- 预渲染，骨架屏，上传 cdn 等项目优化方法

- 合理的目录结构

- 合理的 eslint 规则，校验不通过无法提交代码

- 稍作修改也能直接用于非移动端项目

## 使用指南

- 1.安装 vue-cli（已有 cli 跳过这一步）

```shell
npm install -g @vue/cli
```

- 2.准备一个预置文件，写入以下内容，放在任何方便引用的地方，也可以写在全局的~/.vuerc 的 preset 里， 参考 cli 文档 ([插件和 Preset](https://cli.vuejs.org/zh/guide/plugins-and-presets.html))

```json
{
  "useConfigFiles": true,
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "standard",
      "lintOn": ["save", "commit"]
    },
    "vue-cli-plugin-scaffold": {
      "version": "git+https://github.com/zczhangchao51/vue-cli-plugin-scaffold.git"
    },
    "vue-cli-plugin-style-resources-loader": {
      "version": "^0.1.3",
      "preProcessor": "sass"
    }
  },
  "router": true,
  "routerHistoryMode": true,
  "vuex": true,
  "cssPreprocessor": "sass"
}
```

- 3.初始化项目

```shell
vue create <project-name> --preset <刚刚创建的预置文件路径>
```

- 4.目前只提供了移动端开箱即用的版本，如果需要在别的端使用需要剔除不需要的模块组件并引入 element 等，其余内容是通用的不需要修改

## 更新日志

请看[CHANGELOG](https://github.com/zczhangchao51/vue-cli-plugin-scaffold/blob/master/CHANGELOG.md)
