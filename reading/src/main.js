import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
//const VUE_APP_BASE_API = 'http://47.99.166.157:3000'
const VUE_APP_RES_URL = 'http://121.36.70.55/Style'

// 使用 provide 将全局变量作为响应式对象
app.provide('VUE_APP_RES_URL', VUE_APP_RES_URL); //便于在js部分可直接用

// 使用 globalProperties 将全局变量附加到 Vue 实例上
app.config.globalProperties.$globalVar = VUE_APP_RES_URL;  //便于在模板部分可直接用

app.use(createPinia()).use(router).mount('#app');

