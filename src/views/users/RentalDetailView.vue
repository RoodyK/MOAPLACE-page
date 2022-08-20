<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="대관내역"/>
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
                  <td class="desctd">강아지</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">연락처</th>
                  <td class="desctd">010-0000-0000</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">E-mail</th>
                  <td class="desctd">moa@moa.com</td>
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
                  <td class="desctd">우리집 고양이가 제일 귀여워</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장</th>
                  <td class="desctd">모던홀</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관희망일자</th>
                  <td class="desctd">2022-08-25</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">대관시작시간</th>
                  <td class="desctd">09:00</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">공연장르</th>
                  <td class="desctd">무용</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">첨부파일</th>
                  <td class="desctd">공연계획서.zip</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자</th>
                  <td class="desctd">고양이박사님</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">담당자 연락처</th>
                  <td class="desctd">010-0000-0000 / se@moa.com</td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">기타 요청사항</th>
                  <td class="desctd">에어컨을 시원하게 틀어주세요.</td>
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
            <p class="desctxt fs-7">
              공연계획서 확인했습니다. 대관시작시간은 9시로 하시죠. 돈 보내주세용 3333230293-092342 모아플레이스<br>
              줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트 줄바꿈 간격 테스트
            </p>
          </div>
        </div>
        <div class="text-center btnmargin">
          <p class="fs-7 brown">대관취소 선택시 1:1 문의 페이지로 이동합니다.</p>
          <button type="button" class="btn btn-outline-secondary fw-bold mybtn">대관취소</button>
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
  name: 'MyRentalDetailView',
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