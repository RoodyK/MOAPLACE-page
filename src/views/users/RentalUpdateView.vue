<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="대관내역" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">대관내역 수정</span>
          </div>
          <div class="desc">
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col end" colspan="2">신청 정보</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">대관신청자</th>
                  <td class="desctd">
                    <input type="text" id="rental_name" v-model="dto.rental_name">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">연락처</th>
                  <td class="desctd">
                    <input type="text" id="rental_phone" v-model="dto.rental_phone">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">E-mail</th>
                  <td class="desctd">
                    <input type="text" id="rental_email" v-model="dto.rental_email">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col end" colspan="2">공연 정보</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">공연명</th>
                  <td class="desctd">
                    <input type="text" id="rental_title" v-model="dto.rental_title">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장</th>
                  <td class="desctd">
                    <div>
                      <input class="radio-input" type="radio" value="1" id="hall01" v-model="dto.hall_num" name="hall">
                      <label class="radio-label" for="hall01">
                        모던홀
                      </label>
                      <input class="radio-input" type="radio" value="2" id="hall02"  v-model="dto.hall_num" name="hall">
                      <label class="radio-label" for="hall02">
                        오케스트라홀
                      </label>
                      <input class="radio-input" type="radio" value="3" id="hall03"  v-model="dto.hall_num" name="hall">
                      <label class="radio-label" for="hall03">
                        아트홀
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관희망일자</th>
                  <td class="desctd">
                    <input type="date" :min="getToday()" v-model="dto.rental_date">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관시작시간</th>
                  <td class="desctd">
                    <div style="display: flex;">
                      <div class="time-box">
                        <select v-model="dto.rental_time">
                          <option value="">시간선택</option>
                          <option 
                            v-for="time in times" 
                            :key="time"
                            :value="time">
                            {{time}}
                          </option>
                        </select>
                      </div>
                      <span class="helpSpan"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장르</th>
                  <td class="desctd">
                    <div>
                      <input type="radio" class="radio-input" name="genre" value="기악" v-model="dto.rental_genre" id="genre01" checked>
                      <label class="radio-label" for="genre01">
                          기악
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="대중음악"  v-model="dto.rental_genre" id="genre02">
                      <label class="radio-label" for="genre02">
                          대중음악
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="무용"  v-model="dto.rental_genre" id="genre03">
                      <label class="radio-label" for="genre03">
                          무용
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="뮤지컬"  v-model="dto.rental_genre" id="genre04">
                      <label class="radio-label" for="genre04">
                          뮤지컬
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="성악"  v-model="dto.rental_genre" id="genre05">
                      <label class="radio-label" for="genre05">
                          성악
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="연극"  v-model="dto.rental_genre" id="genre06">
                      <label class="radio-label" for="genre06">
                          연극
                      </label>
                      <input type="radio" class="radio-input" name="genre" value="오페라"  v-model="dto.rental_genre" id="genre07">
                      <label class="radio-label" for="genre07">
                          오페라
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">첨부파일</th>
                  <td class="desctd">
                    <input type="file" id="file" accept=".zip" @change="handleFileChange">
                    <div class="file-box">
                      <input type="text" class="file-input" v-model="dto.rental_originfilename" disabled>
                      <label for="file">첨부파일 등록</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자</th>
                  <td class="desctd">
                    <input type="text" id="rental_ownsname" v-model="dto.rental_ownsname">
                    <span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자 연락처</th>
                  <td class="desctd">
                    <input type="text" id="rental_ownsphone" v-model="dto.rental_ownsphone"><span class="helpSpan"></span><input type="text" id="rental_ownemail" v-model="dto.rental_ownemail"><span class="helpSpan"></span>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth"><div>기타 요청사항</div></th>
                  <td class="desctd">
                    <textarea cols="30" rows="5" v-model="dto.rental_content"></textarea>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">진행상태</th>
                  <td class="desctd">{{ dto.rental_state }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="text-center btnmargin">
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn" @click="onSubmit()">수정완료</button>
          <RouterLink :to="`/moaplace.com/users/mypage/rental/detail/${ rental_num }`">
            <button type="button" class="btn btn-outline-secondary fw-bold mybtn2" @click="revert()">수정취소</button>
          </RouterLink>
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
  name: 'MyRentalUpdateView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return{

      member : {}, // 회원정보
      rental_num : 0, // 대관번호
      dto : {}, // 대관내역 상세정보

      times : [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00'
      ],

      file : '',

    }
  },
  created(){

    this.rental_num = this.$route.params.rental_num;

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
      console.log("회원 정보 : ",this.member);

      // 적립금 천단위 콤마형식으로 변환
      var point = this.member.point;
      this.member.point = point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      this.getData();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  methods:{

    async getData() {
      try {
        await axios.get('/moaplace.com/users/mypage/rental/detail/'
          + this.rental_num
        ).then(function(resp){
          console.log(resp);
          if(resp.status == 200) {

            this.dto = resp.data.dto;

            var rental_date = new Date(this.dto.rental_date);
            this.dto.rental_date = rental_date.getFullYear() + "-" + ("0" + (rental_date.getMonth() + 1)).slice(-2) + "-" + ("0" + rental_date.getDate()).slice(-2);
          
          } else {
            alert('rental detail 에러');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    },

    getToday(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let date = today.getDate();

      return year + "-" + (month >=10 ? month :'0' + month) + "-" + (date >=10 ? date : '0' + date); 
    },

    handleFileChange(e){
      this.file = e.target.files[0];
      let name = this.file.name;
      this.dto.rental_originfilename = name;
    },

    // 유효성검사
    validator(){
      let isEmpty = /.{1,}/;
      let isEmail =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/; // 길이까지 확실한 검증
      let isPhone = /\d{2,3}-\d{3,4}-\d{4}/g; // 휴대폰 번호

      //신청인 유효성 검사
      if(!isEmpty.test(this.dto.rental_name)){
        let inputForm = document.querySelector('#rental_name');
        inputForm.focus();
        inputForm.nextSibling.innerText = "필수 입력사항입니다.";
        return false;
      }
      document.querySelector('#rental_name').nextSibling.innerText = "";

      //신청인 전화번호 유효성 검사
      if(!isPhone.test(this.dto.rental_phone)){
        // console.log(this.dto.rental_phone);
        let phone = document.querySelector('#rental_phone');
        phone.focus();
        phone.nextSibling.innerText = "전화번호를 다시 입력하세요.";
        return false;
      }
      document.querySelector('#rental_phone').nextSibling.innerText = "";

      //신청인 이메일 유효성 검사
      if(!isEmail.test(this.dto.rental_email)){
        let email = document.querySelector('#rental_email');
        email.focus();
        email.nextSibling.innerText = "이메일을 다시 입력하세요.";
        return false;
      }
      document.querySelector('#rental_email').nextSibling.innerText = "";

      //공연명 유효성 검사
      if(!isEmpty.test(this.dto.rental_title)){
        let inputForm = document.querySelector('#rental_title');
        inputForm.focus();
        inputForm.nextSibling.innerText = "필수 입력사항입니다.";
        return false;
      }
      document.querySelector('#rental_title').nextSibling.innerText = "";

      //대관희망일자 유효성 검사
      if(this.dto.rental_date == this.getToday()){
        let inputForm = document.querySelector('input[type=date]');
        inputForm.focus();
        inputForm.nextSibling.innerText = "오늘 날짜는 선택이 불가능합니다.";
        return false;
      }
      document.querySelector('input[type=date]').nextSibling.innerText = "";

      //대관희망시간 유효성 검사
      if(!isEmpty.test(this.dto.rental_time)){
        let inputForm = document.querySelector('.time-box select');
        inputForm.focus();
        inputForm.parentNode.nextSibling.innerText = "대관희망시간을 선택하세요.";
        return false;
      }
      document.querySelector('.time-box select').parentNode.nextSibling.innerText = "";

      //담당자 유효성 검사
      if(!isEmpty.test(this.dto.rental_ownsname)){
        let inputForm = document.querySelector('#rental_ownsname');
        inputForm.focus();
        inputForm.nextSibling.innerText = "필수 입력사항입니다.";
        return false;
      }
      document.querySelector('#rental_ownsname').nextSibling.innerText = "";

      //담당자 연락처 유효성 검사 (콘솔로 로그찍은 후엔 작동하는데 안찍으면 작동안함)
      console.log("1",isPhone.test(this.dto.rental_ownsphone));
      if(!isPhone.test(this.dto.rental_ownsphone)){
        // console.log("2",isPhone.test(this.dto.rental_ownsphone));
        let inputForm = document.querySelector('#rental_ownsphone');
        inputForm.focus();
        inputForm.nextSibling.innerText = "전화번호를 다시 입력하세요.";
        return false;
      }
      document.querySelector('#rental_ownsphone').nextSibling.innerText = "";

      //담당자 이메일 유효성 검사
      if(!isEmail.test(this.dto.rental_ownemail)){
        let inputForm = document.querySelector('#rental_ownemail');
        inputForm.focus();
        inputForm.nextSibling.innerText = "이메일을 다시 입력하세요.";
        return false;
      }
      document.querySelector('#rental_ownemail').nextSibling.innerText = "";

      return true;
    },

    // 수정완료버튼
    onSubmit(){
      // 유효성검사 체크
      let isValid = this.validator();
      // console.log("isValid:" + isValid);

      if(isValid){
        
        // console.log("수정정보:",this.dto);
        // console.log("수정한 파일정보:", this.file);

        const formData = new FormData();
        
        formData.append("data", JSON.stringify(this.dto));
        formData.append("file", this.file);

        // if로 나누지 않고 controller상에서 required로 파일 수정 유무 분리하기
        axios.post('/moaplace.com/users/mypage/rental/update', formData,{
          headers:{
            "Content-Type" : "multipart/form-data",
          }
        }).then(function(resp){

          if(resp.data === "success"){
            alert("수정이 완료되었습니다.");
            // 대관 상세페이지로 이동
            this.$router.push('/moaplace.com/users/mypage/rental/detail/' + this.rental_num);

          }else{
            alert("수정을 실패하였습니다.\n 다시시도해주세요.");
          }

        }.bind(this))
        .catch(function(error){
          alert("onSubmit 오류");
          console.log(error);
        });

        // // 파일을 첨부하지 않았을 경우 dto만 넘기고 파일은 기존데이터 그대로 유지
        // if(this.file == '') {
        //   console.log("this.file이 null임");
          
        //   axios.post('/moaplace.com/users/mypage/rental/update',
        //     JSON.stringify(this.dto), {
        //     headers: {
        //       "Content-Type" : "application/json"
        //     }
        //   }).then((resp) => {
        //     console.log(resp.data);
        //     if(resp.data == "success") {

        //       alert('dto만 넘김');

        //     }else {
        //       alert('dto만 넘기려다 오류남');
        //     }
        //   });

        // // 파일을 첨부했을 경우 formData를 넘겨서 파일까지 수정
        // } else {
        //   console.log("this.file이 null이 아님");

        //   axios.post('/moaplace.com/users/mypage/rental/update', formData,{
        //     headers:{
        //       "Content-Type" : "multipart/form-data",
        //     }
        //   }).then(function(resp){
        //     if(resp.data === "success"){
        //       alert("수정이 완료되었습니다.");
        //       // 상세페이지로 이동
        //       // this.$router.push('/moaplace.com/users/mypage/rental/detail/' + this.rental_num);

        //     }else{
        //       alert("수정을 실패하였습니다.\n 다시시도해주세요.");
        //     }
        //   }.bind(this))
        //   .catch(function(error){
        //     alert("onSubmit 오류");
        //     console.log(error);
        //   });
        // }

      }
    },

    // 수정취소 = 상세내역 페이지로 이동
    revert() {
      // console.log("rental_num:",this.rental_num);
      this.$router.push("/moaplace.com/users/mypage/rental/detail/"+this.rental_num);
    },

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
      input, select{
        border: 1px solid rgba($black, 0.3);
              
        &[type="text"],&[type="date"]{
          padding: 4px 8px;
        }
        &[type="file"]{
          display: none;
        }
        &.file-input{
          width: 50%;
          &+ label{
            background: $brown;
            color: #fff;
            font-size: 14px;
            padding: 5px 16px;
            margin-left: 10px;
          }
        }
      }
      input.radio-input{
        display: none;
        &:checked + label::before{
          background-image: url('@/assets/done.png');
          background-color: $brown;
          background-repeat: no-repeat;
          background-size: 10px;
          background-position: center;
        }
      }
      label.radio-label{
        position: relative;
        padding-left: 24px;
        user-select: none;
        margin-right: 10px;
        cursor: pointer;
        &::before{
          content: "";
          width: 18px;
          height: 18px;
          border: 1px solid rgba($black, 0.3);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      textarea{
        width: 100%;
        padding: 8px;
        resize: none;
      }

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .titledesc {
        border: 5px solid #eee;
        margin-bottom: 30px;
        .desctxt {
          margin: 15px 20px;
        }
      }
      .desc {
        margin-bottom: 30px;
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
        tbody {
          td:hover {
            background-color: rgb(249, 249, 249);
          }
        }
        td {
          background-color: white;
          .info {
            display: flex;
            margin: 20px 20px;
            .img1 {
              background-color: gray;
              width: 110px;
              height: 150px;
              margin-right: 20px;
            }
            .img2 {
              background-color: gray;
              width: 55px;
              height: 75px;
              margin-right: 20px;
            }
            .txt {
              p {
                margin: 0px;
              }
              table td,th {
                border: 0px;
                background-color: transparent;
              }
            }
          }
        }
      }
      .myborder {
        th{
          border-right: 1px solid #eee;
        }
        td{
          border-right: 1px solid #dbe2e8;
          border-bottom: 1px solid #dbe2e8;
        }
        .descth {
          border: 1px solid #dbe2e8;
          background-color: rgb(249, 249, 249);
          vertical-align: middle;
        }
        .desctd {
          border: 1px solid #dbe2e8;
          .helpSpan {
            margin-left: 10px;
          }
          > .fileName {
            color: $brown;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
              color: $brown;
              text-decoration: none;
            }
          }
        }
        .end{
          border-right: 0px;
        }
      }
      .ticket-table {
        vertical-align : middle;
        margin-bottom: 30px;
      }
      .datenav {
        background-color: rgb(249, 249, 249);
      }
    }
  }
  #mypaging {
    display: flex;
    justify-content: center;
    .select {
      font-weight: bold;
    }
    li {
      a,span,a:hover,span:hover,a:focus,span:focus,a:active {
        background: transparent;
        border: none;
        box-shadow: none;
      }
      a:hover {
        color: $brown;
        opacity: 50%;
      }
    }
  }

}
</style>