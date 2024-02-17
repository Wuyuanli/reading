<script setup>
import {categoryToChinese,categoryToEnglish} from '@/utils/bookUtil'
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
    data: Object
})

function showCategoryList(category){
  router.push({
    path:'/list',
    query:{
      categoryText: categoryToEnglish(category),
      categoryTitle: categoryToChinese(category),
      category: category
    }
  })
  console.log(props.data)
}
</script>

<template>
    <h2 class="title">分类</h2>
    <div class="categories-wrapper">
      <div class="category-item" v-for="(item, index) in props.data" :key="index" @click="showCategoryList(item.category)">
        <div class="left">
          <div class="categoryNum">{{ categoryToChinese(item.category) }}</div>
          <div class="bookNums">{{ item.num }}本书</div>
        </div>
        <div class="right">
          <img :src="item.img1" class="image1" />
          <img :src="item.img2" class="image2" />
        </div>
      </div>
    </div>
</template>

<style scoped>
.title{
    padding-left: 1rem;
}
.categories-wrapper {
  padding: 0.2rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
  .category-item {
    background-color: rgb(243, 241, 241);
    width: 11.5rem;
    height: 6.6rem;
    margin: 0.3rem;
    display: grid;
    grid-template-columns: 60% 40%;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .categoryNum {
        font-weight: bold;
        font-size: 1.1rem;
      }
      .bookNums {
        padding: 0.4rem 0;
      }
    }
    .right {
      position: relative;
      margin-right: 1rem;
      .image1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        width: 3rem;
        height: 4.5rem;
      }
      .image2 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transform: translate(5%, -50%);
        width: 2rem;
        height: 3rem;
      }
    }
  }
}
</style>