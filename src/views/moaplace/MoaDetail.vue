<template>
  <div class="containers">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" />
    <div class="title inner_wrap">
      <p class="tit">공지사항</p>
      <p class="txt">
        문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
      </p>
    </div>
    <div class="con">
      <div class="inner_wrap">
        <div class="header">
          <div class="header_tit">[말머리]제모오오오오옥...</div>
          <div class="header_txt">
            <div class="inner">
              <div>첨부파일</div>
              <div>..........파일명.....</div>
            </div>
            <div class="inner2">
              <div>작성일</div>
              <div>2022-08-11</div>
            </div>
            <div class="inner2">
              <div>조회수</div>
              <div>1</div>
            </div>
          </div>
        </div>
        <div class="content">내용</div>
        <div class="pageinfo">
          <ul class="pagenation">
            <li>이전글<a href="">이전 글 내용입니다.</a></li>
            <li>다음글<a href="">다음 글 내용입니다.</a></li>
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

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
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
        padding: 15px 15px;
        margin-left: 5px;
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
      padding: 10px 30px;
      margin-left: 10px;
    }
    .pageinfo {
      border-bottom: 1px solid rgba($black, 0.5);
      padding: 10px 0 0 0;
      .pagenation {
        list-style: none;
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