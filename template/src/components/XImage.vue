<script>
import loadingImgSrc from '@/assets/images/codemao_preview.png'
export default {
  name: 'XImage',
  render(h) {
    const { el, status, currBgImgSrc, imgSrc, size } = this
    const opt =
      el === 'img'
        ? {
          style: {
            backgroundImage: `url(${currBgImgSrc})`,
            backgroundSize: `${size}%`
          },
          attrs: {
            src: imgSrc
          },
          class: {
            'x-image': true,
            'x-image-img': true
          }
        }
        : {
          style: {
            backgroundImage: `url(${imgSrc}), url(${currBgImgSrc})`,
            backgroundSize: `cover, ${size}%`
          },
          class: {
            'x-image': true,
            'x-image-bgimg': true
          }
        }
    ;['loading', 'success', 'error'].forEach(v => {
      opt.class[`x-image-${v}`] = status === v
    })

    return h(el, opt)
  },
  data() {
    return {
      status: 'loading'
    }
  },
  computed: {
    currBgImgSrc() {
      const { status } = this
      return {
        success: loadingImgSrc,
        error: loadingImgSrc,
        loading: loadingImgSrc
      }[status]
    }
  },
  props: {
    size: {
      type: Number,
      default: 100
    },
    imgSrc: {
      type: String,
      required: true
    },
    el: {
      type: String,
      default: 'img'
    },
    start: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    start(val) {
      if (this.status !== 'success' && val) this.loadImg()
    }
  },
  mounted() {
    if (this.start) this.loadImg()
  },
  methods: {
    loadImg() {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = function() {
          resolve(image)
        }
        image.onerror = function() {
          reject(new Error('Could not load image at ' + this.imgSrc))
        }
        image.src = this.imgSrc
      })
        .then(img => {
          this.status = 'success'
        })
        .catch(msg => {
          this.status = 'error'
          console.log(msg)
        })
    }
  }
}
</script>

<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>
.x-image.x-image-loading
  background-image url('~@/assets/images/codemao_preview.png')
.x-image.x-image-error
  background-image url('~@/assets/images/codemao_preview.png')
.x-image-bgimg
  background-color #F5F5F5
  background-repeat no-repeat, no-repeat
  background-position center, center
.x-image-img
  background-color #F5F5F5
  background-position center
  background-repeat no-repeat
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.x-image {
  &.x-image-loading {
    background-image: url('~@/assets/images/codemao_preview.png');
  }
  &.x-image-error {
    background-image: url('~@/assets/images/codemao_preview.png');
  }
}
.x-image-bgimg {
  background-color: #f5f5f5;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
}
.x-image-img {
  background-color: #f5f5f5;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
<%_ } _%>