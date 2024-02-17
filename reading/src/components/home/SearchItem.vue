<script setup>
const props = defineProps({
    label: String,
    list: Array
})
</script>

<template>
    <div class="align">
        <div class="label">{{ props.label }}</div>
        <div v-for="(item,index) in props.list" :key="index" class="wrapper">
            <div class="icon-wrapper">
                <van-icon name="search" v-if="item.type === 2" />
                <van-icon name="send-gift-o" v-if="item.type === 1" />
            </div>
            <div class="text-wrapper">
                <div class="text">{{ item.text }}</div>
                <div class="num" v-if="item.num">{{ item.num }}人搜索</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.label{
    text-align: left;
    font-weight: bold;
    color: gray;
}
.wrapper{
    display: flex;
    margin-top: 1rem;
}
.icon-wrapper{
    font-size: 1rem;
    margin-right: 0.4rem;
    align-self: center;
}
.text{
    font-size: 1rem;
    font-weight: bold;
    padding: 0.2rem 0;
    color: #666;
}
.num{
    font-size: 0.7rem;
    color: #999;
    margin-top: 0.4rem;
}
</style>