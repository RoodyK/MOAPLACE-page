<template>
  <section class="membership">
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="멤버십혜택"/>

    <div class="inner">
      <div class="sub-title">
        <div class="box">
          <p>MOA PLACE MEMBERSHIP</p>
          <span>모아플레이스 멤버십 회원에게만 제공되는 다양한 혜택</span>
        </div>
      </div>

      <div class="benefit">
        <h2>모아플레이스 멤버십 혜택</h2>
        <div class="box">
          <ul class="item">
            <li class="point-img"></li>
            <li class="content">
              <p>포인트 적립</p>
              <p>
                영화 티켓, 매점 상품 구매 시 등급에 따라<br/>
                5% 포인트를 적립할 수 있어요.
              </p>
              <div>
                <button class="SaveBtn" @click="saveMore">자세히 보기</button>
                </div>
            </li>
          </ul>
          <ul class="item">
            <li class="point-img"></li>
            <li class="content">
              <p>포인트 사용</p>
              <p>
                보유한 포인트로 원하는 공연을 보고<br/>
                다양한 상품을 구매하세요.
              </p>
              <div>
                <button class="UseBtn" @click="useMore">자세히 보기</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="more">
          자세히 보기 버튼을 클릭해 주세요.
        </div>
        
        <div class="save">
          <h4 class="topic">포인트 적립</h4>
          <div class="point-save">
            
            <h5>- 포인트 기본 적립</h5>
            <ul class="description">
              <li>모아플레이스 최초 가입 시 2000포인트가 증정됩니다.</li>
              <li>공연 티켓 구매 시 좌석등급에 관계없이 금액의 5%가 적립됩니다.</li>
              <li>적립금은 결제 수단에 상관없이 티켓 가격에 따라서 적용됩니다.</li>
            </ul>
            <h5>- 기타 적립 안내</h5>
            <ul class="description">
              <li>이벤트 쿠폰에 의한 티켓 구매 시 적립금이 적립되지 않습니다.</li>
              <li>사이트에서 제공하는 이벤트에 참여 시 기본 적립되는 적립금 외의 포인트를 적립할 수 있습니다.</li>
            </ul>
          </div>
        </div>

        <div class="use">
          <h4 class="topic">포인트 사용</h4>
          <div class="point-use">
            <h5>- 포인트 기본 사용</h5>
            <ul class="description">
              <li>사이트에서 제공하는 포인트는 공연 예매 시 사용 가능합니다.</li>
              <li>적립금은 티켓 결재 시 원하시는 금액을 적립금에서 차감하여 구매할 수 있습니다.</li>
              <li>적립금사용은 최소 1000 포인트부터 사용 가능합니다.</li>
            </ul>
            <h5>- 추가 적립금 사용법</h5>
            <ul class="description">
              <li>적립금은 본 공연장 매점에서 사용이 가능합니다.</li>
              <li>공연 예매와 동일하게 1000포인트 이상부터 사용가능합니다.</li>
              <li>적립금 사용 후 남은 금액은 신용카드 등으로 결제 가능합니다.</li>
            </ul>
          </div>
        </div>
      </div> 

    </div>

    <AppFooter/>
  </section>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  mounted() {
  },
  methods: {
    saveMore() {
      const saveHeight = getComputedStyle(document.querySelector('.save')).getPropertyValue('height');
      const useHeight = getComputedStyle(document.querySelector('.use')).getPropertyValue('height');

      if(useHeight != "0px") {
        document.querySelector('.benefit').style.height = '1200px';
      } 
      document.querySelector('.more').style.display = "none";
      document.querySelector('.save').style.height = "350px";

      if(saveHeight == "0px") {
        document.querySelector('.more').style.display = "none";
        document.querySelector('.save').style.height = "350px";
      }else {
        document.querySelector('.save').style.height = "0px";
        setTimeout(function() {
          document.querySelector('.benefit').style.height = '760px';
          if(useHeight === "0px" || saveHeight === "0px") {
            document.querySelector('.more').style.display = "flex";
          }
        }, 500);
      }
    },
    useMore() {
      const saveHeight = getComputedStyle(document.querySelector('.save')).getPropertyValue('height');
      const useHeight = getComputedStyle(document.querySelector('.use')).getPropertyValue('height');
      
      if(saveHeight != "0px") {
        document.querySelector('.benefit').style.height = '1200px';
      }
      
      if(useHeight == "0px") {
        document.querySelector('.use').style.height = "350px";
        document.querySelector('.more').style.display = "none";
      }else {
        document.querySelector('.use').style.height = "0px";
        setTimeout(function() {
          document.querySelector('.benefit').style.height = '760px';
          if(useHeight === "0px" || saveHeight === "0px") {
            document.querySelector('.more').style.display = "flex";
          }
        }, 500);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/common.scss';

.membership {
  .inner {
    width: 1100px;
    margin: 0 auto;

    .sub-title {
      width: 100%;
      margin: 80px 0;
      .box {
        text-align: center;
        padding: 16px 0;
        border: 2px solid #ccc;
        p {
          font-size: 32px;
          font-weight: 700;
          color: $brown;
        }
      }
    }

    .benefit {
      height: 760px;
      transition: .6s;
      h2 {
        font-size: 22px;
        font-weight: 700;
        position: relative;
      }
      .box {
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        .item {
          width: 100%;
          padding: 48px 0;
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #ccc;
          margin-right: 10px;
          &:first-child {
            .point-img {
              background: url(@/assets/board/point-save.png) no-repeat;
              background-size: cover;
              margin-right: 40px;
              filter: opacity(.5) drop-shadow(0 0 0 #FF0000);
            }
          }
          &:last-child {
            margin-right: 0;
            .point-img {
              background: url(@/assets/board/point-use.png) no-repeat;
              background-size: cover;
              margin-right: 40px;
              filter: opacity(0.5) drop-shadow(0 0 0 #FF0000);
            }
          }
          .point-img {
            width: 100px;
            height: 100px;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .content {
            p:first-child {
              font-size: 24px;
              font-weight: 600;
              color: $brown;
            }
            > div {
              button {
                width: 120px;
                height: 40px;
                background-color: $brown;
                color: #fff;
                border: none;
              }
            }
          }
        }
      }
      .more {
        height: 200px;
        font-size: 20px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: .5s;
        margin-top: 90px;
      }
    }

    .save, .use {
      height: 0;
      overflow: hidden;
      transition: .8s;
      h4 {
        font-weight: 700;
        position: relative;
        width: 140px;
        top: 24px;
        left: 24px;
        background-color: #fff;
        color: $brown;
        padding: 0 10px;
      }
      .point-save, .point-use {
        width: 100%;
        border: 2px solid #ccc;
        padding: 40px 32px 30px;
        .description {
          padding: 0;
          margin: 0 0 24px;
          h5 {
            font-size: 1.15rem;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    } 
  }
}

</style>