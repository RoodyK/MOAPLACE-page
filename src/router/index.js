import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/moa/boardMain',
    name: 'boardMain',
    component: () => import('@/views/board/BoardMainView.vue')
  },
  {
    path: '/moa/qna/insert',
    name: 'qnaInsert',
    component: () => import('@/views/board/QNAInsertView.vue')
  },
  {
    path: '/moa/qna/list',
    name: 'qnaList',
    component: () => import('@/views/board/QNAListView.vue')
  },
  {
    path: '/moa/qna/detail',
    name: 'qnaDetail',
    component: () => import('@/views/board/QNADetailView.vue')
  },
  {
    path: '/moa/qna/update',
    name: 'qnaUpdate',
    component: () => import('@/views/board/QNAUpdateView.vue')
  },
  {
    path: '/moa/faq',
    name: 'faq',
    component: () => import('@/views/board/FAQView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
