<script setup>
import { saveBookShelfList, getBookShelfList } from "@/utils/localStorage";
import { useEBookStore } from '@/stores/ebook';

const store = useEBookStore()

function deleteBook(){
    let shelfList = getBookShelfList()
    let selectedList = store.shelfSelected
    // console.log(selectedList)
    for(const list of selectedList){
        shelfList = shelfList.filter((item) => item.bookId !== list.bookId)
    }
    saveBookShelfList(shelfList)
    location.reload()
}
</script>

<template>
    <div class="footer-wrapper">
        <div class="text">已选中{{ store.shelfSelected.length }}本书</div>
        <van-button type="warning" @click="deleteBook" class="button">删除</van-button>
    </div>
</template>

<style scoped>
.footer-wrapper{
    width: 100%;
    position: fixed;
    bottom: 3rem;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;

    .text{
        padding-right: 1rem;
        font-size: 1rem;
    }

    .button{
        margin-right: 1rem;
    }
}
</style>