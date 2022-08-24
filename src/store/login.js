import axios from '@/axios/axios.js';

export default {
  namespaced: true,
  state() {
    return {
      userInfo: null,
      isLogin: false
    }
  },
  getters: {

  },
  // methods 역할
  // state의 값을 변경해주는 용도 commit()을 사용해서 실행
  mutations: {

  },
  // method 역할
  actions: {
    memberLogin({ commit }, payload) {
      console.log(commit, payload);
      const login = {
        member_id: payload.id,
        member_pwd: payload.pwd
      }

      axios.post("/moaplace.com/users/login/result",
      JSON.stringify(login), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      })
    }
  }
}