<template>
<div>
  <AppHeader/>
  <SideVisual menu="MY PAGE" img="mypage"/>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <MySideMenu category="회원 탈퇴" :name="member.name" :point="member.point"/>
      <!-- 내역 -->
      <div class="rounded right">
        <div>
          <div class="title">
            <span class="fs-5 fw-bold">회원 탈퇴</span>
          </div>
          <div class="titledesc">
            <p class="desctxt">
              <span class="fw-bold fs-3">주의하세요!</span>
              <br>
              <span>
                <br>
                탈퇴 시 회원님의 결제 내역을 포함하여 계정에 저장된 모든 정보가 영구적으로 삭제됩니다.<br>
                한 번 삭제된 정보는 복구가 불가능하며 같은 아이디로 재가입할 수 없습니다.<br>
                <br>
                이상의 내용에 동의하여 탈퇴를 원하실 경우, 아래의 동의하기 버튼을 클릭해주세요.
              </span>
              <button type="button" class="btn btn-outline-secondary fw-bold mybtn2">동의하기</button>
            </p>
          </div>
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
  name: 'WithdrawalView',
  components: {
  AppHeader,
  AppFooter,
  SideVisual,
  MySideMenu
  },
  data(){
    return {

      member : {}, // 회원정보

    }
  },
  computed: {
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
      console.log("회원 정보 : ",this.member);

      // 적립금 천단위 콤마형식으로 변환
      var point = this.member.point;
      this.member.point = point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    })
    .catch(error => {
      console.log(error.message);
    })

  },
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
      .mybtn2 {
        color: white;
        border-color: $brown;
        background-color: $brown;
        padding: 5px 50px;
        margin: 25px 0px 15px;
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
      .titledesc {
        border: 5px solid #eee;
        margin-top: 30px;
        margin-bottom: 10px;
        .desctxt {
          margin: 15px 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>