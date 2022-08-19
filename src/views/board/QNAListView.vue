<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="1:1문의"/>

    <div class="app">

    <h2 class="title">1:1문의</h2>
    <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

    <div class="info">
      <p> <img src='../../assets/board/info.png'> 고객님의 문의내역입니다. </p>
        <ul>
          <li> 모아플레이스는 고객님의 문의에 성심성의껏 답변해드리고 있습니다. </li>
          <li> 욕설이나 비방, 음란, 광고 등 1:1문의 게시판 의도와 맞지 않는 내용은 별도 안내 없이 삭제되어 공개되지 않습니다. </li>
        </ul>
    </div>

    <div class="btnGroup">
      <div class="total"> 현재 <p class="cnt">0건</p>의 문의글이 등록되어 있습니다. </div>
      <button class="insert" @click="$router.push({name:'qnaInsert'})">문의하기</button>
    </div>

      <table>
        <thead>
        <tr>
          <th>번호</th>
          <th width="600px">제목</th>
          <th>상태</th>
          <th>작성일</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>3</td>
          <td><RouterLink to="/moaplace.com/qna/detail" class="router"> 관련 문의 </RouterLink></td>
          <td>대기중</td>
          <td>2022-08-10</td>
        </tr>
        <tr>
          <td>2</td>
          <td><RouterLink to="/moaplace.com/qna/detail" class="router">예매 관련 문의입니다 예매 관련 문의입니다 줄바꿈 테스트 줄바꿈 테스트 줄바꿈 테스트 줄바꿈 테스트 </RouterLink></td>
          <td>처리중</td>
          <td>2022-08-10</td>
        </tr>
        <tr>
          <td>1</td>
          <td><RouterLink to="/moaplace.com/qna/detail" class="router"> 관람 문의사항 </RouterLink></td>
          <td>답변완료</td>
          <td>2022-08-09</td>
        </tr>
        </tbody>
      </table>

      <!-- 페이징 -->
      <div id="mypaging">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="" aria-label="Previous">
                <span aria-hidden="true">
                  &laquo;
                </span>
              </a>
              </li>
                <li class="page-item"><a class="page-link" href="">1</a></li>
                <li class="page-item"><a class="page-link" href="">2</a></li>
                <li class="page-item"><a class="page-link" href="">3</a></li>
                <li class="page-item"><a class="page-link" href="">4</a></li>
                <li class="page-item"><a class="page-link" href="">5</a></li>
                <li class="page-item">
              <a class="page-link" href="" aria-label="Next">
                <span aria-hidden="true">
                &raquo;
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>  
    <AppFooter/>
  </div>

</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction:column;
  width: $width;
  color: $black;
  padding-top: 50px;
  margin: 32px auto;

  h2.title{
    font-size: 32px;
    text-align: center;
    & + p{
      text-align: center;
      margin-bottom: 64px;
    }
  }

  .info {
    width: 100%;
    color: #333333d4;
    border: 1px solid #33333330;
    p {
    font-weight: bold;
    padding: 15px 0 0 20px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  .btnGroup{
    display: flex;
    justify-content: space-between;
    margin: 32px 0 8px 0;
    align-items: center;

    .total {
      display: flex;
      justify-content: flex-end;
      color: gray;
      padding-bottom:0;

      .cnt{
        color: #D67747;
        font-weight: bold;
        margin-left: 5px;
        margin-bottom: 0;
      }
    }

    .insert {
      padding: 16px 40px;
      border: 1px solid transparent;
      background-color: $brown;
      color:white;
      transition: all 0.3s;

      &:hover {
        border: 1px solid $brown;
        background-color: white;
        color:$brown;
      }
    }
  }
  
  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    border-top: 2px solid $black;
    border-bottom: 1px solid $black;

    tr{
      vertical-align : middle;
      border-bottom: 1px solid #ddd;

      & > *:nth-child(2) {
        width:60%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover {
          background-color: rgb(249,249,249);
          color: $brown;
      }
    }

    thead {
      th {
        vertical-align : middle;
        border-bottom: 1px solid $black;
        padding: 20px 0;
      }
    }

    tbody{
      td {
        padding: 20px 0;
        vertical-align : middle;
        a {
          width:100%;
          color:$black;
          text-decoration: none;
          &:hover {
            color: $brown;
          }
        }
      }
    }
  }

  #mypaging{
    display: flex;
    justify-content: center;
    margin-top:16px;

    ul,li,a,span {
      color: $black;
      border:none;
    }
  }
}
</style>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
    components: {
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>