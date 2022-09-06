<template>
  <div class="containers">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="새소식" />
    <div class="title inner_wrap">
      <h2 class="tit">새소식</h2>
      <p class="txt">
        문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
      </p>
    </div>
    <div class="con">
      <div class="inner_wrap">
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
            <button :class="{ search: isSearch }" @click.prevent="searchList()">
              <img src="@/assets/moaplace/search.png" />
            </button>
          </div>
        </div>
        <div class="content">
          <table cellpadding="0" cellspacing="0" class="table">
            <tbody>
              <tr>
                <th>NO</th>
                <th>구분</th>
                <th>제목</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
              <tr class="important" v-for="(i, index) in list" :key="index">
                <td class="num">{{ i.notice_num }}</td>
                <td>{{ i.sort_name }}</td>
                <td class="tit">
                  <RouterLink
                    :to="`/moaplace.com/moaplace/news/detail/${i.notice_num}`"
                    >{{ i.notice_title }}</RouterLink
                  >
                </td>
                <td class="date">{{ i.notice_regdate }}</td>
                <td class="hit">{{ i.notice_hit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page">
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
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SideVisual from "@/components/SideVisual.vue";
import axios from "@/axios/axios.js";

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
  },
  data() {
    return {
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
          notice_title: "",
          notice_regdate: "",
          notice_hit: "",
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(this.pageNum); /* 클릭하는페이지 num */

      // alert(this.selected);
      // alert(this.member_num);
      axios.get(`/moaplace.com/moaplace/news/list/${this.pageNum}`).then(
        function (resp) {
          console.log(resp.data);
          this.list = resp.data.list;
          this.startPageNum = resp.data.startPageNum;
          this.endPageNum = resp.data.endPageNum;
          this.totalPageCount = resp.data.totalPageCount;
          this.totalRowCount = resp.data.totalRowCount;
          this.startRow = resp.data.startRow;
          this.endRow = resp.data.endRow;
          console.log("리스트 불러오기 성공");
        }.bind(this)
      );
    },
    //@change 했을 때 메소드 진행
    selectchange() {
      this.getList();
    },
    searchList() {
      if (this.keyword == null || this.keyword == "") {
        alert("검색어를 검색해주세요");
      } else {
        this.isSearch = true;
        axios
          .get(
            `/moaplace.com/moaplace/news/list/${this.selected2}/${this.keyword}/${this.pageNum}`
          )
          .then(
            function (resp) {
              this.list = resp.data.list;
              this.startPageNum = resp.data.startPageNum;
              this.endPageNum = resp.data.endPageNum;
              this.totalPageCount = resp.data.totalPageCount;
              this.totalRowCount = resp.data.totalRowCount;
              this.startRow = resp.data.startRow;
              this.endRow = resp.data.endRow;
              console.log("검색 리스트 불러오기 성공");
            }.bind(this)
          );
      }
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
      if (this.keyword == null || this.keyword == "") {
        this.getList();
      } else {
        this.searchList();
      }
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

<style lang="scss" scoped>
@import "@/scss/common.scss";
$brown: #826d5e;
.containers {
  width: 100%;
  margin: 0 auto;
}
.inner_wrap {
  width: $width;
  margin: 0 auto;
}
.title {
  text-align: center;
  padding: 125px 0 80px;
  .tit {
    font-size: 32px;
    margin-bottom: 8px;
  }
}
.con {
  padding: 0 0 150px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .inner_wrap {
    justify-content: space-between;
    margin-top: 50px;

    select {
      width: 100px;
      height: 40px;
      border-color: #ccc;
      padding: 0 28px 0 15px;
      -webkit-appearance: none;
      appearance: none;
      background: url("@/assets/board/arrow.png") no-repeat 95% 50%/20px auto;
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
      margin-bottom: 24px;
      justify-content: flex-end; /* 수평축,수직축 */
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
  .table {
    width: 100%;
    border-top: 2px solid $black;
    table-layout: fixed;
    a {
      text-decoration: none;
      color: $black;
    }
    tr {
      & > *:nth-child(1) {
        width: 10%;
        padding: 0 16px;
      }
      & > *:nth-child(2) {
        width: 15%;
        padding: 0 8px;
      }
      & > *:nth-child(3) {
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 16px;
      }
    }
    tbody {
      vertical-align: middle;
    }
    th,
    td {
      border-bottom: 1px solid #e5e5e5;
      text-align: center;
      padding: 20px 0;
      box-sizing: border-box;
    }
    th {
      border-bottom: 1px solid $black;
      font-weight: 800;
    }

    tr.important:hover {
      background-color: #f6f6f6;
      cursor: pointer;
    }
    .td.hit,
    .td.date {
      width: 20%;
      padding: 10px 0;
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
</style>