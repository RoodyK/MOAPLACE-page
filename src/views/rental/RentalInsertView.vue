<template>
  <div id="wrap">
    <AppHeader/>
    <SideVisual menu="RENTAL APPLICATION" img="rental" title="대관신청"/>
    <div class="inner">
      <div class="noti-box">
        <h3>모아플레이스 대관 신청 준수사항</h3>
        <ul>
          <li>대관 신청일자 및 시간은 모아플레이스 사정에 의해 조정 될 수 있음</li>
          <li>접수된 신청서 및 기타 서류는 <strong>반환하지 않음</strong></li>
          <li><strong>신청서 내용 변경 시 즉시 연락</strong></li>
          <li>
            공연내용 및 보조출연자 변경 등의 기존 승인 내용과 중대히 다른 변경사항이 발생한 경우 공연일로부터 60일 이전에 변경신청 후 모아플레이스의 내용변경에 대한 승인 후 가능하며 변경 시 <strong>내용에 따라 대관료의 10%를 변경수수료로 납부하여야 함</strong>
          </li>
          <li><strong>연주자의 변경은 절대 불가함</strong> (공연형식 변경 금지 / 대관규약 참조)</li>
          <li>공연이 취소되는 경우 대관규약에 의거하여 <strong>계약금 및 대관료 전액 귀속될 수 있음</strong></li>
          <li>보다 자세한 사항은 <strong>홈페이지 1:1문의로 문의</strong></li>
        </ul>
        <p>
          상기와 같이 모아플레이스 사용과 관련, 해당 공연장의 운영팀(또는 단체의 장)이 <br>부여하는 조건을 준수할 것을 서약하며 위와 같이 신청합니다.
          <br>
          <input class="radio-input" type="checkbox" v-model="agreement" id="agree">
          <label class="radio-label" for="agree">
            동의함
          </label>
        </p>
        
        
      </div>
      <h2 class="title">신청서</h2>
      <form action="">
        <div class="table-box">
          <div class="t-row">
            <div>공연장</div>
            <div>
              <input class="radio-input" type="radio" value="1" id="hall01" v-model="form.hall_num" name="hall" checked>
              <label class="radio-label" for="hall01">
                모던홀
              </label>

              <input class="radio-input" type="radio" value="2" id="hall02"  v-model="form.hall_num" name="hall">
              <label class="radio-label" for="hall02">
                오케스트라홀
              </label>

              <input class="radio-input" type="radio" value="3" id="hall03"  v-model="form.hall_num" name="hall">
              <label class="radio-label" for="hall03">
                아트홀
              </label>
            </div>
          </div>
          <div class="t-row">
            <div>신청인</div>
            <div>
              <input type="text" class="text-input-long" name="name" placeholder="단체명 또는 사업자명을 입력하세요." v-model="form.rental_name" id="rental_name">
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>연락처</div>
            <div>
              <div class="phone-box">
                <input type="text" v-model="form.rental_phone[0]" id="rental_phone" maxlength="3"> 
                <span>-</span>
                <input type="text" v-model="form.rental_phone[1]" maxlength="4"> 
                <span>-</span>
                <input type="text" v-model="form.rental_phone[2]" maxlength="4">
              </div>
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>E-mail</div>
            <div>
              <div class="email-box">
                <input type="text" v-model="form.rental_email[0]" id="rental_email"> <span>@</span>
                <input type="text" v-model="form.rental_email[1]"> 
                <select v-model="form.rental_email[1]">
                  <option value="">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                </select> 
              </div>
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>공연명</div>
            <div>
              <input type="text" v-model="form.rental_title" id="rental_title" placeholder="공연명을 입력하세요.">
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>공연장르</div>
            <div>
              <input type="radio" class="radio-input" name="genre" value="기악" v-model="form.rental_genre" id="genre01" checked>
              <label class="radio-label" for="genre01">
                  기악
              </label>
              <input type="radio" class="radio-input" name="genre" value="대중음악"  v-model="form.rental_genre" id="genre02">
              <label class="radio-label" for="genre02">
                  대중음악
              </label>
              <input type="radio" class="radio-input" name="genre" value="무용"  v-model="form.rental_genre" id="genre03">
              <label class="radio-label" for="genre03">
                  무용
              </label>
              <input type="radio" class="radio-input" name="genre" value="뮤지컬"  v-model="form.rental_genre" id="genre04">
              <label class="radio-label" for="genre04">
                  뮤지컬
              </label>
              <input type="radio" class="radio-input" name="genre" value="성악"  v-model="form.rental_genre" id="genre05">
              <label class="radio-label" for="genre05">
                  성악
              </label>
              <input type="radio" class="radio-input" name="genre" value="연극"  v-model="form.rental_genre" id="genre06">
              <label class="radio-label" for="genre06">
                  연극
              </label>
              <input type="radio" class="radio-input" name="genre" value="오페라"  v-model="form.rental_genre" id="genre07">
              <label class="radio-label" for="genre07">
                  오페라
              </label>
            </div>
          </div>
          <div class="t-row">
            <div>대관희망일자</div>
            <div>
              <input type="date" :min="getToday()" v-model="form.rental_date">
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>대관희망시간</div>
            <div>
              <div class="time-box">
                <select v-model="form.rental_time">
                  <option value="">시간선택</option>
                  <option 
                    v-for="time in times" 
                    :key="time"
                    :value="time">
                    {{time}}
                  </option>
                </select>
                <p>
                  * 대관시간은 선택시간으로부터 6시간입니다.
                  <br>
                  * 모아플레이스 사정에 따라 시간은 변경될 수 있습니다.
                  </p>
              </div>
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>첨부파일</div>
            <div>
              <input type="file" id="file" accept=".zip" @change="handleFileChange">
              <div class="file-box">
                <input type="text" class="file-input" v-model="form.rental_originfilename" placeholder="압축파일(.zip 확장자)만 첨부가능" disabled>
                <label for="file">첨부파일 등록</label>
              </div>
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>담당자</div>
            <div>
              <input type="text" v-model="form.rental_ownsname" id="rental_ownsname">
              <span></span>
            </div>
          </div>
          <div class="t-row">
            <div>담당자 연락처</div>
            <div class="manager-box">
              <p>전화번호</p>
              <div class="inner-row">
                <div class="phone-box">
                  <input type="text" v-model="form.rental_ownsphone[0]" id="rental_ownsphone" maxlength="3"> 
                  <span>-</span>
                  <input type="text" v-model="form.rental_ownsphone[1]" maxlength="4"> 
                  <span>-</span>
                  <input type="text" v-model="form.rental_ownsphone[2]" maxlength="4">
                </div>
                <span></span>
              </div>
              <p>이메일</p>
              <div class="inner-row">
                <div class="email-box">
                  <input type="text" v-model="form.rental_ownemail[0]" id="rental_ownemail"> <span>@</span>
                  <input type="text" v-model="form.rental_ownemail[1]"> 
                  <select v-model="form.rental_ownemail[1]">
                    <option value="">직접선택</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                  </select> 
                </div>
                <span></span>
              </div>
            </div>
          </div>
          <div class="t-row">
            <div>기타 요청사항</div>
            <div>
                <textarea cols="30" rows="5" v-model="form.rental_content" placeholder="추가 요청사항 혹은 참고사항이 있을 경우 기재해주세요."></textarea>
            </div>
          </div>
          <p class="etc">* 공연 변경 및 취소신청은 <strong>1:1게시판</strong>으로 문의 바랍니다</p>
        </div>
      </form>
      
      <div>
          <input type="checkbox" class="radio-input" id="privacy-agree" v-model="privacy"/>
          <label class="radio-label" for="privacy-agree">
              개인정보처리방침에 동의합니다.
          </label>
      </div>
      <div class="btn-box">
          <RouterLink to="/moaplace.com/rental"><button>이전으로</button></RouterLink>
          <button @click="onSubmit()">신청하기</button>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import axios from '@/axios/axios.js'

  export default {
    components:{
        AppHeader,
        AppFooter,
        SideVisual
    },
    data(){
      return{
          agreement: false, //준수사항 동의
          privacy: false, //개인정보 처리 동의
          form:{
            hall_num : 1, //공연장
            rental_name : "",//신청인 이름
            rental_phone:["","",""], //신청인 연락처
            rental_email:["",""],//신청인 이메일
            rental_title: "",//공연명
            rental_genre:"기악",//공연장르
            rental_date: this.getToday(),//대여 희망일자
            rental_time: "",//대여 시간
            rental_originfilename: "", //첨부파일명
            rental_ownsname:"", //담당자이름
            rental_ownsphone:["","",""],//담당자 연락처
            rental_ownemail:["",""], //담당자 이메일
            rental_content:"",//기타 요청사항
          }, 
          insertForm:{
            hall_num : 0, //공연장
            member_num : "",//신청인 번호
            rental_name : "",//신청인 이름
            rental_phone:"", //신청인 연락처
            rental_email:"",//신청인 이메일
            rental_title: "",//공연명
            rental_genre:0,//공연장르
            rental_date: "",//대여 희망일자
            rental_time: "",//대여 시간
            rental_ownsname:"", //담당자이름
            rental_ownsphone:"",//담당자 연락처
            rental_ownemail:"", //담당자 이메일
            rental_content:"",//기타 요청사항
          },
          msg: '필수 입력 사항입니다.',
          file:'',
          filename: '',
          times: [
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
      }
    },
    created(){
      this.getMemberInfo();
    },
    methods:{
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
        this.form.rental_originfilename = name;
      },
      validator(){
        let isEmpty = /.{1,}/;
        let isEmail =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/; // 길이까지 확실한 검증
        let isPhone = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호
        const rental_phone = this.form.rental_phone[0] + "-" + this.form.rental_phone[1] + "-" + this.form.rental_phone[2];
        const rental_email = this.form.rental_email[0] + "@" + this.form.rental_email[1];
        const rental_ownsphone = this.form.rental_ownsphone[0] + "-" + this.form.rental_ownsphone[1] + "-" + this.form.rental_ownsphone[2];
        const rental_ownemail = this.form.rental_ownemail[0] + "@" + this.form.rental_ownemail[1];
        
        // 대관 신청 준수 동의여부
        if(!this.agreement){
          alert('대관 신청 준수사항을 동의해주세요.');
          let agreement = document.querySelector(".noti-box").offsetTop;
          window.scrollTo({left:0, top:agreement, behavior:"smooth"});
          return false;
        }
        //개인정보처리방침 동의
        if(!this.privacy){
          alert('개인정보처리방침을 동의해주세요.');
          let privacy = document.querySelector("#privacy-agree + label").offsetTop;
          window.scrollTo({left:0, top:privacy, behavior:"smooth"});
          return false;
        }
        
        //신청인 유효성 검사
        if(!isEmpty.test(this.form.rental_name)){
          let inputForm = document.querySelector('#rental_name');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.nextSibling.innerText = "필수 입력사항입니다.";
          return false;
        }
        document.querySelector('#rental_name').nextSibling.innerText = "";

        //신청인 전화번호 유효성 검사
        if(!isPhone.test(rental_phone)){
          let phone = document.querySelector('#rental_phone');
          window.scrollTo({left:0, top:phone.offsetTop -500, behavior:"smooth"});
          phone.focus();
          phone.parentNode.nextSibling.innerText = "전화번호를 다시 입력하세요.";
          return false;
        }
        document.querySelector('#rental_phone').parentNode.nextSibling.innerText = "";

        //신청인 이메일 유효성 검사
        if(!isEmail.test(rental_email)){
          let email = document.querySelector('#rental_email');
          window.scrollTo({left:0, top:email.offsetTop -500, behavior:"smooth"});
          email.focus();
          email.parentNode.nextSibling.innerText = "이메일을 다시 입력하세요.";
          return false;
        }
        document.querySelector('#rental_email').parentNode.nextSibling.innerText = "";

        //공연명 유효성 검사
        if(!isEmpty.test(this.form.rental_title)){
          let inputForm = document.querySelector('#rental_title');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.nextSibling.innerText = "필수 입력사항입니다.";
          return false;
        }
        document.querySelector('#rental_title').nextSibling.innerText = "";

        //대관희망일자 유효성 검사
        if(this.form.rental_date == this.getToday()){
          let inputForm = document.querySelector('input[type=date]');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.nextSibling.innerText = "오늘 날짜는 선택이 불가능합니다.";
          return false;
        }
        document.querySelector('input[type=date]').nextSibling.innerText = "";

        //대관희망시간 유효성 검사
        if(!isEmpty.test(this.form.rental_time)){
          let inputForm = document.querySelector('.time-box select');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.parentNode.nextSibling.innerText = "대관희망시간을 선택하세요.";
          return false;
        }
        document.querySelector('.time-box select').parentNode.nextSibling.innerText = "";

        //첨부파일 유효성 검사
        if(!isEmpty.test(this.form.rental_originfilename)){
          let inputForm = document.querySelector('.file-input');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.parentNode.nextSibling.innerText = "필수 입력사항입니다.";
          return false;
        }
        document.querySelector('.file-input').parentNode.nextSibling.innerText = "";

        //담당자 유효성 검사
        if(!isEmpty.test(this.form.rental_ownsname)){
          let inputForm = document.querySelector('#rental_ownsname');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.nextSibling.innerText = "필수 입력사항입니다.";
          return false;
        }
        document.querySelector('#rental_ownsname').nextSibling.innerText = "";

        //담당자 연락처 유효성 검사
        if(!isPhone.test(rental_ownsphone)){
          let inputForm = document.querySelector('#rental_ownsphone');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.parentNode.nextSibling.innerText = "전화번호를 다시 입력하세요.";
          return false;
        }
        document.querySelector('#rental_ownsphone').parentNode.nextSibling.innerText = "";

        //담당자 이메일 유효성 검사
        if(!isEmail.test(rental_ownemail)){
          let inputForm = document.querySelector('#rental_ownemail');
          window.scrollTo({left:0, top:inputForm.offsetTop -500, behavior:"smooth"});
          inputForm.focus();
          inputForm.parentNode.nextSibling.innerText = "이메일을 다시입력하세요.";
          return false;
        }
        document.querySelector('#rental_ownemail').parentNode.nextSibling.innerText = "";
        
        this.insertForm.hall_num = this.form.hall_num;
        this.insertForm.rental_name = this.form.rental_name;
        this.insertForm.rental_phone = rental_phone; 
        this.insertForm.rental_email = rental_email;
        this.insertForm.rental_title = this.form.rental_title;
        this.insertForm.rental_genre = this.form.rental_genre;
        this.insertForm.rental_date = this.form.rental_date;
        this.insertForm.rental_time = this.form.rental_time;
        this.insertForm.rental_ownsname = this.form.rental_ownsname;
        this.insertForm.rental_ownsphone = rental_ownsphone;
        this.insertForm.rental_ownemail = rental_ownemail;
        this.insertForm.rental_content = this.form.rental_content;
        
        return true;
      },
      onSubmit(){
        let isValid = this.validator();
        if(isValid){
          // console.log(this.insertForm);
          const formData = new FormData();
          
          formData.append("data", JSON.stringify(this.insertForm));
          formData.append("file", this.file);

          axios.post('/moaplace.com/rental/insert', formData,{
            headers:{
              "Content-Type" : "multipart/form-data",
            }
          }).then((resp)=>{
            if(resp.data === "success"){
              alert("대관신청이 완료되었습니다.");
              //마이페이지로 이동
              this.$router.push({ name: "myrentallist"});
            }else{
              alert("대관신청을 실패하였습니다.\n 다시시도해주세요.");
            }
          });
        }
      },
      async getMemberInfo(){
            let token = localStorage.getItem("access_token");

            if(token == null) return;

            const config = {
                headers: {
                "Authorization" : token
                }
            }

            await axios.get("/moaplace.com/users/login/member/info", config)
            .then(response => {
                let data = response.data;

                if(data != null){
                  //회원번호
                  this.insertForm.member_num = data.member_num; 
                  
                  //이름
                  this.form.rental_name = data.member_name;

                  //휴대폰 번호
                  let phone = data.member_phone.split("-");
                  for(let i = 0; i< phone.length; i ++){
                    this.form.rental_phone[i] = phone[i];
                  }
                  //이메일
                  let email = data.member_email.split("@")
                  for(let i = 0; i< email.length; i ++){
                    this.form.rental_email[i] = email[i];
                  }

                }else{
                  alert('정상적인 접근이 아닙니다.');
                  // console.log('회원정보 없음');
                }
                
                
                
            })
            .catch(error => {
                console.log(error.message);
            })
                
        },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  @import "@/scss/common.scss";
  $brown: #826D5E;
  #wrap{
    padding: 0; margin: 0; text-decoration: none;
    .inner{
      width: $width;
      margin: 0 auto;
      padding: 32px 0;
      box-sizing: border-box;
      h2.title {
        font-size: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba($black, 0.5);
        margin-bottom: 16px;
      }
      strong{
        color: $brown;
      }
      .noti-box{
        width: 100%;
        border: 10px solid rgba($brown, 0.1);
        padding: 32px;
        margin-bottom: 64px;
        line-height: 1.5;
        word-break: keep-all;
        h3{
          text-align: center;
          font-size: 24px;
          border-bottom: 1px solid $brown;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        ul{
          padding-left: 20px;
          padding-bottom: 16px;
          list-style: none;
          border-bottom: 1px solid rgba($black, 0.1);
          li{
            position: relative;
            margin-bottom: 8px;
            &::before{
              content: '';
              display: block;
              width: 4px;
              height: 4px;
              background: $brown;
              position: absolute;
              top: 10px;
              left: -16px;
              transform: translateX(-50%);
            }
          }
        }
        p{
          text-align: center;
          margin: 0;
          label{
            margin-top: 16px;
            cursor: pointer;
          }
        }

      }
      .table-box{
        padding-top: 16px;
        .t-row{
          display: table;
          table-layout: fixed;
          width: 100%;
          border-bottom: 1px solid rgba($black, 0.2);
          &:first-child{
            border-top: 1px solid rgba($black, 0.2);  
          }
          > div{
            display: table-cell; 
            padding: 16px 32px;
            &:first-child{
              width: 20%;
              min-height: 80px;
              background: #f1f1f1;
              user-select: none;
            }
            &:last-child{
              display: flex;
            }
            &.manager-box{
              flex-direction: column;
              p{
                margin: 0;
                font-size: 14px;
              }
              .inner-row{
                display: flex;
                margin: 4px 0 8px;
              }
            }
            label{
              margin-right: 16px;
              user-select: none;
            }
            input, select{
              border: 1px solid rgba($black, 0.3);
              
              &[type="text"],&[type="date"]{
                padding: 4px 8px;
                width: 60%;
              }
              &[type="file"]{
                display: none;
              }
              &.file-input{
                width: 70%;
                &+ label{
                  background: $black;
                  color: #fff;
                  font-size: 14px;
                  padding: 5px 16px;
                  margin: 0;
                }
              }
            }
            span{
              color: red;
              font-size: 14px;
              margin-left: 8px;
              padding-top: 5px;
            }

            .phone-box, .email-box,.file-box,.time-box {
              width: 60%;
              display: flex;
              input{
                margin: 0 8px;
                &:first-child{
                  margin-left: 0;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
              span{
                color: $black;
                padding-top: 8px;
                margin: 0;
              }
              p{
                font-size: 12px;
                margin: 0 0 0 16px;
              }
              select{
                padding: 0 8px;
              }
            }
            textarea{
              width: 100%;
              padding: 8px;
              resize: none;
            }
          }
          
                
        }
        p.etc{
          font-size: 14px;
          margin-top: 8px;
        }
      }

      input.radio-input{
        display: none;
        &:checked + label::before{
          background-image: url('@/assets/done.png');
          background-color: black;
          background-repeat: no-repeat;
          background-size: 10px;
          background-position: center;
        }
      }
      label.radio-label{
        position: relative;
        padding-left: 24px;
        user-select: none;
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
      form + div{
        text-align: center;
        font-weight: bold;
      }
      .btn-box{
        display: flex;
        justify-content: center;
        width: 100%;
        button{
          border: none;
          background: $brown;
          color: #fff;
          padding: 16px 64px;
          margin-top: 32px;
          &:first-child{
            margin-right: 16px;
            background: rgba($black, 0.6);
          }
        }

      }
    }
  }
</style>