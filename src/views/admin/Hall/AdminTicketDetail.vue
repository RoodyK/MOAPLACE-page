<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="예매정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">예매정보 - 예매상세</h2>

                <div class="btnUpBox">
                  <button>예매수정</button>
                </div>

                <div class="titleBox">
                    <span>예매번호</span>
                    <input type="text" v-model="list.num" readonly>
                    <span>회원아이디</span>
                    <input type="text" v-model="list.id" readonly>
                    <span>공연명</span>
                    <input type="text" v-model="list.title" readonly>
                </div>

                <div class="ticketInfo">
                    <h3>예매정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연장</th>
                                <td colspan="3">{{list.hall}}</td>
                            </tr>
                            <tr>
                                <th>공연날짜</th>
                                <td>{{list.regdate}}</td>
                                <th>공연시작시간</th>
                                <td>{{list.time}}</td>
                            </tr>
                            <tr>
                                <th>예약좌석수</th>
                                <td colspan="3"> 총 {{list.seats.length}} 석</td>

                            </tr>
                            <tr v-for="(l,index) in list.seats" :key="index">
                                <th>예약좌석</th>
                                <td>{{l.seatGrade}} {{l.seat}}</td>
                                <th>관람분류</th>
                                <td>{{l.age}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="payment">
                    <h3>결제내역</h3>
                    <div>
                        <table>
                            <tr>
                                <th>결제일</th>
                                <td colspan="3">{{list.paymentDate}}</td>
                            </tr>
                            <tr>
                                <th>예매가격</th>
                                <td>{{list.price}}원</td>
                                <th>사용적립금</th>
                                <td>{{list.point}}원</td>
                            </tr>
                            <tr>
                                <th>결제수단</th>
                                <td colspan="3">{{list.payment}}</td>
                            </tr>
                            <tr>
                                <th>최종결제금액</th>
                                <td colspan="3">{{list.lastPrice}}원</td>
                            </tr>
                            <tr>
                                <th>결제상태</th>
                                <td colspan="3">{{list.paymentStatus}}</td>
                            </tr>

                        </table>
                    </div>
                </div>

                <div class="btnBox">
                    <button>이전</button>
                    <button>예매수정</button>
                </div>
              </div>
          </main>
      </div>
</template>
        <script>
            import SideMenu from '@/components/admin/SideMenu.vue'
            export default {
                components: {
                    SideMenu
                },

                data() {
                    return {
                        thumb:'https://movie-phinf.pstatic.net/20220607_129/16545872892918GA4h_JPEG/movie_image.jpg?type=m203_290_2',
                        list: {
                                num: 20,
                                id:'bee',
                                title:'헤어질결심',
                                hall: '오케스트라홀',
                                genre:'오페라',
                                regdate:'2022-08-21',
                                time:'13:30',
                                seats:[
                                    {seat:'A01',seatGrade:'S석',age:'어린이'},
                                    {seat:'A02',seatGrade:'S석',age:'성인'}
                                ],
                                price:'40,000',
                                point:'2,000',
                                payment:'신용카드',
                                lastPrice:'38,000',
                                paymentStatus:'결제완료',
                                paymentDate:'2022-08-02'
                            }
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
                          height: 40px;
                          border: none;
                          margin-bottom:16px;
                          background-color: $black;
                          color:white;
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
                            width: 64px;
                            &:focus{
                              outline: none;
                            }
                            &:nth-child(6) {
                                width: 400px;
                            }
                        }
                    }
                    // --------타이틀박스 끝, 공연정보테이블 시작--------
                   
                    // --------타임박스 끝, 공연정보 시작--------
                    .ticketInfo,.payment {
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
                            width: calc((100% - 16px) /2);
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