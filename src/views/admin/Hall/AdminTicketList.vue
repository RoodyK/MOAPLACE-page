<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="예매정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">예매관리</h2>
                <div class="list-top">
                    <div class="select-list">

                      <!-- 결제상태별 모아보기 셀렉트박스-->
                    <label for="status">결제상태</label>
                    <select v-model="status" @change="selectStatus()">
                        <option v-for="item in statusList" :key="item" :value="item" id="status">{{item}}</option>
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
                    </div>
                </div>
                    <div class="list">
                        <div class="t-row thead">
                            <p>예매번호</p>
                            <p>회원아이디</p>
                            <p>공연제목</p>
                            <p>공연날짜</p>
                            <p>공연시간</p>
                            <p>결제금액</p>
                            <p>결제일</p>
                            <p>결제상태</p>
                        </div>
                        <div v-for="item in list" :key="item.num" class="t-row tbody" @click="bookingDetail(item.bookingNum,item.memberId,item.showName)">
                          <p>{{item.bookingNum}}</p>
                          <p>{{item.memberId}}</p>
                          <p>{{item.showName}}</p>
                          <p>{{item.scheduleDate}}</p>
                          <p>{{item.scheduleTime}}</p>
                          <p>{{item.bookingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
                          <p>{{item.bookingDate}}</p>
                          <p>{{item.status}}</p>
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
                  list: [],
                  pageNum:'',
                  status: '',
                  statusList:['전체','입금대기','결제완료','결제취소'],
                  selectField: '',
                  fieldList:[
                    {field: 'b.booking_num',fieldName:'예매번호'},
                    {field: 'member_id',fieldName:'회원아이디'},
                    {field: 'sh.show_name',fieldName:'공연제목'},
                    {field: 'b.regdate',fieldName:'결제일'},
                    {field: 'sc.schedule_date',fieldName:'공연날짜'}
                  ],
                  search:'',
                  pageInfo:[],
                  pageNums:[]
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

              async viewList(pageNum,status,field,search){

                if(pageNum!=null)this.pageNum = pageNum;
                if(status!=null)this.status = status;
                if(field!=null)this.selectField = field;
                if(search!=null)this.search = search;

                await axios.get('/moaplace.com/admin/ticket/list/'
                + this.pageNum + '/' 
                + this.status + '/' 
                + this.selectField + '/' 
                + this.search)
                .then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering(); 
                }.bind(this))
              },
              
              async selectStatus(){

                await axios.get('/moaplace.com/admin/ticket/list/' + 1 + '/' 
                  + this.status + '/'  
                  + this.selectField + '/' 
                  + this.search)

                .then(function(resp){

                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering(); 

                }.bind(this))
              },

              inputSearch(e){
                // 부모의 바로 이전 형제 요소 가져오기(input)
                this.search=e.target.parentNode.previousSibling.value;
                
                axios.get('/moaplace.com/admin/ticket/list/' + 1 + '/' 
                  + this.status + '/'  
                  + this.selectField + '/' 
                  + this.search)
                  .then(function(resp){
                  this.list = resp.data.list;
                  this.status = resp.data.status;
                  this.selectField = resp.data.selectField;
                  this.search = resp.data.search;
                  this.pageNum = resp.data.pageNum;
                  this.pageInfo = resp.data.pageInfo;
                  this.pageNumbering();

                }.bind(this))
              },

              pageNumbering(){
              
              this.pageNums.splice(0);
              for(let i = this.pageInfo.startPageNum; i <= this.pageInfo.endPageNum; i++){
                  this.pageNums.push(i);
                }
              },

              movePage(pNum){
                axios.get('/moaplace.com/admin/ticket/list/' + pNum + '/'
                  + this.status + '/' 
                  + this.selectField + '/' 
                  + this.search).
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
              bookingDetail(num,id,title){
                this.$router.push(
                  {
                    name:'adminTicketDetail',
                    params:{
                      bookingNum:num,
                      id:id,
                      title:title,
                      pageNum:this.pageNum,
                      status:this.status,
                      field:this.selectField,
                      search:this.search,
                      }});
              },
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
                          right: 200px;
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
                          right: 8px;
                          color: rgba($black, 0.9);
                      }
                      input {
                          width: 320px;
                          box-sizing: border-box;
                          font-size: 16px;
                          height: 40px;
                          padding: 4px 32px 4px 132px;
                          overflow: hidden;
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
                        font-size: 14px;
                        &.thead {
                            background: $black;
                            color: #fff;
                        }
                        &.tbody {
                            padding: 24px 0;
                            border-bottom: 1px solid rgba($black, 0.2);
                            cursor: pointer;
                            &:hover {
                                background: #eee;
                            }
                            select {
                                border: 1px solid #333;
                                padding: 4px;
                            }
                        }
                        & > p,
                        div {
                            width: calc(100% /8);
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