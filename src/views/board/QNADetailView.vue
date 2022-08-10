<template>
  <div class="app">
  
  <div class="info">
    <p> <img src='../../assets/board/info.png'> 고객님의 문의내역입니다. </p>
      <ul>
        <li> 모아플레이스는 고객님의 문의에 성심성의껏 답변해드리고 있습니다. </li>
        <li> 욕설이나 비방, 음란, 광고 등 1:1문의 게시판 의도와 맞지 않는 내용은 별도 안내 없이 삭제되어 공개되지 않습니다. </li>
      </ul>
  </div>

  <hr class="line">

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
    <button class="update" @click="$router.push({name:'qnaUpdate'})">수정하기</button>
    <button class="delete" @click="$router.push({name:'qnaDelete'})">삭제하기</button>
    <button class="list" @click="$router.push({name:'qnaList'})">목록으로</button>
  </div>

  </div>
</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  display:flex;
  flex-direction: column;
  width: $width;
  padding: 80px;
  color: $black;
  margin: auto;

  .info {
    width: 100%;
    border: 1px solid lightgray;

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

  table {
    width: 100%;
    border-bottom: 1px solid lightgray;
    
    thead {
      border-top:2px solid $black;
      border-bottom: 1px solid $black;
      font-size:small;

      th {
        padding: 20px;
      }

      .state {
        color:#D67747;
        font-weight: bold;
        font-size:larger;
      }
    }

    tr {
      height: 50px;
      border-bottom: 1px dotted lightgray;
    }

    td {
      padding: 20px;
    }
  }

  .content {
    padding: 30px;
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
    justify-content: flex-end;
    margin: 15px;

    button {
      background-color: $brown;
      width:160px;
      height:50px;
      border: none;
      margin: 3px;
      color:white;
      border-radius: 5px 5px;

      &:hover {
        border: 1px solid $brown;
        background-color: white;
        color:$brown;
      }
    }
    .list{
      width:100px;
      height:50px;
      margin: 3px;
      border-radius: 5px 5px;
      border: 1px solid $brown;
      background-color: white;
      color:$brown;

      &:hover {
        background-color:$brown;
        color:white;
      }
    }
  }
}
</style>