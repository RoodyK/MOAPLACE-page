<template>
    <div id="wrap">
        <SideMenu largeCategory="공연관리" mediumCategory="일정정보"/>
        <main id="main">
            <div class="inner">
                <h2 class="title">일정정보 - 일정수정</h2>

                <div class="titleBox">
                    <span>공연번호</span>
                    <input type="text" v-model="showNum" readonly>
                    <span>공연명</span>
                    <input type="text" v-model="showTitle" readonly>
                </div>
                <div class="hallInfo">
                    <h3>공연정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>러닝타임</th>
                                <td>{{runningTime}}</td>
                                <th>인터미션</th>
                                <td>{{intermission}}</td>
                            </tr>
                            <tr>
                                <th>공연날짜</th>
                                <td>{{showDate}}</td>
                                <th>공연상태</th>
                                <td>{{showStatus}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="hallInfo">
                    <h3>일정정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연횟수</th>
                                <td colspan="5">
                                    {{showCount}}
                                    회
                                </td>
                            </tr>
                            <tr v-for="(item,index) in timeInfo" :key="index">
                                <th>공연회차별정보</th>
                                <td>{{item.timeRow}}회차</td>
                                <th>공연시간</th>
                                <td><input type="time" :value='item.dateTime' @change="updateTime(index,$event.currentTarget)"></td>
                                <th>공연상태</th>
                                <td>
                                  <select :value="item.dateStatus" @change="updateYN(index,$event.currentTarget)">
                                    <option v-for="list in showStatusList" :key="list">{{list}}</option>
                                  </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="hallInfo">
                    <h3>일정정보</h3>
                    <div>
                        <table>
                            <tr>
                                <th>공연회차 추가</th>
                                <td>
                                    <button @click="addRow">등록</button>
                                </td>
                                <th>공연시간</th>
                                <td><input type="time" v-model="addTime"></td>
                                <th>공연상태</th>
                                <td>
                                  <select v-model="addStatus">
                                    <option v-for="list in showStatusList" :key="list">{{list}}</option>
                                  </select>
                                </td>
                            </tr>
                            <tr v-for="(item,index) in addTimeInfo" :key="index">
                                <th>추가된 공연</th>
                                <td>
                                  {{item.timeRow}}회차
                                </td>
                                <th>공연시간</th>
                                <td><input type="time" :value='item.dateTime'></td>
                                <th>공연상태</th>
                                <td>
                                  <select v-model="addStatus" :value="item.dateStatus">
                                    <option v-for="list in showStatusList" :key="list">{{list}}</option>
                                  </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                  </div>

                <div class="btnBox">
                    <button @click="goList">이전</button>
                    <button @click="goUpdate">수정</button>
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

        data() {
            return {
              showNum:'',
              showtitle:'',
              runningTime:'',
              intermission:'',
              showDate:'',
              showStatusList:['Y','N'],
              timeInfo:[],
              showCount:'',
              bookingSeat:'',
              addTime:'',
              addStatus:'Y',
              addTimeInfo:[],
              pageNum: this.$route.params.pageNum,
              status: this.$route.params.status,
              selectDate: this.$route.params.selectDate,
              selectField: this.$route.params.field,
              search: this.$route.params.search,
            }
        },

        mounted(){
          this.viewDetail(
            this.$route.params.showNum,
            this.$route.params.showDate);
        },

        methods:{
          addRow(){
            let showTerm = this.runningTime+this.intermission;
            let oldTime = new Date(this.showDate + " "+ this.timeInfo[this.timeInfo.length-1].dateTime).getTime()
            let newTime = new Date(this.showDate + " "+ this.addTime).getTime()
            
            if(this.addTime < this.timeInfo[this.timeInfo.length-1].dateTime){
              alert('전 회차보다 빠른 시간은 선택할 수 없습니다')
              this.addTime = ''
            }else if(newTime < oldTime+(showTerm*1000*60)){
              alert("이전 공연이 진행중인 시간은 선택할 수 없습니다.")
              this.addTime=""
            }else if(this.addTimeInfo.length!=0 && this.addTime < this.addTimeInfo[this.addTimeInfo.length-1].dateTime){
              alert('전 회차보다 빠른 시간은 선택할 수 없습니다')
              this.addTime = ''
            }else if(this.addTimeInfo.length!=0){
              let newAddTime = new Date(this.showDate + " "+ this.addTimeInfo[this.addTimeInfo.length-1].dateTime).getTime()
              if(newTime < newAddTime+(showTerm*1000*60)){
                alert("이전 공연이 진행중인 시간은 선택할 수 없습니다.")
                this.addTime= ''
              }
            }else{
              this.addTimeInfo.push({
              dateTime : this.addTime,
              dateStatus : this.addStatus,
              timeRow : this.timeInfo.length+this.addTimeInfo.length+1,
              scheduleNum : 0})
            }
            
              this.addTime = '';
          },
          updateYN(i,e){
            this.timeInfo[i].dateStatus = e.value;
          },
          updateTime(i,e){
            let showTerm = this.runningTime+this.intermission;
            let oldTime = new Date(this.showDate + " "+ this.timeInfo[i-1].dateTime).getTime()
            let newTime = new Date(this.showDate + " "+ e.value).getTime()
            if(i>0 && e.value < this.timeInfo[i-1].dateTime){
              alert('전 회차보다 빠른 시간은 선택할 수 없습니다')
              e.value=""
            }else if(this.timeInfo[i-1].dateTime==""){
              alert("데이터를 회차순으로 입력하세요.")
              e.value=""
            }else if(i>0 && newTime < oldTime+(showTerm*1000*60)){
              alert("이전 공연이 진행중인 시간은 선택할 수 없습니다.")
              e.value=""
            }else{
                this.timeInfo[i].dateTime = e.value;
            }
          },
            cntTime(e){
                if(e.value.search(/[^0-9]/g)!=-1){
                    alert('숫자(정수)만 입력하세요');
                    e.value="";
                }else{
                  if(this.showCount > e.value){
                    this.timeInfo = this.timeInfo.slice(0,e.value)
                    this.showCount = e.value
                  }else if(this.showCount < e.value){
                    for(let i = this.showCount; i < e.value ;i++){
                      this.timeInfo.push({timeRow:i+1,dateTime:'',dateStatus:''})
                      this.showCount = e.value;
                    }
                  }
                }
            },
            viewDetail(num,showDate){
              axios.get('/moaplace.com/admin/show/schedule/updateView/'+ num + '/'+ showDate).
              then(function(resp){
                this.showNum = resp.data.showNum
                this.showTitle = resp.data.showtitle
                this.runningTime = resp.data.runningTime
                this.intermission = resp.data.intermission
                this.showDate = resp.data.showDate
                this.showStatus = resp.data.showStatus
                this.timeInfo = resp.data.arrTime
                this.showCount = resp.data.arrTime.length
              }.bind(this)).
            catch(function(error){
              if(error.request){
                alert('공연정보를 모두 입력하세요')
              }
            })
          },

            goList(){
              this.$router.push({
                name:'adminShowScheduleList',
                params:{
                  selectField:this.selectField,
                  search:this.search,
                  selectDate:this.selectDate,
                  pageNum:this.pageNum,
                  status:this.status
                }
              })
            },
            goUpdate(){

              axios.post(
                '/moaplace.com/admin/show/schedule/update',
                  JSON.stringify(
                    {
                      showNum:this.$route.params.showNum,
                      showDate:this.showDate,
                      list:this.timeInfo,
                      addList:this.addTimeInfo
                    }),
                {headers:{'Content-Type':'application/json'}}
                ).then(function(resp){
                  resp.data
                  alert('공연정보 수정됨')
                  this.goList()
                }.bind(this)).
                catch(function(error){
                  if(error.request){
                    alert('공연정보 수정을 실패하였습니다.')
                  }
                })
            },
        }

    }
</script>
<style lang="scss" scoped="scoped">
    @import "@/scss/common.scss";
    // --------관리자 페이지 레이아웃 시작--------
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
            // --------관리자 페이지 레이아웃 끝, 버튼박스 시작--------
            .btnUpBox{
              width: 100%;
              display: flex;
              flex-direction: row-reverse;
              button {
                  width: 96px;
                  height: 32px;
                  padding: 4px 0;
                  border: none;
                  margin-bottom:16px;
                  background-color: $black;
                  color:white;
              }
            }

            // --------버튼박스 끝, 타이틀박스 시작 ----------------
            .titleBox {
                width: 100%;
                border: 1px solid rgba($black, 0.5);
                padding: 8px 16px;
                span {
                    border-right: 1px solid rgba($black, 0.5);
                    padding-right: 16px;
                    margin-right: 16px;
                    font-weight: bold;
                }
                input[type=text] {
                    padding: 4px;
                    margin-right: 16px;
                    border: none;
                    width: 56px;
                    &:focus{
                      outline: none;
                    }
                    &:nth-child(4) {
                        width: calc(100%/1.4);
                    }
                }
            }
            // --------타이틀박스 끝, 공연정보테이블 시작--------
            
            // --------타임박스 끝, 공연정보 시작--------
            .hallInfo {
                margin: 32px 0;
                h3 {
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                div {
                    border-top: 1px solid $black;
                    padding-top: 16px;
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        border-top: 1px solid rgba($black,0.3);
                        border-width: 1px 0;
                        table-layout: fixed;
                        tr {
                            td,
                            th {
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                            }
                            th {
                                width: 15%;
                                background: #eee;
                                text-align: center;
                            }

                        }
                    }
                }
            }
            // --------공연정보 끝, 일정정보 시작--------
            .hallInfo {
                margin: 32px 0;
                h3 {
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                div {
                    border-top: 1px solid $black;
                    padding-top: 16px;
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        border-top: 1px solid rgba($black,0.3);
                        border-width: 1px 0;
                        table-layout: fixed;

                        tr {
                            td,
                            th {
                                padding: 8px 16px;
                                border-bottom: 1px solid rgba($black, 0.3);
                                > button{
                                  padding: 0 56px;
                                  text-align: center;
                                  border:1px solid rgba($black, 0.2);
                                  background: rgb(250, 250, 250);
                                  border-radius: 3px;
                                }
                            }
                            th {
                                width: 15%;
                                background: #eee;
                                text-align: center;
                            }
                        }
                    }
                }
            }
            // --------이미지 끝, 버튼 영역 시작--------
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