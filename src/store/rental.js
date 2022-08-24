//rental.js 대관 목록과 관련된 데이터 취급

import axios from "@/axios/axios"

export default {
    namespaced: true,
    state(){
        return{
            list:[],
            pageUtil:[],
            sort:"",
            keyword:"",
        }
    },
    mutations:{
        searchRental(state, payload){
            state.list = payload.list;
            state.pageUtil = payload.pageUtil;
            state.sort = payload.sort;
            state.keyword = payload.keyword;
        },
    },
    actions:{
        
    }

}