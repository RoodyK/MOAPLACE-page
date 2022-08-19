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

      <table>
        <thead>
        <tr>
          <th>[구분]<h2>Q. 문의글 제목</h2></th>
        </tr>
        <tr>
          <td class="state">답변완료</td>
        </tr>
        <tr>
          <td>등록일 2022-08-10</td>
        </tr>
        </thead>

        <tr>
          <td class="content"> 예매 관련 문의입니다.<br>
              예매자 이름 홍길동입니다. <br>
              답변 부탁드립니다. </td>
        </tr>

        <tr>
          <td>
          <div class="answer">
            <h2> A. 답변 제목 </h2>
            <div class="content">
              답변 내용입니다.<br><br>
              감사합니다.
            </div>
          </div>
          </td>
        </tr>

      </table>

      <div class="btnGroup">
        <button @click="$router.push({name:'qnaUpdate'})">수정하기</button>
        <button @click="$router.push({name:'qnaDelete'})">삭제하기</button>
        <button @click="$router.push({name:'qnaList'})">목록으로</button>
      </div>

    </div>    
    <AppFooter/>
  </div>

</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction: column;
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
    margin-bottom: 64px;

    p {
    font-weight: bold;
    padding: 15px 0 0 20px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }

  table {
    width: 100%;
    border-bottom: 1px solid #ddd;
    
    thead {
      border-top:2px solid $black;
      font-size:small;
      tr{
        th {
          padding: 20px;
        }
        &:nth-child(3){
          border-bottom: 1px solid $black;
        }
      }
      .state {
        color:#D67747;
        font-weight: bold;
        font-size:larger;
      }
    }
    tr {
      height: 50px;
      border-bottom: 1px solid #ddd;
    }
    td {
      padding: 20px;
    }
    .content {
      padding: 30px;
    }
  }

  .answer {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:30px;
    background-color: rgb(243, 241, 241);
  }
  
  .btnGroup{
    display: flex;
    justify-content: center;
    margin: 16px 0 40px 0;

    button {
      padding: 16px 40px;
      margin: 2px;

      &:nth-child(1){
        background-color: $brown;
        border: 1px solid transparent;
        color:white;
      }
      &:nth-child(2) {
        background-color:rgba($black, 0.6);
        border: 1px solid transparent;
        color:white;
      }
      &:nth-child(3){
        border: 1px solid $black;
        background-color: white;
        color:$black;
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