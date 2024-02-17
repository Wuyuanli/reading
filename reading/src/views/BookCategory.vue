<script setup>
import CategoryItem from '@/components/category/CategoryItem.vue'
import CategoryList from '@/components/category/CategoryList.vue';
import { home } from "@/api/";
import { onMounted,ref } from 'vue';

let random= null, // 随机推荐
categories= null, // 图书分类
categoryList= null // 分类列表

let flag = ref(false)

onMounted(()=>{
  home().then((response) => {
  if(response.status !== 200) {
    console.log('response status error!');
    return
  }
  const data = response.data;
  random = Math.random() * data.random.length;
  random = Math.floor(random);
  random = random[random]; // 随机推荐图书shake
  categories = data.categories;      // 图书分类
  categoryList = data.categoryList;  // 分类列表
  
  flag.value = true
  console.log(data)
});
})
</script>

<template>
  <div v-if="flag">
    <CategoryList :data ="categories" />
    <div v-for="(item,index) in categoryList" :key="index">
      <CategoryItem :data="item" />
    </div>
  </div>
</template>

<style scoped>
</style>