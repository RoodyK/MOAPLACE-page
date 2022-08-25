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
            <select v-model.number="detail.sort_num">
              <option :value="0"> 분류 선택 </option>
              <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
               {{sort.sort_name}} 문의
              </option>
            </select>
          </div>

          <div class="nameBox">
            <label>아이디</label><br>
            <input type="text" name="member_id" v-model="member_id" disabled>
            <input type="hidden" name="detail.member_num" value="detail.member_num">
          </div>
        </div>

        <div class="titleBox">
          <label>제목</label>
          <input type="text" v-model="detail.qna_title"><br>
        </div>
        
        <div class="contentBox">
          <label>내용</label>
          <textarea v-model="detail.qna_content"></textarea>
        </div>

        <div class="titleBox">
          <label>문의일자</label>
          <input type="text" v-model="detail.qna_regdate" disabled><br>
        </div>
        
        <div class="btnGroup">
          <button type="submit" @click.prevent="checkForm()">수정하기</button>
          <button @click="$router.go(-1)"> 이전으로 </button>
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
import axios from '../../axios/axios.js'

export default {
    components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data() {
    return {
      member_id:'admin',
      sort_list:[], // 구분목록
      detail:
      {
        member_num:0,
        sort_num:0,
        sort_name:'',
        qna_num:0,
        qna_title:'',
        qna_content:'',
        qna_state:'',
        qna_regdate:''
      }
    }
  },
  created() {
    // this.member_num = this.$route.state.member_num;
    this.sortList(); // 구분목록 불러오기

    console.log(this.$route.params.qna_num);
    this.qna_num = this.$route.params.qna_num;
    this.qnaDetail(); // 문의글 상세내용 불러오기
  },
  methods: {
    async sortList() { // 구분목록 불러오기
      try{
        await axios.get('/moaplace.com/board/sort/list').then(function(resp){
          if(resp.data!=null || resp.data!=''){
            this.sort_list = resp.data;

          } else {
            alert('구분목록 로딩에 실패하였습니다.');
          }
        }.bind(this));

      } catch (error) {
        console.log(error);
      }
    },
    async qnaDetail() { // 문의글 상세내용 불러오기
      try { 
        await axios.get("/moaplace.com/board/qna/detail", {params:
          {qna_num: this.qna_num}
        }).then(function(resp){

          if(resp.status == 200) {
            this.detail = resp.data.detail;
            console.log(this.detail);

          } else {
            alert('페이지 로딩에 실패하였습니다. 다시 시도해주세요.');
          }
        }.bind(this));

      } catch (error) {
        console.log(error);
      }
    },
    checkForm() { 
      // 입력 체크
      if(this.detail.sort_num<1) {
        alert("문의 구분을 선택하세요.");
        return;
      }
      if(this.detail.qna_title==null || this.detail.qna_title==""){
        alert("문의 제목을 입력하세요.");
        return;
      }
      if(this.detail.qna_content==null || this.detail.qna_content==""){
        alert("문의 내용을 입력하세요.");
        return;
      } else if (this.detail.qna_content.length<10) {
        alert("문의 내용은 10자 이상 입력하세요.");
        return;
      }

      // 데이터 제출
      this.qnaUpdate();
    },
    qnaUpdate(){ // 데이터 제출
      axios.post('/moaplace.com/board/qna/update', JSON.stringify(this.detail),{
        headers: {
          'Content-Type' : 'application/json'}
      }).then(function(resp){

        if(resp.data!='fail'){ // 성공하면 리스트로 이동
          console.log(resp.data);
          alert('문의글이 수정되었습니다.');
          this.$router.push({name:'qnaList'});

        } else { // 등록 실패하면 알림창
          alert('문의글 수정에 실패하였습니다. 다시 시도해주세요.');
        }
      }.bind(this));      
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
    margin: 32px;
  }

  .forms {
    width:1100px;
    margin-bottom: 50px;

    label {
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
          padding-left:16px;
        }
      }

      .nameBox {
        width:70%;
        input {
          width: 100%;
          padding: 16px;
        }
      }
    }

    input {
      width: 100%;
      height: 40px;
      border: 1px solid lightgray;
      padding: 16px;
    }

    textarea {
      width: 100%;
      height: 300px;
      border: 1px solid lightgray;
      padding: 16px;
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