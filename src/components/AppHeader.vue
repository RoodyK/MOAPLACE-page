<template>
    <header id="header">
        <div class="gnb">
            <h1 class="logo">
                <RouterLink
                    to="/moa">
                    모아플레이스
                    <img :src="require(`@/assets/default/${logo}.png`)" alt="모아플레이스 로고">
                </RouterLink>
            </h1>
            <nav>
                <ul class="top-menu">
                    <li 
                        v-for="menu in topMenu"
                        :key="menu.name">
                        <RouterLink
                            :to="menu.href">
                            {{menu.name}}
                        </RouterLink>
                    </li>
                </ul>
                <ul class="menu">
                    <li
                        v-for="menu in navigations"
                        :key="menu.name"
                        @mouseenter="showMenu">
                        <RouterLink
                            :to="menu.href">
                            {{menu.name}}
                        </RouterLink>
                    </li>
                </ul>
                <transition name="slide">
                       <div class="submenu-wrap" @mouseleave="undoShowMenu" v-show="isShow">
                            <ul class="submenu">
                                <li
                                    v-for="menu in navigations"
                                    :key="menu.name">
                                    <RouterLink
                                        :to="menu.href">
                                        {{menu.name}}
                                    </RouterLink>
                                    <ul>
                                        <li
                                            v-for="submenu in menu.submenus"
                                            :key="submenu.name">   
                                            <RouterLink
                                                :to="submenu.href">
                                                {{submenu.name}}
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div> 
                </transition>
            </nav>
        </div>
        <transition name="slide"
            @enter="enter"
            @after-enter="leave"
            @before-leave="enter"
            @after-leave="leave"
            >
        <!-- <transition> -->
            <div :class="bgClass" v-show="isShow"></div>
        </transition>
    </header>
</template>
<script>

export default {
  name: 'AppHeader',
  data(){
    return{
        logo: 'logo-white',
        bgClass:'nav-bg',
        isShow: false,
        // 경로 임시 입력(변경필요*)
        navigations :[
            {
                name: '모아플레이스',
                href: '/',
                submenus:[
                    {name: '공간소개', href: '/'},
                    {name: '공연장정보', href: '/'},
                    {name: '오시는길', href: '/'}, 
                    {name: '새소식', href: '/'}, 
                ]
            },
            {
                name: '공연/예매',
                href: '/',
                submenus:[
                    {name: '공연목록', href: '/'},
                    {name: '월간일정 ', href: '/'},
                ]
            },
            {
                name: '대관신청',
                href: '/',
                submenus:[
                    {name: '대관정보', href: '/'},
                    {name: '대관신청 ', href: '/'},
                ]
            },
            {
                name: '고객센터',
                href: '/',
                submenus:[
                    {name: 'FAQ', href: '/'},
                    {name: '1:1문의', href: '/'},
                ]
            }
        ],
        topMenu:[
            {
                name: 'HOME',
                href: '/',
            },
            {
                name: 'LOGIN',
                href: '/',
            },
            {
                name: 'MYPAGE',
                href: '/',
            },
            {
                name: 'JOIN',
                href: '/',
            },
        ]
    }    
  },
  methods:{
    showMenu(){
        this.isShow = true;
    },
    undoShowMenu(){
        this.isShow=false;
    },
    enter() {
        this.bgClass = 'nav-bg on';
    },

    leave() {
        this.bgClass = 'nav-bg';
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/common.scss";
    
    *{margin: 0; padding: 0;list-style: none;text-decoration: none;}
    a:hover{color: $black;}

    $border-color:rgba(#fff, 0.5);
    $brown : #826D5E;

    header#header{
        position: absolute;//스크롤이 메인슬라이드를 벗어나면 fixed
        z-index: 9999;

        width: 100%;
        min-width: $width;
        
        background: rgba(black, 0.2);
        border-bottom: 1px solid $border-color;
        color: #fff;
        a{
            color: #fff;
        }
        .gnb{
            width: $width;
            height: 120px;
            margin: 0 auto;
            display: flex;
            flex-flow: row wrap;
            align-items: center;

            border: 1px solid $border-color;
            border-width: 0 1px;
            .logo{
                width: 140px;
                height: 100%;
                font-size: 0px; //웹접근성
                border-right: 1px solid $border-color;;

                display: flex;
                justify-content: center;
                align-items: center;
            }

            nav{
                width: calc(100% - 140px );
                height: 100%;
                display: flex;
                flex-flow: column wrap;

                > ul{
                    display: flex;
                    width: 100%;
                }
                .top-menu{
                    justify-content: flex-end;
                    font-size: 12px;
                    border-bottom: 1px solid $border-color;

                    li{
                        font-family: 'Roboto',sans-serif;
                        margin: 0 8px;
                        padding: 8px;
                    }
                }
                .menu{
                    height: calc(100% - 35px);
                    justify-content: center;
                    align-content: center;
                    > li{
                        > a{
                            display: block;
                            width: 160px;
                            height: 100%;
                            line-height: 80px;
                            font-size: 18px;
                            text-align: center;
                        }
                        &:hover{
                            background: rgba(#fff, 0.3);
                        }
                    }

                }
                .submenu-wrap{
                    width: 100%;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    z-index: 99;

                    .submenu{
                        width: $width;
                        margin: 0 auto;

                        display: flex;
                        justify-content: center;
                        align-content: center;
                        font-size: 14px;
                        padding-top: 40px;
                        padding-left: 140px;

                        > li{
                            width: 160px;
                            padding-left: 30px;
                            > a{
                                display: inline-block;
                                height: 45px;
                                font-size: 19px;
                                font-weight: bold;
                                color: $brown;
                                position: relative;
                                &::before{
                                    content: "";
                                    width: 5px;
                                    height: 5px;
                                    background-color: $brown;
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                }
                            }
                            ul {
                                margin-top: 8px;
                                li{
                                    a{
                                        color:$black;
                                        line-height: 40px;
                                        
                                    }
                                    &:hover a{
                                        color: $brown;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        }
        .nav-bg{
            width: 100%;
            height: 320px;
            background: rgba(#f1f1f1, 0.9) no-repeat right bottom;
            background-image: url(@/assets/default/nav_bg.png);
            // transition: all 0.5s;

            position: absolute;
            top: 120px;
            left: 0;
            z-index: 9;

            &.on{
                display: block;
                height: 320px;
            }
        }
        
    }
    
    .slide-enter-active{
        transition: all .5s;
    }
    .slide-enter {
        // height: 0;
        opacity: 0;
    }
    .slide-enter-to {
        opacity: 1;
    }
    

    
</style>