<template>
    <div id="wrap" ref="wrap">
        <AppHeader/>
        <MainVisual/>
        <main class="main">
            <section class="sec01" :class="{showMe: showsec01}" ref="sec01">
                <div class="inner">
                    <div class="left-side">
                        <h3 class="title">진행 중 공연</h3>
                        <h4 class="sub-title">What's now</h4>
                        <div class="btn-box">
                            <button @click="goPrev"><i class="material-icons"> keyboard_arrow_left</i></button>
                            <button @click="goNext"><i class="material-icons">keyboard_arrow_right</i></button>
                        </div>
                    </div>
                    <div class="right-side">
                        <ul class="loading" :class="{done : isLoading == false}">
                            <li v-for="index in 3" :key="index">
                                <div class="loader loader-5"></div>
                            </li>
                        </ul>
                        <div 
                            class="empty-list"
                            v-if="slideExist == false">
                            <i class="material-symbols-outlined">info</i>
                            <p>모아플레이스에서 즐길 수 있는 공연을 준비 중 입니다.</p>
                        </div>
                        <ul 
                            class="slide-box" 
                            ref="slideWrap"  
                            v-if="slideExist == true">
                            <li 
                                v-for="(slide, index) in slides"
                                :key="index"
                                :style="{left: `${img_width * index}px`}"
                                ref="slide">
                                <RouterLink
                                    :to="`/moaplace.com/show/showdetail/${slide.show_num}`">
                                    <img :src="slide.show_thumbnail" :alt="slide.show_name">
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="sec02" :class="{showMe: showsec02}" ref="sec02">
                <div class="inner">
                    <div class="left-side">
                        <h3 class="title">새소식</h3>
                        <h4 class="sub-title">News</h4>
                        <p>모아플레이스 새소식입니다.</p>
                    </div>
                    <div class="right-side">
                        <div 
                            class="empty-list"
                            v-if="newsExist == false">
                            <i class="material-symbols-outlined">info</i>
                            <p>모아플레이스의 새소식이 없습니다.</p>
                        </div>
                        <div class="news-box" v-if="newsExist == true">
                            <div class="news-row" 
                                v-for="(news, index) in newsList" 
                                :key="index" >
                                <RouterLink
                                    :to="`/moaplace.com/moaplace/news/detail/${news.notice_num}`">
                                        <div class="date">
                                            <p class="day">{{news.day}}</p>
                                            <p class="ym">{{news.yearMonth}}</p>
                                        </div>
                                        <div class="text">
                                            <h5 class="title">{{news.notice_title}}</h5>
                                            <p class="cont">{{news.notice_content}}</p>
                                        </div>
                                        
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <AppFooter/>
    </div>
</template>
<script>
    import AppHeader from '@/components/AppHeader.vue'
    import AppFooter from '@/components/AppFooter.vue'
    import MainVisual from '@/components/MainVisual.vue'
    import axios from '@/axios/axios.js'

    export default {
        components: {
            AppHeader,
            AppFooter,
            MainVisual
        },
        data() {
            return {
                showsec01: false,
                sec01Position: null,
                showsec02: false,
                sec02Position: null,
                wrapWidth : null,
                slideExist: false,
                slides:[],
                length: 0, //li 갯수
                img_width : 0, //li 넓이
                slide_width:0, //ul 전체 넓이
                // 새소식
                newsExist: false,
                newsList:[],
                isLoading: true,
            }
        },
        created(){
            //슬라이드 불러오기
            this.getRunningShow();
            this.img_width = (((770 - (16 * 2)) / 3) + 16); //넓이 + margin값

            //새소식 불러오기
            this.getNotice();
        },
        mounted(){
            //스크롤 위치 가져오기
            window.addEventListener('scroll', this.getScorollTop);
            this.sec01Position = this.$refs.sec01.offsetTop;
            this.sec02Position = this.$refs.sec02.offsetTop;

            //wrap width * 스크롤이 생기지 않을정도 화면이면 미리 content들 배치하기
            this.wrapWidth = this.$refs.wrap.clientWidth;
            if(this.wrapWidth >= 2305){
                this.showsec01 = true;
                this.showsec02 = true;
            }
        },
        methods:{
            //슬라이드 앞으로 넘기기
            goPrev(){
                
                if(this.slideExist){

                    this.slide_width = this.img_width * this.length;//ul 전체 넓이

                    for(let i=0; i< this.length; i++){
                        let left = this.$refs.slide[i].style.left;
                        left = left.replace('px', '');
                        left -= this.img_width;
                        this.$refs.slide[i].style.left = left + 'px';
                        if(left <= - (this.slide_width - (this.img_width * 3))){
                            this.$refs.slide[i].style.left = this.img_width * 3 +'px';
                        }
                    }
                }
                else{
                    alert("진행 중인 공연이 없습니다.");
                    return;
                }
            },
            //슬라이드 뒤로 넘기기
            goNext(){
        
                if(this.slideExist){

                    this.slide_width = this.img_width * this.length;//ul 전체 넓이

                    for(let i=0; i< this.length; i++){
                        let left = this.$refs.slide[i].style.left;
                        left = Number(left.replace('px', ''));
                        left += this.img_width;
                        
                        this.$refs.slide[i].style.left = left + 'px';

                        if(left >= this.slide_width){
                            this.$refs.slide[i].style.left = - 0;
                        }
                    }
                }else{
                    alert("진행 중인 공연이 없습니다.");
                    return;
                }
                
            },
            getScorollTop(){
                //현재 스크롤 위치 가져오기
                let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                if(currentScrollPosition < 0){
                    return;
                }
                //sec01 위치     
                this.showsec01 = this.sec01Position - 450 <= currentScrollPosition;
                //sec02 위치     
                this.showsec02 = this.sec02Position - 800 <= currentScrollPosition;
            },
            //진행중인 공연 가져오기
            async getRunningShow(){
                
                await axios
                    .get('/moaplace.com/main/getRunningShow')
                    .then(function(resp){
                        //슬라이드 초기화
                        this.slides = [];

                        if(resp.data.result == "success"){
                            this.slides = resp.data.list;
                            this.slideExist = true;
                            this.length =  this.slides.length;
                        }else{
                            this.slideExist = false;
                        }
                        this.isLoading = false;
                    }
                    .bind(this)
                    );
            },
            //새소식 가져오기
            async getNotice(){
                
                await axios
                    .get('/moaplace.com/main/getNotice')
                    .then(function(resp){
                        //새소식 목록 초기화
                        this.newsList = [];

                        if(resp.data.result == "success"){
                            this.newsList = resp.data.list;
                            this.newsExist = true;
                        }else{
                            this.newsExist = false;
                        }
                    }
                    .bind(this)
                    );
            }

        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import "@/scss/common.scss";
    //삭제필요
    $brown: #826D5E;
    * {
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
    }
    a{color: $black;}
    #wrap {
        font-family: 'Roboto', 'Nanum Gothic', sans-serif;
        main.main {
            section {
                padding: 64px 0;
                .inner{
                    width :$width;
                    margin: 0 auto;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                    overflow: hidden;
                    .left-side{
                        width: 25%;
                        font-weight: bold;
                        .title{
                            font-size: 32px;
                            font-weight: bold;
                            margin-bottom: 32px;
                        }
                        .sub-title{
                            font-size: 24px;
                            &::after{
                                content: '';
                                display: block;
                                width: 50px;
                                height: 1px;
                                background: $black;
                                margin: 16px 0;
                            }
                        }
                        .btn-box{
                            button{
                                width: 32px;
                                height: 32px;
                                background: transparent;
                                border: 1px solid $black;
                                padding-top: 4px;
                                margin-right: 8px;
                                transition: all 0.3s;
                                &:hover{
                                    background: rgba($brown, 0.2);
                                }
                            }
                        }
                    }
                    .right-side{
                        width: 770px;
                        .empty-list{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            i{
                                margin-right: 8px;
                            }
                        }
                    }
                }
                &.sec01{
                    .right-side{
                        height: 351px;
                        overflow: hidden;
                        .slide-box, .loading{
                            height: 100%;
                            position: relative;
                            display: flex;
                            flex-flow: row nowrap;
                            li{
                                height: 100%;
                                position: absolute;
                                overflow: hidden;
                                margin-right: 16px;
                                img{
                                    width: calc((770px - (16px * 2)) /3);
                                    height: 100%;
                                    transform: scale(1);
                                    transition: all 0.3s;
                                }
                                &:hover{
                                    img{
                                        transform: scale(1.1);
                                    }
                                }
                            }
                        }
                        .loading{
                            opacity: 1;
                            transition: all 0.5s;
                            height: 100%;
                            &.done{
                                opacity: 0;
                                visibility: hidden;
                                height: 0;
                            }
                            li{
                                width: 246px;
                                position: unset;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .loader {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    margin: 3em;
                                    display: inline-block;
                                    position: relative;
                                    vertical-align: middle;
                                }
                                .loader,
                                .loader:before,
                                .loader:after {
                                    animation: 2s infinite ease-in-out;
                                }
                                .loader:before,
                                .loader:after {
                                    width: 100%; 
                                    height: 100%;
                                    border-radius: 50%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                }

                                .loader-5 {
                                    animation: loader6-1 1.5s infinite linear;
                                }
                                .loader-5:before,
                                .loader-5:after {
                                    content:'';
                                    margin: -25px 0 0 -25px;
                                    top: 50%;
                                    left: 50%;
                                    background-color: rgba(30,30,30,0.5);
                                    animation-name: loader6-2;
                                }
                                .loader-5:after { animation-direction: reverse; }

                                    @keyframes loader6-1 {
                                        0% {   transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }

                                    @keyframes loader6-2 {
                                        0%   { transform: scale(0.2); left:   0%; }
                                        50%  { transform: scale(1.0); left:  50%; }
                                        100% { transform: scale(0.2); left: 100%; }
                                    }


                            }
                        }
                    }    
                    

                }
                &.sec02{
                    background: #f0f0f0;
                    p{
                        font-weight: 400;
                    }
                    .news-box{
                        display: flex;
                        flex-flow: column wrap;
                        width: 100%;
                        .news-row{
                            width: 100%;
                            &:first-child{
                                border-top: 1px solid #e0e0e0;
                            }
                            a{
                                display: flex;
                                flex-flow: row wrap;
                                align-items: center;
                                width: 100%;
                                border-bottom: 1px solid #e0e0e0;
                                padding: 0 24px;
                                box-sizing: border-box;
                                &:hover{
                                    color: $black;
                                }
                                div{
                                    padding: 16px 0;
                                    &.date{
                                        width: 10%;
                                        text-align: center;
                                        padding-right: 32px;
                                        .day{
                                            font-size: 32px;
                                            color: $brown;
                                            line-height: 1.2;
                                        }
                                        .ym{
                                            font-size: 12px;
                                        }
                                    }
                                    &.text{
                                        width: 90%;
                                        display: flex;
                                        flex-flow: column wrap;
                                        align-items: center;
                                        &> * {
                                            width: 100%;
                                            overflow: hidden;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            &.title{
                                                font-size: 20px;
                                                line-height: 1.5;
                                            }
                                            &.cont{
                                                font-size: 14px;
                                                color: rgba($black,0.7);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // 스크롤했을때 보여지는 애니매이션
                .right-side, .left-side{
                    transition: all 0.5s;
                    opacity: 0;
                }
                .left-side{
                    transform: translateX(-50%);
                }
                .right-side{
                    transform: translateX(50%);
                }
                &.showMe{
                    .right-side, .left-side{
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            }
        }
    }
</style>