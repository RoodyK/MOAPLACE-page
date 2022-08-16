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
              <td colspan="5">
                <label><input type="radio" name="hallName" value="MHall">모던홀</label>
                <label><input type="radio" name="hallName" value="OHall">오케스트라홀</label>
                <label><input type="radio" name="hallName" value="AHall">아트홀</label>
              </td>
            </tr>
            <tr>
              <th>장르</th>
              <td colspan="5">
                <label><input type="radio" name="genre" value="drama">연극</label>
                <label><input type="radio" name="genre" value="musical">뮤지컬</label>
                <label><input type="radio" name="genre" value="pop">대중음악</label>
                <label><input type="radio" name="genre" value="instrumental">기악</label>
                <label><input type="radio" name="genre" value="vocal">성악</label>
                <label><input type="radio" name="genre" value="dance">무용</label>
                <label><input type="radio" name="genre" value="opera">오페라</label>
              </td>
            </tr>
            <tr>
              <th>공연명</th>
              <td colspan="5"><input type="text"></td>
            </tr>
            <tr>
              <th>공연날짜</th>
              <td><input type="date" v-model="showDate"></td>

            </tr>
            <tr>
              <th>공연시작일</th>
              <td><input type="date" v-model="regdate"></td>
            </tr>
            <tr>
              <th>공연종료일</th>
              <td><input type="date" v-model="appdate"></td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td colspan="2">
                <select v-model="gValue" @change="go">
                  <option v-for="(g,index) in grade" :key="index" :value="g.value">{{g.text}}</option>
                </select>
                </td>
            </tr>
            <tr>
              <th>섬네일</th>
              <td colspan="5">
                <img :src="thumb">
                <input type="file">
              </td>
            </tr>
            <tr>
              <th>상세이미지</th>
              <td colspan="5">
                <img :src="detailImgs.src1">
                <input type="file">
              </td>
            </tr>
          </table>
        </div>
        <div class="btnBox">
          <button>취소</button>
          <button>등록</button>
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
          going:true,
          hideRow:'',
          gValue:'all',
          grade:[
            {text:'전체관람가',value:'all'},
            {text:'12세 관람가',value:'twelve'},
            {text:'15세 관람가',value:'fifteen'},
            {text:'청소년 관람불가',value:'adult'},
          ],
          showDate:new Date().toISOString().substr(0, 10),
          regdate: '',
          appdate: '',
          thumb:'',
          detailImgs:{
            src1:''
          },
        }
      },
      methods:{
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
                        border: 1px solid gainsboro;
                      }
                      img{
                        width: calc(80%/1);
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