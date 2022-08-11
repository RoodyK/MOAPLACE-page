import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RentalListView from '@/views/admin/Rental/RentalList.vue'
import RentalDetailView from '@/views/admin/Rental/RentalDetail.vue'
import RentalCalendarView from '@/views/admin/Rental/RentalCalendar.vue'
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
