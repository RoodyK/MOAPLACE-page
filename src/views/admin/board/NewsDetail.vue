<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판 관리" mediumCategory="새소식" />
    <main id="main">
      <div class="inner">
        <h2 class="title">공지사항 - 자세히보기</h2>
        <div class="info-box">
          <div v-for="(i, index) in news.splice(0, 1)" :key="index">
            <table>
              <tr>
                <th>번호</th>
                <td>{{ i.notice_num }}</td>
              </tr>
              <tr>
                <th>구분</th>
                <td>{{ i.sort_name }}</td>
              </tr>
              <tr>
                <th>제목</th>
                <td>{{ i.notice_title }}</td>
              </tr>
              <tr>
                <th>첨부파일</th>
                <td>
                  <ul>
                    <li v-for="(list, index) in filelist" :key="index">
                      <button @click.prevent="download(list.notice_detail_num)">
                        <img src="@/assets/admin/download.png" />
                      </button>
                      {{ list.notice_orgfile }}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td colspan="2">{{ i.notice_content }}</td>
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
import axios from "@/axios/axios.js";
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      news: [
        {
          notice_num: "",
          sort_name: "",
          notice_title: "",
          notice_content: "",
          notice_orgfile: "",
        },
      ],
      filelist: [],
      member_num: 1,
      notice_num: "",
      notice_detail_num: "",
    };
  },
  //렌더링 되기 전에 메소드 실행시켜주는 게 좋다. created -> mounted 순으로 실행되는 것
  created() {
    this.notice_num = this.$route.params.notice_num;
    console.log("mounted: ", this.notice_num);
    this.getdetail();
  },
  // mounted() {
  //   this.notice_num = this.$route.params.notice_num;
  //   console.log("created: ", this.notice_num);

  // },

  //리스트 v-for 중복 방지를 위해 v-for에 splice를 써줌 -> 반복 수 제한
  methods: {
    getdetail() {
      console.log("메소드 notice_num", this.notice_num);
      console.log("메소드 member_num", this.member_num);
      console.log("메소드 notice_detail_num", this.notice_detail_num);
      axios
        .get(
          `/moaplace.com/admin/news/detail/${this.member_num}/${this.notice_num}`
        )
        .then(
          function (resp) {
            // console.log(resp.data);
            this.news = resp.data.list;
            this.filelist = resp.data.filelist;

            console.log(this.news);
            console.log("파일리스트", this.filelist);
            // this.news.notice_num = resp.data.notice_num;
            // console.log(this.news.notice_num);
          }.bind(this)
        );
    },
    download(notice_detail_num) {
      console.log("파일넘버:", notice_detail_num);
      window.location = `/moaplace.com/admin/news/file/download/${notice_detail_num}`;
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
          //이미지 재
          button {
            background: none;
            border: none;
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