<template>
    <div class="main-visual">
        <ul class="main-bg"> 
            <li
                v-for="(img, index) in imgs"
                :key="index" 
                :style="{'background-image': 'url(' + require(`@/assets/main0${img}.png`) + ')'}"
                :class="{on: this.index == index+1}">
                <div class="main-text slidein">
                    <p><span>MOA&nbsp;PLACE</span></p>
                    <p><span>ENJOY TOGETHER</span></p>
                </div>
            </li>
        </ul>
        <div class="main-btn-box">
            <button @click="goPrev">
                <i class="material-symbols-outlined">
                    keyboard_arrow_up
                </i>
            </button>
            <div class="tmp"></div>
            <button @click="goNext" ref="goNext">
                <i class="material-symbols-outlined">
                    keyboard_arrow_down
                </i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainVisual',
    data(){
        return{
            index : 1,
            imgs:[1, 2, 3],
            slideInterval : null,
        }
    },
    methods:{
        goPrev(){
            this.index--;
            if(this.index == 0) this.index = 3;
            this.slidein = true;
            // 버튼 클릭시 인터벌 해제 후 다시 시작
            clearInterval(this.slideInterval);
            this.slideInterval = setInterval(()=>{
                this.$refs.goNext.click();
            },5000);
        },
        goNext(){
            this.index++;
            if(this.index == 4) this.index = 1;
            this.slidein = true;
            // 버튼 클릭시 인터벌 해제 후 다시 시작
            clearInterval(this.slideInterval);
            this.slideInterval = setInterval(()=>{
                this.$refs.goNext.click();
            },5000);
        }
    },
    created(){
        this.slideInterval = setInterval(()=>{
            this.$refs.goNext.click();
        },5000);
    },
    unmounted(){
        // 페이지 이동시 인터벌 해제
        clearInterval(this.slideInterval);
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/common.scss';
    *{margin: 0; padding: 0; list-style: none; text-decoration: none;}
    .main-visual{
        width: 100%;
        height: 970px;
        position: relative;
        .main-bg{
            position: relative;
            height: 970px;
            width: 100%;
            overflow: hidden;
            li{
                width: 100%;
                height: 970px;
                top:0;
                left: 0;
                position: absolute;
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
                opacity: 0;
                transform: scale(1);
                transition: all 1s;
                &.on {
                    opacity: 1;
                    transform: scale(1.1);
                    .main-text.slidein{
                        span{
                            animation-duration: 1s;
                            animation-name: slidein;
                        }
                    }
                    // 텍스트 애니메이션
                    @keyframes slidein {
                        from {transform: translateY(100%);opacity: 0;}
                        to {transform: translateY(0);opacity: 1;}
                    }
                }
            }
        }
        .main-text{
            width: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Cormorant Infant',sans-serif;
            font-weight: 100;
            font-size: 80px;
            color: #fff;
            text-align: center;
            user-select: none;
            p{
                width: $width;
                overflow: hidden;
                margin: 0 auto;
                line-height: 1.2;
                text-shadow: 5px 5px 5px rgba($black,0.5);
                letter-spacing: -3px;
                &:first-child{
                    letter-spacing: 5px;
                }
                span{
                    display: block;
                }
            }
            &::after{
                content: '';
                display: block;
                width: 100%;
                height: 0.3px;
                box-shadow: 5px 5px 5px rgba($black,0.5);
                background: #fff;
                position: absolute;
                top: 50%;
            }
            
        }
        .main-btn-box{
            width: $width;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            flex-flow: column nowrap;
            align-items:flex-end;
            button{
                width: 51px;
                height: 51px;
                background: none;
                border: 1px solid #fff;
                border-radius: 50%;
                margin-right: 150px;
                transition: all 0.5s;
                box-shadow: 5px 5px 5px rgba($black,0.2);
                i{
                    font-size:45px;
                    padding-top: 2px;
                    color: #fff;
                    text-shadow: 5px 5px 5px rgba($black,0.2);
                }
                &:last-child{
                    i{
                        padding-top: 4px;
                    }
                }
                &:hover{
                    background: rgba(#fff,0.3);
                }
            }
            .tmp{
                content: '';
                display: block;
                height: 43px;
            }
        }
        
    }
    
</style>