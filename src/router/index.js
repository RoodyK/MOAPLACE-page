import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RentalInsertView from '../views/rental/RentalInsertView.vue'
import RentalInfoView from '../views/rental/RentalInfoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/moa/rental/insert',
    name: 'rentalInsert',
    component: RentalInsertView
  },
  {
    path: '/moa/rental',
    name: 'rentalInfo',
    component: RentalInfoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
