import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import moaplaceMainView from '../views/moaplace/MainView.vue'
import moaplaceInfoView from '../views/moaplace/InfoView.vue'
import moaplaceInfoView2 from '../views/moaplace/InfoView2.vue'
import moaplaceInfoView3 from '../views/moaplace/InfoView3.vue'
import moaplaceNaviView from '../views/moaplace/NaviView.vue'
import moaplaceMoaNews from '../views/moaplace/MoaNews.vue'
import moaplaceMoaDetail from '../views/moaplace/MoaDetail.vue'
import moaplaceMoaUpdate from '../views/moaplace/MoaUpdate.vue'

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
  },
  {
    path: '/moa/moaplace/navi',
    name: 'moaplaceNaviView',
    component: moaplaceNaviView
  },
  {
    path: '/moa/moaplace/news',
    name: 'moaplaceMoaNews',
    component: moaplaceMoaNews
  },
  {
    path: '/moa/moaplace/news/detail',
    name: 'moaplaceMoaDetail',
    component: moaplaceMoaDetail
  },
  {
    path: '/moa/moaplace/news/update',
    name: 'moaplaceMoaUpdate',
    component: moaplaceMoaUpdate
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
