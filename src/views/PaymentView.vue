<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left">
          <i class="material-symbols-outlined">restart_alt</i>
          <span>예매 다시하기</span>
        </button>
        <h1 class="title">결제선택</h1>
        <button class="right">
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
                    <span><input type="text" v-model="upoint" /> 원</span> /
                    <span class="use">{{ userpoint }}원</span>
                    <button @click="use_point">전액사용</button>
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
                  <input type="radio" name="pay_method" id="card" />
                  <label for="card" @click="buyticket()">카드 결제</label>
                </div>
                <div class="pay">
                  <input type="radio" name="pay_method" id="money" />
                  <label for="money">무통장 입금</label>
                </div>
              </div>
            </div>
            <div class="section2">
              <div class="box">
                <p>총 금액</p>
                <div>
                  <p>{{ price }}</p>
                  <span>원</span>
                </div>
              </div>
              <div class="box">
                <p>적립금</p>
                <div>
                  <p>{{ point }}</p>
                  <span>원</span>
                </div>
              </div>
              <div class="box">
                <p>남은 금액</p>
                <div>
                  <p>{{ tot }}</p>
                  <span>원</span>
                </div>
              </div>
            </div>
          </div>
          <div class="con2">
            <div class="aside">
              <!--동일-->
              <h2 class="side-title">구매정보</h2>
              <h3 class="show-title">{{ title }}</h3>
              <div class="show-info">
                <div class="info-row">
                  <span>장소</span>
                  <span>{{ place }}</span>
                </div>
                <div class="info-row">
                  <span>날짜</span>
                  <span>{{ date }}</span>
                </div>
                <div class="info-row">
                  <span>회차</span>
                  <span>{{ time }}</span>
                </div>
                <div class="info-row">
                  <span>좌석</span>
                  <span class="seats">
                    <p v-for="(seat, index) in seats" :key="index">
                      {{ seat.grade }}석 {{ seat.row }}{{ seat.cols }}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div class="btn-box">
              <button>
                <i class="material-symbols-outlined">keyboard_backspace</i>
                <span
                  ><RouterLink :to="`/moaplace.com/booking/count`"
                    >이전</RouterLink
                  ></span
                >
              </button>
              <button>
                <span
                  ><RouterLink :to="`/moaplace.com/booking/done`"
                    >결제</RouterLink
                  ></span
                ><i class="material-symbols-outlined">arrow_right_alt</i>
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
const { IMP } = window;
export default {
  data() {
    return {
      msg: "",
      userpoint: "", //멤버에서 받는 point

      upoint: "", //사용자가 사용 할 포인트 금액(이 페이지 입력)
      username: "",
      email: "",
      member_num: "",

      title: "웃다가 우는 남자",
      place: "오케스트라홀",
      date: "22.08.16(화)",
      time: "1회차 14:30",
      seats: [{ grade: "R", row: "A", cols: "01" }],
      rows: 11, //열번호
      cols: 10, //행번호
    };
  },
  created() {
    this.getmember();
  },

  //실시간 계산
  computed: {
    uupoint: function () {
      if (this.upoint >= this.point) {
        return this.point;
      } else {
        return this.upoint;
      }
    },
    tot: function () {
      return this.price - this.uupoint;
    },
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
          console.log(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    use_point() {
      this.upoint = this.point;
    },

    buyticket: function () {
      IMP.init("imp49001285");
      IMP.request_pay(
        {
          // param
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "merchant_" + new Date().getTime(),
          name: "모아플레이스",
          buyer_name: this.username,
          amount: "10000",
          buyer_email: this.email,
        },
        function (resp) {
          // callback
          console.log(resp);
          if (resp.success) {
            console.log("pay_method", resp.pay_method);
            console.log("merchant_uid", resp.merchant_uid);
            console.log("paid_amount", resp.paid_amount);
            console.log("apply_num", resp.apply_num);
            console.log("결제 성공"); //확인
            var result = {
              member_num: this.member_num,
              pay_method: resp.pay_method,
              merchant_uid: resp.merchant_uid,
              paid_amount: resp.paid_amount, //최종 결제 금액 , store에서 받아오기 > tot
              apply_num: resp.apply_num, //카드 승인 번호
            };
            axios
              .post("/moaplace.com/booking/payment", JSON.stringify(result))
              .then(
                function (resp) {
                  if (resp.data === "success") {
                    alert("결제가 완료되었습니다. ");
                    //페이지 이동  this.$router.push({ name: "adminNewsList" });
                    console.log("결제성공");
                  } else {
                    alert("결제를 실패하였습니다. 다시 확인해주세요");
                    console.log("결제실패");
                  }
                }.bind(this)
              );
          } else {
            console.log("결제 실패");
          }
        }
      );
    },
  },
  watch: {
    upoint: function (newVal) {
      if (newVal >= this.point) {
        this.msg = "사용 할 수 있는 적립금 금액을 초과하였습니다.";
      } else if (newVal < 1000) {
        this.msg = "적립금은 최소 1,000원 이상부터 사용가능합니다.";
      } else if (newVal % 10 != 0) {
        this.msg =
          "적립금은 최소 1,000원 이상 보유 시 10원 단위로 사용 가능합니다.";
      } else {
        this.msg = "";
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
                  color: red;
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