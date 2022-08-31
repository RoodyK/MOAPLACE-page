import { createStore } from 'vuex'
import booking from './booking.js'
import login from './login.js'
import mypage from './mypage.js'

export default createStore({
  modules: {
    booking,
    mypage, // 마이페이지
    login
  }
})
