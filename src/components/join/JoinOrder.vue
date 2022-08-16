<template>
  <div>
    <div class="regist">
      <div v-for="jo in joinOrder" :key="jo.name"
      class="box" :class="{ active : jo.isActive }">
        {{ jo.name }}
      </div>
    </div>

    <div class="line">
      <div v-for="jo in joinOrder" :key="jo.name"
      class="step" :class="{ active : jo.isActive }"></div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: String 
  },
  created() {
    for(let i = 0; i < this.joinOrder.length; i++) {
      if(this.order == this.joinOrder[i].name) {
        this.joinOrder[i].isActive = true;
      }
    }
  },
  data() {
    return {
      joinOrder: [
        {
          name: "약관동의",
          isActive: false
        },
        {
          name: "정보입력",
          isActive: false
        },
        {
          name: "가입완료",
          isActive: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/common.scss';

.regist {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  .box {
    font-size: 1.4rem;
    width: 180px;
    height: 60px;
    margin-right: 80px;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #777;
    box-sizing: border-box;
    position: relative;
    &.active {
      background-color: $brown;
      color: #fff;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.line {
  width: 700px;
  height: 3px;
  margin: 0 auto 100px;
  background-color: #000;
  position: relative;
  .step {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    border:2px solid $brown;
    background-color: #fff;
    &.active {
      background-color: $brown;
    }
    &:nth-child(1) {
      top:-10px;
      left: 80px;
    }
    &:nth-child(2) {
      top:-10px;
      left: calc(50% - 10px);
    }
    &:nth-child(3) {
      top: -10px;
      right: 80px;
    }
  }
}

</style>