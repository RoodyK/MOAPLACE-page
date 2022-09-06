<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="일정정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">일정정보</h2>
                <div class="list-top">
                  <div class="select-list">

                    <!-- 공연상태별 모아보기 셀렉트박스 -->
                    <label for="status">공연상태</label>
                    <select v-model="status" @change="selectStatus()">
                        <option v-for="(item,index) in statusList" :key="index" :value="item.status" id="status">{{item.statusName}}</option>
                    </select>
                  </div>

                  <!-- 검색항목 셀렉트박스 -->
                    <div class="search-list">
                      <select v-model="selectField">
                        <option v-for="(item,index) in fieldList" :key="index" :value="item.field">{{item.fieldName}}</option>
                      </select>
                      <input type="text" :value="search" placeholder="검색어를 입력하세요.">
                      <button @click="inputSearch($event)">
                          검색
                          <i class="material-icons">
                              search
                          </i>
                      </button>
                      <button class="insertBtn" @click='goInsert'>일정등록</button>
                    </div>
                </div>
                  <div class="list">
                      <div class="t-row thead">
                          <p>공연번호</p>
                          <p>공연날짜</p>
                          <p>공연명</p>
                          <p>공연횟수</p>
                          <p>공연상태</p>
                          <p>수정</p>
                  </div>
                        <div v-for="(item,index) in list" :key="index" class="t-row tbody">
                            <p @click="viewDetail(item.num,item.showDate)">{{item.num}}</p>
                            <p @click="viewDetail(item.num,item.showDate)">{{item.showDate}}</p>
                            <p @click="viewDetail(item.num,item.showDate)">{{item.title}}</p>
                            <p @click="viewDetail(item.num,item.showDate)">{{item.cntDate}}</p>
                            <p @click="viewDetail(item.num,item.showDate)">{{item.status=='Y'?'진행중':'종료'}}</p>
                            <p><button @click="updateDetail(item.num,item.showDate)">수정</button></p>
                        </div>
                        <ul class="paging">
                            
                            <li @click="prevPage()" :class="{active : this.pageNum > 1}">
                              [이전]</li>
                            
                            <li v-for="item in pageNums" :key="item" @click="movePage(item)" :class="{active : this.pageNum==item}" >
                              {{item}}</li>
                            
                            <li @click="nextPage()" :class="{active : this.pageNum < pageInfo.totalPageCount}">
                              [다음]</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
</template>
    <script>
        import SideMenu from '@/components/admin/SideMenu.vue'
        import axios from '@/axios/axios.js';
        export default {
            components: {
                SideMenu
            },
            data() {
                return {
                    
                    status: '',
                    statusList:[
                        {status: 'all', statusName: '전체'},
                        {status: 'Y', statusName: '진행중'},
                        {status: 'N', statusName: '종료'}
                    ],

                    selectField: '',
                    fieldList:[
                        {field: 'title',fieldName:'공연명'},
                        {field: 'showNum',fieldName:'공연번호'}
                    ],
                    
                    search:'',
                    pageNum:'',
                    list: [],
                    pageInfo:[],
                    pageNums:[],
                    selectDate:''

                }
            },
            mounted(){

              this.viewList(
              this.$route.params.pageNum,
              this.$route.params.status,
              this.$route.params.selectField,
              this.$route.params.search);

            },
            methods:{

              stop(e) {
                e.stopPropagation()
              },

              goInsert(){

                this.$router.push({
                  name:'adminShowScheduleInsert',
                  params:{
                    pageNum:this.pageNum,
                    status:this.status,
                    field:this.selectField,
                    search:this.search
                    }
                  })

              },

              pageNumbering(){
                
                this.pageNums.splice(0);
                
                for(let i = this.pageInfo.startPageNum; i <= this.pageInfo.endPageNum; i++){
                    this.pageNums.push(i);
                }
              },

              movePage(pNum){
                axios.get('/moaplace.com/admin/show/schedule/list/' + pNum + '/'
                  + this.status + '/' 
                  + this.selectDate + '/' 
                  + this.selectField + '/' + this.search).
                  then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering();
                }.bind(this))
              },

              prevPage(){
                if(this.pageNum > 1){
                  this.movePage(this.pageNum-1);
                }
              },

              nextPage(){
                if(this.pageNum < this.pageInfo.endPageNum){
                  this.movePage(this.pageNum+1);
                }
              },

              viewDetail(num,date){
                this.$router.push(
                  {
                    name:'adminShowScheduleDetail',
                    params:{
                      showNum:num,
                      showDate:date,
                      pageNum:this.pageNum,
                      status:this.status,
                      selectDate:this.selectDate,
                      field:this.selectField,
                      search:this.search,
                      }});
              },

              updateDetail(num,date){
                this.$router.push(
                  {
                    name:'adminShowScheduleUpdate',
                    params:{
                      showNum:num,
                      showDate:date,
                      pageNum:this.pageNum,
                      status:this.status,
                      selectDate:this.selectDate,
                      field:this.selectField,
                      search:this.search}});
              },

              inputSearch(e){
                // 부모의 바로 이전 형제 요소 가져오기(input)
                this.search=e.target.parentNode.previousSibling.value;
                
                axios.get('/moaplace.com/admin/show/schedule/list/' + 1 +'/' 
                  + this.status + '/'  + this.selectDate + '/' + this.selectField + '/' + this.search).
                  then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering();

                }.bind(this))
              },

              selectStatus(){
                axios.get('/moaplace.com/admin/show/schedule/list/' + 1 + '/' 
                  + this.status + '/'  + this.selectDate + '/' + this.selectField + '/' + this.search).
                  then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering(); 
                }.bind(this))
              },

              viewList(pageNum,status,field,search){

                if(pageNum!=null)this.pageNum = pageNum;
                if(status!=null)this.status = status;
                if(field!=null)this.selectField = field;
                if(search!=null)this.search = search;

                axios.get('/moaplace.com/admin/show/schedule/list/' 
                  + this.pageNum + '/' 
                  + this.status + '/' 
                  + this.selectDate + '/' 
                  + this.selectField + '/' + this.search)

                .then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering();

                }.bind(this))
              }
            }
        }
</script>
    <style lang="scss" scoped="scoped">
        @import "@/scss/common.scss";
        nav {
            display: none !important;
        }
        * {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        // 관리자 페이지 레이아웃 관련 시작------------------
        #wrap {
          padding-left: 240px;
          background: #f7f9fa;
          #main {
            width: 100%;
            min-height: 100vh;
            padding: 32px;
            box-sizing: border-box;
            .inner {
              width: $width;
              min-height: 650px;
              margin: 0 auto;
              border: 1px solid rgba($black, 0.5);
              background: #fff;
              padding: 32px;
              h2.title {
                font-size: 24px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba($black, 0.5);
                margin-bottom: 16px;
              }
            }
            // 관리자 페이지 레이아웃 관련 끝------------------
            .list-top {
                width: 100%;

                margin-bottom: 16px;
                position: relative;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                .select-list{
                  
                  display: flex;
                  justify-content: flex-start;
                  label{
                    display: flex;
                    font-size: 16px;
                    align-items: center;
                  }
                  select{
                    display: flex;
                    justify-content: flex-start;
                    margin-left:16px;
                    padding: 0 8px;
                    font-size: 16px;
                    &:focus{
                          outline-color: $black;
                      }

                  }
                }
                .search-list{
                  
                  display: flex;
                  flex-direction: left;
                  
                  button,
                  select {
                      border: none;
                  }
                  select {
                      position: absolute;
                      top: 8px;
                      right: 320px;
                      border-right: 1px solid #ddd;
                      font-size: 16px;
                      padding: 2px 8px 0 0;
                      &:focus{
                          outline: none;
                      }
                  }

                  button {
                      background: transparent;
                      font-size: 0;
                      position: absolute;
                      top: 8px;
                      right: 128px;
                      color: rgba($black, 0.9);
                  }
                  input {
                      width: 300px;
                      box-sizing: border-box;
                      font-size: 16px;
                      height: 40px;
                      padding: 4px 32px 4px 110px;
                      &:focus{
                          outline-color: $black;
                      }
                  }
                  .insertBtn {
                      background-color: $black;
                      color: white;
                      font-size: 16px;
                      width: 104px;
                      position: unset;
                      margin-left: 16px;
                      padding: 8px 0;
                  }
              }
            }
            .list {
              text-align: center;
              .t-row {
                display: flex;
                flex-flow: row wrap;
                padding: 8px 0;
                font-size: 16px;
                &.thead {
                  background: $black;
                  color: #fff;
                    > & :first-child{
                    width:10%;
                  }
                  > & :nth-child(3){
                    width:calc(100%/3.4);
                  }
                  > & :last-child{
                    width:10%;
                  }
                }
                &.tbody {
                  padding: 16px 0;
                  border-bottom: 1px solid rgba($black, 0.2);
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  &:hover {
                    background: #eee;
                  }
                  select {
                    border: 1px solid #333;
                    padding: 4px;
                  }
                  &:p{
                    display: flex;
                    align-items: center;
                    text-align: center;
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    padding: 4px;
                  }
                  > & :first-child{
                    width:10%;
                  }
                  > & :nth-child(3){
                    width:calc(100%/3.4);
                  }
                  > & :last-child{
                    width:10%;
                    display: flex;
                    justify-content: center;
                    >& button{
                      background-color: rgb(250, 250, 250);
                      border: 1px solid rgba(51, 51, 51, 0.2);
                      padding: 4px 40px 4px 40px;
                      display: flex;
                      justify-content: center;
                    }
                  }
                }
                & > p,
                div {
                  width: calc(100% /6);
                  text-align: center;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  & {
                    padding-top: 4px;
                  }
                }
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
            }
          }
        }
    </style>