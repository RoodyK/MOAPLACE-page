<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="내 관심 공연" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <!-- 관심공연 목록 -->
        <div id="mylist">
          <div class="title">
            <span class="fs-5 fw-bold">내 관심 공연</span>
            <span class="fs-7">회원님께서는 현재 <span class="fs-6 fw-bold orange">{{ listCnt }}건</span>의 관심공연이 등록되어 있습니다.</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">번호</th>
                  <th class="col col-md-2">공연정보</th>
                  <th class="col col-md-1">분류</th>
                  <th class="col col-md-1 end">삭제</th>
                </tr>
              </thead>
              <!-- tbody 시작 -->
              <tbody class="fs-7">
                <tr v-for="(item, index) in list" :key="index">
                  <td>
                    <div class="text-center">
                      <span>{{ item.rnum }}</span>
                    </div>
                  </td>
                  <td>
                    <RouterLink :to="`/moaplace.com/show/showdetail/${ item.show_num }`">
                      <div class="info">
                        <img :src="item.show_thumbnail" class="img2">
                        <div class="txt">
                          <p class="fs-5 fw-bold">{{ item.show_name }}</p>
                          <table>
                            <tr>
                              <th class="fw-bold">기간</th>
                              <td>{{ item.show_start }} ~ {{ item.show_end }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </RouterLink>
                  </td>
                  <td class="text-center">{{ item.genre_category }}</td>
                  <td class="text-center end">
                    <button type="button" class="btn btn-outline-secondary fw-bold mybtn" @click.prevent="deleteOk(item)">삭제</button>
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
  name: 'MyPerformanceView',
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
      list : [], // 관심공연 리스트
      listCnt : 0, // 전체 결과 개수
      startPage : 0, // 페이지 시작번호
      endPage : 0, // 페이지 끝번호
      pageCnt : 0, // 전체 페이지

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

      this.getList();

    })
    .catch(error => {
      console.log(error.message);
    })

  },
  methods: {

    async getList() {
      try {
        await axios.get('/moaplace.com/users/mypage/performance/'
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

              // 시작날짜, 끝날짜 yyyy-mm-dd 형식으로 변환해서 저장
              var show_start = new Date(this.list[i].show_start);
              this.list[i].show_start = show_start.getFullYear() + "-" + ("0" + (show_start.getMonth() + 1)).slice(-2) + "-" + ("0" + show_start.getDate()).slice(-2);
              var show_end = new Date(this.list[i].show_end);
              this.list[i].show_end = show_end.getFullYear() + "-" + ("0" + (show_end.getMonth() + 1)).slice(-2) + "-" + ("0" + show_end.getDate()).slice(-2);
              
            }

          } else {
            alert('axios 에러');
          }
        }.bind(this));

      } catch (error) {
        console.log(error);
      }

    },

    // 관심공연 삭제 메소드
    deleteOk(e) {
      console.log(e);
      
      const deleteData = {
        member_num : e.member_num,
        show_num : e.show_num
      }

      // console.log(deleteData);

      axios.post('moaplace.com/users/mypage/performance/delete', JSON.stringify(deleteData), {
        headers: {
          "Content-Type": `application/json`,
        }
      }).then((resp) => {

        if(resp.data == "success") {

          alert('내 관심 공연에서 삭제되었습니다.');
          this.getList();

        } else {
          alert('관심공연 삭제 오류 핸들링');
        }
      });

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
          vertical-align: middle;
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
              > table > tr > th {
                padding-right: 5px;
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