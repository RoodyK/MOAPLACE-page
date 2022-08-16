<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판 관리" mediumCategory="News" />
    <main id="main">
      <div class="inner">
        <h2 class="title">공지사항 - 자세히보기</h2>

        <div class="info-box">
          <div>
            <table>
              <tr>
                <th>번호</th>
                <td>{{ news.num }}</td>
              </tr>
              <tr>
                <th>구분</th>
                <td>{{ news.sort }}</td>
              </tr>
              <tr>
                <th>제목</th>
                <td>{{ news.title }}</td>
              </tr>
              <tr>
                <th>첨부파일</th>
                <td>{{ news.file }}</td>
              </tr>
              <tr>
                <td colspan="2">{{ news.content }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="btn-box">
          <button @click="$router.push({ name: 'adminNewsList' })">이전</button>
          <button>삭제</button>
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
      news: {
        num: 5,
        sort: "예매",
        title: "예매 내역은 어떻게 확인할 수 있나요?",
        file: "",
        content:
          "회원 로그인 후 마이페이지 예매내역 조회페이지에서 확인하실 수 있습니다.",
      },
      states: ["공연", "대관", "좌석", "예매", "관람", "회원", "주차", "기타"],
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

    .info-box {
      margin: 32px 0;
      div {
        padding-top: 16px;
        table {
          border-collapse: collapse;
          width: 100%;
          border-top: 3px solid $brown;
          tr {
            td,
            th {
              padding: 8px 16px;
              border-bottom: 1px solid rgba($black, 0.3);
            }
            th {
              width: 15%;
              background: #eee;
              text-align: center;
            }

            &:nth-child(5) {
              vertical-align: top;
              height: 250px;
              td {
                padding: 16px 16px;
              }
            }
          }
        }
      }
    }

    .btn-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      button {
        width: calc((100% - 16px) / 2);
        padding: 12px 0;
        border: none;
        &:last-child {
          background-color: $brown;
          color: #fff;
        }
      }
    }
  }
}
</style>