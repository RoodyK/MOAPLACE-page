<template>
  <AppHeader/>
  <SideVisual menu="CUSTOMER SERVICE" img="cs"/>

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

  <hr class="line">
  <div class="total"> 현재 <p class="cnt">0건</p>의 문의글이 등록되어 있습니다. </div>

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

  <div class="btnGroup">
    <button class="insert" @click="$router.push({name:'qnaInsert'})">문의하기</button>
  </div>

  </div>
 
  <AppFooter/>

</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction:column;
  width: $width;
  color: $black;
  padding-top: 50px;
  margin: auto;

  h2.title{
    font-size: 32px;
    text-align: center;
    margin-top: 32px;
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

  .line {
    color: white; 
    margin: 30px;
  }

  .total {
    display: flex;
    justify-content: flex-end;
    color: gray;

    .cnt{
      color: #D67747;
      margin-left: 5px;
      font-weight: bold;
    }
  }
  
  table {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid lightgray;

    thead {
      th {
        vertical-align : middle;
      }
      border-top:2px solid $black;
      border-bottom: 1px solid $black;
    }

    tr {
      vertical-align : middle;
      height: 50px;
      border-bottom: 1px dotted lightgray;
    }

    tbody{
      td {
        vertical-align : middle;

        &:nth-child(2){
          a {
          display: inline-block;
          width:500px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          }
        }

      }

      tr{
        &:hover {
          background-color: rgb(249,249,249);
        }
      }
    }

    .router{
      color:$black;
      text-decoration: none;

      &:hover {
        color: $brown;
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
  
  .btnGroup{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;

    .insert {
      width:160px;
      height:50px;
      border: none;
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