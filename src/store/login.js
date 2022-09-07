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
    loginState(state){
      state.isLogin = true;
    },
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
    // 일반회원 로그인
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
          // localStorage에 토큰 저장
          localStorage.setItem("access_token", token);
          // 회원정보 읽어들이기
          await dispatch('getMemberRoles');
          router.push('/moaplace.com');
      }catch(error) {
        alert('아이디와 비밀번호를 다시 확인하세요.')
      }
    },
    // 카카오 로그인
    async kakaoLogin({ dispatch }, payload) {
      const { member_id, authority, member_email } = payload;

      const info = {
        member_id: member_id,
        member_email: member_email,
        authority: authority
      }

      try {
        const response = await axios.post("/moaplace.com/users/login/api/result",
        JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json"
          }
        });

        let token = response.data.token;
          // localStorage에 토큰 저장
        localStorage.setItem("access_token", token);
        // 회원정보 읽어들이기
        await dispatch('getMemberRoles');
        router.push('/moaplace.com');

      }catch(error) {
        alert('로그인중 에러가 발생했습니다.');
        router.push("/moaplace.com/users/login");
      }
    },
    // 사용자 권한 얻어오기
    async getMemberRoles({commit}) {
      
      let token = localStorage.getItem("access_token");
      if(token == null) return;

      try {
        const response = await axios.get("/moaplace.com/users/login/member/role");
        let data = response.data.roles;
        
        if(data == "ROLE_MEMBER") {
          localStorage.setItem("user", "remr");
        }else {
          localStorage.setItem("user", "redm");
        }

        commit('updateRoles', data);
        commit('loginState');
      }catch(error) {
        console.log(error)
      }
    },
    async getMemberInfo({ commit }) {
      // 토큰 꺼내기
      let token = localStorage.getItem("access_token");
      if(token == null) return;

      try {
        const response = await axios.get("/moaplace.com/users/login/member/info");

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
    checkLogin({commit}) {
      const token = localStorage.getItem("access_token");
      if(token == null) return;

      commit('loginState');
    },
    logout({commit}) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      commit('logout');
      router.push("/moaplace.com");
    },
    
  }
}