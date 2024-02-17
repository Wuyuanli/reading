<script setup>
import ShelfItem from '@/components/shelf/ShelfItem.vue';
import ShelfFooter from './ShelfFooter.vue';
import {computed} from 'vue'
import { getBookShelfList } from "@/utils/localStorage";
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()

const Height = computed(() => {
  return `${
    ((window.innerWidth / 3 - parseFloat(store.htmlFontSize) * 2) * 350) /
    250
  }px`;
})

let shelfList = getBookShelfList()
function ifAddIsExit(shelflist = [], ifUseLocalStorage = false) {
    let jude;
    if (ifUseLocalStorage) {
        shelflist = getBookShelfList();
        jude = !shelflist.some(i => {
            return i.content === null && i.type == 3 && i.id == -1
        })
    } else {
        jude = !shelflist.some(i => {
            return i.content === null && i.type == 3 && i.id == -1
        })
    }
    if (jude) {
        shelflist.unshift({ id: "-1", type: "3", content: null });
    }
  }
ifAddIsExit(shelfList)
</script>

<template>
    <div class="shelf-list">
      <div class="shelf-item-wrapper">
        <div class="shelf-items" v-for="(item, index) in shelfList" :key="index">
          <ShelfItem :data="item" class="item-instance" :style="{ height: Height }" />
        </div>
      </div>
    </div>
    <div v-if="store.isEditMode" class="footer">
      <ShelfFooter />
    </div>
</template>

<style scoped>
.shelf-list {
  width: 100%;
  height: 100%;
  margin-top: 23px;
  padding-bottom: 3rem;
  .shelf-item-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 1rem 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin-top: -1.5rem;
    .shelf-items {
      width: 33.33%;
      padding: 1rem 1rem;
      box-sizing: border-box;
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .item-instance {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>