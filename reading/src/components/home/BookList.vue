<script setup>
import { list } from '@/api';
import {onBeforeMount, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { query} = useRoute();
const router = useRouter()

let titleText = query.categoryTitle

const onClickLeft = () => history.back();

let booklist = ref([])

function getList() {
  list().then(response => {
    booklist.value = response.data.data
    console.log(booklist)
    const category = query.categoryText
    const key = Object.keys(booklist.value).filter(item => item === category)
    // console.log(key)
    const data = booklist.value[key]
    console.log(data)
    booklist.value = {}
    // booklist[key] = data
    booklist.value = data
    console.log(booklist)
  })
}

onBeforeMount(()=>{
    getList()
})

function shrinkName(name){
    if (name.length > 15) {
      return name.slice(0, 15)+"..."
    } else {
      return name;
    }
}

function showBookDetail(fileName, categoryText) {
  router.push({
      path: `/detail`,
      query: {
          filename: fileName,
          category: categoryText
      }
  })
}

function show(){
    console.log(booklist)
}
</script>

<template>
    <div class="book-list-wrapper">
        <van-nav-bar
          :title="titleText"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click="show"
        />
        <div class="feature-wrapper">
            <div class="feature-items" v-for="(item,index) in booklist" :key="index">
                <div class="book-wrapper" @click="showBookDetail(item.fileName,item.categoryText)">
                    <img :src="item.cover" class="cover">
                </div>
                <div class="info">
                    <div class="book-title">{{ shrinkName(item.title) }}</div>
                    <div class="author">{{ shrinkName(item.author) }}</div>
                    <div class="categoryText">{{ shrinkName(item.categoryText) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .book-list-wrapper { */
  /* width: 100%; */
  /* height: 100%; */
  /* background: red; */
/* } */
.feature-wrapper{
    height: 100%;
    padding: 1rem 1rem 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);
    grid-template-rows: repeat(auto-fill, 8rem);

    .feature-items{
        display: flex;
        /* justify-content: space-around; */
        align-items: center;
        /* position: relative; */
        .book-wrapper{
            
            .cover{
                /* margin-left: 0.3rem; */
                margin-right: 0.3rem;
                margin-bottom: 0.3rem;
                width: 4.8rem;
                height: 6.5rem;
            }
        }
        /* .info{ */
            /* position: absolute; */
            /* top: 0.3rem; */
            /* left: 5rem; */
            .book-title{
                /* position: absolute; */
                /* top: 0; */
                /* left: 0; */
                text-align: left;
                width: 6rem;
                font-size: 1rem;
                font-weight: bold;
            }
            .author{
                /* position: absolute; */
                /* top: 3rem; */
                /* left: 0; */
                /* height: 1rem; */
                line-height: 1rem;
                color: rgba(0, 0, 0, 0.5);
                width: 6rem;
            }
            .categoryText{
                /* position: absolute; */
                /* top: 5rem; */
                /* left: 0; */
                height: 1rem;
                color: rgba(0, 0, 0, 0.5);
                line-height: 1rem;
                width: 6rem;
            }
        /* } */
    }

}
</style>