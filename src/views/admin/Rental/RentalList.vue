<template>
  <div id="wrap">
    <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
    <main id="main">
        <div class="inner">
          <h2 class="title">대관관리</h2>
          <div class="list-top">
            <select>
              <option value="name">신청인</option>
              <option value="title">공연명</option>
              <option value="appdate">대관일자</option>
            </select>
            <input type="text">
            <button>
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
              v-for="item in list"
              :key="item.num"
              class="t-row tbody">
              <p>{{item.num}}</p>
              <p>{{item.hall}}</p>
              <p>{{item.name}}</p>
              <p>{{item.title}}</p>
              <p>{{item.appdate}}</p>
              <p>{{item.regdate}}</p>
              <div>
                <select v-model="item.state">
                  <option 
                    v-for="(state,index) in states"
                    :key="index"
                    :value="state">
                    {{state}}
                  </option>
                </select>
              </div>
            </div>
            <ul class="paging">
              <li>[이전]</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>[다음]</li>
            </ul>
          </div>
        </div>
    </main>
  </div>
</template>

<script>
import SideMenu from '@/components/admin/SideMenu.vue'
export default {
    components:{
        SideMenu
    },
    data(){
      return{
        list:[
          {num:0, hall:'공연장1', name: 'John', title:'전국노래자랑', regdate: '2022.08.10', appdate: '2022.08.10',state:'신청완료'},
          {num:0, hall:'공연장1', name: 'John', title:'우리 고양이 귀여움 자랑 대회', regdate: '2022.08.10',appdate: '2022.08.10',state:'예약취소'},
          {num:0, hall:'공연장1', name: 'John', title:'아주 아주 긴 제목을 가진 공연 제목 김수한무 거북이와 두루미', regdate: '2022.08.10',appdate: '2022.08.10',state:'입금대기'},
          {num:0, hall:'공연장1', name: 'John', title:'헤어질 결심', regdate: '2022.08.10',appdate: '2022.08.10',state:'신청완료'},
          {num:0, hall:'공연장1', name: 'John', title:'백조의 호수', regdate: '2022.08.10',appdate: '2022.08.10',state:'신청완료'}
        ],
        states:['신청완료','심사중','신청거절', '입금대기', '예약취소', '사용완료']
      }
    },
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
                            }
                        }
                        & > p,
                        div {
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
                            margin: 0 8px;
                            padding: 0 8px;
                            &:first-child,
                            &:last-child {
                                color: $brown;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    </style>