<script setup>
import { onMounted, ref } from 'vue';
import { useEBookStore } from '@/stores/ebook';
import { getReadProgress } from "@/utils/localStorage.js";

const store = useEBookStore()

let progress = ref(0)
onMounted(()=>{
    progress.value = getReadProgress(store.fileName)
    if(progress.value){
      store.SET_PROGRESS(progress)
    }
})
</script>

<template>
    <div class="ebook-footer">
      <span class="ebook-footer-text">{{progress + '%'}}</span>
    </div>
</template>

<style scoped>
.ebook-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  
  width: 100%;
  height: 2rem;
  padding: 0 .4rem;
  box-sizing: border-box;
  
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .ebook-footer-text {
    font-size: .6rem;
    color: #666;
  }
}
</style>