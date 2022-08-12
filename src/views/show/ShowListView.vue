<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /> 
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />  
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />  
  <div id=wrap>
    <div id=nav>
      <div id=present class="click">
        공연목록
      </div>
      <div class="click">
        월간일정
      </div>
    </div>
    <div id=filter>
      <div class="container" id="filtertop">
        <div id="year">
          <a href="">〈</a>
          2022
          <a href="">〉</a>
        </div>
        <div>
          <button class="btn">전체</button>
          <button class="btn">이번주</button>
          <button class="btn">다음주</button>
          <button class="btn">1개월</button>
          <button class="btn">3개월</button>
        </div>
        <div>
          <input type="text" id="search" placeholder="⌕ 공연명 검색">
        </div>
      </div>
      <div class="container">
        <table>
          <tr>
            <td rowspan="2">
              <span class="material-symbols-outlined" id="calicon">
                calendar_month
              </span>
              <span id="caltext"> 2022-08-06 - 2022-08-10</span>
            </td>
            <td>
              <span class="material-symbols-outlined" id="pinicon">
                pin_drop
              </span>
              <span>장소 | </span>
              <input type="checkbox" checked> 전체
              <input type="checkbox"> 모던홀
              <input type="checkbox"> 오케스트라홀
              <input type="checkbox"> 아트홀
            </td>
          </tr>
          <tr>
            <td>
              <span class="material-symbols-outlined" id="micicon">
                biotech
              </span>
              <span>장르 | </span>
              <input type="checkbox" checked> 전체
              <input type="checkbox"> 연극
              <input type="checkbox"> 뮤지컬
              <input type="checkbox"> 대중음악
              <input type="checkbox"> 기악
              <input type="checkbox"> 오페라
              <input type="checkbox"> 무용
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id=list class="container">
      <div>
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
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
@import '../../scss/common.scss';
  #wrap{
    width: $width;
    margin: 0 auto;
  }
  .click{
    cursor: pointer;
  }
  #present{
    color: $brown;
    border-bottom: 3px solid $brown;
  }
  .container{
    display: flex;
    justify-content: space-between;
  }
  #year{
    font-size: 30px;
    color: $brown;
    a{
      color: $brown;
      margin: 20px;
    }
  }
  a{
    text-decoration: none;
    color: $black;
  }
  img{
    width: 225px;
    height: 350px;
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div{
      margin-top: 25px;
    }
  }
  #nav {
    div{
      float: left;
      width: 50%;
      text-align: center;
    }
  }
  #page{
    margin-top: 25px;
    text-align: center;
    a{
      padding: 15px;
    }
  }
  #filter{
    padding-top: 50px;
    button{
      color: $brown;
      background-color: white;
      border: 2px solid $brown;
      width: 100px;
    }
  }
  #search{
    width: 300px;
    height: 40px;
  }
  table{
    margin-top: 20px;
    width: 100%;
    td{
      height: 50px;
    }
  }
  #calicon, #pinicon, #micicon{
    color: $brown;
  }
  #caltext{
    color: $brown;
    font-size: 20px;
  }
</style>