<template>
  <div id="wrap">
    <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
    <main id="main">
        <div class="inner">
          <h2 class="title">대관관리</h2>
          <div class="list-top">
            <select v-model="sort">
              <option value="rental_name">신청인</option>
              <option value="rental_title">공연명</option>
              <option value="rental_state">진행상태</option>
            </select>
            <input type="text" v-model="keyword" @keydown.enter="searchList">
            <button
              @click="searchList">
              검색
              <i class="material-icons">
                search
              </i>
            </button>
          </div>
          <div class="list">
            <div class="t-row thead">
              <p>신청번호</p>
              <p>공연장</p>
              <p>신청인</p>
              <p>공연명</p>
              <p>대관일자</p>
              <p>신청일자</p>
              <p>진행상태</p>
            </div>
            <div 
              class="empty-list"
              v-if="list.length < 1 ">
              <i class="material-symbols-outlined">info</i>
              <p>대관신청 내역이 존재하지 않습니다.</p>
            </div>
            <RouterLink
              v-for="(item,index) in list"
              :key="item.num"
              :to="`/moaplace.com/admin/rental/detail/${item.rental_num}`"
              class="t-row tbody">
                <p>{{item.rental_num}}</p>
                <p>{{item.hall_name}}</p>
                <p>{{item.rental_name}}</p>
                <p>{{item.rental_title}}</p>
                <p>{{item.rental_date}}</p>
                <p>{{item.regdate}}</p> 
                <div @click="dontMove($event)">
                  <select @change="changeState(index)" v-model="item.rental_state">
                    <option 
                      v-for="(state,index) in states"
                      :key="index"
                      :value="state">
                      {{state}}
                    </option>
                  </select>
                </div>
            </RouterLink>
            <ul class="paging">
              <li
                :class="{active: pageUtil.startPageNum > 1}"
                @click="changePage('prev',$event)">
                [이전]
              </li>
              <li 
                v-for="num in pageNumbers"
                :key="num"
                @click="movePage(num)"
                :class="{active: pageUtil.pageNum == num}">
                {{num}}
              </li>
              <li
                :class="{active: pageUtil.endPageNum < pageUtil.totalPageCount}"
                @click="changePage('next',$event)">
                [다음]
              </li>
            </ul>
          </div>
        </div>
    </main>
  </div>
</template>

<script>
import SideMenu from '@/components/admin/SideMenu.vue'
import axios from "@/axios/axios"

export default {
    components:{
        SideMenu
    },

    data(){
      return{
        list : [],
        pageUtil : [],
        sort : "rental_name",
        keyword : "",
        isSearch : false,
        states: [
                    '신청완료',
                    '서류심사',
                    '신청거절',
                    '입금대기',
                    '입금완료',
                    '예약취소',
                    '사용완료'
                ],  
        pageNumbers : [],
        rememberWord: ''
      }
    },
    created(){
      this.getList();
      
    },
    mounted(){
      
    },
    methods:{
      dontMove(e){
        e.preventDefault();
      },
      getPageNumber(){
        //페이징
        this.pageNumbers = [];
        for(let i = this.pageUtil.startPageNum; i <= this.pageUtil.endPageNum; i++){
          this.pageNumbers.push(i);
        }
      },
      getList(){
        axios
          .get('/moaplace.com/admin/rental/list')
          .then(function(resp){
            this.list = resp.data.list;    
            this.pageUtil = resp.data.pageUtil;
            
            this.getPageNumber();
          }
          .bind(this)
        );
        
      },
      searchList(){
        if(this.keyword !== null && this.keyword !== ""){
          this.isSearch = true;
          this.rememberWord = this.keyword;
          axios
            .get(`/moaplace.com/admin/rental/list/${this.sort}/${this.keyword}`)
            .then(function(resp){
              this.list = resp.data.list;    
              this.pageUtil = resp.data.pageUtil;
              this.sort = resp.data.sort;
              this.keyword = resp.data.keyword;
              this.getPageNumber();
              console.log(this.list);
            }
            .bind(this)
          );
        }else{
          this.isSearch = false;
          this.getList();
          return;
        }        
      },
      movePage(pagenum){

        const url = this.isSearch
          ? `/moaplace.com/admin/rental/list/${pagenum}/${this.sort}/${this.rememberWord}`
          : `/moaplace.com/admin/rental/list/${pagenum}`;
        axios
          .get( url )
          .then(function(resp){
            this.list = resp.data.list;    
            this.pageUtil = resp.data.pageUtil;
            this.keyword = resp.data.keyword;  
            
            if(resp.data.sort != null && resp.data.sort != ""){
              this.sort = resp.data.sort;
            }

            this.getPageNumber();
          }
          .bind(this)
        );
        
      },
      changePage(where , e){
        
        //이전, 다음 페이지가 존재할 때만 동작
        if(e.target.classList.contains('active')){

          let pagenum = 1;

          //이전버튼
          if(where == 'prev'){
            pagenum = this.pageUtil.startPageNum -1; 
          }
          //다음버튼
          else if(where == 'next'){
            pagenum = this.pageUtil.endPageNum +1;
          }
          else{
            return;
          }
          
          this.movePage(pagenum);
        }
      },
      changeState(e){
        let num = this.list[e].rental_num;
        let state = this.list[e].rental_state;
        let title = this.list[e].rental_title;
        axios
          .get(`/moaplace.com/admin/rental/update/state/${num}/${state}`)
          .then(function(resp){
            if(resp.data == 'success'){
              alert( "공연명 : '" +title + "'의 진행상태 변경을 완료했습니다.");    
            }else{
              alert( "공연명 : '" +title + "'의 진행상태 변경을 실패했습니다.");    
            }
          }
        );
      }
    }
}
</script>

<style lang="scss" scoped="scoped">
        @import "@/scss/common.scss";
        //삭제필요
        $brown: #826D5E;
        nav {
            display: none !important;
        }
        * {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        a{
            text-decoration: none;
            color: $black;
        }
        a:hover{
          color: $black;
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
                    text-align: right;
                    margin-bottom: 16px;
                    position: relative;
                    font-size: 14px;
                    button,
                    select {
                        border: none;
                    }
                    select {
                        position: absolute;
                        top: 50%;
                        right: 200px;
                        transform: translateY(-50%);
                        border-right: 1px solid #ddd;
                    }
                    button {
                        background: transparent;
                        font-size: 0;
                        position: absolute;
                        top: 4px;
                        right: 5px;
                        color: rgba($black, 0.9);
                    }
                    input {
                        width: 280px;
                        box-sizing: border-box;
                        padding: 4px 32px 4px 90px;
                    }
                }
                .empty-list{
                  height: 300px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  i{
                    margin-right:8px;
                  }
                }
                .list {
                    .t-row {
                        display: table;
                        table-layout: fixed;
                        width: 100%;
                        padding: 8px 0;
                        font-size: 14px;
                        &.thead {
                            background: $black;
                            color: #fff;
                        }
                        &.tbody {
                            padding: 16px 0;
                            border-bottom: 1px solid rgba($black, 0.2);
                            cursor: pointer;
                            &:hover {
                                background: #eee;
                            }
                            select {
                                border: 1px solid #333;
                                padding: 4px;
                                margin-left: 15px;
                            }
                        }
                        & > p,
                        & > div{
                            display: table-cell;
                            text-align: center;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            & {
                                padding-top: 4px;
                            }
                            &:nth-child(4){
                                width: 200px;
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