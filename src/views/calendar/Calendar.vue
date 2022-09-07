<template>
<div>
<AppHeader/>
<SideVisual menu="SHOW / TICKET" img="show" title="월간일정"/>
    <div class="wrap">
        <h2 class="title">월간 일정</h2>
        <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>
        <div class="period">
            <div class="yearBox">
                </div> 
                <select v-model="year" @change="selectYearMonth">
                    <option v-for="(item,index) in yearList" :key="index" :value='item'>{{item}}년</option>
                </select>
                <select v-model="month" @change="selectYearMonth">
                    <option v-for="(item,index) in monthList" :key="index" :value='item'>{{item.padStart(2, '0')}}월</option>
                </select>
                <div class="btn-box">
                    <button class="moveBtn" @click="prevMonth">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="white"
                            class="bi bi-chevron-left"
                            viewBox="0 0 16 16">
                            <path
                                fill-rule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <button class="moveBtn" @click="nextMonth">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="white"
                            class="bi bi-chevron-right"
                            viewBox="0 0 16 16">
                            <path
                                fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>

            </div>
            <div class="moaList">
                <ul>
                    <li>
                        <div class='icon1'>M</div>
                        <p>모던홀</p>
                    </li>
                    <li>
                        <div class='icon2'>O</div>
                        <p>오케스트라홀</p>
                    </li>
                    <li>
                        <div class='icon3'>A</div>
                        <p>아트홀</p>
                    </li>
                </ul>
            </div>
            <div class="tb">
                <table class="calendar">
                    <thead>
                        <tr>
                            <th v-for="(item,index) in dateList" :key="index">
                                <span :class="{'sunday':item=='일','satday':item=='토'}" >{{item}}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,i) in calendarList" :key="i">
                        <td v-for="(day,index) in item" :key="index">
                          <div class="dateBox">
                            <p class='day'>
                              <span :class="{'sunday':index==0,'satday':index==6}">
                                {{day.date}}
                              </span>
                            </p>
                            <div class='container mt-3'>
                              <ul>
                                <li v-for="(i,e) in day.schedule" :key="e">
                                    <div :class="{'icon1-td':i.hallNum==1,
                                      'icon2-td':i.hallNum==2,
                                      'icon3-td':i.hallNum==3}">
                                      {{i.hallNum==1?'M':i.hallNum==2?'O':'A'}}
                                      </div>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"
                                     @click="viewMoadal(i)">
                                      {{i.showName}}</button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="exit">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="poster">
                            <img :src="posterImg" class="posterImg"></div>
                            <div class="preview">
                              <div>
                                <div class="title">
                                    <p :class="{'hall1':this.modalHallNum==1,
                                      'hall2':this.modalHallNum==2,
                                      'hall3':this.modalHallNum==3}">{{modalHallName}}</p>
                                </div>
                                <div>
                                  <p class='tit'>{{modalTitle}}</p>
                                </div>
                                <div><p>{{modalTerm}}</p></div>
                              </div>
                              <div>
                                <a href="#" @click="goDetail(this.modalNum)" data-bs-dismiss="modal">자세히 보기</a>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter/>
        </div>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import axios from '@/axios/axios.js';
export default {
    name: 'ShowCalendar',
    components:{
        AppHeader,
        AppFooter,
        SideVisual
    },
    data() {
        return {
            calendar: '',
            today: new Date().getDate(),
            dateCnt: 1,
            year: new Date().getFullYear(),
            month: new Date().getMonth() +1,
            yearList:['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
            monthList:['1','2','3','4','5','6','7','8','9','10','11','12'],
            dateList:['일','월','화','수','목','금','토'],
            calendarList:[],
            weekList:[],
            posterImg:'',
            hallList:[
                { id: '1', value:'모던홀'},
                { id: '2', value:'오케스트라홀'},
                { id: '3', value:'아트홀'},
            ],
            list:[],
            filterResult:[],
            showMoadal:'modal',
            modalHallName:'',
            modalTitle:'',
            modalTerm:'',
            modalHallNum:'',
            modalNum:''
        }
    },
    mounted() {
        this.loadSchedule();
    },
    methods: {
        prevMonth() {
            if (this.year < 2017 && this.month==1)return;
            this.month--;
            if (this.month < 1) {
                this.year--;
                this.month = 12;
            }
            this.list.splice(0)
            this.loadSchedule();
        },
        upYear() {
            if (this.year >= 2025)return;
            this.year++;
            this.list.splice(0)
            this.loadSchedule();
        },
        downYear() {
            if (this.year < 2017)return;
            this.year--;
            this.list.splice(0)
            this.loadSchedule();
        },
        nextMonth() {
            if (this.year >= 2025 && this.month==12)return;
            this.month++;
            if (this.month > 12) {
                this.year++;
                this.month = 1;
            }
            this.list.splice(0)
            this.loadSchedule();
        },
        selectYearMonth(){
            this.list.splice(0)
            this.loadSchedule();
        },
        lastDay() { // 달 말일 구하기
            return new Date(this.year, this.month, 0).getDate();
        },
        firstDay() { //달 첫째날의 요일 구하기(0이 일요일)
            return new Date(this.year, (this.month - 1), 1).getDay();
        },
        weekCnt() { //한 달 몇 주인지 구하기
            return Math.ceil((this.lastDay() + this.firstDay()) / 7);
        },
        createMonth() { //
            this.calendarList.splice(0)
            this.dateCnt=1
            for(let w = 1; w <= this.weekCnt(); w++){
            for (let i = 0; i < 7; i++) {
                //첫째주 반복문
                if (w == 1) { 
                if (i >= this.firstDay()){

                    this.filterResult = this.list.filter(
                        v => v.scheduleDate.substr(8,2).replace(/(^0+)/, "") == this.dateCnt)
                    //달의 첫째 요일부터 카운트하는 dateCnt변수 날짜 입력하면서 더하기
                    this.weekList.push({
                    date : this.dateCnt++,
                    schedule : this.filterResult});   
                    this.filterResult=[];
                    }else{
                    //첫째요일이 아니면 공백 입력
                    this.weekList.push(""); 
                }
                }
                //둘째주부터 반복문
                if (w > 1) { 
                //날짜가 달의 마지막날보다 작거나 같으면 날짜 입력 
                if (this.dateCnt <= this.lastDay()) { 

                    this.filterResult = this.list.filter(
                        v => v.scheduleDate.substr(8,2).replace(/(^0+)/, "") == this.dateCnt)
                    this.weekList.push({
                    date : this.dateCnt++,
                    schedule : this.filterResult});   
                    this.filterResult=[];
                }else{
                    this.weekList.push("");
                }
                }
            }
            this.calendarList.push(this.weekList)
            this.weekList=[]
            }
        },

        loadSchedule(){
            let yearMonth = this.year.toString().substr(2,2) + ("0"+this.month).slice(-2);
            this.list.splice(0);
            axios.get('/moaplace.com/show/calendar/'+ yearMonth)
            .then(function(resp){
            this.list = resp.data.list
            this.createMonth()
            }.bind(this))                 
        },

        viewMoadal(i){
            this.posterImg = '';

            switch(i.hallNum){
            case i.hallNum=1 : this.modalHallName = '모던홀'; break;
            case i.hallNum=2 : this.modalHallName = '오케스트라홀'; break;
            case i.hallNum=3 : this.modalHallName = '아트홀'; break;
            }
            this.modalTitle = i.showName;
            this.modalTerm = i.showStart +" ~ "+ i.showEnd;
            this.modalNum = i.showNum;
            this.modalHallNum = i.hallNum;
            axios.get('/moaplace.com/show/calendar/thumbnail/' + i.showNum)
            .then(function(resp){
            this.posterImg = resp.data
            }.bind(this))
        },

        goDetail(num){
            this.$router.push({
            name:'showdetail',
            params:{show_num:num}
            })
        }
    }
}
</script>
<style lang="scss" scoped="scoped">
@import '@/scss/common.scss';
* {
    margin: 0;
    padding: 0;
    left:0;
    top:0;
}

.wrap{
    width: 1100px;
    margin: auto;
    position: relative;
    margin-top: 120px;
    margin-bottom: 120px;
    h2.title{
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
        & + p{
        text-align: center;
        margin-bottom: 64px;
        }
    }
    .period {
        width: 230px;
        text-align: center;
        position: relative;
        vertical-align: middle;
        margin: 32px auto;
        .btn-box {
            .moveBtn {
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: $black;
                top: 50%;
                transform: translateY(-50%);
                &:first-child {
                    left: -20px;
                }
                &:last-child {
                    left: unset;
                    right: -20px;
                }
                svg {
                    position: absolute;
                    top: 50%;
                    left: 53%;
                    transform: translate(-50%,-50%);
                }
            }
        }
        select {
            height: 30px;
            font-weight: bold;
            font-size: 23px;
            border: 0;
            margin: 4px;
        }
        select:focus {
            outline: none;
        }
    }
    .moaList {
        .icon1,
        .icon2,
        .icon3 {
            border-radius: 50%;
            width: 22px;
            height: 22px;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            display: inline-block;
        }
        ul {
            list-style: none;
            padding-left: 0;
            li {
                display: inline-block;
                p {
                    display: inline-block;
                    margin: 10px;
                    font-weight: bold;
                }
            }
        }
    }
    .icon1-td,
    .icon2-td,
    .icon3-td {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        font-size: 11px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        padding: 0px 2px 2px 2px;

    }
    .icon1,
    .icon1-td,
    .hall1{
        background-color: rgb(0, 139, 139);
    }
    .icon2,
    .icon2-td,
    .hall2{
        background-color: rgb(154, 205, 50);
    }
    .icon3,
    .icon3-td,
    .hall3{
        background-color: rgb(138, 43, 226);
    }
    .tb {
        width: 100%;
        margin: auto;
        
        .sunday {
            color: rgb(255, 0, 0);
        }
        .satday {
            color: rgb(0, 0, 255);
        }
        .calendar {
            width: 100%;
            height: 800px;
            margin: auto;
            table-layout: fixed;
            thead {
                width: 150px;
                height: 75px;
                text-align: center;
                border: 0;
                border-bottom: 3px solid rgba($black,0.2);
                td,
                th {
                    width: 157px;
                    border: 1px solid rgba($black,0.2);
                    vertical-align: middle;
                    table-layout: fixed;
                }
            }
            tbody {
                border: 1px solid rgba($black,0.2);
                td,
                th {
                    width: 157px;
                    height: 157px;
                    border: 1px solid rgba($black,0.2);
                    position: relative;
                                                    
                    .dateBox{
                        margin: 0;
                        .day {
                        font-weight: bold;
                        width: 50px;
                        font-weight: bold;
                        display: flex;
                        padding: 16px 0px 0px 16px; 
                    }
                    }
                    .mt-3{
                        margin:0px;
                        padding: 8px 16px 12px 16px;
                
                    }
                }
                ul {
                    list-style: none;
                    padding-left: 0;
                    overflow: hidden;
                    white-space: nowrap;
                    li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    }
                    .btn-primary {
                    border:none;
                    color: $black;
                    background-color: #fff;
                    margin: 0;
                    font-size: 16px;
                    padding: 0 6px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 120px;
                    text-align:left;
                    &.btn-primary:focus{
                        box-shadow:none;
                        }
                    }
                }
            }
        }
    }
    .modal {
        width: 450px;
        height: 450px;
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        &::-webkit-scrollbar{
            display: none;
        }
        .modal-dialog {
            width: 100%;
            .modal-content {
                flex-direction: row;
                .exit {
                    position: absolute;
                    top: 5px;
                    width: 25px;
                    right: 0;
                    left: unset;
                    z-index: 9999;
                    .btn-close:focus{
                        box-shadow:none;
                    }
                }
                .poster {
                    width: 50%;
                    height: 300px;
                    display: flex;
                    justify-content: center;
                    padding: 16px 8px 16px 16px;
                    overflow: hidden;
                    .posterImg {
                        width: 100%;
                        height:100%;
                        display: flex;
                    }
                }
                .preview {
                    width: 50%;
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 16px 16px 16px 8px;
                    .title {
                        position: relative;
                        p {
                        height: 30px;
                        color: #fff;
                        text-align: center;
                        padding: 4px 16px;
                        display: inline-block;
                        }
                    }
                    .tit {
                        font-size: 20px;
                        margin-top: 10px;
                        font-weight: bold;
                    }
                    
                    p {
                        font-size: 15px;
                        color: $black;
                    }
                    div{
                        &:nth-child(4){
                        background-color: red;
                        display: flex;
                        align-items: end;
                    }
                    }
                    a {
                        background-color: rgba($black,0.5);
                        text-decoration: none;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        width: 200px;
                        padding: 8px 0;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>

