<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import {addToBookShelf, removeFromBookShelf} from '@/utils/bookUtil.js'
import { useEBookStore } from '@/stores/ebook';
import {getBookShelfList} from '@/utils/localStorage'

const { query} = useRoute();
const router = useRouter()
const store = useEBookStore()

const props = defineProps({
    bkdetail: Object
})

// let ifDownloadProgress = ref(false)
const ifBookAddToShelf = computed(()=>{
  refreshBookShelf(); // 用localStorage刷新vuex
  for (let i = 0; i < store.shelfList.length; i++) {
    if (store.shelfList[i].bookId == props.bkdetail.bookId) {
      // store.setShelfBkIndex(i);
      return true; // 已经存在书架中
    }
  }
  return false;
})

function refreshBookShelf() {
    /* 将localStorage中的数据写入到vuex */
    let book = getBookShelfList();
    store.SET_SHELF_LIST(book);
}

function showEbook(fileName, categoryText) {
    console.log(`跳转到指定图书的渲染：${fileName}`);
    router.push({
        path: `/ebook/${categoryText}|${fileName}`,
    });
}

function read() {
  // 跳转到阅读器
  let category = query.category;
  let filename = query.filename;
  showEbook(filename, category);
  //
}

function add() {
  let book = JSON.parse(JSON.stringify(props.bkdetail));
  console.log(book)
  book.type = 1;
  addToBookShelf(book);
  console.log(store.shelfList)
}

function remove() {
  let bookTitle = props.bkdetail.title;
  removeFromBookShelf(bookTitle);
}
</script>

<template>
    <div class="detail-foot-wrapper">
  <div class="detail-footer">
    <div class="read" @click="read">阅读</div>
    <!-- <div class="cache" v-if="!ifCache" @click="saveCache">缓存书籍</div> -->
    <!-- <div class="cache" v-else @click="delCache">删除缓存</div> -->
    <div class="shelf" @click="remove" v-if="ifBookAddToShelf">
      已加入书架
    </div>
    <div class="shelf" @click="add" v-else>加入书架</div>
  </div>
  <!-- <div class="line-progress-wrapper" v-if="ifDownloadProgress"> -->
    <!-- <line-progress :width="percent" :color2="color2"></line-progress> -->
  <!-- </div> -->
</div>
</template>

<style scoped>
.detail-footer {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center; 

  bottom: 0;
  left: 0;
  width: 100vw;
  height: 3rem;
  
  font-size: 1rem;
  font-weight: bold;

  background-color: #fff;
  color: #2b90d9;
  text-align: center;

  &.show-shadow {
    box-shadow: 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  }
  .read {
    flex: 1;
    font-size: 1.1rem;
  }
  .cache {
    flex: 1;
  }
  .shelf {
    flex: 1;
  }
}
.line-progress-wrapper {
  height: 0.3rem;
  left: 0;
  bottom: 3rem;
  position: absolute;
}
</style>