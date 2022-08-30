<template>
  <section class="find-id">
  <AppHeader/>
  <SideVisual menu="FIND ID" img="login"/>

    <div class="inner">
      <div class="title">
        <h2>아이디 찾기</h2>
        <span>아이디 찾기를 위해 아래 정보를 정확하게 입력해주세요.</span>
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

      <form @submit.prevent>
        <div class="info">
          <div class="explain">
            <p>본인인증에 사용했던 이메일로 아이디를 보내드립니다.</p>
          </div>
          <div class="name">
            <label for="nameInput">이름</label>
            <input type="text" class="nameInput" id="nameInput" v-model="inputName">
            <div class="nameHelp help"></div>
          </div>
          <div class="email">
            <label for="emailInput">이메일</label>
            <input type="text" class="emailInput" id="emailInput" v-model="inputEmail">
            <div class="emailHelp help"></div>
          </div>
          <div class="info-btn">
            <button type="button" @click="findById()">
              이메일로 아이디 전송
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
      inputName: '',
      inputEmail: ''
    }
  },
  mounted() {
    document.querySelector('form').reset();
  },
  methods: {
    findById() {
      if (this.inputName == null || this.inputName == "") {
        document.querySelector(".nameHelp").innerText = "이름을 입력하세요.";
        return;
      }
      document.querySelector(".nameHelp").innerText = "";

      if (this.inputEmail == null || this.inputEmail == "") {
        document.querySelector(".emailHelp").innerText = "이메일을 입력하세요..";
        return;
      }
      document.querySelector(".emailHelp").innerText = "";

      const info = {
        name: this.inputName,
        email: this.inputEmail
      }

      axios.post("/moaplace.com/users/login/find/id",
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
        alert("아이디와 이메일을 다시 확인하세요.");
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
          border: 1px solid $brown;
          border-bottom: none;
          a {
            color: $brown;
          }
        }
        &:last-child li {
          border-bottom: 1px solid $brown;
          a {
            color: #333;
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