<template>
  <section class="join-success">
    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <div class="regist">
        <div class="box">약관동의</div>
        <div class="box">정보입력</div>
        <div class="box active">가입완료</div>
      </div>
      
      <div class="line">
        <div class="step"></div>
        <div class="step"></div>
        <div class="step"></div>
      </div>

      <div class="complete">
        <div style="color: #D67747;" class="material-icons">check</div>
        <div class="box">
          <p>회원가입이 완료되었습니다.</p>
          <p>MOA PLACE에 가입하신 것을 환영합니다.</p>
          <div class="btn">
            <RouterLink to="/">홈으로</RouterLink>
            <RouterLink to="/">로그인</RouterLink>
          </div>
        </div>
      </div>
    </div>
    

  </section>
</template>

<script>
export default {

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
        }
        &:nth-child(2) {
          top:-10px;
          left: calc(50% - 10px);
        }
        &:nth-child(3) {
          top: -10px;
          right: 80px;
          background-color: $brown;
        }
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