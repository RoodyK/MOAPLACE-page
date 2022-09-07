<template>
    <div id="wrap">
        <SideMenu largeCategory="게시판관리" mediumCategory="1:1문의"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">1:1문의</h2>

                <div class="state-box">
                    <span>문의상태</span>    
                    <select v-model="detail.qna_state" @change="changeState(detail.qna_state, qna_num)">
                        <option v-for="s in states" :key="s" :value="s">
                            {{s}}
                        </option>
                    </select>
                </div>

                <div class="info-box">
                    <h3>문의회원</h3>
                    <div>
                        <table cellspacing="0">
                            <tr>
                                <th>아이디</th>
                                <td>{{member.member_id}}</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{{member.member_name}}</td>
                            </tr>
                            <tr>
                                <th>연락처</th>
                                <td>{{member.member_phone}}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{{member.member_email}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box">
                    <h3>문의내용</h3>
                    <div>
                        <table>
                            <tr>
                                <th>구분</th>
                                <td>{{detail.sort_name}} 문의</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>{{detail.qna_title}}</td>
                            </tr>
                            <tr>
                                <th class="content">내용</th>
                                <td v-html="detail.qna_content"></td>
                            </tr>
                            <tr>
                                <th>문의일</th>
                                <td>{{detail.qna_regdate}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box" v-if="answer==null">
                    <h3>답변등록 </h3> 
                    <div>
                        <table>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" v-model="answer_title" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><TextEditor height="300" v-model:content="answer_content" contentType="html"/></td>
                            </tr>
                            <tr>
                                <th>답변메일</th>
                                <td><input type="text" v-model="email"></td>
                            </tr>
                            <tr>
                                <th>답변일자</th>
                                <td>{{curday}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box" v-else v-show="!isUpdate">
                    <h3>답변내용</h3>
                    <div>
                        <table>
                            <tr>
                                <th>제목</th>
                                <td>{{answer.answer_title}}</td>
                            </tr>
                            <tr>
                                <th class="content">내용</th>
                                <td v-html="answer.answer_content"></td>
                            </tr>
                            <tr>
                                <th>답변일</th>
                                <td>{{answer.answer_regdate}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="info-box" v-if="answer!=null" v-show="isUpdate">
                    <h3>답변수정</h3>
                    <div>
                        <table>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" v-model="answer.answer_title" maxlength="50"></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><TextEditor height="300" v-model:content="answer.answer_content" contentType="html" v-if="answer.answer_content!=''"/></td>
                            </tr>
                            <tr>
                                <th>답변일</th>
                                <td>{{answer.answer_regdate}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="btn-box" >
                    <button @click="$router.push({name:'adminQnaList'})">목록으로</button>
                    <button @click="checkForm()" v-if="answer==null">답변등록</button>
                    <button @click="showForm()" v-else v-show="!isUpdate">답변수정</button>
                    <button @click="deleteAnswer()" v-show="!isUpdate">답변삭제</button>
                    <button @click="showForm()" v-show="isUpdate">수정취소</button>
                    <button @click="updateAnswer()" v-show="isUpdate">수정완료</button>
                    <button @click="deleteQna()">전체삭제</button>
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
        TextEditor,
    },
    data() {
        return {
            states: [
                '대기중',
                '처리중',
                '답변완료'
            ],
            member: '',
            detail: '',
            answer: {
                answer_title:'',
                answer_content:'',
                answer_regdate:''
            },
            answer_title:'',
            answer_content:'',
            email:'',
            isUpdate: false
        }
    },
    created() {
        this.qna_num = this.$route.params.qna_num;
        this.qnaDetail();
    },
    computed: {
        curday() { // 오늘날짜(=답변일)
            return new Date().toISOString().substring(0,10);
        }
    },
    methods: {
        async qnaDetail() {
            await axios.get("/moaplace.com/admin/qna/detail/"+this.qna_num)
                        .then(resp => {
                            this.detail = resp.data.detail;
                            this.answer = resp.data.answer;
                            this.member = resp.data.member;
                            this.email = resp.data.member.member_email;
                        })
                        .catch (error => {
                            console.log(error);
                        })
        },
        checkForm() { 
            // 입력 체크
            if(this.answer_title==null || this.answer_title==""){
                alert("답변 제목을 입력하세요.");
                return
            }
            if(this.answer_content==null || this.answer_content==""){
                alert("답변 내용을 입력하세요.");
                return
            }
            if(this.email==null || this.email==""){
                alert("답변 메일을 입력하세요.");
                return
            }
            // 이메일 정규표현식
            var rex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
            if(!rex.test(this.email)){
                alert("이메일 형식이 올바르지 않습니다.");
                return
            }
            // 답변 등록
            if(confirm('답변을 등록하시겠습니까?')){
                this.insertAnswer();
            } else return
        },
        async insertAnswer(){ // 답변 등록
            let form = {
                qna_num: this.qna_num,
                answer_title: this.answer_title,
                answer_content: this.answer_content,
                email: this.email
            }
            await axios.post('/moaplace.com/admin/qna/answer/insert', JSON.stringify(form), 
                            {headers: {'Content-Type' : 'application/json'}
                        })
                        .then(resp => {
                            if(resp.data!='fail'){
                                alert('답변이 등록되었습니다.');
                                this.$router.push({name:'adminQnaList'});

                            } else {
                                alert('문의글 등록에 실패하였습니다. 다시 시도해주세요.');
                                return;
                            }
                        })
                        .catch (error => {
                            console.log(error);
                        })
        },
        async changeState(change, num){ // 문의글 상태변경
            let msg = '해당 문의글의 상태를 '+ change +'(으)로 변경하시겠습니까?';
            if(confirm(msg)){
                await axios.post("/moaplace.com/admin/qna/changeState/"+change+"/"+num)
                            .then(resp => {

                                if(resp.data!='fail') {
                                    alert('문의 상태가 변경되었습니다.')
                                    this.qnaDetail();

                                } else {
                                    alert('페이지 로딩에 실패하였습니다. 다시 시도해주세요.');
                                    return;
                                }
                            })
                            .catch (error => {
                                console.log(error);
                            })
            } else return                           
        },
        showForm(){
            if(this.isUpdate){
                this.isUpdate = false;
            } else {
                this.isUpdate = true;
            }
        },
        async updateAnswer(){ // 답변 수정
            if(confirm('답변을 수정하시겠습니까?')){
                var form = {
                    answer_num: this.answer.answer_num,
                    answer_title: this.answer.answer_title,
                    answer_content: this.answer.answer_content
                }
                await axios.post('/moaplace.com/admin/qna/answer/update', JSON.stringify(form),{
                                headers: {'Content-Type' : 'application/json'}
                            })
                            .then(resp => {

                                if(resp.data!='fail'){ 
                                    alert('답변이 수정되었습니다.');
                                    this.$router.push({name:'adminQnaList'});

                                } else {
                                    alert('답변 수정에 실패하였습니다. 다시 시도해주세요.');
                                    return
                                }
                            })
                            .catch (error => {
                                    console.log(error);
                            })
            } else return
        },
        async deleteQna() { // 전체 문의글 + 답변 삭제
            let msg = '해당 문의글과 답변을 모두 삭제하시겠습니까?\n답변이 완료된 경우 답변도 함께 삭제됩니다.';
            if (confirm(msg)){
                await axios.post("/moaplace.com/board/qna/delete/"+this.qna_num)
                            .then(resp => {
                                if(resp.data!='fail'){
                                alert('문의글이 삭제되었습니다.');
                                this.$router.push({name:'adminQnaList'});

                                } else {
                                    alert('문의글 삭제에 실패하였습니다. 다시 시도해주세요.');
                                    return
                                }
                            })
                            .catch (error => {
                                console.log(error);
                            })
            } else return;
        },
        async deleteAnswer() { // 답변만 삭제
            if (this.answer==null){
                alert('등록된 답변이 없습니다.');
                return;
            }

            if (confirm('해당 답변을 삭제하시겠습니까?\n문의글은 삭제되지 않습니다.')){
                await axios.post("/moaplace.com/admin/qna/answer/delete/"+this.qna_num)
                            .then(resp => {
                                if(resp.data != 'fail') {
                                    alert('해당 답변이 삭제되었습니다.');
                                    this.qnaDetail();

                                } else {
                                    alert('답변 삭제에 실패하였습니다. 다시 시도해주세요.');
                                    return
                                }
                            })
                            .catch (error => {
                                console.log(error);
                            })
            } else return
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

                        tr {
                            td,
                            th {
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                                white-space:pre;
                            }
                            th {
                                width:15%;
                                background: #eee;
                                text-align: center;
                                vertical-align: middle;
                            }
                            .content {
                                height: 360px;
                            }
                            td{
                                vertical-align: middle;
                                input {
                                    border: 1px solid rgba($black,0.3);
                                    padding: 5px;
                                    width: 100%;
                                }
                                textarea {
                                    width:100%;
                                    border: 1px solid rgba($black,0.3);
                                    padding: 5px;
                                    white-space:pre;
                                }
                            }
                        }                 
                    }
                }
            }
            .delete-btn{
                padding: 4px 32px;
                border:1px solid rgba($black, 0.5);
                color:rgba($black, 0.8);
                cursor: pointer;
            }

            .btn-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                button {
                    width: calc((100% - 16px) /4);
                    padding: 12px 0;
                    border: none;
                    &:nth-child(2) { // 답변등록 or 답변수정 (폼불러오기)
                        background-color: $brown;
                        color: #fff;
                    }
                    &:nth-child(3) { // 답변삭제
                        background-color: rgba($black, 0.5);
                        color: #fff;
                    }
                    &:nth-child(4) { // 수정취소
                        background-color: $brown;
                        color: #fff;
                    }
                    &:nth-child(5) { // 수정완료
                        background-color: rgba($black, 0.5);
                        color: #fff;
                    }
                    &:nth-child(6) { // 전체삭제
                        background-color: $black;   
                        color: #fff;
                    }
                }
            }
        }
    }
</style>