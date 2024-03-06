<script setup>
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()
function getSectionName(){
    return store.section ? store.navItems[store.section].label : '';
}

const sectionName = getSectionName()
// console.log(sectionName)
</script>

<template>
    <div class="ebook-header">
      <span class="ebook-header-text">{{ sectionName }}</span>
    </div>
</template>
  
<style lang="scss" scoped>
@import "../../assets/global.scss";
.ebook-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  
  width: 100%;
  height: 2rem;

  padding: 0 .4rem;
  box-sizing: border-box;
  
  overflow: hidden;
  @include left;
  .ebook-header-text {
    font-size: .6rem;
    color: $color-gray3;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
  