import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MypageView from '../views/users/MypageView.vue'
import MyPerformanceView from '../views/users/PerformanceView.vue'
import MyTicketListView from '../views/users/TicketListView.vue'
import MyTicketDetailView from '../views/users/TicketDetailView.vue'
import MyRentalListView from '../views/users/RentalListView.vue'
import MyRentalDetailView from '../views/users/RentalDetailView.vue'
import MyReviewListView from '../views/users/ReviewListView.vue'
import MyQNAListView from '../views/users/QNAListView.vue'

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
    component: MyPerformanceView
  },
  {
    path: '/users/ticket/list',
    name: 'myticketlist',
    component: MyTicketListView
  },
  {
    path: '/users/ticket/detail',
    name: 'myticketdetail',
    component: MyTicketDetailView
  },
  {
    path: '/users/rental/list',
    name: 'myrentallist',
    component: MyRentalListView
  },
  {
    path: '/users/rental/detail',
    name: 'myrentaldetail',
    component: MyRentalDetailView
  },
  {
    path: '/users/review/list',
    name: 'myreviewlist',
    component: MyReviewListView
  },
  {
    path: '/users/qna/list',
    name: 'myqnalist',
    component: MyQNAListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
