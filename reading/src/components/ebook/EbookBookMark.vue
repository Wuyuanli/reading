<script setup>
import BookMark from '@/components/common/bookMark.vue'
import {computed, watch, ref} from 'vue'
import { useEBookStore } from '@/stores/ebook';
import { saveBookmark, getBookmark } from "@/utils/localStorage.js";

const store = useEBookStore()

let text = ref("下拉添加书签")
let isFixed = ref(false)
let color = "white"

const criticalVal1 = computed(() => {
  return parseInt(store.htmlFontSize) * 1;
})

const criticalVal2 = computed(() => {
  return parseInt(store.htmlFontSize) * 2;
})

const bookmark = ref()
const styleFixed = computed(() => {
  return {
    position: "fixed",
    top: 0,
    right: `${(window.innerWidth - bookmark.value.clientWidth) / 2}px`,
  };
})


const offsetY = computed(() => {return store.offsetY});
const ifBookmark = computed(()=>{return store.ifBookmark})

watch( offsetY,(offsetYVal)=>{
    if(!store.ifTitleAndMenuVisiable && store.bookAvailable){
        if (offsetYVal === 0) {
          restore();
        } else if (offsetYVal > criticalVal1.value && offsetYVal < criticalVal2.value) {
          beforeThreshold();
        }
    }
})

watch (ifBookmark, (newVal)=>{
    if(newVal){
        color = "blue";
        isFixed.value = true;
    }
    else{
        color = "white";
        isFixed.value = false;
    }
})

function beforeThreshold() {
  if (store.ifBookmark) {
    text.value = "松手删除书签";
    isFixed.value = false;
    color = "white";
  } else {
    text.value = "松手添加书签";
    isFixed.value = true;
    color = "blue";
  }
}

function restore() {
  bookmark.value.style.top = "-10rem"
  if (isFixed.value) {
    store.SET_IFBOOKMARK(true);
    addBookMark();
  } else {
    store.SET_IFBOOKMARK(false);
    delBookMark();
  }
  if (store.ifBookmark) {
    text.value = "下拉删除书签";
  } else {
    text.value = "下拉添加书签";
  }
}

let ebookmark = null
function addBookMark() {
  ebookmark = getBookmark(store.fileName) || [];
  // 获取当前章节信息
  const currentLocation = store.book.rendition.currentLocation();
  const cfiBase = currentLocation.start.cfi.replace(/!.*/g, "");
  const cfiStart = currentLocation.start.cfi
    .replace(/.*!/g, "")
    .replace(/\)$/, "");
  const cfiEnd = currentLocation.end.cfi
    .replace(/.*!/g, "")
    .replace(/\)$/, "");
  // 拼接章节开始和结束
  const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`;
  // 获取当前章节范围内的内容
  store.book.getRange(cfiRange).then((range) => {
    let text = range.toString().replace(/\s\s/g, "");
    ebookmark.push({
      cfi: currentLocation.start.cfi,
      text: text,
    });
    saveBookmark(store.fileName, ebookmark);
  });
}
function delBookMark() {
  // 查找当前章节
  const currentLocation = store.book.rendition.currentLocation();
  const cfi = currentLocation.start.cfi;
  ebookmark = getBookmark(store.fileName);
  if (ebookmark) {
    ebookmark = ebookmark.filter((item) => {
      return item.cfi !== cfi;
    });
    saveBookmark(store.fileName, ebookmark);
  }
}
</script>

<template>
    <div class="ebook-bookmark" ref="bookmark">
      <div class="ebook-bookmark-text-wrapper">
        <div class="ebook-bookmark-down-wrapper">
        <van-icon name="arrow-down" class="icon-down" ref="iconDown"/>
        </div>
        <div class="ebook-bookmark-text">{{ text }}</div>
      </div>
      <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? styleFixed : {}">
        <BookMark :color="color" />
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.ebook-bookmark {
  position: absolute;
  top: -10rem;
  left: 0;

  height: 10rem;
  width: 100%;

  z-index: 200;
  background-color: #566270;

  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: 3rem;
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: 14px;
      color: $color-white;
      transition: all 0.2s linear;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: 1.1rem;
      color: $color-white;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 1rem;
  }
}
</style>