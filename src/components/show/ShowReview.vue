<template>
  <div class="detail">
    <div class="cnt">
      {{detail.show_name}}에 대한 <span>{{review_count}}</span>개의 리뷰가 있어요!
    </div>
    <div class="write_box">
      <div class="write">
        <div class="write_score">
          <span class="star">
            ★★★★★
            <span>★★★★★</span>
            <input type="range" @input="drawStar($event)" v-model="review_insert.review_grade" step="1" min="1" max="5">
          </span>
        </div>  
        <div class="write_text">
          <span>{{rbyte}}/1000</span>
          <div v-if="login_chk==null">
            <textarea disabled placeholder="로그인 후 이용 가능한 서비스입니다."/>
          </div>
          <div v-else>
            <textarea v-model="review_insert.review_content" @keyup="limit" placeholder="감상평을 남겨주세요 공연과 상관없는 내용은 약관에 의해 제재를 받을수 있습니다."/>
          </div>
          <button v-if="login_chk==null">등록</button>
          <button v-else @click="insert">등록</button>
        </div>
      </div>
    </div>
    <div class="list" v-for="rl in review_list" :key="rl.review_num">
      <div class="list_score">
        <span class="star" v-if="rl.review_grade==1">
          ★★★★★
          <span style="width: 20%">★★★★★</span>
        </span>
        <span class="star" v-else-if="rl.review_grade==2">
          ★★★★★
          <span style="width: 40%">★★★★★</span>
        </span>
        <span class="star" v-else-if="rl.review_grade==3">
          ★★★★★
          <span style="width: 60%">★★★★★</span>
        </span>
        <span class="star" v-else-if="rl.review_grade==4">
          ★★★★★
          <span style="width: 80%">★★★★★</span>
        </span>
        <span class="star" v-else-if="rl.review_grade==5">
          ★★★★★
          <span style="width: 100%">★★★★★</span>
        </span>
      </div>
      <div class="list_text">
        <div class="cont">
          {{rl.review_content}}
        </div>
        <div class="writer">
          <div>
            <span id="id">{{rl.member_id}}</span>
            <span id="date">
              {{new Date(rl.review_regdate).getFullYear() + " -"}}
              {{(new Date(rl.review_regdate).getMonth()+1) < 10 ? "0" + (new Date(rl.review_regdate).getMonth()+1) + " -" : (new Date(rl.review_regdate).getMonth()+1) + " -"}}
              {{new Date(rl.review_regdate).getDate() < 10 ? "0" + new Date(rl.review_regdate).getDate() : new Date(rl.review_regdate).getDate()}}
            </span>
          </div>
          <div class="edit" v-if="rl.member_num == test">
            <span id="update" @click="edit_data(rl.review_num)" data-bs-toggle="modal" data-bs-target="#exampleModal">수정</span>
            <span id="delete" @click="del(rl.review_num)">삭제</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="paging">
      <li
        :class="{active: pageutil.startPageNum > 1}"
        @click="changePage('prev',$event)">
        [이전]
      </li>
      <li 
        v-for="num in pageNumbers"
        :key="num"
        @click="movePage(num)"
        :class="{active: pageutil.pageNum == num}">
        {{num}}
      </li>
      <li
        :class="{active: pageutil.endPageNum < pageutil.totalPageCount}"
        @click="changePage('next',$event)">
        [다음]
      </li>
    </ul>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">수정</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="write_box">
              <div class="write">
                <div class="write_score">
                  <span class="star">
                    ★★★★★
                    <span id="edit_star">★★★★★</span>
                    <input type="range" @input="edit_drawStar($event)" v-model="review_edit.review_grade" step="1" min="1" max="5">
                  </span>
                </div>  
                <div class="write_text">
                  <span class="edit_cnt">{{edit_rbyte}}/1000</span>
                  <div id="edit_text">
                    <textarea v-model="review_edit.review_content" @keyup="edit_limit"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">완료</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
  import axios from '@/axios/axios.js'
  export default { 
    name:"ShowReview",
    data() {
      return {
        detail:[],
        show_num:0,

        review_count:0,
        review_list:[],
        pageutil:[],
        pageNumbers:[],
        pagenum:1,

        review_insert:{
          show_num:0,
          member_num: 0,
          review_content:'',
          review_grade:10,
        },
        review_edit:{
          review_num:0,
          show_num:0,
          member_num: 0,
          review_content:'',
          review_grade:0,
        }
      }
    },
    created(){
      this.memberinfo();
      this.data();
      this.getReview();
    },
    computed:{
      rbyte(){
          let cnt=0;
          for(let i=0; i<this.review_insert.review_content.length; i++){
            if(escape(this.review_insert.review_content.charAt(i)).length>4){
              cnt += 2;
            }else{
              cnt ++;
            }
          }
          return cnt;
      },
      edit_rbyte(){
          let cnt=0;
          for(let i=0; i<this.review_edit.review_content.length; i++){
            if(escape(this.review_edit.review_content.charAt(i)).length>4){
              cnt += 2;
            }else{
              cnt ++;
            }
          }
          return cnt;
      }
    },
    methods: {
      data(){
        this.show_num=this.$route.params.show_num;
        axios.get(`/moaplace.com/show/showdetail/${this.$route.params.show_num}`)
          .then((resp) => {
            this.detail = resp.data.detail[0];
            this.review_insert.show_num = this.show_num;
            this.review_edit.show_num = this.show_num;
          }
        )
      },
      getReview() {
        axios.get(`/moaplace.com/show/review/list/${this.show_num}/${this.pagenum}`)
          .then((resp) => {
            this.review_count = resp.data.reviewCount;
            this.review_list = resp.data.reviewList;
            this.pageutil = resp.data.pageUtil;
            this.getPageNumber();
          }
        )
      },
      memberinfo() {
        let token = localStorage.getItem("access_token");
        if(token == null) return;
        this.login_chk = token;

        axios.get("/moaplace.com/users/login/member/info")
        .then(response => {
          let data = response.data;
          this.review_insert.member_num = data.member_num;
          this.review_edit.member_num = data.member_num;
          this.test = data.member_num;
        })
        .catch(error => {
          console.log(error.message);
        })
      },
      drawStar(e) {
        document.querySelector(`.star span`).style.width = `${e.target.value * 20}%`;
      },
      edit_drawStar(e) {
        document.querySelector(`#edit_star`).style.width = `${e.target.value * 20}%`;
      },
      limit() {
        if(this.rbyte>1000){
          alert("1000Byte를 초과 입력할 수 없습니다.");
          while(this.rbyte>1000){
            this.review_insert.review_content=this.review_insert.review_content.substring(0, this.review_insert.review_content.length-1);
          }
        }
      },
      edit_limit() {
        if(this.edit_rbyte>1000){
          alert("1000Byte를 초과 입력할 수 없습니다.");
          while(this.edit_rbyte>1000){
            this.review_edit.review_content=this.review_edit.review_content.substring(0, this.review_edit.review_content.length-1);
          }
        }
      },
      getPageNumber(){
        this.pageNumbers = [];
        for(let i = this.pageutil.startPageNum; i <= this.pageutil.endPageNum; i++){
          this.pageNumbers.push(i);
        }
      },
      changePage(where , e){
        if(e.target.classList.contains('active')){
          this.pagenum=1;

        if(where == 'prev'){
          this.pagenum = this.pageutil.startPageNum -1; 
        }
        else if(where == 'next'){
          this.pagenum = this.pageutil.endPageNum +1;
        }
        else{
          return;
        }
        this.movePage(this.pagenum);
        }
      },
      movePage(pagenum){
        axios.get(`/moaplace.com/show/review/list/${this.show_num}/${pagenum}`)
        .then((resp) => {
            this.review_count = resp.data.reviewCount;
            this.review_list = resp.data.reviewList;
            this.pageutil = resp.data.pageUtil;
            this.getPageNumber();
          }
        )
      },
      insert(){
        if(this.rbyte<20) {
          alert('최소 20byte 이상 작성해주세요.');
          return
        }else{
          axios.post('/moaplace.com/show/review/insert', JSON.stringify(this.review_insert),{
            headers: {'Content-Type' : 'application/json'}
          })
          .then(resp => {
            if(resp.data!='fail'){ 
              if(confirm("후기를 등록하시겠습니까?") == true) {
                alert('후기가 등록되었습니다.');
                this.review_insert.review_content='';
                this.getReview();
              }else {
                return;
              }
            }else {
              alert('후기등록에 실패하셨습니다.');
              return
            }
          }).catch(error => {
            console.log(error.message);
          })
        }
      },
      del(review_num){
        if(confirm("정말 삭제하시겠습니까?")) {
          axios.post('/moaplace.com/show/review/delete', JSON.stringify(review_num),{
            headers: {'Content-Type' : 'application/json'}
          })
          .then(resp => {
            if(resp.data!='fail'){ 
              alert('후기가 삭제되었습니다.');
              this.getReview();
            }else {
              alert('후기 삭제에 실패하셨습니다. 다시 시도해주세요.');
              return
            }
          }).catch(error => {
            console.log(error.message);
          })
        }else return
      },
      edit_data(review_num){
        this.review_edit.review_num = review_num;
        axios.get(`/moaplace.com/show/review/select/${review_num}`)
        .then((resp) => {
            this.review_edit.review_content = resp.data.review_content;
            this.review_edit.review_grade = resp.data.review_grade;
            document.querySelector(`#edit_star`).style.width = `${resp.data.review_grade * 20}%`;
          }
        )
      },
      edit(){
        if(this.edit_rbyte<20) {
          alert('최소 20byte 이상 작성해주세요.');
          return
        }else{
          if(confirm("수정하시겠습니까?")) {
            axios.post('/moaplace.com/show/review/edit', JSON.stringify(this.review_edit),{
              headers: {'Content-Type' : 'application/json'}
            })
            .then(resp => {
              if(resp.data!='fail'){ 
                this.getReview();
                alert('수정되었습니다.');
              }else {
                alert('수정에 실패하셨습니다. 다시 시도해주세요.');
                return
              }
            }).catch(error => {
              console.log(error.message);
            })
          }else return
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../scss/common.scss';
  .detail{
    padding-top: 50px;
    .cnt{
      color: gray;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 24px;
      span{
        color: $brown;
      }
    }
    .write_box{
      height: 240px;
      .write{
        height: 100%;
        .write_score{
          width: 100%;
          .star {
            position: relative;
            font-size: 32px;
            color: #ccc;
            input {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              opacity: 0;
              cursor: pointer;
            }
            span {
              width: 100%;
              position: absolute; 
              left: 0;
              color: $brown;
              overflow: hidden;
              pointer-events: none;
            }
          }
        }
        .write_text{
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
          span{
            position: absolute;
            right: 11%;
            top: 67%;
            color: #ccc;
          }
          div{
            width: 90%;
            height: 80%;
            border: 1px solid $brown;
            textarea{
              padding: 12px;
              width: 100%;
              height: 87%;
              resize: none;
              font-size: 14px;
              border: none;
              background-color: white;
              &:focus{
                outline: none;
              }
            }
          }
          button{
            width: 10%;
            height: 80%;
            border: none;
            background-color: $brown;
            color:white;
          }
          .edit_cnt{
            position: absolute;
            right: 2%;
          }
        }
      }
    }
    .list{
      margin-top: 24px;
      height: 160px;
      display: flex;
      border: 1px solid #ccc;
      background-color: rgba(#ccc, 0.2); // 
      .list_score{
        width: 15%;
        text-align: center;
        .star {
          width: 100%;
          position: relative;
          font-size: 32px;
          color: #ccc;
          span {
            position: absolute; 
            left: 0;
            color: $brown;
            overflow: hidden;
            pointer-events: none;
          }
        }
      }
      .list_text{
        width: 85%;
        padding: 12px;
        .cont{
          height: 80%;
          font-size: 14px;
        }
        .writer{
          height: 20%;
          display: flex;
          justify-content: space-between;
          div{
            #id{
              font-weight: bold;
              padding: 0px;
            }
            #date{
              color: #ccc;
              font-size: 14px;
              border-left: 1px solid #ccc;
              margin-left: 12px;
              padding-left: 12px;
            }
            span{
              border: none;
              color: rgba($black, 0.7);
              font-size: 14px;
              padding: 0 12px;
            }
            #delete{
              border-left: 1px solid #ccc;
            }
          }
          .edit{
            cursor: pointer;
          }
        }
      }
    }
    .paging {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin-top: 32px;
      padding-right: 2rem;
      li {
        margin: 0 6px;
        padding: 0 6px;
        user-select: none;
        cursor: pointer;
        &.active{
          color: #D67747;
          font-weight: bold;
        }
        &:first-child,
        &:last-child {
          color: rgba($black, 0.5);
          font-weight: bold;  
          cursor: auto;
          &.active{
            color: $brown;
            cursor: pointer;
          }
        }
      }
    }
  }
  #edit_text{
    width: 100%;
  }
</style>