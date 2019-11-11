<template>
  <div class="home">
    <van-button @click="add" :loading="loading" type="default"
      >{{ $store.state.user.count }}
    </van-button>
    <van-button @click="showToast" type="primary">Toast</van-button>
    <van-button @click="showDialog" type="info">Dialog</van-button>
    <van-button @click="showNotify" type="warning">Notify</van-button>
    <van-button @click="showImagePreview" type="danger">图片预览</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Button } from "vant";

export default {
  name: "home",
  components: {
    [Button.name]: Button
  },
  computed: {
    ...mapState({
      loading: state => state["@@LOADING"].effects["user/addAction"]
    })
  },
  methods: {
    add() {
      this.$store.dispatch({
        type: "user/addAction"
      });
    },
    showToast() {
      this.$toast("测试");
    },
    showDialog() {
      this.$dialog.alert({
        message: "弹窗内容"
      });
    },
    showNotify() {
      this.$notify("提示文案");
    },
    showImagePreview() {
      this.$imagePreview([
        "http://i0.hdslb.com/bfs/article/09f1a68f7d0c89af78cc75252cd29f96c1b52618.jpg",
        "http://i0.hdslb.com/bfs/article/09f1a68f7d0c89af78cc75252cd29f96c1b52618.jpg"
      ]);
    }
  }
};
</script>

<style>
.icon {
  font-size: 20px;
}
</style>
