<template>
  <div class="containers">
    <AppHeader />
    <SideVisual menu="MOA PLACE" img="moa" title="새소식"/>
    <div class="title inner_wrap">
      <p class="tit">새소식</p>
      <p class="txt">
        문화예술을 통한 즐거움과 감동을 공유하는 나눔터 모아플레이스입니다.
      </p>
    </div>
    <div class="con">
      <div class="inner_wrap">
        <div class="t-row">
          <div>제목</div>
          <div><input type="text" name="" vale="제목입력란" /></div>
        </div>
        <div class="t-row">
          <div>내용</div>
          <div>
            <textarea>내용입력란</textarea>
          </div>
        </div>
        <div class="t-row">
          <div>첨부파일</div>
          <div>
            <input type="file" id="file" multiple @change="handleFileChange" />
            <div class="file-box">
              <input
                type="text"
                class="file-input"
                :value="filename"
                disabled
              />
              <label for="file">첨부파일 등록</label>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class="page">이전</button>
          <button
            class="update"
            @click="$router.push({ name: 'moaplaceMoaNews' })"
          >
            수정
          </button>
          <button class="delete">삭제</button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SideVisual from "@/components/SideVisual.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    SideVisual,
  },
  data() {
    return {
      filename: "",
    };
  },
  methods: {
    handleFileChange(e) {
      let file = e.target.files[0];
      let name = file.name;
      this.filename = name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/common.scss";
$brown: #826d5e;
.containers {
  width: 100%;
  margin: 0 auto;
}
.inner_wrap {
  width: $width;
  margin: 0 auto;
}
.title {
  text-align: center;
  padding: 125px 0 32px;
  .tit {
    font-size: 40px;
    font-weight: 700;
  }
  .txt {
    font-size: 17px;
    color: #666666;
    margin-top: 15px;
  }
}
.con {
  padding: 0 0 150px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .inner_wrap {
    padding: 10px 20px;
    width: $width;
    .t-row {
      display: table;
      table-layout: fixed;
      width: 100%;
      border-bottom: 1px solid rgba($black, 0.2);
      &:first-child {
        border-top: 3px solid $brown;
      }
      > div {
        display: table-cell;
        &:first-child {
          background-color: #f1f1f1;
          padding: 30px 40px;
          width: 250px;
          text-align: center;
          vertical-align: middle;
        }
        &:last-child {
          padding: 8px 16px;
        }
        input {
          border: 1px solid rgba($black, 0.2);
          &[type="text"] {
            padding: 4px 16px;
            margin-top: 20px;
            margin-left: 10px;
            width: 100%;
          }
          &[type="file"] {
            display: none;
          }
          &.file-input {
            width: 70%;
            margin-right: 16px;

            & + label {
              background: $brown;
              color: #fff;
              font-size: 14px;
              padding: 7px 16px;
              margin: 0;
            }
          }
        }
      }
      &:nth-child(2) {
        textarea {
          padding: 8px 16px;
          resize: none;
          border: 1px solid rgba($black, 0.2);
          width: 100%;
          min-height: 400px;
          margin-top: 20px;
          margin-left: 10px;
          box-sizing: border-box;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      margin-top: 32px;
      button {
        margin-right: 16px;
        color: #f1f1f1;
        padding: 10px 42px;
        border: none;
        &:first-child {
          background-color: rgba($black, 0.6);
        }
        &:nth-child(2) {
          background-color: $brown;
        }
        &:last-child {
          background-color: $black;
        }
      }
    }
  }
}
</style>