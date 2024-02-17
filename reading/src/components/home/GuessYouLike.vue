<script setup>
import {computed, ref} from 'vue'
import {fname} from '@/utils/bookUtil'

import { useRouter } from "vue-router";

const router = useRouter()
function showBookDetail(fileName, categoryText) {
  router.push({
      path: `/detail`,
      query: {
          filename: fileName,
          category: categoryText
      }
  })
}

const props = defineProps({
  data: Object
})


let sliceGroup = props.data
let startIndex = ref(0)
sliceGroup = computed(()=>{
  if(props.data){
    return props.data.filter((item, index)=>{
    if(index<=startIndex.value+2 && index >= startIndex.value){
    return item;
  }
})
  }
  else{
    return "Wrong!"
  }
})

function next(){
  startIndex.value = ( startIndex.value + 3 ) % 9;
}

</script>

<template>
    <div class="title">
      <div class="label">猜你喜欢</div>
      <div class="change" @click="next">换一批</div>
    </div>
    <div>
      <div v-for="(item, index) in sliceGroup" :key="index" class="book-wrapper" 
      @click="showBookDetail(item.fileName, item.categoryText)">
        <div class="cover-wrapper">
          <img class="book-cover" :src="item.cover">
        </div>
        <div class="info">
          <div class="fileName">{{ fname(item.fileName) }}</div>
          <div class="author">{{ item.author }}</div>
          <div class="publisher">{{ item.publisher }}</div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.title{
  position: relative;
  height: 1rem;
  padding: 1.6rem .6rem .8rem .6rem;

  .label{
    position: absolute;
    color: gray;
    font-weight: bold;
    font-size: 1.3rem;
    left: 0.5rem;
  }
  .change{
    position: absolute;
    right: 0.7rem;
    color: lightskyblue;
    font-size: 1rem;
  }
}
.book-wrapper{
  display: flex;
  font-size: 2rem;
  padding: .8rem 0;

  .cover-wrapper{
    padding: .3rem 0.6rem;

    .book-cover{
      width: 4.5rem;
      height: 5.5rem;
    }
  }

  .info{
    width: 70%;
    align-items: flex-start;
    text-align: left;

    .fileName{
      font-size: 1.1rem;
      font-weight: bold;
      padding: 0 0 .5rem 0;
      line-height: 1.2rem;
      word-break: break-all;
      white-space: normal;
      vertical-align: right;
    }

    .author{
      line-height: 1.2rem;
      font-size: .9rem;
      padding: .1rem 0;
      width: 75%;
    }

    .publisher{
      font-size: .9rem;
      line-height: 1.2rem;
      padding: .1rem 0;
    }
  }

}
</style>