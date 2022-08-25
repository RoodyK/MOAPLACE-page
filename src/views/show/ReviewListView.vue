<template>
  <div>
    <AppHeader/>
    <SideVisual menu="SHOW / TICKET" img="show" title="공연목록"/>
    <div id="wrap">
      <div id="main" class="containers">
        <div id="img">
          <img src="../../assets/smile.jpg">
        </div>
        <div class="info_box">
          <div id="info">
            <h4>웃는남자</h4>
            <div>
              <span>기간</span> 2022.06.10 (금) ~ 2022.08.22 (월)
            </div>
            <div>
              <span>장소</span> 오케스트라홀
            </div>
            <div>
              <span>시간</span> 오케스트라홀
            </div>
            <div>
              <span>연령</span> 전체연령가
            </div>
            <div>
              <span>티켓</span> R석 150,000원 / S석 120,000원 / A석 100,000원
            </div>
          </div>
          <div id="mybtn">
            <button>관심공연</button>
            <button>잔여석정보</button>
            <button>예매하기</button>
          </div>
        </div>
      </div>
      <div id="nav">
        <div class="tap_off" id="tap_1">
          <RouterLink to="/moaplace.com/show/showdetail">상세보기</RouterLink>
        </div>
        <div class="tap_on" id="tap_2">
          <RouterLink to="/moaplace.com/show/review/list">관람평</RouterLink>
        </div>
        <div class="tap_off" id="tap_3">
          <RouterLink to="/moaplace.com/show/showrefund">취소 및 환불 안내</RouterLink>
        </div>
      </div>
      <div class="detail">
        <div class="cnt">
          웃는남자에 대한 <span>2</span>개의 리뷰가 있어요!
        </div>
        <div class="write_box">
          <div class="write">
            <div class="write_score">
              <span class="star">
                ★★★★★
                <span>★★★★★</span>
                <input type="range" @input="drawStar($event)" value="10" step="1" min="1" max="10">
              </span>
            </div>  
            <div class="write_text">
              <span>{{rbyte}}/1000</span>
              <div>
                <textarea v-model="cont" @keyup="limit" placeholder="감상평을 남겨주세요 공연과 상관없는 내용은 약관에 의해 제재를 받을수 있습니다."/>
              </div>
              <button>등록</button>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="list_score">
            <span>★★★★★</span>
          </div>
          <div class="list_text">
            <div class="cont">
              독특한 소재로 공포감은 크지 않았지만 배우들의 명품연기로 보는 내내 긴장감을 놓을 수 없었다. 독특한 소재로 공포감은 크지 않았지만 배우들의 명품연기로 보는 내내 긴장감을 놓을 수 없었다.
            </div>
            <div class="writer">
              <div>
                <span id="id">wkrwja12</span>
                <span id="date">2022-08-08</span>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="list_score">
            <span>★★★★★</span>
          </div>
          <div class="list_text">
            <div class="cont">
              언뜻보면 뭔지 잘 알 수 없지만 영화의 역사를 상징적으로 다룬 작품이라는 것을 보니 탁월한 연출이었구나도 싶고....좀 난해한 영화였네요
            </div>
            <div class="writer">
              <div>
                <span id="id">jungjy42</span>
                <span id="date">2022-08-02</span>
              </div>
              <div>
                <a id="update">수정</a>
                <a id="delete">삭제</a>
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

export default {
  name:"ShowReviewView",
  components: {
    AppHeader,
    AppFooter,
    SideVisual
  },
  data(){
    return{
      cont:""
    }
  },
  computed:{
    rbyte(){
        let cnt=0;
        for(let i=0; i<this.cont.length; i++){
          if(escape(this.cont.charAt(i)).length>4){
            cnt += 2;
          }else{
            cnt ++;
          }
        }
        return cnt;
    }
  },
  methods: {
    drawStar(e) {
      document.querySelector(`.star span`).style.width = `${e.target.value * 10}%`;
    },
    limit() {
      if(this.rbyte>1000){
        alert("1000Byte를 초과 입력할 수 없습니다.");
        while(this.rbyte>1000){
          this.cont=this.cont.substring(0, this.cont.length-1);
        }
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
        span{
          font-weight: bold;
          margin-right: 16px;
        }
      }
      h4{
        font-size: 40px;
        font-weight: bold;
        color: $black;
      }
      color: $black;
      font-size: 22px;
      line-height: 60px;
    }
    #mybtn{
      margin-top: 41px;
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
        padding: 8px 12px 24px 12px;
        background-color: rgba(#ccc, 0.2); // 
        .write_score{
          width: 100%;
          .star {
            position: relative;
            font-size: 32px;
            color: #ccc;
            background-color: white;
            border: 1px solid $brown;
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
        span{
          font-size: 32px;
          color: $brown;
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
            }
            #date{
              color: #ccc;
              font-size: 14px;
              border-left: 1px solid #ccc;
              margin-left: 12px;
              padding-left: 12px;
            }
            a{
              border: none;
              color: rgba($black, 0.7);
              font-size: 14px;
              padding: 0 12px;
            }
            #delete{
              border-left: 1px solid #ccc;
            }
          }
          
        }
      }
    }
  }
</style>