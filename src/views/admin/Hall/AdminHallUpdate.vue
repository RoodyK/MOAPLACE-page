<template>
  <div id="wrap">
    <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">공연정보 - 공연수정</h2>

        <div class="showInsert">
          <table>
            <tr>
              <th>공연장</th>
              <td colspan="5">
                <div v-for="(item,index) in hallList" :key="index" class = "radioDiv">
                  <input type="radio" :value="item.value" v-model="hall" :id="item.id">
                  <label :for="item.id">{{item.value}}</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>장르</th>
              <td colspan="5">
                <div v-for="(item,index) in genreList" :key="index" class = "radioDiv">
                  <input type="radio" v-model="genre" :value="item.value" :id="item.id" @change="datepic">
                  <label :for="item.id">{{item.value}}</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>공연명</th>
              <td colspan="5"><input type="text" v-model="title"></td>
            </tr>
            <tr>
              <th>R석 가격</th>
              <td>
                <input type="text" v-model="rprice" maxlength="10" class="seatPrice" @keyup="seatRPrice($event.currentTarget)">
                <p class="unitP">원</p>
              </td>
              <th>S석 가격</th>
              <td>
                <input type="text" v-model="sprice" maxlength="10" class="seatPrice" @keyup="seatSPrice($event.currentTarget)">
                <p class="unitP">원</p>
              </td>
              <th>A석 가격</th>
              <td>
                <input type="text" v-model="aprice" maxlength="10" class="seatPrice" @keyup="seatAPrice($event.currentTarget)">
                <p class="unitP">원</p>
              </td>
            </tr>
            <tr>
              <th>공연상태</th>
              <td colspan="5">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="going" @change="yOrN">
                  <label class="form-check-label" for="flexSwitchCheckChecked">{{yn}}</label>
                </div>
              </td>
            </tr>
            <tr v-for="(item,index) in ynHideRow" :key="index">
              <th>{{item.start}}</th>
              <td colspan="2">
                <input type="date" v-model="pauseStart" @change="pauseStartTest">
              </td>
              <th>{{item.end}}</th>
              <td colspan="2">
                <input type="date" v-model="pauseEnd" @change="pauseEndTest">
              </td>
            </tr>
            <tr>
              <th>공연시작일</th>
              <td colspan="2"><input type="date" v-model="regdate" @click="regdateTest"></td>
              <th>공연종료일</th>
              <td colspan="2"><input type="date" v-model="appdate" @click="appdateTest"></td>
            </tr>
              <tr>
              <th>러닝타임</th>
              <td colspan="2"><input type="text" v-model="runningTime" maxlength="3" class="rntime" @keyup="rnTime($event.currentTarget)">
              <p class="unitP">분</p></td>
              <th>인터미션</th>
              <td colspan="2"><input type="text" v-model="intermission" maxlength="3" class="rntime" @keyup="intTime($event.currentTarget)">
              <p class="unitP">분</p></td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td colspan="5">
                <select v-model="gValue">
                  <option v-for="(g,index) in grade" :key="index" :value="g.value">{{g.text}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>섬네일</th>
              <td colspan="5">
                <input type="file" @change="thumbGo($event.currentTarget)">
                <img :src="thumb">
              </td>
            </tr>
            <tr>
              <th>상세이미지</th>
              <td colspan="5">
                <input type="file" multiple="multiple" @change="detailGo($event.currentTarget)">
                <img v-for="(item, index) in detailImgs" :key="index" :src="item">
              </td>
            </tr>
          </table>
        </div>
        <div class="btnBox">
          <button @click="goList">취소</button>
          <button @click="goUpdate">수정 완료</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import SideMenu from '@/components/admin/SideMenu.vue'
  import axios from '@/axios/axios.js'
    export default {
      components: {
        SideMenu
      },
      data(){
        return{
          showNum:'',
          hall:'',
          genre:'',
          title:'',
          rprice:'',
          sprice:'',
          aprice:'',
          going:true,
          yn:'',
          ynHideRow:[],
          pauseStart:'',
          pauseEnd:'',
          regdate: '',
          appdate: '',
          gValue:'',
          runningTime:'',
          intermission:'',
          thumb:'',
          detailImgs:[],
          hallList:[
            { id: 'MHall', value:'모던홀'},
            { id: 'OHall', value:'오케스트라홀'},
            { id: 'AHall', value:'아트홀'},
          ],
          genreList:[
            { id: 'drama', value: '연극'},
            { id: 'musical', value: '뮤지컬'},
            { id: 'pop', value: '대중음악'},
            { id: 'instrumental', value: '기악'},
            { id: 'vocal', value: '성악'},
            { id: 'opera', value: '오페라'},
            { id: 'dance', value: '무용'},
          ],
          grade:[
            {text:'전체관람가',value:'전체관람가'},
            {text:'12세 관람가',value:'12세 관람가'},
            {text:'15세 관람가',value:'15세 관람가'},
            {text:'청소년 관람불가',value:'청소년관람불가'},
          ],
          selectField: this.$route.params.field,
          search: this.$route.params.search,
          pageNum: this.$route.params.pageNum,
          status: this.$route.params.status
        }
      },
      mounted(){
        this.viewDetail(
          this.$route.params.showNum);
      },
      watch:{
        regdate(newV,oldV){
          if(newV > this.appdate){
            alert("공연종료일 이후의 날짜로 설정할 수 없습니다.")
            this.appdate = oldV
          }
        },
        appdateTest(newV,oldV){
          if(newV < this.regdate){
            alert("공연시작일보다 앞선 날짜로 설정할 수 없습니다.")
            this.appdate = oldV
          }
        },
      },
      methods:{
        yOrN(){
          if(this.going==true){
            this.yn='공연 진행중'
            this.ynHideRow=[]
          }else if(this.going==false){
            this.yn='공연 종료'
            this.ynHideRow.push({start:'공연중단시작일',end:'공연중단종료일'});
          }
        },
        thumbGo(e){
          let fr = new FileReader();

          fr.readAsDataURL(e.files[0]); 
          fr.addEventListener('load',()=>{this.thumb=fr.result},false) 
          
        },
        detailGo(e){
          this.detailImgs.splice(0);
          for(let i = 0; i < e.files.length ; i++){

            let fr = new FileReader();
            
            fr.readAsDataURL(e.files[i]);
            fr.addEventListener('load',()=>{this.detailImgs.push(fr.result)},false);
          }
        },
        pauseStartTest(){
          if(this.pauseStart < this.regdate){
            alert("공연시작일보다 앞선 날짜로 설정할 수 없습니다.")
            this.pauseStart = ''
          }
        },
        pauseEndTest(){
          if(this.pauseEnd < this.pauseStart){
            alert("중단시작일보다 앞선 날짜로 설정할 수 없습니다.")
            this.pauseEnd = ''
          }
        },
        rnTime(e){

          if(e.value.search(/[^0-9]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.runningTime=e.value.replace(/[^0-9]/g,"");
          }
        },
        intTime(e){

          if(e.value.search(/[^0-9]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.intermission=e.value.replace(/[^0-9]/g,"");
          }
        },

        seatRPrice(e){

          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.rprice=e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value=e.value.replace(/(,)/g,"");
            e.value=e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.rprice=e.value
          }
        },
        seatSPrice(e){
          
          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.sprice=e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value=e.value.replace(/(,)/g,"");
            e.value=e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.sprice=e.value
          }
        },
        seatAPrice(e){
          
          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.aprice=e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value=e.value.replace(/(,)/g,"");
            e.value=e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.aprice=e.value
          }
        },
        viewDetail(num){
                      
          axios.get('/moaplace.com/admin/show/detail/'+ num + '/' + this.pageNum + '/' + this.status + '/' + this.selectField + '/' + this.search).
            then(function(resp){
                this.showNum = resp.data.list.num;
                this.hall = resp.data.list.hall;
                this.genre = resp.data.list.genre;
                this.title = resp.data.list.title;
                this.going = resp.data.list.status=='Y'?true:false;
                this.yn = resp.data.list.status=='Y'?'공연 진행중':'공연 종료';
                this.pauseStart= resp.data.list.blockStartDate;
                this.pauseEnd = resp.data.list.blockEndDate
                this.regdate = resp.data.list.startDate;
                this.appdate = resp.data.list.endDate;
                this.intermission = resp.data.list.intermission;
                this.runningTime = resp.data.list.runningTime;
                this.gValue = resp.data.list.age;
                this.thumb = resp.data.list.thumbnail;
                this.detailImgs = resp.data.list.detailImgs;
                this.rprice=resp.data.list.rprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.sprice=resp.data.list.sprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.aprice=resp.data.list.aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.yOrN();
            }.bind(this));
          },

        goUpdate(){

          axios.post(
            '/moaplace.com/admin/show/update',
              JSON.stringify(
                {
                  showNum:this.$route.params.showNum,
                  hall:this.hall,
                  genre:this.genre,
                  title:this.title,
                  rprice: this.rprice.replace(/(,)/g,""),
                  sprice: this.sprice.replace(/(,)/g,""),
                  aprice: this.aprice.replace(/(,)/g,""),
                  going:this.going==true?'Y':'N',
                  pauseStart:this.pauseStart,
                  pauseEnd:this.pauseEnd,
                  startDate:this.regdate,
                  endDate:this.appdate,
                  showAge:this.gValue,
                  intermission:this.intermission,
                  runningTime:this.runningTime,
                  showThumbnail:this.thumb,
                  imgDetails:this.detailImgs,
                }),
            {
              headers:{'Content-Type':'application/json'},
            }
            ).then(function(resp){
              if(resp.data.result==true){
                alert('공연정보 수정됨')
                this.status = 'all'
                this.selectField = 'title'
                this.search = ''
                this.pageNum = 1
                this.goList()
              }else{
                alert('공연정보 수정 실패')
              }

            }.bind(this)).
            catch(function(error){
              if(error.response){
                alert('공연정보를 모두 입력하세요')
              }
            })
        },

          goList(){
            this.$router.push({
              name:'adminHallInfoList',
              params:{
                selectField:this.selectField,
                search:this.search,
                pageNum:this.pageNum,
                status:this.status
              }
            })
          }
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
              table {
                border-collapse: collapse;
                width: 100%;
                border-top: 1px solid rgba($black,0.3);
                border-width: 1px 0;
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
                  td{
                     >&:nth-child(2){
                      width:18%;
                    }
                    >&:nth-child(4){
                      width:18%;
                    }
                    >&:nth-child(6){
                      width:18%;
                    }
                    .radioDiv{
                      display: inline;
                    }
                    .seatPrice{
                      width:104px;
                      text-align: right;
                      padding-right: 8px;
                    }
                    .rntime{
                          width:56px;
                          text-align: right;
                          padding-right: 8px;
                    }
                    .unitP{
                      display: inline;
                      margin-left: 8px;
                    }                   
                    input[type=radio] {
                      padding: 4px;
                      margin-right: 16px;
                      border: none;
                      }
                      input[type=text] {
                        border:1px solid rgba($black, 0.3);
                        padding: 8px;
                      }
                      input[type=file] {
                        margin-bottom: 8px;
                      }
                      input[type=date] {
                        padding: 8px;
                      }
                      img{
                        width: calc(80%/1);
                      }
                      select{
                        padding: 8px;
                      }
                      .form-check-input{
                        padding: 11px;
                        width: 44px;
                        margin-top: 9px;

                        &:checked{
                          background-color: $black;
                          border-color: $black;
                        }
                        &:focus{
                          border-color: #eee;
                          box-shadow: 0 0 0 0.25rem rgb(156 156 156 / 25%);
                          background-image:url("@/store/circle.svg")
                        }
                      }
                      .form-check-label{
                        padding: 8px;
                      }
                    }
                    &:nth-child(3){
                      input[type=text] {
                        width:100%
                      }
                    &:nth-child(7){
                      input[type=text] {
                        width:150px;
                      }
                    }
                  }
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
