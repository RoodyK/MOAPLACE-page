<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판 관리" mediumCategory="FAQ" />
    <main id="main">
      <main class="inner">
        <h2 class="title">공지사항 - 신규 등록</h2>

        <div class="info-box">
          <div>
            <div class="con">
              <div class="inner_wrap">
                <div class="t-row">
                  <div>구분</div>
                  <div>
                    <select>
                      <option>구분선택</option>
                      <option
                        v-for="state in states"
                        :key="state"
                        :value="state"
                      >
                        {{ state }}
                      </option>
                    </select>
                  </div>
                </div>
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
                    <input
                      type="file"
                      id="file"
                      multiple
                      @change="handleFileChange"
                    />
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
          </div>
        </div>
      </main>
    </main>
  </div>
</template>

<script>
import SideMenu from "@/components/admin/SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      states: ["공연", "대관", "좌석", "예매", "관람", "회원", "주차", "기타"],
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

<style lang="scss" scoped="scoped">
@import "@/scss/common.scss";
//삭제필요
$brown: #826d5e;
nav {
  display: none !important;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
// 관리자 페이지 레이아웃 관련 시작------------------
#wrap {
  padding-left: 240px;
  background: #f7f9fa;
  #main {
    width: 100%;
    min-height: 100vh;
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
    // 관리자 페이지 레이아웃 관련 끝------------------

    .con {
      padding: 0 0 150px 0;
      width: 100%;
      box-sizing: border-box;
      .inner_wrap {
        .t-row {
          display: table;
          table-layout: fixed;
          width: 100%;
          border-bottom: 1px solid rgba($black, 0.2);
          &:first-child {
            border-top: 3px solid $brown;
            margin-top: 50px;
            select {
              padding: 8px 8px;
            }
          }
          > div {
            display: table-cell;
            &:first-child {
              background-color: #f1f1f1;
              width: 250px;
              text-align: center;
              vertical-align: middle;
              font-weight: 800;
            }
            &:last-child {
              padding: 16px;
            }
            input {
              border: 1px solid rgba($black, 0.2);
              &[type="text"] {
                padding: 4px 16px;
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

          &:nth-child(3) {
            textarea {
              padding: 8px 16px;
              resize: none;
              border: 1px solid rgba($black, 0.2);
              width: 100%;
              min-height: 400px;
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
  }
}
</style>