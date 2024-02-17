import { saveBookShelfList} from '@/utils/localStorage'
import { useEBookStore } from '@/stores/ebook';
import {saveReadProgress,saveLocation, getReadTime, getBookmark} from '@/utils/localStorage'
import { addCss } from './book';
import { removeAllCss } from "@/utils/book.js";


const VUE_APP_RES_URL = 'http://47.99.166.157/book/res'

export function getHTMLFontSize() {
  const store = useEBookStore()
  var html = document.querySelector("html");
  store.SET_HTMLFONTSIZE(html.style.fontSize);
  console.log("html-font-size: ", store.htmlFontSize);
}

export function initGlobalCss(defaultTheme) {
  removeAllCss()
  let cssURL = `${VUE_APP_RES_URL}/theme/theme_default.css`
  switch (defaultTheme) {
    case 'Default':
      cssURL = `${VUE_APP_RES_URL}/theme/theme_default.css`;
      break;
    case 'Eye':
      cssURL = `${VUE_APP_RES_URL}/theme/theme_eye.css`;
      break;
    case 'Gold':
      cssURL = `${VUE_APP_RES_URL}/theme/theme_gold.css`;
      break;
    case 'Night':
      cssURL = `${VUE_APP_RES_URL}/theme/theme_night.css`;
      break;
    default:
      cssURL = `${VUE_APP_RES_URL}/theme/theme_default.css`;
  }
  addCss(cssURL);
}

export function getTimeByMinites() {
  const store = useEBookStore()
  let readTime = getReadTime(store.fileName);
  if (!readTime) {
    return 0;
  } else {
    return Math.ceil(readTime / 60);
  }
}

export function refreshLocation() {
  const store = useEBookStore()
  // 获取当前位置
  const currentLocation = store.book.rendition.currentLocation()
  if (currentLocation && currentLocation.start) {
    // 设置章节 
    store.SET_SECTION(currentLocation.start.index);
    // 获取阅读进度 并 保存
    const startCfi = currentLocation.start.cfi;
    // console.log(startCfi,"22222222222222")
    const progress = store.book.locations.percentageFromCfi(startCfi);
    saveReadProgress(store.fileName,progress);
    // console.log(Math.floor(progress * 100))
    store.SET_PROGRESS(Math.floor(progress * 100));
    saveLocation(store.fileName, startCfi);
    // 是否显示书签
    const bokmks = getBookmark(store.fileName);
    if (bokmks) {
      let isbookmark = bokmks.some(item => item.cfi === startCfi);
      console.log('isbookmark: ',isbookmark);
      isbookmark ? store.SET_IFBOOKMARK(true) : store.SET_IFBOOKMARK(false);
    }
  }
}


export function addToBookShelf(book) {
  const store = useEBookStore()
  // 将书籍添加入vuex
  // 将vuex写入到localStorage
  let newList = store.shelfList;
  newList.push(book)
  store.SET_SHELF_LIST(newList);
  saveBookShelfList(store.shelfList);
}

export function removeFromBookShelf(title) {
  const store = useEBookStore()
  // 将书籍从vuex中删除
  let books = store.shelfList.filter(item => item.title !== title);
  store.SET_SHELF_LIST(books);
  // 将vuex中的内容重新写入到localStorage中
  saveBookShelfList(books);
}

export function fname(fileName){
    return fileName
      .replace(/.*_/g, "")
      .replace(/([A-Z])/g, " $1")
      .trim();
}

export function lang(language) {
  if (!language) return;
  switch (language) {
      case 'en': return '英语';
      case 'zh': return '中文';
      default: return '中文'
  }
}

export function categoryToEnglish(categoryNum){
  if (!categoryNum) return;
  switch (categoryNum) {
    case 1:
      return "ComputerScience";
    case 2:
      return "SocialSciences";
    case 3:
      return "Economics";
    case 4:
      return "Education";
    case 5:
      return "Engineering";
    case 6:
      return "Environment";
    case 7:
      return "Geography";
    case 8:
      return "History";
    case 9:
      return "Laws";
    case 10:
      return "LifeSciences";
    case 11:
      return "Literature";
    case 12:
      return "Biomedicine";
    case 13:
      return "BusinessandManagement";
    case 14:
      return "EarthSciences";
    case 15:
      return "MaterialsScience";
    case 16:
      return "Mathematics";
    case 17:
      return "MedicineAndPublicHealth";
    case 18:
      return "Philosophy";
    case 19:
      return "Physics";
    case 20:
      return "PoliticalScienceAndInternationalRelations";
    case 21:
      return "Psychology";
    case 22:
      return "Statistics";
  }
}

export function categoryToChinese(categoryNum) {
  if (!categoryNum) return;
  switch (categoryNum) {
    case 1:
      return "计算机科学";
    case 2:
      return "社会科学";
    case 3:
      return "经济学";
    case 4:
      return "教育学";
    case 5:
      return "基础工程";
    case 6:
      return "环境学";
    case 7:
      return "地质学";
    case 8:
      return "历史学";
    case 9:
      return "法律";
    case 10:
      return "生活科学";
    case 11:
      return "文学";
    case 12:
      return "生物医学";
    case 13:
      return "业务";
    case 14:
      return "地球科学";
    case 15:
      return "材料科学";
    case 16:
      return "数学";
    case 17:
      return "公共卫生";
    case 18:
      return "哲学";
    case 19:
      return "物理";
    case 20:
      return "国际政治";
    case 21:
      return "心理学";
    case 22:
      return "统计";
  }
}