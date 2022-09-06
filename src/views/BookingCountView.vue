<template>
  <div id="wrap">
    <div class="inner">
        <header>
            <button class="left" @click="resetModal">
                <i class="material-symbols-outlined">restart_alt</i>
                <span>예매 다시하기</span>
            </button>
            <h1 class="title">할인선택</h1>
            <button class="right" @click="closeModal">
                <span>창닫기</span>
                <i class="material-symbols-outlined">close</i>
            </button>
        </header>

        <main>
            <div class="content">
                <div class="cnt-info" v-if="changeTicket[0].count>0"> 
                    <div class="cnt-title">
                        {{changeTicket[0].grade}}석 {{changeTicket[0].count}}매 중
                        {{changeTicket[0].countA + changeTicket[0].countY}}매를 선택하였습니다.
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ formatPrice(changeTicket[0].priceA) }}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[0].countA">
                                    <button @click="plus($event, 0)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(0, 'A')">정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{formatPrice(changeTicket[0].priceY)}}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[0].countY">
                                    <button @click="plus($event, 0)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(0, 'Y')">정정</button></div>
                    </div>
                </div>

                <div class="cnt-info" v-if="changeTicket[1].count>0"> 
                    <div class="cnt-title">
                        {{changeTicket[1].grade}}석 {{changeTicket[1].count}}매 중
                        {{changeTicket[1].countA + changeTicket[1].countY}}매를 선택하였습니다.
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ formatPrice(changeTicket[1].priceA) }}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[1].countA">
                                    <button @click="plus($event, 1)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(1, 'A')">정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{formatPrice(changeTicket[1].priceY)}}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[1].countY">
                                    <button @click="plus($event, 1)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(1, 'Y')">정정</button></div>
                    </div>
                </div>

                <div class="cnt-info" v-if="changeTicket[2].count>0"> 
                    <div class="cnt-title">
                        {{changeTicket[2].grade}}석 {{changeTicket[2].count}}매 중
                        {{changeTicket[2].countA + changeTicket[2].countY}}매를 선택하였습니다.
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 일반 </p> 
                            <p> {{ formatPrice(changeTicket[2].priceA) }}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[2].countA">
                                    <button @click="plus($event, 2)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(2, 'A')">정정</button></div>
                    </div>
                    <div class="cnt-ticket">
                        <div class="cnt-1">
                            <p> 청소년 </p> 
                            <p> {{formatPrice(changeTicket[2].priceY)}}원 </p>
                            <p>
                                <span>
                                    <input type="text" v-model.number="changeTicket[2].countY">
                                    <button @click="plus($event, 2)">
                                        <i class="material-symbols-outlined">add</i>
                                    </button>
                                    <button @click="minus($event)">
                                        <i class="material-symbols-outlined">remove</i>
                                    </button>
                                </span>
                                매
                            </p>
                        </div>
                        <div class="cnt-2"><button @click="clear(2, 'Y')">정정</button></div>
                    </div>
                </div>

            </div>

            <aside>
                <h2 class="side-title">구매정보</h2>
                <h3 class="show-title">{{booking[0].title}}</h3>
                <div class="show-info">
                    <div class="info-row">
                        <span>장소</span>
                        <span>{{booking[0].place}}</span>
                    </div>
                    <div class="info-row">
                        <span>날짜</span>
                        <span>{{booking[0].schedule_date}}</span>
                    </div>
                    <div class="info-row">
                        <span>회차</span>
                        <span>{{booking[0].time}}</span>
                    </div>
                    <div class="info-row">
                        <span>좌석</span>
                        <span class="seats">
                            <p v-for="(seat, index) in seats" :key="index">
                                {{seat.grade}}석 {{seat.row}}{{seat.col}}
                            </p>
                        </span>
                    </div>
                    <div class="pay-info">
                        <div class="pay-title"> 총 결제금액 </div> 
                        <div class="pay-amount"> {{formatPrice(total)}} 원 </div>
                    </div>
                </div>
            </aside>

            <div class="btn-box">
                <button @click="goPrev()">
                    <i class="material-symbols-outlined">keyboard_backspace</i>
                    <span>이전</span>
                </button>
                <button @click="goNext()">
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
    created(){
        let countR = 0;
        let countS = 0;
        let countA = 0;
        this.seats.forEach(e => {
            switch(e.grade) {
                case 'R' : countR++;
                           break;
                case 'S' : countS++;
                           break;
                case 'A' : countA++;
                           break;   
            }
        });
        console.log("매수: ", countR, countS, countA);
            
        this.price.forEach(e => {
            let temp = {
                grade: e.grade_seat,
                count: 0,
                priceA: e.grade_price,
                priceY: e.grade_price*0.8,
                countA: 0,
                countY: 0
            };

            switch(e.grade_seat) {
                case 'R' :  temp.count = countR;
                            this.changeTicket.splice(0,0,temp);
                            break;
                case 'S' :  temp.count = countS;
                            this.changeTicket.splice(1,0,temp);
                            break;
                case 'A' :  temp.count = countA;
                            this.changeTicket.splice(2,0,temp);
                            break;
            }
        })
        console.log(this.changeTicket);
    },
    data(){
        return{
            changeTicket: []
        }
    },
    computed: {
        booking() {
            let booking = [{
                title: this.$store.state.booking.title,
                place: this.$store.state.booking.place,
                schedule_date: this.$store.state.booking.schedule_date,
                time: this.$store.state.booking.time
            }]
            return booking;
        },
        seats() {
            return this.$store.state.booking.seats;
        },
        price() {
            return this.$store.state.booking.gradePrice;
        },
        tickets() {
            return this.$store.state.booking.tickets;
        },
        total() {
            let r = (this.changeTicket[0].priceA * this.changeTicket[0].countA) 
                  + (this.changeTicket[0].priceY * this.changeTicket[0].countY);
            let s = (this.changeTicket[1].priceA * this.changeTicket[1].countA) 
                  + (this.changeTicket[1].priceY * this.changeTicket[1].countY);
            let a = (this.changeTicket[2].priceA * this.changeTicket[2].countA) 
                  + (this.changeTicket[2].priceY * this.changeTicket[2].countY);
            return r + s + a;
        }
    },
    methods:{
        formatPrice(n){
            return n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        },
        plus(e, n){
            let el = e.currentTarget.parentElement.children[0];
            let tot = this.changeTicket[n].countA + this.changeTicket[n].countY;

            if(tot == this.changeTicket[n].count){
                return;
            } else {
                el.value++;
            }
            el.dispatchEvent(new Event('input'));
        },
        minus(e){
            let el = e.currentTarget.parentElement.children[0];

            if(el.value<1){
                return;
            } else {
                el.value--;
            }
            el.dispatchEvent(new Event('input'));
        },
        clear(index, rate){
            switch(rate) {
                case 'A' : this.changeTicket[index].countA = 0;
                            break;
                case 'Y' : this.changeTicket[index].countY = 0;
                            break;
            }
            // let el = e.currentTarget.parentElement.previousSibling.children[2].children[0].children[0];
            // console.log(el);
            // el.value = 0;
            // el.dispatchEvent(new Event('input'));
        },
        goPrev(){
            if(confirm('선택 매수가 초기화됩니다.\n이전으로 돌아가시겠습니까?')){
                this.$router.go(-1);
            } else return;
        },
        goNext(){
            let tot = 0;
            this.changeTicket.forEach(e => {
                tot += e.count;
            }) // 전체 수량
            let select = 0;
            this.changeTicket.forEach(e => {
                select += (e.countA + e.countY);
            }) // 선택 수량

            if(select < tot){
                alert('잔여 매수를 모두 선택하세요.');
                return;

            } else {
                this.$store.commit('booking/updateTicket', {
                    changeTicket : this.changeTicket,
                    changeTotal : this.total
                });
                console.log(this.tickets);
                this.$router.push('/moaplace.com/booking/payment');
            }
        },
        //모달창 종료
        closeModal(){
            let chk = window.confirm("모든 선택이 초기화되며 예매창이 종료됩니다.");
            if(chk == true){
                // 자식창에서 부모창으로 함수 호출 ( 데이터 전달 )
                window.parent.postMessage(
                // 전달할 data (부모창에서 호출할 함수명)
                { functionName : 'closeShow' }
                // 부모창의 도메인
                , 'http://localhost:8080/moaplace.com/'
                );
            }else{
                return;
            }
        },
        //예매다시하기(vuex 초기화)
        resetModal(){
            let chk = window.confirm("모든 선택이 초기화되며 일정 선택 페이지로 이동합니다.");
            if(chk == true){
                let num = this.$store.state.booking.show_num;
                this.$store.commit('booking/resetAllChoice');
                this.$router.push('/moaplace.com/booking/select/'+num);
            }else{
                return;
            }
            
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
            width: 1000px;
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