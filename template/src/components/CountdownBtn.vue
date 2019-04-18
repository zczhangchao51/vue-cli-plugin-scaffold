<script>
export default {
  name: 'CountDownBtn',
  render(h) {
    const { disabled, clicked, clickTips, el, handlerClick, tips, placeholder } = this
    return h(
      el,
      {
        class: {
          'count-down-btn': true,
          disabled,
          clicked
        },
        on: {
          click(e) {
            e.preventDefault()
            handlerClick()
          }
        }
      },
      clicked ? clickTips : disabled ? tips : placeholder
    )
  },
  props: {
    time: {
      type: Number,
      default: 60
    },
    placeholder: {
      type: String,
      default: '获取验证码'
    },
    clickTips: {
      type: String,
      default: '已点击'
    },
    lockTmp: {
      type: String,
      default: '倒计时%s秒'
    },
    el: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      disabled: false,
      clicked: false,
      currSec: 0
    }
  },
  computed: {
    tips() {
      return this.lockTmp.replace(/%s/g, this.currSec)
    }
  },
  methods: {
    handlerClick() {
      if (this.disabled || this.clicked) return
      this.clicked = true
      this.$emit('click', this.lock, this.reset)
    },
    lock() {
      console.log('开始倒计时')
      if (this.t) clearInterval(this.t)
      this.disabled = true
      this.clicked = false
      this.currSec = this.time
      this.t = setInterval(() => {
        this.currSec--
        if (this.currSec === 0) {
          this.reset()
        }
      }, 1000)
    },
    reset() {
      if (this.t) clearInterval(this.t)
      this.disabled = false
      this.clicked = false
      this.t = null
    }
  },
  destroyed() {
    this.reset()
  }
}
</script>

<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
.count-down-btn
  &.clicked, &.disabled
    border-color #999
    color #999
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.count-down-btn.clicked,
.count-down-btn.disabled {
  border-color: #999;
  color: #999;
}
</style>
<%_ } _%>