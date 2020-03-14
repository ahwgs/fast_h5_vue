<template>
  <div class="home">
    <h3>测试按钮</h3>
    <van-button :loading="loading" type="default" @click="add">{{
      $store.state.user.count
    }}</van-button>
    <van-button type="primary" @click="showToast">Toast</van-button>
    <van-button type="info" @click="showDialog">Dialog</van-button>
    <van-button type="warning" @click="showNotify">Notify</van-button>
    <van-button
      type="danger"
      @click="showImagePreview"
    >图片预览</van-button>
    <h3>测试SVG Icon</h3>
    <svg-icon icon-class="ali-pay" class="icon" />
    <svg-icon icon-class="user" class="icon" />
    <svg-icon icon-class="404" class="icon" />
    <h3>路由测试</h3>
    <router-link class="link" to="/about">about</router-link>
    <router-link class="link" to="/">home</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Button } from 'vant'

export default {
  name: 'Home',
  components: {
    [Button.name]: Button
  },
  computed: {
    ...mapState({
      loading: state => state['@@LOADING'].effects['user/addAction']
    })
  },
  methods: {
    add() {
      this.$store.dispatch({
        type: 'user/addAction'
      })
    },
    showToast() {
      this.$toast('测试')
    },
    showDialog() {
      this.$dialog.alert({
        message: '弹窗内容'
      })
    },
    showNotify() {
      this.$notify('提示文案')
    },
    showImagePreview() {
      this.$imagePreview([
        'http://i0.hdslb.com/bfs/article/09f1a68f7d0c89af78cc75252cd29f96c1b52618.jpg',
        'http://i0.hdslb.com/bfs/article/09f1a68f7d0c89af78cc75252cd29f96c1b52618.jpg'
      ])
    }
  }
}
</script>

<style>
.icon {
    font-size: 30px;
}
h3 {
    margin: 20px 0;
}
.link {
    font-size: 20px;
}
</style>
