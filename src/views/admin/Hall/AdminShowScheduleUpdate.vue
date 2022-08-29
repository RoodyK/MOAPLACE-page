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
                <input type="radio" name="hallName" value="MHall" id="MHall" v-model="hallName"><label for="MHall">모던홀</label>
                <input type="radio" name="hallName" value="OHall" id="OHall" v-model="hallName"><label for="OHall">오케스트라홀</label>
                <input type="radio" name="hallName" value="AHall" id="Ahall" v-model="hallName"><label for="AHall">아트홀</label>
              </td>
            </tr>
            <tr>
              <th>장르</th>
              <td colspan="5">
                <input type="radio" name="genre" v-model="genre" id="drama" value="drama"><label for="drama">연극</label>
                <input type="radio" name="genre" v-model="genre" id="musical" value="musical"><label for="musical">뮤지컬</label>
                <input type="radio" name="genre" v-model="genre" id="pop" value="pop"><label for="pop">대중음악</label>
                <input type="radio" name="genre" v-model="genre" id="instrumental" value="instrumental"><label for="instrumental">기악</label>
                <input type="radio" name="genre" v-model="genre" id="vocal" value="vocal"><label for="vocal">성악</label>
                <input type="radio" name="genre" v-model="genre" id="dance" value="dance"><label for="dance">무용</label>
                <input type="radio" name="genre" v-model="genre" id="opera" value="opera"><label for="opera">오페라</label>
              </td>
            </tr>
            <tr>
              <th>공연명</th>
              <td colspan="5"><input type="text" v-model="title"></td>
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
            <tr v-html="hideRow">
            </tr>
            <tr>
              <th>공연날짜</th>
              <td><input type="date" v-model="showDate"></td>
              <th>공연시작일</th>
              <td><input type="date" v-model="regdate"></td>
              <th>공연종료일</th>
              <td><input type="date" v-model="appdate"></td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td colspan="5">
                <select v-model="gValue" @change="go">
                  <option v-for="(g,index) in grade" :key="index" :value="g.value">{{g.text}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>섬네일</th>
              <td colspan="5">
                <input type="file">
                <img :src="thumb">
              </td>
            </tr>
            <tr>
              <th>상세이미지</th>
              <td colspan="5">
                <input type="file">
                <img :src="detailImgs.src1">
              </td>
            </tr>
          </table>
        </div>
        <div class="btnBox">
          <button>취소</button>
          <button>수정 완료</button>
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
      data(){
        return{
          hallName:'MHall',
          genre:'drama',
          title:'오보에 리사이틀',
          going:true,
          hideRow:'',
          yn:'공연 진행중',
          pauseStart:'',
          pauseEnd:'',
          showDate:'',
          regdate: '',
          appdate: '',
          seats:'',
          gValue:'all',
          grade:[
            {text:'전체관람가',value:'all'},
            {text:'12세 관람가',value:'twelve'},
            {text:'15세 관람가',value:'fifteen'},
            {text:'청소년 관람불가',value:'adult'},
          ],
          thumb:'https://www.sejongpac.or.kr/cmmn/file/imageSrc.do?fileStreCours=faec0c25744c22e99776405c0fa72802c8777c70061f67507e3bee4a2a5844e9&streFileNm=dfd67de4f3055521c7f754bfdc3cb5896db30ab9edb0bb8e4f449a9903cb06fb',
          detailImgs:{
            src1:'https://www.sejongpac.or.kr/upload/2022/07/20220727_163335690_30277.jpg'
          },
          
        }
      },
      methods:{
        yOrN(){
          if(this.going){
            this.yn='공연 진행중'
            this.hideRow=''
          }else{
            this.yn='공연 중단'
            this.hideRow='<th>공연중단시작일</th><td colspan="2"><input type="date" v-model="pauseStart"></td><th>공연중단종료일</th><td colspan="2"><input type="date"v-model="pauseEnd"></td>'
          }
        },
        datepic(){
          alert(this.regdate)
        }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/scss/common.scss";
  // --------관리자 페이지 레이아웃 시작--------
    #wrap::v-deep {
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
                      input[type=text] {
                        border:1px solid gainsboro;
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
                        }
                        &:focus{
                          border-color:gainsboro;
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