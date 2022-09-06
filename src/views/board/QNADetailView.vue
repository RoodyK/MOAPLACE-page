<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="1:1문의"/>

    <div class="app">    
      <h2 class="title">1:1문의</h2>
      <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

      <div class="info">
        <p> <img src='../../assets/board/info.png'> 고객님의 문의내역입니다. </p>
          <ul>
            <li> 모아플레이스는 고객님의 문의에 성심성의껏 답변해드리고 있습니다. </li>
            <li> 욕설이나 비방, 음란, 광고 등 1:1문의 게시판 의도와 맞지 않는 내용은 별도 안내 없이 삭제되어 공개되지 않습니다. </li>
          </ul>
      </div>

      <table>
        <thead>
          <tr>
            <th>[{{detail.sort_name}} 문의]<h2>Q. {{detail.qna_title}}</h2></th>
          </tr>
          <tr>
            <td class="state">{{detail.qna_state}}</td>
          </tr>
          <tr>
            <td>등록일 {{detail.qna_regdate}}</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="content" v-html="detail.qna_content">
            </td>
          </tr>

          <tr>
            <td>
              <div class="answer" v-if="answer!=null">
                  <h2> A. {{answer.answer_title}} </h2>
                  <div v-html="answer.answer_content"></div>
              </div>

              <div class="answer" v-else>
                <div class="wait">
                  문의가 정상적으로 접수되었습니다. <br>
                  빠른 시일 내에 답변 드리도록 하겠습니다. 
                </div>
              </div>

            </td>            
          </tr>
        </tbody>
      </table>

      <div class="btnGroup">
        <button @click="$router.push({name:'qnaUpdate'})" v-if="answer==null">수정하기</button>
        <button @click="qnaDelete()">삭제하기</button>
        <button @click="$router.push({name:'qnaList'})">목록으로</button>
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
  components: {
      AppHeader,
      AppFooter,
      SideVisual
  }, 
  data() {
    return {
      detail:[],
      answer:[]
    }
  },
  created() {
    this.qna_num = this.$route.params.qna_num;
    this.qnaDetail(); // 문의 상세내용 불러오기
  },
  methods: {
    async qnaDetail() {
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
                    this.member_num = data.member_num;
                })
                 .catch(error => {
                    console.log(error.message);
                })      

      await axios.get("/moaplace.com/board/qna/detail", 
                    { params: {qna_num: this.qna_num} })

                 .then(resp => {
                      this.detail = resp.data.detail;
                      this.answer = resp.data.answer;

                      // 다른 회원이면 돌려보내기
                      if(this.member_num != this.detail.member_num) {
                        alert('잘못된 경로입니다.');
                        this.$router.push({name:'qnaList'});
                      }
                  })
                 .catch(error => {
                  console.log(error);
                })
    },
    async qnaDelete() {
      let msg = '해당 문의글을 삭제하시겠습니까?\n답변이 완료된 경우 답변도 함께 삭제됩니다.';
      if (confirm(msg)){
        await axios.post("/moaplace.com/board/qna/delete/" + this.qna_num)
                   .then(resp => {

                      if(resp.data != 'fail'){
                        alert('문의글이 삭제되었습니다.');
                        this.$router.push({name:'qnaList'});
                      } else {
                        alert('문의글 삭제에 실패했습니다. 다시 시도해주세요.');
                      }
                    })
                   .catch (error => {
                      console.log(error);
                    })
      } else return;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction: column;
  width: $width;
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
    margin-bottom: 64px;

    p {
    font-weight: bold;
    padding: 15px 0 0 20px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }

  table {
    width: 100%;
    border-top:2px solid $black;
    
    thead {
      tr{
        border-bottom: 1px solid #ddd;
        th {
          padding: 30px 24px;
        }
        td {
          padding: 16px 24px;
        }
        &:nth-child(3){
          border-bottom: 2px solid #ddd;
        }
      }
      .state {
        color:#D67747;
        font-weight: bold;
        font-size: 18px;
      }
    }

    tbody{
      tr {
        border-bottom: 1px solid #ddd;
        &:nth-child(1){
          border-bottom: 1px solid $black;
        }
      td {
          padding: 48px 24px;
          white-space:pre;
          font-size: 18px;
        }
      }
      .answer {
        width: 100%;
        padding: 40px 32px;
        background-color: rgba($brown, 0.1);

        & > div {
          padding: 30px 0 16px 0;
        }
        .wait {
          color: rgba($black, 0.7);
          text-align: center;
          padding: 24px;
        }
      }
    }
  }

  
  .btnGroup{
    display: flex;
    justify-content: center;
    margin: 24px 0 40px 0;

    button {
      padding: 16px 40px;
      margin: 2px;

      &:nth-child(1){
        background-color: $brown;
        border: 1px solid transparent;
        color:white;
      }
      &:nth-child(2) {
        background-color:rgba($black, 0.5);
        border: 1px solid transparent;
        color:white;
      }
      &:nth-child(3){
        border: 1px solid $black;
        background-color: white;
        color:$black;
      }
    }
  }
}
</style>