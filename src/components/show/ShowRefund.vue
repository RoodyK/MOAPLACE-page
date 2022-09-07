<template>
  <div class="detail">
    <div class="detail_box">
      <div class="title">입장안내</div>
      <div class="cont">
        <p id="cont_top">공연이 시작된 이후에는 안내원의 유도에 따라서만 입장할 수 있으며, 본인 좌석이 아닌 빈 좌석으로 안내될 수 있습니다.</p>
      </div>
    </div>
    <div class="detail_box" id="top_border">
      <div class="title">취소방법</div>
      <div class="cont" id="top_border">
        <span id="cont_title">인터넷 확인방법</span>
        <div>
          <p>모아플레이스 홈페이지 > 마이페이지 > 예매 내역 확인/취소</p>
          <p>홈페이지 로그인 후 마이페이지 – 예매내역 확인/취소에서 취소공연을 선택 후 취소하시면 됩니다.</p>
        </div><br>
        <span id="cont_title">서비스플라자 현장방문</span>
        <div>
          <p>모아플레이스 중앙계단 위 서비스플라자 방문로 방문해주세요.</p>
          <p>운영시간 10:00 ~ 20:00 (점심시간 13:00 ~ 14:00)</p>
        </div><br>
        <span id="cont_title">전화문의</span>
        <div>
          <p>모아플레이스 콜센터 02-399-1000로 문의주세요.</p>
          <p>운영시간 09:00 ~ 20:00</p>
        </div><br>
        <p><span>※</span> 사전 수령 티켓의 경우 실물 티켓 회수 후 취소/환불처리 됩니다. 반드시 실물 티켓을 지참 후 서비스플라자로 방문바랍니다.</p>
        <p>(티켓 분실 시 취소불가)</p>
        <p><span>※</span> 취소 마감 시간과 취소 수수료는 아래 확인 바랍니다.</p>
      </div>
    </div>
    <div class="detail_box">
      <div class="title">취소마감시간</div>
      <div class="cont" id="top_border">
        <p>관람일 전일 오후 5시까지 예매취소 및 변경 가능 (평일 / 주말(토, 일요일) / 공휴일)</p>
        <p>관람일 당일에는 예매취소, 변경, 환불 불가</p>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    name:"ShowRefund"
  }
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  .detail{
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    .detail_box{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 94px;
      .title{
        font-weight: bold;
        font-size: 24px;
        width: 20%;
      }
      .cont{
        width: 80%;
        span{
          font-weight: bold;
          font-size: 16px;
        }
        #cont_title{
          position: relative;
          &::before{
            content: '';
            background: $black;
            width: 3px;
            height: 3px;
            position: absolute;
            top: 8px;
            left: -10px;
          }
        }
        p{
          font-size: 14px;
          line-height: 6px;
        }
        div{
          margin-top: 16px;
        }
        #cont_top{
          line-height: 32px;
        }
      }
      #top_border{
        border-top: 1px solid #333;
        padding-top: 32px;
      }
    }
  }
</style>