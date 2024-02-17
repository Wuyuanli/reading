<script setup>
import { RouterView } from 'vue-router'
import 'vant/es/toast/style';

let fontSize

document.addEventListener("DOMContentLoaded", function () {
  var html = document.querySelector("html");
  fontSize = window.innerWidth / 25;
  fontSize > 20 ? (fontSize = 20) : null;
  html.style.fontSize = fontSize + "px";
});
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>