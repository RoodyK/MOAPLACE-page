<template>
  
  <section class="login-page">
    <AppHeader/>
    <SideVisual menu="LOGIN" img="login"/>
    <div class="inner">

      <div class="title">
        <h2><strong>MOA PLACE</strong> 회원 로그인</h2>
      </div>
      <form @submit.prevent>
        <div class="login">
          <div class="id">
            <input type="text" name="id" id="id" placeholder="아이디를 입력하세요." v-model="loginId" />
          </div>

          <div class="pwd">
            <input type="password" name="pwd" id="pwd" placeholder="비밀번호를 입력하세요." autocomplete="off" v-model="loginPwd"/>
          </div>

          <button type="button" class="login-btn" @click="isLogin()">로그인</button>
        </div>
      </form>

      <div class="searches">
        <div class="search"
          v-for="search in searches" :key="search.name">
          <RouterLink :to="search.href">
            {{search.name}}
          </RouterLink>
        </div>
      </div>

      <!-- <div class="kakao-login">
        <button type="button" @click="kakaoLogin()">
          <div class="img"></div>
          <p>Kakao 로그인</p>
        </button>
      </div> -->

      <div class="kakao-login">
        <a :href="kakaoLogin">
          <div class="img"></div>
          <p>Kakao 로그인</p>
        </a>
      </div>

      <!-- <div class="google-login">
        <button>
          <div class="img"></div>
          <p>Google 로그인</p>
        </button>
      </div> -->

      <!-- <div class="google-login">
        <a>
          <div class="img"></div>
          <p>Google 로그인</p>
        </a>
      </div> -->
      
    </div>
    <AppFooter/>
  </section>
 
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  mounted() {
    
  },
  data() {
    return {
      loginId: "",
      loginPwd: "",
      searches: [
        {
          name : '아이디 찾기',
          href : '/moaplace.com/users/login/findid'
        },
        {
          name : '비밀번호 찾기',
          href : '/moaplace.com/users/login/findpwd'
        },
        {
          name : '회원가입',
          href : '/moaplace.com/users/join/same'
        }
      ],
      client_id : "88cd0c5be8453ab8d6153e082caf4cb0",
      redirect_uri : 'http://localhost:8080/moaplace.com/users/join/main'
    }
  },
  computed: {
    kakaoLogin() {
      return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=account_email,gender`
    }
  },
  methods: {
    // kakaoLogin() {
      
    //   window.Kakao.Auth.login({
    //       // 동의항목 페이지에 있는 활성화된 추가 동의 항목 ID값
    //       scope:"account_email, gender",
    //       // 로그인 성공 시 토큰을 받을 콜백함수
    //       success: function(response){
    //         console.log(response);
    //         // 카카오 사용자 정보 가져오기
    //         window.Kakao.API.request({
    //           // url은 고정
    //           url:'/v2/user/me',
    //           success: res => {
    //             // 사용자 정보 가져오기(동작확인을 위하여 콘솔로 출력)
    //             // 사용자 정보는 자신이 원하는 방식으로 ajax나 form태그를 활용해서 처리하면 됨.
    //             console.log(res.kakao_account);
                
    //           },
    //           // API호출이 실패할 때 실행되는 콜백함수
    //           fail: function(){
    //             alert('카카오 로그인에 실패했습니다.');
    //           }
    //         });
    //       }
    //     });
    // },
    async isLogin() {
      if(this.loginId == null || this.loginId == "") {
        alert("아이디를 입력하세요.");
        document.querySelector("#id").focus();
        return;
      }

      if(this.loginPwd == null || this.loginPwd == "") {
        alert("비밀번호를 입력하세요.");
        document.querySelector("#pwd");
        return;
      }
      this.$store.dispatch("login/memberLogin", {
        id: this.loginId,
        pwd: this.loginPwd
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

.login-page {
  .inner {
    width: 1100px;
    display : flex; 
    flex-direction: column;
    position: relative;
    margin: 50px auto 0;

    .title {
      h2 {
        font-size : 30px;
        margin: 20px 0;
        text-align: center;
      }
    }
    
    .login {
      text-align: center;
      .id, .pwd {
        margin-bottom: 20px;
      }
      input {
        width: 400px;
        height: 70px;
        padding: 5px;
        font-size: 24px;
        padding: 10px;
      }
      .login-btn {
        width: 400px;
        height: 70px;
        font-size: 22px;
        background-color: $brown;
        margin-bottom: 12px;
        border: 2px solid #c2c2c2;
        color: #fff;
        transition: .4s;
      }
      
    }

    .searches {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
      font-size: 18px;
      .search {
        margin-right: 15px;
        a {
          color: $brown;
          text-decoration: none;
        }
      }
      .search:last-child {
        margin-right: 0;
      }
    }

    .kakao-login, .google-login {
      margin: 0 auto;
      a {
        display: block;
        width: 400px;
        height: 70px;
        border: none;
        font-size: 22px;
        font-weight: 500;
        padding: 0;
        position: relative;
        box-shadow: 2px 3px 5px #ccc;
        p {
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }
      }
    }
    .kakao-login {
      margin-bottom: 20px;
      a {
        background-color: #FEE500;
        .img {
          width: 40px;
          height: 35px;
          background: url(@/assets/login/kakao-login.png) no-repeat;
          background-size: cover;
          position: absolute;
          top: 18px;
          left: 20px;
        }
      }
    }
    .google-login {
      margin-bottom: 100px;
      a {
        background-color: #fff;
        .img {
          width: 55px;
          height: 50px;
          background: url(@/assets/login/google-login.jpg) no-repeat;
          background-size: cover;
          position: absolute;
          top: 10px;
          left: 12px;
        }
      }
    }
  }
}

</style>