<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>
<script>
import Common from '@/layouts/Common'
import Noop from '@/layouts/Noop'
export default {
  computed: {
    layout() {
      switch (this.$route.meta.layout) {
        case 'Noop':
          return Noop
        default:
          return Common
      }
    }
  }
}
</script>
<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" src="@/assets/styles/index.styl"></style>
<%_ } else { _%>
<style lang="scss" src="@/assets/styles/index.scss"></style>
<%_ } _%>
