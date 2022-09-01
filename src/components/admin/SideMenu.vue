<template>
  <div id="snbNav">
    <div class="nav-top">
      <h1 class="logo">MOA Place</h1>
      <RouterLink 
        to="/moaplace.com">
        메인페이지 이동
        <img src="@/assets/admin/logout.png" alt="메인페이지로 이동" class="fa-out">
      </RouterLink>
    </div>
    <div class="nav-bottom">
      <ul class="nav">
        <li
          v-for="(nav, index) in navigations" 
          :key="index" 
          :class="{active : nav.isActive}"
          @click="isMatch(index)">
            <RouterLink 
              :to="nav.href">
              {{nav.name}}
            </RouterLink>
            <i class="slide-button"></i>
            <ul class="menu">
              <li
                v-for="menu in nav.subMenu" 
                :key="menu.name"
                :class="{active : mediumCategory === menu.name}">
                <RouterLink 
                  :to="menu.href">
                  {{menu.name}}
                </RouterLink>
              </li>
            </ul>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name : 'SideMenu',
    data(){
      return{
        navigations:[
          {
            name: '통계관리',
            href: '/moaplace.com/admin/show/chart',
            isActive: false,
            subMenu:[
              {
                name: '공연 매출통계',
                href: '/moaplace.com/admin/show/chart',
              },
              {
                name: '대관 매출통계',
                href: '/moaplace.com/admin/reserve/chart',
              }
            ]
          },
          {
            name: '회원관리',
            href: '/moaplace.com/admin/member/info',
            isActive: false,
            subMenu:[
              {
                name: '회원정보',
                href: '/moaplace.com/admin/member/info'
              }
            ]
          },
          {
            name: '공연관리',
            href: '/moaplace.com/admin/show/list',
            isActive: false,
            subMenu:[
              {
                name: '공연정보',
                href:'/moaplace.com/admin/show/list',
              },
              {
                name: '일정정보',
                href:'/moaplace.com/admin/show/schedule/list',
              },
              {
                name: '예매정보',
                href:'/moaplace.com/admin/ticket/list',
              }
            ]
          },
          {
            name: '대관관리',
            href: '/moaplace.com/admin/rental/list',
            isActive: false,
            subMenu:[
              {
                name: '신청내역',
                href:'/moaplace.com/admin/rental/list',
              },
              {
                name: '월간일정',
                href:'/moaplace.com/admin/rental/calendar',
              }
            ]
          },
          {
            name: '게시판관리',
            href: '/moaplace.com/admin/news/list',
            isActive: false,
            subMenu:[
              {
                name: '새소식',
                href:'/moaplace.com/admin/news/list',
              },
              {
                name: '1:1문의',
                href:'/moaplace.com/admin/qna/list',
              },
              {
                name: 'FAQ',
                href:'/moaplace.com/admin/faq/list',
              }
            ]
          }
        ]
      }
    },
    props:{
      largeCategory: String,
      mediumCategory: String,
    },
    created() {
      // console.log(this.largeCategory);
      for(let i = 0; i < this.navigations.length; i++){
        if(this.largeCategory == this.navigations[i].name){
          this.navigations[i].isActive = true;
        }
      }
    },
    methods:{
      isMatch(idx){
        if(this.navigations[idx].isActive){
          this.navigations[idx].isActive = false;
        }else {
          this.navigations[idx].isActive = true;
        }
      },
    }
}
</script>

<style lang="scss" scoped>
  @import "@/scss/common.scss";
  $brown :#826D5E;;
  *{list-style-type: none; text-decoration: none; margin: 0; padding: 0;color: #fff;}
  a:hover{color:#D67747}
  #snbNav{
    position: fixed;
    top:0;
    left: 0;
    z-index: 99999;
    width: 240px;
    height: 100vh;
    padding: 32px 0;
    background: $black;
    color: rgba(#fff, 0.5);
    user-select:none;
    .nav-top{
      font-size: 14px;
      padding-bottom: 32px;
      border-bottom: 1px solid rgba(#fff, 0.5);
      padding: 0 16px 32px;
      h1.logo{
        font-family: 'Roboto',sans-serif;
        margin-bottom: 14px;
        font-size: 32px;
      }
      .fa-out{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-left: 4px;   
      }
    }
    .nav-bottom{
      padding: 24px 16px 32px;
      height: calc(100% - (107px));
      overflow-y: scroll;
      .nav {
        flex-flow: column;
        > li{
          border-bottom: 1px solid rgba(#fff, 0.5);
          margin-bottom: 16px;
          position: relative;
          cursor: pointer;

          .slide-button{
            content: "";
            display: block;
            width: 24px;
            height: 24px;
            background: url(@/assets/admin/down-arrow.png);
            background-size: 100%;
            position: absolute;
            top: 4px;
            right: 0;
          }
          > a{
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            padding: 8px 0;
            
          }
        }
        .menu{
          font-size: 14px;
          margin-bottom: 16px;
          // height: 0px;
          display: none;
          visibility: none;
          transition: all 0.5s;
        }
      }
      &::-webkit-scrollbar {
          display: none;
      }
      .nav > li.active {
        .slide-button{
          background: url(@/assets/admin/up-arrow.png);
          background-size: 100%;
        }
        .menu{
          height: auto;
          display: block;
          visibility: visible;
        }
      }
      
      .menu .active > a{
        color:#D67747
      }
    }
    
  }
</style>