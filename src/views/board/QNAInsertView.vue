<template>
  <div class="app">
    <p class="info"> 모아플레이스에 바라는 사항이나 불편한 사항, 궁금증을 올려주시면 성심성의껏 대답해 드리겠습니다. <br>
    <strong style="color:#D67747">자주묻는질문(FAQ)을 먼저 확인하시면 보다 빠르게 궁금한 점을 해결할 수 있습니다. </strong></p>

    <div class="info2">
        <p> <img src='../../assets/board/info.png'> 작성시 주의사항 </p>
        <ul>
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
          <input type="text" name="name" placeholder="문의자 이름">
        </div>
      </div>

      <div class="titleBox">
        <label>제목</label>
        <input type="text" name="" placeholder="문의글 제목"><br>
      </div>
      
      <div class="contentBox">
        <label>내용</label>
        <textarea placeholder="문의하실 내용을 작성해주세요."></textarea>
      </div>

      <div class="btnGroup">
        <button type="submit" class="insert" @click.prevent="">문의글 등록</button>
        <button class="cancle" @click="$router.push({name:'boardMain'})"> 취소 </button>
      </div>
    
    </div>
    </form>

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

  .info {
    margin: 40px;
    text-align: center;
    color: #333333d4;
  }

  .info2 {
    width: 100%;
    color: #333333d4;
    border: 1px solid #33333330;
    margin: 20px;

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
    margin: 25px;
  }

  .forms {
    width:1100px;
    margin-bottom: 50px;

    label {
      padding-top: 20px;
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
        }
      }

      .nameBox {
        width:70%;
        input {
          width: 100%;
        }
      }
    }

    input {
      width: 100%;
      height: 40px;
      border: 1px solid lightgray;
    }

    textarea {
      width: 100%;
      height: 300px;
      border: 1px solid lightgray;
    }

    .btnGroup{
      display: flex;
      justify-content: flex-end;

      .insert {
        width:160px;
        height:50px;
        margin: 3px;
        border: none;
        background-color: $brown;
        color:white;
        transition: all 0.3s;

        &:hover {
          border: 1px solid $brown;
          background-color: white;
          color:$brown;
        }
      }

      .cancle {
        width:100px;
        height:50px;
        margin: 3px;
        border: 1px solid $brown;
        background-color: white;
        color:$brown;
        transition: all 0.3s;

        &:hover {
          background-color:$brown;
          color:white;
        }
      }
    }
  }  
}
</style>

<script>
export default{
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
