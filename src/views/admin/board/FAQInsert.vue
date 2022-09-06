<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판관리" mediumCategory="FAQ"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">FAQ 관리 > 등록 </h2>

                <div class="info-box">
                    <h3>등록하기</h3>
                    <div>
                        <table>
                            <tr>
                                <th>구분</th>
                                <td>
                                    <select v-model="forms.sort_num">
                                        <option value="0"> 구분 선택 </option>
                                        <option v-for="sort in sort_list" :key="sort" :value="sort.sort_num">
                                        {{sort.sort_name}} 문의
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" v-model="forms.faq_title" placeholder="등록할 자주 묻는 질문을 입력하세요." maxlength="50"></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><TextEditor height="300" v-model:content="forms.faq_content" contentType="html"
                                                placeholder="자주 묻는 질문에 대한 내용을 작성하세요."/></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="btn-box">
                    <button @click="$router.push({name:'adminFaqList'})">목록으로</button>
                    <button @click="checkForm()">등록하기</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import SideMenu from '@/components/admin/SideMenu.vue'
import TextEditor from '@/components/TextEditor.vue'
import axios from '@/axios/axios.js'

export default {
    components: {
        SideMenu,
        TextEditor
    },
    data() {
        return {
            sort_list:[],
            forms: {
                    sort_num: 0,
                    member_num: 0,
                    faq_title: '',
                    faq_content: ''
            }
        }
    },
    created() {
        this.pageLoad();
    },
    methods: {
        async pageLoad() { 
            let token = localStorage.getItem("access_token");
            if(token == null) return;
        
            const config = {
                headers: {
                "Authorization" : token
                }
            }
            // 로그인 된 관리자 정보
            await axios.get("/moaplace.com/users/login/member/info", config)
                        .then(response => {
                            let data = response.data;
                            this.forms.member_num = data.member_num;
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
            // 구분목록
            await axios.get('/moaplace.com/board/sort/list')
                        .then(resp => {
                            this.sort_list = resp.data;
                        })
                        .catch(error => {
                            console.log(error.message);
                        })
        },
        checkForm() { 
            // 입력 체크
            if(this.forms.sort_num<1) {
                alert("문의 구분을 선택하세요.");
                return;
            }
            if(this.forms.faq_title==null || this.forms.faq_title==''){
                alert("제목을 입력하세요.");
                return;
            }
            if(this.forms.faq_content==null || this.forms.faq_content==''){
                alert("내용을 입력하세요.");
                return;
            }

            // 데이터 제출
            this.faqInsert();
        },
        faqInsert(){ // 데이터 제출
            axios.post('/moaplace.com/admin/faq/insert', JSON.stringify(this.forms),{
                    headers: {'Content-Type' : 'application/json'}
                })
                .then(resp => {
                    if(resp.data!='fail'){ 
                        alert('자주 묻는 질문이 등록되었습니다.');
                        this.$router.push({name:'adminFaqList'});

                    } else {
                        alert('자주 묻는 질문 등록에 실패하였습니다. 다시 시도해주세요.');
                        return
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
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
                            padding: 5px 65px 5px 5px;
                        }
                        input {
                            border: 1px solid rgba($black,0.3);
                            padding: 4px 8px;
                            width: 100%; 
                        }

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
                                vertical-align: middle;
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
                    &:last-child {
                        background-color: $brown;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>