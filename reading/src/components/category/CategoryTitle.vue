<script setup>
import {useRouter} from 'vue-router'
import {categoryToEnglish, categoryToChinese} from '@/utils/bookUtil'
const router = useRouter()

const props = defineProps({
    label: String,
    btn: String,
    category: Number
})

function jump(){
    router.push({
      path:'/list',
    query:{
      categoryText: categoryToEnglish(props.category),
      categoryTitle: categoryToChinese(props.category),
}
    })
}
</script>

<template>
    <div class="title-wrapper">
        <div class="label">{{ props.label }}</div>
        <div class="btn" @click="jump">{{ props.btn }}</div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.title-wrapper{
  position: relative;
  height: 1rem;
  padding: 1.6rem .6rem .8rem .6rem;
  background-color: $color-white;

  .label{
    position: absolute;
    color: gray;
    font-weight: bold;
    font-size: 1.3rem;
    left: 0.5rem;
  }
  .btn{
    position: absolute;
    right: 0.7rem;
    color: lightskyblue;
    font-size: 1rem;
  }
}
</style>