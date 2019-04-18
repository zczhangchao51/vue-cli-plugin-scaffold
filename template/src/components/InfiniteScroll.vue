<template>
  <div :style="{ height }" class="box">
    <slot></slot>
  </div>
</template>
<script>
import { throttle } from '@/utils'
export default {
  props: {
    height: {
      type: String,
      default: '100px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    distance: {
      type: Number,
      default: 10
    }
  },
  mounted() {
    const handleScroll = throttle(this.handleScroll, 80)
    this.$el.addEventListener('scroll', handleScroll, {
      capture: false,
      passive: true
    })
    this.$once('hook:beforeDestroy', () => {
      this.$el.removeEventListener('scroll', handleScroll)
    })
    this.clientHeight = this.$el.clientHeight
  },
  methods: {
    handleScroll() {
      if (this.disabled) return
      this.heartBeat()
      if (this.lastBeatTime) clearTimeout(this.lastBeatTime)
      this.lastBeatTime = setTimeout(this.heartBeat, 80)
    },
    heartBeat() {
      if (this.clientHeight + this.$el.scrollTop + this.distance >= this.$el.scrollHeight) {
        this.$emit('to-bottom')
      }
    }
  },
  beforeDestroy() {
    if (this.lastBeatTime) clearTimeout(this.lastBeatTime)
  }
}
</script>
<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
.box
  overflow-y scroll
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.box {
  overflow-y: scroll;
}
</style>
<%_ } _%>
