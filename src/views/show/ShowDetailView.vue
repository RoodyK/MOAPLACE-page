<template>
  <div id="wrap">
    <div id="title">
      <h4>웃는남자</h4>
      <hr>
    </div>
    <div id="main" class="container">
      <div id="img">
        <img src="../../assets/smile.jpg">
      </div>
      <div>
        <div id="info">
          <span>기간</span> 2022.06.10 (금) ~ 2022.08.22 (월)<br>
          <span>장소</span> 오케스트라홀<br>
          <span>시간</span> 오케스트라홀<br>
          <span>연령</span> 전체연령가<br>
          <span>티켓</span> R석 150,000원 / S석 120,000원 / A석 100,000원
        </div>
        <div id="btn">
          <button id=btn1>잔여석정보</button>
          <button id=btn2>예매하기</button>
        </div>
      </div>
    </div>
    <hr>
    <div id=nav>
      <div id=present class="click">상세보기</div>
      <div class="click" onclick="location.href='/moa/showreview;">관람평</div>
      <div class="click">취소 및 환불 안내</div>
    </div>
    <div id="datail">
      <img src="../../assets/detail1.jpg">
      <img src="../../assets/detail2.jpg">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  #wrap{
    width: $width;
    margin: 0 auto;
  }
  h4{
    color: $black;
    text-align: center;
  }
  hr{
    height: 3px;
  }
  #main{
    img{
      width: 200px;
      margin-left: 50px;
    }
    button{
      color: white;
      background-color: $green;
    }
  }
  #btn{
    margin-top: 5px;
  }
  #btn1{
    margin-left: 30px;
  }
  #btn2{
    margin-left: 20px;
  }
  #nav{
    margin-top: 50px;
    margin-left: 110px;
    text-align: center;
    div{
      float: left;
      width: 30%;
    }
  }
  .click{
    cursor: pointer;
  }
  #present{
    color: $brown;
    border-bottom: 3px solid $brown;
  }
  #datail{
    text-align: center;
    img{
      margin-top: 50px;
    }
  }
  span{
    font-weight: bold;
  }
  .container{
    display: flex;
    align-items: stretch;
  }
  #info{
    margin-left: 30px;
    font-size: 20px;
    line-height: 50px;
  }
</style>