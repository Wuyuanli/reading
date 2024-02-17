<script setup>
import { useEBookStore } from '@/stores/ebook';
import { realPx } from '@/utils/utils'
import { saveTheme } from "@/utils/localStorage.js";
import {initGlobalCss} from '@/utils/bookUtil'
  
const store = useEBookStore()
let themeList = 
    [
        {
            alias: '默认',
            name: 'Default',
            style: {
                body: {
                    'color': '#4c5059',
                    'background': '#cecece',
                    // 控制ebook上下的空间，用来显示页眉页脚
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '雅致',
            name: 'Gold',
            style: {
                body: {
                    'color': '#5c5b56',
                    'background': '#c6c2b6',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '护眼',
            name: 'Eye',
            style: {
                body: {
                    'color': '#404c42',
                    'background': '#a9c1a9',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        },
        {
            alias: '夜晚',
            name: 'Night',
            style: {
                body: {
                    'color': '#cecece',
                    'background': '#000000',
                    'padding-top': `${realPx(30)}px!important`,
                    'padding-bottom': `${realPx(30)}px!important`
                }
            }
        }
    ]

function setTheme(index) {
    const theme = themeList[index];
    store.SET_DEFAULTTHEME(theme.name);
    console.log(store.defaultTheme);
    setTimeout(()=>{
        store.book.rendition.themes.select(store.defaultTheme);

        initGlobalCss(store.defaultTheme);
    },100)
    saveTheme(store.fileName, theme.name);
}
</script>

<template>
    <div
      class="setting-wrapper"
      v-show="store.ifTitleAndMenuVisiable && store.ifSettingVisible === 2"
    >
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{ selected: item.name === store.defaultTheme }"
            :style="{ background: item.style.body.background }"
          ></div>
          <div class="text" :class="{ selected: item.name === store.defaultTheme }">
            {{ item.alias }}
          </div>
        </div>
      </div>
    </div>
</template>
  
  <style scoped>
  .setting-wrapper {
    width: 100%;
    bottom: 2.7rem;
    height: 6rem;
    box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
    position: absolute;
    z-index: 200;
    background-color: #fff;
    .setting-theme {
      margin-top: 0.6rem;
      height: 80%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0.13rem;
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: 0.13rem solid #ccc;
          box-sizing: border-box;
          &.selected {
            box-shadow: 0 0.2rem 0.3rem 0 rgba(0, 0, 0, 0.1);
          }
        }
        .text {
          flex: 0 0 0.17rem;
          font-size: 0.13rem;
          color: #ccc;
          /* margin-top: .5rem; */
          display: flex;
          justify-content: center;
          align-items: center;
          &.selected {
            color: #333;
          }
        }
      }
    }
  }
  </style>