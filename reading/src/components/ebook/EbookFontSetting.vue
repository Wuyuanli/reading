<script setup>
// import {ref} from 'vue'
import { FONT_SIZE_LIST } from "@/utils/book.js";
import { saveFontSize } from '@/utils/localStorage.js'
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()
const fontSizeList = FONT_SIZE_LIST

function setFontSize(val) {
  console.log("set font size")
    // 设置字体大小
    store.SET_DEFAULTFONTSIZE(val.fontSize);
    // 采用rendition/theme/fontSize方法设置字体 http://epubjs.org/documentation/0.3/#themesfontsize
    store.book.rendition.themes.fontSize(store.defaultFontSize); 
    saveFontSize(store.fileName,val.fontSize)
  }
function setFontFamily() {
   // 显示字体栏
   store.SET_IFSETTINGFONTVISIBLE(true);
   console.log(store.ifTitleAndMenuVisiable,store.ifSettingFontFamilyVisible)
}
</script>

<template>
    <div class="setting-wrapper" v-show="store.ifTitleAndMenuVisiable && store.ifSettingVisible === 3">
      <div class="setting-font-size">
        <div class="preview" :style="{ fontSize: fontSizeList[0].fontSize }"> A </div>
        <div class="select" v-for="(item, index) in fontSizeList" :key="index">
          <!-- <div class="line"></div> -->
          <div class="point-wrapper" @click="setFontSize(item)">
            <div class="point" v-show="store.defaultFontSize === item.fontSize">
              <div class="small-point"></div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="preview" :style="{ fontSize: fontSizeList[fontSizeList.length - 1].fontSize }"> A </div>
      </div>
      <div class="setting-font-family">
        <div class="font-family-wrapper" @click="setFontFamily"> {{ store.defaultFontFamily }} </div>
        <div class="font-family-icon">&gt;</div>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
  @import "../../assets/global.scss";
  .setting-wrapper {
    box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
    position: absolute;
    bottom: 2.7rem;
    height: 6rem;
    width: 100%;
    background-color: rgb(206, 206, 206);
    @include vertical;
    z-index: 200;
  }
  
  .setting-font-size {
    flex: 1.8;
    @include center;
  
    .preview {
      flex: 1;
      text-align: center;
    }
    .select {
      @include verticalCenter;
       position: relative;
      .line {
        height: 0.2rem;
        width: 3rem;
        margin-top: 0.2rem;
      }
      .point-wrapper {
        position: absolute;
        width: 0;
        height: 0.5rem;
        border-left: 0.2rem solid #393636;
        .point {
          position: absolute;
          top: -0.2rem;
          left: -0.5rem;
          border: 0.2rem solid #ccc;
          box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.15);
          border-radius: 50%;
          height: 0.7rem;
          width: 0.7rem;
          background-color: $color-white;
          @include center;
          .small-point{
            width: .2rem;
            height: .2rem;
            background-color: black;
            border-radius: 50%;
          }
        }
      }
    }
  }
  
  .setting-font-family {
    flex: 1;
    font-size: 0.9rem;
    @include center;
    .font-family-wrapper {
      margin-right: 0.2rem;
    }
  }
  </style>