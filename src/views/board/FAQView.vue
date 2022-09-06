<template>
  <div>
    <AppHeader />
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="FAQ"/>

    <div class="app">
      <h2 class="title">자주 묻는 질문(FAQ)</h2>
      <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

      <!-- 상단 메뉴 -->
      <div class="headerBox">
        <select v-model="sort_num" @change="filterList()">
          <option value="0"> 전체 </option>
          <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
            {{sort.sort_name}} 문의
          </option>
        </select>

        <div class="searchBox">
          <div class="custom-search">
            <input type="text" class="custom-search-input" v-model="newKeyword" 
              @keyup.enter="searchList()" placeholder="검색어를 입력하세요."/>
            <i class="material-icons" @click="searchList()">
              search
            </i>
          </div>
          <button class="qnaBtn" @click="$router.push({ name: 'qnaInsert' })">
            1:1문의
          </button>
        </div>
      </div>

      <!-- 메인 리스트 -->
      <div
        class="faq_main"
        v-for="(e, index) in list"
        :key="index"
        :class="{ active: e.isActive }"
      >
        <div class="faq_title" @click="isMatch(index)">
          <span>{{e.rnum}}</span>
          <span>{{e.sort_name}} 문의 </span>
          <span class="title">{{e.faq_title}}</span>
          <span class="arrow"><img src="@/assets/board/arrow.png"/></span>
        </div>

        <div class="faq_content" v-if="e.open" v-html="e.faq_content"></div>
      </div>

      <!-- 리스트 내역 없을 때 -->
      <div class="empty-list" v-if="list.length < 1">
        <i class="material-symbols-outlined">info</i>
        <p> FAQ 내역이 존재하지 않습니다. </p>
      </div>

      <!-- 페이징 -->
      <div id="mypaging">
        <p v-if="startPage>5"
          @click="movePage(pageNum-1)" class="act">
          [이전]
        </p>
        <p v-if="startPage<5" class="noActive"> [이전] </p>

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
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SideVisual from "@/components/SideVisual.vue";
import axios from '@/axios/axios.js';

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
  },
  created() {
    if(this.$route.params.pageNum) {
      this.pageNum = this.$route.params.pageNum;
    }
    if(this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword;
    }
    
    this.sortList();
    this.faqList();
  }, 
  data() {
    return {
      sort_list: [],
      list: [],
      pageNum: 1, // 현재 페이지
      keyword:'', // 검색어
      newKeyword: '', // 검색어 변경
      startPage:1, // 페이지 시작번호
      endPage:1, // 페이지 마지막번호
      pageCnt:1, // 전체 페이지 개수      
      sort_num:0 // 필터용 구분
    }
  },
  methods: {
    async sortList() { // 구분목록 불러오기
      await axios.get('/moaplace.com/board/sort/list')
                 .then(resp => {
                    this.sort_list = resp.data
                  })
                 .catch (error => {
                    console.log(error);
                  })                
    },
    async faqList() {
      await axios.get("/moaplace.com/admin/faq/list", 
                    {params:
                      { pageNum: this.pageNum,
                        keyword: this.keyword,
                        sort_num: this.sort_num }
                  })
                 .then(resp => {

                    this.list = [];
                    resp.data.list.forEach(e => {
                      this.list.push({
                        rnum: e.rnum,
                        sort_name: e.sort_name,
                        faq_title: e.faq_title,
                        faq_content: e.faq_content,
                        open: false, 
                        isActive: false
                      }) 
                    });

                    this.field = resp.data.field, // 검색어
                    this.keyword = resp.data.keyword, // 검색어
                    this.newKeyword = resp.data.keyword, // 검색어 변경
                    this.sort_num = resp.data.sort_num, // 필터용 구분번호
                    this.pageNum = resp.data.pageNum, // 페이지 번호
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
    searchList(){ // 리스트 검색
      if(this.newKeyword=='' || this.newKeyword==null){
        alert('검색어를 입력하세요.')
        return;
      } 
      this.pageNum = 1;
      this.keyword = this.newKeyword; // 검색어 변경
      this.faqList();
    },
    filterList(){
      this.pageNum = 1;
      this.faqList();
    },
    movePage(move){ // 페이지 이동
      this.pageNum = move;
      this.faqList();
    },    
    isMatch(e) {
      if (this.list[e].isActive) {
        this.list[e].isActive = false;
        this.list[e].open = false;
      } else {
        this.list[e].isActive = true;
        this.list[e].open = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/common.scss";

.app {
  width: $width;
  display: flex;
  flex-direction: column;
  color: $black;
  margin: 50px auto;

  h2.title {
    font-size: 32px;
    text-align: center;
    margin-top: 32px;
    & + p {
      text-align: center;
      margin-bottom: 64px;
    }
  }

  // 상단 메뉴
  .headerBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    select {
      width: 160px;
      height: 56x;
      border-color: #ccc;
      padding: 0 28px 0 15px;
      -webkit-appearance: none;
      appearance: none;
      background: url("../../assets/board/arrow.png") no-repeat 95% 50%/20px auto;
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

  // 메인 리스트
  .faq_main {
    width: 1100px;
    color: $black;
    border: 1px solid #ccc;
    margin-top: -1px;
    .faq_title {
      width: 100%;
      padding: 25px;
      text-align: left;
      span {
        text-align: center;
        &:first-child{
          display:block;
          float: left;
          width:10%;
        }
        &:nth-child(2),
        &:nth-child(3){
          margin: 8px 48px;
        }
      }
      .arrow {
        img {
          width: 25px;
          height: 20px;
          float: right;
          margin-right: 50px;
        }
      }
      &:hover {
        background-color: rgb(249, 249, 249);
        cursor: pointer;
        color: #d67747;
      }
    }
    .faq_content {
      background-color: rgb(243, 241, 241);
      padding: 48px;
      p {
        margin-bottom: 0;
      }
    }
    ::v-deep p{
              margin-bottom: 0;
            }
  }
  .faq_main.active {
    .faq_title {
      color: #d67747;
    }
    .arrow {
      img {
        transform: rotate(-180deg);
        transition: all 0.3s;
      }
    }
  }
  .empty-list{
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba($black, 0.1);
    border-bottom: 1px solid rgba($black, 0.1);
    color: rgba($black, 0.7);
    i{
      margin-right:8px;
    }
    & > p{
      margin-bottom: 0;
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
