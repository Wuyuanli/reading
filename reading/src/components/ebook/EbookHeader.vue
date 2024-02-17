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
  
<style scoped>
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .ebook-header-text {
    font-size: .6rem;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
  