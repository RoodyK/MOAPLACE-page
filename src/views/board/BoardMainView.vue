<template>
  <div>
    <AppHeader/>
    <SideVisual menu="CUSTOMER SERVICE" img="cs" title="FAQ"/>

    <div class="app">
      <h2> 모아플레이스에 바라는 사항이나 불편한 사항, <br>
          궁금증을 올려주시면 성심성의껏 답변해 드리겠습니다. </h2>

      <p> 자주묻는질문(FAQ)을 먼저 확인하시면 보다 빠르게 궁금한 점을 해결할 수 있습니다. </p>

      <div class="container">
        <button class="btn" @click="$router.push({name:'faq'})"><img src="../../assets/board/faq.png"><br>자주묻는질문(FAQ)</button>
        <button class="btn" @click="$router.push({name:'qnaInsert'})"><img src="../../assets/board/qna.png"><br>1:1문의글(QNA)</button>
        <button class="btn" @click="$router.push({name:'qnaList'})"><img src="../../assets/board/myqna.png" style="padding-left:30px;"><br>나의 문의글 확인</button>
      </div>

    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  }
}
</script>


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
  margin: 35px auto;

  h2 { 
  text-align: center;
  }

  p {
  padding:15px;
  color: #D67747;
  }

  .container {
  display: flex;
  justify-content: center;
    
    .btn {
    margin: 10px;
    width: 300px;
    height: 300px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    font-weight: bold;
    color:$black;

      &:hover {
      background-color: lightgray;

        img{
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>