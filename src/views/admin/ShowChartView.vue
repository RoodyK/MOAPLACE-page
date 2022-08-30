<template>
  <div id="wrap">
    <SideMenu largeCategory="통계관리" mediumCategory="공연 매출통계"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">공연 매출차트</h2>
        
        <form action="">
          <div class="searches">
            <div class="range">
              <input type="date" class="date" v-model="fromDate"/>
              <input type="date" class="date" v-model="toDate"/>
              <button class="search" @click.prevent="toSearch()">검색</button>
            </div>

            <div class="choose">
              <select name="" id="" @change="toChange()">
                <option value="1">막대형</option>
                <option value="2">도넛형</option>
              </select>
            </div>
          </div>
        </form>

        <div class="chart">
          <div class="box"></div>
          <!-- <div class="box"></div> -->
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
        fromDate: "",
        toDate: ""
      }
    },
    methods: {
      toSearch() {
        console.log(this.fromDate, this.toDate);
      },
      toChange() {
        console.log(this.fromDate, this.toDate);
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
      
      .searches {
        display: flex;
        justify-content: space-between;
        font-size : 20px;
        margin: 20px 0;
        .range {
          .date {
            margin-right: 20px;
          }
          .search {
            font-size : 20px;
            width:60px;
          }
        }
        .choose {
          select {
            width: 100px;
            height: 34px;
            font-size: 20px;
          }
        }
      }

      .chart {
        height: 700px;
        background-color: orange;
        padding: 50px 0;

        .box {
          width: 800px;
          height: 600px;
          margin: 0 auto;
          background-color: red;
        }
      }
    }
  }
</style>