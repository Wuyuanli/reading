<script setup>
import {watch, ref, onMounted} from 'vue'
import {getHTMLFontSize} from '@/utils/bookUtil.js'
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()
const props = defineProps({
    top: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    ifNoScroll: {
      type: Boolean,
      default: false,
    },
})
const scrollWrapper = ref()

function handleScroll(e) {
  const y = e.target.scrollTop || window.scrollY || document.body.scrollTop;
  this.setHomeOffSetY(y)
}
function refresh() {
  if (scrollWrapper.value) {
    let height = window.innerHeight -(props.top + props.bottom) * parseInt(store.htmlFontSize) + "px";
    scrollWrapper.value.style.height = height;
    scrollWrapper.value.addEventListener("scroll", handleScroll);
  }
}

watch(
    props.top,
    ()=>{
        refresh()
    }
)

onMounted(()=>{
    getHTMLFontSize()
    refresh()
})
</script>

<template>
    <div
      class="scroll"
      :class="{ noScroll: ifNoScroll }"
      ref="scrollWrapper"
      @scroll.passive="handleScroll"
    >
      <slot></slot>
    </div>
</template>

<style scoped>
.scroll {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: hidden;
    width:0 !important;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>