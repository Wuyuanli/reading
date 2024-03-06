<script setup>
import { detail } from '@/api';
import {onBeforeMount, ref, computed} from 'vue'
import { useRoute } from 'vue-router'
import {categoryToChinese, lang} from '@/utils/bookUtil'
import { getReadTime } from "@/utils/localStorage";
import DetailFooter from '@/components/detail/DetailFooter.vue'

const { query} = useRoute();

//const router = useRouter()

let bkdetail = null
let flag = ref(false)

let readTimes = computed(()=>{
    let fileName = query.filename;
    let readTime = getReadTime(fileName);
    if (!readTime) {
      return 0;
    } else {
      return Math.ceil(readTime / 60);
    }
})

const onClickLeft = () => history.back();

function getData(){
    let fileName = query.filename
    detail(fileName).then((res) => {
      bkdetail = res.data.data;
      // console.log(bkdetail)
      flag.value = true
    });
}

function shrink(txt){
  if (txt && txt.length >= 20) {
    return txt.substring(0, 20);
  } else {
    return txt;
  }
}

onBeforeMount(()=>{
    getData()
})
</script>

<template>
    <van-nav-bar
      title="详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="store-detail" v-if="flag">
      <div class="book-info">
        <div class="book-info-left">
          <div class="book-cover">
            <img :src="bkdetail.cover" class="cover" />
          </div>
        </div>
        <div class="book-info-right">
          <div class="book-name">
            {{ bkdetail.title }}
          </div>
          <div class="book-author">
            {{ bkdetail.author }}
          </div>
          <div class="book-read">已读：{{ readTimes }} 分钟</div>
        </div>
      </div>
      <div class="line-wrapper">
        <div class="line"></div>
      </div>
      <div class="publish-info">
        <div class="row">
          <div class="label">出版社</div>
          <div class="publisher">{{ shrink(bkdetail.publisher) }}</div>
        </div>
        <div class="row">
          <div class="label">语言</div>
          <div class="language">{{ lang(bkdetail.language) }}</div>
        </div>
        <div class="row">
          <div class="label">分类</div>
          <div class="category">
            {{ categoryToChinese(bkdetail.category) }}
          </div>
        </div>
        <!-- <div class="isbn">ISBN：</div> -->
      </div>
      <div class="line-wrapper">
        <div class="line"></div>
      </div>
      <DetailFooter :bkdetail="bkdetail" />
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/global.scss";
.store-detail {
  position: absolute;
  .book-info {
    padding: 3rem 1rem;
    display: flex;
    .book-info-left {
      flex: 1;
      .book-cover {
        .cover {
          height: 9rem;
          width: 6rem;
        }
      }
    }
    .book-info-right {
      flex: 2;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 1rem 0.5rem;
      .book-name {
        padding: 0 0 0.5rem 0;
        font-weight: bold;
        font-size: 1.2rem;
      }
      .book-author {
        font-size: 0.8rem;
        padding: 0 0 0.4rem 0;
        color: $color-blue;
      }
      .book-read {
        font-size: 0.8rem;
      }
    }
  }
  
  .line-wrapper {
    height: 1px;
    @include center;
    .line {
      width: 90%;
      height: 1px;
      background-color: #ccc;
    }
  }

  .publish-info {
    font-size: 1rem;
    margin: 3rem 2rem;
    text-align: left;
    font-size: 1.1rem;
    @include vertical;
    .row {
      padding: 0.5rem 0 0 0;
      display: flex;
    }

    .label {
      width: 5rem;
      height: 2rem;
    }
  }
  .tick {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
  }
}
</style>