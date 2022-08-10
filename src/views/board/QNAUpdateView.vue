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

    <div class="forms">
    <form>
      <div class="item">
      문의구분
      <select>
        <option value=""> 분류 선택 </option>  
        <option name="qna_sort" value="공연">공연</option>
        <option name="qna_sort" value="대관">대관</option>
        <option name="qna_sort" value="예매">예매</option>
        <option name="qna_sort" value="관람">관람</option>
        <option name="qna_sort" value="회원">회원</option>
        <option name="qna_sort" value="기타">기타</option>
      </select>

      문의자
      <input type="text" name="name" value="홍길동">

      문의일
      <input type="text" name="regdate" value="2022-08-10" readonly="readonly"><br>
      </div>

      <hr class="line2">

      제목<br>
      <input type="text" name="" value="예매 관련 문의사항"><br>

      <hr class="line2">
      
      내용<br>
      <textarea>예매 관련 문의입니다.&#10;예매자 이름 홍길동입니다.&#10;답변 부탁드립니다. </textarea><br>

      <div class="btnGroup">
      <button type="submit" class="insert" @click.prevent="">수정하기</button>
      <button class="cancle" @click="$router.push({name:'qnaList'})"> 취소 </button>
      </div>
    
    </form>
    </div>
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
  padding: 80px;
  color: $black;
  margin: auto;

  .info {
    margin: 30px;
    text-align: center;
  }

  .info2 {
    width: 100%;
    border: 1px solid lightgray;
    margin: 10px;

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
    margin: 30px;
  }

  .line2 {
    color: white; 
    margin: 15px;  
  }

  .forms {
    align-items: center;
    justify-content: center;
    width: 100%;

    .item{
      select {
        width: 230px;
        height: 40px;
        border: 1px solid lightgray;
      }
      input {
        width: 265px;
        height: 40px;
        border: 1px solid lightgray;
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
        border-radius: 5px 5px;
        border: none;
        background-color: $brown;
        color:white;

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
        border-radius: 5px 5px;
        border: 1px solid $brown;
        background-color: white;
        color:$brown;

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
