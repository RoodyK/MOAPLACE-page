<template>
  <div id="wrap">
    <section>
      <div class="inner">
        <h2 class="title">대관 절차 및 비용</h2>
        <p>문화예술을 통한 즐거움과 감동을 한 곳에 모은 공간 모아플레이스입니다.</p>
        <div class="process-box">
          <h3>대관절차</h3>
          <ul class="process">
            <li 
              v-for="(process, index) in processes"
              :key="index">
              <div class="img-box">
                <i class="material-symbols-outlined">{{process.img}}</i>
              </div>
              <div class="txt-box">
                <p>STEP {{index+1}}</p>
                <p>{{process.text}}</p>
              </div>
            </li>
          </ul>
          <ul class="notice">
            <li>대관 잔여일 공지는 매월 1 ~ 2주에 홈페이지를 통해 공지됩니다.(잔여일정이 없는 경우 공지되지 않습니다)</li>
            <li>대관계약금 입금자명은 ‘공연일+연주자명 ex.0123김철수/0123모아앙상블’ 로 해주시기 바랍니다.</li>
          </ul>
        </div>
        <div class="price-box">
          <h3>대관료 및 부대시설 사용료</h3>
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <td>
                  <span>
                    <i class="material-symbols-outlined">history</i>
                  </span>
                  <span>시 간</span>
                </td>
                <td>
                  <span>
                    <i class="material-symbols-outlined">payments</i>
                  </span>
                  <span>금 액</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>기본대관료</th>
                <td>리허설 4시간, 공연 2시간 (총 6시간)</td>
                <td>1,375,000 (VAT포함)</td>
              </tr>
              <tr>
                <th>기업대관</th>
                <td>6시간</td>
                <td>1,595,000 (VAT포함)</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li>부대시설 사용료는 별첨양식 '부대시설 사용 신청서'를 참조 바랍니다.</li>
            <li>대관료 잔금은 공연일로부터 60일 전까지 완납하셔야 합니다.</li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <div class="inner">
        <h2 class="title">대관안내</h2>
        <table>
          <tr>
            <th>
              부대시설<br>
              사용 및 신청
            </th>
            <td>
              <ul>
                <li>
                  부대시설 사용신청(피아노, 녹음, 녹화, 조율, 기타 장비 사용 등)은 공연 14일 전까지 필히 완료해 주시기 바랍니다.
                </li>
                <li>
                  부대시설 사용신청 마감 후 공연일 14일 이후에는 신청한 내역을 변경 불가능 하오니 이 점 양지 바라며,
                  14일 이후 신청 시에는 항목에 따라 사용이 불가능하거나 일정금액의 가산금이 부여될 수 있습니다.
                </li>
                <li>
                  건물시설 관리상 리셉션은 불가하며, 화환은 반입이 금지되어 있는 점 양지하시기 바랍니다.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              입장권발권
            </th>
            <td>
              <ul>
                <li>
                  푸르지오아트홀은 판매 혹은 초대 교환을 목적으로 하는 모든 좌석권을 전산발권 할 것을 의무화 하고 있습니다.
                </li>
                <li>
                  전산발권은 인터파크 또는 기획사 거래처를 기준으로 전석발권 또는 필요수량만큼 발권할 수 있습니다.
                </li>
                <li>
                  대관공연의 경우, 현장발권은 지원하지 않습니다.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              해외연주자
            </th>
            <td>
              <ul>
                <li>
                  개인 또는 단체의 국적이 대한민국이 아닐 경우 영상물 등급위원회에 신고된 공연비자 관련 증빙서류를 공연 14일 전 까지 반드시 첨부하여야 합니다. 만약 연주자의 공연비자 관련 증빙이 성실이 이행되지 않으면 운영사는공연을 취소 할 수 있습니다.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              공연홍보
            </th>
            <td>
              <ul>
                <li>
                  공연홍보는 공연일로부터 30일 전까지 대관자료등록 담당자에게 보도자료 및 포스터, 프로그램 이미지(jpg/1MB 이상) 자료를 보내주시기 바랍니다. (보내주신 자료는 담당자 확인 후, 푸르지오아트홀 홈페이지 에 함께 게재 됩니다.)
                </li>
                <li>
                  <strong>이메일 필수 명기 사항 </strong> 공연일시, 프로그램, 출연자 프로필, 입장료, 주최사
                </li>
                <li class="info-box">
                  <p>
                    <strong>대관자료등록 담당자</strong>
                    모아모아실장
                  </p>
                  <p>
                    <strong>EMAIL</strong>
                    moa@moaplace.com
                  </p>
                  <p>
                    <strong>TEL</strong>
                    070-8240-3211
                  </p>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              지원사항
            </th>
            <td>
              <ul>
                <li>
                  <strong>지원인원</strong>
                  공연일 진행 요원 및 주차안내, 공연당일 무대감독 1인, 객석감독(하우스매니저)1인, 하우스 어셔 2인
                </li>
                <li>
                  <strong>주최사 준비인원</strong>
                  무대전환 및 안내데스크 운영 및 물품보관, 티켓 배부, 프로그램 배부인원 등 공연에 필요한 인원
                </li>
                <li>
                  <strong>주차안내</strong>
                  평일 : 3시간 6천원 할인권, 구매 후 할인정산 / 주말 : 종일 6천원 할인권, 구매 후 할인정산
                </li>
              </ul>
            </td>
          </tr>
        </table>
        <p class="etc">* 기타 문의사항은 대관자료등록담당자에게 연락 주시기 바랍니다.</p>
      </div>
    </section>
  </div>
</template>
<span class="material-symbols-outlined">

</span>
<script>
export default {
    name:'TestComp',
  data(){
    return{
      processes:[
        {text: '대관신청', img: 'draw'},
        {text: '심사 및 승인통보', img: 'find_in_page'},
        {text: '대관계약', img: 'forum'},
        {text: '대관사용', img: 'theater_comedy'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/scss/common.scss";
  //삭제필요
  $brown: #826D5E;
  * {padding: 0; margin: 0;list-style: none; text-decoration: none;}
  #wrap{
    section{
      padding: 120px 0;
      &:last-child{
        background: #f1f1f1;
      }
    }
    .inner{
      width: $width;
      margin: 0 auto;
      h2.title{
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
        & + p{
          text-align: center;
        }
      }
      li{
        position: relative;
        margin-bottom: 16px;
        padding-left: 16px;
        &::before{
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background: $brown;
          position: absolute;
          top: 8px;
          left: 0;
        }
      }
      &> div{
        &.process-box{
          margin: 64px 0;
          .process{
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            margin-bottom: 64px;
            li{
              width: 150px;
              display: flex;
              flex-flow: column wrap;
              margin: 0 64px;
              &::before{
                display: none;
              }
              &:first-child{
                margin-left: 0;
              }
              &:last-child{
                margin-right: 0;
                > div.img-box::before{
                  display: none;
                }
              }
              .img-box{
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #e5e5e5;
                border-radius: 50%;
                background: #f9f9f9;
                position: relative;
                i{
                  font-size: 50px;
                  color: rgba($black, 0.7);
                }
                &::before{
                  content: '';
                  display: block;
                  width: 45px;
                  height: 40px;
                  opacity: 0.4;
                  background-image: url(@/assets/right-arrow.png);
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;
                  position: absolute;
                  right: -90px;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              .txt-box{
                width: 150px;
                margin-top: 16px;
                text-align: center;
                p:first-child{
                  font-family: 'Roboto',sans-serif;
                  color: $brown;
                  font-weight: bold;
                  font-size: 14px;
                }
              }
            }
          }
          .notice{
            width: 100%;
            padding: 64px 32px;
            border: 1px solid #e5e5e5;
            background: #f9f9f9;
            box-sizing: border-box;
            border-top: 2px solid $black;
            
          }
        }
        &.price-box{
          table{
            width: 100%;
            thead{
              tr{
                th{
                  border-top: 2px solid $black;
                }
                td{
                  font-weight: bold; 
                  span{
                    margin-right: 8px;
                    i{
                      font-size: 45px;
                    }
                    &:last-child{
                      position: relative;
                      top: -16px;
                    }
                  }
                }
              }
            }
            tr{
              border-bottom: 1px solid #ddd;
            }
            th,td{
              padding: 16px 24px;
              width: calc(100% / 3);
            }
            th{
              background: #f9f9f9;
            }
            td{
              padding-left: 32px;
            }
          }
          ul{
            margin-top: 32px;
          }
        }
        h3{
          font-size: 24px;
          &::after{
            content:'';
            display: block;
            width: 24px;
            height: 3px;
            background: $black;
            margin: 16px 0 32px;
          }
        }
        
      }
    }
    section:last-child{
      h2.title{
        &::after{
          content: '';
          display: block;
          width: 24px;
          height: 3px;
          background: #333;
          margin: 16px auto 32px
        }
      }
      table{
        border-top: 2px solid $black;
        background: #fff;
        margin-bottom: 16px;
        tr{
          border-bottom: 1px solid rgba($black, 0.2);
          th,td{
            padding: 40px 0;
          }
          th{
            width: 260px;
            font-size: 28px;
            font-weight: 100;
            padding: 60px;
            padding-right: 0;
          }
          td{
            padding: 40px;
            padding-left: 0;
            overflow: hidden;
            word-break: keep-all;
            strong{
              color: $brown;
              margin-right: 16px;
            }
            li{
              &.info-box{
                width: 100%;
                padding: 35px 30px;
                box-sizing: border-box;
                background: #f9f9f9;
                border: 1px solid #e5e5e5;
                strong{
                  font-family: 'Roboto','Nanum Gothic', sans-serif;
                  display: inline-block;
                  width: 150px;
                }
                &::before{
                  display: none;
                }
              }
            }
          }
        }
      }
    }
    
  }
</style>