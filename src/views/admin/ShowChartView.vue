<template>
  <div id="wrap">
    <SideMenu largeCategory="통계관리" mediumCategory="공연 매출통계"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">공연 매출차트</h2>
        
        <form action="">
          <div class="searches">
            <div class="range">
              <input type="date" class="date fromDate" v-model="fromDate" @change="fromDateValue()" />
              <input type="date" class="date toDate" v-model="toDate" @change="toDateValue()" />
              <button class="search" @click.prevent="toSearch()">검색</button>
            </div>

            <div class="choose">
              <select v-model="chartValue" @change="toChange()">
                <option v-for="c in chartChoose" :key="c.value"
                  :value="c.value">
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>
        </form>

        <div class="chart">
          <!-- <div class="box"></div> -->
          <GChart
            :type="chartType"
            :data="chartData"
            :options="chartOptions"
            style="width: 100%; height: 600px; margin: 0 auto;"
          />
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from '@/axios/axios.js'
import SideMenu from '@/components/admin/SideMenu.vue'

export default {
  components: {
      SideMenu,
      GChart
  },
  created() {
    axios.get(`/moaplace.com/admin/show/chart/2000-02-02/2040-08-06`)
      .then(response => {
        this.chartDataUpdate(response.data);
      });

    const date = new Date();
    const years = date.getFullYear();
    const months = date.getMonth()+1;
    const days = date.getDate();
    this.fromDate = `${years}-${months < 10 ? `0${months}` : months}-${days < 10 ? `0${days}` : days}`;
  },
  data() {
    return {
      chartValue: 1,
      chartChoose: [
        {
          name : '막대형',
          value : '1'
        },
        {
          name : '도넛형',
          value : '2'
        }
      ],
      fromDate: "",
      toDate: "",
      chartType: "ColumnChart",
      chartData: [
        ['Year', '매출'],
        ['', 0]
      ],
      chartOptions: {
        chart: {
          title: "공연 매출",          
        }
      }
    }
  },
  methods: {
    fromDateValue() {
      const fromDateEl = new Date(this.fromDate).getTime();
      const toDateEl = new Date(this.toDate).getTime();
      if(fromDateEl > toDateEl){
        alert('다음 날짜가 이전의 날짜를 다시 설정하세요.');
        this.fromDate = "";
      }
    },
    toDateValue() {
      const fromDateEl = new Date(this.fromDate).getTime();
      const toDateEl = new Date(this.toDate).getTime();
      if(fromDateEl > toDateEl) {
        alert('다음 날짜가 이전의 날짜를 다시 설정하세요.');
        this.toDate = "";
      }
    },
    toSearch() {
      if(this.fromDate == '' || this.toDate == '') {
        alert("차트를 출력할 범위를 선택하세요.");
        return;
      }

      this.callAxios();
    },
    toChange() {
      this.chartValue == 1
        ? this.chartType = "ColumnChart"
        : this.chartType = "PieChart";
      this.callAxios();
    },
    chartDataUpdate(list) {
      this.chartData = [
        ['Year', '매출']
      ];
      if(list.length == 0) {
        this.chartData.push(['', 0]);
        return;
      }
      for(let i = 0; i < list.length; i++) {
        this.chartData.push([list[i].day, list[i].price]);
      }
    },
    callAxios() {
      const url = this.fromDate == '' || this.toDate == ''
        ? `/moaplace.com/admin/show/chart/2000-02-02/2040-08-06`
        : `/moaplace.com/admin/show/chart/${this.fromDate}/${this.toDate}`

      axios.get(url)
      .then(response => {
        this.chartDataUpdate(response.data);
      })
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
        // background-color: orange;
        padding: 50px 0;

        .box {
          width: 800px;
          height: 600px;
          margin: 0 auto;
          // background-color: red;
        }
      }
    }
  }
</style>