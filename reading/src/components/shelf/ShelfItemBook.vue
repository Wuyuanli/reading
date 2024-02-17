<script setup>

const props = defineProps({
    data: Object
})

// console.log(props.data, "shelfbook")
</script>

<template>
    <div class="shelf-item-book">
      <img
        :src="props.data.cover"
        class="shelf-item-book-cover"
      />
    </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.shelf-item-book {
  width: 100%;
  height: 100%;
  .shelf-item-book-cover {
    width: 100%;
    height: 100%;
  }
}
.isdragging{
  border: 2px solid red;
}
</style>