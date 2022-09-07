<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="예매정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">예매정보 - 예매상세</h2>

                <div class="titleBox">
                    <span>예매번호</span>
                    <input type="text" v-model="num" readonly>
                    <span>회원아이디</span>
                    <input type="text" v-model="id" readonly>
                    <span>공연명</span>
                    <input type="text" v-model="title" readonly>
                </div>

                <div class="ticketInfo">
                    <h3>예매정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연날짜</th>
                                <td>{{list.scheduleDate}}</td>
                                <th>공연시작시간</th>
                                <td>{{list.scheduleTime}}</td>
                            </tr>
                            <tr>
                                <th>예약좌석수</th>
                                <td colspan="3"> 총 {{list.bookingCount}} 석 ({{list.ticketDetail}})</td>
                            </tr>
                            <tr>
                                <th>예약좌석</th>
                                <td colspan="3">{{list.bookingSeat}} </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="payment">
                    <h3>결제내역</h3>
                    <div>
                        <table>
                            <tr>
                                <th>결제일</th>
                                <td colspan="3">{{list.paymentDate}}</td>
                            </tr>
                            <tr>
                                <th>결제금액</th>
                                <td>{{list.allticketPrice}}원</td>
                                <th>사용적립금</th>
                                <td>{{list.usePoint}}원</td>
                            </tr>
                            <tr>
                                <th>결제수단</th>
                                <td colspan="3">{{list.paymentMethod}}</td>
                            </tr>
                            <tr>
                                <th>최종금액</th>
                                <td colspan="3">{{list.bookingPrice}}원</td>
                            </tr>
                            <tr>
                                <th>결제상태</th>
                                <td colspan="3">{{list.paymentStatus}}</td>
                            </tr>

                        </table>
                    </div>
                </div>

                <div class="btnBox">
                    <button @click="goList">이전</button>
                    <button @click="cancleBooking()">예매취소</button>
                </div>
              </div>
          </main>
      </div>
</template>
<script>
    import SideMenu from '@/components/admin/SideMenu.vue'
    import axios from '@/axios/axios.js';
    export default {
        components: {
            SideMenu
        },

        data() {
            return {
                
                num:this.$route.params.bookingNum,
                id:this.$route.params.id,
                title:this.$route.params.title,
                pageNum: this.$route.params.pageNum,
                status: this.$route.params.status,
                selectField: this.$route.params.field,
                search: this.$route.params.search, 
                list:[],
                //주문번호 list.merchantUid
                //결제번호 list.impUid
                amount:0, // 취소요청금액
            }
        },

        mounted(){
            this.viewDetail(this.num);
        },
        computed: {
            cannotCancle() { // 오늘 - 공연일 날짜 차이 계산
                let today = new Date();
                // let year = today.getFullYear();
                // let month = today.getMonth()+1;
                // let day = today.getDate();
                let showDay = new Date(this.list.scheduleDate);

                let n = today.getTime() - showDay.getTime();
                var result = n / (1000*60*60*24);
                return result;
            }
        },

        methods:{

            //예매정보 불러오기
            viewDetail(bookingNum){
            axios.get('moaplace.com/admin/ticket/detail/' + bookingNum)
            .then(function(resp){
                this.list = resp.data.list;
                this.amount = resp.data.list.allticketPrice;
                this.list.allticketPrice=resp.data.list.allticketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.list.bookingPrice=resp.data.list.bookingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.list.usePoint=resp.data.list.usePoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }.bind(this))
            },

            cancleBooking() { // 예매취소
            if(this.list.paymentStatus == '결제취소'){
                alert('이미 취소된 예매 내역입니다.');
                return;
            }
            
            if (this.cannotCancle < 1) {
                if(confirm('해당 예매내역을 취소하시겠습니까?\n적립금을 제외한 결제금액('+this.list.allticketPrice+'원)이 취소됩니다.')){
                    let forms = {
                        imp_uid:this.list.impUid, // 아임포트 주문번호
                        amount: this.amount, // 환불금액
                        reason: '모아플레이스 관리자 예매취소', // 환불사유
                        booking_num: this.num // 예매번호
                    }
                    axios.post("/moaplace.com/admin/ticket/cancle", JSON.stringify(forms),{
                        headers: {'Content-Type' : 'application/json'}
                    })
                            .then(resp => {
                            if(resp.data != 'fail') {
                                alert('예매가 취소되었습니다.\n카드결제 취소는 영업일 기준 2-3일이 소요됩니다.');
                                this.$router.push({name:'adminTicketList'});

                            } else {
                                alert('예매취소 응답에 실패하였습니다. 다시 시도해주세요.');
                                return;
                            }
                        })
                            .catch (error => {
                            alert('예매취소 서버요청에 실패했습니다. 다시 시도해주세요.');
                            console.log(error);
                        })
                    } else return;

                } else {
                    alert('공연일이 지난 예매내역은 취소할 수 없습니다.');
                    return;
            }
            },

            //예매리스트로 이동
            goList(){
            this.$router.push({
            name:'adminTicketList',
            params:{
                pageNum:this.pageNum,
                status:this.status,
                selectField:this.selectField,
                search:this.search,
            }
            })
        }
        }
        
    }
</script>
<style lang="scss" scoped="scoped">
    @import "@/scss/common.scss";
    // --------관리자 페이지 레이아웃 시작--------
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
            // --------관리자 페이지 레이아웃 끝, 버튼박스 시작--------
            .btnUpBox{
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
                button {
                    width: 96px;
                    height: 40px;
                    border: none;
                    margin-bottom:16px;
                    background-color: $black;
                    color:white;
                }
            }

            // --------버튼박스 끝, 타이틀박스 시작 ----------------
            .titleBox {
                width: 100%;
                border: 1px solid rgba($black, 0.5);
                padding: 8px 16px;
                span {
                    border-right: 1px solid rgba($black, 0.5);
                    padding-right: 16px;
                    margin-right: 16px;
                    font-weight: bold;
                }
                input[type=text] {
                    padding: 4px;
                    margin-right: 16px;
                    border: none;
                    width: 64px;
                    &:focus{
                        outline: none;
                    }
                    &:nth-child(4) {
                        width: 120px;
                    }
                    &:nth-child(6) {
                        width: 400px;
                    }
                }
            }
            // --------타이틀박스 끝, 공연정보테이블 시작--------
            
            // --------타임박스 끝, 공연정보 시작--------
            .ticketInfo,.payment {
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
            // --------공연정보 끝, 이미지 시작--------
            .image {
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
                            text-align: center;
                            img{
                                    width: calc(80%/1);
                                }
                        }
                    }
                }
            }
            // --------이미지 끝, 버튼 영역 시작--------
            .btnBox {
                width: 100%;
                display: flex;
                justify-content: space-between;
                button {
                    width: calc((100% - 16px) /2);
                    padding: 12px 0;
                    border: none;
                    &:nth-child(2){
                        background-color: $black;
                        color: #fff;
                    }
                    &:last-child {
                        background-color: $black;
                        color: #fff;
                    }
                }
            }

        }
    }
</style>
