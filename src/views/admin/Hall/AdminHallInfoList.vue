<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">공연관리</h2>
                <div class="list-top">
                    <select>
                        <option value="hall">공연장</option>
                        <option value="title">공연명</option>
                        <option value="status">공연상태</option>
                    </select>
                    <input type="text">
                        <button>
                            검색
                            <i class="material-icons">
                                search
                            </i>
                        </button>
                        <button class="insertBtn">공연등록</button>
                    </div>
                    <div class="list">
                        <div class="t-row thead">
                            <p>공연번호</p>
                            <p>공연장</p>
                            <p>공연명</p>
                            <p>공연날짜</p>
                            <p>공연시작일</p>
                            <p>공연종료일</p>
                            <p>공연상태</p>
                            <p>공연시작시간</p>
                            <p>러닝타임</p>
                            <p>인터미션</p>
                            <p>잔여석/좌석수</p>
                            <p>상연등급</p>
                        </div>
                        <div v-for="item in list" :key="item.num" class="t-row tbody">
                            <p>{{item.num}}</p>
                            <p>{{item.hall}}</p>
                            <p>{{item.title}}</p>
                            <p>{{item.appdate}}</p>
                            <p>{{item.appdate}}</p>
                            <p>{{item.regdate}}</p>
                            <p>{{item.status}}</p>
                            <p>{{item.opentime}}</p>
                            <p>{{item.runningtime}}</p>
                            <p>{{item.intermission}}</p>
                            <p>{{item.seats}}</p>
                            <p>{{item.grade}}</p>
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
            components: {
                SideMenu
            },
            data() {
                return {
                    list: [
                        {
                            num: 7,
                            hall: '공연장1',
                            title: '오늘메뉴',
                            regdate: '2022.08.10',
                            appdate: '2022.08.10',
                            status: '진행중',
                            runningtime: 120,
                            opentime: '13:30',
                            intermission: 20,
                            seats: '77/120',
                            grade: 15
                        }, {
                            num: 8,
                            hall: '공연장1',
                            title: '치킨텐더',
                            regdate: '2022.08.10',
                            appdate: '2022.08.10',
                            status: '진행중',
                            runningtime: 120,
                            opentime: '13:30',
                            intermission: 20,
                            seats: '20/120',
                            grade: 15
                        }, {
                            num: 2,
                            hall: '공연장1',
                            title: '꿔바로우',
                            regdate: '2022.08.10',
                            appdate: '2022.08.10',
                            status: '공연종료',
                            runningtime: 120,
                            opentime: '13:30',
                            intermission: 20,
                            seats: '77/120',
                            grade: 15
                        }, {
                            num: 0,
                            hall: '공연장1',
                            title: '운동은',
                            regdate: '2022.08.10',
                            appdate: '2022.08.10',
                            status: '공연종료',
                            runningtime: 120,
                            opentime: '13:30',
                            intermission: 20,
                            seats: '110/120',
                            grade: 15
                        }, {
                            num: 1,
                            hall: '공연장1',
                            title: '언제하지',
                            regdate: '2022.08.10',
                            appdate: '2022.08.10',
                            status: '공연종료',
                            runningtime: 120,
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
                    display: flex;
                    justify-content: flex-end;
                    button,
                    select {
                        border: none;
                    }
                    select {
                        position: absolute;
                        top: 8px;
                        right: 288px;
                        border-right: 1px solid #ddd;
                    }
                    button {
                        background: transparent;
                        font-size: 0;
                        position: absolute;
                        top: 4px;
                        right: 104px;
                        color: rgba($black, 0.9);
                    }
                    input {
                        width: 280px;
                        box-sizing: border-box;
                        padding: 4px 32px 4px 90px;
                    }
                    .insertBtn {
                        background-color: $black;
                        color: white;
                        font-size: 16px;
                        width: 80px;
                        height: 40px;
                        position: unset;
                        margin-left: 16px;

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
                            width: calc(100% /12);
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