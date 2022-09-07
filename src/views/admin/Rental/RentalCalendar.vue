<template>
    <div id="wrap">
        <SideMenu largeCategory="대관관리" mediumCategory="월간일정"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">대관관리 - 월간일정</h2>
                <div class="calendar">
                    <div class="calendar-top">
                        <span>
                            {{currentYear}}년
                        </span>
                        <span>
                            {{currentMonth}}월
                        </span>
                        <button class="month-btn material-icons prev-btn" @click="onClickPrev(currentMonth)">
                            navigate_before
                        </button>
                        <button class="month-btn material-icons next-btn" @click="onClickNext(currentMonth)">
                            navigate_next
                        </button>
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
                                :key="index"
                                ref="calRow">
                                <div
                                    v-for="(day, index2) in row"
                                    :key="index2"
                                    :class="{empty: day ==''}">
                                    <span v-if="isToday(currentYear, currentMonth, day)" class="round">
                                        {{day}}
                                    </span>
                                    <span v-else>
                                        {{day}}
                                    </span>
                                    <ul>
                                        <li v-for="(item, index) in getDaySchedules(currentYear, currentMonth, day)" :key="index">
                                          <routerLink
                                            :to="`/moaplace.com/admin/rental/detail/${item.rental_num}`"
                                            :class="{modern: item.hall_num == 1, orchestra: item.hall_num == 2, art: item.hall_num == 3}">
                                            <span>{{ item.rental_time }}</span>
                                            <span>{{ item.rental_title }}</span>
                                          </routerLink>
                                        </li>
                                    </ul>
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
    import axios from '@/axios/axios.js'

    export default {
        components: {
            SideMenu
        },
        data: () => ({
            weekNames:['일','월','화','수','목','금','토'],
            rootYear:1904,
            rootDayOfWeekIndex : 4, //2000년 1월 1일 = 토요일
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth()+1,
            currentDay: new Date().getDate(),
            currentMonthStartWeekIndex: null,
            currentCalendar:[],
            endOfDay : null,
            memoDatas: [],
            schedules:[]
        }),
        mounted(){
            this.init();
        },
        methods: {
                init(){
                    this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
                    this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
                    this.initCalendar();
                    this.getMonthSchedule();
                },
                initCalendar(){
                    this.currentCalendar = [];
                    let day=1;
                    for(let i=0; i<6; i++){
                        let calendarRow = [];
                        for(let j=0; j<7; j++){
                            if(i==0 && j< this.currentMonthStartWeekIndex+1){
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
                onClickPrev(month){
                    month--;
                    if(month<=0){
                        this.currentMonth = 12;
                        this.currentYear -= 1;
                    }
                    else{
                     this.currentMonth -= 1;
                    }
                    this.init();
                },
                onClickNext(month){
                    month++;
                    if(month>12){
                        this.currentMonth = 1;
                        this.currentYear += 1;
                    }
                    else{
                        this.currentMonth += 1;
                    }
                    this.init();
                },
                isToday(year, month, day){
                    let date = new Date();
                    return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
                },
                getDaySchedules(year, month, day){
                    let list = [];
                    if(this.schedules.year == year && this.schedules.month == month) {
                        this.schedules.schedule.forEach(item => { 
                            let itemDay = item.rental_date.substr(-2,2);
                            
                            if(itemDay == day){
                                list.push(
                                    {
                                        rental_num : item.rental_num, 
                                        hall_num : item.hall_num, 
                                        rental_date : item.rental_date,
                                        rental_time : item.rental_time,
                                        rental_title : item.rental_title,
                                    }
                                );
                            }
                        });
                    }
                    return list;
                },
                getMonthSchedule(){
                    this.schedules = [];
                    axios
                        .get(`/moaplace.com/admin/rental/calendar/${this.currentYear}/${this.currentMonth}/${this.endOfDay}`)
                        .then(function(resp){
                            this.schedules = resp.data;
                            console.log(this.schedules);
                        }
                        .bind(this)
                    );
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
        text-decoration: none;
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

            .calendar{
                padding-top: 16px;
                .calendar-top{
                    width: 185px;
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 18px;
                    text-align: center;
                    font-weight: bold;
                    span{
                        &:first-child{
                            margin-right: 16px;
                        }
                        select{
                            border: none;
                            font-weight: bold;
                            &:focus{
                                outline: none;
                            }
                        }
                    }
                    .month-btn{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        border: none;
                        padding: 4px;
                        border-radius: 50%;
                        background: transparent;
                        font-size: 20px;
                        transition: all 0.3s;
                        &.prev-btn{
                            left: -32px;
                        }
                        &.next-btn{
                            right: -32px;
                        }
                        &:hover{
                            background: #ddd;
                        }
                    }
                }
                .calendar-main{
                    .days{
                        display: flex;
                        border-width: 1px 0;
                        margin-top: 16px;
                        background: $black;
                        color: #fff;
                        div{
                            width: calc(100% / 7);
                            padding: 8px 0;
                            text-align: center;
                            font-weight: bold;
                            border-right: 1px solid rgba($black, 0.5);
                            &:first-child{
                                color: #ff5872;
                            }
                            &:last-child{
                                border: none;
                                color: #73bdff;
                            }
                        }
                    }
                    .dates{
                        display: flex;
                        flex-flow: column;
                        .cal-row{
                            display: flex;
                            flex-flow: row;
                            border-bottom: 1px solid rgba($black, 0.5);
                            div{
                                width: calc(100% / 7);
                                border-right: 1px solid rgba($black, 0.5);
                                min-height: 150px;
                                font-weight: bold;
                                padding: 8px;
                                &.empty{
                                    background: #f3f3f3;
                                }
                                &:last-child{
                                    border: none;
                                    color: #2c88d9;
                                }
                                .round{
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 24px;
                                    height: 24px;
                                    padding: 4px;
                                    border-radius: 50%;
                                    background: rgba($black, 1);
                                    color: #fff;
                                    font-size: 14px;
                                    font-weight: 100;
                                }
                                ul{
                                  margin-top:8px;
                                  li{
                                    a{
                                        font-size: 14px;
                                        display: flex;
                                        color: $black;
                                        transition: all 0.3s;
                                        padding: 0 4px;
                                        margin-bottom: 8px;
                                        &.modern{background: rgba(darkcyan, 0.4);}
                                        &.orchestra{background: rgba(yellowgreen, 0.4);}
                                        &.art{background: rgba(blueviolet, 0.4);}
                                        span{
                                            &:first-child{
                                            padding-right: 8px;
                                            }
                                            &:last-child{
                                            overflow: hidden;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            }
                                      }
                                    }
                                  }
                                }
                            }
                        }
                    }
                }
            }
            
        }

    }
</style>