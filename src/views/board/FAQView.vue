<template>
  <AppHeader/>
  <SideVisual menu="CUSTOMER SERVICE" img="cs"/>

  <div class="app">
    <h2 class="title">자주 묻는 질문(FAQ)</h2>
    <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

    <!-- 상단 메뉴 -->
    <div class="headerBox">
      <select>
        <option value=""> 전체 </option>  
        <option name="faq_sort" value="공연">공연 관련</option>
        <option name="faq_sort" value="대관">대관 관련</option>
        <option name="faq_sort" value="예매">예매 관련</option>
        <option name="faq_sort" value="관람">관람 관련</option>
        <option name="faq_sort" value="회원">회원 관련</option>
        <option name="faq_sort" value="기타">기타</option>
      </select>

      <div class="searchBox">
        <div class="custom-search">
          <input type="text" class="custom-search-input" placeholder="검색어를 입력하세요."> 
        </div>
        <!-- 문의하기 버튼 -->
        <button class="qnaBtn" @click="$router.push({name:'qnaInsert'})"> 1:1문의 </button>
      </div>
    </div>

    <!-- 메인 리스트 -->
    <div class="faq_main" v-for="(item, id) in items" :key="id" :class="{active:item.isActive}" @click="isMatch(id)">
      <div class="faq_title" @click="item.open=!item.open">
        <span>{{item.num}}</span><span>{{item.sort}} 관련 </span><span class="title">{{item.title}}</span>
        <span class="arrow"><img src="../../assets/board/arrow.png"></span>
      </div>
      
      <div class="faq_content" v-if="item.open">
        {{item.content}}
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
              <li class="page-item"><a class="page-link" href="">1</a></li>
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
  
  <AppFooter/>

</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  width: $width;
  display:flex;
  flex-direction: column;
  color: $black;
  margin: 50px auto;

    h2.title{
      font-size: 32px;
      text-align: center;
      margin-top: 32px;
      & + p{
        text-align: center;
        margin-bottom: 64px;
      }
    }

  // 상단 메뉴
  .headerBox {
    display:flex;
    justify-content: space-between;
    margin-bottom: 10px;

    select {
      width:150px;
      height:50px;
      border-color: #ccc;
      padding:0 28px 0 15px;
      -webkit-appearance:none;
      appearance:none;
      background:url('../../assets/board/arrow.png') no-repeat 95% 50%/20px auto;
    }

    .custom-search {
      width: 300px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      opacity: 1;
    }
    .custom-search-input {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 10px 50px 10px 20px;
      outline: none;
      background-image: url(../../assets/board/search.png);
      background-position: 260px center;
      background-size: 25px 25px;
      background-repeat: no-repeat;
      padding-left: 20px;
      box-sizing: border-box;
      outline: none;      
    }

    .searchBox{
      display:flex;

      .qnaBtn {
        background-color:$brown;
        padding: 0 32px;
        height:50px;
        border: none;
        margin-left:16px;
        color:white;
        transition: all 0.3s;

        &:hover {
          border: 1px solid $brown;
          background-color: white;
          color:$brown;
        }
      }
    }
  }

  // 메인 리스트
  .faq_main{
    width:1100px;
    color:$black;
    border: 1px solid #ccc;
    margin-top:-1px;

    .faq_title {
      width:100%;
      padding: 25px;
      text-align: left;
    
      &:hover{
        background-color:rgb(249,249,249);
        cursor: pointer;

        .title {
          color:#D67747;
        }
      }
      span {
        margin:20px 50px;
      }
      .title {
        font-weight: bold;
      }
      .arrow{
        img {
          width: 25px;
          height: 20px;
          float:right;
          margin-right:50px;
        }
      }
    }

    .faq_content {
      background-color:rgb(243, 241, 241);
      padding: 50px;
    }
  }
  .faq_main.active {
    .faq_title {
      .title{
        color:#D67747;
      }
    }
    .arrow {
      img {
        transform: rotate(-180deg);
        transition: all 0.3s;
      }
    }
  }

  // 페이징 
  #mypaging{
    display: flex;
    justify-content: center;
    margin-top:15px;

    ul,li,a,span {
      color: $black;
      border:none;
    }
  }

  // 문의하기 버튼
  .btnGroup{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;


  }
}
</style>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
    components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data(){
    return{
      items:[{num:'5',sort:'예매',title:'예매 내역은 어떻게 확인할 수 있나요?', content:'회원 로그인 후 마이페이지 예매내역 조회페이지에서 확인하실 수 있습니다.', open:false, isActive:false},
             {num:'4',sort:'관람',title:'공연 시작 몇 분 전부터 입장 가능한가요?', content:'일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다. 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.', open:false, isActive:false},
             {num:'3',sort:'관람',title:'공연장 내에 음식물 반입이 가능한가요?', content:'음식물은 일체 반입 금지되어 있습니다. 음식물은 공연장 밖에서 다 드신 후 객석으로 입장해 주시기 바랍니다.', open:false, isActive:false},
             {num:'2',sort:'관람',title:'공연 시작 몇 분 전부터 입장 가능한가요?', content:'일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.', open:false, isActive:false},
             {num:'1',sort:'관람',title:'공연 시작 몇 분 전부터 입장 가능한가요?', content:'일반적으로 공연시작 30분 전부터는 객석에 입장이 가능하며, 원활한 공연 진행을 위해 늦어도 공연시작 10분 전까지는 입장하여 주시기 바랍니다.', open:false, isActive:false}]
    }
  },
  methods:{
    isMatch(id){
      if(this.items[id].isActive){
        this.items[id].isActive = false;
      }else {
        this.items[id].isActive = true;
      }
    }
  }
}
</script>
