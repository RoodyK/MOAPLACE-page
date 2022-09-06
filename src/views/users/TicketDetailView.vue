<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="예매내역" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">예매내역</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col end" colspan="2">{{ dto.show_name }}</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">예매번호</th>
                  <td class="desctd">{{ booking_num }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">예매일</th>
                  <td class="desctd">{{ dto.regdate }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연일</th>
                  <td class="desctd">{{ dto.schedule_date }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">시간</th>
                  <td class="desctd">{{ dto.schedule_time }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">좌석</th>
                  <td class="desctd">{{ dto.booking_seat }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장</th>
                  <td class="desctd">{{ dto.hall_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">결제내역</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">결제일</th>
                  <td class="desctd">{{ dto.payment_date }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">예매가격</th>
                  <td class="desctd">{{ dto.booking_price }}원</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">사용적립금</th>
                  <td class="desctd">{{ dto.use_point }}원</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">최종 결제금액</th>
                  <td class="desctd">{{ totalPrice }}원</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">결제수단</th>
                  <td class="desctd">{{ dto.payment_method }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">결제상태</th>
                  <td class="desctd">{{ dto.payment_status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center btnmargin">
          <RouterLink :to="`/moaplace.com/users/mypage/ticket/cancle/${ booking_num }`" v-show="cancle">
            <button type="button" class="btn btn-outline-secondary fw-bold mybtn">예매취소</button>
          </RouterLink>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn notcancle" v-show="!cancle" disabled>예매취소</button>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn2" @click="$router.push({ name : 'myticketlist' })">목록으로</button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter/>
</div>
</template>

<script>
import axios from '@/axios/axios.js'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import MySideMenu from '@/components/users/MySideMenu.vue'

export default {
  name: 'MyTicketDetailView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return{

      member : {}, // 회원정보
      booking_num : 0, // 예매번호
      dto : {}, // 예매내역 상세정보
      cancle : false, // 예매취소 가능여부
      totalPrice : 0, // 총결제금액=예매가격-적립금

    }
  },
  created(){

    this.booking_num = this.$route.params.booking_num;

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
        phone: data.member_phone,
        address: data.member_address,
        point: data.member_point
      }
      // console.log(info);

      this.member = info;
      // console.log("회원 정보 : ",this.member);

      // 적립금 천단위 콤마형식으로 변환
      var point = this.member.point;
      this.member.point = point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      this.getData();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  methods:{

    async getData() {
      try {
        await axios.get('/moaplace.com/users/mypage/ticket/detail/'
          + this.booking_num
        ).then(function(resp){

          if(resp.status == 200) {

            // this.dto = resp.data.dto;
            // this.cancle = resp.data.cancle;

            // console.log("resp.data.dto : " , resp.data.dto);
            // console.log("this.member.num : ", this.member.num);
            // console.log("resp.data.dto.member_num : ", resp.data.dto.member_num);

            if(resp.data.dto.member_num == this.member.num) {
              
              // resp.data.dto.member_num와 this.member.num이 같음
              this.dto = resp.data.dto;
              this.cancle = resp.data.cancle;

            } else {
              alert("비정상적인 접근입니다.");
              this.$router.push('/moaplace.com/');
              return;
            }

            if(this.dto.payment_status == '결제취소') {
              this.cancle = false;
            }

            var regdate = new Date(this.dto.regdate);
            this.dto.regdate = regdate.getFullYear() + "-" + ("0" + (regdate.getMonth() + 1)).slice(-2) + "-" + ("0" + regdate.getDate()).slice(-2);

            var schedule_date = new Date(this.dto.schedule_date);
            this.dto.schedule_date = schedule_date.getFullYear() + "-" + ("0" + (schedule_date.getMonth() + 1)).slice(-2) + "-" + ("0" + schedule_date.getDate()).slice(-2);

            var payment_date = new Date(this.dto.payment_date);
            this.dto.payment_date = payment_date.getFullYear() + "-" + ("0" + (payment_date.getMonth() + 1)).slice(-2) + "-" + ("0" + payment_date.getDate()).slice(-2);

            var price = this.dto.booking_price;
            this.dto.booking_price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

            var use_point = this.dto.use_point;
            this.dto.use_point = use_point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

            this.totalPrice = (price - use_point).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

          } else {
            alert('ticket detail 에러');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

#wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(249, 249, 249);
  a {
    color: $black;
    text-decoration:none;
  }
  .fs-7 {
    font-size: 0.8em;
  }
  .black {
    color: $black;
  }
  .brown {
    color: $brown;
  }
  #box {
    display: flex;
    justify-content: center;
    width: $width;
    margin: 50px;
    .right {
      width: 100%;
      height: 100%;
      background-color: white;
      border: 2px solid #dbe2e8;
      padding: 30px;
      .btnmargin {
        margin-top: 30px;
      }
      .mybtn {
        color: $brown;
        border-color: $brown;
        background-color: white;
        padding: 5px 50px;
        border-radius: 0%;
        &:hover {
          color: white;
          background: $brown;
        }
        &.notcancle {
          color: #ccc;
          border-color: #ccc;
        }
      }
      .mybtn2 {
        color: white;
        border-color: $brown;
        background-color: $brown;
        padding: 5px 50px;
        margin-left: 20px;
        border-radius: 0%;
        &:hover {
          color: $brown;
          background: white;
          border-color: $brown;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .datenav {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 70px;
        margin: 30px 0px;
        .mydate {
          padding: 5px;
        }
        .datebtn {
          padding: 5px 20px;
          border: 1px solid gray;
          background-color: white;
        }
        .select {
          background-color: $brown;
          a {
            color: white;
          }
        }
        .resultbtn {
          margin-left: 10px;
          font-size: 1em;
        }
      }
      .table {
        th.col {
          background-color: $brown;
          color: white;
        }
        tbody {
          td:hover {
            background-color: rgb(249, 249, 249);
          }
        }
        td {
          background-color: white;
          .info {
            display: flex;
            margin: 20px 20px;
            .img1 {
              background-color: gray;
              width: 110px;
              height: 150px;
              margin-right: 20px;
            }
            .img2 {
              background-color: gray;
              width: 55px;
              height: 75px;
              margin-right: 20px;
            }
            .txt {
              p {
                margin: 0px;
              }
              table td,th {
                border: 0px;
                background-color: transparent;
              }
            }
          }
        }
      }
      .myborder {
        th{
          border-right: 1px solid #eee;
        }
        td{
          border-right: 1px solid #dbe2e8;
          border-bottom: 1px solid #dbe2e8;
        }
        .descth {
          border: 1px solid #dbe2e8;
          background-color: rgb(249, 249, 249);
        }
        .desctd {
          border: 1px solid #dbe2e8;
        }
        .end{
          border-right: 0px;
        }
      }
      .ticket-table {
        vertical-align : middle;
      }
      .datenav {
        background-color: rgb(249, 249, 249);
      }
    }
  }
  #mypaging {
    display: flex;
    justify-content: center;
    .select {
      font-weight: bold;
    }
    li {
      a,span,a:hover,span:hover,a:focus,span:focus,a:active {
        background: transparent;
        border: none;
        box-shadow: none;
      }
      a:hover {
        color: $brown;
        opacity: 50%;
      }
    }
  }
}
</style>