<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 자세히보기</h2>

                <div class="state-box"  v-if="exists">
                    <span>진행 상황</span>
                    <select v-model = "details.rental_state">
                        <option v-for="state in states" :key="state" :value="state">
                            {{state}}
                        </option>
                    </select>
                </div>

                <div class="info-box">
                    <h3>신청자 정보</h3>
                    <div>
                        <table v-if="exists">
                            <tr>
                                <th>신청인</th>
                                <td>{{details.rental_name}}</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>{{details.rental_phone}}</td>
                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>{{details.rental_email}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box">
                    <h3>공연 정보</h3>
                    <div>
                        <table  v-if="exists">
                            <tr>
                                <th>공연명</th>
                                <td>{{details.rental_title}}</td>
                            </tr>
                            <tr>
                                <th>공연장</th>
                                <td>{{getHallName(details.hall_num)}}</td>
                            </tr>
                            <tr>
                                <th>대관희망일자</th>
                                <td>{{details.rental_date}}</td>
                            </tr>
                            <tr>
                                <th>대관시작시간</th>
                                <td>
                                    <select v-model="details.rental_time">
                                        <option v-for="time in times" :key="time" :value="time">
                                            {{time}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>공연장르</th>
                                <td>{{details.rental_genre}}</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>
                                    <a href="#">{{details.rental_originfilename}}</a>
                                    <span>{{formatBytes(details.rental_filesize)}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>담당자</th>
                                <td>{{details.rental_ownsname}}</td>
                            </tr>
                            <tr>
                                <th>담당자 연락처</th>
                                <td>{{details.rental_ownsphone}} / {{details.rental_ownemail}}</td>
                            </tr>
                            <tr>
                                <th>기타 요청사항</th>
                                <td>{{details.rental_content}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                
                <div class="answer-box">
                    <h3>답변</h3>
                    <TextEditor height="300" v-model:content="answer_content" contentType="html"></TextEditor>
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
    import TextEditor from '@/components/TextEditor.vue'
    import axios from '@/axios/axios.js'

    export default {
        components: {
            SideMenu,
            TextEditor
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
                    '서류심사',
                    '신청거절',
                    '입금대기',
                    '예약취소',
                    '사용완료'
                ],
                details:[],
                answer_content: "",
                exists : true,
            }
        },
        mounted(){
            console.log("rental_num : " + this.$route.params.id );
            this.getDetail();
        },
        methods:{
            getDetail(){
                let rental_num = this.$route.params.id
                axios
                    .get(`/moaplace.com/admin/rental/detail/${rental_num}`)
                    .then(function(resp){
                        if(resp.data.result == 'success'){
                            this.details  = resp.data.vo;
                            console.log(this.details);
                        }else{
                            this.exists = false;
                        }
                    }
                    .bind(this)
                )
            },
            formatBytes(bytes, decimals = 2) {
                //파일 크기 변환
                if (bytes === 0) return '0 Bytes';

                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                const i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            getHallName(hall_num){
                switch(hall_num){
                    case 1 : return "모던홀"; 
                    case 2 : return "오케스트라홀"; 
                    case 3 : return "아트홀"; 
                }
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
                margin: 32px 0;
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