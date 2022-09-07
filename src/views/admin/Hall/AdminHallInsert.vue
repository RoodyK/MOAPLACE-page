<template>
  <div id="wrap">
    <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">공연정보 - 공연등록</h2>

        <div class="showInsert">
          <table>
            <tr>
              <th>공연장</th>
              <td colspan="3">
                <label><input type="radio" name="hallName" v-model="hall" value="1">모던홀</label>
                <label><input type="radio" name="hallName" v-model="hall" value="2">오케스트라홀</label>
                <label><input type="radio" name="hallName" v-model="hall" value="3">아트홀</label>
              </td>
            </tr>
            <tr>
              <th>장르</th>
              <td colspan="3">
                <label><input type="radio" name="genre" v-model="genre" value="1">연극</label>
                <label><input type="radio" name="genre" v-model="genre" value="2">뮤지컬</label>
                <label><input type="radio" name="genre" v-model="genre" value="3">대중음악</label>
                <label><input type="radio" name="genre" v-model="genre" value="4">기악</label>
                <label><input type="radio" name="genre" v-model="genre" value="5">성악</label>
                <label><input type="radio" name="genre" v-model="genre" value="6">무용</label>
                <label><input type="radio" name="genre" v-model="genre" value="7">오페라</label>
              </td>
            </tr>
            <tr>
              <th>공연명</th>
              <td colspan="3"><input type="text" v-model="title" placeholder="공연 제목을 입력하세요."></td>
            </tr>
            <tr>
              <th>공연시작일</th>
              <td colspan="3">
                <input type="date" v-model="regdate" @change="addStartDate">
                </td>
            </tr>
            <tr>
              <th>공연종료일</th>
              <td colspan="3">
                <input type="date" v-model="appdate" @change="addEndDate">
                </td>
            </tr>
            <tr>
              <th>러닝타임</th>
              <td><input type="text" v-model="runningTime" maxlength="3" class="rntime">
              <p class="unitP">분</p></td>
              <th>인터미션</th>
              <td><input type="text" v-model="intermission" maxlength="3" class="rntime"><p class="unitP">분</p></td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td>
                <select v-model="gValue">
                  <option v-for="(g,index) in grade" :key="index" :value="g.value">{{g.text}}</option>
                </select>
              </td>
              <th>공연여부</th>
              <td>
                <select v-model="yornValue">
                  <option v-for="(item,index) in yorn" :key="index" :value="item.value">{{item.text}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>R석 가격</th>
              <td colspan="3">
                <input type="text" maxlength="10" class="seatPrice" @keyup="seatRPrice($event.currentTarget)">
                <p class="unitP">원</p>
              </td>
            </tr>
            <tr>
              <th>S석 가격</th>
              <td colspan="3">
                <input type="text" maxlength="10" class="seatPrice" @keyup="seatSPrice($event.currentTarget)">
                <p class="unitP">원</p>
              </td>
            </tr>
            <tr>
              <th>A석 가격</th>
              <td colspan="3">
                <input type="text" maxlength="10" class="seatPrice" @keyup="seatAPrice($event.currentTarget)">
                <p class="unitP">원</p>
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
                <img v-for="(item,index) in detailImgs" :key="index" :src="item">
              </td>
            </tr>
          </table>
        </div>
        <div class="btnBox">
          <button @click="goList">
            취소</button>
          <button @click="postInsert(
            this.pageNum,
            this.status,
            this.field,
            this.search)">
            등록</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import SideMenu from '@/components/admin/SideMenu.vue';
  import axios from '@/axios/axios.js';
    export default {
      components: {
        SideMenu
      },
      data(){
        return{
          hall:1,
          genre:1,
          title:'',
          regdate: new Date().toISOString().substr(0, 10),
          appdate: '',
          runningTime:'',
          intermission:'',
          gValue:'전체관람가',
          grade:[
            {text:'전체관람가',value:'전체관람가'},
            {text:'12세 관람가',value:'12세 관람가'},
            {text:'15세 관람가',value:'15세 관람가'},
            {text:'청소년 관람불가',value:'청소년관람불가'},
          ],
          yornValue:'Y',
          rPrice:'',
          sPrice:'',
          aPrice:'',
          yorn:[{text:'진행중',value:'Y'},{text:'상연중지',value:'N'}],
          thumb:'',
          detailImgs:[],
          selectField: this.$route.params.field,
          search: this.$route.params.search,
          pageNum: this.$route.params.pageNum,
          status: this.$route.params.status
        }
      },

      filters:{
        comma(val){
          return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },

      watch:{
        runningTime(newV,oldV){

          if(newV.search(/[^0-9]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.runningTime=oldV;
          }
        },
        intermission(newV,oldV){

          if(newV.search(/[^0-9]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            this.intermission=oldV;
          }
        }
      },
      methods:{

        thumbGo(e){
          let fr = new FileReader();

          fr.readAsDataURL(e.files[0]); //readAsDataURL(파일/blob객체) -> 해당 파일이나 blob객체를 읽어오고, 읽기가 종료되면 readystate가 done(완료)되면서 loadend이벤트가 트리거되고 base64인코딩된 스트링 데이터가 result속성(attribute)에 담김. 
          fr.addEventListener('load',()=>{this.thumb=fr.result},false) //위와 같은 이유로 해당 FileReader객체에 load이벤트가 발생했을 때 .result 속성을 가져와 변수에 담으면 인코딩된 스트링데이터가 변수에 담기는 것임
          //console.log(this.thumb) //왜 스트링 데이터인데 로그로는 나오지 않을까? -> 이벤트리스너로 발생한 이벤트객체를 타겟으로 출력했어야 함! 

        },

        detailGo(e){
          this.detailImgs.splice(0);
          for(let i = 0; i < e.files.length ; i++){

            let fr = new FileReader();
            
            fr.readAsDataURL(e.files[i]);
            fr.addEventListener('load',()=>{this.detailImgs.push(fr.result)},false);
          }
        },

        postInsert(){
          if(this.rprice == '' || this.sPrice == '' || this.aPrice == '' || this.detailImgs.length == 0){
            alert('공연정보를 모두 입력하세요')
          }else{
            axios.post(
            '/moaplace.com/admin/show/insert',
              JSON.stringify(
                {
                  genre_num:this.genre,
                  hall_num:this.hall,
                  show_name:this.title,
                  show_start:this.regdate,
                  show_end:this.appdate,
                  show_check:this.yornValue,
                  show_age:this.gValue,
                  intermission:this.intermission,
                  running_time:this.runningTime,
                  show_thumbnail:this.thumb,
                  show_detail_img:this.detailImgs,
                  rprice: this.rPrice.replace(/(,)/g,""),
                  sprice: this.sPrice.replace(/(,)/g,""),
                  aprice: this.aPrice.replace(/(,)/g,""),
                  pageNum:this.pageNum,
                  status:this.status,
                  field:this.selectField,
                  search:this.search
                }),
            {
              headers:{'Content-Type':'application/json'},
            }
            ).then(function(resp){
              if(resp.data.result==true){
                alert('공연정보 등록됨')
                this.status = resp.data.status;
                this.selectField = resp.data.selectField;
                this.search = resp.data.search;
                this.pageNum = resp.data.pageNum;
                this.goList()
              }else{
                alert('공연정보 등록 실패')
              }

            }.bind(this)).
            catch(function(error){
              if(error.response){
                alert('공연정보를 모두 입력하세요')
              }
            })
          }
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
        },
        addStartDate(){
          if(this.regdate < new Date().toISOString().substr(0, 10)){
            alert("공연시작일은 현재 날짜보다 앞으로 설정할 수 없습니다.")
            this.regdate=new Date().toISOString().substr(0, 10)
          }
        },
        addEndDate(){
          if(this.appdate < this.regdate){
            alert("공연종료일은 공연시작일보다 뒤의 날짜여야 합니다.")
            this.appdate=''
          }

        },
        seatRPrice(e){

          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            e.value = e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value=e.value.replace(/(,)/g,"");
            e.value=e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.rPrice = e.value.replace(/(,)/g,"")
          }
        },
        seatSPrice(e){
          
          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            e.value = e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value = e.value.replace(/(,)/g,"");
            e.value = e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.sPrice = e.value.replace(/(,)/g,"")
          }
        },
        seatAPrice(e){
          
          if(e.value.search(/[^0-9(,)]/g)!=-1){
            alert('숫자(정수)만 입력하세요');
            e.value = e.value.replace(/[^0-9(,)]/g,"");
          }else{
            e.value=e.value.replace(/(,)/g,"");
            e.value=e.value.replace(/\B(?=(\d{3})+(?!\d))/g,",");
            this.aPrice = e.value.replace(/(,)/g,"")
          }
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
                    input[type=radio] {
                      padding: 4px;
                      margin-right: 16px;
                      border: none;
                      }
                      .rntime{
                          width:56px;
                          text-align: right;
                          padding-right: 8px;
                        }
                      .seatPrice{
                        width:104px;
                        text-align: right;
                        padding-right: 8px;
                      }
                      input[type=text] {
                        border: 1px solid gainsboro;
                        
                      }
                      img{
                        width: 240px;
                        display: block;
                        margin-top:8px;
                      }
                      .unitP{
                        display: inline;
                        margin-left: 8px;
                      }
                    }
                    &:nth-child(3){
                      input[type=text] {
                        width:100%;
                      }
                    }
                    &:nth-child(7){
                      input[type=text] {
                        width:150px;
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