<script setup>
import {ref} from 'vue'
import SearchList from '@/components/home/SearchList.vue'

const value = ref('');

let isShow = false
</script>

<template>
    <div>
        <van-nav-bar
          title="书城"
          v-if="!isShow"
        />
    </div>
    <div>
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @click="isShow = true"
            @cancel="isShow = false"
          />
        </form>
    </div>
    <SearchList v-if="isShow" />

</template>

<style scoped>
</style>