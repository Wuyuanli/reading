//精选
<script setup>
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

function shrinkName(name){
    if (name.length > 15) {
      return name.slice(0, 15)+"..."
    } else {
      return name;
    }
}
</script>

<template>
    <div class="title">
      <div class="label">精选</div>
    </div>
    <div class="feature-wrapper">
        <div class="feature-items" v-for="(item,index) in props.data" :key="index">
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
.feature-wrapper{
    height: 23rem;
    padding: 1.5rem 1rem 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);
    grid-template-rows: repeat(auto-fill, 8rem);

    .feature-items{
        position: relative;
        .book-wrapper{
            position: absolute;
            top: 0;
            left: 0;
            .cover{
                width: 4.8rem;
                height: 6.5rem;
            }
        }
        .info{
            position: absolute;
            top: 0.3rem;
            left: 5rem;
            .book-title{
                position: absolute;
                top: 0;
                left: 0;
                text-align: left;
                width: 6rem;
                font-size: 1rem;
                font-weight: bold;
            }
            .author{
                position: absolute;
                top: 3rem;
                left: 0;
                height: 1rem;
                line-height: 1rem;
                color: rgba(0, 0, 0, 0.5);
                width: 6rem;
            }
            .categoryText{
                position: absolute;
                top: 5rem;
                left: 0;
                height: 1rem;
                color: rgba(0, 0, 0, 0.5);
                line-height: 1rem;
                width: 6rem;
            }
        }
    }

}
</style>