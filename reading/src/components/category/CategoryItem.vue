<script setup>
import CategoryTitle from '@/components/category/CategoryTitle.vue'
import {computed} from 'vue'
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

let labelCategory = computed(()=>{
    if(props.data !== null){
        switch (props.data.category) {
            case 1:
              return "计算机科学";
            case 2:
              return "社会科学";
            case 3:
              return "经济学";
            case 4:
              return "教育学";
            case 5:
              return "基础工程";
            case 6:
              return "环境学";
            case 7:
              return "地质学";
            case 8:
              return "历史学";
            case 9:
              return "法律";
            case 10:
              return "生活科学";
            case 11:
              return "文学";
            case 12:
              return "Biomedicine";
            case 13:
              return "BusinessandManagement";
            case 14:
              return "EarthSciences";
            case 15:
              return "MaterialsScience";
            case 16:
              return "Mathematics";
            case 17:
              return "MedicineAndPublicHealth";
            case 18:
              return "Philosophy";
            case 19:
              return "Physics";
            case 20:
              return "PoliticalScienceAndInternationalRelations";
            case 21:
              return "Psychology";
            case 22:
              return "Statistics";
        }
    }
    return "Wrong"
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
    <CategoryTitle :label="labelCategory" :btn="'查看全部'" :category="props.data.category" v-if="props.data" class="title" />
    <div class="book-wrapper">
      <div class="item-wrapper" v-for="(item, index) in props.data.list" :key="index">
        <div class="cover-wrapper" @click="showBookDetail(item.fileName,item.categoryText)">
          <img :src="item.cover" class="cover">
          <div class="fileName">{{ shrinkName(fname(item.fileName)) }}</div>
          <div class="author">{{ shrinkName(item.author) }}</div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.title{
  padding-top: 1rem;
}
.book-wrapper{
  margin: 1rem 0;
  @include horizonCenter;
  .item-wrapper{
    width: 24%;
    
    .cover-wrapper{
      
      .cover{
        width: 5.5rem;
        height: 7.2rem;
      }
      .fileName{
        width: 100%;
        font-weight: bold;
        text-align: left;
        margin-left: .2rem;
        width: 100%;
        font-size: 1rem;
        line-height: 1.2rem;
      }
      .author{
        margin-left: .2rem;
        text-align: left;
        font-size: 0.5rem;
        width: 80%;
      }
    }
  }
}
</style>