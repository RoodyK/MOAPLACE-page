<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="월간일정"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 월간일정</h2>
                <div class="calendar">
                    <div class="calendar-top">
                        <select class="years" v-model="currentYear">
                            <option
                                v-for="year in years"
                                :key="year"
                                :value="year">
                                {{year}}
                            </option>
                        </select>
                        년
                        <select class="months"  v-model="currentMonth">
                            <option
                                v-for="month in months"
                                :key="month"
                                :value="month">
                                {{month}}
                            </option>
                        </select>
                        월
                        <div class="btn-box">
                            <button class="month-btn material-icons">
                                navigate_before
                            </button>
                            <button class="month-btn material-icons">
                                navigate_next
                            </button>
                        </div>
                    </div>
                    <div class="calendar-main">
                        <div class="days">
                            <div
                                v-for="weekName in weekNames"
                                :key="weekName">
                                {{weekName}}
                            </div>
                        </div>
                        <div class="dates">
                            <div 
                                class="cal-row"
                                v-for="(row, index) in currentCalendar"
                                :key="index">
                                <div
                                    v-for="(day, index2) in row"
                                    :key="index2">
                                    {{day}}
                                </div>
                            </div>
                        </div>
                    </div>
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
        data: () => ({
            years:[2020,2021,2022,2023,2024],
            months:[1,2,3,4,5,6,7,8,9,10,11,12],
            weekNames:['일','월','화','수','목','금','토'],
            rootYear:2020,
            rootDayOfWeekIndex : 4, //2000년 1월 1일 = 토요일
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth()+1,
            currentDay: new Date().getDate(),
            currentMonthStartWeekIndex: null,
            currentCalendar:[],
            endOfDay : null,
            memoDatas: [],
        }),
        mounted(){
            this.init();
        },
        methods: {
                init(){
                    this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
                    this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
                    this.initCalendar();
                },
                initCalendar(){
                    this.currentCalendar = [];
                    let day=1;
                    for(let i=0; i<6; i++){
                    let calendarRow = [];
                    for(let j=0; j<7; j++){
                        if(i==0 && j<this.currentMonthStartWeekIndex){
                        calendarRow.push("");
                        }
                        else if(day<=this.endOfDay){
                        calendarRow.push(day);
                        day++;
                        }
                        else{
                        calendarRow.push("");
                        }
                    }
                    this.currentCalendar.push(calendarRow);
                    }
                },
                getEndOfDay(year, month){
                    switch(month){
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            return 31;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            return 30;
                        case 2:
                            if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                            return 29;   
                            }
                            else{
                                return 28;
                            }
                        default:
                            console.log("unknown month " + month);
                            return 0;
                    }
                },
                getStartWeek(targetYear, targetMonth){
                    let year = this.rootYear;
                    let month = 1;
                    let sumOfDay = this.rootDayOfWeekIndex;
                    for(;;){ //while(true)은 webpack compiled with 1 error발생
                        if(targetYear > year){
                            for(let i=0; i<12; i++){
                                sumOfDay += this.getEndOfDay(year, month+i);
                            }
                            year++;
                        }
                        else if(targetYear == year){
                            if(targetMonth > month){
                                sumOfDay += this.getEndOfDay(year, month);
                                month++;
                            }
                            else if(targetMonth == month){
                                return (sumOfDay) % 7;
                            }
                        }
                    }
                },
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