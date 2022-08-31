<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="관람예절"/>
    <div id="wrap">
      <div class="inner">
        <div class="toptit">
        <h2>공연관람예절</h2>
        <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>
        </div>
        <div class="title">
          <p class="orange fw-bold fs-5">공연관람예절 이것만은 지키자!!</p>
          <p>
            많은 사람들이 모이는 곳, 그 곳이 더군다나 예술작품을 함께 감상해야 하는 장소라면 더군다나 서로 지켜야 할 기본적인 예절을 지켜야 서로의 작품 감상에 방해가 되지 않을 것입니다.
          </p>
        </div>
        <div class="box">
          <ul class="item">
            <li>
              <div class="icon">
                <img src="../../assets/board/ee1.png" alt="01">
              </div>
              <div class="content">
                <p>감상을 방해할 만한 행동</p>
                <ul>
                  <li>객석 내 음식물 반입 및 섭취</li>
                  <li>공연 중 옆사람과의 대화</li>
                  <li>공연 중 서서 관람하는 행위</li>
                  <li>지정석 이외의 자리에 앉는 행위</li>
                  <li>음주 후 공연 관람</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/board/ee2.png" alt="02">
              </div>
              <div class="content">
                <p>사진 촬영은 절대 금물</p>
                <ul>
                  <li>공연 중에는 사전 허가를 받은 전문인만 사진을 촬영 할 수 있습니다.</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/board/ee3.png" alt="03">
              </div>
              <div class="content">
                <p>어린이 동행 시 출입 가능한 나이를 사전에 체크하셔야 합니다.</p>
                <ul>
                  <li>공연 내용에 따라 5세이상, 7세 이상, 12세 이상 관람가능 연령이 나누어져 있으며 관람 연령에 따라 입장이 불가한 경우 어린이 놀이방을 이용하여 주시기 바랍니다.</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/board/ee4.png" alt="04">
              </div>
              <div class="content">
                <p>공연장 도착은 20분 전, 객석 입장은 10분 전</p>
                <ul>
                  <li>원칙적으로 공연 시작 이후 공연장 입장은 금지이나 지연 관객을 위한 입장이 있다면 안내원의 안내에 따라 빈 좌석에 착석하여 주시고 휴식시간에 본 좌석으로 이동하여 주시기 바랍니다.</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/board/ee5.png" alt="05">
              </div>
              <div class="content">
                <p>음식물은 휴게실에서 공연장에선 공연감상만</p>
                <ul>
                  <li>모든 일체의 음식물은 공연장 안으로 가져갈 수 없습니다. 자신의 조그만 부주의가 공연자는 물론 객석의 관람자에게도 큰 피해를 주어 공연장 분위기를 망칠 수 있는 것을 양해 해 주시고, 음식물은 꼭 드신 후 입장해 주시기 바랍니다.</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="icon">
                <img src="../../assets/board/ee6.png" alt="06">
              </div>
              <div class="content">
                <p>공연장에서 조심해야 할 물건들</p>
                <ul>
                  <li>소리가 많이 나는 비닐제품이나 꽃다발, 음식물 등은 물품보관소에 맡겨주시고, 휴대폰 전원은 종료 후에 입장 해주시기 바랍니다.</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

p {
  margin: 5px;
}
#wrap {
  width: $width;
  color: $black;
  margin: 0 auto;
  .orange {
    color: #D67747;
  }
  .inner {
    width: 100%;
    padding: 50px 0px;
    padding-top: 120px;
    .toptit {
      margin-bottom: 64px;
      > h2 {
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
      }
      > p {
        text-align: center;
      }
    }
    .title {
      border: 10px solid #eee;
      margin-bottom: 10px;
      padding: 15px 20px;
      word-break: keep-all;
    }
    .box {
      margin: 50px 0px;
      .item {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        justify-content: center;
        > li {
          width: calc((100% - 60px)/2);
          display: flex;
          // margin-right: 50px;
          margin-bottom: 50px;
          .icon {
            margin-right: 20px;
            > img {
              width: 120px;
            }
          }
          .content {
            > p {
              font-size: 1.5em;
              margin-bottom: 20px;
              word-break: keep-all;
              line-height: 1.2;
            }
            > ul {
              position: relative;
              padding-left: 20px;
              list-style-type: disc;
              > li {
                margin-bottom: 10px;
              }
            }
          }
          &:nth-child(2n) {
            margin-left: 60px;
          }
        }
      }
      
    }
  }
}
</style>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>
