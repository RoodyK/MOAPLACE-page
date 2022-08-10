<template>
  <section>
    <div class="inner">

      <div class="title">
        <span><strong>MOA PLACE</strong> 회원 로그인</span>
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
          href: '/user/findid'
        },
        {
          name: '비밀번호 찾기',
          href: '/users/findpwd'
        },
        {
          name: '회원가입',
          href: '/join'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

section {
  .inner {
    width: 500px;
    display : flex; 
    flex-direction: column;
    position: relative;
    margin: auto;
    .title {
      font-size : 24px;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .login {
      text-align: center;
      .id, .pwd {
        margin-bottom: 20px;
      }
      input {
        width: 350px;
        height: 60px;
        border-radius: 10px;
        padding: 5px;
        
      }
      input:focus {
        outline: 2px solid $brown;
      }
      .login-btn {
        width: 350px;
        height: 50px;
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
      font-size: 20px;
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
      width: 350px;
      height: 70px;
    }
    .kakao-login {
      margin-bottom: 20px;
    }
  }
}

</style>