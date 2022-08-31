<template>
  <div>
    <AppHeader/>
    <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
    <div id="wrap">
      <div id="main" class="containers">
        <div id="img">
          <img src="../../assets/smile.jpg">
        </div>
        <div class="info_box">
          <div id="info">
            <h4>웃는남자</h4>
            <div>
              <span>기간</span> 2022.06.10 (금) ~ 2022.08.22 (월)
            </div>
            <div>
              <span>장소</span> 오케스트라홀
            </div>
            <div>
              <span>시간</span> 오케스트라홀
            </div>
            <div>
              <span>연령</span> 전체연령가
            </div>
            <div>
              <span>티켓</span> R석 150,000원 / S석 120,000원 / A석 100,000원
            </div>
          </div>
          <div id="mybtn">
            <button>관심공연</button>
            <button>잔여석정보</button>
            <button>예매하기</button>
          </div>
        </div>
      </div>
      <div id="nav">
        <div class="tap_off" id="tap_1">
          <RouterLink :to="`/moaplace.com/show/showdetail/${this.$route.params.show_num}`">상세보기</RouterLink>
        </div>
        <div class="tap_off" id="tap_2">
          <RouterLink :to="`/moaplace.com/show/review/list/${this.$route.params.show_num}`">관람평</RouterLink>
        </div>
        <div class="tap_on" id="tap_3">
          <RouterLink :to="`/moaplace.com/show/showrefund/${this.$route.params.show_num}`">취소 및 환불 안내</RouterLink>
        </div>
      </div>
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
    </div>
    <AppFooter/>
  </div>
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
  #main{
    border-top: 2px solid rgba($black, 0.5);
    padding-top: 50px;
    img{
      width: 320px;
      box-shadow: 3px 7px 21px rgb(0 0 0 / 13%);
    }
    button{
      color: white;
      background-color: $green;
    }
  }
  #nav{
    width: 100%;
    display: flex;
    margin-top: 50px;
    text-align: center;
    justify-content: space-evenly;
    a{
      text-decoration: none;
      font-size: 20px;
    }
    div{
      width: 100%;
      padding: 16px 0;
    }
    .tap_on{
      background-color: $brown;
      a{
        color: #fff;
      }
    }
    .tap_off{
      background-color: #fff;
      border-top: 1px solid $brown;
      border-bottom: 1px solid $brown;
      border-left: 1px solid $brown;
      a{
        color: $brown;
      }
    }
  }
  .containers{
    display: flex;
    align-items: stretch;
    padding: 0 50px;
  }
  .info_box{
    width: 100%;
    margin-left: 30px;
    #info{
      div{
        border-bottom: 1px solid rgba($black, 0.2);
        span{
          font-weight: bold;
          margin-right: 16px;
        }
      }
      h4{
        font-size: 40px;
        font-weight: bold;
        color: $black;
      }
      color: $black;
      font-size: 22px;
      line-height: 60px;
    }
    #mybtn{
      margin-top: 41px;
      display: flex;
      justify-content: space-between;
      button{
        width: calc((100% - (16px * 2)) / 3);
        padding: 16px 0;
        border: none;
        background-color: $brown;
        color:white;
        &:first-child {
        background-color: rgba($black, 0.6);
        }
        &:nth-child(2) {
          background-color: $brown;
        }
        &:last-child {
          background-color: $black;
        }
      }
    }
  }
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