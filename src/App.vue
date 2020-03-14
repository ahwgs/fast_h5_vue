<template>
  <div id="app">
    <router-view class="router" />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.handleFocusOut()
    this.handleResize()
  },
  methods: {
    handleFocusOut() {
      document.addEventListener('focusout', () => {
        document.body.scrollTop = 0
      })
    },
    handleResize() {
      const clientHeight = document.documentElement.clientHeight
      const resizeHandler = () => {
        const tagName = document.activeElement.tagName
        if (tagName) {
          const inputBox =
                        tagName === 'INPUT' || tagName === 'TEXTAREA'
          if (inputBox) {
            setTimeout(() => {
              document.activeElement.scrollIntoView()
            }, 0)
          }
        }
        const bodyHeight = document.documentElement.clientHeight
        const ele = document.getElementById('fixed-bottom')
        if (ele) {
          if (clientHeight > bodyHeight) ele.style.display = 'none'
          else ele.style.display = 'block'
        }
      }
      window.addEventListener('resize', resizeHandler)
    }
  }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
}
.router {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
