import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index' /* webpackChunkName: "index" */)
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login' /* webpackChunkName: "login" */),
      meta: {
        layout: 'Noop'
      }
    },
    {
      path: '/other',
      name: 'other',
      component: () => import('@/views/Other' /* webpackChunkName: "other" */),
      meta: {
        needLogin: true
      }
    },
    {
      path: '*',
      component: () => import('@/Error' /* webpackChunkName: "error" */),
      meta: {
        layout: 'Noop'
      }
    }
  ]
})

// 登录态拦截示例
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (!store.state.token) {
      return next({ name: 'login' })
    }
  }
  next()
})

export default router
