// 专供客户端ajax请求使用
import axios from 'axios'
import app from '@/main'
import store from '@/store'
import router from '@/router'
import errorTips from '@/assets/json/error_tips'

axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 204 // default
}

/**
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数对象
 * @param {object} option 非axios的配置参数
 * @param {boolean} option.ignoreMsg 是否忽略错误弹窗，改为自行捕获
 * @param {boolean} option.ignoreToken 是否忽略token传递
 * @param {boolean} option.loading 是否在请求时使用loading
 * @param {object} config 提供给axios的配置参数 https://github.com/axios/axios
 */
const ajax = type => async (
  url,
  data = {},
  { ignoreMsg = false, ignoreToken = false, loading = true } = {},
  ext = { timeout: 10000 }
) => {
  const config = {}
  const token = store.state.token || localStorage.getItem('token')
  if (token && !ignoreToken) {
    config.headers = {
      Authorization: 'Bearer ' + token,
      Authorization_Type: 3
    }
  }
  Object.assign(config, ext)
  config.url = /^http/.test(url) ? url : CONFIG.api_edu + url
  config.method = type
  if (['put', 'post', 'patch'].includes(type)) {
    config.data = data
  }
  if (type === 'get') {
    config.params = Object.assign({}, data)
    config.params.TIME = +new Date()
  }

  try {
    loadingSwitch(loading)
    const res = await axios(config)
    loadingSwitch(false)
    return res.data
  } catch (error) {
    loadingSwitch(false)
    const response = error.response
    let errorCode
    let errorMessage
    if (response) {
      const data = response.data
      errorCode = data.error_code || data.status
      errorMessage =
        data.error_message ||
        data.message ||
        errorTips[errorCode] ||
        `未定义错误号 ${errorCode} 的错误提示`
      if (errorCode === 100010) {
        store.commit('LOGOUT')
        router.push({ name: 'login' })
      }
    } else {
      errorMessage = error.message
      errorCode = error.status || 0
    }
    if (!ignoreMsg) app.$message(errorMessage)
    return Promise.reject({ error_code: errorCode })
  }
}

function loadingSwitch(loading) {
  if (app) {
    if (loading) {
      app.$loading(loading)
    } else {
      app.$loading.close()
    }
  }
}

export const get = ajax('get')
export const post = ajax('post')
export const put = ajax('put')
export const patch = ajax('patch')
export const del = ajax('delete')
