<template>
    <div id="wrap">
        <div class="inner">
            <h2 class="title">신청서</h2>
            <div class="table-box">
                <div class="t-row">
                    <div>공연장</div>
                    <div>
                        <label>
                            <input class="radio-input" type="radio" value="" id="hall01" name="hall" checked>
                            <label class="radio-label" for="hall01">
                              모던홀
                            </label>
                        </label>
                        <label>
                            <input class="radio-input" type="radio" value="" id="hall02" name="hall">
                            <label class="radio-label" for="hall02">
                              오케스트라홀
                            </label>
                        </label>
                        <label>
                            <input class="radio-input" type="radio" value="" id="hall03" name="hall">
                            <label class="radio-label" for="hall03">
                              아트홀
                            </label>
                        </label>
                    </div>
                </div>
                <div class="t-row">
                    <div>신청인</div>
                    <div>
                        <input type="text" name="name" placeholder="단체명 또는 사업자명을 입력하세요.">
                    </div>
                </div>
                <div class="t-row">
                    <div>연락처</div>
                    <div>
                        <input type="text"> -
                        <input type="text"> -
                        <input type="text">
                    </div>
                </div>
                <div class="t-row">
                    <div>E-mail</div>
                    <div>
                        <input type="text"> @
                        <input type="text"> 
                        <select>
                            <option value="">직접선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                        </select> 
                    </div>
                </div>
                <div class="t-row">
                    <div>공연명</div>
                    <div>
                        <input type="text" placeholder="공연명을 입력하세요">
                    </div>
                </div>
                <div class="t-row">
                    <div>공연장르</div>
                    <div>
                        <label>
                            <input type="radio" name="genre">
                            기악
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            대중음악
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            무용
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            뮤지컬
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            성악
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            연극
                        </label>
                        <label>
                            <input type="radio" name="genre">
                            오페라
                        </label>
                    </div>
                </div>
                <div class="t-row">
                    <div>대관희망일자</div>
                    <div>
                        <input type="date" :min="getToday()">
                    </div>
                </div>
                <div class="t-row">
                    <div>첨부파일</div>
                    <div>
                        
                    </div>
                </div>
                <div class="t-row">
                    <div>담당자</div>
                    <div>
                        <input type="text">
                    </div>
                </div>
                <div class="t-row">
                    <div>담당자 연락처</div>
                    <div>
                        <input type="text"> -
                        <input type="text"> -
                        <input type="text">
                    </div>
                </div>
                <div class="t-row">
                    <div>기타 요청사항</div>
                    <div>
                        <textarea cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
            <div>
                <label>
                    <input type="checkbox"/>
                    개인정보처리방침에 동의합니다.
                </label>
            </div>
            <div class="btn-box">
                <button>돌아가기</button>
                <button>신청하기</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        methods:{
            getToday(){
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth()+1;
                let date = today.getDate();

                return year + "-" + (month >=10 ? month :'0' + month) + "-" + (date >=10 ? date : '0' + date); 
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import "@/scss/common.scss";

    #wrap{
        padding: 0; margin: 0; text-decoration: none;
        background: #f7f9fa;
        .inner{
            width: $width;
            margin: 0 auto;
            background: #fff;
            padding: 32px;
            box-sizing: border-box;
            h2.title {
                font-size: 24px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba($black, 0.5);
                margin-bottom: 16px;
            }
            .table-box{
                padding-top: 16px;
                .t-row{
                    display: table;
                    table-layout: fixed;
                    width: 100%;
                    border-bottom: 1px solid rgba($black, 0.2);
                    &:first-child{
                      border-top: 1px solid rgba($black, 0.2);  
                    }
                    div{
                       display: table-cell; 
                       padding: 16px 32px;
                       &:first-child{
                            width: 20%;
                            min-height: 80px;
                            background: #f1f1f1;
                       }
                       label{
                        margin-right: 16px;
                        user-select: none;
                        &.radio-label{
                          position: relative;
                          padding-left: 24px;
                          &::before{
                            content: "";
                            width: 18px;
                            height: 18px;
                            border: 1px solid rgba($black, 0.3);
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                          }
                        }
                       }
                       input{
                        border: 1px solid rgba($black, 0.3);
                        &.radio-input{
                          display: none;
                
                          &:checked + label::before{
                            background: url('@/assets/done.png');
                            background-color: black;
                            background-repeat: no-repeat;
                            background-size: 10px;
                            background-position: center;
                          }
                        }

                       }
                    }
                }
            }
        }
    }
</style>