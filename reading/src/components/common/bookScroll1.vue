<script setup>
import {watch, ref} from 'vue'

const props = defineProps({
    height: Number
})
const scrollWrapper = ref()
watch(
    props.height,
    (val)=>{
        scrollWrapper.value.style.height = val + "px";
    }
)
</script>

<template>
    <div class="outbar">
      <div class="scroll-wrapper" ref="scrollWrapper">
        <slot></slot>
      </div>
    </div>
</template>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: hidden;
    width: 0 !important;
  }
}
</style>