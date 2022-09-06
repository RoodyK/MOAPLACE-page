//booking.js 예매와 관련된 데이터 취급

import router from "@/router";
import axios from "@/axios/axios.js";

export default {
    namespaced: true,
    state() {
        return {
            show_num : 0, //공연 번호

            show_thumbnail: '', //공연 섬네일
            title: "", //공연제목
            place: "", //양식 - 모던홀/오케스트라홀/아트홀

            schedule_num: 0, //상연일정(스케줄)번호
            schedule_date: "", //양식 - 22.08.16(화)
            time: "", //양식 - 1회차 14:30

            rows: 0, //열갯수
            cols: 0, //행갯수
            gradeSeats: [], //등급별 행수
            gradePrice: [], //등급별 가격 { grade_seat : 'R', grade_price : 25000 }
            alreadySelect: [], //이미 예매된 좌석

            seats: [], //양식 - {grade:'R', row : 'A', col : '01'} 
            tickets: [], //양식 - { grade:'R', count:1, priceA:150000, priceY:0, countA:0, countY:0 },

            total: 0, //등급별 매수에 따른 결제 금액

        }
    },
    mutations: {
        //공연상세보기페이지에서 작동
        setShowNum(state, payload){
            state.show_num = payload;
        },
        //좌석 선택하기 위한 정보 전송(공연명,공연장명,일정번호,공연날짜,공연시간)
        setSelectTime(state, payload) {
            state.title = payload.title;
            state.place = payload.place;
            state.schedule_num = payload.schedule_num;
            state.schedule_date = payload.schedule_date;
            state.time = payload.time;
        },

        // 공연명, 공연장, 행수, 가격 저장
        setHallInfo(state, payload) {
            state.title = payload.show_name;
            state.place = payload.hall_name,
                state.rows = payload.seats.hall_rows;
            state.cols = payload.seats.hall_cols;
            state.gradeSeats = payload.gradeSeats;
            state.gradePrice = payload.gradePrice;
        },
        // 일정 정보 저장
        setScheduleInfo(state, payload) {
            state.schedule_num = payload.schedule_num;
            state.schedule_date = payload.schedule_date;
            state.time = payload.time;
        },
        //이미 예매된 좌석 정보저장
        setAlreadySelect(state, payload) {
            state.alreadySelect = payload;
        },
        //좌석 선택 저장
        setSeatChoice(state, payload) {
            state.seats = payload;
        },
        //예매 수량 선택 후 저장
        updateTicket(state, payload) {
            state.tickets = payload.changeTicket;
            state.total = payload.changeTotal;
        },
        // 예매 다시하기 클릭시 동작(모든 선택 초기화)
        resetAllChoice(state) {
            state.schedule_num = 0;
            state.schedule_date = "";
            state.time = "";
            state.alreadySelect = [];
            state.seats = [];
            state.tickets = [];
            state.total = 0;
        },
        //좌석선택 페이지에서 이전페이지로 갈 때
        resetSeat(state) {
            state.seats = [];
        },
        //수량선택 페이지에서 이전페이지로 갈 때
        resetTotal(state) {
            state.tickets = [],
                state.total = 0;
        },



    },
    actions: {
        //공연장 정보 가져오기
        async getHallInfo(context) {

            const show_num = context.state.show_num;

            try {
                const resp = await axios.get(`/moaplace.com/booking/getHallInfo/${show_num}`);

                const data = resp.data;

                await context.commit('setHallInfo', data);

            } catch (error) {
                alert('공연정보 조회를 실패했습니다.');
                console.log(error);
                router.go(-1);
            }
        },
        //이미 선택된 좌석 가져오기
        async getAlreadySelect(context) {

            const schedule_num = context.state.schedule_num;

            try {
                const resp = await axios.get(`/moaplace.com/booking/getBookingSeat/${schedule_num}`);

                const data = resp.data;

                await context.commit('setAlreadySelect', data);

            } catch (error) {
                alert('예매된 좌석조회를 실패했습니다.');
                console.log(error);
                router.go(-1);
            }
        },
    }

}