import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/moa/calendar',
    name:'ShowCalendar',
    component: ()=> import('@/views/calendar/Calendar.vue')
  },
  {
    path: '/moa/showlist',
    name: 'showlist',
    component: () => import('../views/show/ShowListView.vue')
  },
  {
    path: '/moa/showdetail',
    name: 'showdetail',
    component: () => import('../views/show/ShowDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
