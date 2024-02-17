import { createRouter, createWebHistory } from 'vue-router'
import BookList from '@/components/home/BookList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/HomePage.vue'),
      redirect: '/store',
      children: [
        {
          path: '/store',
          name: 'store',
          component: () => import('@/views/BookStore.vue'),
        },
        {
          path: '/shelf',
          name: 'shelf',
          component: () => import('@/views/BookShelf.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/BookCategory.vue')
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/BookDetail.vue')
    },
    {
      path: '/ebook',
      name: 'ebook',
      component: () => import('@/views/eBook.vue'),
      children: [
        {
          path: ':fileName',
          component: () => import('@/components/ebook/EbookReader.vue')
        }
      ]
    },
    {
      path: '/list',
      name: 'list',
      component: BookList
    }
  ]
})

export default router
