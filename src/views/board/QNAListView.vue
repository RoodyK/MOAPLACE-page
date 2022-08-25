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

    <div class="btnGroup">
      <div class="total"> 현재 <p class="cnt">{{listCnt}}건</p>의 문의글이 등록되어 있습니다. </div>
     
      <div class="searchBox">
        <div class="custom-search">
          <input type="text" class="custom-search-input" v-model="keyword" 
            @keyup.enter="searchList()" placeholder="검색어를 입력하세요."/>
        </div>
          <!-- 문의하기 버튼 -->
          <button class="qnaBtn" @click="$router.push({ name:'qnaInsert' })">
            문의하기
          </button>
      </div>
    </div>

      <table>
        <thead>
        <tr>
          <th>번호</th>
          <th>구분</th>
          <th>제목</th>
          <th>상태</th>
          <th>작성일</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{item.rnum}}</td>
            <td>{{item.sort_name}} 문의</td>
            <td><RouterLink :to="`/moaplace.com/board/qna/detail/${item.qna_num}`">
                 {{item.qna_title}}
                </RouterLink></td>
            <td>{{item.qna_state}}</td>
            <td>{{item.qna_regdate}}</td>
          </tr>
        </tbody>
      </table>

      <!-- 페이징 -->
      <div id="mypaging">
          <p v-if="startPage>5"
            @click="movePage(pageNum-1)">
            [이전]
          </p>
          <p v-if="startPage<5"> [이전] </p>

        <div v-for="index in ((endPage-startPage)+1)" :key="index">
          <p :class="{active:startPage+(index-1)==pageNum}"
            @click="movePage(startPage+(index-1))">
            {{startPage+(index-1)}} 
          </p>
        </div>

          <p v-if="endPage<pageCnt"
            @click="movePage(pageNum+1)">
            [다음] 
          </p>
          <p v-if="endPage>=pageCnt"> [다음] </p>
      </div>

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
      member_num:1,
      pageNum: 1, // 현재 페이지
      keyword:'', // 검색어
      list: [], // 문의글 리스트
      listCnt: 0, // 전체 문의글 개수
      startPage:0, // 페이지 시작번호
      endPage:0, // 페이지 마지막번호
      pageCnt:0, // 전체 페이지 개수
    }
  },
  created() {
    // this.member_num = this.$route.state.member_num;

    if(this.$route.params.pageNum) {
      this.pageNum = this.$route.params.pageNum;
    }
    if(this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword;
    }

    console.log(this.pageNum);
    console.log(this.keyword);
    this.qnaList(); // 리스트 불러오기
  },
  methods: {
    async qnaList() {
      try { 
        await axios.get("/moaplace.com/board/qna/list", {params:
          { member_num:this.member_num,
            pageNum:this.pageNum,
            keyword:this.keyword}
        }).then(function(resp){

          if(resp.status == 200) {
            this.pageNum = resp.data.pageNum, // 페이지 번호
            this.keyword = resp.data.keyword, // 검색어
            this.list = resp.data.list, // 문의글 리스트
            this.listCnt = resp.data.listCnt, // 전체 문의글 개수
            this.startPage = resp.data.startPage, // 페이지 시작번호
            this.endPage = resp.data.endPage, // 페이지 마지막번호
            this.pageCnt= resp.data.pageCnt // 전체 페이지 개수

          } else {
            alert('페이지 로딩에 실패하였습니다. 다시 시도해주세요.');
          }
        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    },
    searchList(){
      this.pageNum = 1;
      this.qnaList();
    },
    movePage(move){
      this.pageNum = move;
      console.log(this.pageNum);
      this.qnaList();
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction:column;
  width: $width;
  color: $black;
  padding-top: 50px;
  margin: 32px auto;

  h2.title{
    font-size: 32px;
    text-align: center;
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
  .btnGroup{
    display: flex;
    justify-content: space-between;
    margin: 32px 0 8px 0;
    align-items: center;

    .total {
      display: flex;
      justify-content: flex-end;
      color: gray;
      padding-bottom:0;

      .cnt{
        color: #D67747;
        font-weight: bold;
        margin-left: 8px;
        margin-bottom: 0;
      }
    }
    .custom-search {
      width: 300px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      opacity: 1;
    }
    .custom-search-input {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 10px 50px 10px 20px;
      outline: none;
      background-image: url(@/assets/moaplace/search.png);
      background-position: 260px center;
      background-size: 25px 25px;
      background-repeat: no-repeat;
      padding-left: 20px;
      box-sizing: border-box;
      outline: none;
    }
    .searchBox {
      display: flex;

      .qnaBtn {
        background-color: $brown;
        padding: 16px 40px;
        border: 1px solid transparent;
        margin-left: 16px;
        color: white;
        transition: all 0.3s;

        &:hover {
          border: 1px solid $brown;
          background-color: white;
          color: $brown;
        }
      }
    }
  }
  
  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    border-top: 2px solid $black;
    border-bottom: 1px solid $black;

    tr{
      vertical-align : middle;
      border-bottom: 1px solid #ddd;

      & > *:nth-child(3) {
        width:60%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover {
          background-color: rgb(249,249,249);
          color: $brown;
      }
    }

    thead {
      th {
        vertical-align : middle;
        border-bottom: 1px solid $black;
        padding: 20px 0;
      }
    }

    tbody{
      td {
        padding: 20px 0;
        vertical-align : middle;
        a {
          width:100%;
          color:$black;
          text-decoration: none;
          &:hover {
            color: $brown;
          }
        }
      }
    }
  }

  #mypaging{
    display: flex;
    justify-content: center;
    margin:16px 4px;

    p {
      padding : 0 8px;
      color:$black;
      cursor:pointer;

      &.active {
        color: #D67747;
        font-weight: bold;
      }

      &:hover {
        background: #ddd;
      }
    }
  }
}
</style>