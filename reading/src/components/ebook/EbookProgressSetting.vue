<script setup>
import { useEBookStore } from '@/stores/ebook';
import {refreshLocation, getTimeByMinites} from '@/utils/bookUtil';
import {computed} from 'vue'

const store = useEBookStore()
let getTimeText = computed(()=>{
    let txt = getTimeByMinites();
    return `已读${txt}分钟`;
})

let sectionName = computed(()=>{
    return store.section ? store.navItems[store.section].label : '';
})

function onProgressChange(progress) {
  console.log(progress)
  store.SET_PROGRESS(progress);
  displayProgress();
  refreshLocation();
}
function onProgressInput(progress) {
  store.SET_PROGRESS(progress);
  displayProgress();
  refreshLocation();
}

function displayProgress() {
  // 根据进度条的值渲染页面，即拖动进度条可以向前向后翻页
  let cfi = store.book.locations.cfiFromPercentage(store.progress / 100);
  // cfi = getLocation(store.fileName)
  console.log(cfi,"display progress")
  store.book.rendition.display(cfi).then(()=>{
    refreshLocation()
  })
}

function displays(target) {
    store.book.rendition.display(target).then(() => {
      refreshLocation();
    })
}

function prevSection() {
  if (store.section > 0 && store.bookAvailable) {
    store.SET_SECTION(store.section - 1);
    displaySection();
  }
}
function nextSection() {
  // spine 表示阅读进度
  if (store.section < store.book.spine.length - 1 && store.bookAvailable) {
    let nextsec = store.section + 1;
    store.SET_SECTION(nextsec);
    displaySection();
  }
}
function displaySection() {
  // 渲染第section章节
  const sectionInfo = store.book.section(store.section);
  console.log(sectionInfo.href)
  if (sectionInfo && sectionInfo.href) {
    // this.book.rendition.display(sectionInfo.href);
    displays(sectionInfo.href);
  }
}
</script>

<template>
    <div class="setting-wrapper" v-show="store.ifTitleAndMenuVisiable && store.ifSettingVisible === 1">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{ getTimeText }}</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <van-icon name="arrow-left" />
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="store.progress"
            :disabled="!store.bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextSection()">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{ sectionName }}</span>
          <span>({{ store.bookAvailable ? store.progress + "%" : "加载中..." }})</span>
        </div>
      </div>
    </div>
</template>

<style scoped>
.setting-wrapper {
  position: absolute;
  bottom: 2.7rem;
  height: 6rem;
  left: 0;
  z-index: 200;
  width: 100%;
  background: #fff;
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);

  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;

    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0.8rem;
      width: 100%;
      height: 2rem;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      .progress-icon-wrapper {
        cursor: pointer;
        font-size: 1.1rem;
      }
      .progress {
        width: 100%;
        /* width: 12rem; */
        height: 0.1rem;

        -webkit-appearance: none;
        margin: 0 1rem;
        
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ccc;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: 1rem;
      width: 100%;
      color: #333;
      font-size: .9rem;
      padding: 0 1.1rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      .progress-section-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>