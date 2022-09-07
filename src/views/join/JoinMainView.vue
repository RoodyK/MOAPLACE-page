<template>
  <section class="join-all">
    <AppHeader />
    <SideVisual menu="JOIN" img="login"/>

    <div class="inner">
      <div class="title">
        <span>MOA PLACE</span>
      </div>

      <JoinOrder order="정보입력" />

      <form @submit.prevent>
        <div class="join">
          <div class="id">
            <label for="idInput">아이디</label>
            <input type="text" class="idInput" id="idInput" placeholder="6~20 영문자, 숫자만 사용" maxlength="20" @keyup="idCheck()" />
            <div class="idHelp help"></div>
          </div>
          <div class="pwd">
            <label for="pwdInput">비밀번호</label>
            <input type="password" class="pwdInput" id="pwdInput" placeholder="8~20 영문자, 숫자, 특수문자를 하나이상 사용" maxlength="20" autocomplete="off">
            <div class="pwdHelp help"></div>
          </div>
          <div class="confirmPwd">
            <label for="confirmPwdInput">비밀번호 확인</label>
            <input type="password" class="confirmPwdInput" id="confirmPwdInput" placeholder="입력하신 비밀번호와 동일한 비밀번호를 입력하세요." maxlength="20" autocomplete="off">
            <div class="confirmPwdHelp help"></div>
          </div>
          <div class="email">
            <label for="emailInput">이메일</label>
            <input type="text" class="emailInput" id="emailInput" placeholder="example@naver.com">
            <button type="button" class="emailAuth" @click="emailAuth()">이메일 인증</button>
            <div class="emailHelp help"></div>
          </div>
          <div class="authentication">
            <label for="authenticationInput">인증번호</label>
            <input type="text" class="authenticationInput" id="authenticationInput">
            <button type="button" @click="confirmEmailAuth()">인증번호 확인</button>
            <div class="authenticationHelp help"></div>
          </div>
          <div class="name">
            <label for="nameInput">이름</label>
            <input type="text" class="nameInput" id="nameInput" placeholder="1자 이상 한글만 사용" maxlength="8">
            <div class="nameHelp help"></div>
          </div>
          <div class="gender">
            <label>성별</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">남성</label>
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">여성</label>
            <div class="genderHelp help"></div>
          </div>
          <div class="birth">
            <label for="birthInput">생년월일</label>
            <input type="text" class="birthInput" id="birthInput" placeholder="ex)990101" maxlength="6">
            <div class="birthHelp help"></div>
          </div>
          <div class="phone">
            <label for="phoneInput">전화번호</label>
            <input type="text" class="phoneInput" id="phoneInput" placeholder="ex)000-0000-0000" maxlength="13">
            <div class="phoneHelp help"></div>
          </div>
          <div class="address">
            <label for="addressInput">주소</label>
            <input type="text" id="postcode" placeholder="우편번호" @click="sample6_execDaumPostcode()">
            <button type="button" @click="execDaumPostcode()">우편번호 찾기</button>
            <input type="text" id="address" placeholder="주소"><br>
            <input type="text" id="detailAddress" placeholder="상세주소">
            <div class="postcodeHelp help"></div>
          </div>
          <div class="join-btn">
            <button type="button" @click="revert()">취소</button>
            <button type="button" @click="joinOk()">회원가입</button>
          </div>

        </div>
      </form>
    </div>
    
    <AppFooter />
  </section>

</template>

<script>
import axios from "@/axios/axios.js"
import orgAxios from "axios"
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
  },
  data() {
    return {
      isAuthentication: false, // 이메일 인증완료되었는지 체크
      authNumber: 0, // 인증번호
      isDuplication: false, // 아이디 중복 여부
      client_id : process.env.VUE_APP_KAKAO_API_KEY,
      redirect_uri : process.env.VUE_APP_KAKAO_REDIRECT_URI,
      kakaoEmail : '',
      kakaoJoin : false
    }
  },
  created() {
  },
  async mounted() {
    let formEl = document.querySelector("form");
    formEl.reset();

    // 카카오 API 회원가입 및 로그인 처리
    let code = new URLSearchParams(location.search).get("code");
    if(code != null) {
      // 카카오 access_token 얻어오기
      const response = await orgAxios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.VUE_APP_KAKAO_API_KEY}&redirect_uri=${process.env.VUE_APP_KAKAO_REDIRECT_URI}&code=${code}`);
      
      // access_token으로 정보 얻어오기
      const kakaoInfo = await orgAxios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization : `Bearer ${response.data.access_token}`
        }
      });
      this.kakaoEmail = kakaoInfo.data.kakao_account.email;
      formEl.emailInput.value = this.kakaoEmail;
      const email = {
        email : kakaoInfo.data.kakao_account.email
      }
      const kakaoJoinCheck = await axios.post("/moaplace.com/users/login/api/kakao",
        JSON.stringify(email), {
          headers: {
            "Content-Type" : "application/json"
          }
        }
      );

      let data = kakaoJoinCheck.data.result;
      if(data != "using"){
        this.$store.dispatch('login/kakaoLogin', data)
      }else {
        this.kakaoJoin = true;
        this.isAuthentication = true;
        document.querySelector('.emailAuth').disabled = true;
        document.querySelector('.emailInput').setAttribute('readonly', 'true');
      }
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
    },
    // 취소 = 메인으로 이동
    revert() {
      this.$router.push("/moaplace.com")
    },
    // 아이디 중복검사
    idCheck() {
      const idEl = document.querySelector("#idInput");
      const idHelp = document.querySelector(".idHelp");

      // 아이디 정규식 (영어, 숫자만 사용 6글자 이상)
      let regExpId = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

      if(!regExpId.test(idEl.value)){
        idHelp.innerText = "영문자 및 숫자만 사용하여 6자이상 16자 이하로 입력하세요";
        idEl.focus();
        return;
      }
      idHelp.innerText = "";

      axios.get("/moaplace.com/users/join/checkId/"+ idEl.value)
      .then(function(response) {
        if(response.data == "duple") {
          idHelp.innerText = "중복된 아이디 입니다.";
          this.isDuplication = false;
        }else {
          idHelp.innerText = "사용가능한 아이디 입니다.";
          this.isDuplication = true;
        }
      }.bind(this));
    },
    // 이메일 인증번호 발송
    emailAuth() {
      let email = document.querySelector("form").emailInput;
      let regExpEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      let emailHelp = document.querySelector(".emailHelp");

      if(!regExpEmail.test(email.value)) {
        emailHelp.innerText = "이메일 양식에 맞지 않습니다.";
        email.focus();
        return;
      }
      emailHelp.innerText = "인증번호가 전송되었습니다.";

      document.querySelector(".authentication").style.display = "block";

      axios.post("/moaplace.com/users/join/email/auth", {
        email: email.value }, {
      })
      .then((response) => {
        this.authNumber = response.data;
      });
    },
    // 이메일 인증 확인
    confirmEmailAuth() {
      const authenticationInputEl = document.querySelector("#authenticationInput");
      const authenticationHelpEl = document.querySelector(".authenticationHelp");

      if(this.authNumber == authenticationInputEl.value) {
        this.isAuthentication = true;
        authenticationHelpEl.innerText = "이메일이 인증되었습니다.";
        return;
      }
      authenticationHelpEl.innerText = "인증번호가 올바르지 않습니다.";
      authenticationInputEl.focus();
    },
    // 회원가입 유효성 검사
    joinOk() {
      const formEl = document.querySelector("form");

      let id = formEl.idInput;
      let pwd = formEl.pwdInput;
      let confirmPwd = formEl.confirmPwdInput;
      let email = formEl.emailInput;
      let name = formEl.nameInput;
      let gender = formEl.gender;
      let birth = formEl.birthInput;
      let phone = formEl.phoneInput;
      let postcode = formEl.postcode;
      let address = formEl.address;
      let detailAddress = formEl.detailAddress;
      let totalAddress = "";

      // 아이디 정규식 (영어, 숫자만 사용 6글자 이상)
      let regExpId = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
      // 비밀번호 정규식(영문자, 숫자, 특수문자 하나이상 8~16글자)
      let regExpPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      // 이메일 정규식
      // let regExpEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      // 이름 정규식(한글만 사용가능)
      let regExpName = /^[가-힣]{2,4}$/;
      // 생년월일 정규식 (숫자만 사용가능)
      let regExpBirth = /^[0-9]{6}$/;
      // 전화번호 정규식(숫자- 조합)
      let regExpPhone = /\d{2,3}-\d{3,4}-\d{4}/g;
      // 닉네임 정규식(숫자,한글,영문자만 사용가능)
      // let regExpNickName = /^[0-9가-힣a-zA-Z]*$/;
      // 우편번호 정규식(숫자만 가능)
      let regExpPostcode = /^[0-9]{1,8}$/;
      // 주소 정규식(숫자, 한글 공백만 가능 )
      let regExpAddress = /^[0-9가-힣- ]{1,30}$/;


      let idHelp = document.querySelector(".idHelp");
      let pwdHelp = document.querySelector(".pwdHelp")
      let confirmPwdHelp = document.querySelector(".confirmPwdHelp");
      let emailHelp = document.querySelector(".emailHelp");
      // let authenticationHelp = document.querySelector(".authenticationHelp");
      let nameHelp = document.querySelector(".nameHelp");
      // let genderHelp = document.querySelector(".genderHelp");
      let birthHelp = document.querySelector(".birthHelp");
      let phoneHelp = document.querySelector(".phoneHelp");
      let postcodeHelp = document.querySelector(".postcodeHelp");

      if(!regExpId.test(id.value)) {
        idHelp.innerText = "영문자 및 숫자만 사용하여 6자이상 16자 이하로 입력하세요";
        id.focus();
        window.scrollTo(0, 400);
        return;
      }
      idHelp.innerText = "";

      if(!this.isDuplication) {
        idHelp.innerText = "아이디 중복을 확인하세요.";
        window.scrollTo(0, 400);
        return;
      }
      idHelp.innerText = "";

      if(!regExpPassword.test(pwd.value)) {
        pwdHelp.innerText = "영문자, 숫자, 특수문자 하나이상 사용, 8자이상 20자 이하로 입력하세요.";
        pwd.focus();
        window.scrollTo(0, 400);
        return;
      }
      pwdHelp.innerText = "";

      if(pwd.value != confirmPwd.value) {
        confirmPwdHelp.innerText = "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        confirmPwd.focus();
        window.scrollTo(0, 400);
        return;
      }
      confirmPwdHelp.innerText = "";

      if(!this.isAuthentication) {
        emailHelp.innerText = "이메일 인증을 진행하세요.";
        email.focus();
        window.scrollTo(0, 700);
        return;
      }
      emailHelp.innerText = ""

      if(!regExpName.test(name.value)) {
        nameHelp.innerText = "이름을 양식에 맞게 입력하세요(1자 이상 한글)";
        name.focus();
        window.scrollTo(0, 700);
        return;
      }
      nameHelp.innerText = "";

      if(!regExpBirth.test(birth.value)) {
        birthHelp.innerText = "생년월일 양식에 맞게 입력하세요 ex)990101";
        birth.focus();
        return;
      }
      birthHelp.innerText = "";

      if(!regExpPhone.test(phone.value)) {
        phoneHelp.innerText = "전화번호 양식에 맞게 입력하세요 ex)000-0000-0000"
        phone.focus();
        return;
      }
      phoneHelp.innerText = "";

      if(!regExpPostcode.test(postcode.value)) {
        postcodeHelp.innerText = "우편변호 양식이 올바르지 않습니다.";
        postcode.focus();
        return;
      }

      if(!regExpAddress.test(address.value)) {
        postcodeHelp.innerText = "주소 양식이 올바르지 않습니다.";
        address.focus();
        return;
      }
      postcodeHelp.innerText = "";

      // 전체 주소 합치기
      totalAddress = postcode.value + " " + address.value;
      if(detailAddress.value != null && detailAddress.value != "") {
        totalAddress = totalAddress + " " + detailAddress;
      }


      let memberRequest;
      if(this.kakaoJoin) {
        memberRequest = {
          member_num: 0,
          member_id: id.value,
          member_pwd: pwd.value,
          member_email: email.value,
          member_name: name.value,
          member_gender: gender.value,
          member_birth: birth.value,
          member_phone: phone.value,
          member_address: totalAddress,
          api: "using"
        }
      }else {
        memberRequest = {
          member_num: 0,
          member_id: id.value,
          member_pwd: pwd.value,
          member_email: email.value,
          member_name: name.value,
          member_gender: gender.value,
          member_birth: birth.value,
          member_phone: phone.value,
          member_address: totalAddress,
          api: "none"
        }
      }

      axios.post("/moaplace.com/users/join/result",
        JSON.stringify(memberRequest), {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then((response) => {
        if(response.data == "success") {
          this.$router.push("/moaplace.com/users/join/success");
        }
      })
      .catch(() => {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.')
      })

    },
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
        margin: 50px 0 40px;

        span {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 3px;
        }
      }

      form {
        .join {
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
            font-size: 20px;
            padding: 10px;
            color: #333;
            margin-bottom: 3px
          }

          .authentication {
            display: none;
          }
          .email, .authentication {
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
            .postcodeHelp {
              position:absolute;
              top: 210px;
              right: 0;
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