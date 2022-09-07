<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판관리" mediumCategory="새소식" />
    <main id="main">
      <main class="inner">
        <h2 class="title">공지사항 - 신규 등록</h2>

        <div class="info-box">
          <div>
            <div class="con">
              <div class="inner_wrap">
                <form>
                  <div class="t-row">
                    <div>구분</div>
                    <div>
                      <select v-model="selected" @change="vueselect">
                        <option
                          v-for="(list, sort_num) in sorts"
                          :key="sort_num"
                          :value="sort_num"
                        >
                          {{ list.sort_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="t-row">
                    <div>제목</div>
                    <div>
                      <input type="text" v-model="title" id="title" />
                    </div>
                  </div>
                  <div class="t-row">
                    <div>내용</div>
                    <div>
                      <TextEditor
                        height="300"
                        id="content"
                        v-model:content="content"
                        contentType="html"
                        placeholder="내용입력란"
                      />
                    </div>
                  </div>
                  <div class="t-row">
                    <div>첨부파일</div>
                    <div>
                      <input
                        type="file"
                        id="file"
                        ref="files"
                        @change="selectFile"
                        multiple
                      />
                      <div class="file-box">
                        <label for="file">첨부파일 등록</label>
                        <ul>
                          <li
                            v-for="(filelist, index) in fileList"
                            :key="index"
                          >
                            {{ filelist.name }}
                            <button @click.prevent="deletefile1(index)">
                              <img src="@/assets/admin/remove.png" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="btn-box">
                    <button
                      class="page"
                      @click="$router.push({ name: 'adminNewsList' })"
                    >
                      이전
                    </button>
                    <button class="submit" @click.prevent="checkForm()">
                      등록
                    </button>
                  </div>
                </form>
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
import TextEditor from "@/components/TextEditor.vue";
import axios from "@/axios/axios.js";

export default {
  components: {
    SideMenu,
    TextEditor,
  },
  data() {
    return {
      sorts: [
        { sort_num: -1, sort_name: "구분선택" },
        { sort_num: 1, sort_name: "공연" },
        { sort_num: 2, sort_name: "대관" },
        { sort_num: 3, sort_name: "예매" },
        { sort_num: 4, sort_name: "관람" },
        { sort_num: 5, sort_name: "회원" },
        { sort_num: 6, sort_name: "기타" },
      ],
      fileList: [],
      content: "",
      title: "",
      selected: 0,
    };
  },

  methods: {
    deletefile1(index) {
      /*splice 그 인덱스부터 1개 삭제 , form 안 buttom prevent 처리 */
      // alert(index);
      this.fileList.splice(index, 1);
      // alert("aaa");
    },
    // vueselect() {
    //   console.log(this.selected);
    // },

    selectFile() {
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        /* 데이터 전송 리스트에 담기 */
        this.fileList.push(this.$refs.files.files[i]);
      }
      /*파일 크기 제한*/
      if (this.fileList.length > 5) {
        alert("최대 가능한 첨부 파일 개수는 5개입니다.");
        this.fileList.splice(0, this.fileList.length);
        return;
      }
      // console.log(this.fileList);
      // console.log(this.fileList.length);
    },

    savefile() {
      var formData = new FormData();
      formData.append("sort_num", this.selected);
      formData.append("content", this.content);
      formData.append("title", this.title);
      this.fileList.forEach(function (fileList) {
        formData.append("files", fileList);
      });
      return formData;
    },

    checkForm() {
      if (this.selected == 0) {
        alert("구분을 선택하세요");
        return;
      }
      if (this.title == null || this.title == "") {
        alert("제목을 입력하세요");
        return;
      }
      if (this.content == null || this.content == "") {
        alert("내용을 입력하세요");
        return;
      }

      this.insertnews();
    },

    insertnews() {
      // console.log(this.selected);
      // console.log("파일 등록====" + this.fileList);
      axios
        .post("/moaplace.com/admin/news/insert", this.savefile(), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          function (resp) {
            if (resp.data === "success") {
              alert("등록이 완료되었습니다");
              this.$router.push({ name: "adminNewsList" });
              // console.log("등록성공");
            } else {
              alert("등록이 실패되었습니다. 다시 확인해주세요");
              // console.log("등록실패");
            }
          }.bind(this)
        );
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
      padding: 0 0 50px 0;
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
            }
            label {
              background: $brown;
              color: #fff;
              font-size: 14px;
              padding: 7px 16px;
              margin: 0;
              position: relative;
              width: 120px;
              text-align: center;
            }
            button {
              background: none;
              border: none;
            }
            ul {
              padding: 2px 0;
              li {
                padding: 4px 0;
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
              .content-box {
                width: 100%;
                border: 1px solid rgba($black, 0.3);
                padding: 32px;
                ::v-deep img {
                  max-width: 100%;
                }
              }
            }
          }
        }
        .btn-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
          button {
            width: calc((100% - 16px) / 2);
            padding: 12px 0;
            border: none;
            &:last-child {
              background-color: $brown;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>