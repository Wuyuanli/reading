<script setup>
import ePub from "epubjs";
import { useRoute } from 'vue-router'
import {onMounted} from 'vue'
import {refreshLocation} from '@/utils/bookUtil'
import {flatten} from '@/utils/book'
import { useEBookStore } from '@/stores/ebook';
import { realPx } from '@/utils/utils'
import {getLocation,getFontFamily,getFontSize,getTheme,saveFontFamily,saveFontSize,saveTheme} from '@/utils/localStorage'
//import {getLocalForage} from '@/utils/localForage'

const VUE_APP_BASE_URL = 'http://47.99.166.157/epub'
const VUE_APP_RES_URL = 'http://47.99.166.157/book/res'
const route = useRoute()
const store = useEBookStore()
const fileName = route.params.fileName.split("|")[1];

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


function onMaskClick(e) {
  // if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
    // return;
  // }
  let offsetX = e.offsetX;
  let width = window.innerWidth;
  if (offsetX > 0 && offsetX < 0.3 * width) {
    prePage();
  } else if (offsetX > 0 && offsetX > 0.7 * width) {
    nextPage();
  } else {
    store.TOGGLE_TITLEANDMENUVISIABLE();
  }
  // console.log(e);
  e.preventDefault();
  e.stopPropagation();
}

let touchStartX = '', touchStartTime = ''

function initGuest() {
  rendition.on('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX
    touchStartTime = event.timeStamp
    console.log(touchStartX)
  })
  rendition.on('touchend', (event) => {
    const offsetX = event.changedTouches[0].clientX - touchStartX
    const time = event.timeStamp - touchStartTime
    if (time < 500 && offsetX > 40) {
      prePage()
    } else if (time < 500 && offsetX < -40) {
      nextPage()
    } else {
      store.TOGGLE_TITLEANDMENUVISIABLE();
    }
    event.preventDefault()
    event.stopPropagation()
  })
}

function getFileUrl() {
  const fileUrl = route.params.fileName.split("|").join("/");
  let Url = `${VUE_APP_BASE_URL}/${fileUrl}.epub`
  store.SET_FILENAME(fileName);
  console.log(Url)
    
  initEpub(Url);
}

let rendition = null

function initEpub(url) {
  // 将电子书渲染到页面上
  // var ebook = ePub(this.fileName);
  var ebook = ePub(url);
  store.SET_BOOK(ebook);
  rendition = ebook.renderTo("area", {
    width: window.innerWidth,
    height: window.innerHeight,
    method: "default", // 支持微信
    // flow: 'scrolled' // 滚动模式
  });
  //rendition.display()
  console.log(ebook)
  initGuest()
  initLocalStorage();
  parseBook();
  initPages();
}

// function displays(target) {
    // store.book.rendition.display(target).then(() => {
      // refreshLocation();
    // })
// }
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

function initLocalStorage() {
  // 从localStorage中获取初始化设置
  rendition.hooks.content.register((contents) => {
    Promise.all([
      contents.addStylesheet(
        `${VUE_APP_RES_URL}/fonts/daysOne.css`
      ),
      contents.addStylesheet(
        `${VUE_APP_RES_URL}/fonts/cabin.css`
      ),
      contents.addStylesheet(
        `${VUE_APP_RES_URL}/fonts/montserrat.css`
      ),
      contents.addStylesheet(
        `${VUE_APP_RES_URL}/fonts/tangerine.css`
      ),
    ])
    //.then((_) => {});
  });
  const location = getLocation(fileName);
  console.log(location,"11111")
  // displays(location)
  displays(location, () => {
    let font = getFontFamily(fileName);
    let size = getFontSize(fileName);
    console.log(store.defaultFontSize)
    let theme = getTheme(fileName);
    themeList.forEach((theme) => {
      store.book.rendition.themes.register(theme.name, theme.style);
    }); // 注册主题
    // 初始化 字体、 字号 、主题
    font
      ? (store.book.rendition.themes.font(font),
        store.SET_DEFAULTFONTFAMILY(font))
      : saveFontFamily(fileName, store.defaultFontFamily);
    size
      ? (rendition.themes.fontSize(size),
        store.SET_DEFAULTFONTSIZE(size))
      : saveFontSize(fileName, store.defaultFontSize);
    theme
      ? (store.book.rendition.themes.select(theme),
        store.SET_DEFAULTTHEME(theme))
      : saveTheme(fileName, store.defaultTheme);
    // this.initGlobalCss();
    refreshLocation();
  });
  store.SET_BOOKAVAIABLE(true);
}
function initPages() {
  store.book.ready.then(() => {
    return store.book.locations
      .generate(
        750 * (window.innerWidth / 375) * (getFontSize(fileName)) 
      )
      .then(() => {
        refreshLocation();
        store.SET_BOOKAVAIABLE(true);
      });
  });
}
function parseBook() {
  store.book.loaded.cover.then((cover) => {
    // 获取封面
    store.book.archive.createUrl(cover).then((url) => {
      store.SET_COVER(url);
      // console.log('Cover: ',url);
    });
    // 获取元数据信息
    store.book.loaded.metadata.then((metadata) => {
      store.SET_METADATA(metadata);
      // console.log('Metadata:',metadata);
    });
    // 获取书籍目录信息
    store.book.loaded.navigation.then((nav) => {
      // 多维数组扁平化
      const navItem = flatten(nav.toc);
      // 添加目录层级属性
      function find(item, level = 0) {
        return !item.parent
          ? level
          : find(
              navItem.filter(
                (parentItem) => parentItem.id === item.parent
              )[0],
              ++level
            );
      }
      navItem.forEach((item) => {
        item.level = find(item);
      });
      store.SET_NAVIGATION(navItem);
      // console.log('Inavgations:',this.navItems)
    });
  });
  store.book.ready.then(()=>{
    return store.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(store.fileName) / 16))
  }).then(()=>{
    store.SET_BOOKAVAIABLE(true);
    refreshLocation()
  })
}
function prePage() {
  rendition.prev();
  store.TOGGLE_TITLEANDMENUVISIABLE(true);
  refreshLocation();
}
function nextPage() {
  rendition.next();
  store.TOGGLE_TITLEANDMENUVISIABLE(true);
  refreshLocation();
}

onMounted(()=>{
    getFileUrl()
})

let firstOffsetY = null
function move(e){
  let bookmarkHeight = parseInt(store.htmlFontSize) * 6;
  let y = 0;
  if (firstOffsetY) {
    y = e.changedTouches[0].clientY - firstOffsetY;
    y >= bookmarkHeight ? (y = bookmarkHeight) : null;
    store.SET_OFFSETY(y);
  } else {
    firstOffsetY = e.changedTouches[0].clientY;
  }
  e.preventDefault();
  e.stopPropagation();
}

function moveEnd(){
  store.SET_OFFSETY(0);
  firstOffsetY = null;
}
</script>

<template>
    <div class="ebook-reader">
  <div id="area"></div>
  <div
    class="ebook-mask"
    @click="onMaskClick"
    @touchmove="move"
    @touchend="moveEnd"
  ></div>
</div>
</template>

<style scoped>
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #area {
    z-index: 0;
  }
  .ebook-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 150;
    background: transparent;
  }
}
</style>