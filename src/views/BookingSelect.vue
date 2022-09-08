<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left" @click="delSelect">
          <i class="material-symbols-outlined">restart_alt</i>
          <span>예매 다시하기</span>
        </button>
        <h1 class="title">날짜/회차선택</h1>
        <button class="right" @click="closeModal">
          <span>창닫기</span>
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
      <main>
        <div class="info">
          <h2 class="side-title">공연</h2>
          <div class="showInfo">
            <img :src="thumb">
            <p class="showTitle">{{ title }}</p>
            <p>
              기간 : {{ startDate.substr(5, 2) }}월
              {{ startDate.substr(8, 2) }}일 ~
              {{ endDate.substr(5, 2) }}월
              {{ endDate.substr(8, 2) }}일
            </p>
            <p>장소 : {{ hallNum==1?'모던홀':hallNum=='2'?'아트홀':'오케스트라홀' }} </p>
          </div>
        </div>
        <div class="date">
          <h2 class="side-title">날짜</h2>

          <!-- 달을 가져오는데 만약 한자리면 빈 자리에 앞자리부터 0을 넣는다. 
            달을 getMonth로 가져오면 number 타입이 아니므로 padStart는 쓸 수 없다. -->
          <p class="month">{{ ("0" + month).slice(-2) }}</p>
          <p class="year">{{ year }}</p>

          <!-- 스크롤될때마다 이벤트를 파라미터로 받는 메소드 호출 -->
          <div class="selectDate" @scroll="getScroll($event.target)">
            <!-- 배열에 저장된 오늘부터 공연 마지막날까지의 요일과 날짜 개수만큼 버튼 생성하여 데이터 담기 -->
            <button
              v-for="(m, index) in currentMonth"
              :key="index" ref="sc" class="static"
              :class="{
                sat: m.day == '토',
                sun: m.day == '일',
                firstDay: m.date.getDate() == '1'}"
              @click="viewTime($event.currentTarget)"
              :value="
                m.date.getFullYear() +'-' +('0' + (m.date.getMonth() + 1)).slice(-2) +
                '-' +
                ('0' + m.date.getDate()).slice(-2)">
              {{ m.day }} {{ ("0" + m.date.getDate()).slice(-2) }}
            </button>
          </div>
        </div>
        <div class="time">
          <h2 class="side-title">회차선택</h2>
          <div class="timeBase" v-if="timeTable.length > 0">
            <div
              v-for="(m, index) in timeTable"
              :key="index"
              :class="{ timeTable: true, active: this.scheduleNum == m.schduleNum}"
              class="static"
              @click="selectTime($event.currentTarget.textContent, m.schduleNum)">
              <p>{{ m.count }}</p>
              <p>{{ m.startTime }}</p>
              <p>{{ m.seat }}</p>
            </div>
          </div>
          <div class="timeBase" v-else>
            <p class="empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                />
              </svg>
              날짜와 회차를 선택해주세요
            </p>
          </div>
        </div>
        <aside>
          <h2 class="side-title">구매정보</h2>
          <h3 class="show-title">{{ title }}</h3>
          <div class="show-info">
            <div class="info-row">
              <span>장소</span>
              <span>{{ hallNum==1?'모던홀':hallNum=='2'?'아트홀':'오케스트라홀' }}</span>
            </div>
            <div class="info-row">
              <span>날짜</span>
              <span>{{ onDate }}</span>
            </div>
            <div class="info-row">
              <span>회차</span>
              <span>{{ selectCnt }}</span>
            </div>
          </div>
        </aside>
        <div class="btn-box">
          <button @click="goNextPage">
            <span>좌석선택</span>
            <i class="material-symbols-outlined">arrow_right_alt</i>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from '@/axios/axios.js'
export default {
  
  data() {

    return {
      day: ["일", "월", "화", "수", "목", "금", "토"],
      currentMonth: [],
      reset: 1,
      firstTop: null,
      timeTable: [],
      gocl: false,
      selectCnt: '',
      onDate: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      today: new Date().getDate(),
      title: '',
      startDate: '',
      endDate: '',
      hallNum:'',
      thumb:'',
      seats:'',
      scheduleNum:'',
      showI:[],
      action:false
    }
  },

  mounted(){
    let show_num = this.$route.params.num;
    this.$store.commit('booking/setShowNum', show_num);
    this.getShow(show_num);
  },

  methods: {

    //가장 처음 화면에 뿌려줄 정보 담아오기
    async getShow(num){
       await axios.get('/moaplace.com/booking/getShow/' + num)
        .then(async function(resp){
          this.showI = resp.data.list;
          console.log(resp.data.list)
          this.title = resp.data.list[0].title;
          this.startDate = resp.data.list[0].showStart;
          this.endDate = resp.data.list[0].showEnd;
          this.hallNum = resp.data.list[0].hallNum;
          this.thumb = resp.data.thumb; 
          await this.viewDate();
          await this.onReady();
          await this.getTop();
        }.bind(this));
      
      //공연장 정보 가져오기 (혜인)
      this.$store.dispatch('booking/getHallInfo');

    },

    //오늘부터 공연 마지막날까지 몇 일 남았는지 일수 계산
    getTerm() {
      let termTo =
        new Date(this.endDate +" "+ "00:00").getTime() - new Date(this.year,this.month-1,this.today,0,0).getTime();
      return Math.round(termTo / 86400000); 
    },
    
    //가져온 날짜 데이터 이용하여 요일, 날짜 배열에 저장
   async viewDate() {
      //오늘 날짜에서 마지막 공연날까지의 일수를 더한만큼 반복 (오늘 날짜부터 i 시작)
      for (let i = this.today; i <= this.today + this.getTerm(); i++) {
        //요일,날짜 형식의 배열로 남은 공연기간만큼 배열에 저장
        this.currentMonth.push({
          //요일 저장
          day: this.day[
                new Date(this.year, this.month - 1, i).getDay()], 
          //연월일 전부 저장 
          date: new Date(this.year, this.month - 1, i)
        });
      }
    return this.currentMonth.length;
    },

    //부모요소(date클래스 div영역) 파라미터로 받기
    getScroll(e) {
      // firstDay라는 이름의 클래스가 부여된 모든 요소 가져오기
      let offTops = document.getElementsByClassName("firstDay");
      // 해당 달의 첫번째날 개수만큼 루프
      for (let i = 0; i < offTops.length; i++) {
        //반복될때마다 각 달 첫번째날의 offsetTop 받아오기
        let a = offTops[i].offsetTop;
        //date클래스 div영역의 스크롤바 위치가 달 첫번째날 위치에서 300px 뺀 값보다 크면(첫번째날 요소가 해당 위치만큼 올라오면)
        if (a - 300 <= e.scrollTop) {

          this.month = offTops[i].value.substr(5, 2);

          //만약 달 첫번째날의 해가 바뀌면
          if (this.year != offTops[i].value.substr(0, 4)) {
            this.year = offTops[i].value.substr(0, 4);
          }
        //date클래스 div영역의 스크롤바 위치가 달 첫번째날 위치에서 300px 뺀 값보다 작으면(첫번째날 요소가 해당 위치 아래면)
        } else if (this.getTop() - 300 >= e.scrollTop) {

          this.month = new Date().getMonth() + 1;
        }
      }
    },

    //버튼을 눌렀을 때 발생한 이벤트의 현재 요소 가지고 와서 변수에 정보 담기
    viewTime(e) {
      this.timeTable.splice(0);
      let ie = 1;
      this.onDate = "";
      this.selectCnt = "";
      //가지고 온 스케줄 데이터만큼 반복
      for (let i = 0; i < this.showI.length; i++) {
        if (this.showI[i].scheduleDate == e.value) {
          //22.09.03 (요일) 형식으로 보여주기 위함 
          this.onDate = e.value.substr(2, 2) + "." +
            e.value.substr(5, 2) + "." + e.value.substr(8, 2) +
            "(" + e.textContent.substr(0, 1) + ")";
          this.timeTable.push({
            count: ie++ + "회차",
            startTime: this.showI[i].scheduleTime,
            seat: this.showI[i].extraCnt + "/" + this.showI[i].seatCnt,
            schduleNum: this.showI[i].scheduleNum
          });
        }
      }
    },

    //클래스명 selectDate 붙은 모든 버튼 요소 가져와서 
    onReady(){
      let btns = document.querySelectorAll(".selectDate button");
      for (let i = 0; i < this.showI.length; i++) {
        for (let j = 0; j < btns.length; j++) {
          if (this.showI[i].scheduleDate == btns[j].value) {
            btns[j].className += " on_ready";
          }
        }
      }
      return this.showI.length;
    },
    
    selectTime(e, num) {
      this.selectCnt = e.substr(0, 3) + " " + e.substr(3, 5);
      this.scheduleNum = num;
      let data = {
        'schedule_num' : this.scheduleNum,
        'schedule_date' : this.onDate,
        'time' : this.selectCnt
      }
      //스케줄 업데이트(혜인)
      this.$store.commit('booking/setScheduleInfo', data);
      //이미 선택된 좌석 저장(혜인)
      this.$store.dispatch('booking/getAlreadySelect');

    },

    getTop() {
      if(document.querySelector(".firstDay")!=null){
        return document.querySelector(".firstDay").offsetTop;
      }
    },

    delSelect(){
      this.selectCnt = '',
      this.onDate = ''
      this.timeTable.splice(0);
      this.resetModal();
    },

    goNextPage(){
      if(this.selectCnt!=''){
         this.$router.push({name:'bookinseat'});
      }else{
        alert('날짜와 회차를 선택하세요')
      }
    },
    //모달창 종료
    closeModal(){
      let chk = window.confirm("모든 선택이 초기화되며 예매창이 종료됩니다.");
      if(chk == true){
          // 자식창에서 부모창으로 함수 호출 ( 데이터 전달 )
          window.parent.postMessage(
          // 전달할 data (부모창에서 호출할 함수명)
          { functionName : 'closeShow' }
          // 부모창의 도메인
          , 'http://localhost:8080/moaplace.com/'
          );
      }else{
          return;
      }
    },
    //예매다시하기(vuex 초기화)
    resetModal(){
      this.$store.commit('booking/resetAllChoice');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/common.scss";
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
a {
  color: $black;
  &:hover {
    color: $black;
  }
}
#wrap {
  
  .inner {
    width: 1000px;
    height: 700px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    header {
      width: 100%;
      height: 64px;
      background: $black;
      color: #fff;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      & > button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 14px;
        background: none;
        border: none;
        color: rgba(#fff, 0.9);
        & > :first-child {
          margin-right: 8px;
        }
      }
      h1.title {
        font-size: 22px;
      }
    }
    main {
      display: flex;
      flex-flow: row nowrap;
      height: calc(100% - 64px);
      border: 1px solid gainsboro;
      border-top: none;
      border-bottom: none;
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: calc(100% - 64px);
      overflow: hidden;
      .fontHeader {
        font-size: 24px;
        font-weight: bold;
        margin: 24px;
        padding: 8px;
        text-align: center;
      }
      .side-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .info {
        width: 30%;
        border-right: 1px solid rgba($black, 0.3);
        text-align: center;
        padding: 32px 16px 0 16px;
        .showInfo {
          text-align: center;
          margin: auto;
          padding: 8px;
          padding-bottom: 80px;
          img {
            width: 100%;
          }
          .showTitle {
            font-size: 24px;
            margin-top: 32px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          p {
            font-size: 16px;
            text-align: left;
            margin-top: 8px;
            line-height: 1;
          }
        }
      }

      .date {
        width: 12%;
        border-right: 1px solid rgba($black, 0.3);
        text-align: center;
        overflow: hidden;
        height: 100%;
        padding: 32px 0 0;
        .month {
          font-size: 40px;
          font-weight: bold;
          line-height: 1;
        }
        .year {
          font-size: 24px;
          font-weight: bold;
        }
        .selectDate {
          width: 100%;
          height: 424px;
          margin: auto;
          overflow: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
          margin-top: 16px;
          &::-webkit-scrollbar {
            display: none;
          }

          button {
            width: 100%;
            font-size: 24px;
            margin: 8px;
            display: block;
            text-align: center;
            margin: auto;
            padding: 8px;
            background: none;
            border: none;
            color: rgba($black, 0.3);
            &.on_ready {
              color: $black;
              &:focus {
                background-color: rgba($black, 0.1);
              }
              &.sun {
                color: red;
              }
              &.sat {
                color: blue;
              }
            }
          }
        }
      }

      .time {
        width: 38%;
        padding: 32px 16px 0 16px;
        text-align: center;
        margin-bottom: 16px;
        .timeBase {
          margin-top: 60px;
          .empty {
            font-size: 16px;
            display: flex;
            align-items: center;
            padding: 160px 52px;
            justify-content: center;
            svg {
              margin: 0px 8px;
            }
          }

          .timeTable {
            border: 2px solid transparent;
            border-bottom: 1px solid rgba($black, 0.3);
            display: flex;
            height: 56px;
            margin-left: 8px;
            margin-right: 8px;
            align-items: center;
            text-align: center;
            cursor: pointer;
            &:first-child {
              border-top: 1px solid rgba($black, 0.3);
            }
            p {
              width: calc(100% / 3);
              font-size: 18px;
            }
            &:hover {
              border: 2px solid lighten($brown, 20%);
              border-radius: 8px;
            }
          }
          .active {
            border: 2px solid lighten($brown, 20%);
            border-radius: 8px;
          }
        }
      }
      aside {
        width: 20%;
        border-left: 1px solid rgba($black, 0.3);
        padding: 32px 16px 0 16px;
        text-align: center;
        position: relative;
        .show-title {
          font-size: 18px;
          padding-bottom: 16px;
          margin-bottom: 24px;
          border-bottom: 1px solid $black;
          font-weight: bold;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .show-info {
          width: 100%;
          display: flex;
          flex-flow: column nowrap;
          .info-row {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            margin-bottom: 8px;
            span:first-child {
              margin-right: 16px;
              font-weight: bold;
            }
          }
        }
      }
      .btn-box {
        width: 20%;
        position: absolute;
        right: 0;
        bottom: 0;
        button {
          width: 100%;
          height: 64px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          border: none;
          background: #cdc7b9;
          &:last-child {
            background: $brown;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
