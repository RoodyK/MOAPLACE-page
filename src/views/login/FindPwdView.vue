<template>
  <section class="find-id">
    <AppHeader/>
    <SideVisual menu="FIND PWD" img="login"/>

    <div class="inner">

      <div class="title">
        <h2>비밀번호 찾기</h2>
        <span>비밀번호 찾기를 위해 아래 정보를 정확하게 입력해주세요.</span>
      </div>

      <div class="find">
        <ul class="choose" v-for="f in find" :key="f.name">
          <li>
            <RouterLink :to="f.href">
              {{ f.name }}
            </RouterLink>
          </li>
        </ul>
        
      </div>

      <form @enter.prevent>
        <div class="info">
          <div class="explain">
            <p>
              가입된 아이디와 이메일을 입력하시면 새로운 비밀번호 설정이 가능한 링크를 보내 드립니다.
            </p>
          </div>
          <div class="id">
            <label for="idInput">아이디</label>
            <input type="text" class="idInput" id="idInput" v-model="inputId">
            <div class="idHelp help"></div>
          </div>
          <div class="email">
            <label for="emailInput">이메일</label>
            <input type="text" class="emailInput" id="emailInput" v-model="inputEmail">
            <div class="emailHelp help"></div>
          </div>
          <div class="info-btn">
            <button type="button" @click="resetPassword()">
              비밀번호 재설정 링크 전송
            </button>
          </div>

        </div>
      </form>

    </div>

    <AppFooter/>
  </section>
</template>

<script>
import axios from '@/axios/axios.js'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data() {
    return {
      find: [
        {
          name: '아이디 찾기',
          href: '/moaplace.com/users/login/findid'
        },
        {
          name: '비밀번호 찾기',
          href: '/moaplace.com/users/login/findpwd'
        }
      ],
      inputId: "",
      inputEmail: ""
    }
  },
  mounted() {
    document.querySelector('form').reset();
  },
  methods: {
    resetPassword() {
      if (this.inputId == null || this.inputId == "") {
        document.querySelector(".idHelp").innerText = "아이디를 입력하세요.";
        return;
      }
      document.querySelector(".idHelp").innerText = "";

      if (this.inputEmail == null || this.inputEmail == "") {
        document.querySelector(".emailHelp").innerText = "이메일을 입력하세요..";
        return;
      }
      document.querySelector(".emailHelp").innerText = "";

      let info = {
        id: this.inputId,
        email: this.inputEmail
      }

      axios.post("/moaplace.com/users/login/find/pwd", 
        JSON.stringify(info), {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then(response => {
        if(response.data == "success") {
          alert("이메일을 확인하세요.");
        }
      })
      .catch(() => {
        alert("아이디와 이메일을 확인하세요.");
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

.find-id {
  .inner {
    width: 1100px;
    display : flex; 
    flex-direction: column;
    position: relative;
    margin: 50px auto;
    .title {
      margin: 50px 0;
      text-align: center;
      h2 {
        font-size : 32px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      span {
        font-size: 17px;
        color: rgba($black, .9);
      }
    }

    .find {
      width: 700px;
      margin: 20px auto;
      display: flex;
      .choose {
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        padding: 0;
        li {
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          a {
            text-decoration: none;
            display: block;
            padding: 20px 50px;
          }
        }
        &:first-child li{
          border-bottom: 1px solid $brown;
          a {
            color: #333;
          }
        }
        &:last-child li {

          border: 1px solid $brown;
          border-bottom: none;
          a {
            color: $brown;
          }
        }
      }
    }

    form {
      input {
        &:focus {
          outline: 2px solid $brown;
        }
      }

      .info {
        width: 700px;
        display: flex;
        flex-direction: column;
        margin: auto;

        > div {
          margin-bottom: 20px;
          border-bottom: 1px solid rgba($brown, .3);
          position: relative;

          .help {
            position: relative;
            left: 25%;
            color: #FF0000;
            margin-bottom: 10px;
          }

          &:last-child {
            border: none;
          }
        }

        label {
          width: 25%;
          font-size: 24px;
        }
        input[type="text"] {
          width: 75%;
          height: 60px;
          font-size: 24px;
          padding: 10px;
          color: #333;
          margin-bottom: 3px
        }
        .explain {
          margin-top: 30px;
        }
        .email {
          border-bottom: none;
          margin-bottom: 50px;
        }

        .info-btn {
          width: 700px;
          display: flex;
          margin: 0 auto 100px;
          padding: 0;

          button {
            width: 100%;
            height: 65px;
            font-size: 24px;
            border: none;
            background-color: $brown;
            color: #fff;

            &:hover {
              opacity: .9;
            }
          }
        }
      }
    }
  }
}

</style>