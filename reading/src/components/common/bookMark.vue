<script setup>
import {computed} from 'vue'

const props = defineProps({
    color : String
})

console.log(props.color)

const style = computed(()=>{
    if(props.color){
        return {borderColor: `${props.color} ${props.color} transparent ${props.color}`}
    }
    else{
        return {}
    }
})
</script>

<template>
    <div class="book-mark" :style="style"></div>
</template>

<style scoped>
.book-mark{
    width: 0;
    height: 0;
    border-width: 2rem .6rem .6rem .6rem;
    border-style: solid;
    border-color: white,white,transparent,white;
}
</style>