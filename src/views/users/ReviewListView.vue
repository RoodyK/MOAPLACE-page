<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="관람 후기" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">관람 후기</span>
            <span class="fs-7">회원님께서는 현재 <span class="fs-6 fw-bold orange">{{ listCnt }}건</span>의 관람후기가 등록되어 있습니다.</span>
          </div>
          <div class="titledesc">
            <p class="desctxt fs-7">
              <span class="fw-bold">고객님의 관람후기 내역입니다.</span>
              <br>
              <span class="fs-8">
                운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.<br>
                특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.<br>
                사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 계정 이용이 제한됩니다.<br>
              </span>
            </p>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">공연정보</th>
                  <th class="col col-md-4 end">내용</th>
                </tr>
              </thead>
              <!-- tbody 시작 -->
              <tbody class="fs-7">
                <tr v-for="(item,index) in list" :key="index">
                  <td>
                    <RouterLink :to="`/moaplace.com/show/showdetail/${ item.show_num }`">
                      <div class="info info-sub">
                        <img :src="item.show_thumbnail" class="img3">
                        <div class="txt">
                          <p class="fs-6 fw-bold">{{ item.show_name }}</p>
                        </div>
                      </div>
                    </RouterLink>
                  </td>
                  <td class="reviewtxt end">
                    <p class="fs-4 brown starpoint">{{ item.review_grade }}</p>
                    <p>{{ item.review_content }}</p>
                    <p class="brown reviewdate">{{ item.review_regdate }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 페이징 -->
        <div id="mypaging">

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
  name: 'MyReviewListView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return {

      member : {}, // 회원정보
      
      pageNum : 1, // 현재 페이지
      list : [], // 후기 리스트
      listCnt : 0, // 전체 결과 개수
      startPage : 0, // 페이지 시작번호
      endPage : 0, // 페이지 끝번호
      pageCnt : 0, // 전체 페이지 수

    }
  },
  computed: {
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

      this.getList();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  methods: {

    // 후기내역 가져오기
    async getList() {
      try {
        await axios.get('/moaplace.com/users/mypage/review/list/'
          + this.member.num + '/'
          + this.pageNum
        ).then(function(resp){
          if(resp.status == 200) {

            this.list = resp.data.list;
            this.listCnt = resp.data.listCnt;
            this.startPage = resp.data.startPage;
            this.endPage = resp.data.endPage;
            this.pageCnt = resp.data.pageCnt;

            for(let i = 0 ; i < this.list.length ; i++) {

              // 후기 작성일 yyyy-mm-dd 형식으로 변환해서 저장
              var review_regdate = new Date(this.list[i].review_regdate);
              this.list[i].review_regdate = review_regdate.getFullYear() + "-" + ("0" + (review_regdate.getMonth() + 1)).slice(-2) + "-" + ("0" + review_regdate.getDate()).slice(-2);
              
              // 별점 ★으로 변환해서 저장
              var star = this.list[i].review_grade;
              switch(star) {
                case 0: this.list[i].review_grade = '☆☆☆☆☆'; break;
                case 1: this.list[i].review_grade = '★☆☆☆☆'; break;
                case 2: this.list[i].review_grade = '★★☆☆☆'; break;
                case 3: this.list[i].review_grade = '★★★☆☆'; break;
                case 4: this.list[i].review_grade = '★★★★☆'; break;
                case 5: this.list[i].review_grade = '★★★★★'; break;
              }

            }

          } else {
            alert('axios 에러');
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

* {
  margin: 0;
}

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
  .fs-8 {
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
    .left {
      width: 300px;
      height: 600px;
      background-color: white;
      border: 2px solid #dbe2e8;
      margin-right: 30px;
      padding: 30px 20px;
      .top {
        margin-bottom: 10px;
      }
      .mid {
        background-color: whitesmoke;
        border: 2px solid #dbe2e8;
        padding: 15px;
        p {
          margin: 0;
        }
        span {
          color: #D67747;
        }
      }
      .bot {
        margin: 10px 0px;
        ul li {
          border-bottom: 1px solid #CCCCCC;
          a {
            color: $black;
          }
          a:hover {
            color: $brown;
            opacity: 50%;
          }
          .active {
              color: $brown;
          }
        }
      }
    }
    .right {
      width: 100%;
      height: 100%;
      background-color: white;
      border: 2px solid #dbe2e8;
      padding: 30px;
      .reviewdate {
        margin: 10px 0px;
      }
      .starpoint {
        margin-bottom: 5px;
      }
      .mybtn {
        color: $brown;
        border-color: $brown;
        background-color: white;
      }
      .mybtn:hover {
        color: white;
        background: $brown;
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
            .img3 {
              background-color: gray;
              width: 80px;
              height: 110px;
              margin-bottom: 5px;
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
          .info-sub {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0px 10px 0px;
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
        .reviewtxt {
          padding: 0px 15px;
        }
      }
      .datenav {
        background-color: rgb(249, 249, 249);
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