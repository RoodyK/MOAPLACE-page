import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../views/users/MypageView.vue'
import PerformanceView from '../views/users/PerformanceView.vue'
import TicketListView from '../views/users/TicketListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users/mypage',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/users/performance',
    name: 'myperformance',
    component: PerformanceView
  },
  {
    path: '/users/ticket/list',
    name: 'myticketlist',
    component: TicketListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
