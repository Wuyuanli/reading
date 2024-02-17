<script setup>
//import {ref} from 'vue'
import SearchBar from '@/components/home/SearchBar.vue'
import GuessYouLike from '@/components/home/GuessYouLike.vue'
import Recommend from '@/components/home/BookRecommend.vue'
import Featured from '@/components/home/FeaturedBook.vue'
import { home } from "@/api/";
import { onMounted,ref } from 'vue';


  let random= null, // 随机推荐
  guessYouLike= null, // 猜你喜欢
  featured= null, // 精选
  recommends= null // 推荐
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
  guessYouLike = data.guessYouLike; // 猜你喜欢
  featured = data.featured;          // 精选
  recommends = data.recommend;      // 推荐
  
  flag.value = true
});
})
</script>

<template>
    <SearchBar />
    <img
      width="100%"
      src="https://img95.699pic.com/photo/40214/9599.jpg_wh300.jpg"
    />
    <GuessYouLike :data="guessYouLike" v-if="flag"/>
    <Recommend :data="recommends" v-if="flag"/>
    <Featured :data="featured" v-if="flag" />

</template>

<style scoped>
</style>