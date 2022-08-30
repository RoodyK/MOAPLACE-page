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
        <div
          class="header"
          v-for="(i, index) in news.splice(0, 1)"
          :key="index"
        >
          <div class="header_tit">[{{ i.sort_name }}]{{ i.notice_title }}</div>
          <div class="header_txt">
            <div class="inner">
              <div>첨부파일</div>
              <div>
                <ul>
                  <li v-for="(list, index) in filelist" :key="index">
                    <button @click.prevent="download()">
                      <img src="@/assets/admin/download.png" />
                    </button>
                    {{ list.notice_orgfile }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="inner2">
              <div>작성일</div>
              <div>{{ i.notice_regdate }}</div>
            </div>
            <div class="inner2">
              <div>조회수</div>
              <div>{{ i.notice_hit }}</div>
            </div>
          </div>
        </div>
        <div class="content">내용</div>
        <div class="pageinfo">
          <ul class="pagenation">
            <li v-if="next1.notice_num == null">다음 글이 없습니다.</li>
            <li
              v-if="next1.notice_num > this.notice_num"
              @click="gonext(next1.notice_num)"
            >
              다음글 {{ next1.notice_title }}
            </li>
            <li v-if="prev1.notice_num == null">이전 글이 없습니다.</li>
            <li
              v-if="prev1.notice_num < this.notice_num"
              @click="goprev(prev1.notice_num)"
            >
              이전글 {{ prev1.notice_title }}
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
      news: [
        {
          notice_num: "",
          sort_name: "",
          notice_title: "",
          notice_content: "",
          notice_orgfile: "",
          notice_regdate: "",
          notice_hit: "",
        },
      ],
      filelist: [],
      notice_num: "",
      notice_detail_num: "",
      next1: {},
      prev1: {},
    };
  },
  created() {
    this.notice_num = this.$route.params.notice;
    console.log("created: ", this.notice_num);
    this.getdetail();
  },

  methods: {
    getdetail() {
      console.log("메소드 notice_num", this.notice_num);
      console.log("메소드 notice_detail_num", this.notice_detail_num);
      axios.get(`/moaplace.com/moaplace/news/detail/${this.notice_num}`).then(
        function (resp) {
          // console.log(resp.data);
          this.news = resp.data.list;
          this.filelist = resp.data.filelist;

          this.next1 = resp.data.next;
          this.prev1 = resp.data.prev;

          console.log(this.news);
          console.log("파일리스트", this.filelist);
          console.log("다음글", this.next1);
          console.log("이전글넘버:", this.prev1.notice_num);

          // this.news.notice_num = resp.data.notice_num;
          // console.log(this.news.notice_num);
        }.bind(this)
      );
    },
    gonext() {
      this.notice_num = this.next1.notice_num;
      axios.get(`/moaplace.com/moaplace/news/detail/${this.notice_num}`).then(
        function (resp) {
          this.news = resp.data.list;
          this.filelist = resp.data.filelist;
          this.next1 = resp.data.next;
          this.prev1 = resp.data.prev;

          console.log(this.news);
          console.log("파일리스트", this.filelist);
          console.log("다음글", this.next1);
          console.log("이전글", this.prev1);
          console.log("페이지 이동 성공", resp.data);
        }.bind(this)
      );
    },
    goprev() {
      this.notice_num = this.prev1.notice_num;
      axios.get(`/moaplace.com/moaplace/news/detail/${this.notice_num}`).then(
        function (resp) {
          this.news = resp.data.list;
          this.filelist = resp.data.filelist;
          this.next1 = resp.data.next;
          this.prev1 = resp.data.prev;

          console.log(this.news);
          console.log("파일리스트", this.filelist);
          console.log("다음글", this.next1);
          console.log("이전글", this.prev1);
          console.log("페이지 이동 성공", resp.data);
        }.bind(this)
      );
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
      padding: 10px 15px;
      .header_tit {
        border-top: 2px solid $black;
        border-bottom: 2px solid rgba($black, 0.5);
        font-size: 25px;
        font-weight: 700;
        padding: 15px 20px;
      }
      .header_txt {
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;
        font-size: 17px;
        border-bottom: 1px solid rgba($black, 0.5);
        .inner {
          display: flex;
          div:first-child {
            font-weight: 700;
          }
          div:last-child {
            width: 400px;
            margin-left: 20px;
            margin-right: 200px;
          }
          button {
            background: none;
            border: none;
          }
        }
        .inner2 {
          display: flex;
          div:first-child {
            font-weight: 700;
            margin-right: 16px;
          }
        }
      }
    }
    .content {
      height: auto;
      min-height: 400px;
      border-bottom: 1px solid rgba($black, 0.5);
      padding: 10px 40px;
    }
    .pageinfo {
      border-bottom: 1px solid rgba($black, 0.5);
      padding: 8px 0 0 0;
      .pagenation {
        list-style: none;
        margin: 0;

        li {
          display: flex;
          padding: 3px 0;

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

          a {
            padding: 0 8px;
            text-decoration: none;
            color: $black;
          }
          &:hover {
            /* 자기자신 */ /* &:first-child */
            color: $brown;
            a {
              color: $brown;
            }
          }
        }
      }
    }
    .footer {
      padding: 20px 0;
      button {
        float: right;
        margin-right: 5px;
        padding: 10px 25px;
        background-color: $brown;
        color: white;
        border: none;
      }
    }
  }
}
</style>