<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="일정정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">일정정보 - 일정상세</h2>

                <div class="titleBox">
                    <span>공연번호</span>
                    <input type="text" v-model="detailInfo.num" readonly>
                    <span>공연명</span>
                    <input type="text" v-model="detailInfo.title" readonly>
                </div>

                <div class="hallInfo">
                    <h3>공연정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연날짜</th>
                                <td colspan="5">{{detailInfo.showDate}}</td>
                            </tr>
                            <tr>
                                <th>공연횟수</th>
                                <td colspan="5">{{timeInfo.length}}</td>
                            </tr>
                            <tr v-for="(item,index) in timeInfo" :key="index">
                                <th>공연회차별정보</th>
                                <td>{{item.timeRow}}회차</td>
                                <th>공연시간</th>
                                <td>{{item.dateTime}}</td>
                                <th>공연상태</th>
                                <td>{{item.dateStatus}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="btnBox">
                    <button @click="goList">이전</button>
                    <button @click="updateDetail(detailInfo.num,detailInfo.showDate)">수정</button>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">삭제</button>
                </div>

                <!-- 삭제버튼 확인 모달 -->
                <div class="modal" id="myModal">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h5 class="modal-title">정말 일정정보를 삭제하시겠습니까?</h5>
                      </div>
                      <!-- Modal body -->
                      <div class="modal-body">
                        삭제된 일정정보는 복구할 수 없습니다.
                      </div>

                      <!-- Modal footer -->
                      <div class="modal-footer">
                        <button type="button" class="btn-close" data-bs-dismiss="modal">취소</button>
                        <button class="btn-close" data-bs-dismiss="modal" @click="deleteSchedule(detailInfo.num,detailInfo.showDate)">삭제</button>
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
                      detailInfo:[],
                      timeInfo:[],
                      pageNum: this.$route.params.pageNum,
                      status: this.$route.params.status,
                      selectDate: this.$route.params.selectDate,
                      selectField: this.$route.params.field,
                      search: this.$route.params.search,
                    }
                },

                mounted(){
                  this.viewDetail(
                    this.$route.params.showNum,
                    this.$route.params.showDate);
                },

                methods:{
                   viewDetail(num,showDate){
                      
                      axios.get('/moaplace.com/admin/show/schedule/detail/'+ num + '/'+ showDate).
                      then(function(resp){
                        resp.data
                          this.detailInfo = resp.data.detailInfoDTO;
                          this.timeInfo = resp.data.arrTime;
                      }.bind(this));
                    },
                    goList(){
                      this.$router.push({
                        name:'adminShowScheduleList',
                        params:{
                          selectField:this.selectField,
                          search:this.search,
                          selectDate:this.selectDate,
                          pageNum:this.pageNum,
                          status:this.status
                        }
                      })
                    },
                    updateDetail(num,showDate){
                      this.$router.push(
                          {
                          name:'adminShowScheduleUpdate',
                          params:{
                            showNum:num,
                            showDate:showDate}});
                    },

                    deleteSchedule(num,showDate){
                      axios.get('/moaplace.com/admin/show/schedule/delete/'+ num + '/'+ showDate)
                      .then(function(resp){
                        if(resp.data > 0){
                          alert('공연일정이 삭제되었습니다.')
                          this.goList()
                        }else{
                          alert('해당 날짜에 진행중인 공연이 있어 삭제할 수 없습니다.')
                        }
                      }.bind(this))
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
                                        width: 15%;
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