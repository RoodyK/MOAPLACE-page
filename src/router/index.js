import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import SameView from '../views/join/OfTheSameView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/users/same',
    name: 'same',
    component: SameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
