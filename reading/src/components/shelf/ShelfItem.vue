<script setup>
import ShelfItemBook from './ShelfItemBook.vue';
import ShelfItemAdd from './ShelfItemAdd.vue';
import { computed, ref } from 'vue'
import { useEBookStore } from '@/stores/ebook';
import { useRouter } from "vue-router";

const router = useRouter()
const store = useEBookStore()
const props = defineProps({
    data: Object
})

console.log(props.data, "shelfitem")
const add = ShelfItemAdd
const book = ShelfItemBook

const Height = computed(() => {
    let WidthValue = (window.innerWidth / 3 - parseFloat(store.htmlFontSize) * 2) * 7 / 5
    return WidthValue + 'px'
})

const item = computed(() => {
  if (props.data.type === 1) {
    return book;
  }
  else{
    return add;
  }
})

let selected = ref(props.data.selected)

function onItemClick(data) {
    if (store.isEditMode) {
      if (props.data.type == 1) {
        if (typeof props.data.selected === "boolean") {
          selected.value = !selected.value;
          if (selected.value) {
            // 加入书架选择列表
            store.SET_SHELF_SELECTED([...store.shelfSelected, data]);
            console.log(store.shelfSelected)
          } else {
            // 移出书架选择列表
            store.SET_SHELF_SELECTED(
              store.shelfSelected.filter((item) => item.bookId !== props.data.bookId)
            );
          }
        } else {
          selected.value = true;
        //   加入书架选择列表
        }
      }
    }
    else{
        if (props.data.type == 1) {
          // 是单本电子图书，去详情页
          showBookDetail(data.fileName, data.categoryText);
        }
        else {
          // 去书城首页
            router.push({
            path: "/store",
          });
        }
    }
}

function showBookDetail(fileName, categoryText) {
  router.push({
      path: `/detail`,
      query: {
          filename: fileName,
          category: categoryText
      }
  })
}
</script>

<template>
    <div class="shelf-item" :class="{ 'shelf-item-shadow': props.data.type != 3 }" >
        <component
          :is="item"
          :data="props.data"
          @click="onItemClick(data)"
          :style="{ height: Height }"
        ></component>
        <div class="item-title-wrapper" v-if="!store.isEditMode">
          {{ props.data.title }}
        </div>
        <div
          class="icon-selected item-title-wrapper "
          :class="{ 'is-selected': selected }"
          v-else
        >
          {{ props.data.title }}
        </div>
    </div>
</template>

<style scoped>
.shelf-item {
  width: 100%;
  height: 100%;
  position: relative;

  .item-title-wrapper {
  margin-top: 0.3rem;
  font-size: 1rem;
  line-height: 1rem;
  text-align: left;
  height: 2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  
}

  .icon-selected {
    &.is-selected {
      color: #409EFF;
    }
  }
}
.shelf-item-shadow {
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
}
</style>