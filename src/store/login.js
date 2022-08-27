import axios from '@/axios/axios.js';
import router from '@/router/index.js'

export default {
  namespaced: true,
  state() {
    return {
      userInfo: null,
      isLogin: false,
      userRoles: null
    }
  },
  getters: {
  },
  // methods 역할
  // state의 값을 변경해주는 용도 commit()을 사용해서 실행
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.userInfo = payload
    },
    updateRoles(state, payload) {
      state.userRoles = payload
    },
    logout(state) {
      state.isLogin = false;
      state.userInfo = null;
      state.userRoles = null;
    }
  },
  // method 역할
  actions: {
    async memberLogin({ dispatch }, payload) {
      const login = {
        member_id: payload.id,
        member_pwd: payload.pwd
      }

      try {
        const response = await axios.post("/moaplace.com/users/login/result",
        JSON.stringify(login), {
          headers: {
            "Content-Type": "application/json"
          }
        });

        let token = response.data.token;
          // console.log("토큰", token)
          // localStorage에 토큰 저장
          localStorage.setItem("access_token", token);
          // 회원정보 읽어들이기
          await dispatch('getMemberRoles');
          router.push('/moaplace.com');
      }catch(error) {
        alert('아이디와 비밀번호를 다시 확인하세요.')
      }
    },
    async getMemberRoles({commit}) {
      
      let token = localStorage.getItem("access_token");
      if(token == null) return;

      const config = {
        headers: {
          "Authorization" : token
        }
      }

      try {
        const response = await axios.get("/moaplace.com/users/login/member/role", config);
        let data = response.data.roles;

        if(data == "ROLE_MEMBER") {
          localStorage.setItem("user", "default");
        }else {
          localStorage.setItem("user", "special");
        }

        commit('updateRoles', data);
      }catch(error) {
        console.log(error)
      }
    },
    async getMemberInfo({ commit }) {
      // 토큰 꺼내기
      let token = localStorage.getItem("access_token");
      if(token == null) return;

      //헤더 설정
      const config = {
        headers: {
          "Authorization" : token
        }
      }

      try {
        const response = await axios.get("/moaplace.com/users/login/member/info", config);

        let data = response.data;
        // console.log(response.data);

        const info = {
          num: data.member_num,
          id: data.member_id,
          pwd: data.member_pwd,
          email: data.member_email,
          name: data.member_name,
          gender: data.member_gender,
          phone: data.member_gender,
          address: data.member_address,
          point: data.member_point
        }
        commit('loginSuccess', info);
        
        commit('updateRoles', response.data.roles);

        // router.push('/moaplace.com')

      }catch(error) {
        console.log(error);
      }

    },
    logout({commit}) {
      localStorage.removeItem("access_token");
      commit('logout');
      router.push("/moaplace.com");
    },
    
  }
}