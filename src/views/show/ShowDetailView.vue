<template>
<div>
  <AppHeader/>
  <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
  <div id="wrap">
    <div id="main" class="containers">
      <div id="img">
        <img :src="detail.show_thumbnail">
      </div>
      <div class="info_box">
        <div id="info">
          <h4>{{detail.show_name}}</h4>
          <div>
            <span class="category">기간</span> 
            <span>
              {{start_date}} ~ {{end_date}}
            </span>
          </div>
          <div v-if="detail.hall_num==1">
            <span class="category">장소</span> 
            <span>모던홀</span>
          </div>
          <div v-else-if="detail.hall_num==2">
            <span class="category">장소</span> 
            <span>오케스트라홀</span>
          </div>
          <div v-else-if="detail.hall_num==3">
            <span class="category">장소</span> 
            <span>아트홀</span>
          </div>
          <div>
            <span class="category">시간</span>
            <span>러닝타임 : {{detail.running_time}}분, 인터미션 : {{detail.intermission}}분</span> 
          </div>
          <div>
            <span class="category">연령</span> 
            <span>{{detail.show_age}}</span>
          </div>
          <div>
            <span class="category">티켓</span>
            <span v-for="g, index in grade" :key="index">
              <span v-if="index!=0"> / </span>{{g.grade_seat}}석 {{g.grade_price}}원
            </span>
          </div>
        </div>
        <div id="mybtn" v-if="login_chk==null">
          <button @click="this.$router.push({path: '/moaplace.com/users/login'})">관심공연</button>
          <button v-if="check" @click="residualseats">잔여석정보</button>
          <button v-if="check" @click="this.$router.push({path: '/moaplace.com/users/login'})">예매하기</button>
        </div>
        <div id="mybtn" v-else>
          <button @click="favorite()">관심공연</button>
          <button v-if="check" @click="residualseats()">잔여석정보</button>
          <button v-if="check" @click="showModal">예매하기</button>
        </div>
      </div>
    </div>
    <div id="nav">
      <button id="tap_1" class="tap_on" @click="tap_1()">상세보기</button>
      <button id="tap_2" class="tap_off" @click="tap_2()">관람평</button>
      <button id="tap_3" class="tap_off" @click="tap_3()">취소 및 환불 안내</button>
    </div>
    <ShowDetailImg v-if="chk1"/>
    <ShowReview v-if="chk2"/>
    <ShowRefund v-if="chk3"/>
  </div>
  <AppFooter/>
  <div class="booking-Modal" v-if="isShow == true" :class="{active: isShow == true}">
    <iframe :src="`/moaplace.com/booking/select/${show_num}`" frameborder="0"></iframe>
  </div>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import ShowDetailImg from '@/components/show/ShowDetailImg.vue'
import ShowRefund from '@/components/show/ShowRefund.vue'
import ShowReview from '@/components/show/ShowReview.vue'
import axios from '@/axios/axios.js'

export default {
  name:"ShowDetailView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
    ShowDetailImg,
    ShowRefund,
    ShowReview
  },
  data(){
    return{
      detail:[],
      schedule:[],
      grade:[],
      detailimg:[],

      start_date:'',
      end_date:'',
      
      check:false,
      login_chk:null,

      show_num: 0,
      isShow: false, //모달창

      favorite_show:{
        show_num:0,
        member_num: 0
      },

      chk1: true,
      chk2: false,
      chk3: false
    }
  },
  created(){
    this.memberinfo();
    this.data();
    this.show_num = this.$route.params.show_num;

    //모달창 종료
    window.addEventListener( 'message', (e) => {
        if( e.data.functionName === 'closeShow' )
          this.isShow = false;
          let body = document.querySelector("body");
          body.removeAttribute('style');
    });
  },  
  methods: {
    data(){
      let show_num=this.$route.params.show_num;
      axios.get(`/moaplace.com/show/showdetail/${show_num}`)
        .then((resp) => {
          this.detail = resp.data.detail[0];
          this.schedule = resp.data.schedule;
          this.grade = resp.data.grade;
          this.detailimg = resp.data.detailimg;

          let show_start = new Date(resp.data.detail[0].show_start);
          let show_end = new Date(resp.data.detail[0].show_end);

          let days=["일", "월", "화", "수", "목", "금", "토"];

          let show_day1 = new Date(show_start).getDay();
          let show_day2 = new Date(show_end).getDay();
          
          let start_day=days[show_day1];
          let end_day=days[show_day2];

          this.start_date = `${show_start.getFullYear()}.
            ${new Date(show_start).getMonth()+1 < 10 ? `0${new Date(show_start).getMonth()+1}` : new Date(show_start).getMonth()+1}
            .${new Date(show_start).getDate() < 10 ? `0${new Date(show_start).getDate()}` : new Date(show_start).getDate()}
            (${start_day})`;
          
          this.end_date = `${show_end.getFullYear()}.
            ${new Date(show_end).getMonth()+1 < 10 ? `0${new Date(show_end).getMonth()+1}` : new Date(show_end).getMonth()+1}
            .${new Date(show_end).getDate() < 10 ? `0${new Date(show_end).getDate()}` : new Date(show_end).getDate()}
            (${end_day})`;

          let price_comma=[];
          for(let i=0; i<resp.data.grade.length; i++) {
            price_comma[i] = this.numberWithCommas(resp.data.grade[i].grade_price);
            this.grade[i].grade_price = price_comma[i];
          }

          if(resp.data.detail[0].show_check == "Y" && resp.data.detail[0].show_end >= new Date() && resp.data.schedule.length != 0) {
            this.check = true;
          }

          this.favorite_show.show_num = resp.data.detail[0].show_num;
        }
      )
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    memberinfo() {
      let token = localStorage.getItem("access_token");
      if(token == null) return;
      this.login_chk = token;

      axios.get("/moaplace.com/users/login/member/info")
      .then(response => {
        let data = response.data;
        this.favorite_show.member_num = data.member_num;
      })
      .catch(error => {
        console.log(error.message);
      })
    },

    showModal(){
      this.isShow = true;
      let body = document.querySelector("body");
      body.style.height = "100%";
      body.style.overflow = "hidden";
    },

    favorite(){
      if(confirm("관심공연으로 등록하시겠습니까?") == true){
        axios.post('/moaplace.com/show/inter/insert', JSON.stringify(this.favorite_show),{
          headers: {'Content-Type' : 'application/json'}
        })
        .then(resp => {
          if(resp.data!='fail'){ 
            alert('관심공연으로 등록되었습니다.');
            return
          }else {
            alert('이미 등록된 공연입니다.');
            return
          }
        }).catch(error => {
          console.log(error.message);
        })
      }else {
        return
      }
    },
    residualseats(){
      window.open(
        "/moaplace.com/show/residualseats/" + this.$route.params.show_num,
        "잔여석 정보",
        "width=1000, height=700",
        "_blank"
      );
    },
    tap_1() {
      this.chk1 = true;
      this.chk2 = false;
      this.chk3 = false;
      document.querySelector("#tap_1").className = "tap_on";
      document.querySelector("#tap_2").className = "tap_off";
      document.querySelector("#tap_3").className = "tap_off";
    },
    tap_2() {
      this.chk1 = false;
      this.chk2 = true;
      this.chk3 = false;
      document.querySelector("#tap_1").className = "tap_off";
      document.querySelector("#tap_2").className = "tap_on";
      document.querySelector("#tap_3").className = "tap_off";
    },
    tap_3() {
      this.chk1 = false;
      this.chk2 = false;
      this.chk3 = true;
      document.querySelector("#tap_1").className = "tap_off";
      document.querySelector("#tap_2").className = "tap_off";
      document.querySelector("#tap_3").className = "tap_on";
    },
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
      height: 100%;
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
    button{
      font-size: 20px;
      width: 100%;
      padding: 16px 0;
      border: 1px solid $brown;
    }
    .tap_on{
      background-color: $brown;
      color: #fff;
    }
    .tap_off{
      background-color: #fff;
      color: $black;
    }
    #tap_2{
      border-right: none;
      border-left: none;
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
        .category{
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
      font-size: 16px;
      line-height: 56px;
    }
    #mybtn{
      margin-top: 52px;
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
  .booking-Modal{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100vh;
    font-family: 'Roboto', 'Nanum Gothic', sans-serif;
    background: rgba(#000, 0.7);
    iframe{
      width: 1000px;
      height: 700px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    &.active iframe{
      animation-name: fadeIn;
      animation-duration: 1s;
    }
    @keyframes fadeIn {
      from {
        visibility: hidden;
        opacity: 0;
      }

      to {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>