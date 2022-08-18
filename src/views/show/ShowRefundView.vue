<template>
  <AppHeader/>
  <SideVisual menu="SHOW / TICKET" img="show"/>
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
      <div class="click" onclick="location.href='/moaplace.com/showdetail'">상세보기</div>
      <div class="click" onclick="location.href='/moaplace.com/showreview'">관람평</div>
      <div id=present class="click" onclick="location.href='/moaplace.com/showrefund'">취소 및 환불 안내</div>
    </div>
    <div id="datail">
      <div class="container" >
        <div class="categoty">입장안내</div>
        <div class="cont">
          <hr>
          공연이 시작된 이후에는 안내원의 유도에 따라서만 입장할 수 있으며, 본인 좌석이 아닌 빈 좌석으로 안내될 수 있습니다.
        </div>
      </div>
      <div class="container">
        <div class="categoty">취소방법</div>
        <div class="cont">
          <hr>
          <span>· 인터넷 확인방법</span><br>
          &nbsp;&nbsp;모아플레이스 홈페이지 > 마이페이지 > 예매 내역 확인/취소<br>
          &nbsp;&nbsp;홈페이지 로그인 후 마이페이지 – 예매내역 확인/취소에서 취소공연을 선택 후 취소하시면 됩니다.<br><br>

          <span>· 서비스플라자 현장방문</span><br>
          &nbsp;&nbsp;모아플레이스 중앙계단 위 서비스플라자 방문로 방문해주세요.<br>
          &nbsp;&nbsp;운영시간 10:00 ~ 20:00 (점심시간 13:00 ~ 14:00)<br><br>

          <span>· 전화문의</span><br>
          &nbsp;&nbsp;모아플레이스 콜센터 02-399-1000로 문의주세요.<br>
          &nbsp;&nbsp;운영시간 09:00 ~ 20:00<br><br>

          ※ 사전 수령 티켓의 경우 실물 티켓 회수 후 취소/환불처리 됩니다. 반드시 실물 티켓을 지참 후 서비스플라자로 방문바랍니다.<br>
          &nbsp;&nbsp;&nbsp;&nbsp;(티켓 분실 시 취소불가)<br>
          ※ 취소 마감 시간과 취소 수수료는 아래 확인 바랍니다.
        </div>
      </div>
      <div class="container">
        <div class="categoty">취소마감시간</div>
        <div class="cont">
          <hr>
          · 관람일 전일 오후 5시까지 예매취소 및 변경 가능 (평일 / 주말(토, 일요일) / 공휴일)<br>
          · 관람일 당일에는 예매취소, 변경, 환불 불가
        </div>
      </div>
    </div>
  </div>
  <AppFooter/>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name:"ShowRefundView",
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
  #detail{
    margin-top: 50px;
  }
  .categoty{
    margin-top: 85px;
    width: 20%;
    font-weight: bold;
    color: $black;
  }  
  .cont{
    margin-top: 50px;
    width: 70%;
    font-size: 14px;
    color: $black;
  }
</style>