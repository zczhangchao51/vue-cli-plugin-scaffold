// 公共函数
import Vue from 'vue'
export const debounce = (fn, ms = 0) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export const throttle = (fn, wait) => {
  let updateTime = Date.now()
  return (...args) => {
    const now = Date.now()
    if (now - updateTime > wait) {
      fn.apply(this, args)
      updateTime = now
    }
  }
}

export const isEmpty = function(obj) {
  for (const key in obj) {
    return true
  }
  return false
}

export const getScrollTop = function(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}

export const getVisibleHeight = function(element) {
  if (element === window) {
    return document.documentElement.clientHeight
  }

  return element.clientHeight
}

export const getScrollEventTarget = function(element) {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

export const getElementTop = function(element) {
  if (element === window) {
    return getScrollTop(window)
  }
  return element.getBoundingClientRect().top + getScrollTop(window)
}

export const getComputedStyle = Vue.prototype.$isServer
  ? {}
  : document.defaultView.getComputedStyle
