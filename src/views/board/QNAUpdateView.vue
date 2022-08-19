<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="1:1문의"/>

    <div class="app">

    <h2 class="title">1:1문의</h2>
    <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>

      <div class="info">
          <p> <img src='../../assets/board/info.png'> 작성시 주의사항 </p>
          <ul>
              <li><strong style="color:#D67747">자주묻는질문(FAQ)을 먼저 확인하시면 보다 빠르게 궁금한 점을 해결할 수 있습니다. </strong></li>
              <li> 욕설이나 비방, 음란, 광고 등 1:1문의 게시판 의도와 맞지 않는 내용은 별도 안내 없이 삭제되어 공개되지 않습니다. </li>
              <li> 개인정보보호를 위하여 고객님의 주민등록번호 등의 개인정보 기재는 삼가주시기 바랍니다. </li>
          </ul>
      </div>

      <hr class="line">

      <form>
      <div class="forms">

        <div class="headerBox">
          <div class="sortBox">
            <label>문의구분</label><br>
            <select>
              <option value=""> 분류 선택 </option>  
              <option name="qna_sort" value="공연">공연 문의</option>
              <option name="qna_sort" value="대관">대관 문의</option>
              <option name="qna_sort" value="예매">예매 문의</option>
              <option name="qna_sort" value="관람">관람 문의</option>
              <option name="qna_sort" value="회원">회원 문의</option>
              <option name="qna_sort" value="기타">기타 문의</option>
            </select>
          </div>

          <div class="nameBox">
            <label>작성자</label><br>
            <input type="text" name="name" value="홍길동">
          </div>
        </div>

        <div class="titleBox">
          <label>제목</label>
          <input type="text" name="" value="예매관련 문의입니다"><br>
        </div>
        
        <div class="contentBox">
          <label>내용</label>
          <textarea>예매 관련 문의입니다.&#10;예매자 이름 홍길동입니다.&#10;답변 부탁드립니다.</textarea>
        </div>

        <div class="btnGroup">
          <button type="submit" @click.prevent="">수정하기</button>
          <button @click="$router.push({name:'boardMain'})"> 이전으로 </button>
        </div>
      
      </div>
      </form>
    </div>
      
    <AppFooter/>
  </div>

</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.app {
  width: $width;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  color: $black;
  padding-top: 50px;
  margin: auto;

  h2.title{
    font-size: 32px;
    text-align: center;
    margin-top: 32px;
    & + p{
      text-align: center;
      margin-bottom: 64px;
    }
  }

  .info {
    width: 100%;
    color: #333333d4;
    border: 1px solid #33333330;

    p {
    font-weight: bold;
    padding: 15px 0 0 20px;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  
  .line {
    width: 100%;
    border: 2px solid $brown;
    margin: 32px;
  }

  .forms {
    width:1100px;
    margin-bottom: 50px;

    label {
      padding: 24px 0 8px 0;
    }

    .headerBox{
      display:flex;
      justify-content: space-between;

      .sortBox{
        width: 28%;

        select {
          width:100%;
          height: 40px;
          border: 1px solid lightgray; 
          padding-left:16px;
        }
      }

      .nameBox {
        width:70%;
        input {
          width: 100%;
          padding: 16px;
        }
      }
    }

    input {
      width: 100%;
      height: 40px;
      border: 1px solid lightgray;
      padding: 16px;
    }

    textarea {
      width: 100%;
      height: 300px;
      border: 1px solid lightgray;
      padding: 16px;
    }

    .btnGroup{
      display: flex;
      justify-content: center;
      margin: 16px 0 40px 0;

      button {
        padding: 16px 40px;
        margin: 2px;

        &:nth-child(1){
          background-color: $brown;
          border: 1px solid transparent;
          color:white;
        }
        &:nth-child(2){
          border: 1px solid $black;
          background-color: white;
          color:$black;
        }
      }
    }
  }  
}
</style>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
    components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    calcDate: function() {
      let year = this.date.getFullYear();
      let month = this.date.getMonth()+1;
      let dt = this.date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return year +'-'+ month +'-'+ dt;
    }
  }
}
</script>