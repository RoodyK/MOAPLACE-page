<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left">
          <i class="material-symbols-outlined">restart_alt</i>
          <!-- <span>예매 다시하기</span> -->
          <RouterLink :to="`/moaplace.com/booking/done/${info.show_num}`">예매 다시하기</RouterLink>
        </button>
        <h1 class="title">예매완료</h1>
        <button type="button" class="right" @click="closeModal()">
          <span>창닫기</span>
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
        <main>
          <div class="complete">
            <span>예매가 완료되었습니다.</span>
          </div>
          <div class="booking_number">
            <div class="left">
              <span>예매번호</span>
            </div>
            <div class="right">
              <span>{{today}}-{{info.booking_num}}</span>
            </div>
          </div>
          <div class="content">
            <div class="left">
              <span class="purchase">구매 정보</span>
              <div class="info_box">
                <div class="poste">
                  <img :src="thumb">
                </div>
                <div class="info">
                  <h5>{{info.show_name}}</h5>
                  <div>
                    <span class="info_title">장소</span>
                    <span>{{info.hall_name}}</span>
                  </div>
                  <div>
                    <span class="info_title">날짜</span>
                    <span>{{show_date}}</span>
                  </div>
                  <div>
                    <span class="info_title">회차</span>
                    <span>{{rounds}}회차 {{info.schedule_time}}</span>
                  </div>
                  <div class="test">
                    <div>
                      <span class="info_title">좌석</span>
                    </div>
                    <div>
                      <p v-for="(seat, index) in seats" :key="index">
                        {{seat}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <span class="purchase">결제금액</span>
              <div class="purchase_info">
                <h4>{{total}}원</h4>
                <span>결제 수단 : 금액({{cash}}) + 적립금({{point}})</span>
              </div>
              <div class="caution">
                <span>[예매시 주의사항]</span>
                <p>공연 관람 1일전 오후 5시까지 (공연 당일 취소 및 변경 불가)</p><br>
                <p>티켓환불은 해당 공연일을 기준으로 10일 전까지는 별도의 수수료없이 전액 환급되며, 해당 공연일 9일 전부터 하루 전 17시 까지는 환불할 티켓 금액의 10%를 수수료로 공제 후 환불이 가능합니다.</p><br>
                <p>공연 당일은 환불이 되지 않습니다.</p><br>
                <p>예매당일 취소 시 공연일로부터 3일전까지는 취소수수료 없음, 공연일 3일 이내 취소시 10%취소수수료가 부과 됩니다.</p>
              </div>
            </div>
          </div>
          <div class="mybtn">
            <button class="left" @click="print">
              예매출력
            </button>
            <button class="right" @click="cancle">
              예매취소
            </button>
          </div>
        </main>
    </div>
  </div>
</template>

<script>
import axios from '@/axios/axios.js'

export default {
  data(){
    return{
      member : {},
      booking_num:0,
      info:[],
      show_date:'',
      total:0,
      cash:0,
      point:0,
      thumb:'',
      rounds:'',
      today:`${new Date().getFullYear()}${new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1}${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,

      seats:[]
    }
  },
  created(){
    // 회원정보조회
    let token = localStorage.getItem("access_token");
    if(token == null) return;

    const config = {
      headers: {
        "Authorization" : token
      }
    }

    axios.get("/moaplace.com/users/login/member/info", config)
    .then(response => {
      let data = response.data;
      const info = {
        num: data.member_num,
        id: data.member_id,
        pwd: data.member_pwd,
        email: data.member_email,
        name: data.member_name,
        gender: data.member_gender,
        phone: data.member_gender,
        address: data.member_address,
        point: data.member_point
      }

      this.member = info;
      })
    .catch(error => {
      console.log(error.message);
    })

    this.data();
  },
  methods:{
    data(){
      this.booking_num = this.$route.params.booking_num;

      axios.get(`/moaplace.com/booking/done/${this.booking_num}`)
        .then((resp) => {
          this.info = resp.data;

          this.total = this.numberWithCommas(resp.data.booking_price);
          this.cash = this.numberWithCommas(resp.data.booking_price - resp.data.use_point);
          this.point = this.numberWithCommas(resp.data.use_point);

          let date = resp.data.schedule_date;
          this.show_date = `${new Date(date).getFullYear()}.
            ${new Date(date).getMonth()+1 < 10 ? `0${new Date(date).getMonth()+1}` : new Date(date).getMonth()+1}
            .${new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()}`;

          let schedule_date = `${new Date(date).getFullYear()}-${new Date(date).getMonth()+1 < 10 ? `0${new Date(date).getMonth()+1}` : new Date(date).getMonth()+1}-${new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()}`;

          axios.get(`/moaplace.com/booking/done/${resp.data.show_num}/${schedule_date}/${resp.data.schedule_time}`)
            .then((resp) => {
              this.rounds = resp.data.Rounds;
              this.thumb = resp.data.returnThumb;
            }
          )
          
          this.seats = resp.data.booking_seat.split(",");
        }
      )
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    print() {
      window.print();
    },
    cancle() {
      this.$router.push("/moaplace.com/users/mypage");
    },
    //모달창 종료
    closeModal(){
    // 자식창에서 부모창으로 함수 호출 ( 데이터 전달 )
      window.parent.postMessage(
      // 전달할 data (부모창에서 호출할 함수명)
      { functionName : 'closeShow' }
      // 부모창의 도메인
      , 'http://localhost:8080/moaplace.com/'
      );				
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/common.scss';
    *{
      margin: 0; 
      padding: 0; 
      text-decoration: none;
    }
    a{
      color: $black;
      &:hover{
        color: $black;
      }
    }
    #wrap{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999;
      width: 100%;
      height: 100vh;
      font-family: 'Roboto', 'Nanum Gothic', sans-serif;
      background: rgba(#000, 0.7);
      .inner{
        width: 1000px;
        height: 700px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        header{
          width: 100%;
          height: 64px;
          background: $black;
          color: #fff;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          &> button{
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            font-size: 14px;
            background: none;
            border: none;
            color: rgba(#fff, 0.9);
             &> :first-child{
              margin-right: 8px;
            }
            &.left{
              visibility: hidden;
            }
          }
          h1.title{
            font-size: 22px;
          }
          .left{
            a{
              color: rgba(#fff, 0.9);
            }
          }
        }
        main{
          display: flex;
          flex-flow: row nowrap;
          height: calc(100% - 64px);
          flex-direction: column;
          .complete{
            padding: 0px 24px;
            width: 100%;
            height: 80px;
            text-align: center;
            line-height: 80px;
            span{
              color: $black;
              font-size: 22px;
              font-weight: bold;
            }
          }
          .booking_number{
            padding: 0px 24px;
            width: 100%;
            height: 64px;
            display: flex;
            line-height: 64px;
            font-weight: bold;
            .left{
              width: 15%;
              padding-left: 24px;
              border-top: 2px solid rgb(51, 51, 51, 0.3);
              border-bottom: 1px solid rgb(51, 51, 51, 0.3);
              &::after{
                content: "|";
                float: right;
                width: 26px;
                color: rgb(51, 51, 51, 0.3);
              }
            }
            .right{
              width: 85%;
              padding-left: 24px;
              border-top: 2px solid rgb(51, 51, 51, 0.3);
              border-bottom: 1px solid rgb(51, 51, 51, 0.3);
              color: $brown;
            }
          }
          .content{
            padding: 0px 24px;
            width: 100%;
            height: calc(100% - (80px + 64px * 2));
            display: flex;
            .left{
              width: 50%;
              border-right: 1px solid rgb(51, 51, 51, 0.3);
              padding: 16px 24px;
              display: flex;
              flex-direction: column;
              .purchase{
                width: 100%;
                height: 64px;
                line-height: 64px;
                font-weight: bold;
              }
              .info_box{
                width: 100%;
                height: 240px;
                display: flex; 
                .poste{
                  width: 40%;
                  height: 100%;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
                .info{
                  width: 60%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  margin-left: 16px;
                  h5{
                    font-weight: bold;
                  }
                  div{
                    font-size: 14px;
                    margin-top: 16px;
                    .info_title{
                      font-weight: bold;
                      margin-right: 16px;
                    }
                  }
                  .test{
                    display: flex;
                    div{
                      margin-top: 0px;
                      p{
                        margin-bottom: 3px;
                      }
                    }
                  }
                }
              }
            }
            .right{
              width: 50%;
              padding: 16px 24px;
              display: flex;
              flex-direction: column;
              .purchase{
                width: 100%;
                height: 64px;
                line-height: 64px;
                font-weight: bold;
              }
              .purchase_info{
                h4{
                  font-weight: bold;
                }
                span{
                  color: $black;
                  font-size: 14px;
                }
              }
              .caution{
                margin-top: 16px;
                span{
                  font-weight: bold;
                  color: $brown;
                }
                p{
                  font-size: 14px;
                  color: rgb(51, 51, 51, 0.5);;
                }
              }
            }
          }
          .mybtn{
            width: 100%;
            height: 64px;
            button{
              width: 50%;
              height: 100%;
              border: 2px solid rgba(51, 51, 51, 0.3);
              color: $black;
            }
            .left{
                background-color: #fff;
            }
            .right{
                background-color: $brown;
                color: #fff;
            }
          }
        }
      }
    }
</style>