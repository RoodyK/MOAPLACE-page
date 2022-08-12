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
              <a class="nav-link" href="#">대관내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">관람 후기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">1:1 문의</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active fw-bold" aria-current="page" href="#">내 정보 수정</a>
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
            <span class="fs-5 fw-bold">내 정보 수정</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <tbody class="fs-7">
                <tr>
                  <th class="col-md-2 text-center descth">아이디</th>
                  <td>
                    <input type="text" class="form-control mytxtform disform" name="id" placeholder="hotdog" disabled>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">이메일</th>
                  <td>
                    <input type="text" class="form-control mytxtform disform" name="email" placeholder="dog@test.com" disabled>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">이름</th>
                  <td>
                    <input type="text" class="form-control mytxtform" name="name" value="강아지">
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">비밀번호</th>
                  <td>
                    <input type="password" class="form-control mytxtform" name="pwd">
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">비밀번호 확인</th>
                  <td>
                    <input type="password" class="form-control mytxtform" name="pwdcheck">
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">성별</th>
                  <td>
                    <div class="myradio">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="male">
                        <label class="form-check-label" for="male">
                          남성
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="female" checked>
                        <label class="form-check-label" for="female">
                          여성
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">생년월일</th>
                  <td>
                    <input type="text" class="form-control mytxtform" name="birth" value="1900/01/01">
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">전화번호</th>
                  <td>
                    <input type="text" class="form-control mytxtform" name="phone" value="010-0000-0000">
                  </td>
                </tr>
                <tr>
                  <th class="col-md-2 text-center descth">주소</th>
                  <td>
                    <div class="myaddr">
                      <input type="text" class="form-control mytxtform smallform" name="addr" value="우편번호">
                      <button type="button" class="btn btn-outline-secondary fw-bold mybtn2">주소검색</button>
                    </div>
                    <div>
                      <input type="text" class="form-control mytxtform bigform" name="addr" value="캘리포니아 로스앤젤레스">
                      <input type="text" class="form-control mytxtform bigform" name="addr" value="말리부">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center btnmargin">
          <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn">취소</button>
          <button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn2">수정</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInfoEditView'
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
      .myaddr {
        display: flex;
        button {
          margin-left: 10px;
          padding: 0px 20px;
          font-size: 1em;
        }
      }
      .form-check-input {
        margin-right: 5px;
        &:checked {
          background-color: $brown;
          border-color: $brown;
        }
      }
      .myradio {
        display: flex;
        .form-check {
          margin-right: 20px;
          margin-top: 4px;
          margin-bottom: 0px;
        }
      }
      .mytxtform {
        width: 300px;
        font-size: 1em;
      }
      .smallform {
        width: 200px;
      }
      .bigform {
        width: 360px;
        margin-top: 5px;
      }
      .disform {
        background-color: rgb(249, 249, 249);
      }
      .btnmargin {
        margin-top: 30px;
      }
      .mybtn {
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
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
        td {
          background-color: white;
          padding: 10px 20px;
        }
      }
      .myborder {
        th{
          border-bottom: 1px solid #dbe2e8;
          border-top: 1px solid #dbe2e8;
          background-color: rgb(249, 249, 249);
        }
        td{
          border-bottom: 1px solid #dbe2e8;
          border-top: 1px solid #dbe2e8;
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
}
</style>