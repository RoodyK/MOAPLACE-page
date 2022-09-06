<template>
    <div id="answer-wrap">
        <div class="answer-box">
            <h3>답변</h3>
            <TextEditor height="300" v-model:content="answer_content" contentType="html" v-if="editable == false">
                <!-- 답변이 없을때/수정버튼을 눌렀을 때 표시 -->
            </TextEditor>
            <div class="content-box" v-if="editable == true" v-html="answer_content"></div>
        </div>
        <div class="btn-box" >
            <button @click="this.$router.go(-1)">목록으로</button>
            <button 
                v-if="editable == false" 
                @click="cancleEdit">
                입력취소
            </button>
            <button 
                v-if="editable == false" 
                @click="saveAnswer">
                답변저장
            </button>
            <button 
                v-if="editable == true" 
                @click="delAnswer" >
                답변삭제
            </button>
            <button 
                v-if="editable == true" 
                @click="editAnswer">
                답변수정
            </button>
        </div>
    </div>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue'
import axios from '@/axios/axios.js'

export default {
    name : "RentalAnswer",
    components: {
        TextEditor
    },
    data(){
        return{
            member_num : 0,
            answer_content : "",
            exists : false, //답변 존재여부
            editable : true,
            rental_num : 0,
        }
    },
    created(){
        this.getMemberInfo();

        this.getAnswer();
    },
    methods:{
        getAnswer(){
            this.rental_num = this.$route.params.id;
            
            axios
                .get(`/moaplace.com/admin/rental/answer/getAnswer/${this.rental_num}`)
                .then(function(resp){
                    
                    if(resp.data.result == 'success'){
                        this.exists = true;
                        this.editable = true;
                        this.answer_content = resp.data.cont.answer_content;
                    }else{
                        this.exists = false;
                        this.editable = false;
                    }
                }
                .bind(this));
        },
        getMemberInfo(){
            let token = localStorage.getItem("access_token");

            if(token == null) return;

            const config = {
                headers: {
                "Authorization" : token
                }
            }

            axios.get("/moaplace.com/users/login/member/info", config)
            .then(response => {
                let data = response.data;
                this.member_num = data.member_num; 
            })
            .catch(error => {
                console.log(error.message);
            })
                
        },
        saveAnswer(){

            if(this.answer_content == null || this.answer_content == "" || this.answer_content == "<p></p>"){
                alert("답변을 입력하세요");
                return;
            }

            let data = {
                "member_num" : this.member_num,
                "rental_num" : this.rental_num,
                "answer_content" : this.answer_content,
            };
            
            let url = this.exists
                ? "/moaplace.com/admin/rental/answer/update"
                : "/moaplace.com/admin/rental/answer/insert"

            axios
                .post(url, JSON.stringify(data),
                {
                    headers : {'Content-Type' : 'application/json'}
                })
                .then(function(resp){
                    if(resp.data == "success"){
                        alert("답변 등록을 완료했습니다.");
                        this.getAnswer();
                    }else{
                        alert("답변 등록을 실패하였습니다.");
                    }
                }
                .bind(this));
        },
        editAnswer(){
            this.editable = false;
        },
        cancleEdit(){
            let result = window.confirm("입력하신 내용이 원본 내용으로 되돌아갑니다.");

            if(result){
                //답변 등록 취소했을 때
                this.editable = true;
                //답변을 원본 내용으로 초기화
                this.getAnswer();
            }else{
                return;
            }
            
        },
        delAnswer(){

            axios
                .delete(`/moaplace.com/admin/rental/answer/delete/${this.rental_num}`)
                .then(function(resp){
                    if(resp.data == "success"){
                        alert("답변 삭제를 성공했습니다.");
                        this.getAnswer();
                        this.answer_content = "";
                    }else{
                        alert("답변 삭제를 실패하였습니다.");
                    }
                }
                .bind(this));
        }
    }
    
}
</script>

<style lang="scss" scoped>
    @import "@/scss/common.scss";
    .answer-box {
        margin-bottom: 32px;
        h3 {
            font-size: 20px;
            margin-bottom: 16px;
        }
        .content-box{
            width: 100%;
            border: 1px solid rgba($black, 0.3);
            padding: 32px;
            ::v-deep img{
                max-width: 100%;
            }
        }
    }
    .btn-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        button {
            width: calc((100% - 24px) /3);
            padding: 12px 0;
            border: none;
            &:nth-child(2){
                background-color: $black;
                color: #fff;
            }
            &:last-child {
                background-color: $brown;
                color: #fff;
            }
        }
    }
</style>