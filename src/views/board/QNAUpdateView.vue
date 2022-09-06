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
            <label>이메일</label><br>
            <input type="text" v-model="member_email" disabled>
            <input type="hidden" name="detail.member_num" value="detail.member_num">
          </div>
        </div>

        <div class="titleBox">
          <label>제목</label>
          <input type="text" v-model="detail.qna_title" maxlength="50">
        </div>
        
        <div class="contentBox" v-if="detail.qna_content!=undefined">
          <label>내용</label>
          <TextEditor height="300" v-model:content="detail.qna_content" contentType="html"/>
        </div>

        <div class="titleBox">
          <label>문의일자</label>
          <input type="text" v-model="detail.qna_regdate" disabled>
        </div>
        
        <div class="btnGroup">
          <button type="submit" @click.prevent="checkForm()">수정하기</button>
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
      TextEditor
  },
  data() {
    return {
      member_num:0,
      member_email:'',
      sort_list:[],
      detail:[]
    }
  },
  created() {
    this.qna_num = this.$route.params.qna_num;
    this.pageLoad();
    this.qnaDetail(); // 문의글 상세내용 불러오기
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
                  this.member_num = data.member_num;
                  this.member_email = data.member_email;
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
    async qnaDetail() {
      await axios.get("/moaplace.com/board/qna/detail", 
                  { params: {qna_num: this.qna_num} })
                 .then(resp => {
                    this.detail = resp.data.detail;

                    // 다른 회원이면 돌려보내기
                    if(this.member_num != this.detail.member_num) {
                      alert('잘못된 경로입니다.');
                      this.$router.push({name:'qnaList'});
                    }
                  })
                 .catch (error => {
                    console.log(error);
                  })
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
      }

      if(confirm('문의글을 수정하시겠습니까?')){
        this.qnaUpdate();
      } else return;

    },
    qnaUpdate(){ // 데이터 제출
      axios.post('/moaplace.com/board/qna/update', JSON.stringify(this.detail),
              { headers: {'Content-Type' : 'application/json'}
            })
           .then(resp => {
              if(resp.data!='fail'){
                alert('문의글이 수정되었습니다.');
                this.$router.push({name:'qnaList'});

              } else {
                alert('문의글 수정에 실패했습니다. 다시 시도해주세요');
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