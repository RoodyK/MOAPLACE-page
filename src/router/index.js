import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/login/LoginView.vue'
import SameView from '../views/join/OfTheSameView.vue'
import JoinMainView from '../views/join/JoinMainView.vue'
import JoinSuccessView from '@/views/join/JoinSuccessView.vue'
import FindIdView from '@/views/login/FindIdView.vue'
import FindPwdView from '@/views/login/FindPwdView.vue'
import SetNewPasswordView from '@/views/login/SetNewPasswordView.vue'
import moaplaceInfoView from '../views/moaplace/InfoView.vue'
import moaplaceGuideView from '../views/moaplace/GuideView.vue'
import moaplaceGuideView2 from '../views/moaplace/GuideView2.vue'
import moaplaceGuideView3 from '../views/moaplace/GuideView3.vue'
import moaplaceNaviView from '../views/moaplace/NaviView.vue'
import moaplaceMoaNews from '../views/moaplace/MoaNews.vue'
import moaplaceMoaDetail from '../views/moaplace/MoaDetail.vue'
import moaplaceMoaUpdate from '../views/moaplace/MoaUpdate.vue'
import moaCalender from '@/views/calendar/Calendar.vue'
import showList from '@/views/show/ShowListView.vue'
import showDetail from '@/views/show/ShowDetailView.vue'
import showReview from '@/views/show/ShowReviewView.vue'
import showRefund from '@/views/show/ShowRefundView.vue'
import RentalInsertView from '../views/rental/RentalInsertView.vue'
import RentalInfoView from '../views/rental/RentalInfoView.vue'
import MypageView from '../views/users/MypageView.vue'
import MyPerformanceView from '../views/users/PerformanceView.vue'
import MyTicketListView from '../views/users/TicketListView.vue'
import MyTicketDetailView from '../views/users/TicketDetailView.vue'
import MyTicketCancleView from '../views/users/TicketCancleView.vue'
import MyRentalListView from '../views/users/RentalListView.vue'
import MyRentalDetailView from '../views/users/RentalDetailView.vue'
import MyReviewListView from '../views/users/ReviewListView.vue'
import MyQNAListView from '../views/users/QNAListView.vue'
import MyInfoEditView from '../views/users/InfoEditView.vue'
import WithdrawalView from '../views/users/WithdrawalView.vue'
import RentalListView from '@/views/admin/Rental/RentalList.vue'
import RentalDetailView from '@/views/admin/Rental/RentalDetail.vue'
import RentalCalendarView from '@/views/admin/Rental/RentalCalendar.vue'
import AdminHallInfoList from '@/views/admin/Hall/AdminHallInfoList.vue'
import AdminHallDetail from '@/views/admin/Hall/AdminHallDetail.vue'
import AdminHallInsert from '@/views/admin/Hall/AdminHallInsert.vue'
import AdminHallUpdate from '@/views/admin/Hall/AdminHallUpdate.vue'
import AdminTicketList from '@/views/admin/Hall/AdminTicketList.vue'
import AdminTicketDetail from '@/views/admin/Hall/AdminTicketDetail.vue'
import FAQListView from '@/views/admin/board/FAQList.vue'
import FAQDetailView from '@/views/admin/board/FAQDetail.vue'
import FAQInsertView from '@/views/admin/board/FAQInsert.vue'
import QNAListView from '@/views/admin/board/QNAList.vue'
import QNADetailView from '@/views/admin/board/QNADetail.vue'
import AdminNewsList from '@/views/admin/board/NewsList.vue'
import AdminNewsDetail from '@/views/admin/board/NewsDetail.vue'
import AdminNewsInsert from '@/views/admin/board/NewsInsert.vue'
import BookingSelect from '@/views/BookingSelect.vue'
import PaymentDone from '@/views/DoneView.vue'
import SeatSelect from '@/views/SeatSelect.vue'
import PaymentView from '@/views/PaymentView.vue'
import MembershipView from '@/views/board/MembershipView.vue'
import MannerView from '@/views/board/MannerView.vue'


const routes = [
  //
  {
    path: '/moaplace.com/booking/seat',
    name: 'bookinseat',
    component: SeatSelect
  },

  // 메인
  {
    path: '/moaplace.com',
    name: 'moaplace',
    component: MainView
  },
  {
    path: '/moaplace.com/booking/payment',
    name: 'PaymentView',
    component: PaymentView
  },

  // 로그인
  {
    path: '/moaplace.com/users/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/moaplace.com/join/same',
    name: 'same',
    component: SameView
  },
  {
    path: '/moaplace.com/join/main',
    name: 'join',
    component: JoinMainView
  },
  {
    path: '/moaplace.com/join/success',
    name: 'joinSuccess',
    component: JoinSuccessView
  },
  {
    path: '/moaplace.com/login/findId',
    name: 'findId',
    component: FindIdView
  },
  {
    path: '/moaplace.com/login/findPwd',
    name: 'findPwd',
    component: FindPwdView
  },
  {
    path: '/moaplace.com/login/newpassword',
    name: 'setNewPassword',
    component: SetNewPasswordView
  },

  // 모아 플레이스
  {
    path: '/moaplace.com/moaplace/info',
    name: 'moaplaceInfoView',
    component: moaplaceInfoView
  },
  {
    path: '/moaplace.com/moaplace/guide',
    name: 'moaplaceGuideView',
    component: moaplaceGuideView
  },
  {
    path: '/moaplace.com/moaplace/guide2',
    name: 'moaplaceGuideView2',
    component: moaplaceGuideView2
  },
  {
    path: '/moaplace.com/moaplace/guide3',
    name: 'moaplaceGuideView3',
    component: moaplaceGuideView3
  },
  {
    path: '/moaplace.com/moaplace/navi',
    name: 'moaplaceNaviView',
    component: moaplaceNaviView
  },
  {
    path: '/moaplace.com/moaplace/news',
    name: 'moaplaceMoaNews',
    component: moaplaceMoaNews
  },
  {
    path: '/moaplace.com/moaplace/news/detail',
    name: 'moaplaceMoaDetail',
    component: moaplaceMoaDetail
  },
  {
    path: '/moaplace.com/moaplace/news/update',
    name: 'moaplaceMoaUpdate',
    component: moaplaceMoaUpdate
  },

  // 공연목록
  {
    path: '/moaplace.com/calendar',
    name: 'ShowCalendar',
    component: moaCalender
  },
  {
    path: '/moaplace.com/showlist',
    name: 'showlist',
    component: showList
  },
  {
    path: '/moaplace.com/showdetail',
    name: 'showdetail',
    component: showDetail
  },
  {
    path: '/moaplace.com/showreview',
    name: 'showreview',
    component: showReview
  },
  {
    path: '/moaplace.com/showrefund',
    name: 'showrefund',
    component: showRefund
  },

  // 대관신청
  {
    path: '/moaplace.com/rental/insert',
    name: 'rentalInsert',
    component: RentalInsertView
  },
  {
    path: '/moaplace.com/rental',
    name: 'rentalInfo',
    component: RentalInfoView
  },

  // 고객센터
  {
    path: '/moaplace.com/boardMain',
    name: 'boardMain',
    component: () => import('@/views/board/BoardMainView.vue')
  },
  {
    path: '/moaplace.com/qna/insert',
    name: 'qnaInsert',
    component: () => import('@/views/board/QNAInsertView.vue')
  },
  {
    path: '/moaplace.com/qna/list',
    name: 'qnaList',
    component: () => import('@/views/board/QNAListView.vue')
  },
  {
    path: '/moaplace.com/qna/detail',
    name: 'qnaDetail',
    component: () => import('@/views/board/QNADetailView.vue')
  },
  {
    path: '/moaplace.com/qna/update',
    name: 'qnaUpdate',
    component: () => import('@/views/board/QNAUpdateView.vue')
  },
  {
    path: '/moaplace.com/faq',
    name: 'faq',
    component: () => import('@/views/board/FAQView.vue')
  },
  {
    path: '/moaplace.com/manner',
    name: 'manner',
    component: MannerView
  },

  // 마이페이지
  {
    path: '/moaplace.com/users/mypage',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/moaplace.com/users/performance',
    name: 'myperformance',
    component: MyPerformanceView
  },
  {
    path: '/moaplace.com/users/ticket/list',
    name: 'myticketlist',
    component: MyTicketListView
  },
  {
    path: '/moaplace.com/users/ticket/detail',
    name: 'myticketdetail',
    component: MyTicketDetailView
  },
  {
    path: '/moaplace.com/users/ticket/cancle',
    name: 'myticketcancle',
    component: MyTicketCancleView
  },
  {
    path: '/moaplace.com/users/rental/list',
    name: 'myrentallist',
    component: MyRentalListView
  },
  {
    path: '/moaplace.com/users/rental/detail',
    name: 'myrentaldetail',
    component: MyRentalDetailView
  },
  {
    path: '/moaplace.com/users/review/list',
    name: 'myreviewlist',
    component: MyReviewListView
  },
  {
    path: '/moaplace.com/users/qna/list',
    name: 'myqnalist',
    component: MyQNAListView
  },
  {
    path: '/moaplace.com/users/info/edit',
    name: 'myinfoedit',
    component: MyInfoEditView
  },
  {
    path: '/moaplace.com/users/withdrawal',
    name: 'withdrawal',
    component: WithdrawalView
  },

  // 관리자기능
  {
    path: '/moaplace.com/admin/rental/list',
    name: 'rentallist',
    component: RentalListView
  },
  {
    path: '/moaplace.com/admin/rental/update',
    name: 'rentalupdate',
    component: RentalDetailView
  },
  {
    path: '/moaplace.com/admin/rental/calendar',
    name: 'rentalcalendare',
    component: RentalCalendarView
  },
  {
    path: '/moaplace.com/admin/faq/list',
    name: 'adminFaqList',
    component: FAQListView
  },
  {
    path: '/moaplace.com/admin/faq/detail',
    name: 'adminFaqDetail',
    component: FAQDetailView
  },
  {
    path: '/moaplace.com/admin/faq/insert',
    name: 'adminFaqInsert',
    component: FAQInsertView
  },
  {
    path: '/moaplace.com/admin/qna/list',
    name: 'adminQnaList',
    component: QNAListView
  },
  {
    path: '/moaplace.com/admin/qna/detail',
    name: 'adminQnaDetail',
    component: QNADetailView
  },
  {
    path: '/moaplace.com/admin/show/list',
    name: 'adminHallInfoList',
    component: AdminHallInfoList
  },
  {
    path: '/moaplace.com/admin/show/detail',
    name: 'adminHallDetail',
    component: AdminHallDetail
  },
  {
    path: '/moaplace.com/admin/show/insert',
    name: 'adminHallInsert',
    component: AdminHallInsert
  },
  {
    path: '/moaplace.com/admin/show/update',
    name: 'adminHallUpdate',
    component: AdminHallUpdate
  },
  {
    path: '/moaplace.com/admin/ticket/list',
    name: 'adminTicketList',
    component: AdminTicketList
  },
  {
    path: '/moaplace.com/admin/ticket/detail',
    name: 'adminTicketDetail',
    component: AdminTicketDetail
  },
  {
    path: '/moaplace.com/moaplace/news/list',
    name: 'adminNewsList',
    component: AdminNewsList
  },
  {
    path: '/moaplace.com/moaplace/news/detail',
    name: 'adminNewsDetail',
    component: AdminNewsDetail
  },
  {
    path: '/moaplace.com/moaplace/news/insert',
    name: 'adminNewsInsert',
    component: AdminNewsInsert
  },
  {
    path: '/moaplace.com/moaplace/booking/select',
    name: 'bookingSelect',
    component: BookingSelect
  },
  // 예매완료 페이지
  {
    path: '/moaplace.com/payment/done',
    name: 'paymentDone',
    component: PaymentDone
  },
  {
    path: '/moaplace.com/booking/cnt',
    name: 'bookingCnt',
    component: () => import('@/views/BookingCntView.vue')
  },
  {
    path: '/moaplace.com/membership',
    name: 'Membership',
    component: MembershipView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router