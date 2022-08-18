<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left">
          <i class="material-symbols-outlined">restart_alt</i>
          <span>예매 다시하기</span>
        </button>
        <h1 class="title">날짜/회차선택</h1>
        <button class="right">
          <span>창닫기</span>
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
      <main>
        <div class="info">
          <h2 class="side-title">공연</h2>
          <div class="showInfo">
            <img :src="list.imgSrc" />
            <p class="showTitle">{{ list.title }}</p>
            <p>
              기간 : {{ list.startDate.substr(5, 2) }}월
              {{ list.startDate.substr(8, 2) }}일 ~
              {{ list.endDate.substr(5, 2) }}월
              {{ list.endDate.substr(8, 2) }}일
            </p>
            <p>장소 : {{ list.hall }}</p>
          </div>
        </div>
        <div class="date">
          <h2 class="side-title">날짜</h2>
          <p class="month">{{ ("0" + list.month).slice(-2) }}</p>
          <p class="year">{{ list.year }}</p>
          <div class="selectDate" @scroll="getScroll($event.target)">
            <button
              v-for="(m, index) in currentMonth"
              :key="index"
              ref="sc"
              :class="{
                sat: m.day == '토',
                sun: m.day == '일',
                firstDay: m.date.getDate() == '1',
              }"
              class="static"
              @click="viewTime($event.currentTarget)"
              :value="
                m.date.getFullYear() +
                '-' +
                ('0' + (m.date.getMonth() + 1)).slice(-2) +
                '-' +
                ('0' + m.date.getDate()).slice(-2)
              "
            >
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
              :class="{ timeTable: true }"
              class="static"
              ref="tar"
              @click="selectTime($event.currentTarget.textContent)"
            >
              <p>{{ m.count }}</p>
              <p>{{ m.startTime }}</p>
              <p>{{ m.seat }}</p>
            </div>
          </div>
          <div class="timeBase" v-else>
            <p class="empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
          <h3 class="show-title">{{ list.title }}</h3>
          <div class="show-info">
            <div class="info-row">
              <span>장소</span>
              <span>{{ list.hall }}</span>
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
          <button>
            <span>좌석선택</span>
            <i class="material-symbols-outlined">arrow_right_alt</i>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// import dateInfo from '@/components/divT.vue'
export default {
  // components: {
  //     dateInfo
  // },
  data() {
    ``;
    return {
      day: ["일", "월", "화", "수", "목", "금", "토"],
      currentMonth: [],
      reset: 1,
      firstTop: null,
      timeTable: [],
      gocl: false,
      selectCnt: "",
      onDate: "",
      list: {
        imgSrc:
          "https://img.dtryx.com/poster/2022/06/EBFBA151-CC1E-40AD-A108-990343803DF2.small.jpg",
        title: "헤어질 결심",
        startDate: "2022-08-01",
        endDate: "2022-09-15",
        hall: "모던홀",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        today: new Date().getDate(),
        seats: 120,
        time: [
          {
            showDate: "2022-08-20",
            showTime: "13:30",
            running: 120,
            intermission: 20,
            extraSeats: 30,
          },
          {
            showDate: "2022-08-20",
            showTime: "17:30",
            running: 120,
            intermission: 20,
            extraSeats: 0,
          },
          {
            showDate: "2022-08-21",
            showTime: "13:30",
            running: 120,
            intermission: 20,
            extraSeats: 30,
          },
          {
            showDate: "2022-08-27",
            showTime: "13:30",
            running: 120,
            intermission: 20,
            extraSeats: 0,
          },
          {
            showDate: "2022-09-13",
            showTime: "13:30",
            running: 120,
            intermission: 20,
            extraSeats: 30,
          },
        ],
      },
    };
  },
  mounted() {
    this.viewDate();
    setTimeout(() => {
      this.onReady();
    }, 100);
  },
  filters: {
    cntCheck() {},
  },
  methods: {
    lastDay() {
      // 달 말일 구하기
      return new Date(this.list.year, this.list.month, 0).getDate();
    },
    getFormat(date) {
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2)
      );
    },
    getTerm() {
      let termTo =
        new Date(
          this.list.endDate.substr(0, 4),
          parseInt(this.list.endDate.substr(5, 2)) - 1,
          this.list.endDate.substr(8, 2)
        ).getTime() -
        new Date(
          this.list.year,
          this.list.month - 1,
          this.list.today
        ).getTime();
      return termTo / 86400000; //이번달 기간+다음달 1일부터 공연 마지막
    },
    viewDate() {
      for (
        let i = this.list.today;
        i <= this.list.today + this.getTerm();
        i++
      ) {
        //오늘 날짜에서 마지막 공연날까지의 일수를 더한만큼 반복 (오늘 날짜부터 i 시작)
        this.currentMonth.push({
          day: this.day[
            new Date(this.list.year, this.list.month - 1, i).getDay()
          ], //요일 구하기
          date: new Date(this.list.year, this.list.month - 1, i), //날짜 구하기
        });
      }
    },
    onReady() {
      let btns = document.querySelectorAll(".selectDate button");
      for (let i = 0; i < this.list.time.length; i++) {
        for (let j = 0; j < btns.length; j++) {
          if (this.list.time[i].showDate == btns[j].value) {
            btns[j].className += " on_ready";
          }
        }
      }
    },
    viewTime(e) {
      this.timeTable.splice(0);
      let ie = 1;
      this.onDate = "";
      this.selectCnt = "";
      for (let i = 0; i < this.list.time.length; i++) {
        if (this.list.time[i].showDate == e.value) {
          this.onDate =
            e.value.substr(2, 2) +
            "." +
            e.value.substr(5, 2) +
            "." +
            e.value.substr(8, 2) +
            "(" +
            e.textContent.substr(0, 1) +
            ")";
          this.timeTable.push({
            count: ie++ + "회차",
            startTime: this.list.time[i].showTime,
            seat: this.list.time[i].extraSeats + "/" + this.list.seats,
          });
        }
      }
    },
    selectTime(e) {
      this.selectCnt = e.substr(0, 3) + " " + e.substr(3, 5);
    },
    getTop() {
      return document.querySelector(".firstDay").offsetTop;
    },
    getScroll(e) {
      let offTops = document.getElementsByClassName("firstDay");
      for (let i = 0; i < offTops.length; i++) {
        let a = offTops[i].offsetTop;
        if (a - 300 <= e.scrollTop) {
          this.list.month = offTops[i].value.substr(5, 2);
          if (this.list.year != offTops[i].value.substr(0, 4)) {
            this.list.year = offTops[i].value.substr(0, 4);
          }
        } else if (this.getTop() - 300 >= e.scrollTop) {
          this.list.month = new Date().getMonth() + 1;
        }
      }
    },
  },
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100vh;
  font-family: "Roboto", "Nanum Gothic", sans-serif;
  background: rgba(#000, 0.7);
  .inner {
    width: $width;
    height: 700px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
      border: 1px solid gainsboro;
      border-top: none;
      border-bottom: none;
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: calc(100% - 64px);
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
          width: 80%;
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
            font-size: 20px;
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