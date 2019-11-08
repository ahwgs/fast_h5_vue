<template>
  <div class="home">
    <van-button @click="add" :loading="loading" type="default">{{
      $store.state.user.count
    }}</van-button>
    <van-button :loading="loading" type="primary">主要按钮</van-button>
    <van-button :loading="loading" type="info">信息按钮</van-button>
    <van-button :loading="loading" type="warning">警告按钮</van-button>
    <van-button :loading="loading" type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  components: {},
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
    }
  }
};
</script>

<style>
.icon {
  font-size: 20px;
}
</style>
