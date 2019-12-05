<template>
    <div class="main">
        <h2>login page</h2>
        <div class="class1">
            渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变渐变
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {}
    }
}
</script>

<style scoped lang="less">
.main {
    height: 100vh;
    width: 100vw;
    h2 {
        color: @primary-color;
        font-size: @font-size-lg;
    }
}
.class1 {
    .center(100px, 100px);
    .linear-gradient();
    .ellipsis();
}
</style>
