<template>
  <AppHeader/>
  <SideVisual menu="SHOW / TICKET" img="show"/>
  <div id="wrap">
    <div id="title">
      <h4>웃는남자</h4>
      <hr>
    </div>
    <div id="main" class="container">
      <div id="img">
        <img src="../../assets/smile.jpg">
      </div>
      <div>
        <div id="info">
          <span>기간</span> 2022.06.10 (금) ~ 2022.08.22 (월)<br>
          <span>장소</span> 오케스트라홀<br>
          <span>시간</span> 오케스트라홀<br>
          <span>연령</span> 전체연령가<br>
          <span>티켓</span> R석 150,000원 / S석 120,000원 / A석 100,000원
        </div>
        <div id="btn">
          <button id=btn1>잔여석정보</button>
          <button id=btn2>예매하기</button>
        </div>
      </div>
    </div>
    <hr>
    <div id=nav>
      <div class="click" onclick="location.href='/moaplace.com/showdetail'">상세보기</div>
      <div id=present class="click" onclick="location.href='/moaplace.com/showreview'">관람평</div>
      <div class="click" onclick="location.href='/moaplace.com/showrefund'">취소 및 환불 안내</div>
    </div>
    <div id="datail">
      <h4>(웃는남자)에 대한 1개의 리뷰가 있어요!</h4>
      <div id="write">
        <img src="../../assets/star5.png">
        <div id="cont">
          <textarea cols="100" rows="7" placeholder="감상평을 남겨주세요. 공연과 상관없는 내용은 양관에 의해 제재를 받을수 있습니다."></textarea>
          <button>관람평 등록</button>
        </div>
      </div>
      <div id="review" class="container">
        <div>
          <img src="../../assets/star5.png">
        </div>
        <div id="con">
          나이가 무색할 정도의 탐 크루즈의 피지컬, 연기, 액션이 멋졌습니다. 1편의 이야기를 세심하고 적절하게 엮어서 새로운 스토리를 잘 만들었어요.<br>
          <div id="user">
            <span id="name">John Doe</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span id="date">2022.08.14</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppFooter/>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name:"ShowReviewView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  #wrap{
    width: $width;
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 120px;
  }
  #title{
    h4{
      color: $black;
      text-align: center;
    }
  }
  hr{
    height: 3px;
  }
  #main{
    img{
      width: 200px;
      margin-left: 50px;
    }
    button{
      color: white;
      background-color: $green;
    }
  }
  #btn{
    margin-top: 5px;
  }
  #btn1{
    margin-left: 30px;
  }
  #btn2{
    margin-left: 20px;
  }
  #nav{
    margin-top: 50px;
    margin-left: 110px;
    text-align: center;
    div{
      float: left;
      width: 30%;
    }
  }
  .click{
    cursor: pointer;
  }
  #present{
    color: $brown;
    border-bottom: 3px solid $brown;
  }
  span{
    font-weight: bold;
  }
  .container{
    display: flex;
    align-items: stretch;
  }
  #info{
    margin-left: 30px;
    font-size: 20px;
    line-height: 50px;
  }
  #datail{
    overflow: hidden;
    width: 100%;
    h4{
      text-align: left;
      margin-left: 50px;
      margin-top: 50px;
    }
  }
  #write{
    height: 270px;
    margin-top: 50px;
    background-color: rgb(228, 220, 220);
    text-align: center;
    button{
      position: absolute;
      margin-top: 65px;
      color: white;
      background-color: $black;
      height: 50px;
      width: 130px;
    }
    textarea{
      margin-right: 20px;
    }
    img{
      margin-right: 830px;
    }
  }
  #cont{
    margin-right: 115px;
    textarea{
      resize: none;
    }
  }
  #review{
    float: left;
    width: 100%;
    margin-top: 20px;
    background-color: rgb(228, 220, 220);
    border: 3px solid silver;
  }
  #con{
    margin-top: 20px;
    margin-left: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
    color: $black;
  }
  #user{
    margin-top: 20px;
  }
  #name{
    font-size: 25px;
  }
  #date{
    color: rgba(104, 100, 100, 0.877);
  }
</style>