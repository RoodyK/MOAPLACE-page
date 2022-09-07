<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="대관내역" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">전체 대관내역</span>
          </div>
          <div class="datenav fs-7 titledesc">
            <span class="">기간선택</span>
            <div class="radio_box">
              <label class="myradio">
                <input type="radio" name="period" value="1month" @change="radioChange($event)" checked>
                <span>1개월</span>
              </label>
              <label class="myradio">
                <input type="radio" name="period" value="3month" @change="radioChange($event)">
                <span>3개월</span>
              </label>
              <label class="myradio">
                <input type="radio" name="period" value="6month" @change="radioChange($event)">
                <span>6개월</span>
              </label>
            </div>
            <div>
              <input type="date" class="mydate" name="startday" v-model="startdate"> - <input type="date" class="mydate" name="endday" v-model="enddate">
              <button class="btn mybtn resultbtn" @click="clickSelect()">조회</button>
            </div>
          </div>
          <!-- 내역 -->
          <div v-show="rtExist">
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">신청일자</th>
                  <th class="col col-md-2">공연장</th>
                  <th class="col col-md-1">진행상태</th>
                  <th class="col col-md-1 end">상세보기</th>
                </tr>
              </thead>
              <!-- tbody 시작 -->
              <tbody class="fs-7">
                <tr v-for="(item, index) in list" :key="index">
                  <td>
                    <div class="text-center">
                      <span>{{ item.regdate }}</span>
                    </div>
                  </td>
                  <td>
                    <RouterLink :to="`/moaplace.com/users/mypage/rental/detail/${ item.rental_num }`">
                      <div class="info">
                        <div class="txt">
                          <p class="fs-5 fw-bold">{{ item.hall_name }}</p>
                          <p>{{ item.rental_date }} / {{ item.rental_time }}</p>
                        </div>
                      </div>
                    </RouterLink>
                  </td>
                  <td class="text-center">{{ item.rental_state }}</td>
                  <td class="text-center end">
                    <RouterLink :to="`/moaplace.com/users/mypage/rental/detail/${ item.rental_num }`">
                      <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 페이징 -->
        <div id="mypaging" v-show="rtExist">

          <p v-if="startPage>5"
            @click="movePage(pageNum-1)">
            [이전]
          </p>
          <p v-if="startPage<5" class="not"> [이전] </p>

          <div v-for="index in ((endPage-startPage)+1)" :key="index">
            <p :class="{active:startPage+(index-1)==pageNum}"
              @click="movePage(startPage+(index-1))">
              {{startPage+(index-1)}} 
            </p>
          </div>

          <p v-if="endPage<pageCnt"
            @click="movePage(pageNum+1)">
            [다음] 
          </p>
          <p v-if="endPage>=pageCnt" class="not"> [다음] </p>

        </div>

        <div v-show="!rtExist" class="borderbox">
          <span class="brown">최근 대관신청내역이 존재하지 않습니다.</span>
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
  name: 'MyRentalListView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data() {
    return{

      startdate : '', // 조회 시작날짜
      enddate : '', // 조회 끝날짜
      period : '1month', // 기간선택 (초기 일주일전)

      member : {}, // 회원정보
      rtExist : false, // 대관내역 존재여부

      pageNum : 1, // 현재 페이지
      list : [], // 내역 리스트
      listCnt : 0, // 전체 결과 개수
      startPage : 0, // 페이지 시작번호
      endPage : 0, // 페이지 끝번호
      pageCnt : 0, // 전체 페이지 수
      
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

      // 조회기간 yyyy-mm-dd 형식으로 변환해서 초기화
      let date = new Date();
      let date1month = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        date.getDate()
      );
      this.enddate = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+(date.getDate()+1)).slice(-2);
      this.startdate = date1month.getFullYear()+'-'+('0'+(date1month.getMonth()+1)).slice(-2)+'-'+('0'+date1month.getDate()).slice(-2);

      this.getList();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  methods: {

    async getList() { // 기간에 해당되는 내역 출력
      try {
        await axios.get('/moaplace.com/users/mypage/rental/list/' 
          + this.member.num + '/'
          + this.startdate + '/'
          + this.enddate + '/'
          + this.pageNum
        ).then(function(resp){

          if(resp.status == 200) {

            this.rtExist = resp.data.rtExist; // 대관내역 존재여부

            if(this.rtExist) {

              this.list = resp.data.list;
              this.listCnt = resp.data.listCnt;
              this.startPage = resp.data.startPage;
              this.endPage = resp.data.endPage;
              this.pageCnt = resp.data.pageCnt;

              for(let i = 0 ; i < this.list.length ; i++) {

                // 대관신청일, 대관일 yyyy-mm-dd 형식으로 변환해서 저장
                var regdate = new Date(this.list[i].regdate);
                this.list[i].regdate = regdate.getFullYear() + "-" + ("0" + (regdate.getMonth() + 1)).slice(-2) + "-" + ("0" + regdate.getDate()).slice(-2);
                var rental_date = new Date(this.list[i].rental_date);
                this.list[i].rental_date = rental_date.getFullYear() + "-" + ("0" + (rental_date.getMonth() + 1)).slice(-2) + "-" + ("0" + rental_date.getDate()).slice(-2);
                
              }

            }

          } else {
            alert('rental list 에러');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }

      if( this.enddate < this.startdate ) {
        // console.log("끝날짜가 시작날짜보다 이전임(오류메세지띄워야됨)");
        alert('기간을 다시 선택해 주세요.');
      } else {
        // console.log("끝날짜가 시작날짜보다 뒤임(잘된거임)");
      }

    },

    radioChange(event) { // 기간선택 버튼 클릭할 때마다 조회기간 변경하기

      // 기간선택 버튼 클릭할 때마다 period값 변경 
      this.period = event.target.value;
      // console.log("period : ", this.period);

      // period값에 따라서 startdate 변경 + enddate 현재날짜로 초기화
      let date = new Date();

      let date1month = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        date.getDate()
      );
      let date3month = new Date(
        date.getFullYear(),
        date.getMonth() - 3,
        date.getDate()
      );
      let date6month = new Date(
        date.getFullYear(),
        date.getMonth() - 6,
        date.getDate()
      );

      if( this.period == '1month' ) {
        this.enddate = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+(date.getDate()+1)).slice(-2);
        this.startdate = date1month.getFullYear()+'-'+('0'+(date1month.getMonth()+1)).slice(-2)+'-'+('0'+date1month.getDate()).slice(-2);
      } else if( this.period == '3month' ) {
        this.enddate = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+(date.getDate()+1)).slice(-2);
        this.startdate = date3month.getFullYear()+'-'+('0'+(date3month.getMonth()+1)).slice(-2)+'-'+('0'+date3month.getDate()).slice(-2);
      } else if( this.period == '6month' ) {
        this.enddate = date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+('0'+(date.getDate()+1)).slice(-2);
        this.startdate = date6month.getFullYear()+'-'+('0'+(date6month.getMonth()+1)).slice(-2)+'-'+('0'+date6month.getDate()).slice(-2);
      }

    },

    movePage(move) {
      this.pageNum = move;
      // console.log(this.pageNum);
      this.getList();
    },

    clickSelect() {
      this.pageNum = 1;
      this.getList();
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
        border-radius: 0%;
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
      .titledesc {
        border: 5px solid #eee;
        margin-bottom: 30px;
        .desctxt {
          margin: 15px 20px;
        }
        .radio_box {
          display: flex;
          // width: 300px;
          input[type="radio"] {
            display: none;
          }
          input[type="radio"] + span {
            padding: 8px 30px;
            border: 1px solid $brown;
            border-width: 1px 1px 1px 0;
            text-align: center;
            cursor: pointer;
          }
          input[type="radio"]:checked + span {
            background-color: $brown;
            color: white;
          }
          .myradio {
            &:first-child {
              span {
                border-left: 1px solid $brown;
              }
            }
          }
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
        .end{
          border-right: 0px;
        }
      }
      .ticket-table {
        vertical-align : middle;
      }
    }
  }
  #mypaging{
    display: flex;
    justify-content: center;
    margin: 16px 4px;
    p {
      padding: 0 8px;
      color: $black;
      cursor: pointer;
      &.active {
        color: #D67747;
        font-weight: bold;
        cursor: default;
      }
      &:hover {
        font-weight: bold;
      }
      &.not {
        color: #ccc;
        cursor: default;
      }
      &.not:hover {
        font-weight: 400;
      }
    }
  }
}
</style>