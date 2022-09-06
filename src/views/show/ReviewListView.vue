<template>
  <div>
    <AppHeader/>
    <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
    <div id="wrap">
      <div id="main" class="containers">
        <div id="img">
          <img :src="detail.show_thumbnail">
        </div>
        <div class="info_box">
          <div id="info">
            <h4>{{detail.show_name}}</h4>
            <div>
              <span class="category">기간</span> 
              <span>
                {{start_date}} ~ {{end_date}}
              </span>
            </div>
            <div v-if="detail.hall_num==1">
              <span class="category">장소</span> 
              <span>모던홀</span>
            </div>
            <div v-else-if="detail.hall_num==2">
              <span class="category">장소</span> 
              <span>오케스트라홀</span>
            </div>
            <div v-else-if="detail.hall_num==3">
              <span class="category">장소</span> 
              <span>아트홀</span>
            </div>
            <div>
              <span class="category">시간</span>
              <span v-for="s, index in schedule" :key="index">
                {{s.schedule_date.substring(5)}} {{s.schedule_time}} &nbsp;&nbsp;
              </span>
            </div>
            <div>
              <span class="category">연령</span> 
              <span>{{detail.show_age}}</span>
            </div>
            <div>
              <span class="category">티켓</span>
              <span v-for="g, index in grade" :key="index">
                <span v-if="index!=0"> / </span>{{g.grade_seat}}석 {{g.grade_price}}원
              </span>
            </div>
          </div>
          <div id="mybtn" v-if="login_chk==null">
            <button @click="this.$router.push({path: '/moaplace.com/users/login'})">관심공연</button>
            <button v-if="check" @click="residualseats">잔여석정보</button>
            <button v-if="check" @click="this.$router.push({path: '/moaplace.com/users/login'})">예매하기</button>
          </div>
          <div id="mybtn" v-else>
            <button @click="favorite">관심공연</button>
            <button v-if="check" @click="residualseats">잔여석정보</button>
            <button v-if="check" @click="this.$router.push({path: `/moaplace.com/booking/select/${detail.show_num}`})">예매하기</button>
          </div>
        </div>
      </div>
      <div id="nav">
        <div class="tap_off" id="tap_1">
          <RouterLink :to="`/moaplace.com/show/showdetail/${this.$route.params.show_num}`">상세보기</RouterLink>
        </div>
        <div class="tap_on" id="tap_2">
          <RouterLink :to="`/moaplace.com/show/review/list/${this.$route.params.show_num}`">관람평</RouterLink>
        </div>
        <div class="tap_off" id="tap_3">
          <RouterLink :to="`/moaplace.com/show/showrefund/${this.$route.params.show_num}`">취소 및 환불 안내</RouterLink>
        </div>
      </div>
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
                <input type="range" @input="drawStar($event)" v-model="review_insert.review_grade" step="1" min="1" max="10">
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
              <span style="width: 10%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==2">
              ★★★★★
              <span style="width: 20%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==3">
              ★★★★★
              <span style="width: 30%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==4">
              ★★★★★
              <span style="width: 40%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==5">
              ★★★★★
              <span style="width: 50%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==6">
              ★★★★★
              <span style="width: 60%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==7">
              ★★★★★
              <span style="width: 70%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==8">
              ★★★★★
              <span style="width: 80%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==9">
              ★★★★★
              <span style="width: 90%">★★★★★</span>
            </span>
            <span class="star" v-else-if="rl.review_grade==10">
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
              <div class="edit" v-if="rl.member_num == favorite_show.member_num">
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
                        <input type="range" @input="edit_drawStar($event)" v-model="review_edit.review_grade" step="1" min="1" max="10">
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
                <button type="button" class="btn btn-primary" @click="edit">완료</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SideVisual from '@/components/SideVisual.vue'
import axios from '@/axios/axios.js'

export default {
  name:"ShowReviewView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data(){
    return{
      detail:[],
      schedule:[],
      grade:[],
      detailimg:[],

      start_date:'',
      end_date:'',
      
      check:false,
      login_chk:null,
      
      favorite_show:{
        show_num:0,
        member_num: 0
      },

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
    this.data();
    this.memberinfo();
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
      let show_num=this.$route.params.show_num;
      axios.get(`/moaplace.com/show/showdetail/${show_num}`)
        .then((resp) => {
          this.detail = resp.data.detail[0];
          this.schedule = resp.data.schedule;
          this.grade = resp.data.grade;
          this.detailimg = resp.data.detailimg;

          let show_start = new Date(resp.data.detail[0].show_start);
          let show_end = new Date(resp.data.detail[0].show_end);

          let days=["일", "월", "화", "수", "목", "금", "토"];

          let show_day1 = new Date(show_start).getDay();
          let show_day2 = new Date(show_end).getDay();
          
          let start_day=days[show_day1];
          let end_day=days[show_day2];

          this.start_date = `${show_start.getFullYear()}.
            ${new Date(show_start).getMonth()+1 < 10 ? `0${new Date(show_start).getMonth()+1}` : new Date(show_start).getMonth()+1}
            .${new Date(show_start).getDate() < 10 ? `0${new Date(show_start).getDate()}` : new Date(show_start).getDate()}
            (${start_day})`;
          
          this.end_date = `${show_end.getFullYear()}.
            ${new Date(show_end).getMonth()+1 < 10 ? `0${new Date(show_end).getMonth()+1}` : new Date(show_end).getMonth()+1}
            .${new Date(show_end).getDate() < 10 ? `0${new Date(show_end).getDate()}` : new Date(show_end).getDate()}
            (${end_day})`;

          let price_comma=[];
          for(let i=0; i<resp.data.grade.length; i++) {
            price_comma[i] = this.numberWithCommas(resp.data.grade[i].grade_price);
            this.grade[i].grade_price = price_comma[i];
          }

          if(resp.data.detail[0].show_check == "Y" && resp.data.detail[0].show_end >= new Date() && resp.data.schedule.length != 0) {
            this.check = true;
          }

          this.favorite_show.show_num = resp.data.detail[0].show_num;
          this.review_insert.show_num = resp.data.detail[0].show_num;
          this.review_edit.show_num = resp.data.detail[0].show_num;
        }
      )
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    memberinfo() {
      let token = localStorage.getItem("access_token");
      if(token == null) return;
      this.login_chk = token;

      axios.get("/moaplace.com/users/login/member/info")
      .then(response => {
        let data = response.data;
        // const info = {
        //   num: data.member_num,
        //   id: data.member_id,
        //   pwd: data.member_pwd,
        //   email: data.member_email,
        //   name: data.member_name,
        //   gender: data.member_gender,
        //   phone: data.member_gender,
        //   address: data.member_address,
        //   point: data.member_point
        // }
        this.favorite_show.member_num = data.member_num;
        this.review_insert.member_num = data.member_num;
        this.review_edit.member_num = data.member_num;
        // console.log(data);
        // console.log(info);
      })
      .catch(error => {
        console.log(error.message);
      })
    },
    favorite(){
      axios.post('/moaplace.com/show/inter/insert', JSON.stringify(this.favorite_show),{
        headers: {'Content-Type' : 'application/json'}
      })
      .then(resp => {
        if(resp.data!='fail'){ 
          console.log(resp.data);
          if(confirm("관심공연으로 등록하시겠습니까?") == true) {
            alert('관심공연으로 등록되었습니다.');
          }else {
            return;
          }
        }else {
          alert('이미 등록된 공연입니다.');
          return
        }
      }).catch(error => {
        console.log(error.message);
      })
    },
    residualseats(){
      window.open(
        "/moaplace.com/show/residualseats/" + this.$route.params.show_num,
        "잔여석 정보",
        "width=1000, height=700",
        "_blank"
      );
    },
    drawStar(e) {
      document.querySelector(`.star span`).style.width = `${e.target.value * 10}%`;
    },
    edit_drawStar(e) {
      document.querySelector(`#edit_star`).style.width = `${e.target.value * 10}%`;
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
    getReview() {
      let show_num=this.$route.params.show_num;
      axios.get(`/moaplace.com/show/review/list/${show_num}/${this.pagenum}`)
        .then((resp) => {
          this.review_count = resp.data.reviewCount;
          this.review_list = resp.data.reviewList;
          this.pageutil = resp.data.pageUtil;
          this.getPageNumber();
          // console.log(resp.data);
        }
      )
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
      let show_num=this.$route.params.show_num;
      axios.get(`/moaplace.com/show/review/list/${show_num}/${pagenum}`)
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
          // console.log("resp : " + resp);
          if(resp.data!='fail'){ 
            if(confirm("후기를 등록하시겠습니까?") == true) {
              alert('후기가 등록되었습니다.');
              this.getReview();
            }else {
              return;
            }
          }else {
            alert('이미 후기등록을 하셨습니다.');
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
          document.querySelector(`#edit_star`).style.width = `${resp.data.review_grade * 10}%`;
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
              alert('수정되었습니다.');
              this.getReview();
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
  #wrap{
    width: $width;
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 120px;
  }
  #main{
    border-top: 2px solid rgba($black, 0.5);
    padding-top: 50px;
    img{
      width: 320px;
      box-shadow: 3px 7px 21px rgb(0 0 0 / 13%);
    }
    button{
      color: white;
      background-color: $green;
    }
  }
  #nav{
    width: 100%;
    display: flex;
    margin-top: 50px;
    text-align: center;
    justify-content: space-evenly;
    a{
      text-decoration: none;
      font-size: 20px;
    }
    div{
      width: 100%;
      padding: 16px 0;
    }
    .tap_on{
      background-color: $brown;
      a{
        color: #fff;
      }
    }
    .tap_off{
      background-color: #fff;
      border-top: 1px solid $brown;
      border-bottom: 1px solid $brown;
      a{
        color: $brown;
      }
    }
    #tap_1{
      border-left: 1px solid $brown;
    }
    #tap_3{
      border-right: 1px solid $brown;
    }
  }
  .containers{
    display: flex;
    align-items: stretch;
    padding: 0 50px;
  }
  .info_box{
    width: 100%;
    margin-left: 30px;
    #info{
      div{
        border-bottom: 1px solid rgba($black, 0.2);
        .category{
          font-weight: bold;
          margin-right: 16px;
        }
      }
      h4{
        font-size: 32px;
        font-weight: bold;
        color: $black;
      }
      color: $black;
      font-size: 16px;
      line-height: 52px;
    }
    #mybtn{
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      button{
        width: calc((100% - (16px * 2)) / 3);
        padding: 16px 0;
        border: none;
        background-color: $brown;
        color:white;
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
            background-color: white;
            textarea{
              padding: 12px;
              width: 100%;
              height: 87%;
              resize: none;
              font-size: 14px;
              border: none;
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