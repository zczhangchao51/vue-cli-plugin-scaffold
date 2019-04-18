<template>
  <transition enter-active-class="noop" leave-active-class="noop">
    <div v-show="show" class="box" :class="[`speed-${speed}`]">
      <transition :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
        <div class="dialog" :style="dialogStyle" v-show="show">
          <div class="content">
            <slot>默认内容</slot>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="!noMask" v-show="show" class="mask"></div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    bodyClass: {
      type: String,
      default: 'modal-open'
    },
    title: {
      type: String,
      default: '默认标题'
    },
    enterActiveClass: {
      type: String,
      default: 'bounceIn'
    },
    leaveActiveClass: {
      type: String,
      default: 'bounceOut'
    },
    dialogStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    speed: {
      type: String,
      default: 'normal'
    },
    noMask: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show(val) {
      const { bodyClass } = this
      if (val) {
        this.bodyAddClass(bodyClass)
      } else {
        this.bodyRemoveClass(bodyClass)
      }
    }
  },
  methods: {
    open() {
      this.$emit('update:show', true)
    },
    close() {
      this.$emit('update:show', false)
    },
    confirm() {
      this.$emit('confirm')
    },
    bodyHasClass(className) {
      return !!document.body.className.match(
        new RegExp(`(\\s|^)${className}(\\s|$)`)
      )
    },
    bodyAddClass(className) {
      if (!this.bodyHasClass(className)) {
        document.body.className += ' ' + className
      }
    },
    bodyRemoveClass(className) {
      if (this.bodyHasClass(className)) {
        document.body.className = document.body.className.replace(
          new RegExp(`(\\s|^)${className}(\\s|$)`),
          ''
        )
      }
    }
  }
}
</script>


<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
/* box */
.box
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index 98
  display flex
  justify-content center
  align-items center
  transition all 0.2 ease-in-out
  background-color rgba(0, 0, 0, 0)
/* mask */
.mask
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 1
  background-color #000
  opacity 0.5
/* dialog */
.speed-normal
  animation-duration 0.65s
.speed-fast
  animation-duration 0.25s
.speed-slow
  animation-duration 1s
.dialog
  animation-fill-mode both
  width 300px
  z-index 2
  position relative
  background-color #fff
  background-clip padding-box
  border 1px solid rgba(0, 0, 0, 0.2)
  border-radius 6px
  outline 0
  box-shadow 0 3px 9px rgba(0, 0, 0, 0.3)
  .speed-normal &
    animation-duration 0.65s
  .speed-fast &
    animation-duration 0.25s
  .speed-slow &
    animation-duration 1s
/* content */
.content
  position relative
  padding 15px
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
@keyframes noop
  from , to
.noop
  animation-name noop
</style>
<%_ } else { _%>
<style lang="scss" scoped>
/* box */
.box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2 ease-in-out;
  background-color: rgba(0, 0, 0, 0);
}
/* mask */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: #000;
  opacity: 0.5;
}
/* dialog */
.speed-normal {
  animation-duration: 0.65s;
  .dialog {
    animation-duration: 0.65s;
  }
}
.speed-fast {
  animation-duration: 0.25s;
  .dialog {
    animation-duration: 0.25s;
  }
}
.speed-slow {
  animation-duration: 1s;
  .dialog {
    animation-duration: 1s;
  }
}
.dialog {
  animation-fill-mode: both;
  width: 300px;
  z-index: 2;
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
}
/* content */
.content {
  position: relative;
  padding: 15px;
}
.bounceIn {
  animation-name: bounceIn;
}
.bounceOut {
  animation-name: bounceOut;
}
.bounceIn {
  animation-name: bounceIn;
}
.noop {
  animation-name: noop;
}
@keyframes noop {
  from,
  to {
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
</style>
<%_ } _%>