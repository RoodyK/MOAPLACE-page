<template>
  <div class="rounded left">
    <div class="top fs-6">
      <span class="fs-4 brown">사용자</span>님, 안녕하세요.
    </div>
    <div class="mid fs-6 fw-bold">
      <p>현재 보유 적립금</p>
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
</template>

<script>
export default {
  name : 'MySideMenu',
  data(){
    return{
      
    }
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
  }
}
</style>