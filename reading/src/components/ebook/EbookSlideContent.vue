<script setup>
import scroll2 from '@/components/common/bookScroll2.vue'
import { useEBookStore } from '@/stores/ebook';
import {refreshLocation,getTimeByMinites} from '@/utils/bookUtil'
import { onMounted, ref } from 'vue';

const store = useEBookStore()

let height = 0
let searchVisible = ref(false)
let searchList = ref([
  {
    cfi: "",
    excerpt: "",
  },
])
let searchText = ''

function doSearch(q) {
  // dosearch方法需要电子书加载完成，即this.book.ready.then(()=>{})
  return Promise.all(
    store.book.spine.spineItems.map((item) =>
      item
        .load(store.book.load.bind(store.book))
        .then(item.find.bind(item, q))
        .finally(item.unload.bind(item))
    )
    // 数组降维
  ).then((results) => 
    Promise.resolve([].concat.apply([], results)));
}

const search = () => {
  if (searchText && searchText.length > 0) {
    doSearch(searchText).then((list) => {
      searchList.value = list.map((item) => {
        item.excerpt = item.excerpt.replace(
          searchText,
          `<span class="content-search-text">${searchText}</span>`
        );
        item.excerpt = item.excerpt.replace(/\./g, "");
        var rule = /\s{1,}/g;
        item.excerpt = item.excerpt.split(rule).join(" ");
        return item;
      });
    });
  }
}
const hideSearch =()=>{
  searchVisible.value = false;
  searchText = ''
  searchList.value = null
}
const showSearch = ()=>{
  searchVisible.value = true
}

const displays = (target, callback) => {
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

const displayContent = (target, highlight = false) => {
  displays(target, () => {
    store.TOGGLE_TITLEANDMENUVISIABLE();
    // 搜索字段在文中高亮
    highlight ? store.book.rendition.annotations.highlight(target) : null;
  });
}

function contentItemStyle(item) {
  return {
    marginLeft: `${0.3 * item.level}rem`,
  };
}

function computedCataloguHeight() {
  let eleClassNmame = [
    ".content-page-tab",
    ".slide-contents-search-wrapper",
    ".slide-contents-book-wrapper",
  ];
  let remtopx = 3 * 37.5;
  height =
    window.innerHeight +
    remtopx -
    eleClassNmame.reduce((res, item) => {
      let ele = document.querySelector(item);
      let pxheight = getComputedStyle(ele).height;
      let numHeight = parseInt(pxheight) * 2;
      res += numHeight;
      return res;
    }, 0);
}

onMounted(()=>{
  computedCataloguHeight()
})
</script>

<template>
    <div class="ebook-slide-contents">
      <!-- 搜索框 -->
      <div class="slide-contents-search-wrapper">
        <div class="slide-contents-search-input-wrapper">
          <div class="slide-contents-search-icon" @click="search">
            <van-icon name="search" />
          </div>
          <input
            type="text"
            key="key"
            class="slide-contents-search-input"
            placeholder="搜索全书内容"
            v-model="searchText"
            @click="showSearch()"
            @keyup.enter="search"
          />
        </div>
        <div
          class="slide-contents-search-cancel"
          v-if="searchVisible"
          @click="hideSearch"
        >
          取消
        </div>
      </div>
      <!-- 书籍详情 -->
      <div class="slide-contents-book-wrapper">
        <div class="slide-contents-book-img-wrapper">
          <img :src="store.cover" class="slide-contents-book-img" />
        </div>
        <div class="slide-contents-book-info-wrapper">
          <div class="slide-contents-book-title">{{ store.metadata.title }}</div>
          <div class="slide-contents-book-author">{{ store.metadata.creator }}</div>
        </div>
        <div class="slide-contents-book-progress-wrapper">
          <div class="slide-contents-book-progress">
            <span class="progress">{{ store.progress + "%" }}</span>
            <span class="progress-text">已读</span>
          </div>
          <div class="slide-contents-book-time">
            已读{{ getTimeByMinites() }}分钟
          </div>
        </div>
      </div>
      <!-- 目录内容 -->
      <scroll2
        class="slide-contents-list"
        :top="3"
        :bottom="12"
        v-if="!searchVisible"
      >
        <div
          class="slide-contents-item"
          v-for="(item, index) in store.navItems"
          :key="index"
        >
          <span
            class="slide-contents-item-label"
            :class="{ selected: store.section === index }"
            :style="contentItemStyle(item)"
            @click="displayContent(item.href)"
            >{{ item.label }}</span
          >
          <span class="slide-contents-item-page">{{ item.page }}</span>
        </div>
      </scroll2>
      <!-- 搜索结果 -->
      <div
        class="slide-search-list"
        :style="{ height: height + 'px' }"
        v-if="searchVisible"
      >
        <div
          class="slide-search-item"
          v-for="(item, index) in searchList"
          :key="index"
          v-html="item.excerpt"
          @click="displayContent(item.cfi, true)"
        ></div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.ebook-slide-contents {
  width: 100%;
  height: 100%;
  @include vertical;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: 2rem;
    margin: 0.8rem 0 0.4rem 0;
    padding: 0 1rem;
    box-sizing: border-box;

    .slide-contents-search-input-wrapper {
      flex: 1;
      margin-left: 0.4rem;
      @include center;
      .slide-contents-search-icon {
        flex: 0.2;
      }
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: 5rem;
    font-size: 0;
    .slide-contents-book-img-wrapper {
      flex: 1;
      width: 100%;
      margin-left: 0.3rem;
      .slide-contents-book-img {
        width: 3rem;
        height: 4.5rem;
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 2;
      @include flexAround;

      padding: 0.5rem 0;
      .slide-contents-book-title {
        font-size: 1rem;
        line-height: 1.1rem;
        text-align: left;
        box-sizing: content-box;
        @include ellipseWithLine(3);
      }
      .slide-contents-book-author {
        font-size: 12px;
        box-sizing: content-box;
        text-align: left;
        @include ellipseWithLine(1);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 1;
      line-height: 1.2rem;
      font-size: 1rem;
      @include leftAndColCenter;

      .slide-contents-book-progress {
        padding: 0.2rem 0;
      }
      .slide-contents-book-time {
        padding: 0.2rem 0;
        font-size: 12px;
      }
    }
  }
  .slide-contents-list {
    font-size: 14px;
    margin-top: 1rem;
    .slide-contents-item {
      display: flex;
      padding: 1rem 0rem;
      width: 90%;
      margin-left: 1rem;
      line-height: 16px;

      .slide-contents-item-label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}

.slide-contents-search-input {
  flex: 1;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
}
.slide-contents-search-cancel {
  flex: 0.2;
  margin-left: 0.4rem;
  @include center;
}

.slide-search-list {
  width: 100%;
  height: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  .slide-search-item {
    font-size: 0.3rem;
    line-height: 1rem;
    padding: 0.8rem 0;
    box-sizing: border-box;
  }
}
</style>