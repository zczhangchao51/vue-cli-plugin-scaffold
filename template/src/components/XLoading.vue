<template>
  <modal
    class="x-loading"
    speed="fast"
    no-mask
    no-header
    no-footer
    enter-active-class="bounceIn"
    leave-active-class="bounceOut"
    :show.sync="show"
  >
    <breeding-rhombus-spinner :animation-duration="800" :size="55" color="#fff"/>
  </modal>
</template>
<script>
import Modal from '@/components/Modal'
import { BreedingRhombusSpinner } from 'epic-spinners'
export default {
  name: 'XLoading',
  data() {
    return {
      show: false
    }
  },
  methods: {
    open(opt) {
      this.show = true
    },
    close() {
      this.show = false
    }
  },
  components: {
    Modal,
    BreedingRhombusSpinner
  }
}
</script>
<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
.x-loading
  z-index 1200
  >>> .content
    display flex
    justify-content center
    align-items center
    background-color rgba(0, 0, 0, 0.6)
    box-shadow none
    border 0
    height 100px
    border-radius 6px
  >>> .dialog
    background-color transparent
    width 100px
    margin-top -75px
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.x-loading {
  z-index: 1200;
  /deep/ {
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.6);
      box-shadow: none;
      border: 0;
      height: 100px;
      border-radius: 6px;
    }
    .dialog {
      background-color: transparent;
      width: 100px;
      margin-top: -75px;
    }
  }
}
</style>
<%_ } _%>