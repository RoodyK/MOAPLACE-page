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
                    <span class="use">{{ point }}원</span>
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
                  <label for="card" @click="a">카드 결제</label>
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
                  <p>{{ uupoint }}</p>
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
                <span>이전</span>
              </button>
              <button>
                <span>결제</span
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
export default {
  data() {
    return {
      point: 5000,
      price: 250000,
      upoint: 5000,
      title: "웃다가 우는 남자",
      place: "오케스트라홀",
      date: "22.08.16(화)",
      time: "1회차 14:30",
      seats: [{ grade: "R", row: "A", cols: "01" }],
      rows: 11, //열번호
      cols: 10, //행번호
      msg: "",
    };
  },
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
    use_point() {
      this.upoint = this.point;
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