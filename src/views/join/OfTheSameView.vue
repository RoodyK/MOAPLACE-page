<template>
  <section class="same">
    <AppHeader />
    <SideVisual menu="JOIN" img="login"/>

    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <JoinOrder order="약관동의" />

      <div class="agree">
        <div class="check">
          <input type="checkbox" /><span> MOA 이용약관 동의(필수)</span>
        </div>
        <div>
          <OfTheSame />
        </div>
      </div>

      <div class="btn">
        <button type="button" @click="revert()">취소</button>
        <button type="button" @click="nextStep()">확인</button>
      </div>
    </div>

    <AppFooter />
  </section>
</template>

<script>
import OfTheSame from '@/components/join/TheSame.vue';
import JoinOrder from "@/components/join/JoinOrder.vue"
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    OfTheSame,
    JoinOrder,
    AppHeader,
    AppFooter,
    SideVisual
  },
  methods: {
    // 메인으로 돌아가기
    revert() {
      this.$router.push("/moaplace.com");
    },
    // 다음단계로 이동
    nextStep() {
      const checkedEl = document.querySelector("input[type='checkbox']").checked;
      if(checkedEl == false) {
        alert('약관동의 후 다음 단계로 이동 가능합니다.');
        return;
      }

      this.$router.push("/moaplace.com/users/join/main");
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/common.scss';

.same {
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

    .agree {
      width: 700px;
      margin: 0 auto 60px;
      letter-spacing: 1px;
      .check {
        display: flex;
        margin-bottom: 15px;
        input {
          margin-right: 10px;
          position: relative;
          top: 2px;
        }
        span {
          display: block;
        }
      }
      div {
        input {
          display: block;
          width: 20px;
          height: 20px;
        }
        span {
          color: rgb(170, 84, 50);
        }
      }
    }

    .btn {
      width: 700px;
      display: flex;
      margin: 0 auto;
      padding: 0;
      button {
        width: 100%;
        height: 65px;
        font-size: 1.5rem;
        border: none;
        margin-bottom: 100px;
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
</style>
