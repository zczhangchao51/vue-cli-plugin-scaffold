// 提示模块，包含弹窗，loadding
import Vue from 'vue'
import ToastComponent from '@/components/Toast'
import XLoadingComponent from '@/components/XLoading'

// 自定义消息提示
const Toast = Vue.extend(ToastComponent)
const $toast = new Toast({
  el: document.createElement('div')
})
document.body.appendChild($toast.$el)

function Message(opt) {
  if (typeof opt === 'string') {
    return $toast.show({
      msg: opt
    })
  }
  return $toast.show(opt)
}

;['success', 'error', 'warning'].forEach(v => {
  Message[v] = function(msg, arg) {
    return $toast.show({
      msg,
      type: v,
      ...arg
    })
  }
})

Message.hide = () => {
  return $toast.hide()
}

// 自定义加载框
Vue.prototype.$message = Message

const XLoading = Vue.extend(XLoadingComponent)
const $loading = new XLoading({
  el: document.createElement('div')
})
document.body.appendChild($loading.$el)

function Loading(opt) {
  if (typeof opt === 'string') {
    return $loading.open({
      msg: opt
    })
  }
  return $loading.open(opt)
}

Loading.close = () => {
  return $loading.close()
}

Vue.prototype.$loading = Loading
