<template>
  <div id="wrap">
    <SideMenu largeCategory="게시판관리" mediumCategory="새소식" />
    <main id="main">
      <main class="inner">
        <h2 class="title">공지사항 - 공지 수정</h2>

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
                          :value="list.sort_num"
                        >
                          {{ list.sort_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="t-row">
                    <div>제목</div>
                    <div>
                      <input type="text" v-model="notice_title" id="title" />
                    </div>
                  </div>
                  <div class="t-row">
                    <div>내용</div>
                    <div>
                      <!--  v-if="notice_content != ''" -->
                      <TextEditor
                        v-if="notice_content != ''"
                        height="300"
                        v-model:content="notice_content"
                        contentType="html"
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
                        <label for="file">첨부파일 추가</label>
                        <ul>
                          <li
                            v-for="(filelist, index) in filelist"
                            :key="index"
                          >
                            {{ filelist.notice_orgfile }}

                            <button
                              @click.prevent="
                                deletefile1(index, filelist.notice_detail_num)
                              "
                            >
                              <img src="@/assets/admin/remove.png" />
                            </button>
                          </li>
                        </ul>
                        <ul>
                          <li v-for="(f, index) in newfile" :key="index">
                            {{ f.name }}
                            <button @click.prevent="deletefile2(index)">
                              <img src="@/assets/admin/remove.png" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <button
                      class="page"
                      @click="$router.push({ name: 'adminNewsList' })"
                    >
                      이전
                    </button>
                    <button class="submit" @click.prevent="checkForm()">
                      수정
                    </button>
                    <button class="delete">삭제</button>
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
      filelist: [],
      newfile: [],
      deletelist: [],
      notice_num: "",
      notice_title: "",
      notice_content: "",
      notice_detail_num: "",
      filename: "",
      selected: "",
    };
  },
  created() {
    this.notice_num = this.$route.params.notice;
    // console.log("mounted: ", this.notice_num);
    this.getupdate();
  },

  /*리스트 바인딩 하여 넘버 얻어오는 거 정리 */
  methods: {
    getupdate() {
      axios.get(`/moaplace.com/admin/news/update/${this.notice_num}`).then(
        function (resp) {
          this.filelist = resp.data.filelist;
          this.notice_title = resp.data.notice_title;
          this.notice_content = resp.data.notice_content;
          this.selected = resp.data.sort_num;
          // console.log("파일리스트", this.filelist);
          // console.log("내용===", this.notice_content);
        }.bind(this)
      );
    },
    deletefile1(index, num) {
      this.filelist.splice(index, 1);
      this.deletelist.push(num);
    },
    deletefile2(index) {
      this.newfile.splice(index, 1);
    },

    selectFile() {
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.newfile.push(this.$refs.files.files[i]);
        // console.log(this.newfile);
      }

      let total = 0;

      if (this.filelist == undefined) {
        total = this.newfile.length;
      } else {
        total = this.filelist.length + this.newfile.length;
      }

      let final = total - 5;
      if (total > 5) {
        alert("최대 가능한 첨부 파일 개수는 5개입니다. ");
        //splice ( 시작할 배열 번호, 삭제할 개수)
        this.newfile.splice(final, final);
        return;
      }
    },

    savefile() {
      var formData = new FormData();

      formData.append("notice_num", this.notice_num);
      formData.append("sort_num", this.selected);
      formData.append("content", this.notice_content);
      formData.append("title", this.notice_title);

      this.deletelist.forEach(function (deletelist) {
        formData.append("deletefiles", deletelist);
      });

      this.newfile.forEach(function (newfile) {
        formData.append("newfiles", newfile);
      });

      return formData;
    },

    checkForm() {
      if (this.selected == 0) {
        alert("구분을 선택하세요");
        return;
      }
      if (this.notice_title == null || this.notice_title == "") {
        alert("제목을 입력하세요");
        return;
      }
      if (this.notice_content == null || this.notice_content == "") {
        alert("내용을 입력하세요");
        return;
      }

      this.updatenews();
    },

    updatenews() {
      // console.log("삭제확인용===" + typeof this.deletelist);
      // console.log("추가확인용===" + this.newfile);
      axios
        .post(
          `/moaplace.com/admin/news/update/${this.notice_num}`,
          this.savefile(),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(
          function (resp) {
            if (resp.data === "success") {
              alert("수정이 완료되었습니다");
              this.$router.push({ name: "adminNewsList" });
              // console.log("수정성공");
            } else {
              alert("수정이 실패되었습니다. 다시 확인해주세요");
              // console.log("수정실패");
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
            ::v-deep .ql-container {
              padding: 14px;

              img {
                max-width: 100%;
              }
            }
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
</style>