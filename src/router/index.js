import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import moaplaceMainView from '../views/moaplace/MainView.vue'
import moaplaceInfoView from '../views/moaplace/InfoView.vue'
import moaplaceInfoView2 from '../views/moaplace/InfoView2.vue'
import moaplaceInfoView3 from '../views/moaplace/InfoView3.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/moa/moaplace/info',
    name: 'moaplaceMainView',
    component: moaplaceMainView
  },
  {
    path: '/moa/moaplace/guide',
    name: 'moaplaceInfoView',
    component: moaplaceInfoView
  },
  {
    path: '/moa/moaplace/guide2',
    name: 'moaplaceInfoView2',
    component: moaplaceInfoView2
  },
  {
    path: '/moa/moaplace/guide3',
    name: 'moaplaceInfoView3',
    component: moaplaceInfoView3
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
