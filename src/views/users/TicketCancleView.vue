<template>
<div>
  <AppHeader/>
  <SideVisual menu="MOA PLACE" img="moa"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <div class="rounded left">
        <div class="top fs-6">
          <span class="fs-4 brown">사용자</span>님, 안녕하세요.
        </div>
        <div class="mid fs-6 fw-bold">
          <p>
            현재 보유 적립금
          </p>
          <p class="text-end">
            <span class="fs-3 text-end">5,000</span>원
          </p>
        </div>
        <div class="bot">
          <ul class="nav flex-column fs-6">
            <li class="nav-item">
              <a class="nav-link" href="#">마이페이지</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 관심 공연</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold" aria-current="page" href="#">예매내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">대관내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">관람 후기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">1:1 문의</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 정보 수정</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">회원 탈퇴</a>
            </li>
          </ul>
        </div>
      </div>
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
                    <span>220807-0000-0001</span>
                    <br>
                    <span class="brown">(2022.08.07)</span>
                  </div>
                </td>
                <td>
                  <a href="">
                    <div class="info">
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
                            <td>R석 A01,S석 B01,S석 B02</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </a>
                </td>
                <td class="text-center">250,000원</td>
              </tr>
            </tbody>
          </table>
          <div class="totprice">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th>총 환불 금액</th>
                  <td>250,000원</td>
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
            <span>비밀번호 입력 :</span> <input type="password" class="form-control" >
          </div>
          <div class="text-center btnmargin">
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn">이전</button>
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn2">예매취소</button>
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
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name: 'MyTicketCancleView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual
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
        margin: 30px auto;
        width: 700px;
        > thead > tr > th {
          background-color: $brown;
          color: #ffffff;
          border-right: 1px solid #eee;
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
          width: 200px;
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