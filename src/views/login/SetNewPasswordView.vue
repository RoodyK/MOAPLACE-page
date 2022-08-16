<template>
  <section class="find-id">
    <AppHeader />
    <SideVisual menu="SET PASSWORD" img="cs"/>

    <div class="inner">

      <div class="title">
        <h2>비밀번호 재설정</h2>
        <span>비밀번호와 비밀번호 확인을 정확히 입력해주세요.</span>
      </div>

      <form action="" @enter.prevent>
        <div class="info">
          <div class="id">
            <label for="idInput">아이디</label>
            <input type="text" class="idInput" id="idInput">
            <div class="idHelp help">asdasdasd</div>
          </div>
          <div class="pwd">
            <label for="pwdInput">비밀번호</label>
            <input type="text" class="pwdInput" id="pwdInput">
            <div class="pwdHelp help">asdasdasd</div>
          </div>
          <div class="confirmPwd">
            <label for="confirmInput">비밀번호 확인</label>
            <input type="text" class="confirmPwdInput" id="confirmInput">
            <div class="confirmPwdHelp help">asdasdasd</div>
          </div>
          <div class="info-btn">
            <button>비밀번호 재설정</button>
          </div>

        </div>
      </form>

    </div>

    <AppFooter />
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
  data() {
    return {
      find: [
        {
          name: '아이디 찾기',
          href: '/login/findid'
        },
        {
          name: '비밀번호 찾기',
          href: '/login/findpwd'
        }
      ]
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