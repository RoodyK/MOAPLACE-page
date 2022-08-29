<template>
  <div>
    <AppHeader/>
    <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
    <div id=wrap>
      <div id=filter>
        <div class="containers" id="filtertop">
          <div id="year">
            <button @click="prev">〈</button>
            <span>{{select_year}}</span>
            <button @click="next">〉</button>
          </div>
          <div class="top_right">
            <div class="btn_box">
              <label class="mybtn">
                <input type="radio" name="period" class="all" @click="all">
                <span>전체</span>
              </label>
              <label class="mybtn">
                <input type="radio" name="period" @click="week" checked>
                <span>이번주</span>
              </label>
              <label class="mybtn">
                <input type="radio" name="period" @click="next_week">
                <span>다음주</span>
              </label>
              <label class="mybtn">
                <input type="radio" name="period" @click="month">
                <span>1개월</span>
              </label>
              <label class="mybtn">
                <input type="radio" name="period" @click="three_month">
                <span>3개월</span>
              </label>
            </div>
            <div class="search">
              <input type="text" class="search_input" placeholder="공연명 검색">
              <button class="search_btn"/>
            </div>
          </div>
        </div>
        <div class="containers">
          <table>
            <tr>
              <td rowspan="2" id="calendar">
                <input type="date" v-model="start_date" @change="list">
                -
                <input type="date" v-model="end_date" :min="start_date" @change="list">
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
                    <div><input type="checkbox" value="all" v-model="hall_all" @change="hall_change2"> 전체</div>
                    <div><input type="checkbox" value="1" v-model="hall_another1" @change="hall_change1"> 모던홀</div>
                    <div><input type="checkbox" value="2" v-model="hall_another2" @change="hall_change1"> 오케스트라홀</div>
                    <div><input type="checkbox" value="3" v-model="hall_another3" @change="hall_change1"> 아트홀 </div>
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
                    <div><input type="checkbox" value="all" v-model="categoty_all" @change="categoty_change2"> 전체</div>
                    <div><input type="checkbox" value="1" v-model="categoty_another1" @change="categoty_change1"> 연극</div>
                    <div><input type="checkbox" value="2" v-model="categoty_another2" @change="categoty_change1"> 뮤지컬</div>
                    <div><input type="checkbox" value="3" v-model="categoty_another3" @change="categoty_change1"> 대중음악</div>
                    <div><input type="checkbox" value="4" v-model="categoty_another4" @change="categoty_change1"> 기악</div>
                    <div><input type="checkbox" value="5" v-model="categoty_another5" @change="categoty_change1"> 성악</div>
                    <div><input type="checkbox" value="6" v-model="categoty_another6" @change="categoty_change1"> 오페라</div>
                    <div><input type="checkbox" value="7" v-model="categoty_another7" @change="categoty_change1"> 무용</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div id="list" v-if="show_list.length!=0">
        <div class="show" v-for="show in show_list" :key="show.show_num">
          <div class="img">
            <div class="pop" v-if="show.show_check=='Y'">
              <button class="left">예매</button>
              <button class="right">상세</button>
            </div>
            <div class="pop" v-else>
              <button class="right">상세</button>
            </div>
            <img :src="show.show_thumbnail" >
          </div>
          <h6 class="play" v-if="show.genre_num==1">연극</h6>
          <h6 class="musical" v-else-if="show.genre_num==2">뮤지컬</h6>
          <h6 class="music" v-else-if="show.genre_num==3">대중음악</h6>
          <h6 class="instrument" v-else-if="show.genre_num==4">기악</h6>
          <h6 class="opera" v-else-if="show.genre_num==5">성악</h6>
          <h6 class="dance" v-else-if="show.genre_num==6">오페라</h6>
          <h6 class="vocal" v-else-if="show.genre_num==7">무용</h6>
          <h5>{{show.show_name}}</h5>
        </div>
      </div>
      <div class="list_null" v-else>
        <h6>등록된 공연이 없습니다.</h6>
      </div>
      <ul class="paging">
        <li
          :class="{active: pageutil.startPageNum > 1}"
          @click="changePage('prev',$event)">
          [이전]
        </li>
        <li 
          v-for="num in pageNumbers"
          :key="num"
          @click="movePage(num)"
          :class="{active: pageutil.pageNum == num}">
          {{num}}
        </li>
        <li
          :class="{active: pageutil.endPageNum < pageutil.totalPageCount}"
          @click="changePage('next',$event)">
          [다음]
        </li>
      </ul>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import axios from '@/axios/axios.js'

export default {
  name:"ShowListView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data(){
    return{
      show_list:[],
      pageutil:[],
      pageNumbers:[],

      select_year:new Date().getFullYear(),

      today:`${new Date().getFullYear()}-${new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate() }`,
      start_date:`${new Date().getFullYear()}-${new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate() }`,
      end_date:`${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate()}`,
      
      hall_all:true, hall_another1:false, hall_another2:false, hall_another3:false,
      categoty_all:true, categoty_another1:false, categoty_another2:false, categoty_another3:false, categoty_another4:false, categoty_another5:false, categoty_another6:false, categoty_another7:false,

      pagenum:1
    }
  },
  created(){
    this.list();
  },
  methods: {
    list(){
      axios.get(`/moaplace.com/preview/${this.pagenum}/${this.start_date}/${this.end_date}`)
        .then((resp) => {
          this.show_list = resp.data.list;
          this.pageutil = resp.data.pageUtil;
          this.getPageNumber();
        }
      )
    },
    next(){
      this.select_year++;
      document.querySelector(".all").checked=true;
      this.start_date=this.select_year+"-01-01";
      this.end_date=this.select_year+"-12-31";
      this.list();
    },
    prev(){
      this.select_year--;
      document.querySelector(".all").checked=true;
      this.start_date=this.select_year+"-01-01";
      this.end_date=this.select_year+"-12-31";
      this.list();
    },
    all(){
      this.select_year=new Date().getFullYear();
      this.start_date=new Date().getFullYear()+"-01-01";
      this.end_date=new Date().getFullYear()+"-12-31";
      this.list();
    },
    week(){
      this.select_year=new Date().getFullYear();
      this.start_date=this.today;
      this.end_date=`${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(7 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(7 * 24 * 3600 * 1000)).getDate()}`;
      this.list();
    },
    next_week(){
      this.select_year=new Date().getFullYear();
      this.start_date=`${new Date(Date.now()+(8 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(8 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(8 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(8 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(8 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(8 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(8 * 24 * 3600 * 1000)).getDate()}`;
      this.end_date=`${new Date(Date.now()+(14 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(14 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(14 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(14 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(14 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(14 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(14 * 24 * 3600 * 1000)).getDate()}`;
      this.list();
    },
    month(){
      this.select_year=new Date().getFullYear();
      this.start_date=this.today;
      this.end_date=`${new Date(Date.now()+(30 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(30 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(30 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(30 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(30 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(30 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(30 * 24 * 3600 * 1000)).getDate()}`;
      this.list();
    },
    three_month(){
      this.select_year=new Date().getFullYear();
      this.start_date=this.today;
      this.end_date=`${new Date(Date.now()+(90 * 24 * 3600 * 1000)).getFullYear()}-${new Date(Date.now()+(90 * 24 * 3600 * 1000)).getMonth()+1 < 10 ? `0${new Date(Date.now()+(90 * 24 * 3600 * 1000)).getMonth()+1}` : new Date(Date.now()+(90 * 24 * 3600 * 1000)).getMonth()+1}-${new Date(Date.now()+(90 * 24 * 3600 * 1000)).getDate() < 10 ? `0${new Date(Date.now()+(90 * 24 * 3600 * 1000)).getDate()}` : new Date(Date.now()+(90 * 24 * 3600 * 1000)).getDate()}`;
      this.list();
    },
    hall_change1(){
      this.hall_all=false;
    },
    hall_change2(){
      if(this.hall_all==true){
        this.hall_another1=false;
        this.hall_another2=false;
        this.hall_another3=false;
      }
    },
    categoty_change1(){
      this.categoty_all=false;
    },
    categoty_change2(){
      if(this.categoty_all==true){
        this.categoty_another1=false;
        this.categoty_another2=false;
        this.categoty_another3=false;
        this.categoty_another4=false;
        this.categoty_another5=false;
        this.categoty_another6=false;
        this.categoty_another7=false;
      }
    },
    getPageNumber(){
      this.pageNumbers = [];
      for(let i = this.pageutil.startPageNum; i <= this.pageutil.endPageNum; i++){
        this.pageNumbers.push(i);
      }
    },
    changePage(where , e){
      if(e.target.classList.contains('active')){
        this.pagenum=1;

        if(where == 'prev'){
          this.pagenum = this.pageutil.startPageNum -1; 
        }
        else if(where == 'next'){
          this.pagenum = this.pageutil.endPageNum +1;
        }
        else{
          return;
        }
          
        this.movePage(this.pagenum);
        }
    },
    movePage(pagenum){
      axios.get(`/moaplace.com/preview/${pagenum}/${this.start_date}/${this.end_date}`)
      .then((resp) => {
        this.show_list = resp.data.list;
        this.pageutil = resp.data.pageUtil;
        this.getPageNumber();
        }
      )
    }
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
    align-items: center;
  }
  #year{
    font-size: 30px;
    color: $brown;
    display: flex;
    align-items: center;
    font-weight: bold;
    button{
      color: $brown;
      border: none;
      background-color: #fff;
      font-size: 20px;
    }
    span{
      padding: 0 24px;
    }
  }
  a{
    text-decoration: none;
    color: $black;
  }
  td{
    border: 1px solid rgba($black, 0.5);
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    position: relative;
    .show{
      margin-top: 25px;
      h5{
        font-size: 22px;
        font-weight: bold;
      }
      h6{
        width: 70px;
        text-align: center;
        margin-top: 16px;
        padding: 4px 0;
        font-weight: bold;
      }
      .img{
        width: 100%;
        height: 368px;
        overflow: hidden;
        position: relative;
      }
      .pop{
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(black, 0.6);
        opacity: 0;
        transition: 0.3s;
        button {
          padding: 24px;
          border-radius: 50%;
          border: 1px solid #fff;
        }
        &:hover {
          opacity: 1;
        }
        .left{
          background-color: #fff;
          color: rgba(black, 0.6);;
          margin-right: 4px;
        }
        .right{
          background-color: rgba(black, 0.6);;
          color: #fff;
          margin-left: 4px;
        }
      }
    }
    img{
        width: 100%;
    }
  }
  .search{
    position: relative;
    height: 42px;
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
    background-color: #f5f6f9;
    td{
      border-right: 0;
      height: 50px;
      vertical-align: middle;
    }
    #calendar{
      width: 33%;
      text-align: center;
      border-left: 0;
      input{
        border: none;
        color: $brown;
        font-size: 20px;
        font-weight: bold;
        background-color: #f5f6f9;
        width: 145px;
        outline: none;
      }
    }
  }
  #pinicon, #micicon{
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
      font-weight: bold;
  }
  .category_cont{
    margin-left: 16px;
    display: flex;
    padding-right: 10px;
    div{
      margin-right: 23px;
      input{
        vertical-align: middle;
      }
    }
  }
  .btn_box{
    display: flex;
    margin-right: 16px;
    input[type="radio"] {
      display: none;
    }
    input[type="radio"] + span {
      display: inline-block;
      padding: 8px 16px;
      border: 1px solid $black;
      border-width: 1px 1px 1px 0;
      text-align: center;
      cursor: pointer;
      width: 115px;
    }
    input[type="radio"]:checked + span {
      background-color: $brown;
      width: 115px;
      color: white;
      transition: 0.3s;
    }
    .mybtn{
      &:first-child{
        span{
          border-left: 1px solid $black;
        }
      }
    }
  }
  .top_right{
    display: flex;
  }
  .paging {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 32px;
    li {
      margin: 0 6px;
      padding: 0 6px;
      user-select: none;
      cursor: pointer;
      &.active{
        color: #D67747;
        font-weight: bold;
      }
      &:first-child,
      &:last-child {
        color: rgba($black, 0.5);
        font-weight: bold;  
        cursor: auto;
        &.active{
          color: $brown;
          cursor: pointer;
        }
      }
    }
  }
  .list_null{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 24px;
    h6{
      font-weight: bold;
    }
  }
</style>