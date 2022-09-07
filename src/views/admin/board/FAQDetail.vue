<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판관리" mediumCategory="FAQ"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">FAQ 관리</h2>

                <div class="info-box">
                    <h3>상세내용</h3>
                    <div>
                        <table>
                            <tr>
                                <th>구분</th>
                                <td>{{detail.sort_name}} 문의</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>{{detail.faq_title}}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td v-html="detail.faq_content"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="btn-box">
                    <button @click="$router.push({name:'adminFaqList'})">목록으로</button>
                    <button @click="deleteFaq()">삭제하기</button>
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
    created() {
        this.faq_num = this.$route.params.faq_num;
        this.sortList();
        this.faqDetail(); 
    },
    data() {
        return {
            sort_list:[],            
            detail:[]
        }
    },
    methods: {
        async sortList() {
            await axios.get('/moaplace.com/board/sort/list')
                        .then(resp => {
                            this.sort_list = resp.data;
                        })
                        .catch(error => {
                            console.log(error.message);
                        })            
        },           
        async faqDetail() {
            await axios.get("/moaplace.com/admin/faq/detail/"+this.faq_num)
                        .then(resp => {
                            this.detail = resp.data.detail;
                        })
                        .catch (error => {
                            console.log(error);
                        })
        },

        deleteFaq(){ // faq 삭제
            if(confirm('해당 글을 삭제하시겠습니까?')){
                axios.post("/moaplace.com/admin/faq/delete/"+this.faq_num)
                     .then(resp => {
                        if(resp.data != 'fail') {
                            alert('FAQ가 삭제되었습니다.');
                            this.$router.push({name:'adminFaqList'});

                        } else {
                            alert('FAQ 삭제를 실패하였습니다. 다시 시도해주세요.');
                            return;
                        }
                    })
                     .catch (error => {
                        console.log(error);
                    })
            } else return;
        }        
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

            .state-box {
                width: 100%;
                border: 1px solid rgba($black, 0.5);
                padding: 8px 16px;
                span {
                    border-right: 1px solid rgba($black, 0.5);
                    padding-right: 16px;
                    margin-right: 16px;
                    font-weight: bold;
                }
                select {
                    padding: 4px;
                }
            }
            .info-box {
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
                        
                        select {
                            border: 1px solid rgba($black,0.3);
                            padding: 4px 8px;
                            width: 160px;
                        }
                        input {
                            border: 1px solid rgba($black,0.3);
                            padding: 4px 12px;
                            width: 100%; 
                        }
                        textarea {
                            width:100%;
                            border: 1px solid rgba($black,0.3);
                            padding: 5px;
                        }                        

                        tr {
                            td,
                            th {
                                vertical-align: middle;
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                                white-space: pre-line;
                            }
                            th {
                                width: 15%;
                                background: #eee;
                                text-align: center;
                            }
                            &:nth-child(3){
                                height:250px;
                            }
                        }
                    }
                }
            }

            .btn-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                button {
                    width: calc((100% - 16px) /2);
                    padding: 12px 0;
                    border: none;
                    &:nth-child(2) {
                        background-color: $black;
                        color: #fff;
                    }                    
                }
            }
        }
    }
</style>