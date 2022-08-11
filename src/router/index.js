import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../views/users/MypageView.vue'
import PerformanceView from '../views/users/PerformanceView.vue'
import TicketListView from '../views/users/TicketListView.vue'
import TicketDetailView from '../views/users/TicketDetailView.vue'
import RentalListView from '../views/users/RentalListView.vue'
import RentalDetailView from '../views/users/RentalDetailView.vue'

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
  },
  {
    path: '/users/ticket/detail',
    name: 'myticketdetail',
    component: TicketDetailView
  },
  {
    path: '/users/rental/list',
    name: 'myrentallist',
    component: RentalListView
  },
  {
    path: '/users/rental/detail',
    name: 'myrentaldetail',
    component: RentalDetailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
