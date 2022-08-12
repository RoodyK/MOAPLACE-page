import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RentalListView from '@/views/admin/Rental/RentalList.vue'
import RentalDetailView from '@/views/admin/Rental/RentalDetail.vue'
import RentalCalendarView from '@/views/admin/Rental/RentalCalendar.vue'
import AdminHallInfoList from '@/views/admin/Hall/AdminHallInfoList.vue'
import AdminHallDetail from '@/views/admin/Hall/AdminHallDetail.vue'
import AdminHallInsert from '@/views/admin/Hall/AdminHallInsert.vue'
import AdminHallUpdate from '@/views/admin/Hall/AdminHallUpdate.vue'
import AdminTicketList from '@/views/admin/Hall/AdminTicketList.vue'
import AdminTicketDetail from '@/views/admin/Hall/AdminTicketDetail.vue'
import TmpView from '@/views/admin/Rental/Temp.vue'

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
    path: '/moa/admin/show/list',
    name: 'adminHallInfoList',
    component: AdminHallInfoList
  },
  {
    path: '/moa/admin/show/detail',
    name: 'adminHallDetail',
    component: AdminHallDetail
  },
  {
    path: '/moa/admin/show/insert',
    name: 'adminHallInsert',
    component: AdminHallInsert
  },
  {
    path: '/moa/admin/show/update',
    name: 'adminHallUpdate',
    component: AdminHallUpdate
  },
  {
    path: '/moa/admin/ticket/list',
    name: 'adminTicketList',
    component: AdminTicketList
  },
  {
    path: '/moa/admin/ticket/detail',
    name: 'adminTicketDetail',
    component: AdminTicketDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
