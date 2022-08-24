<template>
  <section class="join-success">
    <AppHeader />
    <SideVisual menu="JOIN" img="login"/>

    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <JoinOrder order="가입완료" />

      <div class="complete">
        <div style="color: #D67747;" class="material-icons">check</div>
        <div class="box">
          <p>회원가입이 완료되었습니다.</p>
          <p>MOA PLACE에 가입하신 것을 환영합니다.</p>
          <div class="btn">
            <RouterLink to="/moaplace.com">홈으로</RouterLink>
            <RouterLink to="/moaplace.com/users/login">로그인</RouterLink>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </section>
</template>

<script>
import JoinOrder from "@/components/join/JoinOrder.vue"
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    JoinOrder,
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/common.scss';

.join-success {
  .inner {
    width: 1100px;
    margin: 0 auto;
    position: relative;
    .title {
      text-align: center;
      margin: 50px 0 40px;
      span {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 3px;
      }
    }
    
    .complete {
      width: 700px;
      height: 700px;
      margin: 0 auto;
      position: relative;
      .material-icons {
        font-size: 200px;
        display: flex;
        justify-content: center;
      }
      .box {
        width: 700px;
        height: 300px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        p {
          &:nth-child(1){
            font-size: 48px;
            text-align: center;
            padding-top: 15px;
          }
          &:nth-child(2) {
            font-size: 26px;
            color: rgba(#333, .7);
            text-align: center;
          }
        }
        .btn {
          display: flex;
          a {
            width: 100%;
            height: 65px;
            margin-top: 50px;
            font-size: 24px;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: darken($brown, 10%);
            background-color: $brown;
            color: #fff;
            &:first-child {
              margin-right: 15px;
              background-color: #b1b1b1;
              color: #fff;
            }
            &:last-child {
              background-color: $brown;
              color: #fff;
            }
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