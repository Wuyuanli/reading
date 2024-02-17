<script setup>
import { useEBookStore } from '@/stores/ebook';
import {useRouter} from 'vue-router'

const store = useEBookStore()
const router = useRouter()

const onClickLeft = () => history.back();
const onClickRight = () =>{
    router.push({path: '/shelf'})
}
</script>

<template>
    <div class="title-wrapper" v-show="store.ifTitleAndMenuVisiable">
        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <van-icon name="star-o" size="18" />
          </template>
        </van-nav-bar>

    </div>
</template>

<style scoped>
.title-wrapper{
    width: 100%;
    height: 3rem;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.15);
    font-size: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: #fff;
}
</style>