<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판관리" mediumCategory="FAQ" />
    <main id="main">
      <div class="inner">
        <h2 class="title">FAQ 관리</h2>

        <div class="list-top">
          <div class="top-1">
            <select v-model="sort_num" @change="filterList()">
              <option value="0"> 전체 </option>
              <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
                {{sort.sort_name}} 문의
              </option>
            </select>
          </div>

          <div class="top-2">
            <select v-model="field">
              <option value="">검색구분</option>
              <option value="faq_title">제목</option>
              <option value="faq_content">내용</option>
            </select>
            <input type="text" v-model="newKeyword" @keyup.enter="searchList()">
            <i class="material-icons"  @click="searchList()">search</i>
            <button @click="$router.push({name:'adminFaqInsert'})">FAQ등록</button>
          </div>
        </div>

        <div class="list">
          <div class="t-row thead">
            <p>번호</p>
            <p>구분</p>
            <p>제목</p>
            <p>수정</p>
            <p>삭제</p>
          </div>
          <div v-for="i in list" :key="i" class="t-row tbody" 
          @click="$router.push({name:'adminFaqDetail', params: {faq_num: i.faq_num}})">
            <p>{{ i.rnum }}</p>
            <p>{{ i.sort_name }} 문의 </p>
            <p>{{ i.faq_title }}</p>
            <p @click.prevent="prevent($event)">
              <button @click="$router.push('/moaplace.com/admin/faq/update/' + i.faq_num)">
                수정
              </button>
            </p>
            <p @click.prevent="prevent($event)">
              <button @click="deleteFaq(i.rnum, i.faq_num)">삭제</button>
            </p>
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
      </div>
    </main>
  </div>
</template>
<script>
import SideMenu from "@/components/admin/SideMenu.vue";
import axios from '@/axios/axios.js'

export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      sort_list:[],
      list: [],
      field:'', // 검색필드
      keyword:'', // 검색어
      newKeyword:'', // 검색어 변경
      pageNum: 1, // 현재 페이지
      startPage:1, // 페이지 시작번호
      endPage:1, // 페이지 마지막번호
      pageCnt:1, // 전체 페이지 개수
      sort_num:0 // 필터용 구분번호
    }
  },
  created() {
    if(this.$route.params.pageNum) {
      this.pageNum = this.$route.params.pageNum;
    }
    if(this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword;
      this.field = this.$route.params.field;
    }
    
    this.sortList();
    this.faqList(); // 리스트 불러오기
  },
  methods: {
    async sortList() {
      await axios.get('/moaplace.com/board/sort/list')
                  .then(resp => {
                    this.sort_list = resp.data;
                  })
                  .catch (error => {
                    console.log(error);
                  })
    },            
    async faqList() {
      await axios.get("/moaplace.com/admin/faq/list", 
                    { params:
                      { pageNum: this.pageNum,
                        field: this.field,
                        keyword: this.keyword,
                        sort_num: this.sort_num }
                  })
                  .then(resp => {
                    this.list = resp.data.list // 리스트

                    if(resp.data.field=='all'){
                      this.field = ''
                    } else {
                      this.field = resp.data.field // 검색필드
                    }

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
      if(this.field=='' || this.field==null) {
        alert('검색 구분을 선택하세요.')
        return;
      }
      if(this.newKeyword=='' || this.newKeyword==null){
        alert('검색어를 입력하세요.')
        return;
      } 
      this.keyword = this.newKeyword; // 검색어 변경
      this.pageNum = 1;
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
    async deleteFaq(rnum, faq_num){ // faq 삭제
      if(confirm('FAQ '+rnum+'번을 삭제하시겠습니까?')){
        await axios.post("/moaplace.com/admin/faq/delete/"+faq_num)
                   .then(resp => {
                      if(resp.data!='fail') {
                        alert('FAQ가 삭제되었습니다.');
                        this.faqList();

                      } else {
                        alert('FAQ 삭제를 실패하였습니다. 다시 시도해주세요.');
                        return;
                      }
                    })
                   .catch (error => {
                      console.log(error);
                    })
      } else return;
    },
    prevent(e) {
      e.stopPropagation();
    }    
  }
}
</script>

<style lang="scss" scoped="scoped">
@import "@/scss/common.scss";
//삭제필요
$brown: #826d5e;
nav {
  display: none !important;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
// 관리자 페이지 레이아웃 관련 시작------------------
#wrap {
  padding-left: 240px;
  background: #f7f9fa;
  #main {
    width: 100%;
    min-height: 100vh;
    padding: 32px;
    box-sizing: border-box;
    .inner {
      width: $width;
      min-height: 650px;
      margin: 0 auto;
      border: 1px solid rgba($black, 0.5);
      background: #fff;
      padding: 32px;
      h2.title {
        font-size: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba($black, 0.5);
        margin-bottom: 16px;
      }
    }
    // 관리자 페이지 레이아웃 관련 끝------------------
    .list-top {
      width: 100%;
      margin-bottom: 16px;
      display:flex;
      justify-content: space-between;
      font-size: 14px;

      .top-1 {
        width:120px;
        box-sizing: border-box;
        border: 1px solid rgba($black, 0.5);
                        
        & > select {
          width:100%;
          height: 100%;
          padding:0 12px;
          border:none;
          }
      }
      .top-2 {
        position: relative;
        & > select {
          position: absolute;
          top: 50%;
          right: 320px;
          transform: translateY(-50%);
          border:none;
          padding-right: 4px;
        }
        input {
          width: 300px;
          box-sizing: border-box;
          padding: 4px 48px 4px 100px;
        }
        & > i {
          background: transparent;
          position: absolute;
          top: 4px;
          right: 120px;
          color: rgba($black, 0.9);
          cursor:pointer;
        }
        button {
          border: none;
          padding: 6px 24px;
          margin-left: 8px;
          background-color: $black;
          color:#eee;
        }
      } 
    }

    .list {
      .t-row {
        display: table;
        table-layout: fixed;
        width: 100%;
        padding: 8px 0;
        font-size: 14px;

        &.thead {
          background: $black;
          color: #fff;
        }
        &.tbody {
          padding: 16px 0;
          border-bottom: 1px solid rgba($black, 0.2);
          cursor: pointer;
          &:hover {
              background: #eee;
          }
        }
        & > p,
        div {
          display: table-cell;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          & {
            padding-top: 4px;
          }
          &:nth-child(1) {
            width: 50px;
          }
          &:nth-child(3) {
            width: 600px;
          }

          button {
            background-color: rgb(250, 250, 250);
            border: 1px solid rgba($black, 0.2);
            padding: 5px 20px;

            &:hover {
              background-color: #ddd;
            }
          }
        }
      }
      .empty-list{
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba($black, 0.1);
        color: rgba($black, 0.7);
        i{
          margin-right:8px;
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
          padding : 0 6px;
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
  }
}
</style>