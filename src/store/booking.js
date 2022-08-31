//booking.js 예매와 관련된 데이터 취급

export default {
    namespaced: true,
    state(){
        return{
            show_num:0, //공연 번호
            hall_num : 0, //공연장 번호
            schedule_num : 0, //상연일정(스케줄)번호
            title : "", //공연제목
            hall : "", //양식 - 모던홀/오케스트라홀/아트홀
            schedule_date : "", //양식 - 22.08.16(화)
            round : "", //양식 - 1회차 14:30
            seats : [], //양식 - S석 D09, S석 E09
            rows: 0,//열번호
            cols: 0,//행번호
            priceR: 0, //R석 가격
            priceS: 0,
            priceA: 0,
            gradeR : 0, //R석 매수
            gradeS : 0, //S석 매수
            gradeA : 0, //A석 매수
            total : 0, //등급별 매수에 따른 결제 금액
        }
    },
    mutations:{
        
    },
    actions:{
        
    }

}