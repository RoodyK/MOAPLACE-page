<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">공연관리 - 공연상세</h2>

                <div class="titleBox">
                    <span>공연번호</span>
                    <input type="text" v-model="list[0].num">
                    <span>공연명</span>
                    <input type="text" v-model="list[0].title">
                </div>

                <div class="hallInfo">
                    <h3>공연정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연장</th>
                                <td>{{list[0].hall}}</td>
                                <th>공연장르</th>
                                <td>클래식</td>
                                <th>공연상태</th>
                                <td colspan="3">{{list[0].status}}</td>
                            </tr>
                            <tr>
                                <th>공연날짜</th>
                                <td>{{list[0].date}}</td>
                                <th>시작시간</th>
                                <td>{{list[0].opentime}}</td>
                                <th>러닝타임</th>
                                <td>{{list[0].running_time}}분</td>
                                <th>인터미션</th>
                                <td>{{list[0].intermission}}분</td>
                            </tr>
                            <tr>
                                <th>공연시작일</th>
                                <td colspan="3">{{list[0].regdate}}</td>
                                <th>공연종료일</th>
                                <td colspan="3">{{list[0].appdate}}</td>
                            </tr>
                            <tr>
                                <th>공연중단시작일</th>
                                <td colspan="3">2022-08-10</td>
                                <th>공연중단종료일</th>
                                <td colspan="3">2022-08-15</td>
                            </tr>
                            <tr>
                                <th>총좌석수</th>
                                <td>120</td>
                                <th>잔여좌석수</th>
                                <td>0</td>
                                <th>상연등급</th>
                                <td colspan="3">15세</td>
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
                                <td><img src="https://www.sejongpac.or.kr/cmmn/file/imageSrc.do?fileStreCours=faec0c25744c22e99776405c0fa72802c8777c70061f67507e3bee4a2a5844e9&streFileNm=dfd67de4f3055521c7f754bfdc3cb5896db30ab9edb0bb8e4f449a9903cb06fb"></td>
                               </tr>
                               <tr>
                               <th>상세이미지</th>
                                <td><img src="https://www.sejongpac.or.kr/upload/2022/07/20220727_163335690_30277.jpg"></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="btnBox">
                    <button>이전</button>
                    <button>수정</button>
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
                        list: [
                            {
                                num: 11111,
                                title: '아무튼 엄청 긴 공연제목-아무튼 엄청 긴 공연제목',
                                hall: '오케스트라홀',
                                status: '진행중',
                                regdate: '2022.08.02',
                                appdate: '2022.08.22',
                                date: '2022.08.07',
                                running_time: 120,
                                opentime: '13:30',
                                intermission: 20,
                                seats: '110/120',
                                grade: 15
                            }
                        ]
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
                    // --------관리자 페이지 레이아웃 끝, 타이틀박스 시작--------
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
                            width: calc((100% - 16px) /2);
                            padding: 12px 0;
                            border: none;
                            &:last-child {
                                background-color: $brown;
                                color: #fff;
                            }
                        }
                    }

                }
            }
        </style>