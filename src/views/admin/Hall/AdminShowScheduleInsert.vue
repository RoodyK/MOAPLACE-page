<template>
  <div id="wrap">
    <SideMenu largeCategory="공연관리" mediumCategory="공연정보"/>
    <main id="main">
      <div class="inner">
        <h2 class="title">일정정보 - 일정등록</h2>

        <div class="showInsert">
          <table>
            <tr>
              <th>공연검색</th>
              <td colspan="3"><input type="text"><button>검색</button></td>
            </tr>
            <tr>
              <th>공연번호</th>
              <td colspan="1">{{show_num}}</td>
              <th>공연명</th>
              <td colspan="1">{{title}}</td>
            </tr>
            <tr>
              <th>공연시작일</th>
              <td >{{startDate}}</td>
              <th>공연종료일</th>
              <td>{{endDate}}</td>
            </tr>
            <tr>
              <th>상연등급</th>
              <td>{{grade}}</td>
              <th>공연상태</th>
              <td>{{check}}</td>
            </tr>
            <tr>
              <th>공연날짜</th>
              <td><input type="date" v-model="showDate"></td>
              <th>공연횟수</th>
              <td><input type="text" v-model.number="showCount">회</td>
            </tr>
             <tr v-for="(item,index) in showCnt" :key="index">
              <th>{{item}}회차</th>
              <td colspan="3"><input type="time" @change="addTime($event.currentTarget)"></td>
            </tr>
            <tr>
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
          title:'',
          startDate: '',
          endDate: '',
          showDate:'',
          showCount:'',
          showCnt:[],
          showTime:[],
          grade:'',
          check:'',
          detailImgs:{
            src1:''
          },
        }
      },
      watch:{
        showCount:function(newCnt){
          this.showCnt.splice(0);
          if(newCnt>0){
            for(let i=1;i<=newCnt;i++){
              this.showCnt.push(i)
            }
          }
        }
      },
      methods:{
        addTime(e){
          this.showTime.push(e.value)
        }
        //  postInsert(){
        //   axios.post('admin/show/insertController')
        // }
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