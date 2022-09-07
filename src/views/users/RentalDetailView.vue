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
            <span class="fs-5 fw-bold">대관내역</span>
          </div>
          <div class="desc">
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col end" colspan="2">신청 정보</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">대관신청자</th>
                  <td class="desctd">{{ dto.rental_name }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">연락처</th>
                  <td class="desctd">{{ dto.rental_phone }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">E-mail</th>
                  <td class="desctd">{{ dto.rental_email }}</td>
                </tr>
              </tbody>
            </table>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col end" colspan="2">공연 정보</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">공연명</th>
                  <td class="desctd">{{ dto.rental_title }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장</th>
                  <td class="desctd">{{ dto.hall_name }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관희망일자</th>
                  <td class="desctd">{{ dto.rental_date }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관시작시간</th>
                  <td class="desctd">{{ dto.rental_time }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장르</th>
                  <td class="desctd">{{ dto.rental_genre }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">첨부파일</th>
                  <td class="desctd">
                    <span @click.prevent="download(dto.rental_num)" class="fileName">
                      {{ dto.rental_originfilename }} 
                    </span> ({{ dto.rental_filesize }} bytes)
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자</th>
                  <td class="desctd">{{ dto.rental_ownsname }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자 연락처</th>
                  <td class="desctd">{{ dto.rental_ownsphone }} / {{ dto.rental_ownemail }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">기타 요청사항</th>
                  <td class="desctd mycontent">{{ dto.rental_content }}</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">진행상태</th>
                  <td class="desctd">{{ dto.rental_state }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">답변</span>
          </div>
          <div class="titledesc">
            <p class="desctxt fs-7" v-html="dto.answer_content" v-show="answer">
            </p>
            <p class="desctxt fs-7" v-show="!answer">
              관리자의 답변이 등록되지 않았습니다.
            </p>
          </div>
        </div>
        <div class="text-center btnmargin">
          <p class="fs-7 brown" v-show="cancle">대관취소 선택시 1:1 문의 페이지로 이동합니다.</p>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn" @click="$router.push({ name : 'qnaList' })" v-show="cancle">대관취소</button>
          <RouterLink :to="`/moaplace.com/users/mypage/rental/update/${ rental_num }`">
            <button type="button" class="btn btn-outline-secondary fw-bold mybtn3" v-show="cancle">신청내역 수정</button>
          </RouterLink>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn2" @click="$router.push({ name : 'myrentallist' })">목록으로</button>
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
  name: 'MyRentalDetailView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return{

      member : {}, // 회원정보
      rental_num : 0, // 대관번호
      dto : {}, // 대관내역 상세정보
      answer : false, // 답변여부
      cancle : false, // 대관취소 가능여부

    }
  },
  created(){

    this.rental_num = this.$route.params.rental_num;

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
        await axios.get('/moaplace.com/users/mypage/rental/detail/'
          + this.rental_num
        ).then(function(resp){
          // console.log(resp);
          if(resp.status == 200) {

            this.dto = resp.data.dto;

            // 관리자 답변 유무 체크
            if(this.dto.answer_content != null) {
              this.answer = true;
            }
            // 대관취소 가능 여부 체크
            // console.log(this.dto.rental_state);
            // console.log("전",this.cancle);
            if(this.dto.rental_state != '예약취소' && this.dto.rental_state != '사용완료') {
              this.cancle = true;
            }
            // console.log("후",this.cancle);

            var regdate = new Date(this.dto.regdate);
            this.dto.regdate = regdate.getFullYear() + "-" + ("0" + (regdate.getMonth() + 1)).slice(-2) + "-" + ("0" + regdate.getDate()).slice(-2);

            var rental_date = new Date(this.dto.rental_date);
            this.dto.rental_date = rental_date.getFullYear() + "-" + ("0" + (rental_date.getMonth() + 1)).slice(-2) + "-" + ("0" + rental_date.getDate()).slice(-2);

          } else {
            alert('rental detail 에러');
          }

        }.bind(this));
      } catch (error) {
        console.log(error);
      }
    },

    download(rental_num) {
      // console.log("대관예약번호 : ", rental_num);
      window.location = `http://localhost:9090/moaplace.com/users/mypage/file/download/${rental_num}`;
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
      .mybtn3 {
        color: white;
        border-color: gray;
        background-color: gray;
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
        margin-bottom: 20px;
      }
      .titledesc {
        border: 5px solid #eee;
        margin-bottom: 30px;
        .desctxt {
          margin: 15px 20px;
        }
      }
      .desc {
        margin-bottom: 30px;
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
        .mycontent {
          white-space: pre-line
        }
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
          vertical-align: middle;
        }
        .desctd {
          border: 1px solid #dbe2e8;
          > .fileName {
            color: $brown;
            cursor: pointer;
            text-decoration: underline;
            &:hover {
              color: $brown;
              text-decoration: none;
            }
          }
        }
        .end{
          border-right: 0px;
        }
      }
      .ticket-table {
        vertical-align : middle;
        margin-bottom: 30px;
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