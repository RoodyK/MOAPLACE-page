<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="예매정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">예매관리</h2>
                <div class="list-top">
                    <select>
                        <option value="hall">예매번호</option>
                        <option value="title">회원아이디</option>
                        <option value="status">공연명</option>
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
                            <p>예매번호</p>
                            <p>회원아이디</p>
                            <p>공연제목</p>
                            <p>공연날짜</p>
                            <p>공연회차</p>
                            <p>결제금액</p>
                            <p>결제일</p>
                            <p>결제상태</p>
                        </div>
                        <div v-for="item in list" :key="item.num" class="t-row tbody">
                            <p>{{item.num}}</p>
                            <p>{{item.id}}</p>
                            <p>{{item.title}}</p>
                            <p>{{item.regdate}}</p>
                            <p>{{item.time}} 회차</p>
                            <p>{{item.price}}</p>
                            <p>{{item.paidDate}}</p>
                            <p>{{item.status}}</p>
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
                            num: 300,
                            id:'bee',
                            title:'b리사이틀',
                            regdate:'2022-08-21',
                            time:'3',
                            paidDate:'2022-08-10',
                            price:'30000',
                            status:'입금대기',
                        }, {
                            num: 10045,
                            id:'bee',
                            title:'ee콘서트',
                            regdate:'2022-08-21',
                            time:'3',
                            paidDate:'2022-08-10',
                            price:'30000',
                            status:'결제완료',
                        }, {
                            num: 500,
                            id:'bee',
                            title:'b리사이틀',
                            regdate:'2022-08-21',
                            time:'1',
                            paidDate:'2022-08-10',
                            price:'50000',
                            status:'결제완료',
                        }, {
                            num: 20,
                            id:'bee',
                            title:'헤어질결심',
                            regdate:'2022-08-21',
                            time:'1',
                            paidDate:'2022-08-10',
                            price:'40000',
                            status:'결제완료',
                        }, {
                            num: 7,
                            id:'ttt',
                            title:'v리사이틀',
                            regdate:'2022-08-21',
                            time:'1',
                            paidDate:'2022-08-10',
                            price:'30000',
                            status:'입금대기',
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
                    button,
                    select {
                        border: none;
                    }
                    select {
                        position: absolute;
                        top: 50%;
                        right: 184px;
                        transform: translateY(-50%);
                        border-right: 1px solid #ddd;
                        &:focus{
                            outline: none;
                        }

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
                        &:focus{
                            outline-color: $black;
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