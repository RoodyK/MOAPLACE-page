<template>
<div>
<AppHeader/>
<SideVisual menu="SHOW / TICKET" img="show"/>
    <div class="wrap">
        
        <div class="period">
            <div class="yearBox">
                <input
                    type="text"
                    v-model.number="year"
                    @change="createMonth"
                    readonly="readonly">
                    <p>년</p>
                    <div class="btnSpin">
                        <button class="spiner" @click="upYear">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                fill="currentColor"
                                class="bi bi-chevron-up"
                                viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                            </svg>
                        </button>
                        <button class="spiner" @click="downYear">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                fill="currentColor"
                                class="bi bi-chevron-down"
                                viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <select v-model="month" @change="createMonth">
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                    <option value="4">4월</option>
                    <option value="5">5월</option>
                    <option value="6">6월</option>
                    <option value="7">7월</option>
                    <option value="8">8월</option>
                    <option value="9">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
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
                            <th>
                                <span class='sunday'>일</span>
                            </th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>
                                <span class='satday'>토</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-html="calendar"></tbody>
                </table>
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="exit">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="poster">
                            <img
                                src="https://www.sejongpac.or.kr/cmmn/file/imageSrc.do?fileStreCours=faec0c25744c22e99776405c0fa72802c8777c70061f67507e3bee4a2a5844e9&streFileNm=7092ee934032e328dac3abc9fd80d8856a7ff77472074eb1dad6fba65becd736"></div>
                            <div class="preview">
                                <div class="title">
                                    <p>모던홀</p>
                                </div>
                                <p class="tit">웃는남자</p>
                                <p>2022.08.02~2022.09.05</p>
                                <a href="#">자세히 보기</a>
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
                        today: new Date()
                            .toISOString()
                            .substr(0, 10), //오늘 날짜 2022-08-09 형식
                        dateCnt: 1,
                        year: parseInt(new Date().toISOString().substr(0, 4)),
                        month: parseInt(new Date().toISOString().substr(5, 2))
                    }
                },
                mounted() {
                    this.createMonth();
                },
                methods: {
                    prevMonth() {
                        if (this.year < 2017 && this.month==1)return;
                        this.month--;
                        if (this.month < 1) {
                            this.year--;
                            this.month = 12;
                        }
                        this.createMonth();
                    },
                    upYear() {
                        if (this.year >= 2025)return;
                        this.year++;
                        this.createMonth();
                    },
                    downYear() {
                        if (this.year < 2017)return;
                        this.year--;
                        this.createMonth();
                    },
                    nextMonth() {
                        if (this.year >= 2025 && this.month==12)return;
                        this.month++;
                        if (this.month > 12) {
                            this.year++;
                            this.month = 1;
                        }
                        this.createMonth();
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
                        this.calendar = '';
                        for (let w = 1; w <= this.weekCnt(); w++) {
                            this.calendar += "<tr>";
                            for (let i = 0; i < 7; i++) {
                                if (w == 1) { //첫째주 반복문
                                    if (i >= this.firstDay()) {
                                        if (i == 0) { //일요일이면 span 주기
                                            this.calendar += "<td><p class='day'><span class='sunday'>" + (
                                                this.dateCnt++
                                            ) + "</span></p></td>";
                                        } else if (i == 6) { //일요일이면 span 주기
                                            this.calendar += "<td><p class='day'><span class='satday'>" + (
                                                this.dateCnt++
                                            ) + "</span></p></td>";
                                        } else {
                                            this.calendar += "<td><p class='day'>" + (
                                                this.dateCnt++
                                            ) + "</p></td>";
                                        }
                                        if (i == 6) {
                                            this.calendar += "</tr>";
                                            break;
                                        }
                                    } else {
                                        this.calendar += "<td></td>";
                                    }
                                }
                                if (w > 1) { //둘째주부터 반복문
                                    if (this.dateCnt <= this.lastDay()) {
                                        if (i == 0) { //일요일이면 span 주기
                                            this.calendar += "<td><p class='day'><span class='sunday'>" + (
                                                this.dateCnt++
                                            ) + "</span></p><div class='container mt-3'><ul><li><div class='icon1-td'>M</di" +
                                                    "v><a href='#myModal' data-bs-toggle='modal'>웃는남자</a></li><li><div class='icon2" +
                                                    "-td'>O</div><a href='#myModal' data-bs-toggle='modal'>우는남자</a></li><li><div cl" +
                                                    "ass='icon3-td'>A</div><a href='#myModal' data-bs-toggle='modal'>졸린여자</a></li><" +
                                                    "/ul></div></td>";
                                        } else if (i == 6) { //토요일이면 span 주기
                                            this.calendar += "<td><p class='day'><span class='satday'>" + (
                                                this.dateCnt++
                                            ) + "</span></p></td>";
                                        } else {
                                            this.calendar += "<td><p class='day'>" + (
                                                this.dateCnt++
                                            ) + "</p></td>";
                                            if (this.dateCnt == this.today.substr(8, 2)) { //오늘 일자일 때
                                            }
                                        }
                                    } else { //요일 없는 빈칸 찍기
                                        this.calendar += "<td></td>";
                                        this.dateCnt++;
                                    }
                                    if (i == 6) { //토요일마다 줄바꿈하기
                                        this.calendar += "</tr>";
                                        break;
                                    }
                                }
                            }
                        }
                        this.dateCnt = 1;
                    }
                }
            }
        </script>
        <style lang="scss" scoped="scoped">
            @import '@/scss/common.scss';
            * {
                margin: 0;
                padding: 0;
                top: 0;
                left: 0;
            }
            .wrap::v-deep {
                width: 1100px;
                margin: auto;
                position: relative;
                margin-top: 120px;
                margin-bottom: 120px;
                .period {
                    width: 230px;
                    text-align: center;
                    position: relative;
                    top: 10px;
                    vertical-align: middle;
                    margin: 20px auto;
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
                    .yearBox {
                        display: inline-block;
                        width: 120px;
                        position: relative;
                        p {
                            font-weight: bold;
                            font-size: 25px;
                            display: inline-block;
                        }
                        .btnSpin {
                            position: absolute;
                            right: 0;
                            top: 6px;
                            left: unset;
                            display: flex;
                            flex-direction: column;
                            button {
                                background: none;
                                margin: -6px;
                                border: none;
                                svg {
                                    margin: 0;
                                    padding: 0;
                                }
                            }
                        }
                    }
                    select {
                        height: 30px;
                        font-weight: bold;
                        font-size: 23px;
                        border: 0;
                        margin: 5px 5px 5px 15px;
                    }
                    select:focus {
                        outline: none;
                    }
                    input:focus {
                        outline: none;
                    }
                    input {
                        width: 60px;
                        height: 30px;
                        font-weight: bold;
                        font-size: 25px;
                        border: 0;
                        margin: 5px;
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
                        color: white;
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
                    color: white;
                    text-align: center;
                    position: relative;
                    display: inline-block;
                    top: -2px;
                }
                .icon1,
                .icon1-td {
                    background-color: darkcyan;
                }
                .icon2,
                .icon2-td {
                    background-color: yellowgreen;
                }
                .icon3,
                .icon3-td {
                    background-color: blueviolet;
                }
                .tb {
                    width: 100%;
                    margin: auto;
                    .sunday {
                        color: red;
                    }
                    .satday {
                        color: blue;
                    }
                    .calendar {
                        width: 100%;
                        height: 800px;
                        margin: auto;
                        thead {
                            width: 150px;
                            height: 75px;
                            text-align: center;
                            border: 0;
                            border-bottom: 3px solid gainsboro;
                            td,
                            th {
                                width: 157px;
                                border: 1px solid gainsboro;
                                vertical-align: middle;
                            }
                        }
                        tbody {
                            border: 1px solid gainsboro;
                            td,
                            th {
                                width: 157px;
                                height: 157px;
                                border: 1px solid gainsboro;
                                position: relative;
                                .day {
                                    font-weight: bold;
                                    width: 50px;
                                    font-weight: bold;
                                    position: absolute;
                                    top: 15px;
                                    left: 15px;
                                }
                            }
                            ul {
                                margin-top: 40px;
                                list-style: none;
                                padding-left: 0;
                                a {
                                    text-decoration: none;
                                    color: $black;
                                    margin: 5px;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                }
                .modal {
                    width: 450px;
                    height: 450px;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .modal-dialog {
                        width: 100%;
                        height: 100%;
                        .modal-content {
                            flex-direction: row;
                            .exit {
                                position: absolute;
                                top: 5px;
                                width: 25px;
                                right: 0;
                                left: unset;
                                z-index: 9999;
                            }
                            .poster {
                                width: 50%;
                                img {
                                    width: 80%;
                                    margin: 25px;
                                }
                            }
                            .preview {
                                width: 50%;
                                height: 300px;
                                .title {
                                    position: relative;
                                    p {
                                        height: 30px;
                                        background: darkcyan;
                                        color: white;
                                        text-align: center;
                                        margin-top: 25px;
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
                                    color: gray;
                                }
                                a {
                                    background-color: gainsboro;
                                    text-decoration: none;
                                    color: white;
                                    display: block;
                                    width: 200px;
                                    margin-top: 120px;
                                    padding: 8px 0;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        </style>