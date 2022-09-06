<template>
  <div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="내 정보 수정" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">내 정보 수정</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">아이디</th>
                  <td>
                    <input type="text" class="form-control mytxtform disform" name="id" :placeholder="member.id" disabled>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">이메일</th>
                  <td>
                    <input type="text" class="form-control mytxtform disform" name="email" :placeholder="member.email" disabled>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">이름</th>
                  <td>
                    <input type="text" class="form-control mytxtform" name="name" id="nameInput" placeholder="1자 이상 한글만 사용" maxlength="8" v-model="updateName"> {{ nameHelp }}
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">비밀번호</th>
                  <td>
                    <input type="password" class="form-control mytxtform" name="pwd" id="pwdInput" placeholder="8~20 영문자, 숫자, 특수문자를 하나이상 사용" maxlength="20" autocomplete="off" v-model="updatePwd"> {{ pwdHelp }}
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">비밀번호 확인</th>
                  <td>
                    <input type="password" class="form-control mytxtform" name="pwdcheck" id="confirmPwdInput" placeholder="입력한 비밀번호와 같은 비밀번호를 입력하세요." maxlength="20" autocomplete="off" v-model="updatePwdCheck"> {{ confirmPwdHelp }}
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">성별</th>
                  <td>
                    <div class="myradio">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="male" value="male" v-model="updateGender">
                        <label class="form-check-label" for="male">
                          남성
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="female" value="female" v-model="updateGender">
                        <label class="form-check-label" for="female">
                          여성
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- <tr>
                  <th class="col-md-2 text-center descth">생년월일</th>
                  <td>
                    <input type="date" class="form-control mytxtform" name="birth" :value="member.birth">
                  </td>
                </tr> -->
                <tr>
                  <th class="col-md-2 text-center descth">전화번호</th>
                  <td>
                    <input type="text" class="form-control mytxtform" name="phone" id="phoneInput" placeholder="ex)000-0000-0000" maxlength="13" v-model="updatePhone"> {{ phoneHelp }}
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">주소</th>
                  <td>
                    <div class="myaddr">
                      <input type="text" id="postcode" class="form-control mytxtform smallform" placeholder="우편번호" disabled>
                      <button type="button" class="btn btn-outline-secondary fw-bold mybtn2" @click="execDaumPostcode()">우편번호 찾기</button>
                    </div>
                    <div>
                      <input type="text" id="address" class="form-control mytxtform bigform" placeholder="주소" disabled>
                      <input type="text" id="detailAddress" class="form-control mytxtform bigform" placeholder="상세주소">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center btnmargin">
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn" @click="revert()">취소</button>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn2" @click="updateOk()">수정</button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter/>
  </div>
</template>

<script>
import axios from '@/axios/axios.js'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import MySideMenu from '@/components/users/MySideMenu.vue'

export default {
  name: 'MyInfoEditView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return {

      member : {}, // 회원정보

      // 수정된 데이터
      updateName : '',
      updatePwd : '',
      updatePwdCheck : '',
      updateGender : '',
      updatePhone : '',
      updateAddr : '',

      // 유효성검사
      nameHelp : '',
      pwdHelp : '',
      confirmPwdHelp : '',
      phoneHelp : '',

    }
  },
  computed: {
  },
  created(){

    // 회원정보조회
    let token = localStorage.getItem("access_token");
    if(token == null) return;

    const config = {
      headers: {
        "Authorization" : token
      }
    }

    axios.get("/moaplace.com/users/login/member/info", config)
    .then(response => {
      let data = response.data;
      const info = {
        num: data.member_num,
        id: data.member_id,
        pwd: data.member_pwd,
        email: data.member_email,
        name: data.member_name,
        gender: data.member_gender,
        phone: data.member_phone,
        address: data.member_address,
        point: data.member_point
      }
      // console.log(info);

      this.member = info;
      // console.log("회원 정보 : ",this.member);

      // 적립금 천단위 콤마형식으로 변환
      var point = this.member.point;
      this.member.point = point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      // gender로 updateGender 초기화
      this.updateGender = this.member.gender;
      // 수정전 이름 초기화
      this.updateName = this.member.name;
      // 수정전 전화번호 초기화
      this.updatePhone = this.member.phone;

    })
    .catch(error => {
      console.log(error.message);
    })

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

    // 취소 = 마이페이지 메인으로 이동
    revert() {
      this.$router.push("/moaplace.com/users/mypage")
    },

    // 정보수정 유효성 검사
    updateOk() {
      // console.log("이름:", this.updateName);
      // console.log("비번:", this.updatePwd);
      // console.log("비번확인:", this.updatePwdCheck);
      // console.log("성별:", this.updateGender);
      // console.log("전화:", this.updatePhone);
      // console.log("주소:", this.updateAddr);

      // if(this.updateName == this.member.name) {
      //   console.log("이름이 안바뀜")
      // }

      // if(this.updateName == '') {
      //   console.log("이름이 null임");
      // }

      let name = this.updateName;
      let pwd = this.updatePwd;
      let confirmPwd = this.updatePwdCheck;
      let gender = this.updateGender;
      let phone = this.updatePhone;
      let address = '';
      
      if(document.getElementById('postcode').value != '') {
        address = document.getElementById('postcode').value + ' ' + document.getElementById("address").value + ' ' + document.getElementById("detailAddress").value;
      }
      
      // 이름 정규식(한글만 사용가능)
      let regExpName = /^[가-힣]{2,4}$/;
      // 비밀번호 정규식(영문자, 숫자, 특수문자 하나이상 8~16글자)
      let regExpPassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      // 전화번호 정규식(숫자- 조합)
      let regExpPhone = /\d{2,3}-\d{3,4}-\d{4}/g;

      if(!regExpName.test(name)) {
        this.nameHelp = "이름을 양식에 맞게 입력하세요(1자 이상 한글)";
        return;
      }
      this.nameHelp = '';

      if(!regExpPassword.test(pwd) && pwd != '') {
        this.pwdHelp = "영문자, 숫자, 특수문자 하나 이상 사용하여 8자이상 16자 이하로 입력하세요.";
        return;
      }
      this.pwdHelp = '';

      if(pwd != confirmPwd) {
        this.confirmPwdHelp = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
        return;
      }
      this.confirmPwdHelp = '';

      if(!regExpPhone.test(phone)) {
        this.phoneHelp = "전화번호 양식에 맞게 입력하세요 ex)000-0000-0000";
        return;
      }
      this.phoneHelp = '';

      const updateRequest = {
        member_num : this.member.num,
        member_name : name,
        member_pwd : pwd,
        member_gender : gender,
        member_phone : phone,
        member_address : address
      }

      // console.log(updateRequest);

      axios.post("/moaplace.com/users/mypage/info/edit",
        JSON.stringify(updateRequest), {
          headers: {
            "Content-Type" : "application/json"
          }
      }).then((resp) => {
        // console.log(resp.data);
        if(resp.data == "success") {

          alert('수정이 완료되었습니다.');
          this.$router.push("/moaplace.com/users/mypage");

        } else {
          alert('업데이트 오류');
        }
      })

    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

#wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(249, 249, 249);
  a {
    color: $black;
    text-decoration:none;
  }
  .fs-7 {
    font-size: 0.8em;
  }
  .black {
    color: $black;
  }
  .brown {
    color: $brown;
  }
  #box {
    display: flex;
    justify-content: center;
    width: $width;
    margin: 50px;
    .right {
      width: 100%;
      height: 100%;
      background-color: white;
      border: 2px solid #dbe2e8;
      padding: 30px;
      .myaddr {
        display: flex;
        button {
          margin-left: 10px;
          padding: 0px 20px;
          font-size: 1em;
        }
      }
      .form-check-input {
        margin-right: 5px;
        &:checked {
          background-color: $brown;
          border-color: $brown;
        }
      }
      .myradio {
        display: flex;
        .form-check {
          margin-right: 20px;
          margin-top: 4px;
          margin-bottom: 0px;
        }
      }
      .mytxtform {
        width: 300px;
        font-size: 1em;
        border-radius: 0%;
      }
      .smallform {
        width: 200px;
      }
      .bigform {
        width: 360px;
        margin-top: 5px;
      }
      .disform {
        background-color: rgb(249, 249, 249);
      }
      .btnmargin {
        margin-top: 30px;
      }
      .mybtn {
        color: $brown;
        border-color: $brown;
        background-color: white;
        padding: 5px 50px;
        border-radius: 0%;
        &:hover {
          color: white;
          background: $brown;
        }
      }
      .mybtn2 {
        color: white;
        border-color: $brown;
        background-color: $brown;
        padding: 5px 50px;
        margin-left: 20px;
        border-radius: 0%;
        &:hover {
          color: $brown;
          background: white;
          border-color: $brown;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .datenav {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 70px;
        margin: 30px 0px;
        .mydate {
          padding: 5px;
        }
        .datebtn {
          padding: 5px 20px;
          border: 1px solid gray;
          background-color: white;
        }
        .select {
          background-color: $brown;
          a {
            color: white;
          }
        }
        .resultbtn {
          margin-left: 10px;
          font-size: 1em;
        }
      }
      .table {
        th.col {
          background-color: $brown;
          color: white;
        }
        td {
          background-color: white;
          padding: 10px 20px;
        }
      }
      .myborder {
        th{
          border-bottom: 1px solid #dbe2e8;
          border-top: 1px solid #dbe2e8;
          background-color: rgb(249, 249, 249);
        }
        td{
          border-bottom: 1px solid #dbe2e8;
          border-top: 1px solid #dbe2e8;
        }
      }
      .ticket-table {
        vertical-align : middle;
      }
      .datenav {
        background-color: rgb(249, 249, 249);
      }
    }
  }
}
</style>