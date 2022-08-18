<template>
  <div class="containers">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" />
    <div class="title inner_wrap">
      <p class="tit">새소식</p>
      <p class="txt">
        문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
      </p>
    </div>
    <div class="con">
      <div class="inner_wrap">
        <div class="search">
          <select id="field" class="field">
            <option value="all">전체</option>
            <option value="subject">제목</option>
            <option value="content">내용</option>
          </select>
          <input type="text" name="keyword" class="keyword" />
          <button class="btn" type="submit" />
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
              <tr class="important">
                <td class="num">공지</td>
                <td>공지</td>
                <td class="tit"><a hrf="">회원반입금지안내</a></td>
                <td class="date">2022.08.11</td>
                <td class="hit">0</td>
              </tr>
              <tr class="important">
                <td class="num">공지</td>
                <td>대관공고</td>
                <td class="tit"><a hrf="">COVID-19 관련 안내사항</a></td>
                <td class="date">2022.08.11</td>
                <td class="hit">0</td>
              </tr>
              <tr class="important">
                <td class="num">공지</td>
                <td>공지</td>
                <td class="tit"><a hrf="">모아플레이스 대관 안내</a></td>
                <td class="date">2022.08.11</td>
                <td class="hit">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page">
          <ul class="pagenation">
            <li><a href="" class="prev">[이전]</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="" class="next">[다음]</a></li>
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
    font-size: 32px;
    font-weight: 500;
  }
  .txt {
    color: #666666;
    margin-top: 15px;
  }
}
.con {
  padding: 0 0 150px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .search {
    margin-bottom: 30px;
    width: 355px;
    height: 50px;
    border: 1px solid #e2e2e2;
    position: relative;
    float: right;
    select {
      height: 100%;
      border: 0;
      padding: 10px 16px;
    }
    input {
      margin: 0;
      height: 45px;
      border: none;
      padding: 0 14px;
      outline: none;
    }
    button {
      height: 100%;
      background: url(@/assets/moaplace/search.png) no-repeat center;
      float: right;
      padding: 0 26px 0;
      position: absolute;
      &:hover {
        border: 1px solid $black;
        background-color: white;
        color: $black;
      }
    }
  }
  .table {
    width: 100%;
    border-top: 2px solid $black;
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
      font-size: 17px;
      font-weight: 800;
    }
    tr.important {
      .num {
        color: $brown;
        font-weight: 700;
      }
    }
    tr.important:hover {
      background-color: #f6f6f6;
      cursor: pointer;
    }
    .td.hit,
    .td.date {
      width: 170px;
      padding: 10px 0;
    }
  }
  .page {
    text-align: center;
    margin-top: 60px;
    a {
      &.prev {
        color: $black;
        margin-right: 10px;
        text-decoration: none;
      }
      &.next {
        color: $black;
        margin-left: 10px;
        text-decoration: none;
      }
    }
    .prev:hover,
    .next:hover {
      color: $brown;
    }
    .pagenation {
      list-style: none;
      display: inline-block;
      padding: 0;
      li {
        float: left;
        margin-right: 10px;
        a {
          padding: 0 8px;
          text-decoration: none;
          color: $black;
        }
      }
      li:hover {
        color: $brown;
      }
    }
  }
}
</style>