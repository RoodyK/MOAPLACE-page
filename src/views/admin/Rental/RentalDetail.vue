<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 자세히보기</h2>

                <div class="state-box">
                    <span>진행 상황</span>
                    <select>
                        <option v-for="state in states" :key="state" :value="state">
                            {{state}}
                        </option>
                    </select>
                </div>

                <div class="info-box">
                    <h3>신청자 정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>신청인</th>
                                <td>김모아</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>010-0000-0000</td>
                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>moa@moa.com</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box">
                    <h3>공연 정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연명</th>
                                <td>우리집 고양이가 제일 귀여워</td>
                            </tr>
                            <tr>
                                <th>공연장</th>
                                <td>모던홀</td>
                            </tr>
                            <tr>
                                <th>대관희망일자</th>
                                <td>2022-08-25</td>
                            </tr>
                            <tr>
                                <th>대관시작시간</th>
                                <td>
                                    <select>
                                        <option v-for="time in times" :key="time" :value="time">
                                            {{time}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>공연장</th>
                                <td>모던홀</td>
                            </tr>
                            <tr>
                                <th>공연장르</th>
                                <td>무용</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>
                                    <a href="#">공연계획서.zip</a>
                                </td>
                            </tr>
                            <tr>
                                <th>담당자</th>
                                <td>고양이박사님</td>
                            </tr>
                            <tr>
                                <th>담당자 연락처</th>
                                <td>010-0000-0000 / se@moa.com</td>
                            </tr>
                            <tr>
                                <th>기타 요청사항</th>
                                <td>에어컨을 시원하게 틀어주세요.</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="answer-box">
                    <h3>답변</h3>
                    <textarea cols="30" rows="10">공연계획서 확인했씁니다. 대관시작시간은 9시로 하시죠. 돈 보내주세용 3333230293-092342 모아플레이스
                    </textarea>
                </div>
                <div class="btn-box">
                    <button>이전</button>
                    <button>저장</button>
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
                times: [
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00'
                ],
                states: [
                    '신청완료',
                    '심사중',
                    '신청거절',
                    '입금대기',
                    '예약취소',
                    '사용완료'
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
            .answer-box {
                margin-bottom: 32px;
                h3 {
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                textarea {
                    width: 100%;
                    border-color: rgba($black, 0.3);
                    padding: 16px;
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