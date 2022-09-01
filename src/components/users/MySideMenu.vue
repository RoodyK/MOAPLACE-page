<template>
    <div class="rounded left">
      <div class="top fs-6">
        <span class="fs-4 brown">{{ this.name }}</span>님, 안녕하세요.
      </div>
      <div class="mid fs-6 fw-bold">
        <p>현재 보유 적립금</p>
        <p class="text-end">
          <span class="fs-3 text-end">{{ this.point }}</span>원
        </p>
      </div>
      <div class="bot">
        <ul class="nav flex-column fs-6">
          <li class="nav-item"
            v-for="(nav, index) in navigations"
            :key="index"
            :class="{active : nav.isActive}"
            @click="isMatch(index)">
            <RouterLink :to="nav.href" class="nav-link">
              {{ nav.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name : 'MySideMenu',
  data(){
    return{
      navigations:[
        {
          name: '마이페이지',
          href: '/moaplace.com/users/mypage',
          isActive: false
        },
        {
          name: '내 관심 공연',
          href: '/moaplace.com/users/mypage/performance',
          isActive: false
        },
        {
          name: '예매내역',
          href: '/moaplace.com/users/mypage/ticket/list',
          isActive: false
        },
        {
          name: '대관내역',
          href: '/moaplace.com/users/mypage/rental/list',
          isActive: false
        },
        {
          name: '관람 후기',
          href: '/moaplace.com/users/mypage/review/list',
          isActive: false
        },
        {
          name: '1:1 문의',
          href: '/moaplace.com/board/qna/list',
          isActive: false
        },
        {
          name: '내 정보 수정',
          href: '/moaplace.com/users/mypage/info/edit',
          isActive: false
        },
        {
          name: '회원 탈퇴',
          href: '/moaplace.com/users/mypage/withdrawal',
          isActive: false
        }
      ]
    }
  },
  props:{
    category: String,
    name: String,
    point: String
  },
  created(){
    for(let i = 0; i < this.navigations.length; i++){
      if(this.category == this.navigations[i].name){
        this.navigations[i].isActive = true;
      }
    }
  },
  mounted(){
  },
  methods:{
    isMatch(idx){
      this.navigations[idx].isActive = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';

  a {
    color: $black;
    text-decoration:none;
  }
  .fs-7 {
    font-size: 0.8em;
  }
  .black {
    color: $black;
  }
  .brown {
    color: $brown;
  }
  #box {
    display: flex;
    justify-content: center;
    width: $width;
    margin: 50px;
    .left {
      width: 300px;
      height: 600px;
      background-color: white;
      border: 2px solid #dbe2e8;
      margin-right: 30px;
      padding: 30px 20px;
      .top {
        margin-bottom: 10px;
      }
      .mid {
        background-color: whitesmoke;
        border: 2px solid #dbe2e8;
        padding: 15px;
        p {
          margin: 0;
        }
        span {
          color: #D67747;
        }
      }
      .bot {
        margin: 10px 0px;
        ul li {
          border-bottom: 1px solid #CCCCCC;
          a {
            color: $black;
          }
          a:hover {
            color: $brown;
            opacity: 50%;
          }
        }
        ul > .active > a {
          color: $brown;
          font-weight: bold;
        }
      }
    }
  }
</style>