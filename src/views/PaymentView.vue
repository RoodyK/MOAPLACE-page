<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left" @click="resetModal">
          <i class="material-symbols-outlined">restart_alt</i>
          <span>예매 다시하기</span>
        </button>
        <h1 class="title">결제선택</h1>
        <button class="right" @click="closeModal">
          <span>창닫기</span>
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
      <main>
        <div class="article">
          <div class="con1">
            <div class="section">
              <div class="tit">
                <p>01. 적립금</p>
              </div>
              <div class="txt">
                <div class="point">
                  <div>
                    <span><input type="text" v-model="upo" /> 원</span>
                    /
                    <span class="use">{{ formatPrice(userpoint) }}원</span>
                    <button @click="use_point">사용</button>
                  </div>
                  <p>
                    {{ msg }}
                  </p>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="tit">
                <p>02. 최종 결제수단</p>
              </div>
              <div class="txt">
                <div class="pay">
                  <input
                    type="radio"
                    name="pay_method"
                    id="card"
                    value="card"
                    v-model="pay_method"
                  />
                  <label for="card">카드 결제</label>
                </div>
                <div class="pay">
                  <input
                    type="radio"
                    name="pay_method"
                    id="money"
                    value="money"
                    v-model="pay_method"
                  />
                  <label for="money">무통장 입금</label>
                </div>
              </div>
            </div>
            <div class="section2">
              <div class="box">
                <p>총 금액</p>
                <div>
                  <p>{{ formatPrice(total) }}</p>
                  <span>원</span>
                </div>
              </div>
              <div class="box">
                <p>적립금</p>
                <div>
                  <p>{{ formatPrice(upoint) }}</p>
                  <span>원</span>
                </div>
              </div>
              <div class="box">
                <p>남은 금액</p>
                <div>
                  <p>{{ formatPrice(tot) }}</p>
                  <span>원</span>
                </div>
              </div>
            </div>
          </div>
          <div class="con2">
            <div class="aside">
              <!--동일-->
              <h2 class="side-title">구매정보</h2>
              <h3 class="show-title">{{ booking.title }}</h3>
              <div class="show-info">
                <div class="info-row">
                  <span>장소</span>
                  <span>{{ booking.place }}</span>
                </div>
                <div class="info-row">
                  <span>날짜</span>
                  <span>{{ booking.schedule_date }}</span>
                </div>
                <div class="info-row">
                  <span>회차</span>
                  <span>{{ booking.time }}</span>
                </div>
                <div class="info-row">
                  <span>좌석</span>
                  <span class="seats">
                    <p v-for="(seat, index) in seats" :key="index">
                      {{ seat.grade }}석 {{ seat.row }}{{ seat.col }}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div class="btn-box">
              <button @click="goPrev()">
                <i class="material-symbols-outlined">keyboard_backspace</i>
                <span
                  ><RouterLink :to="`/moaplace.com/booking/count`"
                    >이전</RouterLink
                  ></span
                >
              </button>
              <button @click="buyticket()">
                <span>결제</span>
                <i class="material-symbols-outlined">arrow_right_alt</i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/axios.js";
import router from "@/router/index.js";

const { IMP } = window;
export default {
  data() {
    return {
      msg: "",
      userpoint: "", //멤버에서 받는 point
      upoint: 0, //사용자가 사용 할 포인트 금액(이 페이지 입력)
      upo: 0,
      username: "",
      email: "",
      member_num: "",
      tot_ticket: 0,
      all_seat: [],
      b_seat: [],
      pay_method: "",
      // tot: 0,
    };
  },
  created() {
    this.getmember();
    // this.tot = this.total;
  },

  //실시간 계산
  computed: {
    tot: function () {
      return this.total - this.upoint;
    },
    booking() {
      //예약 정보 가져오기
      let booking = {
        title: this.$store.state.booking.title,
        place: this.$store.state.booking.place,
        schedule_date: this.$store.state.booking.schedule_date,
        time: this.$store.state.booking.time,
      };
      return booking;
    },
    total() {
      return this.$store.state.booking.total;
    },
    schedule_num() {
      return this.$store.state.booking.schedule_num;
    },
    show_num() {
      return this.$store.state.booking.show_num;
    },
    seats() {
      return this.$store.state.booking.seats;
    },
    // booking_seats: function () {
    //   this.seats.forEach((e) => {
    //     return e.seats.grade + "석" + e.seats.row + e.seats.col;
    //   });
    // },
    booking_seats: function () {
      this.seats.forEach((e) => {
        this.b_seat.push(e.grade + "석 " + e.row + e.col);
      });
      return this.b_seat;
    },
    all_seats: function () {
      this.seats.forEach((e) => {
        this.all_seat.push(e.row + e.col);
      });
      return this.all_seat;
    },
    tickets() {
      return this.$store.state.booking.tickets;
    },

    tot_count: function () {
      this.tickets.forEach((e) => {
        this.tot_ticket += e.count;
      });
      // for (var i = 0; i < this.tickets.length; i++) {
      //   this.tot_count += this.tickets.count[i];
      // }
      return this.tot_ticket;
    },
    // ticket_r:function(){
    //   this.tickets.forEach((e) => {
    //     this.ticket_rating.push(e.)
    //   })
    // }
  },
  methods: {
    getmember() {
      let token = localStorage.getItem("access_token");
      if (token == null) return;

      axios
        .get("/moaplace.com/users/login/member/info")
        .then((response) => {
          let data = response.data;
          this.member_num = data.member_num;
          this.email = data.member_email;
          this.username = data.member_name;
          this.userpoint = data.member_point;
          // console.log(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    formatPrice(n) {
      return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    use_point() {
      if (this.upo >= this.total) {
        alert("적립금 사용시 결제금액을 넘을 수 없습니다.");
        this.upoint = this.total - 1000;
      } else if (this.upo > this.userpoint) {
        this.msg = "사용 할 수 있는 적립금 금액을 초과하였습니다.";
        this.upo = this.userpoint;
        this.upoint = this.upo;
      } else if (this.upo < 1000) {
        this.msg = "적립금은 최소 1,000원 이상부터 사용가능합니다.";
      } else if (this.upo % 10 != 0) {
        this.msg = "적립금은 10원 단위로 사용 가능합니다.";
        this.upo = this.upo - (this.upo % 10);
        this.upoint = this.upo;
      } else if (this.total - this.upo < 1000) {
        this.msg = "최소 결제 금액은 1000원입니다";
      } else {
        this.msg = "";
        this.upoint = this.upo;
      }
    },

    buyticket: function () {
      if (this.pay_method == "" || this.pay_method == null) {
        alert("결제 방법을 선택해주세요");
      } else {
        console.log(this.pay_method);
        let booking = {
          booking_num: 0,
          member_num: this.member_num,
          schedule_num: this.schedule_num,
          booking_count: this.tot_count,
          booking_price: this.total,
          booking_seat: this.booking_seats,
          use_point: this.upoint,
        };
        let ticket = this.tickets;
        let all_seat = this.all_seats;
        let show_num = this.show_num;
        let member_num = this.member_num;

        localStorage.setItem("booking", JSON.stringify(booking));
        localStorage.setItem("ticket", JSON.stringify(ticket));
        localStorage.setItem("all_seat", JSON.stringify(all_seat));
        localStorage.setItem("show_num", JSON.stringify(show_num));
        localStorage.setItem("member_num", JSON.stringify(member_num));

        // let env = "" + process.env.VUE_APP_IMPORT_INIT;

        IMP.init(process.env.VUE_APP_IMPORT_API_KEY);
        IMP.request_pay(
          {
            // param
            pg: "html5_inicis",
            pay_method: this.pay_method,
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "모아플레이스",
            buyer_name: this.username,
            amount: this.tot,
            buyer_email: this.email,
          },
          function (resp) {
            // callback
            console.log(resp);
            if (resp.success) {
              var payment = {
                imp_uid: resp.imp_uid,
                merchant_uid: resp.merchant_uid,
                booking_price: resp.paid_amount, //최종 결제 금액 , store에서 받아오기 > tot
                payment_method: resp.pay_method,
                payment_status: resp.status,
              };
              booking = JSON.parse(localStorage.getItem("booking"));
              ticket = JSON.parse(localStorage.getItem("ticket"));
              all_seat = JSON.parse(localStorage.getItem("all_seat"));
              show_num = JSON.parse(localStorage.getItem("show_num"));
              member_num = JSON.parse(localStorage.getItem("member_num"));

              let data = {
                booking: booking,
                ticket: ticket,
                payment: payment,
                allseat: all_seat,
                member_num: member_num,
                show_num: show_num,
              };

              axios
                .post(`/moaplace.com/booking/payment`, JSON.stringify(data), {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((resp) => {
                  if (resp.data.data === "success") {
                    // console.log(resp.data.booking_num);
                    router.push({
                      name: "paymentDone",
                      params: { booking_num: resp.data.booking_num },
                    });
                  } else {
                    alert("결제를 실패하였습니다. 다시 확인해주세요");
                    // console.log("결제실패");
                  }
                });
            } else {
              console.log("결제 실패");
            }
          }
        );
      }
    },
    goPrev() {
      if (confirm("결제가 되지 않았습니다. \n이전으로 돌아가시겠습니까?")) {
        this.$router.go(-1);
      } else return;
    },

    //모달창 종료
    closeModal() {
      let chk = window.confirm("모든 선택이 초기화되며 예매창이 종료됩니다.");
      if (chk == true) {
        // 자식창에서 부모창으로 함수 호출 ( 데이터 전달 )
        window.parent.postMessage(
          // 전달할 data (부모창에서 호출할 함수명)
          { functionName: "closeShow" },
          // 부모창의 도메인
          "http://localhost:8080/moaplace.com/"
        );
      } else {
        return;
      }
    },
    //예매다시하기(vuex 초기화)
    resetModal() {
      let chk = window.confirm(
        "모든 선택이 초기화되며 일정 선택 페이지로 이동합니다."
      );
      if (chk == true) {
        let num = this.$store.state.booking.show_num;
        this.$store.commit("booking/resetAllChoice");
        this.$router.push("/moaplace.com/booking/select/" + num);
      } else {
        return;
      }
    },
  },
  // watch: {
  //   upo: function (newVal) {
  //     if (newVal > this.userpoint) {
  //       this.msg = "사용 할 수 있는 적립금 금액을 초과하였습니다.";
  //       this.upo = this.userpoint;
  //       this.upoint = this.upo;
  //     } else if (newVal < 1000) {
  //       this.msg = "적립금은 최소 1,000원 이상부터 사용가능합니다.";
  //     } else if (newVal > 1000) {
  //       this.msg = "";
  //       this.upo = newVal;
  //       this.upoint = this.upo;
  //     } else if (newVal % 10 != 0) {
  //       this.upo = newVal - (newVal % 10);
  //       this.upoint = this.upo;
  //       this.msg = "적립금은 10원 단위로 사용 가능합니다.";
  //     }
  //     // this.tot = this.total - this.upoint;
  //   },
  // },
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
    width: 1000px;
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
      width: 100%;
      height: calc(100% - 70px);
      .article {
        width: 100%;
        display: flex;
        // flex-flow: row nowrap; 기본값
        height: 100%;
        .con1 {
          width: 80%;
          padding: 32px 24px 0 24px;
          .section {
            margin-bottom: 40px;
            line-height: 30px;
            & > div {
              margin-bottom: 10px;
            }
            .tit {
              font-size: 24px;
              margin-bottom: 16px;
              padding: 0 0 16px 0;
              border-bottom: 2px solid $black;
              font-weight: 700;
            }
            .txt {
              .point {
                margin-left: 16px;
                margin-top: 18px;
                span {
                  padding: 4px 4px;
                  letter-spacing: 2px;
                  word-spacing: 4px;
                  font-size: 20px;
                  vertical-align: middle;
                  & > input {
                    padding: 0 8px;
                    width: 200px;
                  }
                }
                .use {
                  color: $brown;
                  font-size: 24px;
                  font-weight: 600;
                }

                button {
                  margin-left: 24px;
                  padding: 4px 24px;
                  border: none;
                  color: #fff;
                  background-color: $brown;
                }

                p {
                  margin-top: 12px;
                  color: $brown;
                }
              }
              .pay {
                border-bottom: 1px solid rgba(#000, 0.3);
                font-size: 18px;
                padding: 0 8px 16px 16px;
                margin-bottom: 16px;

                input[type="radio"] {
                  display: none;
                }
                label {
                  cursor: pointer;
                }
                input[type="radio"]:checked + label {
                  color: $brown;
                  font-weight: bold;
                }
              }
            }
          }
          .section2 {
            left: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            display: flex;
            background: rgba($black, 0.1);
            width: 80%;

            .box {
              width: 33%;
              position: relative;
              margin-left: 12px;
              font-weight: 700;
              &:first-child,
              &:nth-child(2) {
                &::before {
                  content: "";
                  width: 1px;
                  height: 45%;
                  background-color: rgba($black, 0.5);
                  position: absolute;
                  transform: translate(-50%);
                  top: 30%;
                  right: 0;
                  display: block;
                  margin: 0 auto;
                }
              }
              &:last-child {
                & > div {
                  color: $brown;
                }
              }
              & > p {
                padding: 32px 32px 0 24px;
              }
              & > div {
                display: flex;
                padding: 0 32px 16px 24px;
                p {
                  font-size: 32px;
                }
                span {
                  padding: 16px 8px;
                }
              }
            }
          }
        }
        .con2 {
          height: 100%; //부모 height : 100% 써줘야함
          width: 20%;
          border-left: 1px solid rgba($black, 0.3);
          padding: 32px 16px 0 16px;
          text-align: center;
          .side-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 24px;
          }
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
              > :first-child {
                margin-right: 8px;
              }
              &:last-child {
                background: $brown;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>