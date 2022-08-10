<template>
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
              <a class="nav-link active fw-bold" aria-current="page" href="#">마이페이지</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 관심 공연</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">예매내역</a>
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
          <div class="title">
            <span class="fs-5 fw-bold">최근 예매내역</span>
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn">더보기+</button>
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
                          <table>
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
            <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn">더보기+</button>
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
</template>

<script>
export default {
  name: 'MypageView'
}
</script>

<style lang="scss">
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
    .left {
      width: 300px;
      height: 100%;
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
        margin-bottom: 10px;
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
        .end{
          border-right: 0px;
        }
      }
      .ticket-table {
        vertical-align : middle;
      }
    }
  }
  #mypaging {
    display: flex;
    justify-content: center;
  }
}
</style>