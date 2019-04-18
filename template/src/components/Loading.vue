
<script>
export default {
  name: 'Loading',
  functional: true,
  render(h, { props: { boxSize = 70, roundSize = 16, color = '#999' } }) {
    const vwBoxSize = boxSize / 375 * 100 + 'vw'
    const vwRoundSize = roundSize / 375 * 100 + 'vw'
    return <div class="spinner" style={{ width: vwBoxSize, height: vwBoxSize }}>
      {
        Array.from(Array(3)).map((v, i) => {
          return <div key={i} class={{ 'spinner-container': true, [`container${i + 1}`]: true }}>
            {
              Array.from(Array(4)).map((vv, ii) => {
                return <div key={ii} style={{ backgroundColor: color, width: vwRoundSize, height: vwRoundSize }} class={{ [`circle${ii + 1}`]: true }}></div>
              })
            }
          </div>
        })
      }
    </div>
  }
}
</script>


<%_ if (rootOptions.cssPreprocessor === 'stylus') { _%>
<style lang="stylus" scoped>

.spinner
  position relative
  .container1 > div, .container2 > div, .container3 > div
    width 16px
    height 16px
    background-color #f5ac33
    border-radius 100%
    position absolute
    animation bouncedelay 1.2s infinite ease-in-out
    animation-fill-mode both
  .spinner-container
    position absolute
    width 100%
    height 100%
  .container2
    transform rotateZ(45deg)
  .container3
    transform rotateZ(90deg)
  .circle1
    top 0
    left 0
  .circle2
    top 0
    right 0
  .circle3
    right 0
    bottom 0
  .circle4
    left 0
    bottom 0
  .container2 .circle1
    animation-delay -1.1s
  .container3 .circle1
    animation-delay -1s
  .container1 .circle2
    animation-delay -0.9s
  .container2 .circle2
    animation-delay -0.8s
  .container3 .circle2
    animation-delay -0.7s
  .container1 .circle3
    animation-delay -0.6s
  .container2 .circle3
    animation-delay -0.5s
  .container3 .circle3
    animation-delay -0.4s
  .container1 .circle4
    animation-delay -0.3s
  .container2 .circle4
    animation-delay -0.2s
  .container3 .circle4
    animation-delay -0.1s
@keyframes bouncedelay
  0%, 80%, 100%
    transform scale(0)
  40%
    transform scale(1)
</style>
<%_ } else { _%>
<style lang="scss" scoped>
.spinner {
  position: relative;
  .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .container2 {
    transform: rotateZ(45deg);
    .circle1 {
      animation-delay: -1.1s;
    }
    .circle2 {
      animation-delay: -0.8s;
    }
    .circle3 {
      animation-delay: -0.5s;
    }
    .circle4 {
      animation-delay: -0.2s;
    }
  }
  .container3 {
    transform: rotateZ(90deg);
    .circle1 {
      animation-delay: -1s;
    }
    .circle2 {
      animation-delay: -0.7s;
    }
    .circle3 {
      animation-delay: -0.4s;
    }
    .circle4 {
      animation-delay: -0.1s;
    }
  }
  .circle1 {
    top: 0;
    left: 0;
  }
  .circle2 {
    top: 0;
    right: 0;
  }
  .circle3 {
    right: 0;
    bottom: 0;
  }
  .circle4 {
    left: 0;
    bottom: 0;
  }
  .container1 {
    .circle2 {
      animation-delay: -0.9s;
    }
    .circle3 {
      animation-delay: -0.6s;
    }
    .circle4 {
      animation-delay: -0.3s;
    }
  }
}
.spinner .container1 > div,
.spinner .container2 > div,
.spinner .container3 > div {
  width: 16px;
  height: 16px;
  background-color: #f5ac33;
  border-radius: 100%;
  position: absolute;
  animation: bouncedelay 1.2s infinite ease-in-out;
  animation-fill-mode: both;
}
@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
<%_ } _%>