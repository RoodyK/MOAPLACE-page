<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">공연정보 - 공연상세</h2>

                <div class="btnUpBox">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">삭제</button>
                  <button @click="updateDetail(list.num)">수정</button>
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
                                <td colspan="2">{{list.status=='Y'?'진행중':'종료'}}</td>
                            </tr>
                            <tr>
                                <th>R석 가격</th>
                                <td colspan="2">{{list.rprice}} 원</td>
                                <th>S석 가격</th>
                                <td colspan="2">{{list.sprice}} 원</td>
                                <th>A석 가격</th>
                                <td colspan="2">{{list.aprice}} 원</td>
                            </tr>
                            <tr>
                                <th>총좌석수</th>
                                <td colspan="3">{{list.seats}}</td>
                                <th>상연등급</th>
                                <td colspan="3">{{list.age}}</td>
                            </tr>
                            <tr>
                                <th>러닝타임</th>
                                <td colspan="3">{{list.runningTime}}분</td>
                                <th>인터미션</th>
                                <td colspan="3">{{list.intermission}}분</td>
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
                    <button @click = "goList">이전</button>
                    <button @click = "updateDetail(list.num)">수정</button>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">삭제</button>
                </div>

                <!-- 삭제버튼 확인 모달 -->
                <div class="modal" id="myModal">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h5 class="modal-title">정말 공연정보를 삭제하시겠습니까?</h5>
                      </div>

                      <!-- Modal body -->
                      <div class="modal-body">
                        <p>등록된 공연정보를 삭제하면</p>
                        <p>해당 공연의 좌석별 가격과 상세이미지가 함께 삭제됩니다.</p>
                      </div>

                      <!-- Modal footer -->
                      <div class="modal-footer">
                        <button type="button" class="btn-close" data-bs-dismiss="modal">취소</button>
                        <button class="btn-close" data-bs-dismiss="modal" @click="deleteShow">삭제</button>
                      </div>
                    </div>
                  </div>
                  
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
                      list:[],
                      rSeat:'',
                      sprice:'',
                      aprice:'',
                      selectField: this.$route.params.field,
                      search: this.$route.params.search,
                      pageNum: this.$route.params.pageNum,
                      status: this.$route.params.status
                    }
                },
                
                mounted(){

                  this.viewDetail(
                    this.$route.params.showNum);
                },

                methods:{
                    viewDetail(num){
                      
                      axios.get('/moaplace.com/admin/show/detail/'+ num + '/' + this.pageNum + '/' + this.status + '/' + this.selectField + '/' + this.search).
                      then(function(resp){
                          this.list=resp.data.list;
                          this.list.rprice=resp.data.list.rprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          this.list.sprice=resp.data.list.sprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          this.list.aprice=resp.data.list.aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }.bind(this));
                    },

                    goList(){
                      this.$router.push({
                        name:'adminHallInfoList',
                        params:{
                          selectField:this.selectField,
                          search:this.search,
                          pageNum:this.pageNum,
                          status:this.status
                        }
                      })
                    },
                    updateDetail(num){
                      this.$router.push(
                        {
                          name:'adminHallUpdate',
                          params:{
                            showNum:num,
                            pageNum:this.pageNum,
                            status:this.status,
                            field:this.selectField,
                            search:this.search}});
                    },
                    deleteShow(){
                      axios.get('/moaplace.com/admin/show/delete/'+ this.list.num)
                      .then(function(resp){
                        if(resp.data > 0){
                          alert("해당 공연이 삭제되었습니다.");
                          this.goList();
                        }else{
                          alert('공연 삭제를 실패했습니다.')
                        }
                      }.bind(this))
                      .catch(function(error){
                        if(error.request){
                          alert('공연 일정이 없는 공연만 삭제할 수 있습니다.')
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
                          >&.btn-primary{
                                border-radius: 0;
                            }
                          >&.btn-primary:focus{
                              box-shadow:none;
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
                              border-radius: none;
                            }
                            &:last-child {
                                background-color: $black;
                                color: #fff;
                            }
                            >&.btn-primary{
                                border-radius: 0;
                            }
                            >&.btn-primary:focus{
                                box-shadow:none;
                            }
                        }
                    }
                  .modal-header{
                    display: inline;
                    text-align: center;
                  }
                  .modal-body{
                      text-align: center;
                  }
                  .modal-footer{
                    display: flex;
                    justify-content: space-between;
                    & .btn-close{
                      background: none;
                      box-sizing:none;
                      width:104px;
                      height: 32px;
                      padding: 0 px;
                      opacity:none;
                      background-color: $black;
                      color: #fff;
                      &.btn-close:focus{
                        box-shadow:none;
                      }
                    }
                  }
                }
            }
        </style>