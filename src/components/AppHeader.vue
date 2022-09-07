<template>
    <header id="header" :class="{'white-thema': isMain}">
        <div class="gnb">
            <h1 class="logo">
                <RouterLink
                    to="/moaplace.com">
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
                        @mouseenter="isActive = true">
                        <RouterLink
                            :to="menu.href">
                            {{menu.name}}
                        </RouterLink>
                    </li>
                </ul>
                
                <div class="submenu-wrap" :class="{on:isActive}" @mouseleave="isActive = false">
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
            </nav>
        </div>
        <div class="nav-bg" :class="{on: isActive}"></div>
    </header>
</template>

<script>
// import axios from '@/axios/axios.js'
export default {
  name: 'AppHeader',
  created() {

    let token = localStorage.getItem("access_token");
    if(token == null) {
      this.topMenu = [
        {
            name: 'HOME',
            href: '/moaplace.com',
        },
        {
            name: 'LOGIN',
            href: '/moaplace.com/users/login',
        },
        {
            name: 'JOIN',
            href: '/moaplace.com/users/join/same',
        },
      ]
      return;
    }
    this.topMenu = [
      {
          name: 'HOME',
          href: '/moaplace.com',
      },
      {
          name: 'LOGOUT',
          href: '/moaplace.com/users/logout',
      },
      {
          name: 'MYPAGE',
          href: '/moaplace.com/users/mypage',
      },
    ];
    let roles = localStorage.getItem("user");
    if(roles == 'redm') {
      this.topMenu.push({
          name: 'ADMIN',
          href: '/moaplace.com/admin/show/chart'
      });
    }
  },
  data(){
    return{
        logo: 'logo-white',
        bgClass:'nav-bg',
        isActive: false,
        isMain:false,
        // 경로 임시 입력(변경필요*)
        navigations :[
            {
                name: '모아플레이스',
                href: '/moaplace.com/moaplace/info',
                submenus:[
                    {name: '공간소개', href: '/moaplace.com/moaplace/info'},
                    {name: '공연장정보', href: '/moaplace.com/moaplace/guide'},
                    {name: '오시는길', href: '/moaplace.com/moaplace/navi'}, 
                    {name: '새소식', href: '/moaplace.com/moaplace/news/list'}, 
                ]
            },
            {
                name: '공연/예매',
                href: '/moaplace.com/preview',
                submenus:[
                    {name: '공연목록', href: '/moaplace.com/preview'},
                    {name: '월간일정 ', href: '/moaplace.com/calendar'},
                ]
            },
            {
                name: '대관신청',
                href: '/moaplace.com/rental',
                submenus:[
                    {name: '대관정보', href: '/moaplace.com/rental'},
                    {name: '대관신청 ', href: '/moaplace.com/rental/insert'},
                ]
            },
            {
                name: '고객센터',
                href: '/moaplace.com/board/main',
                submenus:[
                    {name: 'FAQ', href: '/moaplace.com/board/faq'},
                    {name: '1:1문의', href: '/moaplace.com/board/qna/list'},
                    {name: '공연예절', href: '/moaplace.com/board/manner'},
                    {name: '멤버십혜택', href: '/moaplace.com/board/membership'},
                ]
            }
        ],
        topMenu: []
    }    
  },
  mounted(){
    window.onload = ()=>{
        window.scrollTo(0,0);
    }
    window.addEventListener('scroll', this.onScroll);
  },
  methods:{
    onScroll(){
        //현재 스크롤 위치 가져오기
        let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if(currentScrollPosition < 0){
            return;
        }
        //헤더가 안보이기 시작할때부터 적용
        this.isMain = currentScrollPosition > 121;
        if(this.isMain){
            this.logo = 'logo-black'
        }else{
            this.logo = 'logo-white'
        }
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
        position: fixed;
        z-index: 9999;

        width: 100%;
        min-width: $width;
        
        background: rgba(black, 0.2);
        border-bottom: 1px solid $border-color;
        color: #fff;
        transition: all 0.5s;
        a{
            color: #fff;
        }
        .gnb{
            width: $width;
            height: 120px;
            margin: 0 auto;
            display: flex;
            flex-flow: row nowrap;
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
                flex-flow: column nowrap;

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
                    height: 0;
                    overflow: hidden;
                    transition: all 0.5s;
                    &.on{
                        height:253px;
                    }
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
            height: 0px;
            background: rgba(#f1f1f1, 0.9) no-repeat right bottom;
            background-image: url(@/assets/default/nav_bg.png);
            
            box-sizing: border-box;
            transition: all 0.5s;

            position: absolute;
            top: 121px;
            left: 0;
            z-index: 9;

            &.on{
                display: block;
                height: 320px;
                box-shadow: rgba($black, 0.1) 5px 5px 5px;
            }
        }
        // 스크롤 아래로 이동하면 적용되는 css
        &.white-thema{
            background: rgba(#fff, 0.97);
            border-color:rgba($black, 0.5);
            color: $black;
            a{
                color: $black;
            }
            .gnb{
                border-color:rgba($black, 0.5);
                .logo{
                    border-color:rgba($black, 0.5);
                }
                nav{
                    .top-menu{
                        border-color:rgba($black, 0.5);
                    }
                }
            }
            .nav-bg{
                background-color: rgba(#fff, 0.97);;
            }
        }
    }
</style>