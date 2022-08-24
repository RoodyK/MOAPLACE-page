<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">공연정보 - 공연상세</h2>

                <div class="btnUpBox">
                  <button>삭제</button>
                  <button>수정</button>
                </div>

                <div class="titleBox">
                    <span>공연번호</span>
                    <input type="text" v-model="list.num" readonly>
                    <span>공연명</span>
                    <input type="text" v-model="list.title" readonly>
                </div>

                <div class="hallInfo">
                    <h3>공연정보</h3>
                    <div>
                        <table>

                            <tr>
                                <th>공연장</th>
                                <td colspan="2">{{list.hall}}</td>
                                <th>공연장르</th>
                                <td colspan="2">{{list.genre}}</td>
                                <th>공연상태</th>
                                <td colspan="2">{{list.status}}</td>
                            </tr>
                            <tr>
                                <th>러닝타임</th>
                                <td colspan="3">{{list.running_time}}분</td>
                                <th>인터미션</th>
                                <td colspan="3">{{list.intermission}}분</td>
                            </tr>
                            <tr>
                                <th>총좌석수</th>
                                <td colspan="3">{{list.seats}}</td>
                                <th>상연등급</th>
                                <td colspan="3">{{list.age}}</td>
                            </tr>
                            <tr>
                                <th>공연시작일</th>
                                <td colspan="3">{{list.startDate}}</td>
                                <th>공연종료일</th>
                                <td colspan="3">{{list.endDate}}</td>
                            </tr>
                            
                            <tr>
                                <th>공연중단시작일</th>
                                <td colspan="3">{{list.blockStartDate}}</td>
                                <th>공연중단종료일</th>
                                <td colspan="3">{{list.blockEndDate}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="image">
                    <h3>공연 이미지</h3>
                    <div>
                        <table>
                            <tr>
                                <th>섬네일</th>
                                <td><img :src='list.thumbnail'></td>
                               </tr>
                               <tr>
                               <th>상세이미지</th>
                                <td><img v-for="(item,index) in list.detailImgs" :key="index" :src='item'></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="btnBox">
                    <button @click="goList">이전</button>
                    <button>수정</button>
                    <button>삭제</button>
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
                        showNum:'',
                        list:[]
                    }
                },

                mounted(){

                  this.viewDetail(this.$route.params.showNum);
                },

                methods:{
                    viewDetail(num){
                      axios.get('/moaplace.com/admin/show/detail/'+num).
                      then(function(resp){
                          this.list=resp.data.list;
                      }.bind(this));
                    },

                    goList(){
                      this.$router.push({
                        name:'adminHallInfoList',
                        params:{
                          selectField:'hall',
                          search:'',
                          pageNum:1
                        }
                      })
                    }
                }
            }
        </script>
        <style lang="scss" scoped="scoped">
            @import "@/scss/common.scss";
            // --------관리자 페이지 레이아웃 시작--------
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
                    // --------관리자 페이지 레이아웃 끝, 버튼박스 시작--------
                    .btnUpBox{
                      width: 100%;
                      display: flex;
                      flex-direction: row-reverse;
                      button {
                          width: 96px;
                          height: 32px;
                          padding: 4px 0;
                          border: none;
                          margin-bottom:16px;
                          background-color: $black;
                          color:white;
                          &:last-child{
                            margin-right: 16px;
                          }
                      }
                    }

                    // --------버튼박스 끝, 타이틀박스 시작 ----------------
                    .titleBox {
                        width: 100%;
                        border: 1px solid rgba($black, 0.5);
                        padding: 8px 16px;
                        span {
                            border-right: 1px solid rgba($black, 0.5);
                            padding-right: 16px;
                            margin-right: 16px;
                            font-weight: bold;
                        }
                        input[type=text] {
                            padding: 4px;
                            margin-right: 16px;
                            border: none;
                            width: 56px;
                            &:focus{
                              outline: none;
                            }
                            &:nth-child(4) {
                                width: calc(100%/1.4);
                            }
                        }
                    }
                    // --------타이틀박스 끝, 공연정보테이블 시작--------
                   
                    // --------타임박스 끝, 공연정보 시작--------
                    .hallInfo {
                        margin: 32px 0;
                        h3 {
                            font-size: 20px;
                            margin-bottom: 16px;
                        }
                        div {
                            border-top: 1px solid $black;
                            padding-top: 16px;
                            table {
                                border-collapse: collapse;
                                width: 100%;
                                border-top: 1px solid rgba($black,0.3);
                                border-width: 1px 0;
                                tr {
                                    td,
                                    th {
                                        
                                        padding: 8px 16px;
                                        border-bottom: 1px solid rgba($black, 0.3);
                                    }
                                    th {
                                        width: calc(100%/6);
                                        background: #eee;
                                        text-align: center;
                                    }

                                }
                            }
                        }
                    }
                    // --------공연정보 끝, 이미지 시작--------
                    .image {
                        margin: 32px 0;
                        h3 {
                            font-size: 20px;
                            margin-bottom: 16px;
                        }
                        div {
                            border-top: 1px solid $black;
                            padding-top: 16px;
                            table {
                                border-collapse: collapse;
                                width: 100%;
                                border-top: 1px solid rgba($black,0.3);
                                border-width: 1px 0;

                                tr {
                                    td,
                                    th {
                                        padding: 8px 16px;
                                        border-bottom: 1px solid rgba($black, 0.3);
                                    }
                                    th {
                                        width: 15%;
                                        background: #eee;
                                        text-align: center;
                                    }
                                    text-align: center;
                                    img{
                                          width: calc(80%/1);
                                        }
                                }
                            }
                        }
                    }
                    // --------이미지 끝, 버튼 영역 시작--------
                    .btnBox {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        button {
                            width: calc((100% - 16px) /3);
                            padding: 12px 0;
                            border: none;
                            &:nth-child(2){
                              background-color: $black;
                              color: #fff;
                            }
                            &:last-child {
                                background-color: $black;
                                color: #fff;
                            }
                        }
                    }

                }
            }
        </style>