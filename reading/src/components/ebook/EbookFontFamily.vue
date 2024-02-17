<script setup>
import { useEBookStore } from '@/stores/ebook';
import { FONT_FAMILY_LIST } from "@/utils/book";
import { saveFontFamily } from "@/utils/localStorage";

const store = useEBookStore()
const fontFamilyList = FONT_FAMILY_LIST

function hide() {
  store.SET_IFSETTINGFONTVISIBLE(false);
}
function select(font) {
  store.SET_DEFAULTFONTFAMILY(font);
  saveFontFamily(store.fileName,font);
  if (font === "Default") {
    store.book.rendition.themes.font("Times New Roman");
  } else {
    store.book.rendition.themes.font(store.defaultFontFamily);
  }
  console.log(store.defaultFontFamily);
}

</script>

<template>
    <div
      class="ebook-popup-list"
      v-show="store.ifTitleAndMenuVisiable && store.ifSettingFontFamilyVisible"
    >
      <div class="set-font-family-title">
        <div class="title-icon" @click="hide">
          <van-icon name="arrow-down" @click="hide" size="1rem" />
        </div>
        <div class="title-text"> 选择字体 </div>
      </div>
      <div
        class="set-font-family-wrapper"
        v-for="(item, index) in fontFamilyList"
        :key="index"
        @click="select(item.fontFamily)"
        :class="{ selected: store.defaultFontFamily === item.fontFamily }"
      >
        <div class="font-family-list">
          {{ item.fontFamily }}
        </div>
        <div
          class="font-family-checked"
          v-show="store.defaultFontFamily === item.fontFamily"
        >
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
</template>

<style scoped>
.ebook-popup-list{
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0rem;
  background-color: rgb(206, 206, 206);
  z-index: 200;
}
.set-font-family-wrapper {
  display: flex;
  font-size: 1rem;
  padding: 0.7rem;

  .font-family-list {
    flex: 1;
    text-align: left;
  }
  .font-family-checked {
    flex: 1;
    text-align: right;
  }
}

.set-font-family-title {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.1rem;
  font-weight: bold;
  
  width: 100%;
  height: 3rem;
  
  position: relative;
  border-bottom: 1px solid #ccc;

  .title-icon {
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 1rem;
  }
  .title-text {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

.selected {
  color: blue;
  font-weight: bold;
}
</style>