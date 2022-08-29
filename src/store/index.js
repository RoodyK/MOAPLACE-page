import { createStore } from 'vuex'
import rental from './rental.js'
import login from './login.js'
import mypage from './mypage.js'

export default createStore({
  modules: {
    rental,
    mypage, // 마이페이지
    login
  }
})
