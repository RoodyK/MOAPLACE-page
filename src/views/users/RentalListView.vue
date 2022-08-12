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
              <a class="nav-link" href="#">마이페이지</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 관심 공연</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">예매내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold" aria-cur="page" href="#">대관내역</a>
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
            <span class="fs-5 fw-bold">전체 대관내역</span>
          </div>
          <div class="datenav fs-7">
            <span class="">기간선택</span>
            <table>
              <tr>
                <td class="datebtn select"><a href="">1주일</a></td>
                <td class="datebtn"><a href="">1개월</a></td>
                <td class="datebtn"><a href="">3개월</a></td>
                <td class="datebtn"><a href="">6개월</a></td>
              </tr>
            </table>
            <div>
              <input type="date" class="mydate" name="startday" v-model="startdate"> - <input type="date" class="mydate" name="endday" v-model="enddate">
              <button class="btn mybtn resultbtn">조회</button>
            </div>
          </div>
          <div>
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
                      <span>2022-08-09</span>
                    </div>
                  </td>
                  <td>
                    <a href="">
                      <div class="info">
                        <div class="txt">
                          <p class="fs-5 fw-bold">공연장2</p>
                          <p>2022.08.09 12:00 ~ 14:00</p>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center">신청완료</td>
                  <td class="text-center end">
                    <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                  </td>
                </tr>
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
                          <p class="fs-5 fw-bold">공연장2</p>
                          <p>2022.08.09 12:00 ~ 14:00</p>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center">신청완료</td>
                  <td class="text-center end">
                    <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                  </td>
                </tr>
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
                          <p class="fs-5 fw-bold">공연장2</p>
                          <p>2022.08.09 12:00 ~ 14:00</p>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center">신청완료</td>
                  <td class="text-center end">
                    <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">상세보기</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 페이징 -->
        <div id="mypaging">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="" aria-label="Previous">
                  <span aria-hidden="true">
                    &laquo;
                  </span>
                </a>
              </li>
              <li class="page-item select"><a class="page-link" href="">1</a></li>
              <li class="page-item"><a class="page-link" href="">2</a></li>
              <li class="page-item"><a class="page-link" href="">3</a></li>
              <li class="page-item"><a class="page-link" href="">4</a></li>
              <li class="page-item"><a class="page-link" href="">5</a></li>
              <li class="page-item">
                <a class="page-link" href="" aria-label="Next">
                  <span aria-hidden="true">
                    &raquo;
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRentalListView',
  data() {
    return{
      startdate: '',
      enddate: ''
    }
  },
  created(){
    const cur = new Date();
    const date = cur.getFullYear()+'-'+('0'+(cur.getMonth()+1)).slice(-2)+'-'+('0'+cur.getDate()).slice(-2);
    const weekdate = cur.getFullYear()+'-'+('0'+(cur.getMonth()+1)).slice(-2)+'-'+('0'+(cur.getDate()-7)).slice(-2);
    this.enddate = date;
    // console.log(this.enddate);
    this.startdate = weekdate;
    // console.log(this.startdate);
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