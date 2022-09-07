<template>
  <div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="마이페이지" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">최근 예매내역</span>
            <button class="btn btn-outline-secondary fw-bold mybtn" @click="$router.push({ name : 'myticketlist' })">더보기+</button>
          </div>
          <div v-show="bkExist">
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-2">예매번호</th>
                  <th class="col col-md-2">공연정보</th>
                  <th class="col col-md-2">결제금액</th>
                  <th class="col col-md-2">결제상태</th>
                  <th class="col col-md-2 end">상세보기</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td>
                    <div class="text-center">
                      <span>{{ bkDto.booking_num }}</span>
                      <br>
                      <span class="brown">({{ bkDto.regdate }})</span>
                    </div>
                  </td>
                  <td>
                    <RouterLink :to="`/moaplace.com/show/showdetail/${ bkDto.show_num }`">
                      <div class="info">
                        <img :src="bkDto.show_thumbnail" class="img1">
                        <div class="txt">
                          <p class="fs-5 fw-bold">{{ bkDto.show_name }}</p>
                          <table class="subtable">
                            <tr>
                              <th>장소</th>
                              <td>{{ bkDto.hall_name }}</td>
                            </tr>
                            <tr>
                              <th>날짜</th>
                              <td>{{ bkDto.schedule_date }}</td>
                            </tr>
                            <tr>
                              <th>시간</th>
                              <td>{{ bkDto.schedule_time }}</td>
                            </tr>
                            <tr>
                              <th>좌석</th>
                              <td>{{ bkDto.booking_seat }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </RouterLink>
                  </td>
                  <td class="text-center">{{ bkDto.booking_price }}원</td>
                  <td class="text-center">{{ bkDto.payment_status }}</td>
                  <td class="text-center end">
                    <RouterLink :to="`/moaplace.com/users/mypage/ticket/detail/${ bkDto.booking_num }`">
                      <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-show="!bkExist" class="borderbox">
            <span class="brown">최근 예매내역이 존재하지 않습니다.</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">최근 대관신청내역</span>
            <button class="btn btn-outline-secondary fw-bold mybtn" @click="$router.push({ name : 'myrentallist' })">더보기+</button>
          </div>
          <div v-if="rtExist">
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">신청일자</th>
                  <th class="col col-md-2">공연장</th>
                  <th class="col col-md-1">진행상태</th>
                  <th class="col col-md-1 end">상세보기</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td>
                    <div class="text-center">
                      <span>{{ rtDto.regdate }}</span>
                    </div>
                  </td>
                  <td>
                    <RouterLink :to="`/moaplace.com/users/mypage/rental/detail/${ rtDto.rental_num }`">
                      <div class="info">
                        <div class="txt">
                          <p class="fs-5 fw-bold">{{ rtDto.hall_name }}</p>
                          <p>{{ rtDto.rental_date }} / {{ rtDto.rental_time }}</p>
                        </div>
                      </div>
                    </RouterLink>
                  </td>
                  <td class="text-center">{{ rtDto.rental_state }}</td>
                  <td class="text-center end">
                    <RouterLink :to="`/moaplace.com/users/mypage/rental/detail/${ rtDto.rental_num }`">
                      <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="borderbox">
            <span class="brown">최근 대관신청내역이 존재하지 않습니다.</span>
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
  name: 'MypageView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return {

      member : {}, // 회원정보
      bkExist : false, // 예매내역 존재여부
      bkDto : {}, // 최근 예매내역 1건
      
      rtExist : false, // 대관내역 존재여부
      rkDto : {}, // 최근 대관내역 1건

    }
  },
  computed: {
  },
  created(){

    

    // 회원정보조회
    let token = localStorage.getItem("access_token");
    // 로그인 여부 확인
    if(token == null) {
      this.$router.push('/moaplace.com/');
      return;
    }

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

      // 가장 최근 예매내역, 대관내역 1건씩 조회
      this.getUserData();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  mounted(){
  },
  methods:{

    async getUserData() {
      try {
        await axios.get('/moaplace.com/users/mypage/' + this.member.num
        ).then(function(resp){

          if(resp.status == 200) {

            this.bkExist = resp.data.bkExist; // 예매내역 존재여부
            // console.log("bkExist:",this.bkExist);
            if(this.bkExist) {
              this.bkDto = resp.data.bkDto; // 가장 최근 예매내역
              
              // 예매일 yyyy-mm-dd 형식으로 변환해서 저장
              var bkRegdate = new Date(this.bkDto.regdate);
              this.bkDto.regdate = bkRegdate.getFullYear() + "-" + ("0" + (bkRegdate.getMonth() + 1)).slice(-2) + "-" + ("0" + bkRegdate.getDate()).slice(-2);
              
              // 공연일 yyyy-mm-dd 형식으로 변환해서 저장
              var schedule_date = new Date(this.bkDto.schedule_date);
              this.bkDto.schedule_date = schedule_date.getFullYear() + "-" + ("0" + (schedule_date.getMonth() + 1)).slice(-2) + "-" + ("0" + schedule_date.getDate()).slice(-2);
              
              // 결제금액 천단위 콤마 정규식으로 저장
              var price = this.bkDto.booking_price;
              this.bkDto.booking_price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

            }

            this.rtExist = resp.data.rtExist; // 대관내역 존재여부
            if(this.rtExist) {
              this.rtDto = resp.data.rtDto; // 가장 최근 대관내역

              // 대관신청일 형식 변환해서 저장
              var rtRegdate = new Date(this.rtDto.regdate);
              this.rtDto.regdate = rtRegdate.getFullYear() + "-" + ("0" + (rtRegdate.getMonth() + 1)).slice(-2) + "-" + ("0" + rtRegdate.getDate()).slice(-2);

              // 대관일 형식 변환해서 저장
              var rental_date = new Date(this.rtDto.rental_date);
              this.rtDto.rental_date = rental_date.getFullYear() + "-" + ("0" + (rental_date.getMonth() + 1)).slice(-2) + "-" + ("0" + rental_date.getDate()).slice(-2);

            }
            
            // console.log(this.bkExist,this.rtExist);
            // console.log(this.bkDto);
            // console.log(this.rtDto);

          } else {
            alert('에러 핸들링');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

#wrap {
  td {
    vertical-align: middle;
  }
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
  .orange {
    color: #D67747;
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
      .mybtn {
        color: $brown;
        border-color: $brown;
        background-color: white;
        border-radius: 0%;
      }
      .mybtn:hover {
        color: white;
        background: $brown;
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .borderbox {
        border: 5px solid #eee;
        margin-bottom: 30px;
        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 50px;
        }
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
          tr:hover{
            > td {
              background-color: rgb(249, 249, 249);
            }
          }
        }
        td {
          background-color: white;
          .info {
            display: flex;
            align-items: center;
            margin: 20px 20px;
            .img1 {
              background-color: gray;
              width: 110px;
              height: 150px;
              margin-right: 20px;
            }
            .txt {
              p {
                margin-bottom: 10px;
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              table td,th {
                border: 0px;
                background-color: transparent;
              }
              .subtable{
                th {
                  font-weight: bold;
                  width: 25px;
                }
                td {
                  padding-left: 5px;
                  width: 140px;
                }
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
}
</style>