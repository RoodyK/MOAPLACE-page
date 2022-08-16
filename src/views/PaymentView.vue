<template>
  <div id="wrap">
    <div class="inner">
      <header>
        <button class="left">
          <i class="material-symbols-outlined">restart_alt</i>
          <span>예매 다시하기</span>
        </button>
        <h1 class="title">좌석선택</h1>
        <button class="right">
          <span>창닫기</span>
          <i class="material-symbols-outlined">close</i>
        </button>
      </header>
      <main>내용</main>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/common.scss";
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
a {
  color: $black;
  &:hover {
    color: $black;
  }
}
#wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100vh;
  font-family: "Roboto", "Nanum Gothic", sans-serif;
  background: rgba(#000, 0.7);
  .inner {
    width: $width;
    height: 700px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    header {
      width: 100%;
      height: 64px;
      background: $black;
      color: #fff;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      & > button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 14px;
        background: none;
        border: none;
        color: rgba(#fff, 0.9);
        & > :first-child {
          margin-right: 8px;
        }
      }
      h1.title {
        font-size: 22px;
      }
    }
    main {
    }
  }
}
</style>