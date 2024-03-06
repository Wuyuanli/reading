<script setup>
</script>

<template>
    <div class="shelf-item-add">
        <van-icon name="plus" />
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/global.scss";
.shelf-item-add {
  width: 100%;
  height: 100%;
  border: .07rem solid #bbb;
  box-sizing: border-box;
  @include center;
  .icon-add {
    font-size: 3rem;
    color: $color-gray2;
  }
}
</style>