<template>
    <div class="side-visual">
        <div class="sub-bg">
            <div 
                class="sub-bg-img"
                :style="{'background-image': 'url(' + require(`@/assets/background-${img}.png`) + ')'}"></div>
        </div>
        <div class="side-text">
            <p>{{menu}}</p>
        </div>
        <ul class="slide-tab">
            <li v-for="(tap, index) in tapMenu" :key="index">
                <ul v-if="tap.name == img" class="tap">
                    <li v-for="name in tap.taps" :key="name" :class="{on: name.title == title}">
                        <RouterLink :to="name.href">
                            {{name.title}}
                        </RouterLink>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideVisual',
    props:{
        menu: String,
        img: String,
        title: String,
    },
    data(){
        return{
            tapMenu :[
                {
                    name: 'moa',
                    taps:[
                        {title: '공간소개', href: '/moaplace.com/moaplace/info'},
                        {title: '공연장정보', href: '/moaplace.com/moaplace/guide'},
                        {title: '오시는길', href: '/moaplace.com/moaplace/navi'}, 
                        {title: '새소식', href: '/moaplace.com/moaplace/news/list'}, 
                    ]
                },
                {
                    name: 'show',
                    taps:[
                        {title: '공연목록', href: '/moaplace.com/preview'},
                        {title: '월간일정', href: '/moaplace.com/calendar'},
                    ]
                },
                {
                    name: 'rental',
                    taps:[
                        {title: '대관정보', href: '/moaplace.com/rental'},
                        {title: '대관신청', href: '/moaplace.com/rental/insert'},
                    ]
                },
                {
                    name: 'cs',
                    taps:[
                        {title: 'FAQ', href: '/moaplace.com/board/faq'},
                        {title: '1:1문의', href: '/moaplace.com/board/qna/list'},
                        {title: '공연예절', href: '/moaplace.com/board/manner'},
                        {title: '멤버십혜택', href: '/moaplace.com/board/membership'},
                    ]
                },
                {
                    name: 'login',
                    taps:[]
                },
                {
                    name: 'mypage',
                    taps:[]
                }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/common.scss';
    *{margin: 0; padding: 0; list-style: none; text-decoration: none;}
    .side-visual{
        width: 100%;
        position: relative;
        .sub-bg{
            height: 520px;
            .sub-bg-img{
                height: 100%;
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
            }
        }
        .side-text{
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Cormorant Infant',sans-serif;
            font-weight: 100;
            font-size: 42px;
            color: #fff;
            text-align: center;
            user-select: none;
            line-height: 0;
            p{
                width: $width;
                margin: 0 auto;
                line-height: 1;
                text-shadow: 5px 5px 5px rgba($black,0.5);
                letter-spacing: 2px;
            }
            &::after{
                    content: '';
                    display: inline-block;
                    width: 20px;
                    height: 0.5px;
                    box-shadow: 5px 5px 5px rgba($black,0.5);
                    background: #fff;
                }
            
        }
        .slide-tab{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            > li{
                margin: 0 auto;
                .tap{
                    width: $width;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    li{
                        width: calc(100% / 4);
                        padding: 16px 0;
                        text-align: center;
                        background: rgba(#000, 0.4);
                        box-sizing: border-box;
                        border-left: 1px solid rgba(#fff, 0.1);
                        a{color:rgba(#fff,0.9);}
                        &:first-child{
                            border: none;
                        }
                        &.on{
                            background: #fff;
                            font-weight: bold;
                            border: 1px solid #f8f8f8;
                            a{color:$black;}
                        }
                    }
                }
            }
            
        }
    }
</style>