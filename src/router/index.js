import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import SideExampleView from '@/views/SideExampleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/moa',
    name: 'moa',
    component: MainView
  },
  {
    path: '/moa/tmp',
    name: 'tmp',
    component: SideExampleView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router