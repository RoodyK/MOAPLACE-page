<template>
  <div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="마이페이지"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">최근 예매내역</span>
            <button type="button" class="btn btn-outline-secondary fw-bold mybtn">더보기+</button>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">예매번호</th>
                  <th class="col col-md-2">공연정보</th>
                  <th class="col col-md-1">결제금액</th>
                  <th class="col col-md-1 end">결제상태</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td>
                    <div class="text-center">
                      <span>220807-0000-0001</span>
                      <br>
                      <span class="brown">(2022.08.07)</span>
                    </div>
                  </td>
                  <td>
                    <a href="">
                      <div class="info">
                        <div class="img1"></div>
                        <div class="txt">
                          <p class="fs-5 fw-bold">Title</p>
                          <table class="subtable">
                            <tr>
                              <th>장소</th>
                              <td>공연장1</td>
                            </tr>
                            <tr>
                              <th>날짜</th>
                              <td>2022.08.09</td>
                            </tr>
                            <tr>
                              <th>회차</th>
                              <td>1회차 14:00</td>
                            </tr>
                            <tr>
                              <th>좌석</th>
                              <td>R석 A01,S석 ...</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center">250,000원</td>
                  <td class="text-center end">입금완료</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">최근 대관신청내역</span>
            <button type="button" class="btn btn-outline-secondary fw-bold mybtn">더보기+</button>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">신청일자</th>
                  <th class="col col-md-2">공연장</th>
                  <th class="col col-md-1 end">진행상태</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td>
                    <div class="text-center">
                      <span>2022-08-09</span>
                    </div>
                  </td>
                  <td>
                    <a href="">
                      <div class="info">
                        <div class="txt">
                          <p class="fs-5 fw-bold">Title</p>
                          <p>2022.08.09 12:00 ~ 14:00</p>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center end">신청완료</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppFooter/>
  </div>
</template>

<script>
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
                margin-bottom: 10px;
              }
              table td,th {
                border: 0px;
                background-color: transparent;
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