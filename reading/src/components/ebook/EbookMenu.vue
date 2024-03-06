<script setup>
import { useEBookStore } from '@/stores/ebook';


const store = useEBookStore()

// 控制菜单栏对应设置的隐藏和显示
function menuSetting(val) {
  store.SET_SETTINGVISIBLE(val);
  console.log("store.ifSettingVisible",store.ifSettingVisible,"store.ifTitleAndMenuVisiable",store.ifTitleAndMenuVisiable)
}
</script>

<template>
    <div class="menu-wrapper" v-show="store.ifTitleAndMenuVisiable">
      <div class="icon-wrapper" @click="menuSetting(0)">
        <van-icon name="label-o" />
      </div>
      <div class="icon-wrapper" @click="menuSetting(1)">
        <van-icon name="clock-o" />
      </div>
      <div class="icon-wrapper" @click="menuSetting(2)">
        <van-icon name="eye-o" />
      </div>
      <div class="icon-wrapper" @click="menuSetting(3)">
        <van-icon name="setting-o" />
      </div>
    </div>
</template>
  
<style lang="scss" scoped>
@import "../../assets/global.scss";
.menu-wrapper {
  height: 3rem;
  width: 100%;

  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.15);
  z-index: 200;
  
  font-size: 2rem;

  background-color: $color-white;
}
</style>