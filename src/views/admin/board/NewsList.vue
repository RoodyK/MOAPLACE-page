<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판관리" mediumCategory="새소식" />
    <main id="main">
      <div class="inner">
        <h2 class="title">공지 사항</h2>
        <form>
          <div class="headerBox">
            <select v-model="selected" @change="selectchange()">
              <option
                v-for="(list, sort_num) in sorts"
                :key="sort_num"
                :value="list.sort_num"
              >
                {{ list.sort_name }}
              </option>
            </select>
            <div class="searchBox">
              <div class="custom-search">
                <select v-model="selected2">
                  <option
                    v-for="(f, field_value) in fieldList"
                    :key="field_value"
                    :value="f.field_value"
                  >
                    {{ f.field_name }}
                  </option>
                </select>
                <input
                  type="text"
                  v-model="keyword"
                  class="custom-search-input"
                  placeholder="검색어를 입력하세요."
                  :class="{ search: isSearch }"
                  @keydown.enter="searchList()"
                />
                <button
                  :class="{ search: isSearch }"
                  @click.prevent="searchList()"
                >
                  <img src="@/assets/moaplace/search.png" />
                </button>
              </div>
              <!-- 신규등록 버튼 -->
              <button
                class="newBtn"
                @click="$router.push({ name: 'adminNewsInsert' })"
              >
                등록하기
              </button>
            </div>
          </div>
          <div class="list">
            <div class="t-row thead">
              <p>번호</p>
              <p>구분</p>
              <p>제목</p>
              <p>작성일</p>
              <p>수정</p>
              <p>삭제</p>
            </div>
            <div v-for="(i, index) in list" :key="index" class="t-row tbody">
              <p>{{ i.notice_num }}</p>
              <p>{{ i.sort_name }}</p>
              <p>
                <RouterLink
                  :to="`/moaplace.com/admin/news/detail/${i.member_num}/${i.notice_num}`"
                  >{{ i.notice_title }}</RouterLink
                >
              </p>
              <p>{{ i.notice_regdate }}</p>
              <p>
                <RouterLink
                  :to="`/moaplace.com/admin/news/update/${i.notice_num}`"
                  ><button type="button">수정</button></RouterLink
                >
              </p>
              <p>
                <button type="button" @click="deletenews(i.notice_num)">
                  삭제
                </button>
              </p>
            </div>
            <ul class="paging">
              <li
                v-if="this.startPageNum < 6"
                @click.prevent="prevPage()"
                class="disabled"
              >
                [이전]
              </li>
              <li
                v-if="this.startPageNum > 5"
                @click.prevent="prevPage()"
                class="abled"
              >
                [이전]
              </li>
              <li
                :class="{ active: this.pageNum == n }"
                v-for="n in paginationList"
                :key="n"
                @click="movePage(n)"
              >
                {{ n }}
              </li>
              <li
                v-if="this.startPageNum + 4 < this.totalPageCount"
                @click.prevent="nextPage()"
                class="abled"
              >
                [다음]
              </li>
              <li
                v-if="this.startPageNum + 5 > this.totalPageCount"
                @click.prevent="nextPage()"
                class="disabled"
              >
                [다음]
              </li>
            </ul>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import SideMenu from "@/components/admin/SideMenu.vue";
import axios from "@/axios/axios.js";
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      sorts: [
        { sort_num: 0, sort_name: "전체" },
        { sort_num: 1, sort_name: "공연" },
        { sort_num: 2, sort_name: "대관" },
        { sort_num: 3, sort_name: "예매" },
        { sort_num: 4, sort_name: "관람" },
        { sort_num: 5, sort_name: "회원" },
        { sort_num: 6, sort_name: "기타" },
      ],
      selected: 0,
      /* select v-model : value, option : value */
      fieldList: [
        { field_value: "total", field_name: "전체" },
        { field_value: "title", field_name: "제목" },
        { field_value: "content", field_name: "내용" },
      ],
      selected2: "total",
      keyword: "",
      list: [
        {
          notice_num: "",
          sort_name: "",
          sort_num: "",
          member_num: "",
          notice_title: "",
          notice_regdate: "",
        },
      ],
      pageNum: 1,
      // 확인
      startPageNum: "",
      endPageNum: "",
      totalRowCount: "",
      startRow: "",
      endRow: "",
      totalPageCount: "",
      isActive: false,
      isSearch: false,
      rememberWord: ''
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      axios.get(`/moaplace.com/admin/news/list/${this.selected}`).then(
        function (resp) {
          // console.log("멤버번호:", this.member_num);
          // console.log(resp.data);
          this.list = resp.data.list;
          this.pageutil = resp.data.pageutil;
          this.startPageNum = resp.data.startPageNum;
          this.endPageNum = resp.data.endPageNum;
          this.totalPageCount = resp.data.totalPageCount;
          this.totalRowCount = resp.data.totalRowCount;
          this.startRow = resp.data.startRow;
          this.endRow = resp.data.endRow;
          this.selected = resp.data.sort_num;
          // console.log("리스트 불러오기 성공");

          // alert("this.endPageNum:" + this.endPageNum);
          //alert("this.totalRowCount:" + this.totalPageCount);
        }.bind(this)
      );
    },
    //@change 했을 때 메소드 진행
    selectchange() {
      this.getList();
    },
    searchList() {
      if (this.keyword !== null || this.keyword !== "") {
        this.isSearch = true;
        this.rememberWord = this.keyword;
        axios
          .get(
            `/moaplace.com/admin/news/list/${this.selected}/${this.selected2}/${this.keyword}`
          )
          .then(
            function (resp) {
              this.list = resp.data.list;
              this.pageutil = resp.data.pageutil;
              this.startPageNum = resp.data.startPageNum;
              this.endPageNum = resp.data.endPageNum;
              this.totalPageCount = resp.data.totalPageCount;
              this.totalRowCount = resp.data.totalRowCount;
              this.startRow = resp.data.startRow;
              this.endRow = resp.data.endRow;
              this.pageNum = resp.data.pageNum;
              this.selected = resp.data.sort_num;
              this.selected2 = resp.data.field;
              this.keyword = resp.data.keyword;
              // console.log("검색 리스트 불러오기 성공");
            }.bind(this)
          );
      }
    },
    deletenews(notice_num) {
      // console.log("파일넘버:", notice_num);
      axios
        .get(`/moaplace.com/admin/news/delete/${notice_num}`)
        .then((resp) => {
          if (resp.data == 1) {
            alert("목록을 삭제하였습니다.");
            // this.$router.push({ name: "adminNewsList" });
            this.getList();
            // console.log("삭제성공");
          } else {
            alert("삭제가 실패되었습니다. 다시 확인해주세요");
            // console.log("삭제실패");
          }
        });
    },

    // class -> css 처리용 , prevPage -> alert
    prevPage() {
      if (this.startPageNum < 6) {
        alert("첫 페이지입니다.");
      } else {
        this.movePage(this.startPageNum - 1);
      }
    },
    nextPage() {
      if (this.startPageNum + 5 > this.totalPageCount) {
        alert("마지막 페이지입니다.");
      } else {
        this.movePage(this.endPageNum + 1);
      }
    },
    /* 패이지 클릭했을 때 해당 메소드 각각 실행 -> 삼항연산자 이용도 고려 */
    movePage(n) {
      this.pageNum = n;
      const url = this.isSearch
        ? `/moaplace.com/admin/news/list/${this.selected}/${this.selected2}/${this.rememberWord}/${this.pageNum}`
        : `/moaplace.com/admin/news/list/${this.selected}/${this.pageNum}`;
      axios.get(url).then(
        function (resp) {
          this.list = resp.data.list;
          this.pageutil = resp.data.pageutil;
          this.startPageNum = resp.data.startPageNum;
          this.startRow = resp.data.startRow;
          this.endPageNum = resp.data.endPageNum;
          this.endRow = resp.data.endRow;
          this.pageNum = resp.data.pageNum;
          this.totalRowCount = resp.data.totalRowCount;
          this.totalPageCount = resp.data.totalPageCount;
          this.selected = resp.data.sort_num;
          this.keyword = resp.data.keyword;

          if (this.keyword !== null && this.keyword !== "") {
            this.keyword = resp.data.keyword;
          }
        }.bind(this)
      );
    },
  },
  computed: {
    paginationList() {
      let pageList = [];
      for (let num = this.startPageNum; num <= this.endPageNum; num++) {
        pageList.push(num);
      }
      return pageList;
    },
  },
};
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
    .headerBox {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      margin-bottom: 10px;

      select {
        width: 100px;
        height: 40px;
        border-color: #ccc;
        padding: 0 28px 0 15px;
        -webkit-appearance: none;
        appearance: none;
        background: url("../../../assets/board/arrow.png") no-repeat 95% 50%/20px
          auto;
      }
      .custom-search {
        width: 350px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        opacity: 1;
        position: relative;
        select {
          border-right: none;
          width: 120px;
        }
        button {
          position: absolute;
          right: 14px;
          border: none;
          background-color: #fff;
          background-image: url(@/assets/moaplace/search.png);
          background-position: 260px center;
          background-size: 25px 25px;
          background-repeat: no-repeat;
          padding-left: 16px;
          box-sizing: border-box;
        }
      }
      .custom-search-input {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 10px 50px 10px 20px;
        outline: none;
        border-left: none;
      }
      .searchBox {
        display: flex;

        .newBtn {
          background-color: $black;
          padding: 0 32px;
          height: 40px;
          border: none;
          margin-left: 16px;
          color: white;
          transition: all 0.3s;
          &:hover {
            cursor: pointer;
          }
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
            width: 8%;
          }
          &:nth-child(3) {
            width: 45%;
          }
          a {
            text-decoration: none;
            color: $black;
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
      .paging {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        margin-top: 32px;
        // class -> css 처리용 , prevPage -> alert
        li {
          margin: 0 8px;
          padding: 0 8px;
          cursor: pointer;

          &.abled {
            color: $brown;
            font-weight: bold;
          }
          &.disabled {
            color: rgba($black, 0.5);
            cursor: default;
            font-weight: bold;
          }
          &.active {
            color: #d67747;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>