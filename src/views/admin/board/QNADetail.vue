<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판 관리" mediumCategory="1:1문의"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">1:1문의 > 자세히보기</h2>

                <div class="state-box">
                    <span>답변 상태</span>
                    <select>
                        <option v-for="state in states" :key="state" :value="state">
                            {{state}}
                        </option>
                    </select>
                </div>

                <div class="info-box">
                    <h3>문의내용</h3>
                    <div>
                        <table>
                            <tr>
                                <th>문의번호</th>
                                <td>10</td>
                                <th>문의구분</th>
                                <td>예매</td>
                                <th>문의일</th>
                                <td>2022-08-25</td>
                            </tr>
                            <tr>
                                <th>회원명</th>
                                <td colspan="5">길동스</td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td colspan="5">testtest</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td colspan="5">010-0000-0000</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td colspan="5">moa@moa.com</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td colspan="5">예매 관련 문의임당</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="5">예매했는데 어디서 확인하나요?<br>답변 부탁요</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box">
                    <h3 v-if="answer!=null">답변 수정</h3>
                    <h3 v-if="answer==null">답변 등록</h3>
                    <div>
                        <table>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" v-if="answer!=null" v-bind:value="answer.a_title">
                                    <input type="text" v-if="answer==null">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><textarea cols="100" rows="10" v-if="answer!=null" v-bind:value="answer.a_content"></textarea>
                                <textarea cols="100" rows="10" v-if="answer==null"></textarea></td>
                            </tr>
                            <tr>
                                <th>답변일</th>
                                <td v-if="answer!=null">{{answer.a_answerdate}}</td>
                                <td v-if="answer==null">{{curday()}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="btn-box">
                    <button @click="$router.push({name:'qnaList'})">이전</button>
                    <button v-if="answer!=null">수정</button>
                    <button v-if="answer==null">등록</button>
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
                faq: {  num:5,
                        sort:'예매',
                        title:'예매 내역은 어떻게 확인할 수 있나요?', 
                        content:'회원 로그인 후 마이페이지 예매내역 조회페이지에서 확인하실 수 있습니다.'},
                // answer: {   a_title:'답변입니당', 
                //             a_content:'문의하신 내용에 대한 답변입니다. 감사합니다',
                //             a_answerdate: '2022-08-11'},
                states: [
                    '문의대기',
                    '확인중',
                    '답변완료'
                ]
            }
        },
        methods: {
            curday() {
                return new Date().toISOString().substring(0,10);
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

                        tr {
                            td,
                            th {
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                            }
                            th {
                                width:15%;
                                background: #eee;
                                text-align: center;
                            }
                            &:nth-child(7){
                               height:250px;
                            }
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