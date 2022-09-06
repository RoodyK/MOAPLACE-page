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
          <input type="text" class="custom-search-input" v-model="newKeyword" 
            @keyup.enter="searchList()" placeholder="검색어를 입력하세요."/>
          <i class="material-icons" @click="searchList()">
            search
          </i>
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
          <tr v-for="(item, index) in list" :key="index" 
          @click="$router.push({name: 'qnaDetail', params: {qna_num:item.qna_num}})">
            <td>{{item.rnum}}</td>
            <td>{{item.sort_name}} 문의</td>
            <td>{{item.qna_title}}</td>
            <td>{{item.qna_state}}</td>
            <td>{{item.qna_regdate}}</td>
          </tr>

          <!-- 문의 내역이 없을 때 -->
          <tr class="empty-list" v-if="list.length < 1">
            <td colspan="5">
              <p><i class="material-symbols-outlined">info</i>
                  문의 내역이 존재하지 않습니다. </p>
            </td>
          </tr>

        </tbody>
      </table>

      <!-- 페이징 -->
      <div id="mypaging">
        <p v-if="startPage>5"
          @click="movePage(pageNum-1)" class="act">
          [이전]
        </p>
        <p v-if="startPage<=5" class="noActive"> [이전] </p>

        <div v-for="index in ((endPage-startPage)+1)" :key="index">
          <p :class="{active:startPage+(index-1)==pageNum}"
            @click="movePage(startPage+(index-1))">
            {{startPage+(index-1)}} 
          </p>
        </div>

        <p v-if="endPage<pageCnt"
          @click="movePage(pageNum+1)" class="act">
          [다음] 
        </p>
        <p v-if="endPage>=pageCnt" class="noActive"> [다음] </p>
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
      member_num:0,
      list: [], // 문의글 리스트
      listCnt: 0, // 전체 문의글 개수
      pageNum: 1, // 현재 페이지
      keyword:'', // 검색어
      newKeyword: '', // 검색어 변경
      startPage:1, // 페이지 시작번호
      endPage:1, // 페이지 마지막번호
      pageCnt:1, // 전체 페이지 개수
    }
  },
  created() {
    if(this.$route.params.pageNum) {
      this.pageNum = this.$route.params.pageNum;
    }
    if(this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword;
    }

    this.qnaList();
  },
  methods: { 
    async qnaList() {
      if (this.member_num < 1) {
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
                  })
                  .catch(error => {
                      console.log(error.message);
                  })
      }
      // 문의글 리스트
      await axios.get("/moaplace.com/board/qna/list", 
                    { params:
                            { member_num: this.member_num,
                              pageNum: this.pageNum,
                              keyword: this.keyword  }
                  })
                 .then(resp => {
                    this.list = resp.data.list, // 문의글 리스트
                    this.listCnt = resp.data.listCnt, // 전체 문의글 개수
                    this.pageNum = resp.data.pageNum, // 페이지 번호
                    this.keyword = resp.data.keyword, // 검색어
                    this.newKeyword = resp.data.keyword, // 검색어 변경
                    this.startPage = resp.data.startPage // 페이지 시작번호

                    if(resp.data.endPage < 1){
                      this.endPage = 1,
                      this.pageCnt = 1
                    } else {
                      this.endPage = resp.data.endPage, // 페이지 마지막번호
                      this.pageCnt= resp.data.pageCnt // 전체 페이지 개수
                    }
                  })

                 .catch (error => {
                    console.log(error);
                  })
    },
    searchList(){
      if(this.newKeyword=='' || this.newKeyword==null){
        alert('검색어를 입력하세요.')
        return;
      } 
      
      this.pageNum = 1;
      this.keyword = this.newKeyword; // 검색어 변경
      this.qnaList();
    },    
    movePage(move){
      this.pageNum = move;
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
    margin: 32px 0 16px 0;
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
    .searchBox {
      display: flex;

      .custom-search {
        width: 300px;
        height: 60px;
        display: relative;
        justify-content: center;
        align-items: center;
        position:relative;

        .custom-search-input {
          width: 100%;
          height: 100%;
          border: 1px solid #ccc;
          padding: 10px 50px 10px 20px;
        }
        i {
          position: absolute;
          font-size: 40px;
          color:rgba($black, 0.7);
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
      }
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
    }
    thead {
      th {
        vertical-align : middle;
        border-bottom: 1px solid $black;
        padding: 20px 0;
      }
    }
    tbody{
      tr{
        td {
          padding: 20px 0;
          vertical-align : middle;
        }
        &:hover {
          background-color: rgb(249,249,249);
          color: $brown;
          cursor: pointer;
        }
      }
    }
    .empty-list{
      border-bottom: 1px solid rgba($black, 0.1);
      height: 160px;
      color: rgba($black, 0.7);
      p {
        vertical-align: middle;
        margin-bottom:0;
        i{
          vertical-align: middle;
          margin-right: 8px;
        }
      }
      &:hover {
        cursor: default;
        background-color: #fff;
        color: rgba($black, 0.7);
      }
    }
  }

  #mypaging{
    display: flex;
    justify-content: center;
    margin: 32px 0;
    align-items: center;

    .act {
      color: $brown;
      font-weight: bold;
    }
    p {
      padding: 0 6px;
      margin: 0 6px;
      color:$black;
      cursor:pointer;

      &.active {
        color: #D67747;
        font-weight: bold;
      }
    }
    .noActive {
        color:rgba($black, 0.5);
        cursor: default;
        font-weight: bold;
    }
  }
}
</style>