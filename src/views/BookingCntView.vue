<template>
  <div id="wrap">
    <div class="inner">
        <header>
            <button class="left">
                <i class="material-symbols-outlined">restart_alt</i>
                <span>예매 다시하기</span>
            </button>
            <h1 class="title">할인선택</h1>
            <button class="right">
                <span>창닫기</span>
                <i class="material-symbols-outlined">close</i>
            </button>
        </header>
        <main>
            <div class="content">
                <div class="cnt-info" v-if="ticketCnt[0].cnt>0"> 
                    <div class="cnt-title"> {{ticketCnt[0].grade}}석 {{ticketCnt[0].cnt}}매 중 {{ticketCnt[0].choiceA + ticketCnt[0].choiceY}}매를 선택하였습니다.</div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ticketCnt[0].priceA}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[0].choiceA">
                                <button @click="plus(e)"><i class="material-symbols-outlined">add</i></button>
                                <button @click="minus(e)"><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{ticketCnt[0].priceY}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[0].choiceY">
                                <button><i class="material-symbols-outlined">add</i></button>
                                <button><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                </div>

                <div class="cnt-info" v-if="ticketCnt[1].cnt>0"> 
                    <div class="cnt-title"> {{ticketCnt[1].grade}}석 {{ticketCnt[1].cnt}}매 중 {{ticketCnt[1].choiceA + ticketCnt[1].choiceY}}매를 선택하였습니다.</div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ticketCnt[1].priceA}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[1].choiceA">
                                <button><i class="material-symbols-outlined">add</i></button>
                                <button><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{ticketCnt[1].priceY}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[1].choiceY">
                                <button><i class="material-symbols-outlined">add</i></button>
                                <button><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                </div>

                <div class="cnt-info" v-if="ticketCnt[2].cnt>0"> 
                    <div class="cnt-title"> {{ticketCnt[2].grade}}석 {{ticketCnt[2].cnt}}매 중 {{ticketCnt[2].choiceA + ticketCnt[2].choiceY}}매를 선택하였습니다.</div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ticketCnt[2].priceA}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[2].choiceA">
                                <button><i class="material-symbols-outlined">add</i></button>
                                <button><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{ticketCnt[2].priceY}}원 </p>
                            <p>
                                <span><input type="text" v-model.number="ticketCnt[2].choiceY">
                                <button><i class="material-symbols-outlined">add</i></button>
                                <button><i class="material-symbols-outlined">remove</i></button></span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button>정정</button></div>
                    </div>
                </div>    
            </div>

            <aside>
                <h2 class="side-title">구매정보</h2>
                <h3 class="show-title">{{title}}</h3>
                <div class="show-info">
                    <div class="info-row">
                        <span>장소</span>
                        <span>{{place}}</span>
                    </div>
                    <div class="info-row">
                        <span>날짜</span>
                        <span>{{date}}</span>
                    </div>
                    <div class="info-row">
                        <span>회차</span>
                        <span>{{time}}</span>
                    </div>
                    <div class="info-row">
                        <span>좌석</span>
                        <span class="seats">
                            <p v-for="(seat, index) in seats" :key="index">
                                {{seat.grade}}석 {{seat.row}}{{seat.cols}}
                            </p>
                        </span>
                    </div>
                    <div class="pay-info">
                        <div class="pay-title"> 총 결제금액 </div> 
                        <div class="pay-amount"> 10,000 원 </div>
                    </div>
                </div>
            </aside>

            <div class="btn-box">
                <button>
                    <i class="material-symbols-outlined">keyboard_backspace</i>
                    <span>이전</span>
                </button>
                <button>
                    <span>결제선택</span>
                    <i class="material-symbols-outlined">arrow_right_alt</i>
                </button>
            </div>

        </main>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
        this.seats.filter((e) => {
            switch(e.grade) {
                case 'R' : this.ticketCnt[0].cnt++;
                            break;
                case 'S' : this.ticketCnt[1].cnt++;
                            break;
                case 'A' : this.ticketCnt[2].cnt++;
                            break; 
            }
        })
    },
    data(){
        return{
            title: '웃다가 우는 남자',
            place: '오케스트라홀',
            date: '22.08.16(화)',
            time : '1회차 14:30',
            seats:[
                {grade: 'R', row: 'A', cols: '01'},
                {grade: 'S', row: 'A', cols: '01'},
                {grade: 'S', row: 'A', cols: '02'},
                {grade: 'A', row: 'B', cols: '01'}
            ],
            ticketCnt: [
                {grade:'R', cnt:0, priceA:'150,000', priceY:'135,000', choiceA:0, choiceY:0},
                {grade:'S', cnt:0, priceA:'100,000', priceY:'90,000', choiceA:0, choiceY:0},
                {grade:'A', cnt:0, priceA:'80,000', priceY:'72,000', choiceA:0, choiceY:0}]
        }
    },
    methods:{
        plus(e){
            console.log(e.target);
        },
        minus(e){
            console.log(e.target);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/common.scss';
    *{margin: 0; padding: 0; text-decoration: none;}
    a{
        color: $black;
        &:hover{
            color: $black;
        }
    }
    #wrap{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        width: 100%;
        height: 100vh;
        font-family: 'Roboto', 'Nanum Gothic', sans-serif;
        background: rgba(#000, 0.7);
        .inner{
            width: $width;
            height: 700px;
            background: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            header{
                width: 100%;
                height: 64px;
                background: $black;
                color: #fff;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                padding: 0 24px;
                &> button{
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    font-size: 14px;
                    background: none;
                    border: none;
                    color: rgba(#fff, 0.9);
                    &> :first-child{
                        margin-right: 8px;
                    }
                }
                h1.title{
                    font-size: 22px;
                }
            }
            main{
                display: flex;
                flex-flow: row nowrap;
                height: calc(100% - 64px);

                .content{
                    width: 80%;
                    padding: 18px 24px;

                    .cnt-info{
                        width:100%;
                        text-align: center;
                        margin-bottom: 16px;

                        .cnt-title {
                            border: 1px solid rgba($black, 0.3);
                            background-color: rgba($black, 0.1);
                            padding: 16px;
                            word-spacing:2px;                 
                        }
                        .cnt-ticket {
                            border-bottom: 1px solid rgba($black, 0.3);
                            width: 100%;
                            padding: 14px;
                            display:flex;
                            justify-content: space-between;

                            .cnt-1 {
                                display: flex;
                                align-items: center;
                                width:70%;

                                p {
                                    &:nth-child(1){
                                        width:20%;
                                        text-align: left;
                                    }
                                    &:nth-child(2){
                                        width:30%;
                                        text-align: left;
                                    }
                                    &:nth-child(3){  
                                        display:flex;
                                        align-items: center;                                    
                                        span{                                        
                                            display:block;
                                            border:1px solid $black;
                                            margin-right:6px;
                                    
                                            & > button {
                                                padding: 4px 6px;
                                                background-color: transparent;
                                                border:none;
                                                border-left:1px solid black;

                                                i{
                                                    vertical-align: middle;
                                                }
                                            }
                                            input {
                                                width: 50px;
                                                border:none;
                                                vertical-align: middle;
                                                padding-left:16px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        .cnt-2 {
                            button {
                                padding: 4px 20px;
                                background-color:transparent;
                                color: $brown;
                                border:1px solid $brown;

                                &:hover {
                                    background-color:$brown;
                                    color:#fff;
                                }
                            }    
                        }                        
                    }
                }
                aside{
                    width: 20%;
                    border-left: 1px solid rgba($black, 0.3);
                    padding: 32px 16px 0 16px;
                    text-align: center;
                    position: relative;
                    .side-title{
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 24px;
                    }
                    .show-title{
                        font-size: 18px;
                        padding-bottom: 16px;
                        margin-bottom: 24px;
                        border-bottom: 1px solid $black;
                        font-weight: bold;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .show-info{
                        width: 100%;
                        display: flex;
                        flex-flow: column nowrap;
                        .info-row{
                            width: 100%;
                            display: flex;
                            flex-flow: row nowrap;
                            margin-bottom: 8px;
                            span:first-child{
                                margin-right: 16px;
                                font-weight: bold;
                            }
                        }
                    }
                    .pay-info{
                        position: absolute;
                        bottom: 128px;
                        left: 0;
                        width: 100%;
                        color: #fff;
                        background: rgba($black, 0.8);

                        &> .pay-title{
                            padding-top: 16px;
                            font-size: 16px;
                        }
                        &> .pay-amount{
                            padding-bottom: 16px;
                            font-size: 32px;
                        }
                    }
                }

                .btn-box{
                    width: 20%;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    button{
                        width: 100%;
                        height: 64px;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        align-items: center;
                        border: none;
                        background: #cdc7b9;
                        > :first-child{
                            margin-right: 8px;
                        }
                        &:last-child{
                            background: $brown;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

</style>