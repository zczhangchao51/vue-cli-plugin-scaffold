import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import '@/utils/extend'
import '@/utils/message'
import '@/utils/filters'

sync(store, router)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 这里告知puppeteer页面完毕，用于预渲染
    console.log('prerender event')
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
