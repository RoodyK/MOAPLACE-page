<template>
  <div class="wrap">
    <h2>잔여석 정보</h2>
    <table>
      <tr>
        <th>No</th><th>일자</th><th>회차</th><th>잔여석수</th>
      </tr>
      <tr v-for="(s, index) in schedule" :key="index">
        <td>{{index+1}}</td>
        <td>{{s.schedule_date}} {{s.schedule_time}}</td>
        <td>{{rowinfo[index]}}회차</td>
        <td>{{total_seat-s.cnt}}</td>
      </tr>
    </table>
    <div>
      <button @click="close">확인</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/axios/axios.js'

  export default {
    name:"ResidualSeatsView",
    data() {
      return {
        detail:[],
        schedule:[],
        rowinfo:[],
        seatcnt:[],
        total_seat:0
      }
    },
    created() {
      this.residualseats();
    },
    methods: {
      residualseats(){
        const show_num = this.$route.params.show_num;

        axios.get(`/moaplace.com/show/residualseats/${show_num}`)
          .then((resp) => {

            this.detail = resp.data.detail[0];
            this.schedule = resp.data.schedule;
            const row = resp.data.rowinfo;

            // 공연장별 총 좌석수
            if(resp.data.detail[0].hall_num==1) {
              this.total_seat=80;
            }else if(resp.data.detail[0].hall_num==2) {
              this.total_seat=100;
            }else {
              this.total_seat=120;
            }

            for(let i=0; i<row.length; i++) {
              for(let j=1; j<row[i]+1; j++) {
                this.rowinfo.push(j);
              }
            }
          }
        )
      },
      close() {
        window.open("about:blank","_self").close();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  .wrap{
    padding: 24px;
    h2{
      margin-bottom: 16px;
      font-weight: bold;
    }
    table{
      border: 1px solid $black;
      width: 100%;
      text-align: center;
      th, td{
        border: 1px solid $black;
        padding: 16px;
      }
      th{
        background-color: rgba($black, 0.1);
        font-weight: bold;
      }
    }
    div{
      text-align: center;
      button{
      margin-top: 32px;
      font-size: 24px;
      padding: 16px 80px;
      border: none;
      background-color: $black;
      color: #fff;
    }
    }
    
  }
</style>