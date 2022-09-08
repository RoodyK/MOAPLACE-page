<template>
  <div id="wrap">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="오시는길" />
    <div class="m00 m10 m14">
      <div class="tit inner_wrap">
        <h2 class="main_tit">오시는길</h2>
        <p class="main_txt">
          문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
        </p>
      </div>
      <div class="con con1">
        <div class="inner_wrap">
          <div class="map"></div>
          <div class="txt_box">
            <p class="tit">MOAPLACE</p>
            <ul>
              <li>
                <p class="s_tit">주소</p>
                <p class="s_txt">
                  서울특별시 종로구
                  <br />
                  율곡로10길 105
                  <br />
                  디아망 4층
                  <br />(봉익동 10-1)
                </p>
              </li>
              <li>
                <p class="s_tit">연락처</p>
                <p class="s_txt">070-8240-3211~3</p>
              </li>
            </ul>
          </div>
          <table cellpadding="0" cellspacing="0" class="table table2">
            <tbody>
              <tr class="tr">
                <th class="th">
                  <p>대중교통</p>
                </th>
                <td class="td">
                  <div class="list">
                    <p class="t_tit">지하철 이용시</p>
                    <span class="txt">
                      종로3가역 8번출구 건너편 이마트24 편의점 후문 앞
                      디아망빌딩 4층 (도보 1분)
                    </span>
                  </div>
                  <div class="list">
                    <p class="t_tit">버스 이용 시</p>
                    <span class="txt">
                      간선버스 : 100, 152, 202, 261, N30(종로 3가역 정거장 하차
                      후 도보 5분)
                    </span>
                  </div>
                </td>
              </tr>
              <tr class="tr">
                <th class="th">
                  <p>주차안내</p>
                </th>
                <td class="td">
                  <div class="list">
                    <p class="t_tit">평일</p>
                    <span class="txt">
                      3시간 6천원 할인권, 구매 후 할인정산
                    </span>
                  </div>
                  <div class="list">
                    <p class="t_tit">주말</p>
                    <span class="txt">
                      종일 6천원 할인권, 구매 후 할인정산
                    </span>
                  </div>
                  <div class="list">
                    <p class="t_tit">할인권</p>
                    <span class="txt"> 최대 2장까지 합산 사용 가능 </span>
                  </div>
                </td>
              </tr>
            </tbody>
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
  data() {
    return {
      map: null,
      markersPosition: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      /* const container = document.querySelector(".map"); id, class 둘 다 가져옴 */
      const container = document.getElementsByClassName("map")[0];
      /* getElementsByClassName 배열로 가져오기 때문에 [0] 붙여준다 */
      const options = {
        center: new kakao.maps.LatLng(37.5729, 126.9922),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
      this.markerPosition = new kakao.maps.LatLng(37.5729, 126.9922);
      var marker = new kakao.maps.Marker({
        position: this.markerPosition,
      });
      marker.setMap(this.map);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/common.scss";
$brown: #826d5e;
.m00 {
  width: 100%;
  position: relative;
}
.m00 .tit {
  text-align: center;
  padding: 125px 0 100px;
}
.m00 .t_tit {
  text-align: center;
}
.inner_wrap {
  width: $width;
  margin: 0 auto;
}
.m00 .tit .main_tit {
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
}

.m00 .con1 {
  padding: 0 0 150px 0;
}
.m00 .con {
  position: relative;
  width: 100%;
  height: auto;
  box-sizing: border-box;
}
.m00 .con .inner_wrap {
  position: relative;
  width: 1100px;
  margin: 0 auto;
}
.m14 .inner_wrap > .map {
  float: left;
  border: 1px solid #cecece;
  border-right: 0;
  box-sizing: border-box;
  width: 750px;
  height: 600px;
  margin-bottom: 65px;
  overflow: hidden;
}
.m14 .txt_box {
  float: left;
  background: $brown;
  background-size: 100%;
  box-sizing: border-box;
  width: calc(100% - 750px);
  height: 600px;
  padding: 10px;
}
.m14 .txt_box .tit {
  font-size: 38px;
  color: #fff;
  line-height: 0%;
}
ul,
li {
  list-style: none;
  text-align: left;
}
ul {
  padding-left: 2rem;
  padding-right: 2rem;
}
.m14 .txt_box ul li:first-child {
  background: url(@/assets/moaplace/location.png) no-repeat top left;
}
.m14 .txt_box ul li:last-child {
  background: url(@/assets/moaplace/phone-call.png) no-repeat top left;
}
.m14 .txt_box ul li {
  padding-left: 55px;
  margin-bottom: 25px;
}
.m14 .txt_box ul li .s_tit {
  color: #fff;
  font-weight: 500;
  padding: 2px 0 1px;
}
.m00 p {
  font-size: 17px;
}
.m14 .txt_box ul li .s_txt {
  color: #fff;
  font-weight: 500;
}
.m14 .table2 {
  border-top: 2px solid $black;
}
.m00 .table {
  width: 100%;
  background: #fff;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

.m00 .table .tr {
  border-bottom: 1px solid #e5e5e5;
  padding: 60px 0;
  box-sizing: border-box;
  width: 100%;
}
tr {
  vertical-align: inherit;
  border-color: inherit;
}
.m14 .table2 .th {
  padding: 35px 0 35px 60px;
  vertical-align: middle;
}

th {
  color: #222;
  font-size: 100%;
}
.m00 .table .th p {
  font-size: 28px;
  font-weight: 300;
}

.m00 .table .td {
  padding: 40px 0 35px 0;
}
.m00 .table2 .td .t_tit {
  position: relative;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 15px;
  padding-left: 15px;
}
.m14 .table2 .td .t_tit,
.m14 .table2 .td .txt {
  display: inline-block;
  margin-right: 10px;
  color: $brown;
}

.m00 .table .td .txt {
  color: #787878;
  line-height: 29px;
}
.m00 .table2 .txt {
  padding-left: 15px;
}
</style>>

