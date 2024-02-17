<script setup>
import { computed } from 'vue'
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()

const onClickLeft = () => history.back();
const onClickRight = () => {
    store.SET_EDIT_MODE();
}

const editText = computed(() => {
  if (store.isEditMode) {
    return "取消";
  } else {
    return "编辑";
  }
})
</script>

<template>
    <van-nav-bar
    title="书架"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    >
    <template #right>
        {{ editText }}
    </template>
    </van-nav-bar>
</template>

<style scoped>
</style>