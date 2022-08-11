<template>
  <div id="wrap">
    <SideMenu largeCategory="대관관리" mediumCategory="신청내역"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">회원정보</h2>
        <div class="list-top">
          <select>
            <option value="memberId">아이디</option>
            <option value="memberName">회원이름</option>
            <option value="enabled">탈퇴여부</option>
          </select>
          <input type="text">
          <button>
            검색<i class="material-icons">search</i>
          </button>
        </div>
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
            <p>{{item.num}}</p>
            <p>{{item.memberid}}</p>
            <p>{{item.email}}</p>
            <p>{{item.name}}</p>
            <p>{{item.phone}}</p>
            <p>{{item.regdate}}</p>
            <p>{{item.point}}</p>
            <p>{{item.enabled}}</p>
          </div>
          <ul class="paging">
            <li>[이전]</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>[다음]</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SideMenu from '@/components/admin/SideMenu.vue'
  export default {
    components: {
        SideMenu
    },
    data() {
      return {
        memberList: [
          {
            num: 0,
            memberid: 'nada',
            email: 'nana@gmail.com',
            name: '김나다',
            phone: '010-1515-4548',
            regdate: '2022-06-10',
            point: '1000',
            enabled: '1'
          },
          {
            num: 0,
            memberid: 'neonya',
            email: 'neonya@gmail.com',
            name: '김너냐',
            phone: '010-1525-6848',
            regdate: '2022-07-11',
            point: '1000',
            enabled: '1'
          },
          {
            num: 0,
            memberid: 'naya',
            email: 'naya@gmail.com',
            name: '응나야',
            phone: '010-3587-1358',
            regdate: '2022-08-11',
            point: '1000',
            enabled: '1'
          },
          {
            num: 0,
            memberid: 'aniya',
            email: 'aniya@gmail.com',
            name: '아니야',
            phone: '010-5732-1248',
            regdate: '2022-05-27',
            point: '1000',
            enabled: '1'
          },
          {
            num: 0,
            memberid: 'neoya',
            email: 'neoya@gmail.com',
            name: '박너야',
            phone: '010-1515-4548',
            regdate: '2022-08-10',
            point: '1000',
            enabled: '1'
          }
        ],
        states: [
            '신청완료',
            '심사중',
            '신청거절',
            '입금대기',
            '예약취소',
            '사용완료'
        ]
      }
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
      // 관리자 페이지 레이아웃 관련 끝------------------
      .list-top {
          width: 100%;
        text-align: right;
        margin-bottom: 16px;
        position: relative;
        font-size: 14px;
        button,
        select {
            border: none;
        }
        select {
          position: absolute;
          top: 50%;
          right: 200px;
          transform: translateY(-50%);
          border-right: 1px solid #ddd;
        }
        button {
          background: transparent;
          font-size: 0;
          position: absolute;
          top: 4px;
          right: 5px;
          color: rgba($black, 0.9);
        }
        input {
          width: 280px;
          box-sizing: border-box;
          padding: 4px 32px 4px 90px;
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
            padding: 16px 0;
            border-bottom: 1px solid rgba($black, 0.2);
            cursor: pointer;
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