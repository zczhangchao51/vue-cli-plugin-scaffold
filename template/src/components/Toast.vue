<template>
  <transition name="bounce" enter-active-class="bounceIn" leave-active-class="bounceOut">
    <div class="box" :class="toastClass" v-show="open">
      <div class="content">
        <components class="icon" :is="tipsIcon"/>
        <span class="text">{{msg}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import SuccessIcon from '@/assets/svg/icon_success.svg'
import WarningIcon from '@/assets/svg/icon_warning.svg'
import ErrorIcon from '@/assets/svg/icon_error.svg'
export default {
  name: 'Toast',
  data() {
    return {
      open: false,
      time: false,
      type: 'none',
      msg: '默认内容'
    }
  },
  computed: {
    toastClass() {
      switch (this.type) {
        case 'warning':
          return 'warning'
        case 'success':
          return 'success'
        case 'error':
          return 'error'
        default:
          return 'none'
      }
    },
    tipsIcon() {
      switch (this.type) {
        case 'warning':
          return WarningIcon
        case 'success':
          return SuccessIcon
        case 'error':
          return ErrorIcon
        default: 
          return WarningIcon
      }
    }
  },
  watch: {
    open(val) {
      if (this.time) {
        if (val) {
          if (this.t) clearTimeout(this.t)
          this.t = setTimeout(() => {
            this.open = false
          }, this.time)
        } else {
          if (this.t) clearTimeout(this.t)
        }
      }
    }
  },
  methods: {
    show(opt) {
      if (this.open) {
        this.open = false
        this.$nextTick(() => {
          this._show(opt)
        })
      } else {
        this._show(opt)
      }
    },
    _show({ msg, link = '', time = 2500, type = 'none' }) {
      this.open = true
      this.msg = msg
      this.time = time
      this.type = type
    },
    hide() {
      this.open = false
    }
  },
  destroyed() {
    if (this.t) clearTimeout(this.t)
  }
}
</script>
<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
.box
  animation-duration 0.55s
  animation-fill-mode both
  position fixed
  display flex
  width 100%
  height 100%
  left 0
  top 0
  align-items center
  justify-content center
  color white
  font-size 16px
.icon
  stroke white
  width 50px
  height 50px
  // background-color white
  margin-bottom 10px
.content
  display flex
  align-items center
  flex-direction column
  padding 20px
  border-radius 4px
  background-color rgba(0, 0, 0, 0.7)
  box-shadow 0 2px 10px rgba(0, 0, 0, 0.3)
  .text
    max-width 130px
    text-ellipsis(3)
.none
  .content
    padding 10px 15px
  .icon
    display none
@keyframes bounceIn
  0%, 20%, 40%, 60%, 80%, to
    animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
  0%
    opacity 0
    transform scale3d(0.3, 0.3, 0.3)
  20%
    transform scale3d(1.1, 1.1, 1.1)
  40%
    transform scale3d(0.9, 0.9, 0.9)
  60%
    opacity 1
    transform scale3d(1.03, 1.03, 1.03)
  80%
    transform scale3d(0.97, 0.97, 0.97)
  to
    opacity 1
    transform scaleX(1)
.bounceIn
  animation-name bounceIn
@keyframes bounceOut
  20%
    transform scale3d(0.9, 0.9, 0.9)
  50%, 55%
    opacity 1
    transform scale3d(1.1, 1.1, 1.1)
  to
    opacity 0
    transform scale3d(0.3, 0.3, 0.3)
.bounceOut
  animation-name bounceOut
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.box {
  animation-duration: 0.55s;
  animation-fill-mode: both;
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}
.icon {
  stroke: #fff;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  .text {
    max-width: 130px;
  }
}
.none {
  .content {
    padding: 10px 15px;
  }
  .icon {
    display: none;
  }
}
@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}
.bounceIn {
  animation-name: bounceIn;
}
@keyframes bounceOut {
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  50%,
  55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
.bounceOut {
  animation-name: bounceOut;
}
</style>
<%_ } _%>