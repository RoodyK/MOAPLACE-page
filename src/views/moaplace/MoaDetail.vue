<template>
  <div class="containers">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="새소식" />
    <div class="title inner_wrap">
      <p class="tit">새소식</p>
      <p class="txt">
        문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
      </p>
    </div>
    <div class="con">
      <div class="inner_wrap">
        <div class="header">
          <div class="header_tit">
            [{{ this.sort_name }}]{{ this.notice_title }}
          </div>
          <div class="header_txt">
            <div class="inner">
              <div>
                <div class="inner-tit">작성일</div>
                <div>{{ this.notice_regdate }}</div>
              </div>
              <div>
                <div class="inner-tit">조회수</div>
                <div>{{ this.notice_hit }}</div>
              </div>
            </div>
          </div>
          <div class="header_txt">
            <div class="inner2">
              <div>첨부파일</div>
              <div>
                <ul>
                  <li v-for="(list, index) in filelist" :key="index">
                    <button @click.prevent="download(list.notice_detail_num)">
                      <img src="@/assets/admin/download.png" />
                    </button>
                    {{ list.notice_orgfile }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content-box">
              <TextEditor
                height="300"
                v-html="this.notice_content"
              ></TextEditor>
            </div>
          </div>
        </div>
        <div class="pageinfo">
          <ul class="pagenation">
            <li v-if="this.next1 == null" class="disabled">
              <span>다음글</span> <span>다음글이 없습니다</span>
            </li>
            <li
              v-if="this.next1 != null"
              class="abled"
              @click="gonext(this.next1.notice_num)"
            >
              <span>다음글</span> <span>{{ this.next1.notice_title }}</span>
            </li>
            <li v-if="this.prev1 == null" class="disabled">
              <span>이전글</span> <span>이전글이 없습니다</span>
            </li>

            <li
              v-if="this.prev1 != null"
              class="abled"
              @click="goprev(this.prev1.notice_num)"
            >
              <span>이전글</span> <span>{{ this.prev1.notice_title }}</span>
            </li>
          </ul>
        </div>
        <div class="footer">
          <button
            class="list"
            @click="$router.push({ name: 'moaplaceMoaNews' })"
          >
            목록보기
          </button>
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
      notice_num: "",
      notice_title: "",
      notice_content: "",
      notice_detail_num: "",
      notice_regdate: "",
      notice_hit: "",
      sort_name: "",
      filelist: [],
      next1_num: "",
      next1: {},
      prev1: {},
    };
  },
  created() {
    this.notice_num = this.$route.params.notice;
    console.log("created: ", this.notice_num);
    this.getdetail();
  },
  watch: {
    $route(to, from) {
      // console.log("to", to);
      // console.log("from", from)
      if (to.path !== from.path) {
        this.notice_num = this.$route.params.notice;
        this.getdetail();
      }
    },
  },

  methods: {
    getdetail() {
      // console.log("메소드 notice_num", this.notice_num);
      // console.log("메소드 notice_detail_num", this.notice_detail_num);
      axios.get(`/moaplace.com/moaplace/news/detail/${this.notice_num}`).then(
        function (resp) {
          this.filelist = resp.data.filelist;
          this.notice_title = resp.data.notice_title;
          this.notice_content = resp.data.notice_content;
          this.selected = resp.data.sort_num;
          this.sort_name = resp.data.sort_name;
          this.notice_regdate = resp.data.notice_regdate;
          this.notice_hit = resp.data.notice_hit;

          this.next1 = resp.data.next;
          this.prev1 = resp.data.prev;

          var schedule_date = new Date(this.notice_regdate);
          this.notice_regdate =
            schedule_date.getFullYear() +
            "-" +
            ("0" + (schedule_date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + schedule_date.getDate()).slice(-2);

          /* 다음글 정보가 null 값인지 확인*/

          // console.log("다음글정보:", resp.data.next);
          // console.log("날짜", this.notice_regdate);
          // console.log("파일리스트", this.filelist);
          // console.log("이전글정보:", resp.data.prev);
        }.bind(this)
      );
    },
    gonext() {
      if (this.next1 != null) {
        this.$router.push(
          `/moaplace.com/moaplace/news/detail/${this.next1.notice_num}`
        );
      }
    },
    goprev() {
      if (this.prev1 != null) {
        this.$router.push(
          `/moaplace.com/moaplace/news/detail/${this.prev1.notice_num}`
        );
      }
    },

    // gonext(next1_num) {
    //   // this.notice_num = next1_num;
    //   window.location = `/moaplace.com/moaplace/news/detail/${next1_num}`;
    //   // if (this.next1 != null) {

    //   // axios
    //   //   .get(`/moaplace.com/moaplace/news/detail/${this.next1.notice_num}`)
    //   //   .then(
    //   //     function (resp) {
    //   //       this.filelist = resp.data.filelist;
    //   //       this.notice_title = resp.data.notice_title;
    //   //       this.notice_content = resp.data.notice_content;
    //   //       this.selected = resp.data.sort_num;
    //   //       this.sort_name = resp.data.sort_name;
    //   //       this.notice_regdate = resp.data.notice_regdate;
    //   //       this.notice_hit = resp.data.notice_hit;

    //   //       this.next1 = resp.data.next;
    //   //       this.prev1 = resp.data.prev;

    //   //       var schedule_date = new Date(this.notice_regdate);
    //   //       this.notice_regdate =
    //   //         schedule_date.getFullYear() +
    //   //         "-" +
    //   //         ("0" + (schedule_date.getMonth() + 1)).slice(-2) +
    //   //         "-" +
    //   //         ("0" + schedule_date.getDate()).slice(-2);
    //   //       console.log("페이지 이동 성공", resp.data);
    //   //     }.bind(this)
    //   //   );
    //   // }
    //   // this.$route.go();
    // },
    // goprev(prev1_num) {
    //   // this.notice_num = prev1_num;
    //   window.location = `/moaplace.com/moaplace/news/detail/${prev1_num}`;
    // },
    download(notice_detail_num) {
      // console.log("파일넘버:", notice_detail_num);
      window.location = `http://localhost:9090/moaplace.com/admin/news/file/download/${notice_detail_num}`;
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
  width: 1100px;
  margin: 0 auto;
}
.title {
  text-align: center;
  padding: 125px 0 100px;
  .tit {
    font-size: 40px;
    font-weight: 700;
  }
  .txt {
    font-size: 17px;
    color: #666666;
    margin-top: 15px;
  }
}
.con {
  padding: 0 0 150px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .inner_wrap {
    width: 1100px;
    .header {
      .header_tit {
        border-top: 2px solid $black;
        border-bottom: 2px solid rgba($black, 0.5);
        font-size: 25px;
        font-weight: 700;
        padding: 15px 20px;
      }
      .header_txt {
        display: flex;
        // justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid rgba($black, 0.5);
        .inner {
          display: flex;
          .inner-tit {
            font-weight: bold;
          }

          div:first-child {
            width: 30%;
            display: contents;
          }
          div:last-child {
            margin-left: 16px;
            display: flex;
            & > div {
              width: 500px;
            }
          }
        }
        .inner2 {
          ul {
            margin: 0;
          }
          display: contents;
          div:first-child {
            font-weight: bold;
          }
          button {
            background: none;
            border: none;
          }
        }
      }
    }
    .content {
      height: auto;
      min-height: 400px;
      border-bottom: 1px solid rgba($black, 0.5);
      padding: 15px 20px;
      .content-box {
        width: 100%;
        border: 1px solid rgba($black, 0.3);
        padding: 8px;
        border: none;
        ::v-deep img {
          max-width: 100%;
        }
      }
    }
    .pageinfo {
      border-bottom: 1px solid rgba($black, 0.5);
      .pagenation {
        list-style: none;
        margin: 0;
        padding: 8px 20px;

        li {
          display: flex;
          padding: 3px 0;
          cursor: pointer;
          &:hover {
            /* 자기자신 */ /* &:first-child */
            color: $brown;
          }

          &.disabled {
            color: rgba($black, 0.5);
            cursor: default;
          }

          &:first-child {
            &::before {
              content: "";
              width: 30px;
              height: 30px;
              background: url(@/assets/moaplace/prev.png) no-repeat center;
              background-size: 100%;
            }
          }

          &:last-child {
            &::before {
              content: "";
              width: 30px;
              height: 30px;
              background: url(@/assets/moaplace/next.png) no-repeat center;
              background-size: 100%;
            }
          }
          span {
            padding: 4px 8px;
          }

          a {
            padding: 0 8px;
            text-decoration: none;
            color: $black;
          }
        }
      }
    }
    .footer {
      padding: 20px 0;
      button {
        float: right;
        margin-top: 8px;
        padding: 10px 25px;
        background-color: $brown;
        color: white;
        border: none;
      }
    }
  }
}
</style>