描述：基于Vue3开发的移动端书城阅读器项目 

技术栈：

> h5 CSS3 JS vue3 pinia vue-router ePub.js vant-ui  

# 效果展示

<img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/%E9%A6%96%E9%A1%B5.png" width="210px"> <img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/分类页1.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/分类页2.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/书架.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/分类详情.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/详情.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/目录.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/书签.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/进度.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/主题.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/字号.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/字体.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/添加书签.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/删除书签.png" width="210px"><img src="https://github.com/Wuyuanli/reading/blob/main/reading/static/书架编辑.png" width="210px">

# Usage
```
git clone git@github.com:Wuyuanli/reading.git
cd reading
npm i
npm run dev
```
# Bug记录
* 父组件onMounted异步获取数据传入子组件有延迟，子组件无法渲染。  
解决：使用v-if，通过flag判断数据是否已请求完毕

* 在做分类组件时遇到v-if v-for优先级问题，导致子组件不渲染。  
解决：在组件外面再包一层，把v-if v-for分开

* 封装路由跳转方法时，router.push报undefined  
解决：把const router放到setup函数内

* 使用vant ui的导航组件，导致内容覆盖问题  
解决：使用padding bottom把导航组件的位置预留出来

* 编写分类详情时，复用featured组件失败  
解决：栅格布局和绝对定位混用导致出错，换用弹性布局

* 实现ebook reader各项功能时，各项设置无法持久保存，但pinia和localstorage数据无异常  
解决：epubjs版本问题，降至0.3.71版本正常

* 实现书架书籍删除功能时，需要获取父组件传入的数据并修改，但破坏了vue单向数据流准则，报错  
解决：将父组件传入的数据用ref包裹，存储在当前组件局部变量中
