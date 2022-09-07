import { createRouter, createWebHistory } from 'vue-router'
// import store from '@/store/index.js'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/login/LoginView.vue'
import LogoutView from '@/views/login/LogoutView.vue'
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
import moaCalender from '@/views/calendar/Calendar.vue'
import preview from '@/views/show/PreView.vue'
import showDetail from '@/views/show/ShowDetailView.vue'
import residualseats from '@/views/show/ResidualSeatsView.vue'
import RentalInsertView from '../views/rental/RentalInsertView.vue'
import RentalInfoView from '../views/rental/RentalInfoView.vue'
import MypageView from '../views/users/MypageView.vue'
import MyPerformanceView from '../views/users/PerformanceView.vue'
import MyTicketListView from '../views/users/TicketListView.vue'
import MyTicketDetailView from '../views/users/TicketDetailView.vue'
import MyTicketCancleView from '../views/users/TicketCancleView.vue'
import MyRentalListView from '../views/users/RentalListView.vue'
import MyRentalDetailView from '../views/users/RentalDetailView.vue'
import MyRentalUpdateView from '../views/users/RentalUpdateView.vue'
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
import AdminShowScheduleList from '@/views/admin/Hall/AdminShowScheduleList.vue'
import AdminShowScheduleDetail from '@/views/admin/Hall/AdminShowScheduleDetail.vue'
import AdminShowScheduleInsert from '@/views/admin/Hall/AdminShowScheduleInsert.vue'
import AdminShowScheduleUpdate from '@/views/admin/Hall/AdminShowScheduleUpdate.vue'
import AdminTicketList from '@/views/admin/Hall/AdminTicketList.vue'
import AdminTicketDetail from '@/views/admin/Hall/AdminTicketDetail.vue'
import AdminFAQListView from '@/views/admin/board/FAQList.vue'
import AdminFAQUpdateView from '@/views/admin/board/FAQUpdate.vue'
import AdminFAQDetailView from '@/views/admin/board/FAQDetail.vue'
import AdminFAQInsertView from '@/views/admin/board/FAQInsert.vue'
import AdminQNAListView from '@/views/admin/board/QNAList.vue'
import AdminQNADetailView from '@/views/admin/board/QNADetail.vue'
import AdminNewsList from '@/views/admin/board/NewsList.vue'
import AdminNewsDetail from '@/views/admin/board/NewsDetail.vue'
import AdminNewsInsert from '@/views/admin/board/NewsInsert.vue'
import AdminNewsUpdate from '@/views/admin/board/NewsUpdate.vue'
import BookingSelect from '@/views/BookingSelect.vue'
import BookingCount from '@/views/BookingCountView.vue'
import PaymentDone from '@/views/DoneView.vue'
import SeatSelect from '@/views/SeatSelect.vue'
import PaymentView from '@/views/PaymentView.vue'
import MembershipView from '@/views/board/MembershipView.vue'
import MannerView from '@/views/board/MannerView.vue'
import BoardMainView from '@/views/board/BoardMainView.vue'
import FAQView from '@/views/board/FAQView.vue'
import QNAListView from '@/views/board/QNAListView.vue'
import QNAInsertView from '@/views/board/QNAInsertView.vue'
import QNADetailView from '@/views/board/QNADetailView.vue'
import QNAUpdateView from '@/views/board/QNAUpdateView.vue'
import AdminMemberInfo from '@/views/admin/MemberInfoView.vue'
import AdminRentalChart from '@/views/admin/RentalChartView.vue'
import AdminShowChart from '@/views/admin/ShowChartView.vue'

const routes = [

  {
    path: "/",
    redirect: "/moaplace.com"
  },
  // 메인
  {
    path: '/moaplace.com',
    name: 'moaplace',
    component: MainView
  },
  // 로그인
  {
    path: '/moaplace.com/users/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/moaplace.com/users/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/moaplace.com/users/join/same',
    name: 'same',
    component: SameView
  },
  {
    path: '/moaplace.com/users/join/main',
    name: 'join',
    component: JoinMainView
  },
  {
    path: '/moaplace.com/users/join/success',
    name: 'joinSuccess',
    component: JoinSuccessView
  },
  {
    path: '/moaplace.com/users/login/findId',
    name: 'findId',
    component: FindIdView
  },
  {
    path: '/moaplace.com/users/login/findPwd',
    name: 'findPwd',
    component: FindPwdView
  },
  {
    path: '/moaplace.com/users/login/newpassword/:id',
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
    path: '/moaplace.com/moaplace/news/list',
    name: 'moaplaceMoaNews',
    component: moaplaceMoaNews
  },
  {
    path: '/moaplace.com/moaplace/news/detail/:notice',
    name: 'moaplaceMoaDetail',
    component: moaplaceMoaDetail
  },

  // 공연목록
  {
    path: '/moaplace.com/calendar',
    name: 'ShowCalendar',
    component: moaCalender
  },
  {
    path: '/moaplace.com/preview',
    name: 'preview',
    component: preview
  },
  {
    path: '/moaplace.com/show/showdetail/:show_num',
    name: 'showdetail',
    component: showDetail
  },

  // 잔여석
  {
    path: '/moaplace.com/show/residualseats/:show_num',
    name: 'residualseats',
    component: residualseats
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
    path: '/moaplace.com/board/main',
    name: 'boardMain',
    component: BoardMainView
  },
  {
    path: '/moaplace.com/board/qna/insert',
    name: 'qnaInsert',
    component: QNAInsertView
  },
  {
    path: '/moaplace.com/board/qna/list/:pageNum?/:keyword?',
    name: 'qnaList',
    component: QNAListView
  },
  {
    path: '/moaplace.com/board/qna/detail/:qna_num',
    name: 'qnaDetail',
    component: QNADetailView
  },
  {
    path: '/moaplace.com/board/qna/update/:qna_num',
    name: 'qnaUpdate',
    component: QNAUpdateView
  },
  {
    path: '/moaplace.com/board/faq',
    name: 'faq',
    component: FAQView
  },
  {
    path: '/moaplace.com/board/manner',
    name: 'manner',
    component: MannerView
  },
  {
    path: '/moaplace.com/board/membership',
    name: 'Membership',
    component: MembershipView
  },

  // 마이페이지
  {
    path: '/moaplace.com/users/mypage',
    name: 'mypage',
    component: MypageView
  },
  {
    path: '/moaplace.com/users/mypage/performance',
    name: 'myperformance',
    component: MyPerformanceView
  },
  {
    path: '/moaplace.com/users/mypage/ticket/list',
    name: 'myticketlist',
    component: MyTicketListView
  },
  {
    path: '/moaplace.com/users/mypage/ticket/detail/:booking_num',
    name: 'myticketdetail',
    component: MyTicketDetailView
  },
  {
    path: '/moaplace.com/users/mypage/ticket/cancle/:booking_num',
    name: 'myticketcancle',
    component: MyTicketCancleView
  },
  {
    path: '/moaplace.com/users/mypage/rental/list',
    name: 'myrentallist',
    component: MyRentalListView
  },
  {
    path: '/moaplace.com/users/mypage/rental/detail/:rental_num',
    name: 'myrentaldetail',
    component: MyRentalDetailView
  },
  {
    path: '/moaplace.com/users/mypage/rental/update/:rental_num',
    name: 'myrentalupdate',
    component: MyRentalUpdateView
  },
  {
    path: '/moaplace.com/users/mypage/review/list',
    name: 'myreviewlist',
    component: MyReviewListView
  },
  {
    path: '/moaplace.com/users/mypage/qna/list',
    name: 'myqnalist',
    component: MyQNAListView
  },
  {
    path: '/moaplace.com/users/mypage/info/edit',
    name: 'myinfoedit',
    component: MyInfoEditView
  },
  {
    path: '/moaplace.com/users/mypage/withdrawal',
    name: 'withdrawal',
    component: WithdrawalView
  },

  // 관리자기능-대관관리
  {
    path: '/moaplace.com/admin/rental/list',
    name: 'rentallist',
    component: RentalListView
  },
  {
    path: '/moaplace.com/admin/rental/detail/:id',
    name: 'rentalupdate',
    component: RentalDetailView
  },
  {
    path: '/moaplace.com/admin/rental/calendar',
    name: 'rentalcalendare',
    component: RentalCalendarView
  },
  // 관리자기능-게시판관리
  {
    path: '/moaplace.com/admin/faq/list',
    name: 'adminFaqList',
    component: AdminFAQListView
  },
  {
    path: '/moaplace.com/admin/faq/detail/:faq_num',
    name: 'adminFaqDetail',
    component: AdminFAQDetailView
  },
  {
    path: '/moaplace.com/admin/faq/insert',
    name: 'adminFaqInsert',
    component: AdminFAQInsertView
  },
  {
    path: '/moaplace.com/admin/faq/update/:faq_num',
    name: 'adminFaqUpdate',
    component: AdminFAQUpdateView
  },
  {
    path: '/moaplace.com/admin/qna/list',
    name: 'adminQnaList',
    component: AdminQNAListView
  },
  {
    path: '/moaplace.com/admin/qna/detail/:qna_num',
    name: 'adminQnaDetail',
    component: AdminQNADetailView
  },
  //관리자기능-공연관리
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
  //관리자기능-일정관리
  {
    path: '/moaplace.com/admin/show/schedule/list',
    name: 'adminShowScheduleList',
    component: AdminShowScheduleList
  },
  {
    path: '/moaplace.com/admin/show/schedule/detail',
    name: 'adminShowScheduleDetail',
    component: AdminShowScheduleDetail
  },
  {
    path: '/moaplace.com/admin/show/schedule/insert',
    name: 'adminShowScheduleInsert',
    component: AdminShowScheduleInsert
  },
  {
    path: '/moaplace.com/admin/show/schedule/update',
    name: 'adminShowScheduleUpdate',
    component: AdminShowScheduleUpdate
  },
  //관리자기능-예매관리
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

  //관리자 기능- 새소식
  {
    path: '/moaplace.com/admin/news/list',
    name: 'adminNewsList',
    component: AdminNewsList
  },
  {
    path: '/moaplace.com/admin/news/detail/:member_num/:notice_num',
    name: 'adminNewsDetail',
    component: AdminNewsDetail
  },
  {
    path: '/moaplace.com/admin/news/insert',
    name: 'adminNewsInsert',
    component: AdminNewsInsert
  },
  // 관리자 페이지 - 회원관리 / 공연, 대관 차트
  {
    path: '/moaplace.com/admin/member/info',
    name: 'adminMemberInfo',
    component: AdminMemberInfo
  },
  {
    path: '/moaplace.com/admin/reserve/chart',
    name: 'adminReserveChart',
    component: AdminRentalChart
  },
  {
    path: '/moaplace.com/admin/show/chart',
    name: 'adminShowChart',
    component: AdminShowChart
  },
  {
    path: '/moaplace.com/admin/news/update/:notice',
    name: 'AdminNewsUpdate',
    component: AdminNewsUpdate
  },

  // 예매페이지
  {

    path: '/moaplace.com/booking/select/:num',
    name: 'bookingSelect',
    component: BookingSelect
  },
  {
    path: '/moaplace.com/booking/seat',
    name: 'bookinseat',
    component: SeatSelect
  },
  {
    path: '/moaplace.com/booking/count',
    name: 'bookingCount',
    component: BookingCount
  },
  {
    path: '/moaplace.com/booking/payment',
    name: 'PaymentView',
    component: PaymentView
  },
  {
    path: '/moaplace.com/booking/done/:booking_num',
    name: 'paymentDone',
    component: PaymentDone
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes
})

router.beforeEach( (to, from, next) => {
  // console.log("navigation guard from ", from);
  // console.log("navigation guard to ", to);
  // console.log("includes admin ", to.path.includes('admin'));

  let token = localStorage.getItem('access_token');
  let role = localStorage.getItem('user');

  if(to.path.includes('mypage') || to.path.includes('booking') 
    || to.path.includes('/board/qna') || to.path.includes('/rental/insert')) {
    if(token == null) {
      alert('로그인 후 이용 가능합니다.');
      next('/moaplace.com/users/login');
      return;
    }
  }

  // 관리자 페이지 접근 설정
  if(to.path.includes('admin')) {
    if(token == null) {
      alert('로그인 후 이용 가능합니다.');
      next('/moaplace.com');
      return;
    }
    if(role != 'redm') {
      alert('권한없이 관리자 페이지에 접근할 수 없습니다.');
      next('/moaplace.com');
      return;
    }
  }
  // console.log("navigation guard next ", );
  next();
})

export default router