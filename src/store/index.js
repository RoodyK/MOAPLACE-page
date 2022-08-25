import { createStore } from 'vuex'
import rental from '@/store/rental.js'
import login from './login.js'
import mypage from './mypage.js'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    rental,
    mypage // 마이페이지
    login
  }
})
