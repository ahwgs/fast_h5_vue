<template>
    <div id="app">
        <router-view class="router"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
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
