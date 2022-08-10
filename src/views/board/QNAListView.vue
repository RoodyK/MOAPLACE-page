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
    <tr>
      <td>3</td>
      <td><RouterLink to="/moa/qna/detail" class="router"> 관련 문의 </RouterLink></td>
      <td>대기중</td>
      <td>2022-08-10</td>
    </tr>
    <tr>
      <td>2</td>
      <td><RouterLink to="/moa/qna/detail" class="router">예매문의입니다</RouterLink></td>
      <td>처리중</td>
      <td>2022-08-10</td>
    </tr>
    <tr>
      <td>1</td>
      <td><RouterLink to="/moa/qna/detail" class="router"> 관람 문의사항 </RouterLink></td>
      <td>답변완료</td>
      <td>2022-08-09</td>
    </tr>
  </table>

  <div class="btnGroup">
    <button class="insert" @click="$router.push({name:'qnaInsert'})">문의하기</button>
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

  .total {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
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
      border-top:2px solid $black;
      border-bottom: 1px solid $black;
      font-size:small;
    }

    tr {
      height: 50px;
      border-bottom: 1px dotted lightgray;
    }

    .router{
      color:$black;
      text-decoration: none;

      &:hover {
        color: $brown;
      }
    }
  }
  
  .btnGroup{
    display: flex;
    justify-content: flex-end;
    margin: 15px;

    .insert {
      width:160px;
      height:50px;
      margin: 3px;
      border-radius: 5px 5px;
      border: none;
      background-color: $brown;
      color:white;

      &:hover {
        border: 1px solid $brown;
        background-color: white;
        color:$brown;
      }
    }
  }
}
</style>