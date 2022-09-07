<template>
  <div id="wrap">
    <SideMenu largeCategory="회원관리" mediumCategory="회원정보"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">회원정보</h2>

        <form @submit.prevent>
          <div class="searches">
            <div class="choose">
              <select v-model="sorted" @change="isSorted()">
                <option v-for="s in sort" :key="s.name"
                  :value="s.value">
                  {{ s.name }}
                </option>
              </select>
            </div>

            <div class="search">
              <select v-model="fielded">
                <option v-for="f in field" :key="f.name"
                  :value="f.value">
                  {{ f.name }}
                </option>>
              </select>
              <input type="text" v-model="word" @keyup.enter="isSearch()">
              <button type="button" @click="isSearch()">
                검색<i class="material-icons">search</i>
              </button>
            </div>
          </div>
        </form>

        <div class="list">
          <div class="t-row thead">
            <p>번호</p>
            <p>아이디</p>
            <p>이메일</p>
            <p>이름</p>
            <p>전화번호</p>
            <p>가입일</p>
            <p>적립금</p>
            <p>탈퇴여부</p>
          </div>
          <div v-for="item in memberList" :key="item.num" class="t-row tbody">
            <p>{{item.member_num}}</p>
            <p>{{item.member_id}}</p>
            <p>{{item.member_email}}</p>
            <p>{{item.member_name}}</p>
            <p>{{item.member_phone}}</p>
            <p>{{item.regDate}}</p>
            <p>{{item.member_point}}</p>
            <p>{{item.enabled}}</p>
          </div>
          <ul class="paging">
            <li @click="prevPage()">[이전]</li>
            <li v-for="page in pageNum" :key="page"
              :class="{active : pageUtils.pageNum == page}"
              @click="movePage(page)">
              {{ page }}
            </li>
            <li @click="nextPage()">[다음]</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '@/axios/axios.js'
import SideMenu from '@/components/admin/SideMenu.vue'
export default {
  components: {
      SideMenu
  },
  data() {
    return {
      memberList: [],
      sort: [
        {
          name: '전체',
          value: 'all'
        },
        {
          name: '일반회원',
          value: '1'
        },
        {
          name: '탈퇴회원',
          value: '0'
        }
      ],
      field: [
        {
          name: '아이디',
          value: 'member_id'
        },
        {
          name: '이메일',
          value: 'member_email'
        },
        {
          name: '회원이름',
          value: 'member_name'
        }
      ],
      sorted : 'all',
      fielded : 'member_id',
      searched : false,
      page : 1,
      word : '',
      pageNum: [],
      pageUtils: [],
      rememberWord: ''
    }
  },
  created() {
    this.getMemberInfo();
  },
  watch: {
    word(to, from) {
      console.log(from);
      console.log(to);
    }
  },
  methods: {
    listPageNums() {
      this.pageNum = [];
      for(let i = this.pageUtils.startPageNum; i <= this.pageUtils.endPageNum; i++){
        this.pageNum.push(i);
      }
    },
    async getMemberInfo(sort) {
      try {
        const url = sort == null || sort == undefined
          ? `/moaplace.com/admin/member/info/${this.page}/all`
          : `/moaplace.com/admin/member/info/${this.page}/${this.sorted}`

        const response = await axios.get(url);
        // console.log(response);

        this.memberList = response.data.list;
        this.pageUtils = response.data.pu;
        this.listPageNums();
      }catch(error) {
        console.log(error)
      }
    },
    isSorted() {
      if(this.searched) {
        this.movePage(this.page);
      }else {
        this.getMemberInfo(this.sorted)
      }
    },
    async isSearch() {
      if(this.word != null && this.word != '') {
        this.searched = true;
        this.rememberWord = this.word;
        try {
          const response = await axios.get(`/moaplace.com/admin/member/info/1/${this.sorted}/${this.fielded}/${this.word}`)
          // console.log(response);

          this.memberList = response.data.list;
          this.pageUtils = response.data.pu;
          this.sorted = response.data.sorted;
          this.listPageNums();
        }catch(error) {
          console.log(error)
        }

      }else {
        this.searched = false;
        this.getMemberInfo();
      }
    },
    async movePage(page) {
      // this.page = page;
      // console.log(this.searched);
      const url = this.searched
        ? `/moaplace.com/admin/member/info/${page}/${this.sorted}/${this.fielded}/${this.rememberWord}`
        : `/moaplace.com/admin/member/info/${page}/${this.sorted}`

      try {
        const response = await axios.get(url);

        this.memberList = response.data.list;
        this.pageUtils = response.data.pu;
        this.sorted = response.data.sorted;
        this.word = response.data.word;
        this.listPageNums();
      }catch(error) {
        console.log(error);
        alert('에러 발생');
      }
    },
    prevPage() {
      if(this.pageUtils.startPageNum > 1) {
        this.movePage(this.pageUtils.startPageNum - 1);
      }else {
        alert('이전페이지가 없습니다.');
      }
    },
    nextPage() {
      if(this.pageUtils.endPageNum < this.pageUtils.totalPageCount) {
        this.movePage(this.pageUtils.endPageNum + 1);
      }else {
        alert('다음페이지가 없습니다.');
      }
    },
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

      .searches {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        .choose {
          select {
            height: 100%;
          }
        }

        .search {
          position: relative;
          button,
          select {
              border: none;
          }
          select {
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            border-right: 1px solid #ddd;
          }
          button {
            background: transparent;
            font-size: 0;
            position: absolute;
            top: 6px;
            right: 5px;
            color: rgba($black, 0.9);
          }
          input {
            width: 350px;
            box-sizing: border-box;
            padding: 4px 40px 4px 90px;
          }
        }
      }
      .list {
        .t-row {
          display: flex;
          flex-flow: row wrap;
          padding: 8px 0;
          font-size: 14px;
          &.thead {
            background: $black;
            color: #fff;
          }
          &.tbody {
            padding: 20px 0;
            border-bottom: 1px solid rgba($black, 0.2);
            &:hover {
              background: #eee;
            }
          }
          & > p {
            width: calc(100% / 8);
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-top: 4px;
          }
        }
        .paging {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          margin-top: 32px;
          li {
            margin: 0 8px;
            padding: 0 8px;
            cursor: pointer;
            &.active {
              color: #D67747;
              font-weight: 700;
            }
            &:first-child,
            &:last-child {
                color: $brown;
                font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>