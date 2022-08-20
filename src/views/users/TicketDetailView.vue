<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="예매내역"/>
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
                  <th class="col end" colspan="2">Title</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">예매자</th>
                  <td class="desctd">고양이</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">예매번호</th>
                  <td class="desctd">220807-0000-0001</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연일</th>
                  <td class="desctd">2022.08.09</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">회차</th>
                  <td class="desctd">1회차 14:00</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">좌석</th>
                  <td class="desctd">R석 A01, S석 B01</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">장소</th>
                  <td class="desctd">공연장1</td>
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
                  <td class="desctd">2022.08.01</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">결제금액</th>
                  <td class="desctd">250,000원</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">결제수단</th>
                  <td class="desctd">신용카드</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">결제상태</th>
                  <td class="desctd">입금완료</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center btnmargin">
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn">예매취소</button>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn2">이전으로</button>
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
  name: 'MyTicketDetailView',
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