<template>
  <div class="main">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="공간소개" />
    <div class="m00 m10 m11">
      <div class="title_inner_wrap">
        <p class="main_tit">MOAPLACE INTRODUCTION</p>
      </div>
      <div class="con con1">
        <div class="inner_wrap">
          <div class="img_box">
            <img
              src="@/assets/moaplace/moa1.jpg"
              class="img1"
              alt="아트홀 이미지1"
            />
            <img
              src="@/assets/moaplace/moa2.jpg"
              class="img2"
              alt="아트홀 이미지2"
            />
            <img
              src="@/assets/moaplace/moa3.jpg"
              class="img3"
              alt="아트홀 이미지3"
            />
            <span class="item1"></span>
            <span class="item2"></span>
          </div>
          <div class="txt_box">
            <p class="tit">MOAPLACE는 <br />최적의 공연 환경을 제공합니다.</p>
            <p class="txt">
              공연장의 가장 큰 음향요소는 모든 객석 간의 음향 에너지 레벨 편차가
              약 4dB 이내로 편성되어야 연주자의 연주가 공연장 전체에 최소한의
              감쇠특성을 가지게 되므로 공연장 전체에 잘 전달되게 됩니다.
              마감소재가 후벽 타공패널을 제외하고 흡음재가 사용되지 않았고
              소리를 여러방향으로 효과적으로 전달시켜 최적의 음향 조건을 경험할
              수 있게 설계되었습니다.
            </p>
            <p class="txt">
              최적의 설계로 음향 확산구조를 적용하여 비교적 소규모 공연장임에도
              불구하고 실내악, 독주회, 독창회 등의 클래식 컨텐츠뿐만 아니라
              국악, 크로스오버, 대중음악 등의 다양한 장르를 소화해 낼 수 있는
              최적의 음향 환경을 제공합니다.
            </p>
          </div>
        </div>
      </div>
      <div class="con con2">
        <div class="inner_wrap">
          <p class="tit_type2">추천 공연 장르</p>
          <ul>
            <li>
              <div class="box">
                <p class="num">01</p>
                <p class="tit">
                  실내악
                  <span> ．</span>
                  독주회
                  <span> ．</span>
                  독창회
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <p class="num">02</p>
                <p class="tit">
                  기업행사
                  <span> ．</span>
                  강연
                  <span> ．</span>
                  세미나
                </p>
              </div>
            </li>
            <li>
              <div class="box">
                <p class="num">03</p>
                <p class="tit">
                  대중음악
                  <span> ．</span>
                  재즈
                  <span> ．</span>
                  국악공연
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="con con3">
        <div class="inner_wrap">
          <p class="tit_type2">시설안내</p>
          <table cellpadding="0" cellspacing="0" class="table table1">
            <tr class="tr">
              <th class="th">
                <p>음향설계</p>
              </th>
              <td class="td">
                <p class="icon">
                  <span><img src="@/assets/moaplace/icon01.png" alt /></span>
                </p>
                <p class="tit">
                  <span>음향설계</span>
                </p>
                <p class="txt">
                  <span>(주)모아 시스템</span>
                </p>
              </td>
            </tr>
            <tr class="tr">
              <th class="th">
                <p>System Spec</p>
              </th>
              <td class="td">
                <ul>
                  <li>
                    <p class="icon">
                      <span><img src="@/assets/moaplace/piano.png" alt /></span>
                    </p>
                    <p class="tit">
                      <span>피아노</span>
                    </p>
                    <p class="txt">
                      <span>NewYork Model</span>
                    </p>
                  </li>
                  <li>
                    <p class="icon">
                      <span
                        ><img src="@/assets/moaplace/console.png" alt
                      /></span>
                    </p>
                    <p class="tit">
                      <span>조명콘솔</span>
                    </p>
                    <p class="txt">
                      <span>ETC COLORSOURCE</span>
                    </p>
                  </li>
                  <li>
                    <p class="icon">
                      <span
                        ><img src="@/assets/moaplace/speaker.png" alt
                      /></span>
                    </p>
                    <p class="tit">
                      <span>
                        메인
                        <br />
                        스피커
                      </span>
                    </p>
                    <p class="txt">
                      <span>MEYER SOUND LINA / 750-LFC</span>
                    </p>
                  </li>
                  <li>
                    <p class="icon">
                      <span><img src="@/assets/moaplace/pro.png" alt /></span>
                    </p>
                    <p class="tit">
                      <span>
                        디지털
                        <br />
                        음향
                        <br />
                        프로세서
                      </span>
                    </p>
                    <p class="txt">
                      <span>MEYER SOUND / GALILEO GALAXY 408</span>
                    </p>
                  </li>
                  <li>
                    <p class="icon">
                      <span
                        ><img src="@/assets/moaplace/icon02.png" alt
                      /></span>
                    </p>
                    <p class="tit">
                      <span>
                        비디오
                        <br />
                        시스템
                      </span>
                    </p>
                    <p class="txt">
                      <span>Blackmagic Video Recordimg System</span>
                    </p>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
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
<style lang="scss" scoped>
@import "@/scss/common.scss";

$brown: #826d5e;
.main {
  margin: 0 auto;
}
.main .title_inner_wrap {
  text-align: center;
  padding: 125px 0 80px;
}
.main .title_inner_wrap .main_tit {
  font-size: 50px;
  font-weight: 700;
}
.m11 .con1 {
  height: 1350px;
  background: url(@/assets/moaplace/logo.png) no-repeat right bottom;
}
.m11 .con:nth-child(odd) {
  background: #f1f1f1;
  padding: 64px;
}
.m00 .con {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 150px 0;
}
.m00 .con .inner_wrap {
  position: relative;
  width: 1100px;
  margin: 0 auto;
}

.m11 .con1 .img_box {
  width: 675px;
  position: relative;
  height: 100%;
  float: left;
}
.m11 .con1 .img_box .img1 {
  left: 85px;
  z-index: 0;
}

.m11 .con1 .img_box img {
  position: absolute;
  top: 0;
  display: block;
}
.m11 .con1 .img_box .img2 {
  top: 575px;
  z-index: 2;
}

.m11 .con1 .img_box img {
  position: absolute;
  top: 0;
  display: block;
}
.m11 .con1 .img_box .img3 {
  left: 340px;
  top: 788px;
  z-index: 2;
}
.m11 .con1 .img_box img {
  position: absolute;
  display: block;
}
.m11 .con1 .img_box .item1 {
  top: 555px;
  left: -26px;
}
.m11 .con1 .img_box .item2 {
  right: -23px;
  bottom: -1060px;
}
.m11 .con1 .img_box span {
  position: absolute;
  display: block;
  content: "";
  width: 184px;
  height: 184px;
  background: #bfb3a2;
  z-index: 1;
}

.m11 .con1 .txt_box {
  float: right;
  width: calc(100% - 675px);
  border-top: 4px solid $brown;
  margin-top: 40px;
  padding: 24px 0 0 40px;
  box-sizing: border-box;
}
.m11 .con1 .txt_box .tit {
  font-size: 40px;
  margin-bottom: 45px;
  line-height: 60px;
  font-weight: 400px;
}
.m00 p {
  font-size: 20px;
}
p {
  display: block;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.m11 .con1 .txt_box .txt {
  margin-bottom: 30px;
  color: #787878;
  letter-spacing: -0.3px;
  line-height: 35px;
  font-weight: 300;
  text-align: justify;
  /* word-break: keep-all; */
}

.m00 .con .tit_type2 {
  text-align: center;
  font-size: 38px;
  color: #000;
  font-weight: 500;
  line-height: 130%;
}
ul,
li {
  list-style: none;
  text-align: left;
}
.m11 .con2 ul li:nth-child(1) {
  background: url(@/assets/moaplace/stage.jpg) no-repeat center;
  background-size: 335px 335px;
}

.m11 .con2 ul {
  overflow: hidden;
  margin: 0 auto;
  display: table;
  padding: 0;
}

.m11 .con2 ul li .box {
  display: table-cell;
  vertical-align: middle;
}
.m11 .con2 ul li .num {
  font-family: "Montserrat";
  font-size: 17px;
  font-weight: 600px;
  margin-bottom: 5px;
}
.m11 .con2 ul li p {
  color: #fff;
  text-align: center;
}
.m11 .con2 ul li .tit {
  font-size: 23px;
}
.m11 .con2 ul li span {
  font-size: 12px;
  display: inline-block;
  padding: 0 5px;
  height: 26px;
  vertical-align: middle;
}
.m11 .con2 ul li:nth-child(2) {
  background: url(@/assets/moaplace/mike.png) no-repeat center;
  background-size: 335px 335px;
  margin-top: 50px;
}

.m11 .con2 ul li {
  display: table;
  float: left;
  width: 355px;
  height: 430px;
}

ul li {
  list-style: none;
  text-align: left;
  width: 100%;
  overflow: hidden;
}
.m11 .con2 ul li:nth-child(3) {
  background: url(@/assets/moaplace/jazz.jpg) no-repeat center;
  background-size: 335px 335px;
}
.m00 .con .tit_type2 {
  text-align: center;
  font-size: 32px;
  color: #000;
  font-weight: 500;
  line-height: 130%;
}

.m11 .con3 {
  clear: both;
  padding: 64px;
}

.m11 .con3 .table1 {
  margin-bottom: 64px;
  margin-top: 64px;
}
.m00 .table {
  width: 100%;
  border-top: 4px solid $black;
  border-bottom: 4px solid $black;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.m00 .table .tr {
  border-bottom: 1px solid #e5e5e5;
  padding: 60px 0;
  box-sizing: border-box;
  display: table;
  width: 100%;
}
.m00 .table .th {
  display: table-cell;
  width: 350px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 60px 0 60px 60px;
  text-align: left;
}
.m11 .con3 .table1 .td {
  padding: 40px 0;
}
.m00 .table .td {
  vertical-align: top;
  width: calc(100% - 350px);
  box-sizing: border-box;
}

.m11 .con3 .table1 .td .icon {
  width: 90px;
  height: 90px;
  float: left;
  background: $brown;
  border-radius: 50%;
  display: table;
  margin-right: 40px;
}
.m11 .con3 .table1 .td p span {
  vertical-align: middle;
  display: table-cell;
  width: 300px;
}
.m11 .con3 .table1 .td .icon img {
  display: block;
  margin: 0 auto;
}
img {
  vertical-align: middle;
  border: 0 none;
}
.m11 .con3 .table1 .td .tit {
  font-size: 25px;
  font-weight: 500;
  width: 100px;
  box-sizing: border-box;
}

.m11 .con3 .table1 .td p {
  font-size: 25px;
  height: 90px;
  display: table;
  float: left;
  margin-right: 40px;
}
.m00 .table .td .txt {
  color: #787878;
  line-height: 29px;
}
.m11 .con3 .table1 .td {
  padding: 40px 0;
  ul {
    padding: 0;
  }
}
</style> 


