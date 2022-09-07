<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판관리" mediumCategory="1:1문의"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">1:1문의</h2>
                
                <div class="list-top">
                    <div class="top-1">
                        <select v-model="sort_num" @change="filterList()">
                            <option value="0"> 전체 </option>
                            <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
                            {{sort.sort_name}} 문의
                            </option>
                        </select>
                    </div>

                    <div class="top-2">
                        <select v-model="field">
                            <option value="">검색구분</option>
                            <option value="member_id">아이디</option>
                            <option value="member_name">이름</option>
                            <option value="qna_title">제목</option>
                        </select>
                        <input type="text" v-model="newKeyword" @keyup.enter="searchList()">
                        <i class="material-icons" @click="searchList()">search</i>
                    </div>
                </div>

                <div class="list">
                    <div class="t-row thead">
                        <p>번호</p>
                        <p>구분</p>
                        <p>아이디</p>
                        <p>이름</p>
                        <p>제목</p>
                        <p>문의일자</p>
                        <p>답변일자</p>
                        <p>답변상태</p>
                    </div>
                    <div v-for="i in list" :key="i" class="t-row tbody" 
                    @click="$router.push({name: 'adminQnaDetail', params: {qna_num:i.qna_num}})">
                        <p>{{i.rnum}}</p>
                        <p>{{i.sort_name}} 문의</p>
                        <p>{{i.member_id}}</p>
                        <p>{{i.member_name}}</p>
                        <p>{{i.qna_title}}</p>
                        <p>{{i.qna_regdate}}</p>
                        <p>{{i.answer_regdate}}</p>
                        <div @click.prevent="prevent($event)">
                            <select v-model="i.qna_state" @change="changeState(i.qna_state, i.qna_num)">
                                <option v-for="s in states" :key="s" :value="s">
                                    {{s}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- 리스트 내역 없을 때 -->
                    <div class="empty-list" v-if="list.length < 1">
                        <i class="material-symbols-outlined">info</i>
                        <p> 문의 내역이 존재하지 않습니다. </p>
                    </div>

                </div>

                <!-- 페이징 -->
                <div id="mypaging">
                    <p v-if="startPage>5"
                        @click="movePage(pageNum-1)" class="act">
                        [이전]
                    </p>
                    <p v-if="startPage<5" class="noActive"> [이전] </p>

                    <div v-for="index in ((endPage-startPage)+1)" :key="index">
                    <p :class="{active:startPage+(index-1)==pageNum}"
                        @click="movePage(startPage+(index-1))">
                        {{startPage+(index-1)}} 
                    </p>
                    </div>

                    <p v-if="endPage<pageCnt"
                        @click="movePage(pageNum+1)" class="act">
                        [다음] 
                    </p>
                    <p v-if="endPage>=pageCnt" class="noActive"> [다음] </p>
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
    data() {
        return {
            sort_list:[],
            states: [ // 답변상태 목록
                '대기중',
                '처리중',
                '답변완료'
            ],
            list:[],
            pageNum: 1, // 현재 페이지
            field:'', // 검색필드
            keyword:'', // 검색어
            newKeyword:'', // 검색어 변경
            startPage:1, // 페이지 시작번호
            endPage:1, // 페이지 마지막번호
            pageCnt:1, // 전체 페이지 개수
            sort_num:0 // 필터용 구분번호
            }
    },
    created() {
        if(this.$route.params.pageNum) {
            this.pageNum = this.$route.params.pageNum;
        }
        if(this.$route.params.keyword) {
            this.keyword = this.$route.params.keyword;
            this.field = this.$route.params.field;
        }            
        this.sortList(); 
        this.qnaList();
    },
    methods: {
        async sortList() { 
            await axios.get('/moaplace.com/board/sort/list')
                        .then(resp => {
                            this.sort_list = resp.data;
                        })
                        .catch (error => {
                            console.log(error);
                        })                
        },            
        async qnaList() {
            await axios.get("/moaplace.com/admin/qna/list",
                            { params:
                                { pageNum: this.pageNum,
                                  field: this.field,
                                  keyword: this.keyword,
                                  sort_num: this.sort_num }
                        })
                        .then(resp => {
                            this.list = resp.data.list, // 문의글 리스트
                            this.field = resp.data.field, // 검색어
                            this.keyword = resp.data.keyword, // 검색어
                            this.newKeyword = resp.data.keyword, // 검색어 변경
                            this.sort_num = resp.data.sort_num, // 필터용 구분번호
                            this.pageNum = resp.data.pageNum, // 페이지 번호
                            this.startPage = resp.data.startPage // 페이지 시작번호

                            if(resp.data.endPage < 1){
                                this.endPage = 1,
                                this.pageCnt = 1
                            } else {
                                this.endPage = resp.data.endPage, // 페이지 마지막번호
                                this.pageCnt= resp.data.pageCnt // 전체 페이지 개수
                            }
                        }) 
                        .catch (error => {
                            console.log(error);
                        })
        },
        searchList(){
            if(this.field=='' || this.field==null) {
                alert('검색 구분을 선택하세요.')
                return;
            }
            if(this.newKeyword=='' || this.newKeyword==null){
                alert('검색어를 입력하세요.')
                return;
            } 
            this.pageNum = 1;
            this.keyword = this.newKeyword; // 검색어 변경
            this.qnaList();
        },
        filterList(){
            this.pageNum = 1;
            this.qnaList();
        },        
        movePage(move){
            this.pageNum = move;
            this.qnaList();
        },
        async changeState(change, num){
            let msg = '해당 문의글의 상태를 '+ change +'(으)로 변경하시겠습니까?';
            if(confirm(msg)){
                await axios.post("/moaplace.com/admin/qna/changeState/"+change+"/"+num)
                            .then(resp => {
                                if(resp.data!='fail'){
                                    alert('문의 상태가 변경되었습니다.')
                                    this.qnaList();
                                } else {
                                    alert('문의상태 변경에 실패했습니다. 다시 시도해주세요.');
                                }
                            })
                            .catch (error => {
                                console.log(error);
                            })
            } else return;
        },
        prevent(e) {
            e.stopPropagation();
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
                .list-top {
                    width: 100%;
                    margin-bottom: 16px;
                    display:flex;
                    justify-content: space-between;
                    font-size: 14px;

                    .top-1 {
                        width:120px;
                        box-sizing: border-box;
                        border: 1px solid rgba($black, 0.5);
                        
                        & > select {
                            width:100%;
                            height: 100%;
                            padding:0 12px;
                            border:none;
                        }
                    }
                    .top-2 {
                        position: relative;
                        & > select {
                            position: absolute;
                            top: 50%;
                            right: 210px;
                            transform: translateY(-50%);
                            border:none;
                            padding-right: 4px;
                        }
                        input {
                            width: 300px;
                            box-sizing: border-box;
                            padding: 4px 48px 4px 100px;
                        }
                        & > i {
                            background: transparent;
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            color: rgba($black, 0.9);
                            cursor:pointer;
                        }
                    }
                }
                .list {
                    .t-row {
                        display: table;
                        table-layout: fixed;
                        width: 100%;
                        padding: 8px 0;
                        font-size: 14px;
                        &.thead {
                            background: $black;
                            color: #fff;
                        }
                        &.tbody {
                            padding: 16px 0;
                            border-bottom: 1px solid rgba($black, 0.2);
                            cursor: pointer;
                            &:hover {
                                background: #eee;
                            }
                            select {
                                border: 1px solid #333;
                                padding: 4px 4px 4px 8px;
                            }
                            p {
                                &:nth-child(7){
                                    color:#D67747;
                                    font-weight: bold;
                                }
                            }
                        }
                        & > p,
                        div {
                            display: table-cell;
                            text-align: center;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            & {
                                padding-top: 4px;
                            }
                            &:nth-child(1){
                                width: 60px;
                            }
                            &:nth-child(5){
                                width: 350px;
                            }
                        }
                    }
                }
                .empty-list{
                  height: 160px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-bottom: 1px solid rgba($black, 0.1);
                  color: rgba($black, 0.7);
                  i{
                    margin-right:8px;
                  }
                }
                #mypaging{
                    display: flex;
                    justify-content: center;
                    margin: 32px 0;
                    align-items: center;

                    .act {
                        color: $brown;
                        font-weight: bold;
                    }
                    p {
                        padding : 0 6px;
                        margin: 0 6px;
                        color:$black;
                        cursor:pointer;

                        &.active {
                            color: #D67747;
                            font-weight: bold;
                        }
                    }
                    .noActive {
                        color:rgba($black, 0.5);
                        cursor: default;
                        font-weight: bold;
                    }
                }
            }
        }
    </style>