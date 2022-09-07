<template>
  <section class="find-id">
    <AppHeader />
    <SideVisual menu="SET PASSWORD" img="login"/>

    <div class="inner">

      <div class="title">
        <h2>비밀번호 재설정</h2>
        <span>비밀번호와 비밀번호 확인을 정확히 입력해주세요.</span>
      </div>

      <form @submit.prevent>
        <div class="info">
          <div class="id">
            <label for="idInput">아이디</label>
            <input type="text" class="idInput" id="idInput" :value="myId" readonly>
            <div class="idHelp help"></div>
          </div>
          <div class="pwd">
            <label for="pwdInput">비밀번호</label>
            <input type="password" class="pwdInput" id="pwdInput" autocomplete="off">
            <div class="pwdHelp help"></div>
          </div>
          <div class="confirmPwd">
            <label for="confirmPwdInput">비밀번호 확인</label>
            <input type="password" class="confirmPwdInput" id="confirmPwdInput" autocomplete="off">
            <div class="confirmPwdHelp help"></div>
          </div>
          <div class="info-btn">
            <button type="button" @click="newPasswordCheck()">
              비밀번호 재설정
            </button>
          </div>

        </div>
      </form>

    </div>

    <AppFooter />
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
      myId : '',
    }
  },
  created() {
    this.myId = this.$route.params.id;
  },
  mounted() {
  },
  methods: {
    newPasswordCheck() {
      const formEl = document.querySelector("form");

      let pwd = formEl.pwdInput;
      let confirmPwd = formEl.confirmPwdInput;

      let regExpPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

      let pwdHelp = document.querySelector(".pwdHelp")
      let confirmPwdHelp = document.querySelector(".confirmPwdHelp");

      if(!regExpPassword.test(pwd.value)) {
        pwdHelp.innerText = "영문자, 숫자, 특수문자 하나이상 사용, 8자이상 20자 이하로 입력하세요.";
        pwd.focus();
        return;
      }
      pwdHelp.innerText = "";

      if(pwd.value != confirmPwd.value) {
        confirmPwdHelp.innerText = "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        confirmPwd.focus();
        return;
      }
      confirmPwdHelp.innerText = "";

      const info = {
        member_id: this.myId,
        member_pwd: pwd.value
      }

      axios.post("/moaplace.com/users/login/reset/password",
        JSON.stringify(info), {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then(response => {
        if(response.data == "success") {
          alert("비밀번호가 변경되었습니다.");
          this.$router.push("/moaplace.com");
        }
      })
      .catch(() => {
        alert("비밀번호 변경에 실패했습니다.");
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
    margin: 100px auto;
    .title {
      margin: 50px 0;
      text-align: center;
      h2 {
        font-size : 36px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      span {
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
        input[type="text"],
        input[type="password"] {
          width: 75%;
          height: 60px;
          font-size: 24px;
          padding: 10px;
          color: #333;
          margin-bottom: 3px
        }
        .confirmPwd {
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