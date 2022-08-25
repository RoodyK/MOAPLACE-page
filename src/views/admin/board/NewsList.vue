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
                  @keydown.enter="searchlist()"
                />
                <button @click.prevent="searchlist()">
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
            <div v-for="item in list" :key="item.num" class="t-row tbody">
              <p>{{ item.notice_num }}</p>
              <p>{{ item.sort_name }}</p>
              <p>{{ item.notice_title }}</p>
              <p>{{ item.notice_regdate }}</p>
              <p><button>수정</button></p>
              <p><button>삭제</button></p>
            </div>
            <ul class="paging">
              <li>[이전]</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>[다음]</li>
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
      member_num: 1,
      list: [
        {
          notice_num: "",
          sort_name: "",
          notice_title: "",
          notice_content: "",
          notice_regdate: "",
        },
      ],
      startPageNum: "",
      endPageNum: "",
      pageNum: "",
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      // alert(this.selected);
      // alert(this.member_num);
      axios
        .get(
          `/moaplace.com/admin/news/list/${this.selected}/${this.member_num}`
        )
        .then(
          function (resp) {
            console.log(resp.data);
            this.list = resp.data.list;
            console.log("리스트 불러오기 성공");
          }.bind(this)
        );
    },
    //@change 했을 때 메소드 진행
    selectchange() {
      this.getList();
    },

    searchlist() {
      if (this.keyword == null || this.keyword == "") {
        alert("검색어를 검색해주세요");
      } else {
        axios
          .get(
            `/moaplace.com/admin/news/list/${this.selected}/${this.selected2}/${this.keyword}/${this.member_num}`
          )
          .then(
            function (resp) {
              console.log(resp.data);
              this.list = resp.data.list;
              console.log("리스트 불러오기 성공");
            }.bind(this)
          );
      }
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
          // cursor: pointer;
          // &:hover {
          //     background: #eee;
          // }
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
            width: 5%;
          }
          &:nth-child(3) {
            width: 45%;
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
        li {
          margin: 0 8px;
          padding: 0 8px;
          &:first-child,
          &:last-child {
            color: $brown;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>