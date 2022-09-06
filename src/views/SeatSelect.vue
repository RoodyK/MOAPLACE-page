<template>
    <div id="wrap">
      <div class="inner">
          <header>
              <button class="left" @click="resetModal">
                  <i class="material-symbols-outlined">restart_alt</i>
                  <span>예매 다시하기</span>
              </button>
              <h1 class="title">좌석선택</h1>
              <button class="right" @click="closeModal">
                  <span>창닫기</span>
                  <i class="material-symbols-outlined">close</i>
              </button>
          </header>
          <main>
              <div class="content">
                  <div class="booking-box">
                      <div class="stage"></div>
                      <div class="seat-box">
                          <div class="seat-row" v-for="(row, index) in seatrows" :key="index" 
                          :class="{gradeR: index < this.gradeR, 
                                  gradeS: index < (this.gradeR + this.gradeS) && index >= this.gradeR, 
                                  gradeA: index < (this.gradeR + this.gradeS + this.gradeA) && index >= (this.gradeR + this.gradeS)}">
                              <div>{{row}}</div>
                              <div class="seat" v-for="index in cols" :key="index">
                                  <input type="checkbox" name="seats" :id="row+(index < 10 ? '0'+ index : index)">
                                  <label :for="row+(index < 10 ? '0'+ index : index)" @click="addSeats($event,row, index)">
                                      {{row}}{{index < 10 ? '0'+ index : index}}
                                  </label>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <aside>
                  <h2 class="side-title">구매정보</h2>
                  <h3 class="show-title">{{title}}</h3>
                  <div class="show-info">
                      <div class="info-row">
                          <span>장소</span>
                          <span>{{place}}</span>
                      </div>
                      <div class="info-row">
                          <span>날짜</span>
                          <span>{{date}}</span>
                      </div>
                      <div class="info-row">
                          <span>회차</span>
                          <span>{{time}}</span>
                      </div>
                      <div class="info-row">
                          <span>좌석</span>
                          <span class="seats">
                              <p v-for="(seat, index) in seats" :key="index">
                                  {{seat.grade}}석 {{seat.row}}{{seat.col}}
                                  <button class="material-symbols-outlined del-btn" @click="delSeat(seat.row, seat.col)">close</button>
                              </p>
                          </span>
                      </div>
                      <div class="seats-info-table">
                          <div>
                              <span>좌석등급</span>
                              <span>티켓가격</span>
                          </div>
                          <div class="grades">
                              <span class="gradeR">R석</span>
                              <span>{{priceToString(priceR)}}원</span>
                          </div>
                          <div class="grades">
                              <span class="gradeS">S석</span>
                              <span>{{priceToString(priceS)}}원</span>
                          </div>
                          <div class="grades">
                              <span class="gradeA">A석</span>
                              <span>{{priceToString(priceA)}}원</span>
                          </div>
                          
                      </div>
                  </div>
              </aside>
              <ul class="remarks">
                  <li>예매가능</li>
                  <li>예매불가</li>
                  <li>선택좌석</li>
              </ul>
              <div class="btn-box">
                  <button @click="goPrev">
                      <i class="material-symbols-outlined">keyboard_backspace</i>
                      <span>이전</span>
                  </button>
                  <button @click="goNext">
                      <span>할인선택</span>
                      <i class="material-symbols-outlined">arrow_right_alt</i>
                  </button>
              </div>
          </main>
      </div>
    </div>
  </template>
  
<script>
  export default {
      data(){
				return{
					title: '',
					place: '',
					date: '',
					time : '',
					seats:[],
					rows: 0,//열번호
					cols: 0,//행번호
					priceR: 0,
					priceS: 0,
					priceA: 0,
					gradeR: 0, //R석 행 수
					gradeS: 0, //S석 행 수
					gradeA: 0,//A석 행 수
					seatrows:[],
					alreadySelect:[]
				}
      },
      created(){
				//이미 예매된 좌석 불러오기
				this.getBookingSeat();

				//좌석표 그리기
				this.getHallInfo();
      },
      mounted(){
				// 유니코드 A = 65
				for(let i = 65; i< (65+this.rows); i++){
						let row = String.fromCharCode([i]);
						this.seatrows.push(row);
				}        

				setTimeout(()=>{
						//선택할 수 없는 좌석 disabled
						this.selectedSeat();
				},10);
      },
      methods:{
				priceToString(price) {
						return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				},
				addSeats(e,row, index){
					// 유니코드 A = 65
					let gradeR = 65 + this.gradeR;
					let gradeS = gradeR + this.gradeS;
					let col = index < 10 ? '0'+ index : index;
					
					//이미 예약된 좌석이 아닌것만 동작
					if(e.target.previousSibling.className != 'dis'){
							// 선택했던 좌석 다시 클릭하면 선택 취소
							if(e.target.previousSibling.checked){
									let seat = this.seats.findIndex((e)=>{
											if(e.row == row && e.col == col){
													return true;
											}
									})
									this.seats.splice(seat,1);
									//좌석 선택 4개 이후 좌석 선택 취소시 모든 좌석 선택 가능하게 변경
									this.disableAll(false);
							}else{
									if(this.seats.length >= 4){
											alert("좌석은 최대 4석까지만 선택가능합니다.");
									}else{
											if(row.charCodeAt(0) >= 65 && row.charCodeAt(0) < gradeR){
													this.seats.push({grade: 'R', row: row,col: col});
											}else if(row.charCodeAt(0) >= gradeR && row.charCodeAt(0) < gradeS){
													this.seats.push({grade: 'S', row: row,col: col});
											}else{
													this.seats.push({grade: 'A', row: row,col: col});
											}
											if(this.seats.length == 4){
													/* 
															addSeats가 동작하고 input이 checked되기 때문에
															현재 클릭된 label의 형제 input을 체크될 수 있도록 처리해준다
													*/ 
													this.disableAll(true);
													e.target.previousSibling.disabled = false;
											}
									}
							}
					}else{
							return;
					}
				},
				delSeat(row, col){
					let input = document.querySelector('input#'+row+col);
					input.checked = false;
					let seat = this.seats.findIndex((e)=>{
							if(e.row == row && e.col == col){
									return true;
							}
					})
					this.seats.splice(seat,1);
					this.disableAll(false);
				},
				disableAll(dis){
						let inputs = document.querySelectorAll(".seat > input:not(.dis)");
						for(let i = 0; i<inputs.length; i++){
								if(!inputs.item(i).checked){
										inputs.item(i).disabled = dis;
								}
						}
				},
				selectedSeat(){
					let inputs = document.querySelectorAll(".seat > input");

					for(let i=0; i< this.alreadySelect.length; i++){

						let seat = this.alreadySelect[i];

						for(let j=0; j < inputs.length; j++){
								
								if(inputs[j].id == seat){
										inputs[j].disabled = true;
										inputs[j].className = 'dis';
								}
						}   
					}
				},
				getBookingSeat(){
						this.alreadySelect = this.$store.state.booking.alreadySelect;
				},
				async getHallInfo(){
					this.title = this.$store.state.booking.title;
					this.place = this.$store.state.booking.place;
					this.date = this.$store.state.booking.schedule_date;
					this.time = this.$store.state.booking.time;
					
					this.rows= this.$store.state.booking.rows;
					this.cols= this.$store.state.booking.cols;
					
					let gradeSeats = this.$store.state.booking.gradeSeats;
					let gradePrice = this.$store.state.booking.gradePrice;

					//등급별 행수
					for(let i = 0; i < gradeSeats.length; i++){
							switch(gradeSeats[i].grade_seat){
									case 'R' : 
											this.gradeR = gradeSeats[i].seat_line; 
											break;
									case 'S' : 
											this.gradeS = gradeSeats[i].seat_line; 
											break;
									case 'A' : 
											this.gradeA = gradeSeats[i].seat_line; 
											break;
							}
					}
					//등급별 가격
					for(let i = 0; i < gradePrice.length; i++){
							switch(gradePrice[i].grade_seat){
									case 'R' : 
											this.priceR = gradePrice[i].grade_price; 
											break;
									case 'S' : 
											this.priceS = gradePrice[i].grade_price; 
											break;
									case 'A' : 
											this.priceA = gradePrice[i].grade_price; 
											break;
							}
					}            
				},
				goPrev(){
						let chk = window.confirm("좌석 선택이 초기화됩니다.");
						if(chk == true){
								this.$store.commit('booking/resetSeat');
								this.$router.go(-1);
						}
				},
				goNext(){
						if(this.seats.length > 0){
								this.$store.commit('booking/setSeatChoice', this.seats);
								console.log(this.$store.state.booking.seats);
								this.$router.push('/moaplace.com/booking/count');
						}else{
								alert('좌석을 선택하세요.')
								return;
						}
				},
				//모달창 종료
				closeModal(){
					let chk = window.confirm("모든 선택이 초기화되며 예매창이 종료됩니다.");
					if(chk == true){
							// 자식창에서 부모창으로 함수 호출 ( 데이터 전달 )
							window.parent.postMessage(
							// 전달할 data (부모창에서 호출할 함수명)
							{ functionName : 'closeShow' }
							// 부모창의 도메인
							, 'http://localhost:8080/moaplace.com/'
							);
					}else{
							return;
					}
				},
				//예매다시하기(vuex 초기화)
				resetModal(){
						let chk = window.confirm("모든 선택이 초기화되며 일정 선택 페이지로 이동합니다.");
						if(chk == true){
								let num = this.$store.state.booking.show_num;
								this.$store.commit('booking/resetAllChoice');
								this.$router.push('/moaplace.com/booking/select/'+num);
						}else{
								return;
						}
				}
      }
  }
</script>
  
  <style lang="scss" scoped>
      @import '@/scss/common.scss';
      *{margin: 0; padding: 0; text-decoration: none;}
      a{
          color: $black;
          &:hover{
              color: $black;
          }
      }
      #wrap{
          .inner{
              width: 1000px;
              height: 700px;
              background: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              header{
                  width: 100%;
                  height: 64px;
                  background: $black;
                  color: #fff;
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 24px;
                  &> button{
                      display: flex;
                      flex-flow: row nowrap;
                      align-items: center;
                      font-size: 14px;
                      background: none;
                      border: none;
                      color: rgba(#fff, 0.9);
                      &> :first-child{
                          margin-right: 8px;
                      }
                  }
                  h1.title{
                      font-size: 22px;
                  }
              }
              main{
                  display: flex;
                  flex-flow: row nowrap;
                  height: calc(100% - 64px);
                  .content{
                      width: 80%;
                      padding: 32px 24px 0 24px;
                      .booking-box{
                          .stage{
                              width: 100%;
                              height: 50px;
                              background-image: url(@/assets/booking/stage.png);
                              background-size: auto 100%;
                              background-position: center;
                              background-repeat: no-repeat;
                          }
                          .seat-box{
                              width: 100%;
                              height: 465px;
                              padding-top: 24px;
                              overflow: hidden;
                              overflow-y: scroll;
                              user-select: none;
                              &::-webkit-scrollbar {
                                  width: 8px;  /* 스크롤바의 너비 */
                              }
                              &::-webkit-scrollbar-thumb {
                                  height: 30%; /* 스크롤바의 길이 */
                                  background: $brown; /* 스크롤바의 색상 */
                                  border-radius: 10px;
                              }
                              &::-webkit-scrollbar-track {
                                  background: #e9e9e9;  /*스크롤바 뒷 배경 색상*/
                              }
                              .seat-row{
                                  width: 78%;
                                  display: flex;
                                  margin: 0 auto;
                                  justify-content: space-between;
                                  &> *{
                                      width: calc((100% - ((8px * 10) + (30px *2))) / 11 );
                                      height: 40px;
                                      margin-bottom: 8px;
                                      text-align: center;
                                      line-height: 40px;
                                      &:nth-child(4){
                                          margin-right: 40px;
                                      }
                                      &:nth-child(9){
                                          margin-left: 40px;
                                      }
                                      &.seat{
                                          input{
                                              display: none;
                                          }
                                          input:checked + label{
                                              background: url(@/assets/booking/btn-bg03.png);
                                              background-size: 100%;
                                              color: $black;
                                          }
                                          input:disabled + label{
                                              background: #ddd;
                                              background-size: 100%;
                                          }
                                          input:disabled.dis + label{
                                              background: url(@/assets/booking/btn-bg02.png);
                                              background-size: 100%;
                                              font-size: 0;
                                          }
                                      }
                                  }
                                  label{
                                      display: block;
                                      color: #fff;
                                      border: none;
                                      cursor: pointer;
                                  }
                                  &.gradeR{
                                      label{background: #5e8174;}
                                  }
                                  &.gradeS{
                                      label{background: #c3ba71;}
                                  }
                                  &.gradeA{
                                      label{background: #b8ccc0;}
                                  }
                              }
                          }
                      }
  
                      
                  }
                  aside{
                      width: 20%;
                      border-left: 1px solid rgba($black, 0.3);
                      padding: 32px 16px 0 16px;
                      text-align: center;
                      position: relative;
                      .side-title{
                          font-size: 24px;
                          font-weight: bold;
                          margin-bottom: 24px;
                      }
                      .show-title{
                          font-size: 18px;
                          padding-bottom: 16px;
                          margin-bottom: 24px;
                          border-bottom: 1px solid $black;
                          font-weight: bold;
                          width: 100%;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                      }
                      .show-info{
                          width: 100%;
                          display: flex;
                          flex-flow: column nowrap;
                          .info-row{
                              width: 100%;
                              display: flex;
                              flex-flow: row nowrap;
                              margin-bottom: 8px;
                              span:first-child{
                                  margin-right: 16px;
                                  font-weight: bold;
                              }
                              .seats{
                                  p{
                                      display: flex;
                                      align-items: center;
                                      .del-btn{
                                          border: none;
                                          color: #fff;
                                          background: $black;
                                          font-size: 14px;
                                          margin-left: 8px;
                                      }
                                  }
                              }
                              
                          }
                      }
                      .seats-info-table{
                          position: absolute;
                          bottom: 128px;
                          left: 0;
                          width: 100%;
                          font-size: 14px;
                          &> div{
                              background: rgba($black, 0.1);
                              display: flex;
                              flex-flow: row nowrap;
                              justify-content: space-between;
                              &:first-child{
                                  background: rgba($black, 0.9);
                                  color: #fff;
                              }
                              &.grades{
                                  span:first-child{
                                      position: relative;
                                      &::before{
                                          content: '';
                                          display: block;
                                          width: 10px;
                                          height: 10px;
                                          background: red;
                                           position: absolute;
                                           top:50%;
                                           left: 24px;
                                           transform: translateY(-50%);
                                      }
                                      &.gradeR::before{background: #5e8174;}
                                      &.gradeS::before{background: #c3ba71;}
                                      &.gradeA::before{background: #b8ccc0;}
                                  }
                                  
                              }
                              span{
                                  width: 50%;
                                  padding: 8px 0;
  
                              }
  
                          }
                      }
                  }
                  .remarks{
                      width: 80%;
                      height: 64px;
                      position: absolute;
                      left: 0;
                      bottom: 0;
                      background: #e9e9e9;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      li{
                          margin-right: 32px;
                          display: flex;
                          align-items: center;
                          &:last-child{
                            margin: 0;
                          }
                          &::before{
                              content: '';
                              display: block;
                              width: 15px;
                              height: 15px;
                              margin-right: 8px;
                              background-size: 100%;
                              background-position: center;
                              background-repeat: no-repeat;
                          }
                          &:nth-child(1)::before{background-image: url(@/assets/booking/btn-bg01.png)}
                          &:nth-child(2)::before{background-image: url(@/assets/booking/btn-bg02.png)}
                          &:nth-child(3)::before{background-image: url(@/assets/booking/btn-bg03.png)}                        
                      }
                  }
                  .btn-box{
                      width: 20%;
                      position: absolute;
                      right: 0;
                      bottom: 0;
                      button{
                          width: 100%;
                          height: 64px;
                          display: flex;
                          flex-flow: row nowrap;
                          justify-content: center;
                          align-items: center;
                          border: none;
                          background: #cdc7b9;
                          > :first-child{
                              margin-right: 8px;
                          }
                          &:last-child{
                              background: $brown;
                              color: #fff;
                          }
                      }
                  }
              }
          }
      }
  
  </style>