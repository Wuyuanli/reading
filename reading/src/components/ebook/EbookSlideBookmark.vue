<script setup>
import { useEBookStore } from '@/stores/ebook';
import { getBookmark,saveBookmark } from "@/utils/localStorage";
import {refreshLocation} from '@/utils/bookUtil'

const store = useEBookStore()
let bookmark = getBookmark(store.fileName)
let height = 0

function displays(target, callback) {
  if (target) {
    store.book.rendition.display(target).then(() => {
      refreshLocation();
      if (callback) callback();
    })
  } else {
    store.book.rendition.display().then(() => {
      refreshLocation();
      if (callback) callback();
    })
  }
}

function displayBookmark(href){
    console.log('dodisplay ?',href);
    displays(href,()=>{
        store.TOGGLE_TITLEANDMENUVISIABLE()
    })
}
function delBookmark(cfi,e){
  let bookmarks = getBookmark(store.fileName);
  bookmark = bookmarks.filter(item => item.cfi !== cfi);
  saveBookmark(store.fileName, bookmark);
  e.preventDefault();
  e.stopPropagation();
}

</script>

<template>
    <div class="ebook-slide-bookmark">
      <div class="slide-bookmark-title">
        书签 · {{ bookmark ? bookmark.length : 0 }}
      </div>
      <div
        class="slide-bookmark-list"
        :style="{ height: height + 'px' }"
      >
        <div
          class="slide-bookmark-item"
          v-for="(item, index) in bookmark"
          :key="index"
        >
          <div class="slide-bookmark-item-icon">
            <div class="icon-bookmark" @click="delBookmark(item.cfi, $event)">
                <van-icon name="send-gift-o" />
            </div>
          </div>
          <div class="slide-bookmark-item-text" @click="displayBookmark(item.cfi)">{{ item.text }}</div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.ebook-slide-bookmark {
  .slide-bookmark-title {
    height: 2rem;
    padding: 1.5rem;
    font-size: 16px;
    font-weight: bold;
    box-sizing: border-box;
    @include left;
  }
  .slide-bookmark-list {
    .slide-bookmark-item {
        display: flex;
        height: 3rem;
        padding: 0.2rem .4rem;
      .slide-bookmark-item-icon {
        @include left;
        .icon-bookmark {
            font-size: 14px;
            width: .8rem;
            height: .8rem;
            background: #bbb;
        }
      }
      .slide-bookmark-item-text {
          line-height: 1rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
      }
    }
  }
}
</style>