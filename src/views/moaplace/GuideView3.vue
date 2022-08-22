<template>
  <div id="wrap">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="공연장정보" />
    <div id="container">
      <div class="page">
        <button
          class="btn"
          @click="$router.push({ name: 'moaplaceGuideView' })"
        >
          MORDERN HALL
        </button>
        <button
          class="btn"
          @click="$router.push({ name: 'moaplaceGuideView2' })"
        >
          ORCHESTRA HALL
        </button>
        <button
          class="btn"
          @click="$router.push({ name: 'moaplaceGuideView3' })"
        >
          ART HALL
        </button>
      </div>
      <div class="m00 m10 m12">
        <div class="tit_inner_wrap">
          <p class="tit">ART HALL</p>
          <p class="sub_tit">아트홀은 총 120석으로 되어있습니다.</p>
        </div>
        <div class="con con1">
          <div class="inner_wrap">
            <div class="hall_img">
              <img
                src="@/assets/moaplace/perform_main7.gif"
                class="img"
                alt="홀 이미지1"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="seat">
        <div class="seat_inner_wrap">
          <p class="tit">좌석배치도</p>
          <p class="txt">
            모아플레이스는 모든 좌석이 동일하게 따뜻한 공간감을 느끼도록
            설계하였습니다.
          </p>
        </div>
        <div class="con con2">
          <div class="inner_wrap">
            <div class="seat_img">
              <img
                src="@/assets/moaplace/seat3.png"
                class="img"
                alt="의자 이미지1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SideVisual from "@/components/SideVisual.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/common.scss";
#container {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  .page {
    width: $width;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 64px;
    button {
      margin-right: 16px;
      color: #f1f1f1;
      padding: 16px 0;
      border: none;
      width: calc((100% - (16px * 2)) / 3);
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
.m00 {
  width: 100%;
  position: relative;
}
.m12 .inner_wrap {
  width: 1100px;
  margin: 0 auto;
}
.tit_inner_wrap {
  text-align: center;
  padding: 125px 0 100px;
}
.tit_inner_wrap .tit {
  font-size: 50px;
  font-weight: 700;
}
.tit_inner_wrap .sub_tit {
  font-size: 17px;
  color: #666666;
  margin-top: 15px;
}
.img {
  width: 100%;
}
.con {
  margin: 0 auto;
}
.seat_img {
  width: 1100px;
  margin: 0 auto;
}
.con2 .inner_wrap {
  padding: 0 0 100px 0;
}
.seat_inner_wrap {
  text-align: center;
  padding: 80px 0 60px;
  width: 100%;
  margin: 0 auto;
}
.seat_inner_wrap .tit {
  font-size: 40px;
  font-weight: 500;
}
.seat_inner_wrap .txt {
  font-size: 17px;
  color: #666666;
  margin-top: 15px;
}
</style>