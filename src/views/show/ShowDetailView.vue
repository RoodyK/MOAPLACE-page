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
      <div class="tap_on" id="tap_1">
        <RouterLink to="/moaplace.com/show/showdetail">상세보기</RouterLink>
      </div>
      <div class="tap_off" id="tap_2">
        <RouterLink to="/moaplace.com/show/review/list">관람평</RouterLink>
      </div>
      <div class="tap_off" id="tap_3">
        <RouterLink to="/moaplace.com/show/showrefund">취소 및 환불 안내</RouterLink>
      </div>
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
      border-right: 1px solid $brown;
      a{
        color: $brown;
      }
    }
  }
  #detail{
    text-align: center;
    img{
      width: 100%;
      margin-top: 50px;
    }
  }
  span{
    font-weight: bold;
    margin-right: 16px;
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
  
</style>