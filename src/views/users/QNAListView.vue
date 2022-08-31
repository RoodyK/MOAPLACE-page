<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <!-- 사용 안 하는 페이지 -->
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
              <a class="nav-link" href="#">대관내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">관람 후기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold" aria-cur="page" href="#">1:1 문의</a>
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
            <span class="fs-5 fw-bold">1:1 문의</span>
            <span class="fs-7">회원님께서는 현재 <span class="fs-6 fw-bold brown">1건</span>의 문의내역이 등록되어 있습니다.</span>
          </div>
          <div class="titledesc">
            <p class="desctxt fs-7">
              <span class="fw-bold">고객님의 1:1 문의 내역입니다.</span>
              <br>
              <span class="fs-8">
                모아플레이스에 바라는 사항이나 불편한 사항, 궁금증을 올려 주시면 성심성의껏 답변해 드리겠습니다.<br>
                FAQ를 먼저 검색해 보세요. 자주 하는 질문을 모아 두었습니다.<br>
              </span>
            </p>
          </div>
          <div class="btnarea">
            <button type="button" class="btn btn-outline-secondary fs-7 fw-bold mybtn">1:1 문의하기</button>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table qna-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">구분</th>
                  <th class="col col-md-4">제목</th>
                  <th class="col col-md-1">작성일</th>
                  <th class="col col-md-1">답변일</th>
                  <th class="col col-md-1 end">답변상태</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td class="sort">
                    <p>공연</p>
                  </td>
                  <td class="qnatitle">
                    <p><a href="">공연은 언제 하나요?</a></p>
                  </td>
                  <td class="qnadate">
                    <p>2022.08.12</p>
                  </td>
                  <td class="qnadate">
                    <p>2022.08.12</p>
                  </td>
                  <td class="qnastate end">
                    <p>답변대기</p>
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
  <AppFooter/>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name: 'MyQNAListView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

* {
  margin: 0;
}

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
  .fs-8 {
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
      .btnarea {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }
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
        margin-bottom: 10px;
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
      .qna-table {
        .sort {
          text-align: center;
        }
        .qnatitle {
          &:hover {
            font-weight: bold;
          }
        }
        .qnadate {
          text-align: center;
        }
        .qnastate {
          text-align: center;
        }
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