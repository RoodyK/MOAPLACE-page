<template>
  <section class="same">
    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <div class="regist">
        <div class="box active">약관동의</div>
        <div class="box">정보입력</div>
        <div class="box">가입완료</div>
      </div>
      
      <div class="line">
        <div class="step"></div>
        <div class="step"></div>
        <div class="step"></div>
      </div>

      <div class="agree">
        <div class="check">
          <input type="checkbox" /><span> MOA 이용약관 동의(필수)</span>
        </div>
        <div>
          <OfTheSame />
        </div>
      </div>

      <div class="btn">
        <button type="button">취소</button>
        <button type="button">확인</button>
      </div>
    </div>
  </section>
</template>

<script>
import OfTheSame from '@/components/join/TheSame.vue'

export default {
  components: {
    OfTheSame
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
      margin-bottom: 40px;
      span {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 3px;
      }
    }

    .regist {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      .box {
        font-size: 1.4rem;
        width: 180px;
        height: 60px;
        margin-right: 80px;
        display:flex;
        justify-content: center;
        align-items: center;
        border: 3px solid #777;
        box-sizing: border-box;
        position: relative;
        &.active {
          background-color: $brown;
          color: #fff;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .line {
      width: 700px;
      height: 3px;
      margin: 0 auto 100px;
      background-color: #000;
      position: relative;
      .step {
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        border:2px solid $brown;
        background-color: #fff;
        &:nth-child(1) {
          top:-10px;
          left: 80px;
          background-color: $brown;
        }
        &:nth-child(2) {
          top:-10px;
          left: calc(50% - 10px);
        }
        &:nth-child(3) {
          top: -10px;
          right: 80px;
        }
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
