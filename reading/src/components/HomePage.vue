<script setup>
import { RouterView } from 'vue-router'
// import { onMounted } from 'vue';

</script>

<template>
    <div class="container">
        <RouterView/>
    </div>
    <van-tabbar v-model="active" route z-index="200">
        <van-tabbar-item replace to="/store" icon="home-o">书城</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item replace to="/shelf" icon="star-o">书架</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>
.container{
    padding-bottom: 3.5rem;
}
</style>