<script setup>
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

</script>

<template>
    <div class="title">
      <div class="label">热门推荐</div>
    </div>
    <div class="recommend-wrapper">
        <div class="book-wrapper" v-for="(item, index) in props.data" :key="index" @click="showBookDetail(item.fileName,item.categoryText)">
            <img :src="item.cover" class="cover">
            <div class="info">
                <div class="fileName">{{ fname(item.fileName) }}</div>
                <div class="readers">{{ item.readers }}人同时在读</div>
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

.recommend-wrapper{
    display: flex;
    justify-content: center;
    padding-top: .8rem;
    .book-wrapper{
        /* padding: 0.3rem 0.2rem 0.5rem 0.8rem; */
        text-align: center;
        .cover{
            width: 6rem;
            height: 8rem;
        }
        .info{
            width: 80%;
            margin: 0 auto;
            .readers{
                font-size: 0.5rem;
            }
        }
    }
}
</style>