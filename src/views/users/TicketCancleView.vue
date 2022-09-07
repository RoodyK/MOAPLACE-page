<template>
<div>
  <AppHeader/>
  <SideVisual menu="MOA PLACE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="예매내역" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <table class="table table-borderless">
            <thead>
              <tr class="text-center">
                <th class="col col-md-1">예매번호</th>
                <th class="col col-md-2">공연정보</th>
                <th class="col col-md-1">결제금액</th>
              </tr>
            </thead>
            <tbody class="fs-7">
              <tr>
                <td>
                  <div class="text-center">
                    <span>{{ booking_num }}</span>
                    <br>
                    <span class="brown">({{ dto.regdate }})</span>
                  </div>
                </td>
                <td>
                  <a href="">
                    <div class="info">
                      <div class="txt">
                        <p class="fs-5 fw-bold">{{ dto.show_name }}</p>
                        <table class="subtable">
                          <tr>
                            <th>장소</th>
                            <td>{{ dto.hall_name }}</td>
                          </tr>
                          <tr>
                            <th>날짜</th>
                            <td>{{ dto.schedule_date }}</td>
                          </tr>
                          <tr>
                            <th>시간</th>
                            <td>{{ dto.schedule_time }}</td>
                          </tr>
                          <tr>
                            <th>좌석</th>
                            <td>{{ dto.booking_seat }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </a>
                </td>
                <td class="text-center">{{ dto.booking_price }}원</td>
              </tr>
            </tbody>
          </table>
          <div class="totprice">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>총 환불 금액</th>
                  <td>{{ dto.booking_price }}원</td>
                </tr>
              </tbody>
              
            </table>
          </div>
          <div class="title text-center">
            <p class="fw-bold brown fs-4">예매를 취소하시겠습니까?</p>
            <p>취소 시점이 상영날짜 3일 전까지일 경우에만 환불이 가능하며, 관리자 확인 후 환불이 진행됩니다.<br>
            동의하신다면 비밀번호 입력 후 예매취소 버튼을 클릭해 주세요.
            </p>
          </div>
          <div class="mytxtform">
            <span>예매취소 사유 :</span><input type="text" class="form-control" v-model="reason" placeholder="ex) 단순변심, 결제수단 변경 등">
          </div>
          <div class="mytxtform">
            <span>비밀번호 입력 :</span><input type="password" class="form-control" v-model="pwd">
          </div>
          <div class="text-center btnmargin">
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn" @click.prevent="revert()">이전</button>
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn2" @click.prevent="cancleOk()">예매취소</button>
          </div>
          <div class="desc">
            <p class="desctitle brown fw-bold">결제수단별 환불 방법</p>
            <ul class="desclist">
              <li>
                <div class="descleft brown">신용카드 결제</div>
                <div class="descright">
                  <ul>
                    <li>일반적으로 당사의 취소 처리가 완료되고 4~5일 후 카드사의 취소가 확인됩니다.</li>
                    <li>취소시점과 카드사에 따라 환급방법과 환급일은 다소 차이가 있을 수 있습니다.</li>
                    <li>취소 시 예매된 결제내역은 취소처리되며, 취소 시점에 따라 취소수수료가 재승인될 수 있습니다.</li>
                  </ul>
                </div>
              </li>
              <hr>
              <li class="end">
                <div class="descleft brown">무통장입금 결제</div>
                <div class="descright">
                  <ul>
                    <li>환불은 접수 완료 후 5~7일 이내에 처리됩니다.</li>
                    <li>1:1 문의 게시판에 환불받을 계좌번호를 남기시면 그 계좌를 통해 취소 수수료를 제외한 금액이 환불됩니다.</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
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
  name: 'MyTicketCancleView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return{

      member : {},
      booking_num : 0,
      dto : {},
      pwd : '',
      amount: 0, // 취소요청금액
      reason : '', // 취소사유

      // 인증된 접근인지 체크
      userAuth : false,

    }
  },
  created(){

    // this.member = this.$store.state.mypage.member;

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

      this.booking_num = this.$route.params.booking_num;

      try {
        await axios.get('/moaplace.com/users/mypage/ticket/cancle/'
          + this.booking_num
        ).then(function(resp){

          if(resp.status == 200) {

            // 1. 예매번호 넘기고 회원번호 받아와서 로그인한 회원의 예매정보인지 체크
            // 2. 예매취소 가능한 상태인지 체크
            var member_num = resp.data.member_num;

            if(member_num == this.member.num) {
              // console.log("받아온 회원번호 : " + member_num);
              this.userAuth = true;

              if(resp.data.cancle == true) {
                this.dto = resp.data.dto;

                var regdate = new Date(this.dto.regdate);
                this.dto.regdate = regdate.getFullYear() + "-" + ("0" + (regdate.getMonth() + 1)).slice(-2) + "-" + ("0" + regdate.getDate()).slice(-2);

                var schedule_date = new Date(this.dto.schedule_date);
                this.dto.schedule_date = schedule_date.getFullYear() + "-" + ("0" + (schedule_date.getMonth() + 1)).slice(-2) + "-" + ("0" + schedule_date.getDate()).slice(-2);

                let n = resp.data.dto.booking_price - resp.data.dto.use_point;
                this.amount = n;
                this.dto.booking_price = n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
   
              } else {
                alert('잘못된 접근입니다. (취소 불가능한 예매내역에 접근)');
                this.$router.push('/moaplace.com/');
              }

            } else {
              alert('잘못된 접근입니다. (다른 회원의 예매내역에 접근)');
              this.$router.push('/moaplace.com/');
            }

          } else {
            alert('ticket cancle 에러');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    },

    // 비밀번호 체크 + 맞으면 예매취소 실행하는 메소드
    cancleOk() {
      // console.log("입력한 패스워드 : ", this.pwd);
      // console.log(this.$store.state.mypage.member.pwd);

      const cancleData = {
        booking_num : this.booking_num,
        member_id : this.member.id,
        member_pwd : this.pwd,
        reason : this.reason,
        amount : this.amount,
        imp_uid : this.dto.imp_uid
      }

      axios.post('/moaplace.com/users/mypage/ticket/cancle', JSON.stringify(cancleData), {
        headers: {
          "Content-Type": `application/json`,
        }
      }).then((resp) => {

        if(resp.data == "success") {

          alert('예매취소가 완료되었습니다.');
          this.$router.push('/moaplace.com/users/mypage/ticket/list');

        } else if(resp.data == "failA") {
          alert('비밀번호는 일치하지만 업데이트가 정상적으로 되지 않았습니다.');
        } else if(resp.data == "failB") {
          alert('비밀번호가 일치하지 않습니다.');
        }
      });

    },

    // 이전 = 상세내역 페이지로 이동
    revert() {
      this.$router.push("/moaplace.com/users/mypage/ticket/detail/"+this.booking_num);
    },

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
  td {
    vertical-align: middle;
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
      border: 1px solid #dbe2e8;
      padding: 30px;
      .totprice {
        display: flex;
        justify-content: center;
        > p {
          margin: 0;
        }
        th {
          background-color: $brown;
          color: #fff;
          width: 194px;
          text-align: center;
        }
        td {
          border: 1px solid #dbe2e8;
          padding-left: 20px;
        }
      }
      .table {
        margin: 0 auto;
        margin-top: 30px;
        width: 700px;
        > thead > tr > th {
          background-color: $brown;
          color: #ffffff;
          border: 1px solid $brown;
          border-right: 1px solid #eee;
        }
        > tbody > tr > th {
          border: 1px solid $brown;
        }
        > tbody > tr > td {
          border: 1px solid #dbe2e8;
        }
        .info {
          display: flex;
          align-items: center;
          margin: 20px 20px;
          .img {
            background-color: gray;
            width: 110px;
            height: 150px;
            margin-right: 20px;
          }
          .txt {
            p {
              margin-bottom: 10px;
            }
            .subtable{
              th {
                font-weight: bold;
              }
              td {
                padding-left: 5px;
              }
            } 
          }
        }
      }
      .mytxtform {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        margin: 0 auto;
        margin-bottom: 30px;
        > input {
          width: 250px;
          border-radius: 0%;
        }
        > span {
          // width: ;
          margin-right: 10px;
        }
      }
      .mybtn {
        width: 165px;
        color: $brown;
        border-color: $brown;
        background-color: white;
        padding: 5px 50px;
        border-radius: 0%;
        &:hover {
          color: white;
          background: $brown;
        }
      }
      .mybtn2 {
        width: 165px;
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
        margin-top: 30px;
      }
      .desc {
        margin-top: 80px;
        opacity: 100%;
        font-size: 0.9em;
        .desctitle {
          margin-bottom: 10px;
        }
        .desclist {
          border: 5px solid #eee;
          padding: 0;
          > hr {
            color: #eee;
            opacity: 100%;
          }
          > li {
            display: flex;
            flex-direction: row;
            margin: 25px 10px;
            .descleft {
              // background-color: red;
              width: 170px;
              font-weight: bold;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              padding-right: 20px;
              // margin-right: 10px;
            }
            .descright {
              width: 100%;
              color: $brown;
              > ul {
                padding: 0;
                list-style-type: disc;
                padding-left: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>