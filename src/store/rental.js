//rental.js 대관 목록과 관련된 데이터 취급



export default {
    namespaced: true,
    state(){
        return{
            list : [],
            pageUtil : [],
            sort : "rental",
            keyword : ""
        }
    },
    mutations:{
        setList(state, { list }){
            state.list = list;
        },
        setPageUtil(state, { pageUtil }){
            state.pageUtil = pageUtil;
        },
        setSort(state, { sort }){
            state.sort = sort;
        },
        setKeyword(state, { keyword }){
            state.keyword = keyword;
        }
    },
    actions:{
        // 대관정보 리스트 가져오기
        getList(){
            // axios.get('/moaplace.com/rental/list')
            // .then(function(resp){
            //     console.log(resp.data);
            // });
        }
    }

}