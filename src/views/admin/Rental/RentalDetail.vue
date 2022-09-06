<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 자세히보기</h2>

                <div class="state-box"  v-if="exists">
                    <span>진행 상황</span>
                    <select v-model = "details.rental_state" @change="changeState('state')">
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
                        <table v-if="exists">
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
                                <td>
                                    <div class="editalble-box" v-if="dateEdit">
                                        <span>{{details.rental_date}}</span>
                                        <div>
                                            <button @click="dateEdit = false">수정</button>
                                        </div>
                                    </div>
                                    <div  class="editalble-box" v-if="!dateEdit">
                                        <input type="date" v-model="updateDate" :min="getToday()">
                                        <div>
                                            <button @click="changeState('date'), dateEdit = true">저장</button>
                                            <button  @click="dateEdit = true">취소</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>대관시작시간</th>
                                <td>
                                    <div class="editalble-box" v-if="timeEdit">
                                        <span>{{details.rental_time}}</span>
                                        <div>
                                            <button @click="timeEdit = false">수정</button>
                                        </div>
                                    </div>
                                    <div class="editalble-box" v-if="!timeEdit">
                                        <select v-model="updateTime">
                                            <option v-for="time in times" :key="time" :value="time">
                                                {{time}}
                                            </option>
                                        </select>
                                        <div>
                                            <button @click="changeState('time'), timeEdit = true">저장</button>
                                            <button  @click="timeEdit = true">취소</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>공연장르</th>
                                <td>{{details.rental_genre}}</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>
                                    <a :href="`http://localhost:9090/moaplace.com/rental/file/download/${details.rental_num}`" target="_blank">
                                        {{details.rental_originfilename}}
                                    </a>
                                    <span class="filesize">({{formatBytes(details.rental_filesize)}})</span>
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

                <RentalAnswer/>
                
            </div>
        </main>
    </div>
</template>

<script>
    import SideMenu from '@/components/admin/SideMenu.vue'
    import RentalAnswer from '@/components/admin/RentalAnswer.vue'
    import axios from '@/axios/axios.js'

    export default {
        components: {
            SideMenu,
            RentalAnswer
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
                    '입금완료',
                    '예약취소',
                    '사용완료'
                ],
                details:[],
                exists : true,
                dateEdit : true,
                timeEdit : true,
                updateDate : "", //날짜 수정시 전달될 정보
                updateTime : "", //시간 수정시 전달될 정보
            }
        },
        created(){
            this.getDetail();            
        },
        computed:{
            setRentalNum(){
                return this.details.rental_num;
            }
        },
        methods:{
            async getDetail(){
                let rental_num = this.$route.params.id;
                await axios
                    .get(`/moaplace.com/admin/rental/detail/${rental_num}`)
                    .then(function(resp){
                        if(resp.data.result == 'success'){
        
                            this.details  = resp.data.vo;
                            this.updateDate = this.details.rental_date;
                            this.updateTime = this.details.rental_time;
        
                        }else{
                            this.exists = false; //존재하지 않는 신청서일 때
                        }
                    }
                    .bind(this)
                )
            },
            getToday(){
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth()+1;
                let date = today.getDate();

                return year + "-" + (month >=10 ? month :'0' + month) + "-" + (date >=10 ? date : '0' + date); 
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
            },
            changeState(column){
                let state = "";
                switch(column)
                {
                    case "date": state = this.updateDate; break;
                    case "time": state = this.updateTime; break;
                    case "state" : state = this.details.rental_state; break;
                }
                axios
                    .get(`/moaplace.com/admin/rental/update/${column}/${this.details.rental_num}/${state}`)
                    .then(function(resp){
                        if(resp.data == 'success'){
                            if(column == "date")
                            {
                                alert( "대관희망 일자 변경을 완료했습니다."); 
                                this.details.rental_date = this.updateDate;
                            }
                            else if(column == "time")
                            {
                                alert( "대관시간 변경을 완료했습니다.");
                                this.details.rental_time = this.updateTime;
                            }else if(column == "state"){
                                alert( "진행상태 변경을 완료했습니다.");
                            }
                            
                        }else{
                            alert( "수정을 실패했습니다.");    
                        }
                    }
                    .bind(this)
                );
            },
            
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
                & > div {
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
                                .filesize{
                                    font-size: 14px;
                                    padding-left: 8px;
                                }
                                input[type="date"]{
                                    padding-left: 8px;
                                }
                            }
                            th {
                                width: 15%;
                                background: #eee;
                                text-align: center;
                            }
                            .editalble-box{
                                display: flex;
                                align-items: center;
                                & > *:first-child{
                                    margin-right: 8px;
                                }
                                button{
                                    border: none;
                                    padding: 4px 16px;
                                    background: $brown;
                                    color: #fff;
                                    & + button{
                                        margin-left: 8px;
                                        background: rgba($black, 0.5);
                                    }
                                }
                                select{
                                    padding: 5px 8px;
                                }
                            }
                        }
                    }
                }

            }
            
        }

    }
</style>