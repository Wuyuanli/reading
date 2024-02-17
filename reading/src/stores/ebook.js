import { defineStore } from "pinia";

export const useEBookStore = defineStore("ebook", {
    state: () => {
      return {
        book: null,
        //baseUrl: 'http://localhost:3000/',
        fileName: '', // 当前浏览的电子书的URL
        cover: null, // 文章封面
        author: null, // 书籍作者
        bookAvailable: false,
        ifTitleAndMenuVisiable: false,
        ifSettingVisible: -1, // -1: 不显示，0: 目录，1: 进度，2: 主题 3: 字号
        ifSettingFontFamilyVisible: false, // 字体设置栏
        defaultFontSize: '16px',
        defaultFontFamily: 'Default',
        defaultTheme: 'Default',
        progress: 0,
        section: 0,
        metadata: null,
        navItems: null, // 目录信息
        tabHeight: 0, // 目录菜单栏高度
        offsetY: 0, // 下拉的偏移量
        htmlFontSize: '10px',
        ifBookmark: false,
        ifReload: true,
        shelfList: [], // 书架图书列表
        isEditMode: false, // 是否进入编辑模式
        shelfSelected: [], // 书架图书选中列表
      };
    },
    getters: {
    },
    actions: {
        SET_FILENAME(options) {this.fileName = options},
        TOGGLE_TITLEANDMENUVISIABLE(options) {
            // 用户点击展开或收起菜单栏和标题栏，同时收起设置栏
            if (options) {
                this.ifTitleAndMenuVisiable = false;
            } else {
                this.ifTitleAndMenuVisiable = !this.ifTitleAndMenuVisiable
            }
            this.ifSettingVisible = -1
        },
        SET_SETTINGVISIBLE(options) {
            // 如果两次点击相同，则将设置栏置为-1，这样可以避免点击设置无法关闭的现象
            if (this.ifSettingVisible === options) {
                this.ifSettingVisible = -1
            } else {
                this.ifSettingVisible = options
            }
        },
        SET_DEFAULTFONTSIZE(options) {/* 设置默认字体大小 */ this.defaultFontSize = options},
        SET_BOOK(options) {this.book = options; console.log(this.book)},
        SET_DEFAULTFONTFAMILY(options) {this.defaultFontFamily = options;},
        SET_IFSETTINGFONTVISIBLE(options) {this.ifSettingFontFamilyVisible = options},
        SET_DEFAULTTHEME(options) {this.defaultTheme = options},
        SET_BOOKAVAIABLE(options) {this.bookAvailable = options},
        SET_PROGRESS(options) {this.progress = options; console.log("progress set!")},
        SET_SECTION(options) { this.section = options},
        SET_COVER(options){this.cover = options},
        SET_AUTHOR(options){this.author = options},
        SET_METADATA(options){this.metadata = options},
        SET_NAVIGATION(options){ this.navItems = options},
        SET_TABHEIGHT(options){this.tabHeight = options},
        SET_OFFSETY(options){this.offsetY = options},
        SET_HTMLFONTSIZE(options){this.htmlFontSize = options},
        SET_IFBOOKMARK(options){this.ifBookmark = options},
        SET_IFRELOAD(options){this.ifReload = options},
        SET_SHELF_LIST(options) {this.shelfList = options},
        SET_EDIT_MODE(options) {
            if (typeof options !== 'undefined') {
                this.isEditMode = options;
            } else {
                this.isEditMode = !this.isEditMode;
            }
        },
        SET_SHELF_SELECTED(options){this.shelfSelected = options},
    },
});