<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판 관리" mediumCategory="1:1문의"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">1:1문의 관리</h2>
                <div class="list-top">
                    <select>
                        <option value="id">회원아이디</option>
                        <option value="mnum">회원명</option>
                        <option value="title">제목</option>
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
                            <p>문의번호</p>
                            <p>구분</p>
                            <p>회원아이디</p>
                            <p>회원명</p>
                            <p>제목</p>
                            <p>문의일자</p>
                            <p>답변일자</p>
                            <p>답변상태</p>
                        </div>
                        <div v-for="item in list" :key="item.num" class="t-row tbody">
                            <p>{{item.num}}</p>
                            <p>{{item.sort}}</p>
                            <p>{{item.id}}</p>
                            <p>{{item.name}}</p>
                            <p><RouterLink to="/moa/admin/qna/detail">{{item.title}}</RouterLink></p>
                            <p>{{item.regdate}}</p>
                            <p>{{item.ansdate}}</p>
                            <div>
                                <select v-model="item.state">
                                    <option v-for="(state,index) in states" :key="index" :value="state">
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
            components: {
                SideMenu
            },
            data() {
                return {
                    list: [
                        {
                            num: 5,
                            sort: '예매',
                            id: 'test',
                            name: '홍길동',
                            title: '예매 관련 문의입니다',
                            regdate: '2022.08.10',
                            ansdate: '2022.08.12',
                            state: '답변완료'
                        }, {
                            num: 5,
                            sort: '예매',
                            id: 'test',
                            name: '홍길동',
                            title: '예매 관련 문의입니다',
                            regdate: '2022.08.10',
                            ansdate: '2022.08.12',
                            state: '답변완료'
                        }, {
                            num: 5,
                            sort: '예매',
                            id: 'test',
                            name: '홍길동',
                            title: '예매 관련 문의입니다',
                            regdate: '2022.08.10',
                            ansdate: '',
                            state: '확인중'
                        }, {
                            num: 5,
                            sort: '예매',
                            id: 'test',
                            name: '홍길동',
                            title: '예매 관련 문의입니다',
                            regdate: '2022.08.10',
                            ansdate: '2022.08.11',
                            state: '답변완료'

                        }, {
                            num: 5,
                            sort: '예매',
                            id: 'test',
                            name: '홍길동',
                            title: '예매 관련 문의입니다',
                            regdate: '2022.08.10',
                            ansdate: '',
                            state: '문의대기'
                        }
                    ],
                    states: [
                        '문의대기',
                        '확인중',
                        '답변완료'
                    ]
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
                        right: 205px;
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
                        width: 300px;
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
                            a {
                                text-decoration: none;
                                color: $black;
                            }
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
                            p {
                                &:nth-child(7){
                                    color:#D67747;
                                }
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
                            &:nth-child(1){
                                width: 65px;
                            }
                            &:nth-child(5){
                                width: 350px;
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