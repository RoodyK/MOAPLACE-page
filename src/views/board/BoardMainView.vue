<template>
  <div class="app">
    <h2> 모아플레이스에 바라는 사항이나 불편한 사항, <br>
         궁금증을 올려주시면 성심성의껏 답변해 드리겠습니다. </h2>

    <p> 자주묻는질문(FAQ)을 먼저 확인하시면 보다 빠르게 궁금한 점을 해결할 수 있습니다. </p>

    <div class="container">
      <button class="btn"><img src="../../assets/board/faq.png"><br>자주묻는질문(FAQ)</button>
      <button class="btn"><img src="../../assets/board/qna.png"><br>1:1문의글(QNA)</button>
      <button class="btn"><img src="../../assets/board/myqna.png"><br>나의 문의글 확인</button>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  width: $width;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  padding: 80px;
  color: $black;
  margin: auto;

  h2 { 
  text-align: center;
  }

  p {
  padding:15px;
  color: #D67747;
  }

  .container {
  display: flex;
  justify-content: center;
    
  .btn {
  margin: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  font-weight: bold;
  color:$black;

    &:hover {
    background-color: gold;

      img{
        transform: scale(1.1);
      }
    }
    
  }
  }
}
</style>