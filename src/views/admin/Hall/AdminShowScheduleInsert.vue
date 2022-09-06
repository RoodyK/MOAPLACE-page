<template>
  <div id="wrap">
    <SideMenu largeCategory="공연관리" mediumCategory="일정정보"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">일정정보 - 일정등록</h2>

        <div class="showInsert">
          <table>
            <tr>
              <th>공연검색</th>
              <td colspan="3">
                <input type="text">
                <button @click="viewShow($event)">검색</button></td>
            </tr>
            <tr v-for="m in resultRow" :key="m">
              <th>검색된 공연</th>
              <td colspan="3" class="showList">
                  <div class="t-row thead">
                    <p>공연번호</p>
                    <p>공연명</p>
                    <p>공연기간</p>
                    <p>공연상태</p>
                  </div>
                  <div class="t-row tbody" v-for="(item,index) in showList" :key="index" @click="selectShow(index,item.num)">
                    <p>{{item.num}}</p>
                    <p>{{item.title}}</p>
                    <p>{{item.startDate}} ~ {{item.endDate}}</p>
                    <p>{{item.status}}</p>
                  </div>
              </td>
            </tr>
            <tr>
              <th>공연번호</th>
              <td>{{showNum}}</td>
              <th rowspan="8">섬네일</th>
              <td rowspan="8" style="vertical-align: top;">
                <div class="thumb">
                  <img :src="thumnail">
                </div>
              </td>
            </tr>
            <tr>
              <th>공연명</th>
              <td>{{title}}</td>
            </tr>
            <tr>
              <th>러닝타임</th>
              <td>{{runningTime}}</td>
            </tr>
            <tr>
              <th>인터미션</th>
              <td>{{intermission}}</td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td>{{grade}}</td>
            </tr>
            <tr>
              <th>공연상태</th>
              <td>{{check}}</td>
            </tr>
            <tr>
              <th>공연시작일</th>
              <td>{{startDate}}</td>
            </tr>
            <tr>
              <th>공연종료일</th>
              <td>{{endDate}}</td>
            </tr>
            <tr v-for="(item,index) in ynHideRow" :key="index">
              <th>{{item.start}}</th>
              <td colspan="1">
                {{pauseStart}}
              </td>
              <th>{{item.end}}</th>
              <td colspan="1">
                {{pauseEnd}}
              </td>
            </tr>
            <tr>
              <th>공연날짜</th>
              <td><input type="date" v-model="showDate" @change="checkDate"></td>
              <th>공연횟수</th>
              <td>
                <input type="text" class="countBox" maxlength="2" @keyup="cntTime($event.currentTarget)">
                <p>회</p></td>
            </tr>
             <tr v-for="(item,index) in showCnt" :key="index">
              <th>{{item}}회차</th>
              <td colspan="3">
                <input type="time" @change="addTime(index,$event.currentTarget)">
                </td>
            </tr>
            <tr>
            </tr>
          </table>
        </div>
        <div class="btnBox">
          <button @click="goList">취소</button>
          <button @click="postInsert">등록</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import SideMenu from '@/components/admin/SideMenu.vue'
  import axios from '@/axios/axios.js';
    export default {
      components: {
        SideMenu
      },
      data(){
        return{
          showList:[],
          showNum:'',
          title:'',
          runningTime:'',
          intermission:'',
          startDate: '',
          endDate: '',
          showDate:'',
          pauseStart:'',
          pauseEnd:'',
          showCount:"",
          showCnt:[],
          showTime:[],
          ynHideRow:[],
          grade:'',
          check:'',
          thumnail:'',
          resultRow:[],
        }
      },
      watch:{
        showCount:function(newCnt){
          this.showCnt.splice(0);
          this.showTime.splice(0);
          if(newCnt>0){
            for(let i=1;i<=newCnt;i++){
              this.showCnt.push(i);
              this.showTime.push("");
            }
          }
        },

      },
      methods:{
        addTime(i,e){
          let showTerm = Number(this.runningTime.replace(/[^0-9]/g,''))+Number(this.intermission.replace(/[^0-9]/g,''));
          let oldTime = new Date(this.showDate + " "+ this.showTime[i-1]).getTime()
          let newTime = new Date(this.showDate + " "+ e.value).getTime()
          if(i>0 && e.value < this.showTime[i-1]){
            alert('전 회차보다 빠른 시간은 선택할 수 없습니다')
            e.value=""
          }else if(this.showTime[i-1]==""){
            alert("데이터를 회차순으로 입력하세요.")
            e.value=""
          }else if(i>0 && newTime < oldTime+(showTerm*1000*60)){
            alert("이전 공연이 진행중인 시간은 선택할 수 없습니다.")
            e.value=""
          }else{
              this.showTime[i] = e.value;
          }
        },
        cntTime(e){
          if(e.value.search(/[^0-9]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            e.value="";
          }else{
            this.showCount=e.value;
          }
        },
        viewShow(e){
          let searchShow = e.target.previousSibling.value;
          this.showNum = '';
          this.title = '';
          this.runningTime = '';
          this.intermission = '';
          this.startDate = '';
          this.endDate = '';
          this.grade = '';
          this.check = '';
          this.pauseStart = '';
          this.pauseEnd = '';
          this.thumnail = '';
          axios.get('/moaplace.com/admin/show/schedule/viewshow/'+ searchShow).
          then(function(resp){
              this.resultRow.splice(0);
              this.thumnaill = '';
              if(resp.data.showList.length>0){
                this.resultRow.push(resp.data.showList.length>0);
              }
              this.showList = resp.data.showList;
          }.bind(this));
        },
        selectShow(index,num){
          axios.get('/moaplace.com/show/calendar/thumbnail/' + num)
          .then(function(resp){
            this.thumnail = resp.data
          }.bind(this))
          this.showNum = this.showList[index].num;
          this.title = this.showList[index].title;
          this.runningTime = this.showList[index].runningTime + ' 분'
          this.intermission =this.showList[index].intermission + ' 분'
          this.startDate = this.showList[index].startDate
          this.endDate = this.showList[index].endDate
          this.grade = this.showList[index].age
          this.check = this.showList[index].status
          this.pauseStart = this.showList[index].blockStartDate
          this.pauseEnd = this.showList[index].blockEndDate
          this.yOrN();
        },
        yOrN(){
          this.ynHideRow.splice(0);
          if(this.check=='Y'){
            this.ynHideRow=[]
          }else if(this.check=='N'){
            this.ynHideRow.push({start:'공연중단시작일',end:'공연중단종료일'});
          }
        },
        checkDate(){
          if(this.showDate <this.startDate || this.showDate > this.endDate){
            alert("공연기간을 확인하세요")
            this.showDate = ''
          }else if(this.startDate == ''){
            alert("공연정보를 먼저 선택하세요")
            this.showDate = ''
          }
        },
        postInsert(){
          axios.post(
            '/moaplace.com/admin/show/schedule/insert',
              JSON.stringify(
                {
                  showNum:this.showNum,
                  showTime:this.showTime,
                  showDate:this.showDate
                }),
            {
              headers:{'Content-Type':'application/json'},
            }
            ).then(function(resp){
              alert(resp.data + '개의 공연일정 등록됨')
              this.goList()
            }.bind(this)).
            catch(function(error){
              if(error.response){
                alert('공연일정을 모두 입력하세요')
              }
            })
      },
      goList(){
        this.$router.push({
          name:'adminShowScheduleList',
          params:{
            selectField: this.$route.params.field,
            search: this.$route.params.search,
            pageNum: this.$route.params.pageNum,
            status: this.$route.params.status
          }
          })
        },
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/scss/common.scss";
  // --------관리자 페이지 레이아웃 시작--------
    #wrap {
        padding-left: 240px;
        background: #f7f9fa;
        #main {
          width: 100%;
          min-height: 100vmin;
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
          // --------관리자 페이지 레이아웃 끝, 등록페이지 시작--------
          .showInsert {
            margin: 32px 0;
              button{
                border: 1px solid rgba($black,0.6);
                background-color: #fff;
                padding: 2px 16px 2px 16px;
                border-radius: 2px;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                border-top: 1px solid rgba($black,0.3);
                border-width: 1px 0;
                table-layout: fixed;
                .thumb{
                  img{
                    width: 100%;
                  }
                }
                tr {
                  &:nth-child(2){
                    table-layout: fixed;
                  }
                  td,
                  th {
                    padding: 8px 16px;
                    border-bottom: 1px solid rgba($black, 0.3);
                    &:nth-child(2){
                      width: 280px;
                    }
                    >& input[type=text] {
                      border: 1px solid rgba($black,0.6);
                      border-radius: 2px;
                      margin-right: 16px;
                      }
                      .countBox{
                        width:40px;
                      }
                    >& p{
                      display: inline;
                      margin:0;
                      padding:0;
                      }
                  }
                  th {
                    width: 15%;
                    background: #eee;
                    text-align: center;
                  }
                  // ---------공연명 검색 후 보여질 목록 테이블 시작------
                  .showList{
                    text-align: center;
                    table-layout: fixed;
                     .t-row {
                        display: flex;
                        flex-flow: row wrap;
                        font-size: 16px;
                        justify-content: center;
                        &.thead {
                          background: rgba($black,0.6);
                          color: #fff;
                            > & :first-child{
                            width:100px;
                          }
                          > & :nth-child(2){
                            width:400px;
                          }
                          > & :last-child{
                            width:100px;
                          }
                        }
                        &.tbody {
                          border-bottom: 1px solid rgba($black, 0.2);
                          display: flex;
                          align-items: center;
                          cursor: pointer;
                          &:hover {
                              background: #eee;
                          }
                          select {
                              border: 1px solid #333;
                              padding: 4px;
                          }
                          .thumb{
                            width:100%;
                            overflow: hidden;
                          }
                          &:p{
                              display: flex;
                              align-items: center;
                              text-align: center;
                              font-size: 16px;
                              overflow: hidden;
                              text-overflow:ellipsis;
                              white-space:nowrap;
                              padding: 4px;
                          }
                            > & :first-child{
                            width:100px;
                          }
                          > & :nth-child(2){
                            width:400px;
                          }
                          > & :last-child{
                            width:100px;
                          }
                        }
                        & > p,
                        div {
                          width: calc(100% /4);
                          text-align: center;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                          
                          & {
                              padding-top: 4px;
                          }
                        }
                      }  
                    }
                  // ---------공연명 검색 후 보여질 목록 테이블 끝------
                  label{
                    margin-right:16px;
                  }
                }
              }
            }
          //-------수정페이지 끝, 수정버튼 시작--------
          .btnBox {
            width: 100%;
            display: flex;
            justify-content: space-between;
            button {
              width: calc((100% - 16px) /2);
              padding: 12px 0;
              border: none;
              &:last-child {
                background-color: $black;
                color: #fff;
              }
            }
          }

        }
      }
</style>