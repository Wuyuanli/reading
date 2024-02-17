<script setup>
import EbookHeader from '@/components/ebook/EbookHeader.vue';
import EbookReader from '@/components/ebook/EbookReader.vue';
import EbookTitleVue from '@/components/ebook/EbookTitle.vue';
import EbookMenuVue from '@/components/ebook/EbookMenu.vue';
import EbookFontFamily from '@/components/ebook/EbookFontFamily.vue';
import EbookFontSetting from "@/components/ebook/EbookFontSetting.vue";
import EbookThemeSettingVue from '@/components/ebook/EbookThemeSetting.vue';
import EbookProgressSettingVue from '@/components/ebook/EbookProgressSetting.vue';
import EbookSlideVue from '@/components/ebook/EbookSlide.vue';
import EbookBookMark from '@/components/ebook/EbookBookMark.vue';
import EbookFooter from '@/components/ebook/EbookFooter.vue';

import { getReadTime, saveReadTime } from "@/utils/localStorage";
import { useEBookStore } from '@/stores/ebook';
import {onBeforeUnmount, onMounted, ref, watch, computed} from 'vue'

let timer = null
const ebook = ref()
const store = useEBookStore()

function loopReadTime() {
  let readTime = getReadTime(store.fileName);
  // 获取阅读时间，如果不存在则创建
  if (!readTime) {
    readTime = 0;
  }
  // 开启定时任务，每30s记录一次
  timer = setInterval(() => {
    readTime++;
    readTime % 30 === 0 ? saveReadTime(store.fileName, readTime) : null;
  }, 1000);
}
function restore() {
  ebook.value.style.top = 0;
  ebook.value.style.transition = "all .2s linear";
  setTimeout(() => {
    ebook.value.style.transition = "";
  }, 200);
}

function move(v) {
  ebook.value.style.top = v + "px";
  // console.log(ebook.value.style.top)
}

const offsetY = computed(() => {return store.offsetY});
watch(offsetY, (newval)=>{
  // console.log(newval)
  if(!store.ifTitleAndMenuVisiable && store.bookAvailable){
    if(newval > 0){
    move(newval)
  }
  else if(newval == 0){
    restore()
}
  }
})

onMounted(()=>{
  loopReadTime()
})

onBeforeUnmount(()=>{
  clearInterval(timer);
})
</script>

<template>
    <div class="ebook" ref="ebook">
        <EbookHeader />
        <EbookTitleVue />
        <EbookReader />
        <EbookMenuVue />
        <EbookFontSetting />
        <EbookThemeSettingVue />
        <EbookProgressSettingVue />
        <EbookFontFamily />
        <EbookSlideVue />
        <EbookBookMark />
        <EbookFooter />
    </div>
    
</template>

<style scoped>
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>