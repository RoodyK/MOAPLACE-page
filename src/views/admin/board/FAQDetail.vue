<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판 관리" mediumCategory="FAQ"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">FAQ 관리 > 자세히보기</h2>

                <div class="info-box">
                    <h3>상세내용</h3>
                    <div>
                        <table>
                            <tr>
                                <th>번호</th>
                                <td>{{faq.num}}</td>
                            </tr>                           
                            <tr>
                                <th>구분</th>
                                <td>{{faq.sort}}</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>{{faq.title}}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>{{faq.content}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box">
                    <h3>수정하기</h3>
                    <div>
                        <table>
                            <tr>
                                <th>구분</th>
                                <td>
                                    <select>
                                        <option v-for="state in states" :key="state" :value="state">
                                            {{state}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" v-bind:value="faq.title"></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><textarea cols="100" rows="10" v-bind:value="faq.content"></textarea></td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="btn-box">
                    <button @click="$router.push({name:'faqList'})">이전</button>
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
            faq: {
                num:5,
                sort:'예매',
                title:'예매 내역은 어떻게 확인할 수 있나요?', 
                content:'회원 로그인 후 마이페이지 예매내역 조회페이지에서 확인하실 수 있습니다.'},
            states: [
                    '공연',
                    '대관',
                    '예매',
                    '관람',
                    '회원',
                    '기타'
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

            .state-box {
                width: 100%;
                border: 1px solid rgba($black, 0.5);
                padding: 8px 16px;
                span {
                    border-right: 1px solid rgba($black, 0.5);
                    padding-right: 16px;
                    margin-right: 16px;
                    font-weight: bold;
                }
                select {
                    padding: 4px;
                }
            }
            .info-box {
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
                        
                        select {
                            border: 1px solid rgba($black,0.3);
                            padding: 5px 65px 5px 5px;
                        }
                        input {
                            border: 1px solid rgba($black,0.3);
                            padding: 5px;
                            width: 100%; 
                        }
                        textarea {
                            width:100%;
                            border: 1px solid rgba($black,0.3);
                            padding: 5px;
                        }                        

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

                            &:nth-child(4){
                                height:250px;
                            }

                        }
                    }
                }
            }

            .btn-box {
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