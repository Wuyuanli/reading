<script setup>
import SearchItem from '@/components/home/SearchItem.vue'

const searchList = {
    hotSearch: [
        {
          type: 1,
          text: 'Self-Reported Population Health',
          num: '1.8万'
        },
        {
          type: 1,
          text: 'Library and Information Sciences',
          num: '1.1万'
        },
        {
          type: 1,
          text: 'Global Business Strategy',
          num: '1.3万'
        },
        {
          type: 1,
          text: 'Corporate Data Quality',
          num: '1.0万'
        },
        {
          type: 1,
          text: 'Verrechnungspreise',
          num: '3.9万'
        }
    ],
    historySearch: [
        {
          type: 2,
          text: 'Computer Science'
        },
        {
          type: 1,
          text: 'Building the Infrastructure for Cloud Security'
        },
        {
          type: 2,
          text: 'ePub'
        },
        {
          type: 2,
          text: 'api'
        },
        {
          type: 2,
          text: 'Vue.js'
        },
        {
          type: 2,
          text: 'Nginx'
        },
        {
          type: 2,
          text: 'Java'
        },
        {
          type: 2,
          text: 'hdfs'
        },
        {
          type: 2,
          text: 'vuejs'
        },
        {
          type: 2,
          text: 'es6'
        },
        {
          type: 2,
          text: 'Intel'
        },
        {
          type: 1,
          text: 'Pro Git'
        },
        {
          type: 2,
          text: 'imooc'
        },
        {
          type: 2,
          text: 'Education'
        },
        {
          type: 2,
          text: 'Springer'
        },
        {
          type: 2,
          text: 'Environment'
        }
    ]
}
</script>

<template>
    <div class="wrapper">
        <SearchItem :list="searchList.hotSearch" label="热门搜索" />
        <SearchItem :list="searchList.historySearch" label="搜索历史" />
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.wrapper{
  position: absolute;
  background-color: $color-white;
  height: 150%;
  width: 100%;
  z-index: 100;
}
</style>