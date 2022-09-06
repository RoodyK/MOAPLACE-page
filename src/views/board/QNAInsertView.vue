<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="1:1문의"/>

    <div class="app">

    <h2 class="title">1:1문의</h2>
    <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

      <div class="info">
          <p> <img src='../../assets/board/info.png'> 작성시 주의사항 </p>
          <ul>
              <li><strong style="color:#D67747">자주묻는질문(FAQ)을 먼저 확인하시면 보다 빠르게 궁금한 점을 해결할 수 있습니다. </strong></li>
              <li> 욕설이나 비방, 음란, 광고 등 1:1문의 게시판 의도와 맞지 않는 내용은 별도 안내 없이 삭제되어 공개되지 않습니다. </li>
              <li> 개인정보보호를 위하여 고객님의 주민등록번호 등의 개인정보 기재는 삼가주시기 바랍니다. </li>
          </ul>
      </div>

      <hr class="line">

      <form>
      <div class="forms">

        <div class="headerBox">
          <div class="sortBox">
            <label>구분</label><br>
            <select v-model.number="forms.sort_num">
              <option :value="0"> 분류 선택 </option>
              <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
              {{sort.sort_name}} 문의
              </option>
            </select>
          </div>

          <div class="nameBox">
            <label>이메일</label><br>
            <input type="text" v-model="forms.member_email" disabled>
            <input type="hidden" name="forms.member_num" value="forms.member_num">
          </div>
        </div>

        <div class="titleBox">
          <label>제목</label>
          <input type="text" v-model="forms.qna_title" placeholder="문의 제목" maxlength="50"><br>
        </div>
        
        <div class="contentBox">
          <label>내용</label>
          <TextEditor height="300" v-model:content="forms.qna_content" contentType="html"
           placeholder="문의하실 내용을 작성해주세요. 답변 받으실 이메일이 다른 경우 별도 기재하여 주시기 바랍니다."/>
        </div>

        <div class="btnGroup">
          <button type="submit" @click.prevent="checkForm()">등록하기</button>
          <button @click="$router.push({name:'qnaList'})">목록으로</button>
        </div>
      
      </div>
      </form>
    </div>
    <AppFooter/>
  </div>

</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import TextEditor from '@/components/TextEditor.vue'
import axios from '@/axios/axios.js'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
    TextEditor, 
  },
  data() {
    return {
      sort_list:[], // 구분목록
      forms: {
            sort_num:0, // 구분번호
            member_num:0, // 회원번호
            member_email:"", // 회원이메일
            qna_title:"", // 제목
            qna_content:"" // 내용
      }
    }
  },
  created() {
    this.pageLoad();
  },
  methods: {
    async pageLoad() { 
      let token = localStorage.getItem("access_token");
      if(token == null) return;
        
      const config = {
        headers: {
          "Authorization" : token
        }
      }
      // 로그인 회원정보
      await axios.get("/moaplace.com/users/login/member/info", config)
                 .then(response => {
                  let data = response.data;
                  this.forms.member_num = data.member_num;
                  this.forms.member_email = data.member_email;
                })
                 .catch(error => {
                    console.log(error.message);
                })
      // 구분목록
      await axios.get('/moaplace.com/board/sort/list')
                 .then(resp => {
                    this.sort_list = resp.data;
                  })
                 .catch(error => {
                    console.log(error.message);
                  })
    },
    checkForm() { 
      // 입력 체크
      if(this.forms.sort_num<1) {
        alert("문의 구분을 선택하세요.");
        return;
      }
      if(this.forms.qna_title==null || this.forms.qna_title==""){
        alert("문의 제목을 입력하세요.");
        return;
      }
      if(this.forms.qna_content==null || this.forms.qna_content==""){
        alert("문의 내용을 입력하세요.");
        return;
      }

      // 데이터 제출
      if(confirm('문의글을 등록하시겠습니까?')){
        this.qnaInsert();
      } else return;
    },

    qnaInsert(){ // 데이터 제출
      axios.post('/moaplace.com/board/qna/insert', JSON.stringify(this.forms),{
              headers: {'Content-Type' : 'application/json'}})
           .then(resp => {

            if(resp.data!='fail'){ // 등록 성공하면 qna리스트로 이동
              alert('문의글이 등록되었습니다.');
              this.$router.push({name:'qnaList'});

            } else { // 등록 실패하면 알림창
              alert('문의글 등록에 실패하였습니다. 다시 시도해주세요.');
            }
            })
           .catch(error => {
              console.log(error);
            })          
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  width: $width;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  color: $black;
  padding-top: 50px;
  margin: auto;

  h2.title{
    font-size: 32px;
    text-align: center;
    margin-top: 32px;
    & + p{
      text-align: center;
      margin-bottom: 64px;
    }
  }

  .info {
    width: 100%;
    color: #333333d4;
    border: 1px solid #33333330;

    p {
    font-weight: bold;
    padding: 15px 0 0 20px;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  
  .line {
    width: 100%;
    border: 2px solid $brown;
    margin: 32px 0 8px 0;
  }

  .forms {
    width:1100px;
    margin-bottom: 64px;

    label {
      font-weight: bold;
      padding: 24px 0 8px 0;
    }

    .headerBox{
      display:flex;
      justify-content: space-between;

      .sortBox{
        width: 28%;

        select {
          width:100%;
          height: 40px;
          border: 1px solid lightgray;
          padding-left: 16px;
        }
      }

      .nameBox {
        width:70%;
        input {
          width: 100%;
        }
      }
    }

    input {
      width: 100%;
      height: 40px;
      padding: 16px;
      border: 1px solid lightgray;
    }

    textarea {
      width: 100%;
      height: 300px;
      padding: 16px;
      border: 1px solid lightgray;
    }

    .btnGroup{
      display: flex;
      justify-content: center;
      margin: 16px 0 40px 0;

      button {
        padding: 16px 40px;
        margin: 2px;

        &:nth-child(1){
          background-color: $brown;
          border: 1px solid transparent;
          color:white;
        }
        &:nth-child(2){
          border: 1px solid $black;
          background-color: white;
          color:$black;
        }
      }
    }
  }  
}
</style>
