<template>
  <section class="login-page">
    <div class="inner">

      <div class="title">
        <h2><strong>MOA PLACE</strong> 회원 로그인</h2>
      </div>
      <from @enter.prevent>
        <div class="login">
          <div class="id">
            <input type="text" name="id" placeholder="아이디를 입력하세요." />
          </div>

          <div class="pwd">
            <input type="password" name="pwd" placeholder="비밀번호를 입력하세요." />
          </div>

          <button type="button" class="login-btn">로그인</button>
        </div>
      </from>

      <div class="searches">
        <div class="search"
          v-for="search in searches" :key="search.name">
          <RouterLink :to="search.href">
            {{search.name}}
          </RouterLink>
        </div>
      </div>

      <div class="kakao-login">
        <button>
          <img src="@/assets/login/kakao_login.png" alt="카카오로그인">
        </button>
      </div>

      <div class="google-login">
        <button>
          <img src="@/assets/login/google_login.png" alt="구글로그인">
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searches: [
        {
          name: '아이디 찾기',
          href: '/login/findid'
        },
        {
          name: '비밀번호 찾기',
          href: '/login/findpwd'
        },
        {
          name: '회원가입',
          href: '/join/same'
        }
      ]
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
    margin: 0 auto;
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
        border-radius: 10px;
        padding: 5px;
        font-size: 23px;
        padding: 10px;
      }
      input:focus {
        outline: 2px solid $brown;
      }
      .login-btn {
        width: 400px;
        height: 70px;
        font-size: 24px;
        border-radius: 10px;
        background-color: rgba($brown, .8);
        margin-bottom: 10px;
        border: 2px solid #c2c2c2;
        color: #fff;
        transition: .4s;
      }
      .login-btn:hover {
        background-color: rgba($brown, 1);
      }
      
    }

    .searches {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
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
      display: flex;
      justify-content: center;
      button {
        border: none;
      }
    }
    .kakao-login img, .google-login img {
      width: 400px;
      height: 80px;
      
    }
    .kakao-login {
      margin-bottom: 20px;
    }
  }
}

</style>