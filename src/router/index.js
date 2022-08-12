import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RentalListView from '@/views/admin/Rental/RentalList.vue'
import RentalDetailView from '@/views/admin/Rental/RentalDetail.vue'
import RentalCalendarView from '@/views/admin/Rental/RentalCalendar.vue'
import TmpView from '@/views/admin/Rental/Temp.vue'
import FAQListView from '@/views/admin/board/FAQList.vue'
import FAQDetailView from '@/views/admin/board/FAQDetail.vue'
import FAQInsertView from '@/views/admin/board/FAQInsert.vue'
import QNAListView from '@/views/admin/board/QNAList.vue'
import QNADetailView from '@/views/admin/board/QNADetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/moa/admin/rental/list',
    name: 'rentallist',
    component: RentalListView
  },
  {
    path: '/moa/admin/rental/update',
    name: 'rentalupdate',
    component: RentalDetailView
  },
  {
    path: '/moa/admin/rental/calendar',
    name: 'rentalcalendare',
    component: RentalCalendarView
  },
  {
    path: '/tmp',
    name: 'tmp',
    component: TmpView
  },
  {
    path: '/moa/admin/faq/list',
    name: 'faqList',
    component: FAQListView
  },
  {
    path: '/moa/admin/faq/detail',
    name: 'faqDetail',
    component: FAQDetailView
  },
  {
    path: '/moa/admin/faq/insert',
    name: 'faqInsert',
    component: FAQInsertView
  },
  {
    path: '/moa/admin/qna/list',
    name: 'qnaList',
    component: QNAListView
  },
  {
    path: '/moa/admin/qna/detail',
    name: 'qnaDetail',
    component: QNADetailView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
