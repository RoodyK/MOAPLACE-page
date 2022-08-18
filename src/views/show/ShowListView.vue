<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /> 
  <AppHeader/>
  <SideVisual menu="SHOW / TICKET" img="show"/>
  <div id=wrap>
    <div id=filter>
      <div class="containers" id="filtertop">
        <div id="year">
          <a href="#" @click="prev">〈</a>&nbsp;
          {{now_year}}&nbsp;
          <a href="#" @click="next">〉</a>
        </div>
        <div class="btn_box">
          <label class="mybtn">
            <input type="radio" name="period">
            <span>전체</span>
          </label>
          <label class="mybtn">
            <input type="radio" name="period">
            <span>이번주</span>
          </label>
          <label class="mybtn">
            <input type="radio" name="period">
            <span>다음주</span>
          </label>
          <label class="mybtn">
            <input type="radio" name="period" checked>
            <span>1개월</span>
          </label>
          <label class="mybtn">
            <input type="radio" name="period">
            <span>3개월</span>
          </label>
        </div>
        <div class="search">
          <input type="text" class="search_input" placeholder="공연명 검색">
          <button class="search_btn"/>
        </div>
      </div>
      <div class="containers">
        <table>
          <tr>
            <td rowspan="2" id="calendar">
              <span class="material-symbols-outlined" id="calicon">
                calendar_month
              </span>
              <span id="caltext"> 2022-08-06 - 2022-08-10</span>
            </td>
            <td>
              <div class="category_box">
                <div class="category_title">
                  <span class="material-symbols-outlined" id="pinicon">
                    pin_drop
                  </span>
                  장소
                </div>
                <div class="category_cont">
                  <div>
                    <input type="checkbox" checked> 전체
                  </div>
                  <div>
                    <input type="checkbox"> 모던홀
                  </div>
                  <div>
                    <input type="checkbox"> 오케스트라홀
                  </div>
                  <div>
                    <input type="checkbox"> 아트홀
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="category_box">
                <div class="category_title">
                  <span class="material-symbols-outlined" id="micicon">
                    biotech
                  </span>
                  장르
                </div>
                <div class="category_cont">
                  <div>
                    <input type="checkbox" checked> 전체
                  </div>
                  <div>
                    <input type="checkbox"> 연극
                  </div>
                  <div>
                    <input type="checkbox"> 뮤지컬
                  </div>
                  <div>
                    <input type="checkbox"> 대중음악
                  </div>
                  <div>
                    <input type="checkbox"> 기악
                  </div>
                  <div>
                    <input type="checkbox"> 오페라
                  </div>
                  <div>
                    <input type="checkbox"> 무용
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id=list>
      <div class="show">
        <div class="pop">
          <a href="">예매</a>
          <a href="">상세</a>
        </div>
        <img src="../../assets/smile.jpg">
        <h6 class="play">연극</h6>
        <h5>웃는남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="musical">뮤지컬</h6>
        <h5>우는남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="music">대중음악</h6>
        <h5>화난남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="instrument">기악</h6>
        <h5>슬픈남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="opera">오페라</h6>
        <h5>상남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="dance">무용</h6>
        <h5>중남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="vocal">성악</h6>
        <h5>하남자</h5>
      </div>
      <div>
        <img src="../../assets/smile.jpg">
        <h6 class="musical">뮤지컬</h6>
        <h5>그남자</h5>
      </div>
    </div>
    <div id=page>
      <a href="">◀이전</a>
      <a href="">1</a>
      <a href="">2</a>
      <a href="">3</a>
      <a href="">4</a>
      <a href="">5</a>
      <a href="">다음▶</a>
    </div>
  </div>
  <AppFooter/>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  name:"ShowListView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data(){
    return{
      now_year:new Date().getFullYear(),
      now_date:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
      plus_week:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().setDate(new Date().getDate()+7),
      plus_month:new Date().getFullYear()+"-"+(new Date().getMonth()+2)+"-"+new Date().getDate(),
      plus_3month:new Date().getFullYear()+"-"+(new Date().getMonth()+4)+"-"+new Date().getDate()
    }
  },
  methods: {
    next(){
      this.now_year++;
    },
    prev(){
      this.now_year--;
    },
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
  .containers{
    display: flex;
    justify-content: space-between;
  }
  #year{
    font-size: 30px;
    color: $brown;
    a{
      color: $brown;
    }
  }
  a{
    text-decoration: none;
    color: $black;
  }
  td{
    border: 1px solid $brown;
  }
  h6{
    width: 70px;
    text-align: center;
    margin-top: 5px;
  }
  .play{
    border: 1px solid #FECB65;
    color: #FECB65;
  }
  .musical{
    border: 1px solid #FF3399;
    color: #FF3399;
  }
  .music{
    border: 1px solid #C390FB;
    color: #C390FB;
  }
  .instrument{
    border: 1px solid #FC932A;
    color: #FC932A;
  }
  .opera{
    border: 1px solid #3E3E3F;
    color: #3E3E3F;
  }
  .dance{
    border: 1px solid #1875D0;
    color: #1875D0;
  }
  .vocal{
    border: 1px solid #C9778B;
    color: #C9778B;
  }
  #list {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    div{
      margin-top: 25px;
      width: calc((100% - (24px * 3)) / 4);
    }
    img{
        width: 100%;
      }
    .show{
      position: relative;
      .pop{
        width: 100%;
        height: 100%;
        position: absolute;
        display: none;
        background-color: orange;
        &:hover {
        display: block;
        background-color: red;
        }
      }
    }
  }
  #page{
    margin-top: 25px;
    text-align: center;
    a{
      padding: 15px;
    }
  }
  .search{
    position: relative;
    .search_input{
      width: 300px;
      height: 100%;
      padding-right: 30px;
      padding-left: 10px;
    }
    .search_btn{
      position: absolute;
      height: 100%;
      width: 10%;
      right: 0;
      border: none;
      background: url(@/assets/moaplace/search.png) no-repeat center;
    }
  }
  
  table{
    margin-top: 30px;
    width: 100%;
    td{
      height: 50px;
      vertical-align: middle;
    }
    #calendar{
      width: 33%;
      text-align: center;
    }
  }
  #calicon, #pinicon, #micicon{
    vertical-align: middle;
  }
  .category_box{
    width: 100%;
    display: flex;
  }
  .category_title{
      border-right: 2px solid $brown;
      color: $brown;
      margin-left: 10px;
      padding-right: 10px;
  }
  .category_cont{
    margin-left: 10px;
    display: flex;
    padding-right: 10px;
    div{
      margin-right: 32px;
      input{
        vertical-align: middle;
      }
    }
  }
  #caltext{
    color: $brown;
    font-size: 24px;
    vertical-align: middle;
    font-weight: bold;
  }
  
  .btn_box{
    display: flex;
    input[type="radio"] {
      display: none;
    }
    input[type="radio"] + span {
      display: inline-block;
      padding: 8px 16px;
      border: 1px solid $black;
      text-align: center;
      cursor: pointer;
      margin-right: 10px;
    }
    input[type="radio"]:checked + span {
      background-color: $brown;
      color: white;
    }
  }
</style>