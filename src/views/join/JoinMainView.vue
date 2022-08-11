<template>
  <section class="join-all">
    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <div class="regist">
        <div class="box">약관동의</div>
        <div class="box active">정보입력</div>
        <div class="box">가입완료</div>
      </div>

      <div class="line">
        <div class="step"></div>
        <div class="step"></div>
        <div class="step"></div>
      </div>

      <form action="">
        <div class="join">
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
          <div class="email">
            <label for="emailInput">이메일</label>
            <input type="text" class="emailInput" id="emailInput">
            <button>이메일 인증</button>
            <div class="confirmPwdHelp help">asdasdasd</div>
          </div>
          <div class="name">
            <label for="nameInput">이름</label>
            <input type="text" class="nameInput" id="nameInput">
            <div class="nameHelp help">asdasdasd</div>
          </div>
          <div class="gender">
            <label>성별</label>
            <input type="radio" name="gender" id="male" checked>
            <label for="male">남성</label>
            <input type="radio" name="gender" id="female">
            <label for="female">여성</label>
            <div class="genderHelp help">asdasdasd</div>
          </div>
          <div class="birth">
            <label for="birthInput">생년월일</label>
            <input type="text" class="birthInput" id="birthInput">
            <div class="birthHelp help">asdasdasd</div>
          </div>
          <div class="phone">
            <label for="phoneInput">전화번호</label>
            <input type="text" class="phoneInput" id="phoneInput">
            <div class="phoneHelp help">asdasdasd</div>
          </div>
          <div class="address">
            <label for="addressInput">주소</label>
            <input type="text" id="postcode" placeholder="우편번호" @click="sample6_execDaumPostcode()">
            <button type="button" @click="execDaumPostcode()">우편번호 찾기</button>
            <input type="text" id="address" placeholder="주소"><br>
            <input type="text" id="detailAddress" placeholder="상세주소">
          </div>
          <div class="join-btn">
            <button>취소</button>
            <button>회원가입</button>
          </div>

        </div>
      </form>
    </div>
  </section>

</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      execDaumPostcode() {
        new window.daum.Postcode({
          oncomplete: function (data) {
            var addr = ''; // 주소 변수

            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
          }
        }).open();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/common.scss';

  .join-all {
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
          display: flex;
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
          border: 2px solid $brown;
          background-color: #fff;

          &:nth-child(1) {
            top: -10px;
            left: 80px;
          }

          &:nth-child(2) {
            top: -10px;
            left: calc(50% - 10px);
            background-color: $brown;
          }

          &:nth-child(3) {
            top: -10px;
            right: 80px;
          }
        }
      }

      form {
        input {
          &:focus {
            outline: 2px solid $brown;
          }
        }

        .join {
          width: 700px;
          display: flex;
          flex-direction: column;
          margin: auto;

          >div {
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

          .email {
            input {
              width: 50%;
              margin-right: 13px;
            }

            button {
              width: 23%;
              height: 60px;
              border: none;
              background-color: $brown;
              color: #fff;
              position: absolute;
              top: 0;
              right: 0;
            }
          }

          .gender {
            input {
              margin-right: 20px;
              width: 15px;
              height: 15px;
              outline: none;
            }
          }

          .address {
            position: relative;
            height: 250px;
            border: none;

            #postcode {
              width: 35%;
              margin-right: 70px;
              margin-bottom: 10px;
            }

            button {
              width: 30%;
              height: 60px;
              border: none;
              background-color: $brown;
              color: #fff;
              position: absolute;
              top: 0;
              right: 0;
            }

            input#address {
              position: absolute;
              right: 0;
              top: 70px;
            }

            #detailAddress {
              position: absolute;
              right: 0;
              top: 140px;
            }
          }

          .join-btn {
            width: 700px;
            display: flex;
            margin: 0 auto 100px;
            padding: 0;

            button {
              width: 100%;
              height: 65px;
              font-size: 24px;
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
    }
  }
</style>