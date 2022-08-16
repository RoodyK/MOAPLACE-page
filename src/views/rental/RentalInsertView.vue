<template>
  <div id="wrap">
    <AppHeader/>
    <SideVisual menu="RENTAL APPLICATION" img="rental"/>
    <div class="inner">
      <div class="noti-box">
        <h3>모아플레이스 대관 신청 준수사항</h3>
        <ul>
          <li>대관 신청일자 및 시간은 모아플레이스 사정에 의해 조정 될 수 있음</li>
          <li>접수된 신청서 및 기타 서류는 <strong>반환하지 않음</strong></li>
          <li><strong>신청서 내용 변경 시 즉시 연락</strong></li>
          <li>
            공연내용 및 보조출연자 변경 등의 기존 승인 내용과 중대히 다른 변경사항이 발생한 경우 공연일로부터 60일 이전에 변경신청 후 모아플레이스의 내용변경에 대한 승인 후 가능하며 변경 시 <strong>내용에 따라 대관료의 10%를 변경수수료로 납부하여야 함</strong>
          </li>
          <li><strong>연주자의 변경은 절대 불가함</strong> (공연형식 변경 금지 / 대관규약 참조)</li>
          <li>공연이 취소되는 경우 대관규약에 의거하여 <strong>계약금 및 대관료 전액 귀속될 수 있음</strong></li>
          <li>보다 자세한 사항은 <strong>홈페이지 1:1문의로 문의</strong></li>
        </ul>
        <p>
          상기와 같이 모아플레이스 사용과 관련, 해당 공연장의 운영팀(또는 단체의 장)이 <br>부여하는 조건을 준수할 것을 서약하며 위와 같이 신청합니다.
          <br>
          <input class="radio-input" type="checkbox" value="true" id="agree">
          <label class="radio-label" for="agree">
            동의함
          </label>
        </p>
        
        
      </div>
      <h2 class="title">신청서</h2>
      <div class="table-box">
        <div class="t-row">
          <div>공연장</div>
          <div>
            <input class="radio-input" type="radio" value="" id="hall01" name="hall" checked>
            <label class="radio-label" for="hall01">
              모던홀
            </label>

            <input class="radio-input" type="radio" value="" id="hall02" name="hall">
            <label class="radio-label" for="hall02">
              오케스트라홀
            </label>

            <input class="radio-input" type="radio" value="" id="hall03" name="hall">
            <label class="radio-label" for="hall03">
              아트홀
            </label>
          </div>
        </div>
        <div class="t-row">
          <div>신청인</div>
          <div>
            <input type="text" class="text-input-long" name="name" placeholder="단체명 또는 사업자명을 입력하세요.">
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>연락처</div>
          <div>
            <div class="phone-box">
              <input type="text"> 
              <span>-</span>
              <input type="text"> 
              <span>-</span>
              <input type="text">
            </div>
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>E-mail</div>
          <div>
            <div class="email-box">
              <input type="text"> <span>@</span>
              <input type="text"> 
              <select>
                <option value="">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
              </select> 
            </div>
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>공연명</div>
          <div>
            <input type="text">
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>공연장르</div>
          <div>
            <input type="radio" class="radio-input" name="genre" id="genre01" checked>
            <label class="radio-label" for="genre01">
                기악
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre02">
            <label class="radio-label" for="genre02">
                대중음악
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre03">
            <label class="radio-label" for="genre03">
                무용
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre04">
            <label class="radio-label" for="genre04">
                뮤지컬
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre05">
            <label class="radio-label" for="genre05">
                성악
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre06">
            <label class="radio-label" for="genre06">
                연극
            </label>
            <input type="radio" class="radio-input" name="genre" id="genre07">
            <label class="radio-label" for="genre07">
                오페라
            </label>
          </div>
        </div>
        <div class="t-row">
          <div>대관희망일자</div>
          <div>
            <input type="date" :min="getToday()">
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>대관희망시간</div>
          <div>
            <div class="time-box">
              <select>
                <option>시간선택</option>
                <option 
                  v-for="time in times" 
                  :key="time"
                  :value="time">
                  {{time}}
                </option>
              </select>
              <p>
                * 대관시간은 선택시간으로부터 6시간입니다.
                <br>
                * 모아플레이스 사정에 따라 시간은 변경될 수 있습니다.
                </p>
            </div>
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>첨부파일</div>
          <div>
            <input type="file" id="file" accept=".zip" @change="handleFileChange">
            <div class="file-box">
              <input type="text" class="file-input" :value="filename" placeholder="압축파일(.zip 확장자)만 첨부가능" disabled>
              <label for="file">첨부파일 등록</label>
            </div>
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>담당자</div>
          <div>
            <input type="text">
            <span>{{msg}}</span>
          </div>
        </div>
        <div class="t-row">
          <div>담당자 연락처</div>
          <div class="manager-box">
            <p>전화번호</p>
            <div class="inner-row">
              <div class="phone-box">
                <input type="text"> 
                <span>-</span>
                <input type="text"> 
                <span>-</span>
                <input type="text">
              </div>
              <span>{{msg}}</span>
            </div>
            <p>이메일</p>
            <div class="inner-row">
              <div class="email-box">
                <input type="text"> <span>@</span>
                <input type="text"> 
                <select>
                  <option value="">직접선택</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                </select> 
              </div>
              <span>{{msg}}</span>
            </div>
          </div>
        </div>
        <div class="t-row">
          <div>기타 요청사항</div>
          <div>
              <textarea cols="30" rows="5"></textarea>
          </div>
        </div>
        <p class="etc">* 공연 변경 및 취소신청은 <strong>1:1게시판</strong>으로 문의 바랍니다</p>
      </div>
      
      <div>
          <input type="checkbox" class="radio-input" id="private-agree"/>
          <label class="radio-label" for="private-agree">
              개인정보처리방침에 동의합니다.
          </label>
      </div>
      <div class="btn-box">
          <button>이전으로</button>
          <button>신청하기</button>
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
    components:{
        AppHeader,
        AppFooter,
        SideVisual
    },
    data(){
      return{
          msg: '필수 입력 사항입니다.',
          filename: '',
          times: [
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00'
          ],
      }
    },
    methods:{
      getToday(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let date = today.getDate();

        return year + "-" + (month >=10 ? month :'0' + month) + "-" + (date >=10 ? date : '0' + date); 
      },
      handleFileChange(e){
        let file = e.target.files[0];
        let name = file.name;
        this.filename = name;
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  @import "@/scss/common.scss";
  $brown: #826D5E;
  #wrap{
    padding: 0; margin: 0; text-decoration: none;
    .inner{
      width: $width;
      margin: 0 auto;
      padding: 32px;
      box-sizing: border-box;
      h2.title {
        font-size: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba($black, 0.5);
        margin-bottom: 16px;
      }
      strong{
        color: $brown;
      }
      .noti-box{
        width: 100%;
        border: 10px solid rgba($brown, 0.1);
        padding: 32px;
        margin-bottom: 64px;
        line-height: 1.5;
        word-break: keep-all;
        h3{
          text-align: center;
          font-size: 24px;
          border-bottom: 1px solid $brown;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        ul{
          padding-left: 20px;
          padding-bottom: 16px;
          list-style: none;
          border-bottom: 1px solid rgba($black, 0.1);
          li{
            position: relative;
            margin-bottom: 8px;
            &::before{
              content: '';
              display: block;
              width: 4px;
              height: 4px;
              background: $brown;
              position: absolute;
              top: 10px;
              left: -16px;
              transform: translateX(-50%);
            }
          }
        }
        p{
          text-align: center;
          margin: 0;
          label{
            margin-top: 16px;
            cursor: pointer;
          }
        }

      }
      .table-box{
        padding-top: 16px;
        .t-row{
          display: table;
          table-layout: fixed;
          width: 100%;
          border-bottom: 1px solid rgba($black, 0.2);
          &:first-child{
            border-top: 1px solid rgba($black, 0.2);  
          }
          > div{
            display: table-cell; 
            padding: 16px 32px;
            &:first-child{
              width: 20%;
              min-height: 80px;
              background: #f1f1f1;
              user-select: none;
            }
            &:last-child{
              display: flex;
            }
            &.manager-box{
              flex-direction: column;
              p{
                margin: 0;
                font-size: 14px;
              }
              .inner-row{
                display: flex;
                margin: 4px 0 8px;
              }
            }
            label{
              margin-right: 16px;
              user-select: none;
            }
            input, select{
              border: 1px solid rgba($black, 0.3);
              
              &[type="text"],&[type="date"]{
                padding: 4px 8px;
                width: 60%;
              }
              &[type="file"]{
                display: none;
              }
              &.file-input{
                width: 70%;
                &+ label{
                  background: $black;
                  color: #fff;
                  font-size: 14px;
                  padding: 5px 16px;
                  margin: 0;
                }
              }
            }
            span{
              color: red;
              font-size: 14px;
              margin-left: 8px;
              padding-top: 5px;
            }

            .phone-box, .email-box,.file-box,.time-box {
              width: 60%;
              display: flex;
              input{
                margin: 0 8px;
                &:first-child{
                  margin-left: 0;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
              span{
                color: $black;
                padding-top: 8px;
                margin: 0;
              }
              p{
                font-size: 12px;
                margin: 0 0 0 16px;
              }
              select{
                padding: 0 8px;
              }
            }
            textarea{
              width: 100%;
              padding: 8px;
              resize: none;
            }
          }
          
                
        }
        p.etc{
          font-size: 14px;
          margin-top: 8px;
        }
      }

      input.radio-input{
        display: none;
        &:checked + label::before{
          background-image: url('@/assets/done.png');
          background-color: black;
          background-repeat: no-repeat;
          background-size: 10px;
          background-position: center;
        }
      }
      label.radio-label{
        position: relative;
        padding-left: 24px;
        user-select: none;
        cursor: pointer;
        &::before{
          content: "";
          width: 18px;
          height: 18px;
          border: 1px solid rgba($black, 0.3);
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .table-box + div{
        text-align: center;
        font-weight: bold;
      }
      .btn-box{
        display: flex;
        justify-content: center;
        width: 100%;
        button{
          border: none;
          background: $brown;
          color: #fff;
          padding: 16px 64px;
          margin-top: 32px;
          &:first-child{
            margin-right: 16px;
            background: rgba($black, 0.6);
          }
        }

      }
    }
  }
</style>