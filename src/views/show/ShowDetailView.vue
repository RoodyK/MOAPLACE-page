<template>
<div>
  <AppHeader/>
  <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
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
      <div id=present class="click" onclick="location.href='/moaplace.com/showdetail'">상세보기</div>
      <div class="click" onclick="location.href='/moaplace.com/showreview'">관람평</div>
      <div class="click" onclick="location.href='/moaplace.com/showrefund'">취소 및 환불 안내</div>
    </div>
    <div id="detail">
      <img src="../../assets/detail1.jpg">
      <img src="../../assets/detail2.jpg">
    </div>
  </div>
  <AppFooter/>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name:"ShowDetailView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  #wrap{
    width: $width;
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 120px;
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
  #detail{
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