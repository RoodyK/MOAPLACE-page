<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판관리" mediumCategory="FAQ" />
    <main id="main">
      <div class="inner">
        <h2 class="title">FAQ 관리</h2>

        <div class="headerBox">
          <select>
            <option value="">전체</option>
            <option name="faq_sort" value="공연">공연 관련</option>
            <option name="faq_sort" value="대관">대관 관련</option>
            <option name="faq_sort" value="예매">예매 관련</option>
            <option name="faq_sort" value="관람">관람 관련</option>
            <option name="faq_sort" value="회원">회원 관련</option>
            <option name="faq_sort" value="기타">기타</option>
          </select>

          <div class="searchBox">
            <div class="custom-search">
              <input
                type="text"
                class="custom-search-input"
                placeholder="검색어를 입력하세요."
              />
            </div>
            <!-- 신규등록 버튼 -->
            <button
              class="newBtn"
              @click="$router.push({ name: 'adminFaqInsert' })"
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
            <p>상세보기</p>
            <p>삭제</p>
          </div>
          <div v-for="item in list" :key="item.num" class="t-row tbody">
            <p>{{ item.num }}</p>
            <p>{{ item.sort }}</p>
            <p>{{ item.title }}</p>
            <p>
              <button @click="$router.push({ name: 'adminFaqDetail' })">
                상세보기
              </button>
            </p>
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
      </div>
    </main>
  </div>
</template>

    <script>
import SideMenu from "@/components/admin/SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      list: [
        {
          num: "5",
          sort: "예매",
          title: "예매 내역은 어떻게 확인할 수 있나요?",
          content:
            "회원 로그인 후 마이페이지 예매내역 조회페이지에서 확인하실 수 있습니다.",
        },
        {
          num: "4",
          sort: "관람",
          title: "공연 시작 몇 분 전부터 입장 가능한가요?",
          content:
            "일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다. 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.",
        },
        {
          num: "3",
          sort: "관람",
          title: "공연장 내에 음식물 반입이 가능한가요?",
          content:
            "음식물은 일체 반입 금지되어 있습니다. 음식물은 공연장 밖에서 다 드신 후 객석으로 입장해 주시기 바랍니다.",
        },
        {
          num: "2",
          sort: "관람",
          title: "공연 시작 몇 분 전부터 입장 가능한가요?",
          content:
            "일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.",
        },
        {
          num: "1",
          sort: "관람",
          title: "공연 시작 몇 분 전부터 입장 가능한가요?",
          content:
            "일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.",
        },
      ],
    };
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
        width: 150px;
        height: 40px;
        border-color: #ccc;
        padding: 0 28px 0 15px;
        -webkit-appearance: none;
        appearance: none;
        background: url("../../../assets/board/arrow.png") no-repeat 95% 50%/20px
          auto;
      }
      .custom-search {
        width: 300px;
        height: 40px;
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
        .newBtn {
          background-color: $black;
          padding: 0 32px;
          height: 40px;
          border: none;
          margin-left: 16px;
          color: white;
          transition: all 0.3s;

          &:hover {
            border: 1px solid $black;
            background-color: white;
            color: $black;
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